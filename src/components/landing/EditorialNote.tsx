import { useId } from "react";
/** A shared open arrowhead; geometry belongs to the object/connection being annotated. */
export function HandwrittenArrow({ path }: { path: string }) {
  const marker = useId().replace(/:/g, "");
  return (
    <g>
      <defs>
        <marker
          id={marker}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M1 1 9 5 1 9" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </marker>
      </defs>
      <path className="note-stroke" d={path} pathLength={100} markerEnd={`url(#${marker})`} />
    </g>
  );
}
export function EditorialNote({
  word,
  className = "",
  edge = "top",
}: {
  word: string;
  className?: string;
  edge?: "top" | "left";
}) {
  return (
    <svg className={`editorial-note ${className}`} viewBox="0 0 230 95" aria-hidden="true">
      <text x="8" y="32" transform="rotate(-7 8 32)">
        {word}
      </text>
      <HandwrittenArrow path={edge === "top" ? "M40 42 Q90 40 115 94" : "M40 42 Q120 60 229 47"} />
    </svg>
  );
}
