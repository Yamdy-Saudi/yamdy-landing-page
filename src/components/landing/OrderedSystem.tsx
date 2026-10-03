import { ArrowRight, Check } from "lucide-react";
import { EditorialNote } from "./EditorialNote";

export function OrderedSystem() {
  const stages = [
    "HungerStation",
    "Restaurant data",
    "Yamdy intelligence",
    "Recommendation",
    "Human approval",
    "Execution",
    "Result",
  ];
  return (
    <section
      className="ordered-system story-section"
      id="decision-layer"
      aria-labelledby="system-title"
    >
      <div className="story-shell">
        <p className="editorial-eyebrow">NOT A PIPE. A BRAIN.</p>
        <h2 id="system-title">
          Middleware moves data.
          <br />
          <em>Yamdy decides what to do with it.</em>
        </h2>
        <p className="story-description">
          Yamdy watches performance, finds opportunities, recommends the next move, and helps
          execute it after you approve.
        </p>
        <ol className="ordered-flow" aria-label="From delivery signals to a human-approved result">
          {stages.map((stage, i) => (
            <li key={stage} className={`system-stage system-stage-${i}`}>
              <span className="stage-number">0{i + 1}</span>
              {i === 2 ? (
                <img src="/brand/yamdy-logo.svg" alt="" width="270" height="120" />
              ) : i === 3 ? (
                <span className="decision-value">
                  <s>SAR 42</s> <span>→</span> <b>SAR 39</b>
                </span>
              ) : i === 4 ? (
                <Check size={23} aria-hidden="true" />
              ) : (
                <span className="stage-token" aria-hidden="true">
                  {i === 0 ? "HS" : i === 1 ? "42" : i === 5 ? "39" : "↗"}
                </span>
              )}
              <strong>{stage}</strong>
              {i < 6 && <ArrowRight className="stage-arrow" size={19} aria-hidden="true" />}
            </li>
          ))}
          <li className="process-signal" aria-hidden="true" />
        </ol>
        <div className="continuous-loop-note">
          <EditorialNote word="one continuous loop" />
        </div>
        <p className="workflow-disclaimer">Illustrative workflow · starting with HungerStation</p>
      </div>
    </section>
  );
}
