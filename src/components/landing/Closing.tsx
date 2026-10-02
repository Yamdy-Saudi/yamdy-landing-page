import { ArrowRight, MapPin } from "lucide-react";
import { AppLink, Logo } from "./Primitives";
import { track } from "@/lib/analytics";

export function SaudiContext() {
  return (
    <section className="saudi-section section-shell" aria-labelledby="saudi-title">
      <div className="riyadh-grid" aria-hidden="true">
        <svg viewBox="0 0 500 250">
          <path d="M0 75h500M0 170h500M100 0v250M220 0v250M380 0v250M0 220 310 0M0 0l360 250" />
        </svg>
        <span className="map-location location-one" />
        <span className="map-location location-two" />
        <span className="map-location location-three" />
        <span className="riyadh-label">
          <MapPin size={16} /> Riyadh / الرياض
        </span>
      </div>
      <div>
        <h2 id="saudi-title">
          Built in Riyadh.
          <br />
          For how restaurants
          <br />
          actually operate.
        </h2>
        <p>
          Local market understanding. Delivery-app expertise. A product shaped around the restaurant
          operator’s day.
        </p>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="final-cta" aria-labelledby="final-title">
      <div className="section-shell">
        <span className="final-kicker">YOUR NEXT MOVE STARTS HERE.</span>
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
    <footer className="site-footer section-shell">
      <div className="footer-top">
        <a href="#" aria-label="Yamdy home">
          <Logo />
        </a>
        <p>Riyadh, Saudi Arabia</p>
        <div className="footer-links">
          {[
            ["Product", "#product"],
            ["How it works", "#how-it-works"],
            ["Results", "#results"],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={() => track("nav_click", { section: label! })}>
              {label}
            </a>
          ))}
          <AppLink className="footer-app-link" event="signin_click">
            Sign in
          </AppLink>
          <AppLink className="footer-app-link" location="footer">
            Get started
          </AppLink>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Yamdy</span>
        <span>
          The growth brain for your delivery channel.
          <ArrowRight size={14} />
        </span>
      </div>
    </footer>
  );
}
