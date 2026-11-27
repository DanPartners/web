/**
 * Public prices for the marketing site.
 *
 * Stripe is the source of the amounts (Dan Partners, same lookup keys in test
 * and live). The fallback below is the deal approved on 26 Nov 2026
 * (DanPartners/wiki 04-Business/Pricing-and-Revenue.md, commit d51c4d4).
 * It is used when STRIPE_PRICING_KEY is unset or Stripe cannot be read, so
 * the page and the build still render.
 *
 * The secret is read only in get-pricing.ts. Nothing here is sent to the browser
 * except the formatted prices.
 */

export const PRICING_REVALIDATE_SECONDS = 3600;

export const STRIPE_LOOKUP_KEYS = {
  freeMonthly: "dan_free_monthly",
  duoSetup: "dan_duo_setup",
  duoMaintenanceMonthly: "dan_duo_maintenance_monthly",
} as const;

export type PricingSource = "stripe" | "fallback";

export type PublicPricing = {
  freeMonthlyPence: number;
  duoSetupPence: number;
  duoSetupCompareAtPence: number;
  duoMaintenanceMonthlyPence: number;
  feePercent: number;
  feeFixedPence: number;
  feeCapPence: number;
  promoFreeOnlineOrdersPerMonth: number;
  promoDurationMonths: number;
  source: PricingSource;
};

export const FALLBACK_PRICING: PublicPricing = {
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
};

export type PricingCopy = {
  metaDescriptionEn: string;
  heroEn: string;
  heroZh: string;
  heroNoteEn: string;
  heroNoteZh: string;
  figureCapEn: string;
  figureCapZh: string;
  feeTitleEn: string;
  feeTitleZh: string;
  feeBodyEn: string;
  feeBodyZh: string;
  feePromoEn: string;
  feePromoZh: string;
  feeSettlementEn: string;
  feeSettlementZh: string;
  figurePrimary: string;
  figureSecondaryEn: string;
  figureSecondaryZh: string;
  pricingTitleEn: string;
  pricingTitleZh: string;
  pricingLeadEn: string;
  pricingLeadZh: string;
  freeBodyEn: string;
  freeBodyZh: string;
  setupSrEn: string;
  setupSrZh: string;
  maintenanceEn: string;
  maintenanceZh: string;
  freePrice: string;
  setupPrice: string;
  setupComparePrice: string;
};

export function formatGbp(pence: number): string {
  const pounds = pence / 100;
  if (pence % 100 === 0) return `£${pounds}`;
  return `£${pounds.toFixed(2)}`;
}

export function formatPercent(value: number): string {
  const rounded = Math.round(value * 1000) / 1000;
  return `${rounded}%`;
}

/** Whole pence under £1 are written as "10p". */
export function formatPenceEn(pence: number): string {
  if (pence > 0 && pence < 100 && Number.isInteger(pence)) return `${pence}p`;
  return formatGbp(pence);
}

export function formatPenceZh(pence: number): string {
  if (pence > 0 && pence < 100 && Number.isInteger(pence)) return `${pence} 便士`;
  return formatGbp(pence);
}

function feeRateEn(pricing: PublicPricing): string {
  const percent = formatPercent(pricing.feePercent);
  const fixed = formatPenceEn(pricing.feeFixedPence);
  if (pricing.feePercent === 0) return fixed;
  if (pricing.feeFixedPence === 0) return percent;
  return `${percent} plus ${fixed}`;
}

function feeRateZh(pricing: PublicPricing): string {
  const percent = formatPercent(pricing.feePercent);
  const fixed = formatPenceZh(pricing.feeFixedPence);
  if (pricing.feePercent === 0) return fixed;
  if (pricing.feeFixedPence === 0) return percent;
  return `${percent} 加 ${fixed}`;
}

function promoEn(pricing: PublicPricing): string {
  const months = pricing.promoDurationMonths;
  const orders = pricing.promoFreeOnlineOrdersPerMonth;
  if (months <= 0 || orders <= 0) return "";
  const monthLabel = months === 1 ? "first month" : `first ${months} months`;
  const orderLabel = orders === 1 ? "first online order" : `first ${orders} online orders`;
  const verb = orders === 1 ? "carries" : "carry";
  return `For the ${monthLabel}, the ${orderLabel} each month ${verb} no Dan fee.`;
}

