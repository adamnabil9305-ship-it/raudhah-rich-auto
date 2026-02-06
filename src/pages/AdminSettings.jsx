import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function getCreds() {
  const saved = localStorage.getItem("raudhah_admin_creds");
  if (saved) return JSON.parse(saved);
  return { username: "admin", password: "raudhah123" };
}

export default function AdminSettings() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin Settings | Raudhah Rich Auto";
    const isAuthed = localStorage.getItem("raudhah_admin_authed") === "yes";
    // Allow access even if not authed (so you can recover), but show warning
    // If you prefer strict: uncomment below
    // if (!isAuthed) navigate("/admin/login");
  }, [navigate]);

  const current = getCreds();
  const [username, setUsername] = useState(current.username);
  const [password, setPassword] = useState(current.password);
  const [msg, setMsg] = useState("");

  function save() {
    if (!username.trim() || !password.trim()) {
      setMsg("Username and password cannot be empty.");
      return;
    }
    localStorage.setItem(
      "raudhah_admin_creds",
      JSON.stringify({ username: username.trim(), password: password.trim() })
    );
    setMsg("Saved. Use the new credentials next time you log in.");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold">Admin Settings</h1>
            <p className="text-sm text-gray-600 mt-1">
              Phase 2: credentials are stored in this browser (localStorage).
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to="/admin"
              className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-100 transition text-sm font-semibold"
            >
              Back to Admin
            </Link>
            <Link
              to="/admin/login"
              className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition text-sm font-semibold"
            >
              Admin Login
            </Link>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl border shadow p-6">
          <div className="rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800 mb-6">
            This is still Phase 2. For real security (Phase 3), we’ll move admin auth to a database service.
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold">Admin username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Admin password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full border rounded-xl px-4 py-3"
              />
            </div>
          </div>

          {msg && (
            <div className="mt-4 text-sm rounded-xl border px-4 py-3 bg-gray-50 text-gray-800">
              {msg}
            </div>
          )}

          <button
            onClick={save}
            className="mt-5 bg-green-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            Save Credentials
          </button>
        </div>
      </div>
    </div>
  );
}
