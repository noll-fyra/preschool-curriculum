// ─── Child experience mockups ─────────────────────────────────────────────────
// All visuals simulate the child-facing app (Pip companion, activities, stickers).
// Written for parents/teachers reading about the child experience.

// ─── Shared mini primitives ───────────────────────────────────────────────────

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 12 12"
      fill={filled ? "#F5A623" : "#E5E5E5"}
      aria-hidden="true"
    >
      <path d="M6 1l1.5 3 3.2.5L8.5 5.7l.6 3.3L6 7.5 2.9 9l.6-3.3L1.3 3.5l3.2-.5z" />
    </svg>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative mx-auto rounded-3xl overflow-hidden"
      style={{
        width: 220,
        backgroundColor: "#FFFFFF",
        border: "6px solid #1C2B29",
        boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
      }}
    >
      {/* Status bar */}
      <div
        className="flex justify-between items-center px-4 py-2"
        style={{ backgroundColor: "#1C2B29" }}
      >
        <span
          className="text-xs font-semibold"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          9:41
        </span>
        <div className="flex gap-1">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
          />
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
          />
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
          />
        </div>
      </div>
      {children}
      {/* Home bar */}
      <div
        className="flex justify-center py-2"
        style={{ backgroundColor: "#FAFAFA" }}
      >
        <div
          className="w-10 h-1 rounded-full"
          style={{ backgroundColor: "#E5E5E5" }}
        />
      </div>
    </div>
  );
}

// ─── Hero mockup ──────────────────────────────────────────────────────────────

export function HeroPhoneMockup() {
  return (
    <div className="flex justify-center items-end gap-4 py-4">
      <PhoneFrame>
        {/* App header */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ backgroundColor: "#F79863" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg" aria-hidden="true">
              🌱
            </span>
            <span className="text-xs font-bold text-white">
              Aiden's activities
            </span>
          </div>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} filled={i <= 3} />
            ))}
          </div>
        </div>

        {/* Pip greeting */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-end gap-2 mb-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
              style={{
                backgroundColor: "#FEF0E7",
                border: "2px solid #F79863",
              }}
              aria-hidden="true"
            >
              🌱
            </div>
            <div
              className="rounded-2xl rounded-bl-sm p-2.5"
              style={{ backgroundColor: "#FEF0E7" }}
            >
              <p className="text-xs font-semibold" style={{ color: "#333333" }}>
                &ldquo;Hi Aiden! Ready to play? 🎉&rdquo;
              </p>
            </div>
          </div>

          {/* Activity tile */}
          <div
            className="rounded-2xl p-4 text-center mb-3"
            style={{ backgroundColor: "#FFF8E8", border: "2px solid #F5A623" }}
          >
            <div className="text-3xl mb-2" aria-hidden="true">
              🔤
            </div>
            <p className="text-xs font-bold mb-1" style={{ color: "#333333" }}>
              Letter Sounds
            </p>
            <p className="text-xs mb-3" style={{ color: "#999999" }}>
              3 questions · ~3 min
            </p>
            <button
              className="w-full py-2.5 rounded-xl text-sm font-extrabold"
              style={{ backgroundColor: "#F79863", color: "white" }}
            >
              Let's go! ▶
            </button>
          </div>

          {/* Upcoming (dimmed) */}
          <div
            className="rounded-xl px-3 py-2 flex items-center gap-2 opacity-50"
            style={{ backgroundColor: "#F5F5F5", border: "1px solid #E5E5E5" }}
          >
            <span className="text-base" aria-hidden="true">
              🔢
            </span>
            <span className="text-xs font-medium" style={{ color: "#666666" }}>
              Count to 10 — up next
            </span>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}

// ─── Section 3 feature mockups ────────────────────────────────────────────────

