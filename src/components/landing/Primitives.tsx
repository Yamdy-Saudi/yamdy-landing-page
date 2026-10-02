import { ArrowUpRight } from "lucide-react";
import { APP_URL, track, type AnalyticsEvent } from "@/lib/analytics";
import type { ReactNode } from "react";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <img
      className={`brand-logo${light ? " brand-logo-light" : ""}`}
      src="/brand/yamdy-logo.png"
      alt="Yamdy"
      width="270"
      height="120"
    />
  );
}

export function AppLink({
  children = "Start with Yamdy",
  event = "landing_cta_click",
  className = "button button-primary",
  location = "",
}: {
  children?: ReactNode;
  event?: AnalyticsEvent;
  className?: string;
  location?: string;
}) {
  return (
    <a
      className={className}
      href={APP_URL}
      onClick={() => {
        track(event, { location });
        if (event !== "landing_cta_click" && event !== "signin_click")
          track("landing_cta_click", { location });
      }}
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}

export function Sketch({
  kind = "arrow",
  className = "",
}: {
  kind?: "arrow" | "underline" | "circle";
  className?: string;
}) {
  const paths = {
    arrow: "M6 12C40 7 53 31 70 66M48 57l23 12 1-25",
    underline: "M5 24Q72 6 145 18T290 14M18 30Q140 16 278 23",
    circle: "M154 16C58-16-16 27 12 67S206 95 221 48 136-3 58 7",
  };
  return (
    <svg
      aria-hidden="true"
      className={`sketch ${className}`}
      viewBox={
        kind === "underline" ? "0 0 300 40" : kind === "circle" ? "0 0 240 100" : "0 0 90 85"
      }
      fill="none"
    >
      <path
        d={paths[kind]}
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
