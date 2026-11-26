import "server-only";
import { cache } from "react";
import { loadPricing } from "./pricing";

/**
 * Server-only. STRIPE_PRICING_KEY is a restricted read-only Stripe secret.
 * It must not use a NEXT_PUBLIC_ name. The result is cached with the prices
 * request (revalidate 3600). The page and layout set the same hourly
 * revalidate so a missing key still refreshes once the variable is present.
 */
export const getPricing = cache(() => loadPricing({ key: process.env.STRIPE_PRICING_KEY }));
