"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { href: "#problem", label: "The problem" },
  { href: "#solution", label: "How it works" },
  { href: "#teachers", label: "For teachers" },
  { href: "#parents", label: "For parents" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(255, 253, 248, 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(216, 232, 220, 0.8)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 font-extrabold text-lg focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm"
          style={{ color: "#2D3A2E" }}
          aria-label="Nurture — back to top"
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-sm"
            style={{ backgroundColor: "#4A9B6F" }}
            aria-hidden="true"
          >
            🌱
          </div>
          <span>nurture</span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 rounded-sm"
              style={{ color: "#5C6B5D" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#4A9B6F";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#5C6B5D";
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:hello@nurture.edu.sg"
            className="text-sm font-bold px-4 py-2 rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: "#4A9B6F",
              color: "white",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#3D8860";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#4A9B6F";
            }}
          >
            Get in touch
          </a>
        </nav>

        {/* Mobile: just show Get in touch */}
        <a
          href="mailto:hello@nurture.edu.sg"
          className="md:hidden text-sm font-bold px-4 py-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ backgroundColor: "#4A9B6F", color: "white" }}
        >
          Contact
        </a>
      </div>
    </header>
  );
}
