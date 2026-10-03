import { MapPin, Store } from "lucide-react";
import { HandwrittenArrow } from "./EditorialNote";

type Point = readonly [number, number];
// Shared curve geometry defines both the connection and its annotation target.
const relationship = {
  start: [155, 195] as Point,
  control: [218, 240] as Point,
  end: [175, 326] as Point,
};
const mobileRelationship = {
  start: [63, 290] as Point,
  control: [41, 322] as Point,
  end: [63, 354] as Point,
};
function curve({ start: a, control: b, end: c }: typeof relationship) {
  return `M${a.join(" ")} Q${b.join(" ")} ${c.join(" ")}`;
}
function midpoint({ start: a, control: b, end: c }: typeof relationship) {
  return `${(a[0] + 2 * b[0] + c[0]) / 4} ${(a[1] + 2 * b[1] + c[1]) / 4}`;
}
function Route({ path }: { path: string }) {
  return (
    <g className="ops-connection">
      <path className="ops-route" d={path} pathLength={100} />
      <circle className="ops-pulse" r={3.5} style={{ offsetPath: `path('${path}')` }} />
    </g>
  );
}
function Channel({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} className="ops-symbol">
      <path d="M4 1 Q0 1 0 6 V37 Q0 42 5 42 H25 Q30 42 30 37 V5 Q30 1 25 1 Z M9 6 H21 M5 16 H25 M5 23 H20 M5 30 H16" />
      <circle cx={15} cy={36} r={1} />
    </g>
  );
}
function Pin({ x, y }: { x: number; y: number }) {
  return (
    <g className="ops-pin" transform={`translate(${x} ${y})`}>
      <MapPin x={0} y={-18} width={21} height={21} strokeWidth={1.4} />
      <text x={30} y={0}>
        Riyadh / الرياض
      </text>
    </g>
  );
}
export function RiyadhOperations() {
  return (
    <div className="riyadh-operations" data-reveal>
      <svg
        className="ops-desktop"
        viewBox="0 0 600 480"
        role="img"
        aria-label="Riyadh operations: restaurant menus, prices and promos connect with delivery orders, visibility and campaigns, and Yamdy decisions, experiments and execution."
      >
        <g className="ops-streets">
          <path
            d="M20 65 Q180 72 322 61 T577 65 M15 222 Q167 205 321 217 T582 214 M30 344 Q237 353 401 331 T590 338 M105 30 Q83 171 99 298 T87 455 M289 22 Q271 183 292 292 T282 454 M495 28 Q481 224 491 442 M18 444 Q210 287 382 152 T578 14"
            pathLength={100}
          />
        </g>
        <Route path="M211 159 Q291 140 345 219" />
        <Route path="M355 284 Q316 342 253 362" />
        <Route path={curve(relationship)} />
        <g className="ops-node ops-restaurant">
          <Store x={94} y={94} width={48} height={48} strokeWidth={1.3} />
          <text className="ops-label" x={67} y={163}>
            RESTAURANT
          </text>
          <text className="ops-detail" x={67} y={186}>
            menus · prices · promos
          </text>
        </g>
        <g className="ops-node ops-channel">
          <Channel x={386} y={193} />
          <text className="ops-label" x={345} y={258}>
            DELIVERY CHANNEL
          </text>
          <text className="ops-detail" x={345} y={281}>
            orders · visibility · campaigns
          </text>
        </g>
        <g className="ops-node ops-yamdy">
          <image href="/brand/yamdy-logo.svg" x={102} y={326} width={140} height={62} />
          <text className="ops-label" x={111} y={410}>
            YAMDY
          </text>
          <text className="ops-detail" x={111} y={433}>
            decisions · experiments · execution
          </text>
        </g>
        <Pin x={366} y={37} />
        <g className="ops-note">
          <text x={380} y={371} transform="rotate(-6 380 371)">
            close to the
            <tspan x={380} dy={29}>
              day-to-day.
            </tspan>
          </text>
          <HandwrittenArrow path={`M380 338 Q281 278 ${midpoint(relationship)}`} />
        </g>
        <g className="ops-anchors">
          <circle cx={211} cy={159} r={3} />
          <circle cx={345} cy={219} r={3} />
          <circle cx={355} cy={284} r={3} />
          <circle cx={253} cy={362} r={3} />
          <circle cx={155} cy={195} r={3} />
          <circle cx={175} cy={326} r={3} />
        </g>
      </svg>
      <svg
        className="ops-mobile"
        viewBox="0 0 360 535"
        role="img"
        aria-label="Riyadh: restaurant reality flows into the delivery channel and Yamdy intelligence. Close to the day-to-day."
      >
        <g className="ops-streets">
          <path
            d="M10 79 Q186 86 347 74 M16 213 Q180 200 342 215 M13 356 Q167 348 346 363 M27 42 Q14 244 23 443 M338 39 Q348 215 335 451"
            pathLength={100}
          />
        </g>
        <Pin x={24} y={37} />
        <Route path="M63 151 Q78 184 63 218" />
        <Route path={curve(mobileRelationship)} />
        <g className="ops-node ops-restaurant">
          <Store x={39} y={94} width={48} height={48} strokeWidth={1.3} />
          <text className="ops-label" x={126} y={114}>
            RESTAURANT
          </text>
          <text className="ops-detail" x={126} y={139}>
            menus · prices · promos
          </text>
        </g>
        <g className="ops-node ops-channel">
          <Channel x={49} y={230} />
          <text className="ops-label" x={126} y={250}>
            DELIVERY CHANNEL
          </text>
          <text className="ops-detail" x={126} y={275}>
            orders · visibility
            <tspan x={126} dy={20}>
              · campaigns
            </tspan>
          </text>
        </g>
        <g className="ops-node ops-yamdy">
          <image href="/brand/yamdy-logo.svg" x={23} y={366} width={81} height={36} />
          <text className="ops-label" x={126} y={382}>
            YAMDY
          </text>
          <text className="ops-detail" x={126} y={408}>
            decisions · experiments
            <tspan x={126} dy={20}>
              · execution
            </tspan>
          </text>
        </g>
        <g className="ops-note">
          <text x={65} y={498} transform="rotate(-5 65 498)">
            close to the day-to-day.
          </text>
          <HandwrittenArrow path={`M144 472 Q20 430 ${midpoint(mobileRelationship)}`} />
        </g>
        <g className="ops-anchors">
          <circle cx={63} cy={151} r={3} />
          <circle cx={63} cy={218} r={3} />
          <circle cx={63} cy={290} r={3} />
          <circle cx={63} cy={354} r={3} />
        </g>
      </svg>
    </div>
  );
}