export function PipCompanionMockup() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E5E5" }}
    >
      <div
        className="px-4 py-2.5 border-b"
        style={{ borderColor: "#F0F0F0", backgroundColor: "#FEF0E7" }}
      >
        <p className="text-xs font-semibold" style={{ color: "#F79863" }}>
          Pip — always here
        </p>
      </div>
      <div className="p-4 space-y-2">
        {[
          {
            msg: '"Hi Aiden! Let\'s learn about letters today! 🌟"',
            moment: "Session start",
          },
          {
            msg: '"Yes! Banana starts with B! Amazing! 🎉"',
            moment: "Correct answer",
          },
          {
            msg: '"Oops! Let\'s try again — I believe in you! 💪"',
            moment: "Wrong answer",
          },
          {
            msg: '"You finished! You\'re a superstar! 🏆"',
            moment: "Session end",
          },
        ].map((s) => (
          <div key={s.moment} className="flex gap-2.5 items-start">
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center text-sm shrink-0 mt-0.5"
              style={{
                backgroundColor: "#FEF0E7",
                border: "1.5px solid #F79863",
              }}
              aria-hidden="true"
            >
              🌱
            </div>
            <div className="flex-1">
              <p
                className="text-xs font-medium leading-relaxed"
                style={{ color: "#333333" }}
              >
                {s.msg}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#999999" }}>
                {s.moment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AudioInstructionMockup() {
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
          Audio-first — no reading required
        </p>
      </div>
      <div className="p-4">
        <div
          className="rounded-xl p-4 text-center"
          style={{ backgroundColor: "#FFF8E8", border: "1px solid #F5A62330" }}
        >
          <div className="text-2xl mb-2" aria-hidden="true">
            🎧
          </div>
          <p className="text-xs font-bold mb-3" style={{ color: "#333333" }}>
            &ldquo;Tap the picture that starts with the letter B!&rdquo;
          </p>

          {/* Waveform */}
          <div className="flex items-center justify-center gap-0.5 mb-3">
            {[3, 5, 8, 12, 9, 14, 10, 7, 11, 8, 5, 9, 4].map((h, i) => (
              <div
                key={i}
                className="w-1 rounded-full"
                style={{
                  height: h * 2,
                  backgroundColor: i < 7 ? "#F5A623" : "#E5E5E5",
                }}
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#F5A623" }}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="white"
                aria-hidden="true"
              >
                <rect x="2" y="1" width="2" height="8" rx="1" />
                <rect x="6" y="1" width="2" height="8" rx="1" />
              </svg>
            </div>
            <span
              className="text-xs font-semibold"
              style={{ color: "#F5A623" }}
            >
              Pip is speaking…
            </span>
          </div>
        </div>
        <p className="text-xs text-center mt-3" style={{ color: "#999999" }}>
          Text on screen is for the adult reading over their shoulder
        </p>
      </div>
    </div>
  );
}

export function CelebrationMockup() {
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
          Every session ends the same way
        </p>
      </div>
      <div className="p-4">
        <div
          className="rounded-xl p-5 text-center"
          style={{ backgroundColor: "#FEF0E7", border: "1px solid #F7986330" }}
        >
          <div className="text-3xl mb-2" aria-hidden="true">
            🎉
          </div>
          <p
            className="text-sm font-extrabold mb-1"
            style={{ color: "#333333" }}
          >
            You finished!
          </p>
          <p className="text-xs mb-3" style={{ color: "#666666" }}>
            You're amazing, Aiden!
          </p>

          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3].map((i) => (
              <Star key={i} filled={true} />
            ))}
          </div>

          <div
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold mb-3"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1.5px solid #F79863",
              color: "#F79863",
            }}
          >
            🌟 New sticker unlocked!
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            {["🍌", "🐝", "🎈", "🌟"].map((s, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg flex items-center justify-center text-lg"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1.5px solid #F7986330",
                }}
              >
                {s}
              </div>
            ))}
          </div>
          <p className="text-xs mt-2" style={{ color: "#999999" }}>
            Awarded for finishing — not for being right
          </p>
        </div>
      </div>
    </div>
  );
}

