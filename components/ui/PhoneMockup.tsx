const feedItems = [
  {
    color: "#F5A623",
    label: "Language & Literacy",
    text: "Completed a letter sounds activity",
    sub: "Got 2 out of 3 — making great progress!",
    time: "2h ago",
  },
  {
    color: "#7BA3D4",
    label: "Numeracy",
    text: "Counting objects activity",
    sub: "3 passing sessions in a row ✓",
    time: "Yesterday",
  },
  {
    color: "#E8745A",
    label: "Social & Emotional",
    text: "Teacher observed turn-taking",
    sub: "2 of 5 observations recorded",
    time: "Yesterday",
  },
  {
    color: "#4A9B6F",
    label: "Language & Literacy",
    text: "Phonemic awareness activity",
    sub: "First attempt — keep practising!",
    time: "2d ago",
  },
];

export default function PhoneMockup() {
  return (
    <div className="flex justify-center">
      {/* Phone frame */}
      <div
        className="relative w-64 bg-white overflow-hidden"
        style={{
          borderRadius: "40px",
          border: "3px solid #2D3A2E",
          height: "480px",
          boxShadow: "0 20px 48px rgba(45, 58, 46, 0.18), 0 4px 12px rgba(45, 58, 46, 0.1)",
        }}
        role="img"
        aria-label="Phone screen showing Aisha's progress feed with recent activity completions"
      >
        {/* Notch */}
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full z-10"
          style={{ backgroundColor: "#2D3A2E" }}
        />

        {/* Status bar */}
        <div
          className="flex items-center justify-between px-5 pt-9 pb-2"
          style={{ backgroundColor: "#FFFDF8" }}
        >
          <span className="text-xs font-bold" style={{ color: "#2D3A2E" }}>9:41</span>
          <div className="flex gap-1 items-center">
            <div className="flex gap-0.5">
              {[3, 4, 5, 5].map((h, i) => (
                <div key={i} className="w-1 rounded-sm" style={{ height: h, backgroundColor: "#2D3A2E" }} />
              ))}
            </div>
          </div>
        </div>

        {/* App header */}
        <div
          className="px-4 py-3 flex items-center justify-between"
          style={{ backgroundColor: "#4A9B6F" }}
        >
          <div>
            <p className="text-white font-bold text-sm">Aisha&apos;s Progress</p>
            <p className="text-white text-xs opacity-80">Kindergarten 1</p>
          </div>
          {/* Notification dot */}
          <div className="relative">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6V9.5L2 11v0.5h12V11L12.5 9.5V6C12.5 3.5 10.5 1.5 8 1.5Z" fill="white"/>
                <path d="M6.5 12C6.5 12.8 7.2 13.5 8 13.5C8.8 13.5 9.5 12.8 9.5 12H6.5Z" fill="white"/>
              </svg>
            </div>
            <div
              className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white"
              style={{ backgroundColor: "#F5A623" }}
            />
          </div>
        </div>

        {/* Feed items with fade-out bottom */}
        <div
          className="overflow-hidden relative"
          style={{
            height: "calc(100% - 130px)",
            maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
          }}
        >
          <div className="p-3 space-y-2.5">
            {feedItems.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-3"
                style={{ boxShadow: "0 1px 4px rgba(45,58,46,0.08)" }}
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs font-semibold leading-tight truncate"
                      style={{ color: "#2D3A2E" }}
                    >
                      {item.text}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#5C6B5D" }}>
                      {item.sub}
                    </p>
                  </div>
                  <span className="text-xs flex-shrink-0" style={{ color: "#9DAE9E" }}>
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
