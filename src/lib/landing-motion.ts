import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { MotionScene } from "@/hooks/use-landing-motion";

export function attachMotion(root: HTMLElement, scene: MotionScene) {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add(
    "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
    () => {
      if (scene === "page") {
        root.querySelectorAll("h2").forEach((el) =>
          gsap.from(el, {
            y: 16,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          }),
        );
        gsap.from(".signal-card", { y: 15, duration: 0.85, stagger: 0.12, ease: "power2.out" });
        gsap.from(".data-flow > *", {
          y: 10,
          stagger: 0.12,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: { trigger: ".data-flow", start: "top 85%", once: true },
        });
        gsap.from(".proof-line", {
          strokeDasharray: 650,
          strokeDashoffset: 650,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: { trigger: "#results", start: "top 70%", once: true },
        });
      }
      if (scene === "chaos") {
        const elements = root.querySelectorAll<HTMLElement>(".operation-card");
        const offsets = [
          [-28, -28, -8],
          [12, 20, 5],
          [22, -34, 7],
          [35, 12, -5],
          [-22, 26, 6],
          [14, -12, -6],
          [-12, 22, -4],
          [28, 25, 8],
        ];
        elements.forEach((el, i) =>
          gsap.set(el, {
            x: offsets[i]?.[0] ?? 0,
            y: offsets[i]?.[1] ?? 0,
            rotation: offsets[i]?.[2] ?? 0,
          }),
        );
        gsap.to(elements, {
          x: 0,
          y: 0,
          rotation: 0,
          stagger: 0.04,
          ease: "power2.inOut",
          scrollTrigger: { trigger: root, start: "top 65%", end: "center 45%", scrub: 1 },
        });
        gsap.fromTo(
          ".control-line",
          { scaleX: 0.05 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top 40%", end: "bottom 85%", scrub: 1 },
          },
        );
      }
      if (scene === "flywheel")
        gsap.to(".flywheel-orbit", {
          rotation: 130,
          ease: "power2.in",
          scrollTrigger: { trigger: root, start: "top 90%", end: "bottom 15%", scrub: 1.4 },
        });
    },
    root,
  );
  return () => media.revert();
}
