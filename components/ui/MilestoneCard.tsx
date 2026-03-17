export default function MilestoneCard() {
  const milestones = [
    { label: "Language & Literacy", dots: [true, true, true, false, false], status: "Developing", color: "#F5A623" },
    { label: "Numeracy", dots: [true, true, true, true, false], status: "Developing", color: "#7BA3D4" },
    { label: "Social & Emotional", dots: [true, true, false, false, false], status: "Beginning", color: "#E8745A" },
  ];

  return (
    <div
      className="bg-white rounded-3xl p-6 max-w-sm w-full"
      style={{
        boxShadow: "0 8px 32px rgba(45, 58, 46, 0.12), 0 2px 8px rgba(45, 58, 46, 0.06)",
        transform: "rotate(-1.5deg)",
      }}
      role="img"
      aria-label="Sample milestone progress card for a child named Rayan"
    >
      {/* Card header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ backgroundColor: "#4A9B6F" }}
        >
          R
        </div>
        <div>
          <p className="font-bold text-sm" style={{ color: "#2D3A2E" }}>Rayan</p>
          <p className="text-xs" style={{ color: "#9DAE9E" }}>Kindergarten 1 · Updated today</p>
        </div>
        <div
          className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ backgroundColor: "#E8F5EE", color: "#4A9B6F" }}
        >
          On track
        </div>
      </div>

      {/* Milestone rows */}
      <div className="space-y-4">
        {milestones.map((m) => (
          <div key={m.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold" style={{ color: "#5C6B5D" }}>
                {m.label}
              </span>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: m.color + "20",
                  color: m.color,
                }}
              >
                {m.status}
              </span>
            </div>
            <div className="flex gap-1.5">
              {m.dots.map((filled, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: filled ? m.color : "#F0F0EE",
                    border: filled ? "none" : "1.5px solid #D8E8DC",
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Observer note */}
      <div
        className="mt-5 rounded-xl p-3 text-xs"
        style={{ backgroundColor: "#E8F5EE", color: "#4A9B6F" }}
      >
        <span className="font-bold">Teacher note:</span> &ldquo;Counted to 10 independently during circle time — unprompted.&rdquo;
      </div>

      <p className="text-xs mt-3" style={{ color: "#9DAE9E" }}>
        Last activity completed 2 hours ago
      </p>
    </div>
  );
}
