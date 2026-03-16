export function LiteracyIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" aria-hidden="true" focusable="false">
      {/* Book */}
      <rect x="8" y="18" width="22" height="28" rx="3" fill="#F5A623" opacity="0.9" />
      <rect x="30" y="18" width="22" height="28" rx="3" fill="#E89B18" opacity="0.9" />
      <rect x="29" y="16" width="6" height="32" rx="2" fill="#2D3A2E" opacity="0.15" />
      <rect x="12" y="24" width="14" height="2.5" rx="1.25" fill="white" opacity="0.7" />
      <rect x="12" y="29" width="10" height="2.5" rx="1.25" fill="white" opacity="0.5" />
      <rect x="12" y="34" width="12" height="2.5" rx="1.25" fill="white" opacity="0.5" />
      {/* Speech bubble */}
      <rect x="36" y="8" width="20" height="16" rx="8" fill="#4A9B6F" />
      <path d="M40 24 L38 30 L46 24Z" fill="#4A9B6F" />
      <circle cx="42" cy="16" r="2" fill="white" />
      <circle cx="46" cy="16" r="2" fill="white" />
      <circle cx="50" cy="16" r="2" fill="white" />
    </svg>
  );
}

export function NumeracyIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" aria-hidden="true" focusable="false">
      {/* Triangle */}
      <path d="M32 10 L18 34 L46 34Z" fill="#7BA3D4" opacity="0.9" />
      {/* Circle */}
      <circle cx="20" cy="46" r="10" fill="#F5A623" opacity="0.9" />
      {/* Square */}
      <rect x="34" y="36" width="20" height="20" rx="4" fill="#6BBF8E" opacity="0.9" />
      {/* Small number hints */}
      <text x="20" y="50" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="Nunito, sans-serif">3</text>
      <text x="44" y="50" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="Nunito, sans-serif">4</text>
      <text x="32" y="26" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="Nunito, sans-serif">▲</text>
    </svg>
  );
}

export function SEDIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" aria-hidden="true" focusable="false">
      {/* Left figure */}
      <circle cx="20" cy="22" r="10" fill="#A8D9BC" />
      <ellipse cx="20" cy="40" rx="10" ry="14" fill="#A8D9BC" />
      {/* Right figure */}
      <circle cx="44" cy="22" r="10" fill="#6BBF8E" />
      <ellipse cx="44" cy="40" rx="10" ry="14" fill="#6BBF8E" />
      {/* Heart in the middle */}
      <path d="M32 28 C32 24 27 20 27 24 C27 26 29 29 32 33 C35 29 37 26 37 24 C37 20 32 24 32 28Z" fill="#E8745A" />
    </svg>
  );
}
