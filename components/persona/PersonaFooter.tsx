import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

interface PersonaFooterProps {
  columns?: FooterColumn[];
  tagline?: string;
  legalNote?: string;
}

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Teachers", href: "/teachers" },
      { label: "Children", href: "/children" },
      { label: "Parents", href: "/parents" },
      { label: "Schools", href: "/schools" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "NEL Framework", href: "/" },
      { label: "Help centre", href: "/" },
      { label: "Blog", href: "/" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Contact", href: "mailto:hello@nurture.edu.sg" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy policy", href: "/" },
      { label: "Terms of service", href: "/" },
      { label: "Data security", href: "/" },
    ],
  },
];

export default function PersonaFooter({
  columns = DEFAULT_COLUMNS,
  tagline = "Preschool learning platform for early childhood educators in Singapore.",
  legalNote = "Aligned to the Ministry of Education NEL Framework.",
}: PersonaFooterProps) {
  return (
    <footer
      className="py-14 border-t"
      style={{ backgroundColor: "#FAFAFA", borderColor: "#E5E5E5" }}
    >
      <div className="max-w-5xl mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 font-extrabold text-sm mb-3 text-text-dark"
            >
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center text-sm"
                style={{ backgroundColor: "#F79863" }}
                aria-hidden="true"
              >
                🌱
              </div>
              Nurture
            </Link>
            <p className="text-xs leading-relaxed" style={{ color: "#999999" }}>
              {tagline}
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: "#333333" }}
              >
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs transition-colors text-text-muted hover:text-text-dark"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderColor: "#E5E5E5" }}
        >
          <p className="text-xs" style={{ color: "#999999" }}>
            © 2026 Nurture. Built for Singapore preschools.
          </p>
          <p className="text-xs" style={{ color: "#999999" }}>
            {legalNote}
          </p>
        </div>
      </div>
    </footer>
  );
}
