import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const linkClass = (path) =>
    `block px-3 py-2 rounded-lg transition ${
      location.pathname === path ? "bg-red-600 text-white" : "hover:bg-gray-900"
    }`;

  return (
    <nav className="bg-black text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Raudhah Rich Auto Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="font-bold text-lg md:text-xl">Raudhah Rich Auto</span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-6 text-sm">
          <Link className="hover:text-red-500 transition" to="/">Home</Link>
          <Link className="hover:text-red-500 transition" to="/services">Services</Link>
          <Link className="hover:text-red-500 transition" to="/shop">Shop</Link>
          <Link className="hover:text-red-500 transition" to="/locations">Locations</Link>
          <Link className="hover:text-red-500 transition" to="/contact">Contact</Link>
        </div>

        {/* Mobile button */}
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-900 transition"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="text-2xl leading-none">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1 text-sm">
            <Link to="/" className={linkClass("/")}>Home</Link>
            <Link to="/services" className={linkClass("/services")}>Services</Link>
            <Link to="/shop" className={linkClass("/shop")}>Shop</Link>
            <Link to="/locations" className={linkClass("/locations")}>Locations</Link>
            <Link to="/contact" className={linkClass("/contact")}>Contact</Link>

            <a
              href="https://wa.me/60133300069"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 px-3 py-2 rounded-lg bg-green-600 text-white font-semibold text-center hover:bg-green-700 transition"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
