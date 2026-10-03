import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
const LogoScene = lazy(() => import("../three/YamdyScene"));
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override render() {
    return this.state.failed ? null : this.props.children;
  }
}
export function Scene({ mode }: { mode: "brain" | "flywheel" }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const query = matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
    let visible = true;
    let ready = false;
    const device = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    const capable =
      !device.connection?.saveData &&
      (device.deviceMemory === undefined || device.deviceMemory >= 4) &&
      navigator.hardwareConcurrency >= 4;
    const update = () => setActive(query.matches && visible && ready && capable);
    const enhance = () => {
      ready = true;
      performance.mark("yamdy:enhancement-requested");
      update();
    };
    // Static hero and CTA hydrate first. Never force enhancement while scrolling.
    const idle = window.requestIdleCallback?.(enhance, { timeout: 3500 });
    const timer = idle === undefined ? window.setTimeout(enhance, 1800) : undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = !!entry?.isIntersecting;
        update();
      },
      { rootMargin: "120px" },
    );
    if (root.current) observer.observe(root.current);
    query.addEventListener("change", update);
    update();
    return () => {
      observer.disconnect();
      query.removeEventListener("change", update);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);
  if (mode === "flywheel") return null;
  return (
    <div
      className={`official-logo-scene${active ? " logo-enabled" : ""}`}
      ref={root}
      aria-hidden="true"
    >
      <img
        className="official-logo-fallback"
        src="/brand/yamdy-logo.svg"
        alt=""
        width="270"
        height="120"
      />
      {active && (
        <SceneBoundary>
          <Suspense fallback={null}>
            <LogoScene />
          </Suspense>
        </SceneBoundary>
      )}
    </div>
  );
}
