import { useRef } from "react";
import { useLandingMotion } from "@/hooks/use-landing-motion";
import { ArrowUpRight } from "lucide-react";
import { Scene } from "./Scene";
import { Sketch } from "./Primitives";

export function Flywheel() {
  const ref = useRef<HTMLElement>(null);
  useLandingMotion(ref, "flywheel");
  return (
    <section
      id="why-yamdy"
      ref={ref}
      className="flywheel-section section-shell"
      aria-labelledby="flywheel-title"
    >
      <div className="flywheel-heading">
        <h2 id="flywheel-title">
          Every experiment
          <br />
          makes the next
          <br />
          <span className="green-text">move smarter.</span>
        </h2>
        <p>A better playbook grows one measured decision at a time.</p>
      </div>
      <div className="flywheel-layout">
        <div
          className="flywheel-visual"
          role="img"
          aria-label="More experiments lead to a better playbook, better decisions and better results, feeding the next experiment."
        >
          <div className="flywheel-orbit">
            <svg viewBox="0 0 440 440" aria-hidden="true">
              <circle
                cx="220"
                cy="220"
                r="148"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 12"
              />
              <path
                d="M220 72a148 148 0 0 1 148 148"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path d="m356 204 13 18 12-18" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>
          </div>
          <Scene mode="flywheel" />
          <div className="flywheel-center">
            <b>yamdy</b>
            <span>Learn. Then go again.</span>
          </div>
          <span className="wheel-label wheel-top">More experiments</span>
          <span className="wheel-label wheel-right">Better playbook</span>
          <span className="wheel-label wheel-bottom">Better decisions</span>
          <span className="wheel-label wheel-left">Better results</span>
          <span className="annotation flywheel-note">
            it compounds.
            <Sketch kind="underline" />
          </span>
        </div>
        <div className="advantage-list">
          {[
            [
              "Experiment velocity",
              "Learn while you operate.",
              "Make focused changes, measure the effect and build a playbook from what you learn.",
            ],
            [
              "Delivery-channel expertise",
              "Built around the channel.",
              "Designed for the realities of restaurant delivery operations. Starting with HungerStation.",
            ],
            [
              "Built above the pipes",
              "Turn connections into decisions.",
              "Data movement is the foundation. Yamdy adds the intelligence and approval layer above it.",
            ],
          ].map(([label, title, copy]) => (
            <article key={label}>
              <span>
                {label}
                <ArrowUpRight size={18} />
              </span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
