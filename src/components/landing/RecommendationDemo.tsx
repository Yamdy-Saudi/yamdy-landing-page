import { useEffect, useRef, useState } from "react";
import { Check, ChevronRight, RotateCcw, TrendingUp } from "lucide-react";
import { track } from "@/lib/analytics";
import { AppLink } from "./Primitives";

type Status = "ready" | "editing" | "approved" | "publishing" | "live" | "ignored";
export function RecommendationDemo() {
  const [status, setStatus] = useState<Status>("ready");
  const [price, setPrice] = useState("39");
  const [error, setError] = useState("");
  const started = useRef(false);
  const previousPrice = useRef("39");
  const begin = () => {
    if (!started.current) {
      track("interactive_demo_started");
      started.current = true;
    }
  };
  useEffect(() => {
    if (status !== "approved" && status !== "publishing") return;
    const timer = window.setTimeout(
      () => setStatus(status === "approved" ? "publishing" : "live"),
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 150 : 1100,
    );
    return () => window.clearTimeout(timer);
  }, [status]);
  function approve() {
    begin();
    if (!Number.isFinite(Number(price)) || Number(price) < 1 || Number(price) > 999) {
      setError("Enter a price between SAR 1 and SAR 999.");
      return;
    }
    setError("");
    setStatus("approved");
    track("interactive_demo_approved", { scenario: "classic_burger" });
  }
  function reset() {
    setStatus("ready");
    setPrice("39");
    setError("");
  }
  const inProgress = ["approved", "publishing", "live"].includes(status);
  return (
    <section
      className="demo-section story-section"
      id="recommendation-demo"
      aria-labelledby="demo-title"
    >
      <img
        className="demo-photograph"
        src="/images/yamdy-kitchen.webp"
        alt=""
        width="1536"
        height="1024"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
      />
      <div className="demo-copy">
        <span className="editorial-eyebrow">YOUR NEXT MOVE, IN YOUR HANDS</span>
        <h2 id="demo-title">
          Real recommendations.
          <br />
          <span>Real actions.</span>
        </h2>
        <p>
          No black box. No changes behind your back. Try a simple price recommendation and see how
          approval becomes action.
        </p>
        <span className="demo-note">
          Interactive example. No account needed.
          <br />
          No changes to a real restaurant.
        </span>
        <div className="demo-context-rail" aria-hidden="true">
          <span>THE PASS</span>
          <i />
          <span>THE NEXT ORDER</span>
        </div>
      </div>
      <div className="demo-workspace">
        <div className="workspace-top">
          <span>
            <span className="status-dot" /> Opportunities / Pricing
          </span>
          <span>DEMO</span>
        </div>
        <div className="recommendation-card">
          <div className="recommendation-top">
            <span className="recommendation-type">Pricing Opportunity</span>
            <span className="example-label">Illustrative example</span>
          </div>
          <div className="menu-item">
            <div>
              <h3>Reduce Classic Burger price</h3>
              <p>Classic Burger · HungerStation</p>
            </div>
          </div>
          <div className="price-comparison">
            <div>
              <span>Current price</span>
              <b>SAR 42</b>
            </div>
            <ChevronRight size={23} />
            <div>
              <span>Recommended</span>
              <b className="green-text">SAR {price || "…"}</b>
            </div>
          </div>
          <p className="recommendation-reason">
            Price sits above comparable offers while conversion has weakened.
          </p>
          {status === "editing" && (
            <form
              className="price-form"
              onSubmit={(e) => {
                e.preventDefault();
                approve();
              }}
            >
              <label htmlFor="demo-price">Your price (SAR)</label>
              <input
                id="demo-price"
                type="number"
                min="1"
                max="999"
                step=".01"
                value={price}
                autoFocus
                onChange={(e) => setPrice(e.target.value)}
                aria-describedby={error ? "price-error" : undefined}
              />
              {error && (
                <p id="price-error" role="alert">
                  {error}
                </p>
              )}
              <div>
                <button className="button button-primary" type="submit">
                  Save & approve <Check size={16} />
                </button>
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() => {
                    setStatus("ready");
                    setPrice(previousPrice.current);
                    setError("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
          {status === "ready" && (
            <div className="demo-actions">
              <button className="button button-primary" onClick={approve}>
                <Check size={16} /> Approve
              </button>
              <button
                className="button button-secondary"
                onClick={() => {
                  begin();
                  previousPrice.current = price;
                  setStatus("editing");
                }}
              >
                Edit
              </button>
              <button
                className="ignore-button"
                onClick={() => {
                  begin();
                  setStatus("ignored");
                }}
              >
                Ignore
              </button>
            </div>
          )}
          <div aria-live="polite" aria-atomic="true" className="demo-status">
            {(status === "ready" || status === "editing") && (
              <div className="approval-contract">
                <span>AWAITING YOUR APPROVAL</span>
                <p>Nothing is published until you approve.</p>
              </div>
            )}
            {inProgress && (
              <>
                <div className="publication-stages">
                  {["Approved", "Publishing", "Live"].map((label, i) => (
                    <span
                      className={
                        i <= (status === "approved" ? 0 : status === "publishing" ? 1 : 2)
                          ? "complete"
                          : ""
                      }
                      key={label}
                    >
                      <Check size={14} /> {label}
                    </span>
                  ))}
                </div>
                {status === "live" && (
                  <div className="outcome-panel">
                    <TrendingUp size={24} />
                    <div>
                      <span className="example-label">ILLUSTRATIVE RESULT</span>
                      <b>Orders ↑ &nbsp; Conversion ↑</b>
                      <p>Revenue impact · estimated</p>
                      <p>Simulated outcome, not historical performance. Actual results can vary.</p>
                    </div>
                  </div>
                )}
              </>
            )}
            {status === "ignored" && (
              <div className="ignored-panel">
                <b>Recommendation ignored.</b>
                <p>You stay in control. Nothing is published.</p>
              </div>
            )}
          </div>
          {(status === "live" || status === "ignored") && (
            <div className="demo-completion">
              <AppLink location="recommendation demo">Try Yamdy with your restaurant</AppLink>
              <button className="reset-button" onClick={reset}>
                <RotateCcw size={14} /> Try again
              </button>
            </div>
          )}
        </div>
        <div className="demo-workspace-footer">
          <Check size={13} />
          <span>Human approved. Then executed.</span>
        </div>
      </div>
    </section>
  );
}
