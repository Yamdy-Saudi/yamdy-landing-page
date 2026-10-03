import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const stages = [
  ["Observe", "Spot opportunities", "Conversion has weakened."],
  ["Diagnose", "Understand why", "The price sits above comparable offers."],
  ["Recommend", "Propose the next move", "Try SAR 39 instead of SAR 42."],
  ["Approve", "You stay in control", "Review the move before anything changes."],
  ["Execute", "Make the change", "Publish the approved price."],
  ["Measure", "See what happened", "Compare orders and conversion."],
  ["Learn", "Get smarter", "Feed the result into the next observation."],
];
export function EditorialLoop() {
  const [active, setActive] = useState(0);
  const manual = useRef(false);
  const choose = (index: number) => {
    manual.current = true;
    setActive(index);
  };
  useEffect(() => {
    const follow = (event: Event) => {
      if (!manual.current) setActive((event as CustomEvent<number>).detail);
    };
    window.addEventListener("yamdy:loop-stage", follow);
    return () => window.removeEventListener("yamdy:loop-stage", follow);
  }, []);
  return (
    <section className="editorial-loop story-section" id="yamdy-loop" aria-labelledby="loop-title">
      <div className="story-shell loop-story-layout">
        <div className="loop-story-copy">
          <p className="editorial-eyebrow">THE YAMDY LOOP</p>
          <h2 id="loop-title">
            From data
            <br />
            to growth.
            <br />
            <em>On repeat.</em>
          </h2>
          <p>Every result becomes the starting point for a better next move.</p>
          <span className="workflow-disclaimer">Illustrative workflow</span>
        </div>
        <div className="loop-orbit">
          <svg
            className="loop-return-path"
            viewBox="0 0 700 600"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M350 55 C660 55 690 180 635 330 S430 570 220 510 S-25 220 130 100 Q210 55 350 55" />
            <circle className="loop-traveler" r="5" cx="350" cy="55" />
          </svg>
          <div className="loop-current" aria-live="polite" aria-atomic="true">
            <span>CLASSIC BURGER</span>
            <h3>{stages[active]![0]}</h3>
            <strong>
              SAR 42 <ArrowRight size={22} aria-hidden="true" /> <em>SAR 39</em>
            </strong>
            <p>{stages[active]![2]}</p>
            <button onClick={() => choose((active + 1) % 7)}>
              {active === 6 ? "Back to Observe" : "Follow the next move"}
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
          <ol className="loop-stage-list">
            {stages.map(([name, phrase], i) => (
              <li key={name} className={`loop-position-${i}`}>
                <button aria-pressed={active === i} onClick={() => choose(i)}>
                  <span>0{i + 1}</span>
                  <b>{name}</b>
                  <small>{phrase}</small>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
