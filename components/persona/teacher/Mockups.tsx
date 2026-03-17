// ─── Teacher-specific dashboard & UI mockups ─────────────────────────────────
// These are used as the `visual` prop in the teacher landing page sections.

export function HeroDashboardMockup() {
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
          app.nurture.edu.sg/teacher/class
        </div>
      </div>

      {/* App layout */}
      <div
        className="flex"
        style={{ backgroundColor: "#FAFAFA", minHeight: 380 }}
      >
        {/* Sidebar */}
        <div
          className="w-48 shrink-0 border-r p-4 hidden sm:block"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#F0F0F0" }}
        >
          <div className="flex items-center gap-2 mb-6">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center text-sm"
              style={{ backgroundColor: "#F79863" }}
            >
              🌱
            </div>
            <span className="text-sm font-bold" style={{ color: "#333333" }}>
              nurture
            </span>
          </div>
          {[
            "Class overview",
            "Child profiles",
            "Activities",
            "Observations",
            "Reports",
          ].map((item, i) => (
            <div
              key={item}
              className="text-xs px-3 py-2 rounded-lg mb-1"
              style={{
                backgroundColor: i === 0 ? "#FEF0E7" : "transparent",
                color: i === 0 ? "#F79863" : "#666666",
                fontWeight: i === 0 ? 600 : 400,
              }}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-bold" style={{ color: "#333333" }}>
                Caterpillar Class · K2
              </p>
              <p className="text-xs" style={{ color: "#999999" }}>
                23 children · Week 11 · Term 2
              </p>
            </div>
            <button
              className="text-xs font-semibold px-3 py-1.5 rounded-lg"
              style={{ backgroundColor: "#F79863", color: "white" }}
            >
              + Log observation
            </button>
          </div>

          {/* Milestone summary bar */}
          <div
            className="rounded-xl p-3 mb-4 grid grid-cols-3 gap-3"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E5E5" }}
          >
            {[
              {
                label: "Language & Literacy",
                secure: 14,
                dev: 7,
                beg: 2,
                color: "#F5A623",
              },
              {
                label: "Numeracy",
                secure: 11,
                dev: 9,
                beg: 3,
                color: "#7BA3D4",
              },
              {
                label: "Social & Emotional",
                secure: 9,
                dev: 11,
                beg: 3,
                color: "#E8745A",
              },
            ].map((area) => (
              <div key={area.label}>
                <p
                  className="text-xs font-semibold mb-2"
                  style={{ color: area.color }}
                >
                  {area.label}
                </p>
                <div className="flex gap-1 h-2 rounded-full overflow-hidden">
                  <div
                    style={{
                      width: `${(area.secure / 23) * 100}%`,
                      backgroundColor: area.color,
                    }}
                  />
                  <div
                    style={{
                      width: `${(area.dev / 23) * 100}%`,
                      backgroundColor: area.color + "60",
                    }}
                  />
                  <div
                    style={{
                      width: `${(area.beg / 23) * 100}%`,
                      backgroundColor: "#E5E5E5",
                    }}
                  />
                </div>
                <p className="text-xs mt-1" style={{ color: "#999999" }}>
                  {area.secure} Secure · {area.dev} Dev · {area.beg} Beg
                </p>
              </div>
            ))}
          </div>

          {/* Child cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5">
            {[
              {
                name: "Aiden T.",
                ll: "Secure",
                num: "Developing",
                sed: "Secure",
                flag: false,
              },
              {
                name: "Sophia L.",
                ll: "Developing",
                num: "Secure",
                sed: "Beginning",
                flag: true,
              },
              {
                name: "Marcus H.",
                ll: "Beginning",
                num: "Developing",
                sed: "Secure",
                flag: false,
              },
              {
                name: "Priya K.",
                ll: "Secure",
                num: "Beginning",
                sed: "Developing",
                flag: false,
              },
              {
                name: "Ethan W.",
                ll: "Developing",
                num: "Developing",
                sed: "Secure",
                flag: false,
              },
              {
                name: "Layla M.",
                ll: "Secure",
                num: "Secure",
                sed: "Developing",
                flag: false,
              },
            ].map((child) => (
              <div
                key={child.name}
                className="rounded-xl p-3"
                style={{
                  backgroundColor: "white",
                  border: child.flag
                    ? "1px solid #FBBF24"
                    : "1px solid #F0F0F0",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: "#FEF0E7", color: "#F79863" }}
                    >
                      {child.name[0]}
                    </div>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "#333333" }}
                    >
                      {child.name}
                    </span>
                  </div>
                  {child.flag && (
                    <span className="text-xs" style={{ color: "#FBBF24" }}>
                      ⚑
                    </span>
                  )}
                </div>
                <div className="flex gap-1 flex-wrap">
                  {[
                    { l: "LL", v: child.ll, c: "#F5A623" },
                    { l: "NUM", v: child.num, c: "#7BA3D4" },
                    { l: "SED", v: child.sed, c: "#E8745A" },
                  ].map((a) => (
                    <span
                      key={a.l}
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: a.c + "18",
                        color: a.c,
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    >
                      {a.l}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CohortViewMockup() {
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
          Caterpillar Class · Week 11
        </span>
        <div className="flex items-center gap-1.5">
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "#FEF0E7", color: "#F79863" }}
          >
            23 children
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "#FFF8E8", color: "#FBBF24" }}
          >
            2 flagged
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2 mb-3">
          {["LL", "NUM", "SED"].map((area, i) => {
            const colors = ["#F5A623", "#7BA3D4", "#E8745A"];
            const secure = [14, 11, 9];
            const pct = Math.round((secure[i] / 23) * 100);
            return (
              <div
                key={area}
                className="rounded-lg p-2.5 text-center"
                style={{
                  backgroundColor: colors[i] + "0C",
                  border: `1px solid ${colors[i]}25`,
                }}
              >
                <p
                  className="text-xs font-bold mb-1"
                  style={{ color: colors[i] }}
                >
                  {area}
                </p>
                <p
                  className="text-xl font-extrabold"
                  style={{ color: colors[i] }}
                >
                  {pct}%
                </p>
                <p className="text-xs" style={{ color: "#999999" }}>
                  Secure
                </p>
              </div>
            );
          })}
        </div>
        <button
          className="w-full text-xs font-semibold py-1.5 rounded-lg"
          style={{ backgroundColor: "#F5F5F5", color: "#666666" }}
        >
          View individual profiles →
        </button>
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
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E5E5" }}
    >
      <div
        className="px-4 py-3 border-b flex items-center gap-2.5"
        style={{ borderColor: "#F0F0F0", backgroundColor: "#FAFAFA" }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
          style={{ backgroundColor: "#FEF0E7", color: "#F79863" }}
        >
          S
        </div>
        <div>
          <p className="text-xs font-bold" style={{ color: "#333333" }}>
            Sophia L. · K2
          </p>
          <p className="text-xs" style={{ color: "#999999" }}>
            Caterpillar Class
          </p>
        </div>
      </div>
      <div className="p-4 space-y-2">
        {[
          {
            label: "Who she is",
            text: "Methodical — she won't ask for help but rarely makes mistakes once she begins.",
            color: "#F5A623",
          },
          {
            label: "What works",
            text: "Give a 2-minute transition warning before any activity change.",
            color: "#ACD9CD",
          },
          {
            label: "Current milestone",
            text: "LL: Developing · 2 of 3 sessions passed · NUM: Secure",
            color: "#7BA3D4",
          },
          {
            label: "Family note",
            text: "Parents prefer updates in English. Father travels Mon–Fri.",
            color: "#E8745A",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="p-2.5 rounded-lg"
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

export function ActivityQueueMockup() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E5E5" }}
    >
      <div
        className="px-4 py-3 border-b"
        style={{ borderColor: "#F0F0F0", backgroundColor: "#FAFAFA" }}
      >
        <p className="text-xs font-semibold" style={{ color: "#333333" }}>
          Week 12 queue · Aiden T.
        </p>
        <p className="text-xs" style={{ color: "#999999" }}>
          Matched to current level
        </p>
      </div>
      <div className="p-4 space-y-2">
        {[
          {
            emoji: "🔤",
            label: "Letter Sounds · Level 2",
            sub: "LL · Beginning → Developing",
            color: "#F5A623",
            bg: "#FFF8EC",
          },
          {
            emoji: "🔢",
            label: "Count to 20",
            sub: "NUM · Developing → Secure",
            color: "#7BA3D4",
            bg: "#F0F5FC",
          },
          {
            emoji: "🤝",
            label: "Share & Take Turns",
            sub: "SED · Observation day 3/5",
            color: "#E8745A",
            bg: "#FEF2EF",
          },
        ].map((act) => (
          <div
            key={act.label}
            className="flex items-center gap-3 p-2.5 rounded-xl"
            style={{
              backgroundColor: act.bg,
              border: `1px solid ${act.color}25`,
            }}
          >
            <span className="text-lg shrink-0" aria-hidden="true">
              {act.emoji}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold" style={{ color: "#333333" }}>
                {act.label}
              </p>
              <p className="text-xs" style={{ color: act.color }}>
                {act.sub}
              </p>
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              style={{ opacity: 0.35 }}
              className="shrink-0"
            >
              <path
                d="M3 7h8M8 4l3 3-3 3"
                stroke="#333"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ))}
        <p className="text-xs text-center pt-1" style={{ color: "#999999" }}>
          Swap any activity at any time
        </p>
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
        className="px-4 py-3 border-b"
        style={{ borderColor: "#F0F0F0", backgroundColor: "#FAFAFA" }}
      >
        <p className="text-xs font-semibold" style={{ color: "#333333" }}>
          SED observation · Marcus H.
        </p>
        <p className="text-xs" style={{ color: "#999999" }}>
          Today · 10:32 AM · Day 3 of 5
        </p>
      </div>
      <div className="p-4">
        <p
          className="text-xs font-semibold mb-2.5"
          style={{ color: "#666666" }}
        >
          What did you observe?
        </p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {[
            "Shared materials",
            "Took turns",
            "Helped a peer",
            "Self-regulated",
          ].map((b, i) => (
            <span
              key={b}
              className="text-xs px-3 py-1.5 rounded-full font-medium"
              style={{
                backgroundColor: i === 0 ? "#E8745A" : "#F5F5F5",
                color: i === 0 ? "white" : "#666666",
              }}
            >
              {b}
            </span>
          ))}
        </div>
        <div
          className="flex items-center gap-2 p-2.5 rounded-xl mb-3"
          style={{ backgroundColor: "#FEF2EF", border: "1px solid #E8745A25" }}
        >
          <div
            className="w-1 rounded-full self-stretch"
            style={{ backgroundColor: "#E8745A", minWidth: 4 }}
          />
          <p className="text-xs" style={{ color: "#666666" }}>
            5 separate-day observations marks SED milestone achieved.{" "}
            <strong style={{ color: "#E8745A" }}>2 more to go.</strong>
          </p>
        </div>
        <button
          className="w-full text-xs font-bold py-2 rounded-lg"
          style={{ backgroundColor: "#E8745A", color: "white" }}
        >
          Save observation ✓
        </button>
      </div>
    </div>
  );
}

export function NELAlignmentMockup() {
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
          NEL Framework alignment
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ backgroundColor: "#E5F4F1", color: "#ACD9CD" }}
        >
          100% mapped
        </span>
      </div>
      <div className="p-4 space-y-2">
        {[
          { area: "Language & Literacy", color: "#F5A623" },
          { area: "Numeracy", color: "#7BA3D4" },
          { area: "Social & Emotional Dev.", color: "#E8745A" },
        ].map((a) => (
          <div
            key={a.area}
            className="rounded-lg p-2.5"
            style={{ backgroundColor: "#FAFAFA", border: "1px solid #F0F0F0" }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span
                className="text-xs font-semibold"
                style={{ color: a.color }}
              >
                {a.area}
              </span>
              <span className="text-xs" style={{ color: "#999999" }}>
                10 milestones
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
          Today&apos;s activity completions
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
          Mr. Tan → Sophia&apos;s parents
        </p>
      </div>
      <div className="p-3 space-y-2">
        <div
          className="rounded-lg p-2.5 max-w-[85%]"
          style={{ backgroundColor: "#F5F5F5" }}
        >
          <p className="text-xs" style={{ color: "#666666" }}>
            Hi! Sophia reached Secure in Numeracy today — she&apos;s been
            working really hard on this. 🎉
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
            That&apos;s wonderful, thank you for letting us know!
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
          For today&apos;s substitute teacher
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
