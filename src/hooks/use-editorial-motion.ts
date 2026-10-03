import { useEffect, type RefObject } from "react";
import { track } from "@/lib/analytics";

export function useEditorialMotion(root: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
    let dispose: (() => void) | undefined;
    let version = 0;
    const setup = async () => {
      const current = ++version;
      dispose?.();
      dispose = undefined;
      if (!preference.matches) return;
      const module = await import("@/lib/editorial-motion");
      if (current === version) dispose = module.attachEditorialMotion(element);
    };
    const request = () => {
      void setup().catch(() => {
        /* Static composition stays complete. */
      });
    };
    const idle = window.requestIdleCallback?.(request, { timeout: 5000 });
    const timer = idle === undefined ? window.setTimeout(request, 2200) : undefined;
    preference.addEventListener("change", request);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          if (entry.target.id === "how-it-works")
            track("product_section_view", { section: "delivery-dilemma" });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.25 },
    );
    const section = element.querySelector("#how-it-works");
    if (section) observer.observe(section);
    element.querySelectorAll("[data-reveal]").forEach((target) => observer.observe(target));
    // Mobile stays library-free; reveal Yamdy only at the end of its chaos chapter.
    const nativeQuery = matchMedia(
      "(max-width: 899px) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    let lastProgress = -1;
    const nativeUpdate = () => {
      frame = 0;
      if (!nativeQuery.matches) {
        if (lastProgress !== -1) {
          element.querySelectorAll<HTMLElement>(".delivery-fragment").forEach((point) => {
            point.style.removeProperty("translate");
          });
          element.querySelector<HTMLElement>(".chaos-yamdy-entry")?.style.removeProperty("opacity");
          lastProgress = -1;
        }
        return;
      }
      const stage = element.querySelector<HTMLElement>(".fragment-composition");
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, (innerHeight * 0.7 - rect.top) / (rect.height + innerHeight * 0.45)),
      );
      if (Math.abs(progress - lastProgress) < 0.002) return;
      lastProgress = progress;
      const moves = [...stage.querySelectorAll<HTMLElement>(".delivery-fragment")].map((point) => ({
        point,
        x: (stage.clientWidth / 2 - point.offsetLeft - point.offsetWidth / 2) * 0.18 * progress,
        y: (stage.clientHeight * 0.53 - point.offsetTop - point.offsetHeight / 2) * 0.18 * progress,
      }));
      moves.forEach(({ point, x, y }) => {
        point.style.translate = `${x}px ${y}px`;
      });
      const logo = stage.querySelector<HTMLElement>(".chaos-yamdy-entry");
      if (logo) logo.style.opacity = String(Math.max(0, (progress - 0.8) * 5));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(nativeUpdate);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    nativeQuery.addEventListener("change", schedule);
    nativeUpdate();
    return () => {
      version++;
      dispose?.();
      observer.disconnect();
      preference.removeEventListener("change", request);
      if (idle !== undefined) cancelIdleCallback(idle);
      if (timer !== undefined) clearTimeout(timer);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      nativeQuery.removeEventListener("change", schedule);
    };
  }, [root]);
}
