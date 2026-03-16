export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 480 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-label="Illustration of a child using a learning tablet with a parent looking on"
    >
      {/* Background ground ellipse */}
      <ellipse cx="240" cy="360" rx="200" ry="28" fill="#E8F5EE" />

      {/* Floating decorative dots */}
      <circle cx="60" cy="80" r="8" fill="#A8D9BC" opacity="0.6" />
      <circle cx="420" cy="120" r="12" fill="#F5A623" opacity="0.4" />
      <circle cx="380" cy="60" r="6" fill="#7BA3D4" opacity="0.5" />
      <circle cx="100" cy="300" r="10" fill="#F5A623" opacity="0.3" />
      <circle cx="440" cy="300" r="7" fill="#4A9B6F" opacity="0.3" />

      {/* Large decorative circle behind scene */}
      <circle cx="240" cy="200" r="165" fill="#F0FAF4" />

      {/* === PARENT FIGURE (right side, slightly behind) === */}
      {/* Parent body */}
      <ellipse cx="360" cy="310" rx="34" ry="48" fill="#A8D9BC" />
      {/* Parent head */}
      <circle cx="360" cy="248" r="28" fill="#D4A574" />
      {/* Parent hair */}
      <path d="M332 242 C332 224 388 224 388 242 L390 236 C390 214 330 214 330 236 Z" fill="#5C3D1E" />
      {/* Parent arm leaning forward */}
      <path d="M330 290 Q280 300 240 320" stroke="#A8D9BC" strokeWidth="18" strokeLinecap="round" fill="none" />

      {/* === CHILD FIGURE (center) === */}
      {/* Child body */}
      <ellipse cx="220" cy="320" rx="38" ry="52" fill="#4A9B6F" />
      {/* Child head */}
      <circle cx="220" cy="258" r="34" fill="#E8B88A" />
      {/* Child hair */}
      <path d="M186 254 C186 230 254 230 254 254 L256 248 C256 220 184 220 184 248 Z" fill="#2D1A0A" />
      {/* Child legs */}
      <ellipse cx="208" cy="368" rx="14" ry="20" fill="#3D8860" />
      <ellipse cx="232" cy="368" rx="14" ry="20" fill="#3D8860" />
      {/* Child feet */}
      <ellipse cx="206" cy="382" rx="16" ry="8" fill="#E8B88A" />
      <ellipse cx="234" cy="382" rx="16" ry="8" fill="#E8B88A" />

      {/* === TABLET === */}
      {/* Tablet body */}
      <rect x="148" y="286" width="124" height="88" rx="12" fill="#2D3A2E" />
      {/* Tablet screen */}
      <rect x="154" y="292" width="112" height="72" rx="8" fill="#F5A623" opacity="0.15" />
      <rect x="154" y="292" width="112" height="72" rx="8" fill="url(#tabletScreen)" />
      {/* Screen content - activity */}
      <circle cx="210" cy="322" r="14" fill="#4A9B6F" opacity="0.8" />
      <text x="210" y="327" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">A</text>
      <rect x="168" y="342" width="28" height="8" rx="4" fill="#6BBF8E" opacity="0.6" />
      <rect x="204" y="342" width="28" height="8" rx="4" fill="#A8D9BC" opacity="0.6" />
      <rect x="240" y="342" width="20" height="8" rx="4" fill="#F5A623" opacity="0.6" />
      {/* Tablet home button */}
      <circle cx="210" cy="372" r="5" fill="#4A4A4A" />

      {/* Child arms holding tablet */}
      <path d="M186 300 Q170 310 152 320" stroke="#E8B88A" strokeWidth="16" strokeLinecap="round" fill="none" />
      <path d="M254 300 Q270 310 268 322" stroke="#E8B88A" strokeWidth="16" strokeLinecap="round" fill="none" />

      {/* === FLOATING MILESTONE CARDS === */}
      {/* Card 1 - top left */}
      <rect x="30" y="140" width="100" height="56" rx="12" fill="white" opacity="0.95"
        style={{ filter: "drop-shadow(0 4px 12px rgba(45,58,46,0.12))" }} />
      <circle cx="50" cy="158" r="8" fill="#F5A623" />
      <rect x="64" y="152" width="52" height="6" rx="3" fill="#D8E8DC" />
      <rect x="64" y="162" width="36" height="6" rx="3" fill="#E8F5EE" />
      <rect x="38" y="176" width="14" height="4" rx="2" fill="#4A9B6F" />
      <rect x="56" y="176" width="14" height="4" rx="2" fill="#4A9B6F" />
      <rect x="74" y="176" width="14" height="4" rx="2" fill="#D8E8DC" />

      {/* Card 2 - top right */}
      <rect x="348" y="160" width="100" height="56" rx="12" fill="white" opacity="0.95"
        style={{ filter: "drop-shadow(0 4px 12px rgba(45,58,46,0.12))" }} />
      <circle cx="368" cy="178" r="8" fill="#7BA3D4" />
      <rect x="382" y="172" width="52" height="6" rx="3" fill="#D8E8DC" />
      <rect x="382" y="182" width="40" height="6" rx="3" fill="#E8F5EE" />
      <rect x="356" y="196" width="14" height="4" rx="2" fill="#7BA3D4" />
      <rect x="374" y="196" width="14" height="4" rx="2" fill="#7BA3D4" />
      <rect x="392" y="196" width="14" height="4" rx="2" fill="#7BA3D4" />

      {/* Gradient definitions */}
      <defs>
        <linearGradient id="tabletScreen" x1="154" y1="292" x2="266" y2="364" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E8F5EE" />
          <stop offset="1" stopColor="#FDF6E8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
