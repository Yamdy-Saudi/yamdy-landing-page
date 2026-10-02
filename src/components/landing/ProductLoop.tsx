import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  CircleCheck,
  Eye,
  Lightbulb,
  Send,
  TrendingUp,
} from "lucide-react";
import { Sketch } from "./Primitives";

const steps = [
  {
    name: "Observe",
    text: "Conversion falls.",
    explanation: "Start with what is happening in your delivery channel.",
    Icon: Eye,
  },
  {
    name: "Diagnose",
    text: "A price worth questioning.",
    explanation: "Classic Burger is priced above comparable offers while conversion has weakened.",
    Icon: Lightbulb,
  },
  {
    name: "Recommend",
    text: "SAR 42 → SAR 39",
    explanation:
      "Yamdy suggests a focused price experiment, with a reason behind the recommendation.",
    Icon: TrendingUp,
  },
  {
    name: "Approve",
    text: "You make the call.",
    explanation: "The restaurant manager reviews the recommendation and accepts or edits it.",
    Icon: Check,
  },
  {
    name: "Execute",
    text: "The new price is published.",
    explanation: "Once approved, the change moves into execution.",
    Icon: Send,
  },
  {
    name: "Measure",
    text: "Watch what changes.",
    explanation: "Track orders and conversion after the change to understand the outcome.",
    Icon: TrendingUp,
  },
  {
    name: "Learn",
    text: "A smarter next recommendation.",
    explanation: "The result informs the next experiment. The playbook keeps improving.",
    Icon: CircleCheck,
  },
];

export function ProductExplanation() {
  return (
    <section
      id="product"
      className="product-explanation section-shell"
      aria-labelledby="product-title"
    >
      <h2 id="product-title">
        Not a pipe.
        <br />
        <span className="green-text">
          A brain for your
          <br className="mobile-break" /> delivery channel.
        </span>
      </h2>
      <div className="explanation-content">
        <p className="lead">
          Middleware moves data.
          <br />
          Yamdy decides what to do with it.
        </p>
        <p>
          Yamdy watches performance, finds opportunities, recommends the next move and executes
          after you approve.
        </p>
        <div
          className="data-flow"
          aria-label="HungerStation data to Yamdy decision, human approval, execution and result"
        >
          <span>
            HungerStation<span className="flow-sub">restaurant data</span>
          </span>
          <ArrowDown size={18} />
          <strong>
            yamdy<span className="flow-sub">the decision</span>
          </strong>
          <ArrowDown size={18} />
          <span className="approval-flow">
            <Check size={15} /> Your approval
          </span>
          <ArrowDown size={18} />
          <span>
            Execution <ArrowRight size={15} /> Result
          </span>
        </div>
        <span className="annotation flow-note">always your call.</span>
      </div>
    </section>
  );
}

export function ProductLoop() {
  const [active, setActive] = useState(0);
  const step = steps[active]!;
  return (
    <section id="how-it-works" className="loop-section section-shell" aria-labelledby="loop-title">
      <div className="section-intro">
        <h2 id="loop-title">
          One move.
          <br />A whole lot of learning.
        </h2>
        <p>From a performance signal to an informed action. Then back around, a little smarter.</p>
      </div>
      <div className="loop-layout">
        <div
          className="loop-steps"
          role="tablist"
          aria-label="Yamdy workflow steps"
          aria-orientation="vertical"
        >
          {steps.map((item, i) => (
            <button
              role="tab"
              id={`loop-tab-${i}`}
              aria-selected={active === i}
              aria-controls="loop-panel"
              tabIndex={active === i ? 0 : -1}
              className={`loop-step ${active === i ? "active" : ""}`}
              key={item.name}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
                  e.preventDefault();
                  const next =
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? 6
                        : (i + (e.key === "ArrowDown" ? 1 : 6)) % 7;
                  setActive(next);
                  document.getElementById(`loop-tab-${next}`)?.focus();
                }
              }}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              {item.name}
              <ArrowRight size={18} />
            </button>
          ))}
        </div>
        <div
          id="loop-panel"
          className="loop-panel"
          role="tabpanel"
          aria-labelledby={`loop-tab-${active}`}
          tabIndex={0}
        >
          <span className="example-label">ILLUSTRATIVE WORKFLOW</span>
          <div className="loop-icon">
            <step.Icon size={42} strokeWidth={1.25} />
          </div>
          <h3 key={active}>{step.text}</h3>
          <p>{step.explanation}</p>
          <div className="loop-bottom">
            <span>Classic Burger / Price experiment</span>
            <button aria-label="Next workflow step" onClick={() => setActive((active + 1) % 7)}>
              <ArrowRight size={22} />
            </button>
          </div>
          <Sketch kind="circle" className="loop-sketch" />
        </div>
      </div>
    </section>
  );
}
