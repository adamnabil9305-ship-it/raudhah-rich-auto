// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close menu when route changes (back/forward/programmatic nav)
  useEffect(() => {
    setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const nav = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Services", to: "/services" },
    { name: "Shop", to: "/shop" },
    { name: "Locations", to: "/locations" },
    { name: "Contact", to: "/contact" },
  ];

  const baseHeader = "sticky top-0 z-50 transition-colors duration-200";
  const bgHeader = scrolled
    ? "bg-black/90 backdrop-blur border-b border-white/10"
    : "bg-black";

  return (
    <header className={`${baseHeader} ${bgHeader}`}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Raudhah Rich Auto Logo"
              className="h-10 w-10 rounded-full bg-white p-1 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span className="text-white font-semibold tracking-wide">
              Raudhah Rich Auto
            </span>
          </Link>

          {/* Desktop Nav */}
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

          {/* Mobile button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-white hover:bg-white/15 transition"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-5 w-5">
              <span
                className={[
                  "absolute left-0 top-1 block h-0.5 w-5 bg-white transition",
                  open ? "translate-y-2 rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 top-2.5 block h-0.5 w-5 bg-white transition",
                  open ? "opacity-0" : "opacity-100",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 top-4 block h-0.5 w-5 bg-white transition",
                  open ? "-translate-y-2 -rotate-45" : "",
                ].join(" ")}
              />
            </span>
          </button>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div id="mobile-menu" className="md:hidden pb-4">
            <div className="rounded-2xl border border-white/10 bg-black/95 overflow-hidden">
              <div className="flex flex-col">
                {nav.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      [
                        "px-4 py-3 text-sm font-medium transition border-b border-white/10 last:border-b-0",
                        isActive
                          ? "text-white bg-white/10"
                          : "text-white/80 hover:text-white hover:bg-white/10",
                      ].join(" ")
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}