function promoZh(pricing: PublicPricing): string {
  const months = pricing.promoDurationMonths;
  const orders = pricing.promoFreeOnlineOrdersPerMonth;
  if (months <= 0 || orders <= 0) return "";
  return `首 ${months} 個月內，每月首 ${orders} 張網上訂單不收 Dan 的費用。`;
}

function joinParts(parts: Array<string | undefined>, separator: string): string {
  return parts
    .map((part) => part?.trim() ?? "")
    .filter((part) => part !== "")
    .join(separator);
}

export function pricingCopy(pricing: PublicPricing): PricingCopy {
  const free = formatGbp(pricing.freeMonthlyPence);
  const setup = formatGbp(pricing.duoSetupPence);
  const compare = formatGbp(pricing.duoSetupCompareAtPence);
  const maintenance = formatGbp(pricing.duoMaintenanceMonthlyPence);
  const cap = formatPenceEn(pricing.feeCapPence);
  const capZh = formatPenceZh(pricing.feeCapPence);
  const rate = feeRateEn(pricing);
  const rateZh = feeRateZh(pricing);
  const promo = promoEn(pricing);
  const promoChinese = promoZh(pricing);
  const showFixed = pricing.feePercent > 0 && pricing.feeFixedPence > 0;

  return {
    metaDescriptionEn: joinParts([
      "Dan is a modern POS and commerce system for restaurants and food shops: the counter, table QR ordering, online ordering and a simple online shop.",
      `The monthly plan is ${free}.`,
      `Dan's fee is ${rate} on each card payment taken through Dan, capped at ${cap} an order.`,
      promo,
    ], " "),
    heroEn: joinParts([
      `The monthly plan is ${free}.`,
      `Dan's fee is ${rate} on each card payment taken through Dan, for online ordering and table QR, capped at ${cap} an order.`,
      promo,
    ], " "),
    heroZh: joinParts([
      `月費為 ${free}。`,
      `經 Dan 收取的信用卡付款（網上落單及枱面二維碼），費用為 ${rateZh}，每張訂單上限 ${capZh}。`,
      promoChinese,
    ], ""),
    heroNoteEn: `The Free plan is ${free} a month. Dan's fee is ${rate} per card payment through Dan, capped at ${cap} an order.`,
    heroNoteZh: `免費計劃每月 ${free}。經 Dan 的信用卡付款，每筆費用為 ${rateZh}，每張訂單上限 ${capZh}。`,
    figureCapEn: `capped at ${cap} an order`,
    figureCapZh: `每張訂單上限 ${capZh}`,
    feeTitleEn: `Dan's fee is ${rate} on card payments through Dan`,
    feeTitleZh: `經 Dan 的信用卡付款，費用為 ${rateZh}`,
    feeBodyEn: `Dan's fee applies to card payments taken through Dan, for online ordering and table QR. The fee is ${rate} on each such payment, capped at ${cap} an order. There is no Dan fee on cash, bank transfer or the shop's own card machine. Stripe's card processing is charged separately, and is paid by the shop to Stripe.`,
    feeBodyZh: `Dan 的費用適用於經 Dan 收取的信用卡付款，包括網上落單及枱面二維碼。每筆此類付款的費用為 ${rateZh}，每張訂單上限 ${capZh}。現金、銀行轉帳及店舖自己的卡機不收 Dan 的費用。Stripe 的信用卡處理費另行收取，由店舖支付予 Stripe。`,
    feePromoEn: promo,
    feePromoZh: promoChinese,
    feeSettlementEn:
      "Card payments are settled directly to the shop through Stripe. Dan's fee is deducted by Stripe from the card payment, and is returned if the order is refunded in full. Customers may also pay by cash, by bank transfer once staff have confirmed receipt, or on the shop's own card machine.",
    feeSettlementZh:
      "信用卡付款經 Stripe 直接結算至店舖。Dan 的費用由 Stripe 在卡付款中扣除，如訂單全數退款，費用會一併退回。顧客亦可以現金、銀行轉帳（由員工確認收款）或店舖自己的卡機付款。",
    figurePrimary: pricing.feePercent > 0 ? formatPercent(pricing.feePercent) : formatPenceEn(pricing.feeFixedPence),
    figureSecondaryEn: showFixed ? `plus ${formatPenceEn(pricing.feeFixedPence)}` : "",
    figureSecondaryZh: showFixed ? `加 ${formatPenceZh(pricing.feeFixedPence)}` : "",
    pricingTitleEn: `${free} a month`,
    pricingTitleZh: `每月 ${free}`,
    pricingLeadEn: joinParts([
      `Dan's fee on card payments taken through Dan is ${rate}, capped at ${cap} an order.`,
      promo,
      "There is no Dan fee on cash, bank transfer or the shop's own card machine. Stripe's card processing is charged separately. No VAT charged.",
    ], " "),
    pricingLeadZh: joinParts([
      `經 Dan 收取的信用卡付款，費用為 ${rateZh}，每張訂單上限 ${capZh}。`,
      promoChinese,
      "現金、銀行轉帳及店舖自己的卡機不收 Dan 的費用。Stripe 的信用卡處理費另行收取。不收取增值稅。",
    ], ""),
    freeBodyEn: "Online ordering, table QR and the counter are included.",
    freeBodyZh: "包括網上落單、枱面二維碼及櫃檯。",
    setupSrEn: `The usual setup fee is ${compare}. The price is ${setup}. No VAT charged.`,
    setupSrZh: `設置費原價為 ${compare}。現價為 ${setup}。不收取增值稅。`,
    maintenanceEn: `Maintenance is ${maintenance} a month. Hardware is charged separately.`,
    maintenanceZh: `維護費為每月 ${maintenance}。硬件另行收費。`,
    freePrice: free,
    setupPrice: setup,
    setupComparePrice: compare,
  };
}

