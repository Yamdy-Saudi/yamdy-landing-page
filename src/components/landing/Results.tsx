import { ArrowUpRight } from "lucide-react";
import { Sketch } from "./Primitives";

export function Results() {
  return (
    <section id="results" className="results-section section-shell" aria-labelledby="results-title">
      <div className="results-top">
        <span className="section-kicker">EARLY SIGNAL. REAL POTENTIAL.</span>
        <h2 id="results-title">
          Better decisions.
          <br />
          Measured in the business.
        </h2>
      </div>
      <div className="result-proof">
        <div className="result-number">
          <span>Early pilot</span>
          <strong>
            +30<span>%</span>
            <ArrowUpRight aria-hidden="true" />
          </strong>
          <h3>profit in one month.</h3>
          <p>
            First pilot, Segment C. Result from one client; not a guarantee of future performance.
          </p>
        </div>
        <div className="result-chart">
          <div className="chart-labels">
            <span>Less guessing.</span>
            <span className="annotation">
              more learning.
              <Sketch />
            </span>
          </div>
          <svg
            viewBox="0 0 600 240"
            role="img"
            aria-label="Conceptual upward line illustrating the reported pilot result, not a plotted dataset"
          >
            <path className="chart-grid-line" d="M20 55H580M20 115H580M20 175H580" />
            <path
              className="proof-line"
              d="M20 209C67 202 83 220 126 181S179 179 210 163 256 165 300 130 354 151 391 95 438 114 473 68 516 92 564 24"
            />
            <path d="m543 25 22-4-3 23" className="proof-line" />
          </svg>
          <div className="chart-axis">
            <span>Month before</span>
            <span>30 days later</span>
          </div>
          <p>Reported pilot outcome. Conceptual illustration, not a historical chart.</p>
        </div>
      </div>
    </section>
  );
}
