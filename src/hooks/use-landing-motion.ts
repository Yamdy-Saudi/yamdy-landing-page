import { useEffect, type RefObject } from "react";

export type MotionScene = "page" | "chaos" | "flywheel";
export function useLandingMotion(ref: RefObject<HTMLElement | null>, scene: MotionScene) {
  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
    );
    let cancel: (() => void) | undefined;
    let generation = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const update = () => {
      const current = ++generation;
      cancel?.();
      cancel = undefined;
      clearTimeout(timer);
      if (!query.matches) return;
      // Leave the initial content render clear of scroll-library setup.
      timer = setTimeout(() => {
        void import("@/lib/landing-motion")
          .then(({ attachMotion }) => {
            if (current === generation && ref.current) cancel = attachMotion(ref.current, scene);
          })
          .catch(() => {
            /* Static layout remains complete if an enhancement cannot load. */
          });
      }, 600);
    };
    update();
    query.addEventListener("change", update);
    return () => {
      ++generation;
      clearTimeout(timer);
      cancel?.();
      query.removeEventListener("change", update);
    };
  }, [ref, scene]);
}
