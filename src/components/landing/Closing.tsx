import { MapPin, Store } from "lucide-react";
import { AppLink, Logo } from "./Primitives";

export function SaudiContext() {
  return (
    <section id="saudi-fb" className="local-section chapter" aria-labelledby="saudi-title">
      <div className="chapter-shell local-layout">
        <div>
          <p className="editorial-eyebrow">BUILT FOR SAUDI F&B</p>
          <h2 id="saudi-title">
            Built in Riyadh
            <br />
            for how restaurants
            <br />
            <em>actually operate.</em>
          </h2>
          <p className="local-copy">
            Local market understanding. Delivery-app expertise.
            <br />
            Real restaurant operating context.
          </p>
        </div>
        <div className="local-motif" aria-hidden="true">
          <svg viewBox="0 0 440 380">
            <path
              className="local-lines"
              d="M35 64 396 81M19 177 420 164M37 307 405 293M94 24 71 346M247 19 230 353M372 26 346 350M20 350 401 32"
            />
            <path className="local-route" d="M90 300 91 177 239 166 242 79 361 81" />
            <circle cx="90" cy="300" r="5" />
            <circle cx="361" cy="81" r="5" />
          </svg>
          <div className="local-restaurant">
            <Store size={42} strokeWidth={1.2} />
            <span>THE RESTAURANT</span>
          </div>
          <p className="local-location">
            <MapPin size={21} /> Riyadh / الرياض
          </p>
          <p className="hand-note">close to the day-to-day.</p>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="growth-finale chapter" aria-labelledby="final-title">
      <div className="chapter-shell">
        <Logo light />
        <p className="editorial-eyebrow">YOUR NEXT MOVE STARTS HERE.</p>
        <h2 id="final-title">
          Stop managing delivery apps.
          <br />
          <span>Start managing growth.</span>
        </h2>
        <p>Connect your restaurant and let Yamdy find the next move.</p>
        <div className="final-actions">
          <AppLink className="button button-cream" event="final_cta_click" location="final" />
          <AppLink className="final-signin" event="signin_click">
            Sign in
          </AppLink>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="minimal-footer">
      <div className="chapter-shell footer-main">
        <div>
          <a href="#product" aria-label="Yamdy home">
            <Logo />
          </a>
          <p>Riyadh, Saudi Arabia</p>
        </div>
        <nav aria-label="Footer navigation">
          <a href="#product">Product</a>
          <a href="#how-it-works">How it works</a>
          <a href="#results">Results</a>
          <a href="#why-yamdy">Why Yamdy</a>
        </nav>
        <div className="footer-access">
          <AppLink className="footer-app-link" event="signin_click">
            Sign in
          </AppLink>
          <AppLink className="footer-app-link" location="footer">
            Get started
          </AppLink>
        </div>
      </div>
      <div className="chapter-shell footer-end">
        <span>© {new Date().getFullYear()} Yamdy</span>
        <div aria-label="Legal pages pending publication">
          <span aria-disabled="true" title="Privacy policy pending publication">
            Privacy
          </span>
          <span aria-disabled="true" title="Terms pending publication">
            Terms
          </span>
        </div>
        <span>The growth brain for your delivery channel.</span>
      </div>
    </footer>
  );
}