type FetchLike = (input: string, init?: RequestInit) => Promise<Response>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function metaString(meta: unknown, key: string): string | undefined {
  if (!isRecord(meta)) return undefined;
  const value = meta[key];
  if (typeof value === "string" && value.trim() !== "") return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return undefined;
}

function metaNumber(meta: unknown, key: string): number | null {
  const raw = metaString(meta, key);
  if (raw == null || !/^\d+(\.\d+)?$/.test(raw)) return null;
  const value = Number(raw);
  if (!Number.isFinite(value) || value < 0) return null;
  return value;
}

function metaInt(meta: unknown, key: string): number | null {
  const value = metaNumber(meta, key);
  if (value == null || !Number.isInteger(value)) return null;
  return value;
}

function productOf(price: Record<string, unknown>): Record<string, unknown> | null {
  if (!isRecord(price.product) || price.product.deleted === true) return null;
  return price.product;
}

function gbpPence(price: Record<string, unknown>): number | null {
  if (typeof price.currency !== "string" || price.currency.toLowerCase() !== "gbp") return null;
  const amount = price.unit_amount;
  if (typeof amount !== "number" || !Number.isInteger(amount) || amount < 0) return null;
  return amount;
}

function isMonthly(price: Record<string, unknown>): boolean {
  if (price.type !== "recurring" || !isRecord(price.recurring)) return false;
  if (price.recurring.interval !== "month") return false;
  const count = price.recurring.interval_count;
  return count == null || count === 1;
}

function firstMetaInt(price: Record<string, unknown>, product: Record<string, unknown>, key: string): number | null {
  return metaInt(product.metadata, key) ?? metaInt(price.metadata, key);
}

function firstMetaNumber(price: Record<string, unknown>, product: Record<string, unknown>, key: string): number | null {
  return metaNumber(product.metadata, key) ?? metaNumber(price.metadata, key);
}

/**
 * Map a Stripe prices list (lookup_keys, product expanded) to public pricing.
 * Returns null when a required price or metadata field is missing, so the
 * caller can use the published fallback rather than a partial catalogue.
 */
