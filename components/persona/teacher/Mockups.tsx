// ─── Teacher-specific dashboard & UI mockups ─────────────────────────────────
// These are used as the `visual` prop in the teacher landing page sections.

export function HeroDashboardMockup() {
  const domainColors = ["#F5A623", "#7BA3D4", "#E8745A", "#4A9B6F", "#9B6FBD"];
  const children = [
    {
      name: "Aiden T.",
      presence: "present",
      dots: [true, true, true, false, false],
      flag: false,
    },
    {
      name: "Sophia L.",
      presence: "present",
      dots: [true, false, true, true, false],
      flag: true,
    },
    {
      name: "Marcus H.",
      presence: "late",
      dots: [false, true, true, false, true],
      flag: false,
    },
    {
      name: "Priya K.",
      presence: "present",
      dots: [true, true, false, true, false],
      flag: false,
    },
    {
      name: "Ethan W.",
      presence: "present",
      dots: [true, false, false, true, true],
      flag: false,
    },
    {
      name: "Layla M.",
      presence: "absent",
      dots: [false, false, false, false, false],
      flag: false,
    },
  ];
  const presenceColor = (p: string) =>
    p === "present" ? "#34D399" : p === "late" ? "#FBBF24" : "#D1D5DB";

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: "1px solid #E5E5E5",
        boxShadow: "0 8px 48px rgba(0,0,0,0.10)",
      }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{
          backgroundColor: "#F5F5F5",
          borderBottom: "1px solid #E5E5E5",
        }}
      >
        <div className="flex gap-1.5">
          {["#F87171", "#FBBF24", "#34D399"].map((c) => (
            <div
              key={c}
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
        <div
          className="flex-1 mx-3 h-6 rounded-lg flex items-center px-3 text-xs"
          style={{
            backgroundColor: "#FFFFFF",
            color: "#999999",
            border: "1px solid #E5E5E5",
          }}
        >
          app.nurture.edu.sg/teacher/dashboard
        </div>
      </div>

      {/* App layout */}
      <div
        className="flex"
        style={{ backgroundColor: "#FAFAFA", minHeight: 400 }}
      >
        {/* Sidebar */}
        <div
          className="w-40 shrink-0 border-r py-4 px-3 hidden sm:flex flex-col gap-1"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#F0F0F0" }}
        >
          <div className="flex items-center gap-2 mb-5 px-2">
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center text-xs"
              style={{ backgroundColor: "#F79863" }}
            >
              🌱
            </div>
            <span className="text-xs font-bold" style={{ color: "#333333" }}>
              nurture
            </span>
          </div>
          {[
            "Dashboard",
            "Children",
            "Schedule",
            "Observations",
            "Reports",
            "Messages",
          ].map((item, i) => (
            <div
              key={item}
              className="text-xs px-2 py-1.5 rounded-lg"
              style={{
                backgroundColor: i === 0 ? "#FEF0E7" : "transparent",
                color: i === 0 ? "#F79863" : "#888888",
                fontWeight: i === 0 ? 600 : 400,
              }}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col p-4 gap-3 min-w-0">
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold" style={{ color: "#333333" }}>
                Ms Tan · Thu 20 Mar
              </p>
              <p className="text-xs" style={{ color: "#999999" }}>
                Caterpillar Class · K2
              </p>
            </div>
            <button
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg"
              style={{ backgroundColor: "#F79863", color: "white" }}
            >
              + Quick-log
            </button>
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-4 gap-2">
            {[
              {
                num: "16/19",
                label: "Present",
                color: "#34D399",
                bg: "#F0FDF4",
              },
              {
                num: "5",
                label: "Activities",
                color: "#7BA3D4",
                bg: "#EEF4FB",
              },
              {
                num: "12",
                label: "Obs. this week",
                color: "#F5A623",
                bg: "#FFFBEB",
              },
              {
                num: "3",
                label: "Need attention",
                color: "#E8745A",
                bg: "#FEF2EF",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-lg p-2 text-center"
                style={{
                  backgroundColor: s.bg,
                  border: `1px solid ${s.color}25`,
                }}
              >
                <p
                  className="text-sm font-extrabold"
                  style={{ color: s.color }}
                >
                  {s.num}
                </p>
                <p
                  className="text-xs leading-tight"
                  style={{ color: "#888888", fontSize: 9 }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Two-column lower area */}
          <div className="flex gap-3 min-w-0">
            {/* Children grid */}
            <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-2 content-start">
              {children.map((child) => (
                <div
                  key={child.name}
                  className="rounded-lg p-2"
                  style={{
                    backgroundColor: "white",
                    border: child.flag
                      ? "1px solid #FBBF24"
                      : "1px solid #F0F0F0",
                  }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="relative">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{
                            backgroundColor: "#FEF0E7",
                            color: "#F79863",
                          }}
                        >
                          {child.name[0]}
                        </div>
                        <div
                          className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-white"
                          style={{
                            backgroundColor: presenceColor(child.presence),
                          }}
                        />
                      </div>
                      <span
                        className="text-xs font-semibold"
                        style={{ color: "#333333", fontSize: 10 }}
                      >
                        {child.name}
                      </span>
                    </div>
                    {child.flag && (
                      <span style={{ color: "#FBBF24", fontSize: 10 }}>⚑</span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {child.dots.map((filled, di) => (
                      <div
                        key={di}
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor: filled
                            ? domainColors[di]
                            : "#E5E5E5",
                        }}
                        title={["LL", "NUM", "SE", "Motor", "CA"][di]}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* AI insight panel */}
            <div
              className="w-36 shrink-0 rounded-lg p-3 hidden lg:block"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E5E5",
              }}
            >
              <p
                className="text-xs font-semibold mb-1"
                style={{ color: "#F5A623", fontSize: 9 }}
              >
                AI INSIGHT
              </p>
              <p
                className="text-xs leading-snug mb-2"
                style={{ color: "#444444", fontSize: 10 }}
              >
                Amara hasn't had a Motor observation in 12 days. Today's outdoor
                block is a natural moment.
              </p>
              <button
                className="text-xs font-semibold"
                style={{ color: "#F79863", fontSize: 9 }}
              >
                See suggestion →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CohortViewMockup() {
  const domainColors = ["#F5A623", "#7BA3D4", "#E8745A", "#4A9B6F", "#9B6FBD"];
  const children = [
    {
      name: "Aiden T.",
      presence: "present",
      dots: [true, true, true, false, false],
      flag: false,
    },
    {
      name: "Sophia L.",
      presence: "present",
      dots: [true, false, true, true, false],
      flag: true,
    },
    {
      name: "Marcus H.",
      presence: "late",
      dots: [false, true, true, false, true],
      flag: false,
    },
    {
      name: "Priya K.",
      presence: "present",
      dots: [true, true, false, true, false],
      flag: false,
    },
    {
      name: "Ethan W.",
      presence: "present",
      dots: [true, false, false, true, true],
      flag: false,
    },
    {
      name: "Layla M.",
      presence: "absent",
      dots: [false, false, false, false, false],
      flag: false,
    },
  ];
  const presenceColor = (p: string) =>
    p === "present" ? "#34D399" : p === "late" ? "#FBBF24" : "#D1D5DB";

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E5E5" }}
    >
      <div
        className="px-4 py-3 border-b flex items-center justify-between"
        style={{ borderColor: "#F0F0F0", backgroundColor: "#FAFAFA" }}
      >
        <span className="text-xs font-semibold" style={{ color: "#333333" }}>
          Caterpillar Class · Thu 20 Mar
        </span>
        <div className="flex items-center gap-1.5">
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "#F0FDF4", color: "#34D399" }}
          >
            16 present
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "#FFF8E8", color: "#FBBF24" }}
          >
            3 flagged
          </span>
        </div>
      </div>
      {/* Domain legend */}
      <div className="px-4 pt-3 pb-2 flex items-center gap-3">
        {["LL", "NUM", "SE", "Motor", "CA"].map((d, i) => (
          <div key={d} className="flex items-center gap-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: domainColors[i] }}
            />
            <span className="text-xs" style={{ color: "#888888", fontSize: 9 }}>
              {d}
            </span>
          </div>
        ))}
      </div>
      <div className="px-4 pb-4 grid grid-cols-2 gap-2">
        {children.map((child) => (
          <div
            key={child.name}
            className="rounded-lg p-2.5"
            style={{
              backgroundColor: "#FAFAFA",
              border: child.flag ? "1px solid #FBBF24" : "1px solid #F0F0F0",
            }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <div className="relative">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: "#FEF0E7", color: "#F79863" }}
                  >
                    {child.name[0]}
                  </div>
                  <div
                    className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-white"
                    style={{ backgroundColor: presenceColor(child.presence) }}
                  />
                </div>
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#333333", fontSize: 10 }}
                >
                  {child.name}
                </span>
              </div>
              {child.flag && (
                <span style={{ color: "#FBBF24", fontSize: 10 }}>⚑</span>
              )}
            </div>
            <div className="flex gap-1.5">
              {child.dots.map((filled, di) => (
                <div
                  key={di}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: filled ? domainColors[di] : "#E5E5E5",
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReportDraftMockup() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E5E5" }}
    >
      <div
        className="px-4 py-3 border-b flex items-center justify-between"
        style={{ borderColor: "#F0F0F0", backgroundColor: "#FAFAFA" }}
      >
        <span className="text-xs font-semibold" style={{ color: "#333333" }}>
          Term 2 Report — Aiden T.
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ backgroundColor: "#E5F4F1", color: "#ACD9CD" }}
        >
          Auto-drafted
        </span>
      </div>
      <div className="p-4 space-y-2.5">
        {[
          {
            area: "Language & Literacy",
            level: "Secure",
            text: "Aiden demonstrates strong phonemic awareness and confidently identifies letter sounds across the alphabet.",
            color: "#F5A623",
          },
          {
            area: "Numeracy",
            level: "Developing",
            text: "Aiden is developing his ability to count beyond 20 and is beginning to recognise two-digit numbers.",
            color: "#7BA3D4",
          },
          {
            area: "Social & Emotional",
            level: "Secure",
            text: "Aiden shows consistent ability to share materials and take turns. He is a supportive peer.",
            color: "#E8745A",
          },
        ].map((s) => (
          <div
            key={s.area}
            className="p-2.5 rounded-lg"
            style={{
              backgroundColor: s.color + "0C",
              border: `1px solid ${s.color}25`,
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span
                className="text-xs font-semibold"
                style={{ color: s.color }}
              >
                {s.area}
              </span>
              <span
                className="text-xs px-1.5 py-0.5 rounded-full"
                style={{ backgroundColor: s.color + "20", color: s.color }}
              >
                {s.level}
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "#666666" }}>
              {s.text}
            </p>
          </div>
        ))}
        <button
          className="w-full text-xs font-bold py-2 rounded-lg text-center"
          style={{ backgroundColor: "#F79863", color: "white" }}
        >
          Review &amp; approve →
        </button>
      </div>
    </div>
  );
}

export function ChildProfileMockup() {
  const blocks = [
    {
      time: "9:00",
      duration: "30 min",
      name: "Morning Circle",
      domains: ["Language", "SE"],
      status: "done",
    },
    {
      time: "9:30",
      duration: "45 min",
      name: "Outdoor Play",
      domains: ["Motor", "SE"],
      status: "in-progress",
    },
    {
      time: "10:15",
      duration: "20 min",
      name: "Art Station",
      domains: ["Creative Arts"],
      status: "upcoming",
    },
    {
      time: "10:35",
      duration: "25 min",
      name: "Number Time",
      domains: ["Numeracy"],
      status: "upcoming",
    },
  ];
  const statusStyle = (s: string) =>
    s === "done"
      ? { color: "#BBBBBB", textDecoration: "line-through" as const }
      : s === "in-progress"
        ? { color: "#F79863", fontWeight: 600 }
        : { color: "#333333" };
  const domainColor: Record<string, string> = {
    Language: "#F5A623",
    SE: "#E8745A",
    Motor: "#4A9B6F",
    "Creative Arts": "#9B6FBD",
    Numeracy: "#7BA3D4",
  };

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E5E5" }}
    >
      <div
        className="px-4 py-3 border-b flex items-center justify-between"
        style={{ borderColor: "#F0F0F0", backgroundColor: "#FAFAFA" }}
      >
        <p className="text-xs font-semibold" style={{ color: "#333333" }}>
          Today's Schedule
        </p>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ backgroundColor: "#FEF0E7", color: "#F79863" }}
        >
          1 in progress
        </span>
      </div>
      <div className="p-3 space-y-1.5">
        {blocks.map((b) => (
          <div
            key={b.name}
            className="flex items-start gap-3 rounded-lg px-3 py-2"
            style={{
              backgroundColor:
                b.status === "in-progress" ? "#FEF0E7" : "#FAFAFA",
              border:
                b.status === "in-progress"
                  ? "1px solid #F7986330"
                  : "1px solid #F0F0F0",
            }}
          >
            <div className="shrink-0 text-right" style={{ minWidth: 32 }}>
              <p
                className="text-xs font-semibold"
                style={{ color: b.status === "done" ? "#BBBBBB" : "#333333" }}
              >
                {b.time}
              </p>
              <p className="text-xs" style={{ color: "#BBBBBB", fontSize: 9 }}>
                {b.duration}
              </p>
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-semibold"
                style={statusStyle(b.status)}
              >
                {b.name}
              </p>
              <div className="flex gap-1 mt-1 flex-wrap">
                {b.domains.map((d) => (
                  <span
                    key={d}
                    className="text-xs px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: (domainColor[d] || "#888") + "18",
                      color: domainColor[d] || "#888",
                      fontSize: 9,
                      fontWeight: 600,
                    }}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
            {b.status === "in-progress" && (
              <div
                className="w-2 h-2 rounded-full shrink-0 mt-1"
                style={{ backgroundColor: "#F79863" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ActivityQueueMockup() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E5E5" }}
    >
      <div
        className="px-4 py-3 border-b flex items-center justify-between"
        style={{ borderColor: "#F0F0F0", backgroundColor: "#FAFAFA" }}
      >
        <div>
          <p className="text-xs font-semibold" style={{ color: "#333333" }}>
            AI Insight
          </p>
          <p className="text-xs" style={{ color: "#999999" }}>
            Active Teaching · 10:18 AM
          </p>
        </div>
        <span className="text-sm">✦</span>
      </div>
      <div className="p-4 space-y-3">
        {/* Insight card */}
        <div
          className="rounded-lg p-3"
          style={{ backgroundColor: "#FFF8EC", border: "1px solid #F5A62330" }}
        >
          <p className="text-xs leading-relaxed" style={{ color: "#555555" }}>
            Amara hasn't had a{" "}
            <strong style={{ color: "#F5A623" }}>Motor</strong> observation in
            12 days. Today's outdoor play block is a natural moment to observe
            her running and climbing.
          </p>
        </div>
        {/* Supporting data */}
        <div className="space-y-1.5">
          <p
            className="text-xs font-semibold"
            style={{ color: "#888888", fontSize: 9 }}
          >
            SUPPORTING DATA
          </p>
          {[
            {
              label: "Last Motor obs.",
              value: "8 Mar (12 days ago)",
              color: "#E8745A",
            },
            {
              label: "Next outdoor block",
              value: "11:00 AM today",
              color: "#4A9B6F",
            },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between rounded px-2.5 py-1.5"
              style={{
                backgroundColor: "#FAFAFA",
                border: "1px solid #F0F0F0",
              }}
            >
              <span className="text-xs" style={{ color: "#666666" }}>
                {row.label}
              </span>
              <span
                className="text-xs font-semibold"
                style={{ color: row.color }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
        <button
          className="w-full text-xs font-semibold py-1.5 rounded-lg"
          style={{ backgroundColor: "#F5F5F5", color: "#666666" }}
        >
          Dismiss · Next insight →
        </button>
      </div>
    </div>
  );
}

export function ObservationMockup() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E5E5" }}
    >
      <div
        className="px-4 py-3 border-b flex items-center justify-between"
        style={{ borderColor: "#F0F0F0", backgroundColor: "#FAFAFA" }}
      >
        <div>
          <p className="text-xs font-semibold" style={{ color: "#333333" }}>
            Quick-log
          </p>
          <p className="text-xs" style={{ color: "#999999" }}>
            Thu 20 Mar · 10:32 AM
          </p>
        </div>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ backgroundColor: "#F0FDF4", color: "#34D399" }}
        >
          &lt; 20 sec
        </span>
      </div>
      <div className="p-4 space-y-3">
        {/* Child selected */}
        <div
          className="flex items-center gap-2 p-2.5 rounded-lg"
          style={{
            backgroundColor: "#FEF0E7",
            border: "1px solid #F79863" + "30",
          }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
            style={{ backgroundColor: "#F79863", color: "white" }}
          >
            M
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: "#333333" }}>
              Marcus H.
            </p>
            <p className="text-xs" style={{ color: "#888888" }}>
              Caterpillar Class
            </p>
          </div>
        </div>
        {/* Note field */}
        <div
          className="rounded-lg p-2.5"
          style={{ backgroundColor: "#FAFAFA", border: "1px solid #E5E5E5" }}
        >
          <p className="text-xs" style={{ color: "#333333" }}>
            Helped Priya build the block tower — stayed focused for 8 minutes...
          </p>
          <p className="text-xs mt-1" style={{ color: "#BBBBBB" }}>
            |
          </p>
        </div>
        {/* Domain suggestion */}
        <div>
          <p
            className="text-xs mb-1.5"
            style={{ color: "#888888", fontSize: 10 }}
          >
            SUGGESTED DOMAIN
          </p>
          <div className="flex gap-1.5">
            <span
              className="text-xs px-3 py-1.5 rounded-full font-semibold"
              style={{ backgroundColor: "#4A9B6F", color: "white" }}
            >
              Motor ✓
            </span>
            {["Language", "SE"].map((d) => (
              <span
                key={d}
                className="text-xs px-3 py-1.5 rounded-full"
                style={{ backgroundColor: "#F5F5F5", color: "#666666" }}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
        <button
          className="w-full text-xs font-bold py-2 rounded-lg"
          style={{ backgroundColor: "#F79863", color: "white" }}
        >
          Save &amp; close ✓
        </button>
      </div>
    </div>
  );
}

export function NELAlignmentMockup() {
  const domains = [
    { area: "Language & Literacy", abbr: "LL", color: "#F5A623", pct: 100 },
    { area: "Numeracy", abbr: "NUM", color: "#7BA3D4", pct: 100 },
    { area: "Social-Emotional", abbr: "SE", color: "#E8745A", pct: 100 },
    { area: "Motor Skills", abbr: "MOT", color: "#4A9B6F", pct: 100 },
    { area: "Creative Arts", abbr: "CA", color: "#9B6FBD", pct: 100 },
  ];
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E5E5" }}
    >
      <div
        className="px-4 py-3 border-b flex items-center justify-between"
        style={{ borderColor: "#F0F0F0", backgroundColor: "#FAFAFA" }}
      >
        <span className="text-xs font-semibold" style={{ color: "#333333" }}>
          NEL Framework — 5 domains
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ backgroundColor: "#E5F4F1", color: "#ACD9CD" }}
        >
          100% mapped
        </span>
      </div>
      <div className="p-4 space-y-2">
        {domains.map((a) => (
          <div
            key={a.area}
            className="rounded-lg p-2.5"
            style={{ backgroundColor: "#FAFAFA", border: "1px solid #F0F0F0" }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <span
                  className="text-xs font-bold px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: a.color + "18",
                    color: a.color,
                    fontSize: 9,
                  }}
                >
                  {a.abbr}
                </span>
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#333333" }}
                >
                  {a.area}
                </span>
              </div>
              <span
                className="text-xs"
                style={{ color: "#999999", fontSize: 9 }}
              >
                Fully aligned
              </span>
            </div>
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ backgroundColor: "#E5E5E5" }}
            >
              <div
                className="h-full rounded-full"
                style={{ width: "100%", backgroundColor: a.color }}
              />
            </div>
          </div>
        ))}
        <p
          className="text-xs text-center pt-1 font-semibold"
          style={{ color: "#ACD9CD" }}
        >
          No translation required. Just teach.
        </p>
      </div>
    </div>
  );
}

export function HomeLearningMockup() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E5E5" }}
    >
      <div
        className="px-4 py-2 border-b"
        style={{ borderColor: "#F0F0F0", backgroundColor: "#FAFAFA" }}
      >
        <p className="text-xs font-semibold" style={{ color: "#333333" }}>
          Today's activity completions
        </p>
      </div>
      <div className="p-3 space-y-1.5">
        {[
          { name: "Aiden T.", activity: "Letter Sounds", where: "Home" },
          { name: "Priya K.", activity: "Count to 10", where: "Class" },
          { name: "Sophia L.", activity: "Rhyme Match", where: "Home" },
        ].map((r) => (
          <div
            key={r.name + r.activity}
            className="flex items-center justify-between rounded-lg p-2"
            style={{ backgroundColor: "#FAFAFA", border: "1px solid #F0F0F0" }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: "#FEF0E7", color: "#F79863" }}
              >
                {r.name[0]}
              </div>
              <div>
                <p className="text-xs font-medium" style={{ color: "#333333" }}>
                  {r.name}
                </p>
                <p className="text-xs" style={{ color: "#999999" }}>
                  {r.activity}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="text-xs px-1.5 py-0.5 rounded font-semibold"
                style={{
                  backgroundColor: r.where === "Home" ? "#FEF0E7" : "#E5F4F1",
                  color: r.where === "Home" ? "#F79863" : "#ACD9CD",
                }}
              >
                {r.where}
              </span>
              <span className="text-xs" style={{ color: "#4A9B6F" }}>
                ✓
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MessagingMockup() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E5E5" }}
    >
      <div
        className="px-4 py-2 border-b flex items-center gap-2"
        style={{ borderColor: "#F0F0F0", backgroundColor: "#FAFAFA" }}
      >
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ backgroundColor: "#FEF0E7", color: "#F79863" }}
        >
          T
        </div>
        <p className="text-xs font-semibold" style={{ color: "#333333" }}>
          Mr. Tan → Sophia's parents
        </p>
      </div>
      <div className="p-3 space-y-2">
        <div
          className="rounded-lg p-2.5 max-w-[85%]"
          style={{ backgroundColor: "#F5F5F5" }}
        >
          <p className="text-xs" style={{ color: "#666666" }}>
            Hi! Sophia reached Secure in Numeracy today — she's been working
            really hard on this. 🎉
          </p>
          <p className="text-xs mt-1" style={{ color: "#999999" }}>
            10:15 AM
          </p>
        </div>
        <div
          className="rounded-lg p-2.5 max-w-[85%] ml-auto"
          style={{ backgroundColor: "#FEF0E7" }}
        >
          <p className="text-xs" style={{ color: "#333333" }}>
            That's wonderful, thank you for letting us know!
          </p>
          <p className="text-xs mt-1 text-right" style={{ color: "#999999" }}>
            10:22 AM
          </p>
        </div>
        <div
          className="mt-2 rounded-lg p-2.5"
          style={{ backgroundColor: "#E5F4F1", border: "1px solid #ACD9CD30" }}
        >
          <p
            className="text-xs font-semibold mb-0.5"
            style={{ color: "#ACD9CD" }}
          >
            Linked milestone update
          </p>
          <p className="text-xs" style={{ color: "#666666" }}>
            Sophia L. · NUM · Secure · Term 2 Week 11
          </p>
        </div>
      </div>
    </div>
  );
}

export function BreadthHeroMockup() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <p
        className="text-xs font-semibold mb-2"
        style={{ color: "rgba(172,217,205,0.7)" }}
      >
        CATERPILLAR CLASS · WEEK 11
      </p>
      {[
        { name: "Aiden T.", LL: "Secure", NUM: "Developing", SED: "Secure" },
        {
          name: "Sophia L.",
          LL: "Developing",
          NUM: "Secure",
          SED: "Beginning",
        },
        {
          name: "Marcus H.",
          LL: "Beginning",
          NUM: "Developing",
          SED: "Secure",
        },
        { name: "Priya K.", LL: "Secure", NUM: "Beginning", SED: "Developing" },
      ].map((child) => (
        <div
          key={child.name}
          className="rounded-xl p-3 flex items-center justify-between"
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: "#F79863", color: "white" }}
            >
              {child.name[0]}
            </div>
            <span className="text-xs font-semibold text-white">
              {child.name}
            </span>
          </div>
          <div className="flex gap-1">
            {(["LL", "NUM", "SED"] as const).map((a) => {
              const val = child[a];
              const c =
                val === "Secure"
                  ? "#ACD9CD"
                  : val === "Developing"
                    ? "#F5A623"
                    : "#E8745A";
              return (
                <span
                  key={a}
                  className="text-xs px-1.5 py-0.5 rounded font-semibold"
                  style={{ backgroundColor: c + "20", color: c }}
                >
                  {a}
                </span>
              );
            })}
          </div>
        </div>
      ))}
      <button
        className="w-full text-xs font-semibold py-2 rounded-xl text-center"
        style={{ backgroundColor: "#F79863", color: "white" }}
      >
        View individual profiles →
      </button>
    </div>
  );
}

export function SubstituteProfileMockup() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E5E5" }}
    >
      <div
        className="px-4 py-2.5 border-b"
        style={{ borderColor: "#F0F0F0", backgroundColor: "#FAFAFA" }}
      >
        <p className="text-xs font-semibold" style={{ color: "#333333" }}>
          Quick brief · Sophia L.
        </p>
        <p className="text-xs" style={{ color: "#999999" }}>
          For today's substitute teacher
        </p>
      </div>
      <div className="p-3 space-y-1.5">
        {[
          {
            label: "Who she is",
            text: "Methodical. Check in when she goes quiet.",
            color: "#F5A623",
          },
          {
            label: "What works",
            text: "2-min transition warning before any change.",
            color: "#ACD9CD",
          },
          {
            label: "Medical",
            text: "No known allergies. Wears glasses.",
            color: "#E8745A",
          },
          {
            label: "Emergency",
            text: "Dad: +65 9123 4567 (primary contact)",
            color: "#7BA3D4",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="p-2 rounded-lg"
            style={{
              backgroundColor: s.color + "0C",
              border: `1px solid ${s.color}25`,
            }}
          >
            <p
              className="text-xs font-semibold mb-0.5"
              style={{ color: s.color }}
            >
              {s.label}
            </p>
            <p className="text-xs" style={{ color: "#666666" }}>
              {s.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ObservationLogMockup() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E5E5" }}
    >
      <div
        className="px-4 py-2.5 border-b flex items-center justify-between"
        style={{ borderColor: "#F0F0F0", backgroundColor: "#FAFAFA" }}
      >
        <span className="text-xs font-semibold" style={{ color: "#333333" }}>
          Observation log · Marcus H.
        </span>
        <span className="text-xs" style={{ color: "#999999" }}>
          SED · Welfare
        </span>
      </div>
      <div className="p-3 space-y-1.5">
        {[
          {
            date: "Mon 10 Mar",
            note: "Shared materials unprompted during art.",
            urgent: false,
          },
          {
            date: "Wed 12 Mar",
            note: "Helped a peer who dropped their tray.",
            urgent: false,
          },
          {
            date: "Thu 13 Mar",
            note: "Showed patience waiting for his turn.",
            urgent: false,
          },
          {
            date: "Fri 14 Mar",
            note: "WELFARE: Seemed withdrawn after lunch. Flagged.",
            urgent: true,
          },
        ].map((log) => (
          <div
            key={log.date}
            className="flex gap-2.5 items-start rounded-lg p-2"
            style={{
              backgroundColor: log.urgent ? "#FEF2EF" : "#FAFAFA",
              border: `1px solid ${log.urgent ? "#E8745A30" : "#F0F0F0"}`,
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
              style={{ backgroundColor: log.urgent ? "#E8745A" : "#ACD9CD" }}
            />
            <div>
              <p
                className="text-xs font-semibold"
                style={{ color: log.urgent ? "#E8745A" : "#999999" }}
              >
                {log.date}
              </p>
              <p className="text-xs" style={{ color: "#666666" }}>
                {log.note}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdjustQueueMockup() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E5E5" }}
    >
      <div
        className="px-4 py-2.5 border-b"
        style={{ borderColor: "#F0F0F0", backgroundColor: "#FAFAFA" }}
      >
        <p className="text-xs font-semibold" style={{ color: "#333333" }}>
          Adjust queue · Marcus H.
        </p>
      </div>
      <div className="p-3 space-y-2">
        <div
          className="rounded-lg p-2.5"
          style={{ backgroundColor: "#F5F5F5", border: "1px solid #E5E5E5" }}
        >
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold" style={{ color: "#333333" }}>
              Suggested
            </p>
            <span className="text-xs" style={{ color: "#999999" }}>
              Auto-selected
            </span>
          </div>
          <p className="text-xs" style={{ color: "#666666" }}>
            Count to 20 — NUM Developing
          </p>
        </div>
        <div
          className="rounded-lg p-2.5"
          style={{ backgroundColor: "#FEF0E7", border: "1px solid #F7986330" }}
        >
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold" style={{ color: "#F79863" }}>
              Your swap
            </p>
            <span className="text-xs" style={{ color: "#F79863" }}>
              Teacher override
            </span>
          </div>
          <p className="text-xs" style={{ color: "#666666" }}>
            Sorting by Size — NUM Developing
          </p>
          <p className="text-xs mt-1" style={{ color: "#999999" }}>
            Reason: Marcus responds better to hands-on activities
          </p>
        </div>
        <button
          className="w-full text-xs font-bold py-1.5 rounded-lg"
          style={{ backgroundColor: "#F79863", color: "white" }}
        >
          Apply swap
        </button>
      </div>
    </div>
  );
}
