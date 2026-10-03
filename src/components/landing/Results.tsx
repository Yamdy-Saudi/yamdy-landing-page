import { useId } from "react";

export function Results() {
  const hatch = useId().replace(/:/g, "");
  return (
    <section id="results" className="pilot-proof chapter" aria-labelledby="results-title">
      <div className="chapter-shell">
        <p className="editorial-eyebrow">EARLY PILOT / ONE CLIENT</p>
        <div className="pilot-composition">
          <div>
            <h2 id="results-title">
              <span className="pilot-number">
                +30<span>%</span>
              </span>
              <span className="pilot-period">
                profit
                <br />
                in one month.
              </span>
            </h2>
            <p className="pilot-method">
              Repriced the menu and built bundles that raised ticket size.
            </p>
          </div>
          <div className="pilot-drawing">
            <p className="hand-note">
              first pilot
              <br />
              <span>Segment C</span>
            </p>
            <svg
              viewBox="0 0 480 330"
              role="img"
              aria-label="Before and after illustration of the reported pilot profit increase; relative change only, not a plotted dataset"
            >
              <defs>
                <pattern
                  id={hatch}
                  width="11"
                  height="11"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(34)"
                >
                  <path d="M0 0V11" stroke="currentColor" strokeWidth="1" opacity=".6" />
                </pattern>
              </defs>
              <path d="M28 267Q246 263 454 266" className="pilot-ink" />
              <path
                d="M81 265 79 141 184 143 186 264M282 264 284 98 390 96 387 265"
                fill={`url(#${hatch})`}
                className="pilot-ink"
              />
              <path d="M122 118Q218 2 316 73m-22-2 23 3-8-22" className="pilot-ink pilot-arrow" />
              <text x="72" y="304">
                month before
              </text>
              <text x="264" y="304">
                ~30 days later
              </text>
            </svg>
            <p className="relative-note">Relative change only.</p>
          </div>
        </div>
        <div className="pilot-qualification">
          <span>First pilot, Segment C · agency engagement</span>
          <p>Result from one client. Not a guarantee of future performance.</p>
        </div>
      </div>
    </section>
  );
}
