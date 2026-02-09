import { Link, useNavigate } from "react-router-dom";

export default function AdminTopbar({ subtitle }) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("raudhah_admin_authed");
    navigate("/admin/login");
  }

  return (
    <div className="sticky top-0 z-50 bg-yellow-50 border-b border-yellow-200">
      <div className="max-w-6xl mx-auto px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-start gap-3">
          <div className="text-sm font-extrabold text-yellow-900">
            ⚠ ADMIN MODE
          </div>
          <div className="text-xs text-yellow-900/80 leading-snug">
            Phase 2 demo admin (localStorage). Don’t share admin links publicly.
            {subtitle ? <span className="block font-semibold mt-0.5">{subtitle}</span> : null}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            to="/"
            className="px-3 py-1.5 rounded-lg border bg-white text-sm font-semibold hover:bg-gray-100 transition"
          >
            View Site
          </Link>
          <Link
            to="/admin/inbox"
            className="px-3 py-1.5 rounded-lg border bg-white text-sm font-semibold hover:bg-gray-100 transition"
          >
            Inbox
          </Link>
          <Link
            to="/admin/settings"
            className="px-3 py-1.5 rounded-lg border bg-white text-sm font-semibold hover:bg-gray-100 transition"
          >
            Admin Settings
          </Link>
          <button
            onClick={logout}
            className="px-3 py-1.5 rounded-lg bg-black text-white text-sm font-semibold hover:bg-gray-800 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