export function parseStripePriceList(body: unknown): Omit<PublicPricing, "source"> | null {
  if (!isRecord(body) || !Array.isArray(body.data)) return null;

  const byKey = new Map<string, Record<string, unknown>>();
  for (const item of body.data) {
    if (!isRecord(item) || item.active === false) continue;
    if (typeof item.lookup_key !== "string" || item.lookup_key === "") continue;
    if (!byKey.has(item.lookup_key)) byKey.set(item.lookup_key, item);
  }

  const free = byKey.get(STRIPE_LOOKUP_KEYS.freeMonthly);
  const setup = byKey.get(STRIPE_LOOKUP_KEYS.duoSetup);
  const maintenance = byKey.get(STRIPE_LOOKUP_KEYS.duoMaintenanceMonthly);
  if (!free || !setup || !maintenance) return null;
  if (!isMonthly(free) || !isMonthly(maintenance) || setup.type !== "one_time") return null;

  const freeProduct = productOf(free);
  const setupProduct = productOf(setup);
  const maintenanceProduct = productOf(maintenance);
  if (!freeProduct || !setupProduct || !maintenanceProduct) return null;

  const freeMonthlyPence = gbpPence(free);
  const duoSetupPence = gbpPence(setup);
  const duoMaintenanceMonthlyPence = gbpPence(maintenance);
  const duoSetupCompareAtPence = firstMetaInt(setup, setupProduct, "compare_at_amount");
  const feePercent = firstMetaNumber(free, freeProduct, "dan_fee_percent");
  const feeFixedPence = firstMetaInt(free, freeProduct, "dan_fee_fixed_pence");
  const feeCapPence = firstMetaInt(free, freeProduct, "dan_fee_cap_pence");
  const promoFreeOnlineOrdersPerMonth = firstMetaInt(free, freeProduct, "promo_free_online_orders_per_month");
  const promoDurationMonths = firstMetaInt(free, freeProduct, "promo_duration_months");

  if (
    freeMonthlyPence == null ||
    duoSetupPence == null ||
    duoMaintenanceMonthlyPence == null ||
    duoSetupCompareAtPence == null ||
    duoSetupCompareAtPence <= duoSetupPence ||
    feePercent == null ||
    feeFixedPence == null ||
    feeCapPence == null ||
    promoFreeOnlineOrdersPerMonth == null ||
    promoDurationMonths == null
  ) {
    return null;
  }

  return {
    freeMonthlyPence,
    duoSetupPence,
    duoSetupCompareAtPence,
    duoMaintenanceMonthlyPence,
    feePercent,
    feeFixedPence,
    feeCapPence,
    promoFreeOnlineOrdersPerMonth,
    promoDurationMonths,
  };
}

function stripePricesUrl(): string {
  const params = new URLSearchParams();
  params.append("lookup_keys[]", STRIPE_LOOKUP_KEYS.freeMonthly);
  params.append("lookup_keys[]", STRIPE_LOOKUP_KEYS.duoSetup);
  params.append("lookup_keys[]", STRIPE_LOOKUP_KEYS.duoMaintenanceMonthly);
  params.append("expand[]", "data.product");
  params.set("active", "true");
  params.set("limit", "10");
  return `https://api.stripe.com/v1/prices?${params.toString()}`;
}

export async function loadPricing(options: { key: string | undefined; fetchImpl?: FetchLike }): Promise<PublicPricing> {
  const key = options.key?.trim() ?? "";
  if (key === "") return FALLBACK_PRICING;

  const fetchImpl = options.fetchImpl ?? fetch;
  try {
    const response = await fetchImpl(stripePricesUrl(), {
      headers: { Authorization: `Bearer ${key}` },
      next: { revalidate: PRICING_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      throw new Error(`Stripe prices request failed (${response.status}).`);
    }
    const parsed = parseStripePriceList(await response.json());
    if (!parsed) throw new Error("Stripe pricing response was incomplete.");
    return { ...parsed, source: "stripe" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.error(`[pricing] Stripe unavailable, using the published fallback. ${message}`);
    return FALLBACK_PRICING;
  }
}
