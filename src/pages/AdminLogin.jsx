import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function getCreds() {
  const saved = localStorage.getItem("raudhah_admin_creds");
  if (saved) return JSON.parse(saved);

  // Default creds (Phase 2 only)
  return { username: "admin", password: "raudhah123" };
}

export default function AdminLogin() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Admin Login | Raudhah Rich Auto";
    const isAuthed = localStorage.getItem("raudhah_admin_authed") === "yes";
    if (isAuthed) navigate("/admin");
  }, [navigate]);

  function onSubmit(e) {
    e.preventDefault();
    setError("");

    const creds = getCreds();
    if (user === creds.username && pass === creds.password) {
      localStorage.setItem("raudhah_admin_authed", "yes");
      navigate("/admin");
      return;
    }

    setError("Wrong username or password.");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-2xl border shadow p-6">
        <h1 className="text-2xl font-bold mb-2">Admin Login</h1>

        <div className="mb-5 rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          Phase 2 note: Admin is <b>not fully secure</b> yet (localStorage demo auth).
          Avoid sharing <b>/admin</b> links publicly.
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold">Username</label>
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="mt-1 w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="admin"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Password</label>
            <input
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              className="mt-1 w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Log In
          </button>

          <div className="text-xs text-gray-600 flex items-center justify-between">
            <span>Default: admin / raudhah123</span>
            <Link className="underline" to="/admin/settings">
              Change admin password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
