import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  LayoutDashboard,
  List,
  Megaphone,
  Package,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const modules = [
  {
    name: "Listings",
    Icon: List,
    heading: "A menu that is ready to sell.",
    detail: "Bring listings and availability into the same operating picture.",
    rows: ["Classic Burger", "Chicken Burger", "Fries"],
    values: ["Available", "Available", "Available"],
  },
  {
    name: "Pricing",
    Icon: SlidersHorizontal,
    heading: "Give every price a purpose.",
    detail: "Review pricing opportunities and approve the next test.",
    rows: ["Classic Burger", "Price experiment", "Manager approval"],
    values: ["SAR 42 → 39", "Recommended", "Required"],
  },
  {
    name: "Promotions",
    Icon: Megaphone,
    heading: "A promotion with a hypothesis.",
    detail: "Plan promotions around a clear goal, then measure what happens.",
    rows: ["Lunch offer", "Experiment goal", "Decision"],
    values: ["Draft", "Conversion", "Review"],
  },
  {
    name: "Bundles",
    Icon: Package,
    heading: "Find the right combination.",
    detail: "Look at bundles as experiments rather than permanent guesses.",
    rows: ["Burger + fries", "Bundle proposal", "Decision"],
    values: ["Illustration", "Recommended", "Review"],
  },
  {
    name: "Marketing",
    Icon: Megaphone,
    heading: "Connect campaigns to decisions.",
    detail: "Keep marketing actions connected to delivery-channel performance.",
    rows: ["Campaign idea", "Objective", "Decision"],
    values: ["Lunch discovery", "Orders", "Review"],
  },
  {
    name: "Performance",
    Icon: TrendingUp,
    heading: "Signals become a story.",
    detail: "Use channel performance to understand where to look next.",
    rows: ["Orders", "Conversion", "Next action"],
    values: ["Observe", "Measure", "Recommend"],
  },
  {
    name: "Recommendations",
    Icon: Sparkles,
    heading: "The next move, with a reason.",
    detail: "Review AI recommendations in the context of your restaurant.",
    rows: ["Classic Burger", "Recommendation", "Reason"],
    values: ["Pricing", "SAR 39", "Conversion"],
  },
  {
    name: "Approvals",
    Icon: Check,
    heading: "Your restaurant. Your call.",
    detail: "Approve, edit or ignore before an action is executed.",
    rows: ["Price update", "Owner", "Status"],
    values: ["SAR 39", "Restaurant manager", "Awaiting approval"],
  },
];
export function ControlCenter() {
  const [active, setActive] = useState(0);
  const item = modules[active]!;
  return (
    <section className="control-section section-shell" aria-labelledby="control-title">
      <div className="section-intro">
        <h2 id="control-title">
          Everything your delivery
          <br />
          channel needs.
          <br />
          <span className="green-text">One decision layer.</span>
        </h2>
        <p>Less jumping between tasks. More clarity about what deserves your attention.</p>
      </div>
      <div className="control-browser">
        <div className="browser-chrome">
          <span className="browser-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>Yamdy / Your delivery workspace</span>
          <span className="example-label">Product concept</span>
        </div>
        <div className="browser-body">
          <div className="module-nav" aria-label="Product areas">
            {modules.map(({ name, Icon }, i) => (
              <button
                key={name}
                className={active === i ? "selected" : ""}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
              >
                <Icon size={17} strokeWidth={1.5} />
                <span>{name}</span>
                <ChevronRight size={14} />
              </button>
            ))}
          </div>
          <div className="module-content">
            <span className="module-channel">
              <LayoutDashboard size={14} /> Starting with HungerStation
            </span>
            <h3>{item.heading}</h3>
            <p>{item.detail}</p>
            <div className="module-preview" key={active}>
              <div className="module-preview-head">
                <item.Icon size={21} />
                <b>{item.name}</b>
                <span>Illustrative view</span>
              </div>
              {item.rows.map((row, i) => (
                <div className="preview-row" key={row}>
                  <span>{row}</span>
                  <b>{item.values[i]}</b>
                </div>
              ))}
            </div>
            <span className="module-footnote">
              Focused product glimpses. Example content.
              <ArrowUpRight size={15} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
