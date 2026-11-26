import { cn } from "@/lib/utils";

/** Place coordinates in viewBox 0 0 360 562 (equirectangular, illustrative). */
export const MAP_POINTS = {
  delhi: { x: 186, y: 402, label: "Delhi" },
  agra: { x: 232, y: 493, label: "Agra" },
  jaipur: { x: 108, y: 510, label: "Jaipur" },
  amritsar: { x: 57, y: 209, label: "Amritsar" },
  shimla: { x: 184, y: 243, label: "Shimla" },
  manali: { x: 185, y: 170, label: "Manali" },
  leh: { x: 207, y: 48, label: "Leh" },
  srinagar: { x: 53, y: 53, label: "Srinagar" },
  katra: { x: 60, y: 123, label: "Katra" },
  haridwar: { x: 239, y: 316, label: "Haridwar" },
  rishikesh: { x: 245, y: 307, label: "Rishikesh" },
  yamunotri: { x: 255, y: 249, label: "" },
  gangotri: { x: 282, y: 250, label: "" },
  kedarnath: { x: 289, y: 267, label: "" },
  badrinath: { x: 312, y: 266, label: "" },
} as const;

export const ROUTE_PATHS = {
  triangle:
    "M186 402 Q210 450 232 493 Q170 520 108 510 Q140 450 186 402",
  amritsar: "M186 402 Q120 320 57 209",
  himalaya: "M186 402 Q185 320 184 243 Q184 205 185 170 Q190 110 207 48",
  ganga:
    "M186 402 Q220 360 239 316 Q242 312 245 307 Q270 280 289 267 Q300 266 312 266",
  kashmir: "M186 402 Q110 280 60 123 Q55 90 53 53",
} as const;

export type RoutePathId = keyof typeof ROUTE_PATHS;

type Props = {
  activeId?: RoutePathId | null;
  /** When true, all routes fully drawn (reduced motion / landscape chapter mini). */
  staticAll?: boolean;
  /** Highlight only one route at full opacity; others dimmed. */
  highlightOnly?: RoutePathId | null;
  litPlaces?: string[];
  className?: string;
  /** Compact chapter thumbnail */
  compact?: boolean;
};

export function NorthMapSvg({
  activeId = null,
  staticAll = false,
  highlightOnly = null,
  litPlaces = [],
  className,
  compact,
}: Props) {
  const lit = new Set(litPlaces.map((p) => p.toLowerCase()));

  return (
    <svg
      viewBox="0 0 360 562"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="Illustrative map of example routes north from Delhi. Not to scale."
    >
      <rect width="360" height="562" fill="#14271E" />

      {/* Hairline rivers — not to scale */}
      <path
        d="M232 493 Q235 400 239 316 Q242 280 255 249"
        fill="none"
        stroke="#2F5A44"
        strokeWidth="1"
        opacity="0.7"
      />
      <path
        d="M186 402 Q200 360 220 320"
        fill="none"
        stroke="#2F5A44"
        strokeWidth="1"
        opacity="0.5"
      />

      {(
        Object.entries(ROUTE_PATHS) as [RoutePathId, string][]
      ).map(([id, d]) => {
        const highlight =
          highlightOnly != null
            ? highlightOnly === id
            : activeId == null || activeId === id || staticAll;
        const isActive = highlightOnly != null ? highlightOnly === id : activeId === id;

        return (
          <path
            key={id}
            id={`route-${id}`}
            data-route={id}
            d={d}
            className={cn(
              "route-path",
              staticAll && "is-static",
              !staticAll && isActive && "is-active",
              !staticAll && !highlight && "is-dim",
              !staticAll && highlight && !isActive && activeId == null && "is-active",
            )}
            pathLength={1}
            style={
              staticAll
                ? { strokeDasharray: "1", strokeDashoffset: 0 }
                : isActive || (activeId == null && highlight)
                  ? { strokeDasharray: "1", strokeDashoffset: 0 }
                  : highlightOnly === id
                    ? { strokeDasharray: "1", strokeDashoffset: 0 }
                    : highlightOnly != null
                      ? { strokeDasharray: "1", strokeDashoffset: 0, opacity: 0.2 }
                      : { strokeDasharray: "1", strokeDashoffset: 1 }
            }
          />
        );
      })}

      {/* Char Dham cluster label */}
      {!compact && (
        <text
          x="300"
          y="240"
          fill="#C9D3C9"
          fontSize="11"
          fontFamily="var(--font-mukta), sans-serif"
        >
          Char Dham
        </text>
      )}

      {Object.entries(MAP_POINTS).map(([key, pt]) => {
        if (!pt.label && compact) return null;
        const isDelhi = key === "delhi";
        const isLit =
          isDelhi ||
          lit.has(key) ||
          lit.has(pt.label.toLowerCase()) ||
          staticAll ||
          litPlaces.length === 0;
        return (
          <g key={key}>
            <circle
              cx={pt.x}
              cy={pt.y}
              r={isDelhi ? 6 : 4}
              fill={isDelhi ? "#F6F1E7" : isLit ? "#B08D57" : "#2F5A44"}
              stroke={isDelhi ? "#D9BC85" : "none"}
              strokeWidth={isDelhi ? 1.5 : 0}
            />
            {pt.label && !compact && (
              <text
                x={
                  key === "rishikesh"
                    ? pt.x + 10
                    : key === "haridwar"
                      ? pt.x - 8
                      : pt.x + 8
                }
                y={pt.y + 4}
                fill="#C9D3C9"
                fontSize="13"
                fontFamily="var(--font-mukta), sans-serif"
                textAnchor={
                  key === "haridwar"
                    ? "end"
                    : key === "amritsar" || key === "srinagar" || key === "katra"
                      ? "start"
                      : "start"
                }
              >
                {pt.label}
              </text>
            )}
          </g>
        );
      })}

      <text
        x="12"
        y="548"
        fill="#C9D3C9"
        fontSize="10"
        fontFamily="var(--font-mukta), sans-serif"
        opacity="0.7"
      >
        Illustrative · not to scale
      </text>
    </svg>
  );
}
