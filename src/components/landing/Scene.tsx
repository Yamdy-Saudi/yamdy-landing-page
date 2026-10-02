import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";

const ThreeScene = lazy(() => import("../three/YamdyScene"));
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function BrainFallback() {
  return (
    <svg className="brain-fallback" viewBox="0 0 540 440" aria-hidden="true">
      <ellipse cx="270" cy="355" rx="200" ry="44" fill="var(--yamdy-green)" opacity=".09" />
      <g transform="translate(70 60) rotate(-12 200 150)">
        <path
          d="M25 270V140a80 80 0 0 1 160 0v130h-47V140a33 33 0 0 0-66 0v130Z"
          fill="var(--yamdy-green)"
        />
        <path
          d="M165 230V100a80 80 0 0 1 160 0v130h-47V100a33 33 0 0 0-66 0v130Z"
          fill="var(--green-light)"
        />
        <path
          d="M305 270V160a58 58 0 0 1 116 0v110h-40V160a18 18 0 0 0-36 0v110Z"
          fill="var(--yamdy-green)"
        />
        <rect x="4" y="255" width="432" height="35" rx="6" fill="var(--yamdy-green)" />
        <circle cx="332" cy="55" r="17" fill="var(--yamdy-purple)" />
      </g>
    </svg>
  );
}

export function Scene({ mode }: { mode: "brain" | "flywheel" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [eligible, setEligible] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setEligible(query.matches);
    update();
    query.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(!!entry?.isIntersecting), {
      rootMargin: "80px",
    });
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      query.removeEventListener("change", update);
    };
  }, []);
  return (
    <div ref={ref} className={`scene scene-${mode}`} aria-hidden="true">
      {mode === "brain" && <BrainFallback />}
      {eligible && visible && (
        <SceneBoundary>
          <Suspense fallback={null}>
            <ThreeScene mode={mode} />
          </Suspense>
        </SceneBoundary>
      )}
    </div>
  );
}
