/** Direction A — flap-tile wordmark (SVG). */

type Props = { className?: string; compact?: boolean };

export function WordmarkDepartures({ className = "", compact }: Props) {
  const letters = ["S", "I", "N", "G", "H"];
  return (
    <svg
      className={className}
      viewBox={compact ? "0 0 56 56" : "0 0 280 88"}
      role="img"
      aria-label="Singh Tour & Travels"
      xmlns="http://www.w3.org/2000/svg"
    >
      {compact ? (
        <>
          <rect x="4" y="8" width="48" height="40" rx="2" fill="#1A2236" />
          <line
            x1="4"
            y1="28"
            x2="52"
            y2="28"
            stroke="#0E1424"
            strokeWidth="1.5"
          />
          <text
            x="28"
            y="36"
            textAnchor="middle"
            fill="#F2A93B"
            fontFamily="Teko, Impact, sans-serif"
            fontWeight="600"
            fontSize="28"
            letterSpacing="2"
          >
            S
          </text>
        </>
      ) : (
        <>
          {letters.map((L, i) => {
            const x = 8 + i * 42;
            return (
              <g key={L + i}>
                <rect
                  x={x}
                  y="6"
                  width="38"
                  height="42"
                  rx="2"
                  fill="#1A2236"
                />
                <line
                  x1={x}
                  y1="27"
                  x2={x + 38}
                  y2="27"
                  stroke="#0E1424"
                  strokeWidth="1.5"
                />
                <text
                  x={x + 19}
                  y="36"
                  textAnchor="middle"
                  fill="#F2A93B"
                  fontFamily="Teko, Impact, sans-serif"
                  fontWeight="600"
                  fontSize="26"
                  letterSpacing="1"
                >
                  {L}
                </text>
              </g>
            );
          })}
          <text
            x="8"
            y="68"
            fill="#F4EFE6"
            fontFamily="IBM Plex Mono, monospace"
            fontWeight="500"
            fontSize="11"
            letterSpacing="3.2"
          >
            TOUR &amp; TRAVELS
          </text>
          <text
            x="8"
            y="84"
            fill="#9AA3B5"
            fontFamily="Rajdhani, sans-serif"
            fontWeight="600"
            fontSize="13"
          >
            सिंह टूर &amp; ट्रेवल्स
          </text>
        </>
      )}
    </svg>
  );
}
