const nodes = [
  { id: 1, label: "Teacher assigns", sublabel: "activity set", color: "#4A9B6F", textColor: "white", x: 240, y: 60 },
  { id: 2, label: "Child learns", sublabel: "at school or home", color: "#F5A623", textColor: "white", x: 420, y: 175 },
  { id: 3, label: "Progress tracked", sublabel: "automatically", color: "#6BBF8E", textColor: "white", x: 350, y: 335 },
  { id: 4, label: "Parent sees", sublabel: "real update", color: "#7BA3D4", textColor: "white", x: 130, y: 335 },
  { id: 5, label: "Teacher reviews", sublabel: "not a blank report", color: "#3D8860", textColor: "white", x: 60, y: 175 },
];

// Simple curved paths connecting nodes in order
const paths = [
  "M 270 80 Q 380 80 410 160",
  "M 430 200 Q 450 280 380 320",
  "M 320 348 Q 240 380 160 348",
  "M 110 320 Q 60 280 70 200",
  "M 68 162 Q 120 80 218 68",
];

const mobileSteps = [
  { label: "Teacher assigns activity set", color: "#4A9B6F" },
  { label: "Child learns (at school or home)", color: "#F5A623" },
  { label: "Progress tracked automatically", color: "#6BBF8E" },
  { label: "Parent sees real update", color: "#7BA3D4" },
  { label: "Teacher reviews dashboard — not a blank report", color: "#3D8860" },
];

export function LoopDiagramDesktop() {
  return (
    <svg
      viewBox="0 0 480 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-label="Diagram showing the Nurture learning loop: Teacher assigns, child learns, progress tracked, parent sees update, teacher reviews dashboard"
    >
      <title>Nurture learning loop diagram</title>

      {/* Connecting paths */}
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="#D8E8DC"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          markerEnd="url(#arrow)"
        />
      ))}

      {/* Nodes */}
      {nodes.map((node) => (
        <g key={node.id}>
          <rect
            x={node.x - 70}
            y={node.y - 26}
            width="140"
            height="52"
            rx="26"
            fill={node.color}
            style={{ filter: "drop-shadow(0 4px 12px rgba(45,58,46,0.15))" }}
          />
          <text
            x={node.x}
            y={node.y - 5}
            textAnchor="middle"
            fill={node.textColor}
            fontSize="11"
            fontWeight="700"
            fontFamily="Nunito, sans-serif"
          >
            {node.label}
          </text>
          <text
            x={node.x}
            y={node.y + 10}
            textAnchor="middle"
            fill={node.textColor}
            fontSize="9"
            opacity="0.85"
            fontFamily="Nunito, sans-serif"
          >
            {node.sublabel}
          </text>
        </g>
      ))}

      {/* Center Nurture logo mark */}
      <circle cx="240" cy="200" r="32" fill="#E8F5EE" />
      <text x="240" y="196" textAnchor="middle" fill="#4A9B6F" fontSize="11" fontWeight="800" fontFamily="Nunito, sans-serif">nur</text>
      <text x="240" y="210" textAnchor="middle" fill="#4A9B6F" fontSize="11" fontWeight="800" fontFamily="Nunito, sans-serif">ture</text>

      {/* Arrow marker */}
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#A8D9BC" />
        </marker>
      </defs>
    </svg>
  );
}

export function LoopDiagramMobile() {
  return (
    <ol className="space-y-0" aria-label="Nurture learning loop steps">
      {mobileSteps.map((step, i) => (
        <li key={i} className="flex gap-3 items-start">
          <div className="flex flex-col items-center">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ backgroundColor: step.color }}
            >
              {i + 1}
            </div>
            {i < mobileSteps.length - 1 && (
              <div className="w-0.5 h-6 mt-1" style={{ backgroundColor: "#D8E8DC" }} />
            )}
          </div>
          <p className="font-semibold pt-2 text-sm" style={{ color: "#2D3A2E" }}>
            {step.label}
          </p>
        </li>
      ))}
    </ol>
  );
}
