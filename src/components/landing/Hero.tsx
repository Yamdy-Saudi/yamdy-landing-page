import { ArrowDown, ArrowRight } from "lucide-react";
import { AppLink } from "./Primitives";
import { Scene } from "./Scene";
import { EditorialNote } from "./EditorialNote";

export function Hero() {
  return (
    <section className="editorial-hero" id="product" aria-labelledby="hero-title">
      <div className="hero-composition">
        <div className="editorial-copy">
          <p className="editorial-eyebrow">A NEXT MOVE FOR EVERY RESTAURANT</p>
          <h1 id="hero-title">
            <span className="headline-line">
              The <em>growth brain</em>
            </span>
            <span className="headline-line">for restaurants</span>
            <span className="headline-line">on delivery apps.</span>
          </h1>
          <p className="editorial-description">
            Yamdy watches your delivery business, finds the next move, and helps you execute it.
            Starting with HungerStation.
          </p>
          <div className="editorial-actions">
            <AppLink event="hero_start_click" location="hero" />
            <a href="#how-it-works" className="text-link">
              See how it works <ArrowRight size={19} aria-hidden="true" />
            </a>
          </div>
          <p className="editorial-context">Built in Riyadh. Made for restaurant operators.</p>
        </div>
        <div
          className="logo-stage"
          aria-label="Delivery signals enter the official Yamdy logo and become a recommendation for your approval."
        >
          <Scene mode="brain" />
          <div className="signal-rail" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="rail-signals">
            <div className="rail-signal price-signal">
              <small>PRICE</small>
              <strong>SAR 42</strong>
              <EditorialNote word="observe" />
            </div>
            <div className="rail-signal menu-signal">
              <small>MENU</small>
              <strong>3 items need attention</strong>
            </div>
            <div className="rail-signal performance-signal">
              <small>PERFORMANCE</small>
              <strong>Conversion −8%</strong>
            </div>
          </div>
          <div className="recommendation-fragment">
            <span className="output-anchor" aria-hidden="true" />
            <EditorialNote word="decide" edge="left" />
            <div className="recommendation-heading">
              <span>YAMDY RECOMMENDS</span>
            </div>
            <strong>CLASSIC BURGER</strong>
            <div className="recommendation-price">
              <span>SAR 42</span>
              <ArrowRight size={19} aria-hidden="true" />
              <b>SAR 39</b>
            </div>
            <div className="approval-status">
              <i /> READY FOR APPROVAL
            </div>
          </div>
          <p className="stage-footnote">Illustrative example</p>
        </div>
      </div>
      <a className="hero-scroll-cue" href="#how-it-works">
        <span>THE NEXT MOVE STARTS WITH WHAT YOU SEE.</span>
        <ArrowDown size={18} aria-hidden="true" />
      </a>
      <div className="baseline-bridge" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
