import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

    // TEMP (Phase 2): simple demo credentials
    // Change later / replace with real auth (Supabase / DB)
    const OK_USER = "admin";
    const OK_PASS = "raudhah123";

    if (user === OK_USER && pass === OK_PASS) {
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
        <p className="text-sm text-gray-600 mb-6">
          For Raudhah Rich Auto internal use only.
        </p>

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

          <p className="text-xs text-gray-500 text-center">
            Phase 2 demo login (we’ll replace with real auth later).
          </p>
        </form>
      </div>
    </div>
  );
}
