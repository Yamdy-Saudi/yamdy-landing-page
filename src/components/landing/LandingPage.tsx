import { useEffect, useRef } from "react";
import { useLandingMotion } from "@/hooks/use-landing-motion";
import { track } from "@/lib/analytics";
import { Navigation } from "./Navigation";
import { Hero } from "./Hero";
import { ChaosControl } from "./ChaosControl";
import { ProductExplanation, ProductLoop } from "./ProductLoop";
import { RecommendationDemo } from "./RecommendationDemo";
import { ControlCenter } from "./ControlCenter";
import { Results } from "./Results";
import { Flywheel } from "./Flywheel";
import { FinalCTA, Footer, SaudiContext } from "./Closing";

export function LandingPage() {
  const ref = useRef<HTMLDivElement>(null);
  useLandingMotion(ref, "page");
  useEffect(() => {
    const viewed = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting && !viewed.has(entry.target.id)) {
            viewed.add(entry.target.id);
            track(entry.target.id === "results" ? "results_section_view" : "product_section_view");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.25 },
    );
    ref.current?.querySelectorAll("#product, #results").forEach((el) => observer.observe(el));
    const reveal = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            reveal.unobserve(entry.target);
          }
        }),
      { threshold: 0.15 },
    );
    ref.current
      ?.querySelectorAll(".operations-grid, .flywheel-visual, h2")
      .forEach((el) => reveal.observe(el));
    return () => {
      observer.disconnect();
      reveal.disconnect();
    };
  }, []);
  return (
    <div className="landing-page" ref={ref}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <Hero />
        <ChaosControl />
        <ProductExplanation />
        <ProductLoop />
        <RecommendationDemo />
        <ControlCenter />
        <Results />
        <Flywheel />
        <SaudiContext />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
