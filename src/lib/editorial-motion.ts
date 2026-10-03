import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function attachEditorialMotion(root: HTMLElement) {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add(
    "(prefers-reduced-motion: no-preference)",
    () => {
      const hero = root.querySelector(".editorial-hero");
      const scroll = gsap.timeline({
        scrollTrigger: { trigger: hero, start: "top top", end: "+=85%", scrub: 0.7 },
      });
      scroll
        .to(".baseline-bridge span", { scaleX: 1, ease: "none" }, 0)
        .to(".signal-rail", { scaleX: 1.3, ease: "none" }, 0)
        .fromTo(
          ".delivery-dilemma",
          { clipPath: "inset(24px 0 0 0)" },
          { clipPath: "inset(0px 0 0 0)", ease: "none" },
          0,
        )
        .to(".menu-signal", { x: 55, y: -12 }, 0)
        .to(".performance-signal", { x: -65, y: 20 }, 0);
      const rail = root.querySelector<HTMLElement>(".signal-rail");
      const logoStage = root.querySelector<HTMLElement>(".logo-stage");
      if (rail && logoStage && hero)
        scroll.to(
          rail,
          {
            x: () => -logoStage.getBoundingClientRect().left,
            y: () =>
              hero.getBoundingClientRect().bottom -
              logoStage.getBoundingClientRect().top -
              logoStage.clientHeight * 0.6 -
              12,
            scaleX: () => innerWidth / (logoStage.clientWidth * 1.04),
            duration: 0.5,
            ease: "none",
          },
          0.5,
        );
      const stage = root.querySelector<HTMLElement>(".fragment-composition");
      if (stage) {
        const points = stage.querySelectorAll<HTMLElement>(".delivery-fragment");
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top 70%",
            end: "bottom 25%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        points.forEach((point) => {
          // Begin convergence, preserving scattered identities for this review milestone.
          timeline.to(
            point,
            {
              x: () => (stage.clientWidth / 2 - point.offsetLeft - point.offsetWidth / 2) * 0.18,
              y: () => (stage.clientHeight / 2 - point.offsetTop - point.offsetHeight / 2) * 0.18,
              rotation: 0,
              ease: "power1.inOut",
            },
            0,
          );
        });
        timeline.to(".chaos-yamdy-entry", { opacity: 1, y: 0, duration: 0.2 }, 0.8);
      }
      const flow = root.querySelector(".ordered-flow");
      if (flow)
        gsap.fromTo(
          ".process-signal",
          { left: "0%" },
          {
            left: "98%",
            duration: 2.5,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: flow,
              start: "top 80%",
              toggleActions: "play none none reset",
            },
          },
        );
      const path = root.querySelector<SVGPathElement>(".loop-return-path path");
      const traveler = root.querySelector<SVGCircleElement>(".loop-traveler");
      if (path && traveler) {
        const progress = { value: 0, phase: -1 },
          length = path.getTotalLength();
        gsap.to(progress, {
          value: 1,
          duration: 4,
          ease: "none",
          scrollTrigger: {
            trigger: ".loop-orbit",
            start: "top 75%",
            toggleActions: "play none none reset",
          },
          onUpdate: () => {
            const point = path.getPointAtLength(progress.value * length);
            traveler.setAttribute("cx", String(point.x));
            traveler.setAttribute("cy", String(point.y));
            const phase = Math.floor(progress.value * 7) % 7;
            if (phase !== progress.phase) {
              progress.phase = phase;
              window.dispatchEvent(new CustomEvent("yamdy:loop-stage", { detail: phase }));
            }
          },
        });
      }
    },
    root,
  );
  return () => media.revert();
}
