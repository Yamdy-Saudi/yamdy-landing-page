import {
  ArrowRight,
  BadgePercent,
  ChartNoAxesCombined,
  ClipboardList,
  Layers,
  Megaphone,
  Package,
  UtensilsCrossed,
  SlidersHorizontal,
} from "lucide-react";
import { useRef } from "react";
import { useLandingMotion } from "@/hooks/use-landing-motion";
import { Sketch } from "./Primitives";

const cards = [
  { title: "Menu", detail: "Listings & availability", Icon: UtensilsCrossed },
  { title: "Pricing", detail: "Set once. Then what?", Icon: SlidersHorizontal },
  { title: "Promotions", detail: "A discount or a guess?", Icon: BadgePercent },
  { title: "Campaigns", detail: "Which move is working?", Icon: Megaphone },
  { title: "Orders", detail: "Signals without a story", Icon: ClipboardList },
  { title: "Bundles", detail: "Better together?", Icon: Package },
  { title: "Performance", detail: "What actually changed?", Icon: ChartNoAxesCombined },
  { title: "Delivery channel", detail: "Starting with HungerStation", Icon: Layers },
];

export function ChaosControl() {
  const ref = useRef<HTMLElement>(null);
  useLandingMotion(ref, "chaos");
  return (
    <section className="problem-section section-shell" ref={ref} aria-labelledby="problem-title">
      <div className="section-intro">
        <span className="section-kicker">THE DAILY DELIVERY DILEMMA</span>
        <h2 id="problem-title">
          Your biggest digital channel.
          <br />
          <span className="text-muted">Running on autopilot.</span>
        </h2>
        <p>
          Prices set once. Promotions guessed. Payouts, commissions and cancellations waiting to be
          reconciled. Plenty of activity. Too little direction.
        </p>
      </div>
      <div className="chaos-board">
        <div className="chaos-note annotation">
          a lot to manage.
          <Sketch />
        </div>
        <div className="operations-grid">
          {cards.map(({ title, detail, Icon }) => (
            <div className="operation-card" key={title}>
              <Icon size={24} strokeWidth={1.5} />
              <h3>{title}</h3>
              <p>{detail}</p>
            </div>
          ))}
        </div>
        <div className="control-layer">
          <div>
            <span className="control-line" />
            <b>yamdy</b>
            <span>One decision layer. A clear next move.</span>
          </div>
          <ArrowRight size={24} />
        </div>
      </div>
    </section>
  );
}
