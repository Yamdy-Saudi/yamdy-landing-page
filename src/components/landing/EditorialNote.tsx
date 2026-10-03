import { useId } from "react";
export function EditorialNote({
  word,
  className = "",
  edge = "top",
}: {
  word: string;
  className?: string;
  edge?: "top" | "left";
}) {
  const marker = useId().replace(/:/g, "");
  return (
    <svg className={`editorial-note ${className}`} viewBox="0 0 230 95" aria-hidden="true">
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
      <text x="8" y="32" transform="rotate(-7 8 32)">
        {word}
      </text>
      <path
        className="note-stroke"
        d={edge === "top" ? "M40 42 Q90 40 115 94" : "M40 42 Q120 60 229 47"}
        markerEnd={`url(#${marker})`}
      />
    </svg>
  );
}