export function WrongAnswerMockup() {
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
          What a wrong answer looks like
        </p>
      </div>
      <div className="p-4">
        <div
          className="rounded-xl p-4 text-center"
          style={{ backgroundColor: "#FFF8E8", border: "1px solid #F5A62330" }}
        >
          <p className="text-xs font-bold mb-3" style={{ color: "#333333" }}>
            What sound does &ldquo;B&rdquo; make?
          </p>
          <div className="flex gap-2 justify-center mb-3">
            {[
              { opt: "buh", state: "correct" },
              { opt: "puh", state: "wrong" },
              { opt: "duh", state: "neutral" },
            ].map(({ opt, state }) => (
              <div
                key={opt}
                className="px-3 py-2 rounded-xl text-xs font-bold"
                style={{
                  backgroundColor:
                    state === "correct"
                      ? "#E5F4F1"
                      : state === "wrong"
                        ? "#FEF0E7"
                        : "#FAFAFA",
                  color:
                    state === "correct"
                      ? "#ACD9CD"
                      : state === "wrong"
                        ? "#F79863"
                        : "#666666",
                  border: `2px solid ${state === "correct" ? "#ACD9CD" : state === "wrong" ? "#F7986360" : "#E5E5E5"}`,
                }}
              >
                {opt}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2">
            <div
              className="w-6 h-6 rounded-xl flex items-center justify-center text-sm shrink-0"
              style={{
                backgroundColor: "#FEF0E7",
                border: "1.5px solid #F79863",
              }}
              aria-hidden="true"
            >
              🌱
            </div>
            <p className="text-xs font-semibold" style={{ color: "#F79863" }}>
              Oops! Let's try again 💪
            </p>
          </div>
        </div>
        <div className="mt-3 space-y-1.5">
          {[
            "No red X or buzzer",
            "No score shown",
            "Pip always re-prompts with encouragement",
            "Child always ends on a success",
          ].map((rule) => (
            <div
              key={rule}
              className="flex gap-2 items-center text-xs"
              style={{ color: "#666666" }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: "#ACD9CD" }}
              />
              {rule}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NextUpMockup() {
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
          What the child sees
        </p>
      </div>
      <div className="p-4">
        <div
          className="rounded-xl overflow-hidden"
          style={{
            backgroundColor: "#FFF8E8",
            border: "1.5px solid #F5A62330",
          }}
        >
          <div
            className="flex items-center gap-2 px-3 py-2.5"
            style={{ backgroundColor: "#F79863" }}
          >
            <span className="text-sm" aria-hidden="true">
              🌱
            </span>
            <span className="text-xs font-bold text-white">
              Aiden's activities
            </span>
          </div>
          <div className="p-4 text-center">
            <div className="text-3xl mb-2" aria-hidden="true">
              🔤
            </div>
            <p className="text-sm font-bold mb-1" style={{ color: "#333333" }}>
              Letter Sounds
            </p>
            <p className="text-xs mb-4" style={{ color: "#999999" }}>
              3 questions · your next activity
            </p>
            <button
              className="w-full py-3 rounded-xl text-sm font-extrabold"
              style={{ backgroundColor: "#F79863", color: "white" }}
            >
              Let's go! ▶
            </button>
          </div>
        </div>
        <p className="text-xs text-center mt-3" style={{ color: "#999999" }}>
          One activity, one button. No menus, no choices.
        </p>
      </div>
    </div>
  );
}

// ─── Section 4 integration mockups ───────────────────────────────────────────

export function PersonalizedQueueMockup() {
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
          Same activity type, matched to level
        </span>
      </div>
      <div className="p-4 space-y-2">
        {[
          {
            name: "Aiden T.",
            level: "Beginning",
            activity: "🔤 Letter Recognition — match letter to picture",
            levelColor: "#E8745A",
            levelBg: "#FEF2EF",
          },
          {
            name: "Sophia L.",
            level: "Developing",
            activity: "🔤 Letter Sounds — tap the right sound",
            levelColor: "#F5A623",
            levelBg: "#FFF8E8",
          },
          {
            name: "Marcus H.",
            level: "Secure",
            activity: "🔤 Blending — put sounds together",
            levelColor: "#ACD9CD",
            levelBg: "#E5F4F1",
          },
        ].map((child) => (
          <div
            key={child.name}
            className="rounded-lg p-2.5"
            style={{ backgroundColor: "#FAFAFA", border: "1px solid #F0F0F0" }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span
                className="text-xs font-semibold"
                style={{ color: "#333333" }}
              >
                {child.name}
              </span>
              <span
                className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
                style={{
                  backgroundColor: child.levelBg,
                  color: child.levelColor,
                }}
              >
                {child.level}
              </span>
            </div>
            <p className="text-xs" style={{ color: "#666666" }}>
              {child.activity}
            </p>
          </div>
        ))}
        <p
          className="text-xs text-center pt-1"
          style={{ color: "#ACD9CD", fontWeight: 600 }}
        >
          The child never sees their level — only their activity.
        </p>
      </div>
    </div>
  );
}

export function HomeSchoolMockup() {
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
          One queue, two places
        </p>
      </div>
      <div className="p-4 space-y-2">
        {[
          {
            where: "🏫 Classroom tablet",
            time: "10:30 AM",
            activity: "Letter Sounds · Q2 of 3",
            status: "In progress",
            statusColor: "#F5A623",
            statusBg: "#FFF8E8",
          },
          {
            where: "📱 Parent's phone",
            time: "7:45 PM",
            activity: "Letter Sounds · Q3 of 3",
            status: "Completed",
            statusColor: "#ACD9CD",
            statusBg: "#E5F4F1",
          },
        ].map((r) => (
          <div
            key={r.where}
            className="rounded-xl p-3"
            style={{ backgroundColor: "#FAFAFA", border: "1px solid #F0F0F0" }}
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-semibold" style={{ color: "#333333" }}>
                {r.where}
              </p>
              <span className="text-xs" style={{ color: "#999999" }}>
                {r.time}
              </span>
            </div>
            <p className="text-xs mb-1.5" style={{ color: "#666666" }}>
              {r.activity}
            </p>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ backgroundColor: r.statusBg, color: r.statusColor }}
            >
              {r.status}
            </span>
          </div>
        ))}
        <p className="text-xs text-center pt-1" style={{ color: "#999999" }}>
          Same experience, same character, same session — wherever they are.
        </p>
      </div>
    </div>
  );
}

export function InvisibleAssessmentMockup() {
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
          Same moment, two different views
        </p>
      </div>
      <div className="p-4 grid grid-cols-2 gap-3">
        <div>
          <p
            className="text-xs font-bold mb-2 text-center"
            style={{ color: "#F79863" }}
          >
            Child sees
          </p>
          <div
            className="rounded-xl p-3 text-center"
            style={{
              backgroundColor: "#FFF8E8",
              border: "1px solid #F5A62330",
            }}
          >
            <div className="text-2xl mb-1" aria-hidden="true">
              🌱
            </div>
            <p className="text-xs font-bold mb-2" style={{ color: "#333333" }}>
              Let's go!
            </p>
            <div className="flex justify-center gap-0.5 mb-1">
              {[1, 2, 3].map((i) => (
                <Star key={i} filled={i <= 2} />
              ))}
            </div>
            <p className="text-xs" style={{ color: "#F79863" }}>
              Play time! 🎮
            </p>
          </div>
        </div>
        <div>
          <p
            className="text-xs font-bold mb-2 text-center"
            style={{ color: "#7BA3D4" }}
          >
            Teacher sees
          </p>
          <div
            className="rounded-xl p-3"
            style={{
              backgroundColor: "#F0F5FC",
              border: "1px solid #7BA3D430",
            }}
          >
            <div className="space-y-1.5">
              {[
                { label: "LL milestone", val: "2/3 passed", color: "#F5A623" },
                { label: "Session", val: "Q2 correct", color: "#ACD9CD" },
                { label: "Time on task", val: "3 min 12s", color: "#7BA3D4" },
              ].map((r) => (
                <div key={r.label}>
                  <p className="text-xs" style={{ color: "#999999" }}>
                    {r.label}
                  </p>
                  <p
                    className="text-xs font-semibold"
                    style={{ color: r.color }}
                  >
                    {r.val}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section 5 breadth mockups ────────────────────────────────────────────────

export function ResearchBackedMockup() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <p
        className="text-xs font-semibold mb-2"
        style={{ color: "rgba(172,217,205,0.7)" }}
      >
        RESEARCH FOUNDATIONS
      </p>
      {[
        {
          source: "Sesame Workshop",
          finding: "Character attachment drives return engagement in ages 3–6",
          icon: "📺",
        },
        {
          source: "HCI research",
          finding:
            "Tap-to-select is the only reliable gesture for preschoolers",
          icon: "👆",
        },
        {
          source: "NEL Framework",
          finding:
            "3–5 min sessions align with natural preschool attention spans",
          icon: "📋",
        },
        {
          source: "EdTech studies",
          finding: "Audio-first design enables fully independent navigation",
          icon: "🎧",
        },
      ].map((r) => (
        <div
          key={r.source}
          className="rounded-xl p-3 flex items-start gap-3"
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span className="text-lg shrink-0" aria-hidden="true">
            {r.icon}
          </span>
          <div>
            <p className="text-xs font-semibold" style={{ color: "#ACD9CD" }}>
              {r.source}
            </p>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              {r.finding}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TapInteractionMockup() {
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
          Tap is the only gesture — ever
        </p>
      </div>
      <div className="p-4">
        <div
          className="rounded-xl p-4"
          style={{ backgroundColor: "#F0F5FC", border: "1px solid #7BA3D430" }}
        >
          <p
            className="text-xs font-semibold text-center mb-3"
            style={{ color: "#333333" }}
          >
            Tap the animal that starts with C
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { emoji: "🐱", label: "Cat", correct: true },
              { emoji: "🐶", label: "Dog", correct: false },
              { emoji: "🐸", label: "Frog", correct: false },
            ].map((opt) => (
              <div
                key={opt.label}
                className="flex flex-col items-center py-3 rounded-xl"
                style={{
                  backgroundColor: opt.correct ? "#E5F4F1" : "#FFFFFF",
                  border: `2.5px solid ${opt.correct ? "#ACD9CD" : "#E5E5E5"}`,
                }}
              >
                <span className="text-2xl mb-1" aria-hidden="true">
                  {opt.emoji}
                </span>
                <span
                  className="text-xs font-medium"
                  style={{ color: "#333333" }}
                >
                  {opt.label}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-center mt-3" style={{ color: "#999999" }}>
            Min. 80×80px touch targets — no precision required
          </p>
        </div>
      </div>
    </div>
  );
}

export function SessionLengthMockup() {
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
          A full session — 3–5 minutes
        </p>
      </div>
      <div className="p-4 space-y-2">
        {[
          {
            step: "Greeting",
            detail: "Pip calls them by name. One tap to begin.",
            icon: "👋",
            active: false,
            done: true,
          },
          {
            step: "Question 1",
            detail: "Audio plays. Large options appear.",
            icon: "❓",
            active: false,
            done: true,
          },
          {
            step: "Question 2",
            detail: "Specific feedback on correct answer.",
            icon: "🎯",
            active: true,
            done: false,
          },
          {
            step: "Question 3",
            detail: "Final question. One more tap.",
            icon: "⭐",
            active: false,
            done: false,
          },
          {
            step: "Celebration",
            detail: "3 stars. Sticker awarded. Always.",
            icon: "🎉",
            active: false,
            done: false,
          },
        ].map((s) => (
          <div
            key={s.step}
            className="flex items-center gap-3 p-2.5 rounded-xl"
            style={{
              backgroundColor: s.active
                ? "#FEF0E7"
                : s.done
                  ? "#FAFAFA"
                  : "#FFFFFF",
              border: `1px solid ${s.active ? "#F7986330" : "#F0F0F0"}`,
            }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0"
              style={{
                backgroundColor: s.done
                  ? "#E5F4F1"
                  : s.active
                    ? "#F79863"
                    : "#F5F5F5",
              }}
            >
              {s.done ? "✓" : s.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-semibold"
                style={{
                  color: s.active ? "#F79863" : s.done ? "#ACD9CD" : "#333333",
                }}
              >
                {s.step}
              </p>
              <p className="text-xs" style={{ color: "#999999" }}>
                {s.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StickerCollectionMockup() {
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
          Aiden's collection
        </span>
        <span className="text-xs font-semibold" style={{ color: "#F79863" }}>
          8 / 30 earned
        </span>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-5 gap-2">
          {[
            { s: "🍌", earned: true },
            { s: "🐝", earned: true },
            { s: "🎈", earned: true },
            { s: "🌟", earned: true },
            { s: "🍎", earned: true },
            { s: "🚂", earned: true },
            { s: "🦋", earned: true },
            { s: "🌈", earned: true },
            { s: "❓", earned: false },
            { s: "❓", earned: false },
            { s: "❓", earned: false },
            { s: "❓", earned: false },
            { s: "❓", earned: false },
            { s: "❓", earned: false },
            { s: "❓", earned: false },
          ].map((item, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: item.earned ? "#FEF0E7" : "#FAFAFA",
                border: `1.5px solid ${item.earned ? "#F7986330" : "#F0F0F0"}`,
                fontSize: item.earned ? 18 : 14,
                color: item.earned ? undefined : "#CCCCCC",
              }}
            >
              {item.s}
            </div>
          ))}
        </div>
        <p className="text-xs text-center mt-3" style={{ color: "#999999" }}>
          Locked stickers show as ? — inviting curiosity, not marking absence
        </p>
      </div>
    </div>
  );
}
