import assert from "node:assert/strict";
import { test } from "node:test";
import {
  FALLBACK_PRICING,
  loadPricing,
  parseStripePriceList,
  pricingCopy,
  STRIPE_LOOKUP_KEYS,
} from "./pricing.ts";

const banned = [
  /£20\b/,
  /£50\b/,
  /3%/,
  /excl\.?\s*VAT/i,
  /excluding VAT/i,
  /including VAT/i,
  /0%\s*commission/i,
  /50 online orders/i,
  /500 online orders/i,
  /200 online orders/i,
  /first 100 card/i,
  /不含增值稅/,
  /已含增值稅/,
  /being built/i,
  /not launched/i,
  /開發中/,
  /尚未推出/,
];

function price(fields: Record<string, unknown>) {
  return {
    active: true,
    currency: "gbp",
    metadata: {},
    product: { id: "prod_test", metadata: {} },
    ...fields,
  };
}

function catalogue(overrides?: {
  freeProduct?: Record<string, string>;
  setupMeta?: Record<string, string>;
  setupProductMeta?: Record<string, string>;
  freeAmount?: number;
}) {
  return {
    data: [
      price({
        lookup_key: STRIPE_LOOKUP_KEYS.freeMonthly,
        unit_amount: overrides?.freeAmount ?? 0,
        type: "recurring",
        recurring: { interval: "month", interval_count: 1 },
        product: {
          id: "prod_free",
          metadata: {
            dan_fee_percent: "0.5",
            dan_fee_fixed_pence: "10",
            dan_fee_cap_pence: "100",
            promo_free_online_orders_per_month: "100",
            promo_duration_months: "6",
            ...overrides?.freeProduct,
          },
        },
      }),
      price({
        lookup_key: STRIPE_LOOKUP_KEYS.duoSetup,
        unit_amount: 9900,
        type: "one_time",
        recurring: null,
        metadata: overrides?.setupMeta ?? { compare_at_amount: "22000" },
        product: { id: "prod_setup", metadata: overrides?.setupProductMeta ?? {} },
      }),
      price({
        lookup_key: STRIPE_LOOKUP_KEYS.duoMaintenanceMonthly,
        unit_amount: 500,
        type: "recurring",
        recurring: { interval: "month", interval_count: 1 },
      }),
    ],
  };
}

test("fallback matches the 26 Nov 2026 deal", () => {
  assert.deepEqual(FALLBACK_PRICING, {
    freeMonthlyPence: 0,
    duoSetupPence: 9900,
    duoSetupCompareAtPence: 22000,
    duoMaintenanceMonthlyPence: 500,
    feePercent: 0.5,
    feeFixedPence: 10,
    feeCapPence: 100,
    promoFreeOnlineOrdersPerMonth: 100,
    promoDurationMonths: 6,
    source: "fallback",
  });
});

test("fallback copy states the new deal and drops the old tiers", () => {
  const copy = pricingCopy(FALLBACK_PRICING);
  const text = Object.values(copy).join("\n");
  for (const pattern of banned) {
    assert.equal(pattern.test(text), false, pattern.toString());
  }
  assert.match(text, /£0/);
  assert.match(text, /£99/);
  assert.match(text, /£220/);
  assert.match(text, /£5/);
  assert.match(text, /0\.5% plus 10p/);
  assert.match(text, /capped at £1 an order/);
  assert.match(text, /first 6 months, the first 100 online orders each month carry no Dan fee/);
  assert.match(text, /No VAT charged/);
  assert.match(text, /不收取增值稅/);
  assert.match(text, /cash, bank transfer or the shop's own card machine/);
});

test("parseStripePriceList reads lookup keys, product metadata and compare-at", () => {
  const parsed = parseStripePriceList(catalogue({ freeAmount: 0 }));
  assert.ok(parsed);
  assert.equal(parsed.freeMonthlyPence, 0);
  assert.equal(parsed.duoSetupPence, 9900);
  assert.equal(parsed.duoSetupCompareAtPence, 22000);
  assert.equal(parsed.feePercent, 0.5);
  assert.equal(parsed.feeFixedPence, 10);
  assert.equal(parsed.promoDurationMonths, 6);
});

test("compare-at may live on the setup product", () => {
  const parsed = parseStripePriceList(
    catalogue({ setupMeta: {}, setupProductMeta: { compare_at_amount: "22000" } }),
  );
  assert.equal(parsed?.duoSetupCompareAtPence, 22000);
});

test("an incomplete catalogue is rejected", () => {
  const body = catalogue();
  delete (body.data[0].product as { metadata: Record<string, string> }).metadata.dan_fee_percent;
  assert.equal(parseStripePriceList(body), null);
  assert.equal(parseStripePriceList({ data: [] }), null);
  assert.equal(parseStripePriceList(catalogue({ setupMeta: {}, setupProductMeta: {} })), null);
});

test("missing key does not call Stripe", async () => {
  let called = false;
  const pricing = await loadPricing({
    key: "  ",
    fetchImpl: async () => {
      called = true;
      throw new Error("should not be called");
    },
  });
  assert.equal(called, false);
  assert.equal(pricing.source, "fallback");
  assert.equal(pricing.feePercent, 0.5);
});

test("Stripe errors use the fallback", async () => {
  const pricing = await loadPricing({
    key: "rk_test_example",
    fetchImpl: async () => new Response("no", { status: 401 }),
  });
  assert.equal(pricing.source, "fallback");
  assert.equal(pricing.duoSetupPence, 9900);
});

test("a complete Stripe catalogue replaces the fallback", async () => {
  let authorization = "";
  let url = "";
  const pricing = await loadPricing({
    key: "rk_test_example",
    fetchImpl: async (input, init) => {
      url = input;
      authorization = new Headers(init?.headers).get("authorization") ?? "";
      const body = catalogue({
        freeAmount: 0,
        freeProduct: { dan_fee_percent: "0.25", dan_fee_fixed_pence: "5" },
      });
      return new Response(JSON.stringify(body), { status: 200, headers: { "content-type": "application/json" } });
    },
  });
  assert.equal(authorization, "Bearer rk_test_example");
  assert.equal(url.includes("rk_test_example"), false);
  assert.match(url, /lookup_keys(?:%5B%5D|\[\])=dan_free_monthly/);
  assert.match(url, /dan_duo_setup/);
  assert.match(url, /dan_duo_maintenance_monthly/);
  assert.match(url, /expand(?:%5B%5D|\[\])=data\.product/);
  assert.equal(pricing.source, "stripe");
  assert.equal(pricing.feePercent, 0.25);
  assert.equal(pricing.feeFixedPence, 5);
  assert.match(pricingCopy(pricing).heroEn, /0\.25% plus 5p/);
});
