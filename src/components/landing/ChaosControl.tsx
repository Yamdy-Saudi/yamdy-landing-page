import { EditorialNote } from "./EditorialNote";
import { Connections } from "./Connections";
import { Store } from "lucide-react";
const fragments = [
  { name: "Pricing", value: "SAR 42 ?", className: "pricing-fragment", note: "set once" },
  { name: "Menu", value: "3 items", className: "menu-fragment", note: "" },
  { name: "Promo", value: "−15% ?", className: "promo-fragment", note: "guess?" },
  { name: "Orders", value: "↓", className: "orders-fragment", note: "what changed?" },
  { name: "Visibility", value: "?", className: "visibility-fragment", note: "" },
  {
    name: "Reconciliation",
    value: "…",
    className: "reconciliation-fragment",
    note: "who’s watching this?",
  },
];
export function ChaosControl() {
  return (
    <section className="delivery-dilemma" id="how-it-works" aria-labelledby="dilemma-title">
      <div className="dilemma-shell">
        <div className="dilemma-heading">
          <p className="editorial-eyebrow">THE DAILY DELIVERY DILEMMA</p>
          <h2 id="dilemma-title">
            Your biggest
            <br />
            digital channel.
            <br />
            <em>Running on autopilot.</em>
          </h2>
          <p className="dilemma-description">
            Prices set once. Promotions guessed.
            <br />A hundred signals. No clear next move.
          </p>
          <span className="dilemma-index">01 / THE DAILY DILEMMA</span>
        </div>
        <div
          className="fragment-composition"
          aria-label="Pricing, menu, promotions, orders, visibility and reconciliation are scattered around the restaurant."
        >
          <Connections selector=".delivery-fragment" center=".restaurant-point" />
          <div className="restaurant-point">
            <span>RESTAURANT</span>
            <Store size={40} strokeWidth={1.2} aria-hidden="true" />
            <img
              className="chaos-yamdy-entry"
              src="/brand/yamdy-logo.svg"
              alt=""
              aria-hidden="true"
              width="270"
              height="120"
            />
          </div>
          {fragments.map((fragment) => (
            <div key={fragment.name} className={`delivery-fragment ${fragment.className}`}>
              <span>{fragment.name}</span>
              <strong>{fragment.value}</strong>
              {fragment.note && <EditorialNote word={fragment.note} />}
            </div>
          ))}
        </div>
      </div>
      <div className="dilemma-bottom">
        <span>FROM SCATTERED SIGNALS</span>
        <span>TOWARD A CLEARER DECISION ↗</span>
      </div>
    </section>
  );
}
