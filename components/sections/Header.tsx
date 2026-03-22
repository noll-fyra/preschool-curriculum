"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/teachers", label: "Teachers" },
  { href: "/parents", label: "Parents" },
  { href: "/children", label: "Children" },
  { href: "/schools", label: "Schools" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
      style={{
        backgroundColor: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid #E5E5E5" : "1px solid transparent",
      }}
    >
      <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-extrabold text-base focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm shrink-0"
          style={{ color: "#333333" }}
          aria-label="Nurture — home"
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
            style={{ backgroundColor: "#F79863" }}
            aria-hidden="true"
          >
            🌱
          </div>
          <span>Nurture</span>
        </Link>

        {/* Desktop nav — centered */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm px-3 py-1.5 rounded-md transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ color: "#666666", fontWeight: 500 }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "#F5F5F5";
                (e.currentTarget as HTMLAnchorElement).style.color = "#333333";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "transparent";
                (e.currentTarget as HTMLAnchorElement).style.color = "#666666";
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <Link
            href="/demo"
            className="text-sm font-semibold px-4 py-1.5 rounded-full transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: "#F79863",
              color: "white",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "#E06B4A";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "#F79863";
            }}
          >
            Try the demo
          </Link>
        </div>

        {/* Mobile CTA */}
        <Link
          href="/demo"
          className="md:hidden text-sm font-semibold px-3 py-1.5 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ backgroundColor: "#F79863", color: "white" }}
        >
          Try the demo
        </Link>
      </div>
    </header>
  );
}
