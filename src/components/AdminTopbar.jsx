// src/components/AdminTopbar.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function AdminTopbar({ subtitle = "" }) {
  const navigate = useNavigate();
  const userEmail = auth?.currentUser?.email || "";

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/admin/login", { replace: true });
    } catch (e) {
      alert("Logout failed. Please try again.");
    }
  }

  const nav = [
    { name: "Dashboard", to: "/admin" },
    { name: "Inbox", to: "/admin/inbox" },
    { name: "Gallery", to: "/admin/gallery" },
    { name: "Settings", to: "/admin/settings" },
  ];

  return (
    <div className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="font-bold text-lg">
              Admin Panel
            </Link>
            {subtitle ? (
              <span className="text-sm text-gray-500">/ {subtitle}</span>
            ) : null}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "px-3 py-2 rounded-xl text-sm font-semibold transition",
                    isActive ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200",
                  ].join(" ")
                }
              >
                {item.name}
              </NavLink>
            ))}

            <div className="hidden md:block mx-2 h-8 w-px bg-gray-200" />

            <div className="flex items-center gap-2">
              {userEmail ? (
                <span className="hidden md:inline text-sm text-gray-600 max-w-[220px] truncate">
                  {userEmail}
                </span>
              ) : null}

              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-xl border text-sm font-semibold bg-white hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}