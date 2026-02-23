// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Services", to: "/services" },
    { name: "Shop", to: "/shop" },
    { name: "Locations", to: "/locations" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <header
      className={[
        "sticky top-0 z-50",
        scrolled ? "bg-black/90 backdrop-blur border-b border-white/10" : "bg-black",
      ].join(" ")}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Raudhah Rich Auto Logo"
              className="h-10 w-10 rounded-full bg-white p-1 object-contain"
              onError={(e) => {
                // If logo missing, fallback to text so navbar doesn't look broken
                e.currentTarget.style.display = "none";
              }}
            />
            <span className="text-white font-semibold tracking-wide">
              Raudhah Rich Auto
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "text-sm font-medium transition",
                    isActive ? "text-white" : "text-white/70 hover:text-white",
                  ].join(" ")
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}