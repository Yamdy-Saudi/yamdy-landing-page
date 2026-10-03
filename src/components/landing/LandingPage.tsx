import { useRef } from "react";
import { Navigation } from "./Navigation";
import { Hero } from "./Hero";
import { ChaosControl } from "./ChaosControl";
import { OrderedSystem } from "./OrderedSystem";
import { EditorialLoop } from "./EditorialLoop";
import { RecommendationDemo } from "./RecommendationDemo";
import { Results } from "./Results";
import { Flywheel } from "./Flywheel";
import { SaudiContext, FinalCTA, Footer } from "./Closing";
import { useEditorialMotion } from "@/hooks/use-editorial-motion";

export function LandingPage() {
  const root = useRef<HTMLDivElement>(null);
  useEditorialMotion(root);
  return (
    <div className="landing-page editorial" ref={root}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <Hero />
        <ChaosControl />
        <OrderedSystem />
        <EditorialLoop />
        <RecommendationDemo />
        <Results />
        <Flywheel />
        <SaudiContext />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
