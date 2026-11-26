/** Direction B — seal monogram wordmark (SVG). */

type Props = { className?: string; sealOnly?: boolean };

export function WordmarkSafarnama({ className = "", sealOnly }: Props) {
  return (
    <svg
      className={className}
      viewBox={sealOnly ? "0 0 72 72" : "0 0 320 72"}
      role="img"
      aria-label="Singh Tour & Travels"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="36"
        cy="36"
        r="30"
        fill="none"
        stroke="#A9521A"
        strokeWidth="2"
        strokeDasharray="8 5 3 5"
      />
      <circle
        cx="36"
        cy="36"
        r="24"
        fill="none"
        stroke="#C8641E"
        strokeWidth="1"
        opacity="0.5"
      />
      <text
        x="36"
        y="46"
        textAnchor="middle"
        fill="#1F1A16"
        fontFamily="Rozha One, serif"
        fontSize="28"
      >
        स
      </text>
      {!sealOnly && (
        <>
          <text
            x="84"
            y="34"
            fill="#1F1A16"
            fontFamily="Eczar, Georgia, serif"
            fontWeight="600"
            fontSize="22"
          >
            Singh Tour &amp; Travels
          </text>
          <text
            x="84"
            y="56"
            fill="#6B6357"
            fontFamily="Eczar, Georgia, serif"
            fontSize="14"
          >
            सिंह टूर &amp; ट्रेवल्स
          </text>
        </>
      )}
    </svg>
  );
}
