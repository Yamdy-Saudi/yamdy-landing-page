import { useEffect, useRef, useState } from "react";
import { MapPin, Store, Truck } from "lucide-react";
import { HandwrittenArrow } from "./EditorialNote";

type Point = [number, number];
export function RiyadhRestaurantScene() {
  const scene = useRef<HTMLDivElement>(null);
  const [geometry, setGeometry] = useState<{
    routes: string[];
    dots: Point[];
    note: string;
  } | null>(null);
  useEffect(() => {
    const parent = scene.current;
    if (!parent) return;
    let frame = 0;
    let revealed = parent.classList.contains("is-revealed");
    const draw = () => {
      frame = 0;
      if (!revealed) return;
      const width = parent.clientWidth,
        height = parent.clientHeight;
      const box = (selector: string) => {
        const el = parent.querySelector<HTMLElement>(selector)!;
        return {
          x: (el.offsetLeft / width) * 100,
          y: (el.offsetTop / height) * 100,
          w: (el.offsetWidth / width) * 100,
          h: (el.offsetHeight / height) * 100,
        };
      };
      // Batch layout reads before the single React update. No scroll listener.
      const a = box(".riyadh-restaurant"),
        b = box(".riyadh-delivery"),
        c = box(".riyadh-intelligence"),
        d = box(".riyadh-workflow"),
        note = box(".riyadh-note");
      const mobile = width < 520;
      const restaurant: Point = [a.x + a.w, a.y + a.h / 2];
      const delivery: Point = [b.x, b.y + b.h / 2];
      const intelligence: Point = [c.x + c.w * 0.5, c.y];
      const actionStart: Point = [c.x + c.w * 0.7, c.y + c.h];
      const actionEnd: Point = [d.x, d.y];
      const control: Point = [
        (actionStart[0] + actionEnd[0]) / 2 + 4,
        (actionStart[1] + actionEnd[1]) / 2,
      ];
      const target: Point = [
        (actionStart[0] + 2 * control[0] + actionEnd[0]) / 4,
        (actionStart[1] + 2 * control[1] + actionEnd[1]) / 4,
      ];
      setGeometry({
        routes: [
          "M" +
            restaurant.join(" ") +
            " Q" +
            (mobile ? 84 : 61) +
            " " +
            (restaurant[1] + 8) +
            " " +
            intelligence.join(" "),
          "M" +
            delivery.join(" ") +
            " Q" +
            (mobile ? 19 : 61) +
            " " +
            (delivery[1] + 8) +
            " " +
            intelligence.join(" "),
          "M" + actionStart.join(" ") + " Q" + control.join(" ") + " " + actionEnd.join(" "),
        ],
        dots: [restaurant, delivery, intelligence, actionStart, actionEnd],
        note:
          "M" +
          (note.x + note.w * 0.7) * 10 +
          " " +
          note.y * 10 +
          " Q" +
          (target[0] - 16) * 10 +
          " " +
          (target[1] + 2) * 10 +
          " " +
          target[0] * 10 +
          " " +
          target[1] * 10,
      });
    };
    const observer = new ResizeObserver(() => {
      if (revealed && !frame) frame = requestAnimationFrame(draw);
    });
    observer.observe(parent);
    parent.querySelectorAll(".riyadh-overlay").forEach((el) => observer.observe(el));
    const reveal = new MutationObserver(() => {
      if (!parent.classList.contains("is-revealed")) return;
      revealed = true;
      if (!frame) frame = requestAnimationFrame(draw);
      reveal.disconnect();
    });
    reveal.observe(parent, { attributes: true, attributeFilter: ["class"] });
    if (revealed) draw();
    return () => {
      observer.disconnect();
      reveal.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div ref={scene} className="riyadh-scene" data-reveal>
      <img
        className="riyadh-photo"
        src="/images/riyadh-restaurant-operator.webp"
        width={1536}
        height={1024}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        sizes="(max-width: 899px) 100vw, 57vw"
        alt="Warm restaurant kitchen pass with delivery orders prepared for service"
      />
      <div className="riyadh-photo-fade" aria-hidden="true" />
      <div className="riyadh-pin">
        <MapPin size={20} strokeWidth={1.5} />
        Riyadh / الرياض
      </div>
      <div className="riyadh-overlay riyadh-restaurant">
        <Store size={36} strokeWidth={1.4} aria-hidden="true" />
        <div>
          <strong>RESTAURANT</strong>
          <span>menus · prices · promos</span>
        </div>
      </div>
      <div className="riyadh-overlay riyadh-delivery">
        <Truck size={34} strokeWidth={1.4} aria-hidden="true" />
        <div>
          <strong>DELIVERY CHANNEL</strong>
          <span>orders · visibility · campaigns</span>
        </div>
      </div>
      <div className="riyadh-overlay riyadh-intelligence">
        <img src="/brand/yamdy-logo.svg" width={116} height={52} alt="Yamdy" />
        <strong>Yamdy Intelligence</strong>
        <span>decisions · experiments · execution</span>
      </div>
      <span className="riyadh-workflow">Service &amp; delivery</span>
      <svg
        className="riyadh-connections"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {geometry?.routes.map((path, index) => (
          <g key={path}>
            <path className="riyadh-route" d={path} pathLength={100} />
            {index < 2 && (
              <circle className="riyadh-pulse" r={0.5} style={{ offsetPath: `path('${path}')` }} />
            )}
          </g>
        ))}
        {geometry?.dots.map(([x, y], index) => (
          <circle key={index} cx={x} cy={y} r={0.55} className="riyadh-anchor" />
        ))}
      </svg>
      <svg
        className="riyadh-hand-note"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {geometry && <HandwrittenArrow path={geometry.note} />}
      </svg>
      <span className="riyadh-note">close to the day-to-day.</span>
    </div>
  );
}
