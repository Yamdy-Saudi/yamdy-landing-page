import { useEffect, useRef } from "react";

/** Endpoints follow actual responsive elements and GSAP transforms. */
export function Connections({
  className = "",
  selector,
  center,
}: {
  className?: string;
  selector: string;
  center: string;
}) {
  const svg = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const element = svg.current,
      parent = element?.parentElement;
    if (!element || !parent) return;
    let frame = 0;
    const draw = () => {
      frame = 0;
      const rect = parent.getBoundingClientRect(),
        destination = parent.querySelector(center)?.getBoundingClientRect();
      if (!destination || !rect.width) return;
      element.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
      [...parent.querySelectorAll(selector)].forEach((target, i) => {
        const box = target.getBoundingClientRect();
        const ax = box.left + box.width / 2,
          ay = box.top + box.height / 2;
        const bx = destination.left + destination.width / 2,
          by = destination.top + destination.height / 2;
        const dx = bx - ax,
          dy = by - ay;
        const a = Math.min(
          box.width / 2 / Math.max(Math.abs(dx), 1),
          box.height / 2 / Math.max(Math.abs(dy), 1),
        );
        const b =
          Math.min(destination.width, destination.height) / 2 / Math.max(Math.hypot(dx, dy), 1);
        const x1 = ax + dx * a - rect.left,
          y1 = ay + dy * a - rect.top,
          x2 = bx - dx * b - rect.left,
          y2 = by - dy * b - rect.top;
        const group = element.querySelectorAll("g")[i];
        group
          ?.querySelector("path")
          ?.setAttribute(
            "d",
            `M${x1} ${y1} Q${(x1 + x2) / 2 + 8} ${(y1 + y2) / 2 - 8} ${x2} ${y2}`,
          );
        const dots = group?.querySelectorAll("circle");
        dots?.[0]?.setAttribute("cx", String(x1));
        dots?.[0]?.setAttribute("cy", String(y1));
        dots?.[1]?.setAttribute("cx", String(x2));
        dots?.[1]?.setAttribute("cy", String(y2));
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(parent);
    const mutation = new MutationObserver(schedule);
    parent
      .querySelectorAll(`${selector}, ${center}`)
      .forEach((target) =>
        mutation.observe(target, { attributes: true, attributeFilter: ["style"] }),
      );
    window.addEventListener("scroll", schedule, { passive: true });
    draw();
    return () => {
      observer.disconnect();
      mutation.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, [selector, center]);
  return (
    <svg ref={svg} className={`anchored-connectors ${className}`} aria-hidden="true">
      {Array.from({ length: 6 }, (_, i) => (
        <g key={i}>
          <path />
          <circle r="3" />
          <circle r="3" />
        </g>
      ))}
    </svg>
  );
}
