export function Flywheel() {
  return (
    <section
      id="why-yamdy"
      className="compounding-section chapter"
      aria-labelledby="flywheel-title"
    >
      <div className="chapter-shell">
        <p className="editorial-eyebrow">WHY YAMDY GETS BETTER</p>
        <h2 id="flywheel-title">
          Every experiment makes
          <br />
          <em>the next decision smarter.</em>
        </h2>
        <div className="compounding-layout">
          <div
            className="compounding-visual"
            data-reveal
            role="img"
            aria-label="More experiments, better playbook, better decisions, better results, then more experiments. Yamdy is at the center."
          >
            <svg viewBox="0 0 600 520" aria-hidden="true">
              <path
                className="compounding-path"
                pathLength="1000"
                d="M283 68C398 47 526 134 516 267S420 454 289 450 71 353 80 246 157 82 269 69m-19-13 21 13-16 17"
              />
            </svg>
            <div className="compounding-center">
              <img src="/brand/yamdy-logo.svg" alt="" width="270" height="120" />
              <span>MEASURE. LEARN. REPEAT.</span>
            </div>
            <span className="compound-label compound-top">MORE EXPERIMENTS</span>
            <span className="compound-label compound-right">BETTER PLAYBOOK</span>
            <span className="compound-label compound-bottom">BETTER DECISIONS</span>
            <span className="compound-label compound-left">BETTER RESULTS</span>
            <p className="hand-note compound-note">the learning stays.</p>
          </div>
          <ol className="strategic-notes">
            {[
              [
                "EXPERIMENT VELOCITY",
                "A portfolio learns faster.",
                "Test across restaurants, separating signal from noise and building a playbook from measured changes.",
              ],
              [
                "AGGREGATOR ACCESS",
                "Relationships beyond the API.",
                "Ads, top listings, pushes and homepage slots run through account managers. Local relationships matter.",
              ],
              [
                "BUILT ABOVE THE PIPES",
                "Connect once. Focus on decisions.",
                "Plug into partner APIs and existing middleware, then put intelligence and approval above the connection.",
              ],
            ].map(([label, title, copy], index) => (
              <li key={label}>
                <span className="advantage-number">0{index + 1}</span>
                <div>
                  <p className="editorial-eyebrow">{label}</p>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
