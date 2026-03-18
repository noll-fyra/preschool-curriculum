import Link from "next/link";

const ROLES = [
  {
    label: "Teacher",
    href: "/teachers",
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="mx-auto" aria-hidden>
        {/* Person: head */}
        <circle cx="16" cy="14" r="6" fill="#FEE9E5" stroke="#E8745A" strokeWidth="2" />
        {/* Person: body */}
        <rect x="8" y="24" width="16" height="18" rx="2" fill="#FEF0E7" stroke="#F79863" strokeWidth="2" />
        {/* Open book */}
        <rect x="26" y="18" width="14" height="20" rx="1" fill="#FEF3D7" stroke="#F5A623" strokeWidth="1.5" />
        <path d="M33 18v20" stroke="#F5A623" strokeWidth="1" />
      </svg>
    ),
    bgColor: "#FEF3D7",
    borderColor: "#F5E0A0",
  },
  {
    label: "Parent",
    href: "/parents",
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="mx-auto" aria-hidden>
        {/* Roof */}
        <path d="M24 6L4 22h8v20h24V22h8L24 6z" fill="#E6F1FB" stroke="#7BA3D4" strokeWidth="2" strokeLinejoin="round" />
        {/* Door */}
        <rect x="20" y="28" width="8" height="14" rx="1" fill="#7BA3D4" />
        <rect x="22" y="32" width="4" height="4" fill="#E6F1FB" />
      </svg>
    ),
    bgColor: "#E6F1FB",
    borderColor: "#B8D4E8",
  },
  {
    label: "Student",
    href: "/children",
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="mx-auto" aria-hidden>
        {/* Backpack body */}
        <path d="M14 18h20v22H14V18z" fill="#FEF0E7" stroke="#F79863" strokeWidth="2" strokeLinejoin="round" />
        {/* Top flap */}
        <path d="M14 18c0-5.5 4.5-10 10-10s10 4.5 10 10" fill="none" stroke="#F79863" strokeWidth="2" strokeLinecap="round" />
        {/* Front pocket */}
        <rect x="18" y="24" width="12" height="10" rx="2" fill="#FEF3D7" stroke="#F5A623" strokeWidth="1.5" />
        {/* Straps */}
        <path d="M18 18v-4a6 6 0 0112 0v4" stroke="#2D7A4F" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    ),
    bgColor: "#EAF3DE",
    borderColor: "#C8E8E2",
  },
];

export default function GetStartedAs() {
  return (
    <section
      aria-labelledby="get-started-heading"
      className="py-8"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="max-w-4xl mx-auto px-5 text-center">
        <h2
          id="get-started-heading"
          className="font-bold mb-5 text-base"
          style={{ color: "#333333" }}
        >
          Get started as a...
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 max-w-2xl mx-auto">
          {ROLES.map((role) => (
            <Link
              key={role.label}
              href={role.href}
              className="group flex flex-col items-center rounded-full p-4 transition-all duration-200 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                backgroundColor: role.bgColor,
                border: `2px solid ${role.borderColor}`,
              }}
            >
              <div className="mb-3">
                {role.icon}
              </div>
              <span
                className="font-bold"
                style={{ color: "#333333", fontSize: 18 }}
              >
                {role.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
