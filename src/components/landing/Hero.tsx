import { ArrowRight, Check, SlidersHorizontal, TrendingUp } from "lucide-react";
import { AppLink, Sketch } from "./Primitives";
import { Scene } from "./Scene";

export function Hero() {
  return (
    <section className="hero section-shell" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="hero-eyebrow">
          <span className="status-dot" /> A NEXT MOVE FOR EVERY RESTAURANT
        </div>
        <h1 id="hero-title">
          The growth{" "}
          <span className="brain-word">
            brain
            <Sketch kind="underline" />
          </span>{" "}
          for restaurants on delivery apps.
        </h1>
        <p className="hero-description">
          Yamdy watches your delivery business, finds the next move, and helps you execute it.
          Starting with HungerStation.
        </p>
        <div className="hero-actions">
          <AppLink event="hero_start_click" location="hero" />
          <a className="text-link" href="#how-it-works">
            See how it works <ArrowRight size={17} />
          </a>
        </div>
        <p className="hero-context">Built in Riyadh. Made for restaurant operators.</p>
      </div>
      <div
        className="hero-art"
        role="img"
        aria-label="Menu and delivery signals pass through a Yamdy logo-inspired intelligence sculpture and become recommendations requiring your approval."
      >
        <div className="art-grid" />
        <div className="art-orbit orbit-one" />
        <div className="art-orbit orbit-two" />
        <Scene mode="brain" />
        <div className="signal-card signal-price">
          <span className="signal-icon">
            <SlidersHorizontal size={16} />
          </span>
          <div>
            <small>MENU PRICING</small>
            <b>
              SAR 42 <span className="muted-arrow">→</span> <em>39</em>
            </b>
          </div>
          <span className="mini-tag">Test</span>
        </div>
        <div className="signal-card signal-order">
          <span className="signal-icon purple-icon">
            <TrendingUp size={17} />
          </span>
          <div>
            <small>PERFORMANCE SIGNAL</small>
            <b>Find the next move.</b>
          </div>
          <svg viewBox="0 0 70 30" aria-hidden="true">
            <path
              d="M2 25l12-8 11 4 13-14 12 5L68 2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="signal-card signal-decision">
          <span className="decision-check">
            <Check size={17} />
          </span>
          <div>
            <small>YAMDY RECOMMENDS</small>
            <b>A better price. Your call.</b>
            <span>
              Ready for your approval <ArrowRight size={13} />
            </span>
          </div>
        </div>
        <div className="annotation annotation-observe">
          observe
          <Sketch />
        </div>
        <div className="annotation annotation-decide">
          decide
          <Sketch />
        </div>
        <div className="annotation annotation-learn">test. measure. learn.</div>
        <span className="art-caption">ILLUSTRATIVE PRODUCT CONCEPT</span>
      </div>
      <div className="hero-bottom">
        <span>YOUR DELIVERY CHANNEL. WITH A DIRECTION.</span>
        <span>
          Intelligence above the pipes <ArrowRight size={15} />
        </span>
      </div>
    </section>
  );
}
