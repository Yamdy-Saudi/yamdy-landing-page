import { AppLink, Logo } from "./Primitives";
import { RiyadhRestaurantScene } from "./RiyadhRestaurantScene";

export function SaudiContext() {
  return (
    <section id="saudi-fb" className="local-section chapter" aria-labelledby="saudi-title">
      <div className="local-layout">
        <div className="local-editorial">
          <p className="editorial-eyebrow">BUILT FOR SAUDI F&B</p>
          <h2 id="saudi-title">
            Built in Riyadh
            <br />
            for how restaurants
            <br />
            <em>actually operate.</em>
          </h2>
          <ul className="local-knowledge">
            <li>Local market understanding</li>
            <li>Delivery-app expertise</li>
            <li>Real restaurant operating context</li>
          </ul>
        </div>
        <RiyadhRestaurantScene />
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
