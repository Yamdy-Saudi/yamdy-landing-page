export type AnalyticsEvent =
  | "landing_cta_click"
  | "hero_start_click"
  | "signin_click"
  | "nav_click"
  | "interactive_demo_started"
  | "interactive_demo_approved"
  | "product_section_view"
  | "results_section_view"
  | "final_cta_click";

/** Provider-neutral, no storage, cookies, identifiers or network requests. */
export function track(event: AnalyticsEvent, properties: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("yamdy:analytics", { detail: { event, properties } }));
}

export const APP_URL = "https://app.yamdy.net";
