// src/pages/AdminLogin.jsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function humanizeFirebaseError(code) {
  // Common Firebase Auth errors
  if (!code) return "Login failed. Please try again.";

  if (code === "auth/invalid-credential") return "Wrong email or password.";
  if (code === "auth/user-not-found") return "No user found for this email.";
  if (code === "auth/wrong-password") return "Wrong password.";
  if (code === "auth/too-many-requests")
    return "Too many attempts. Try again later.";
  if (code === "auth/operation-not-allowed")
    return "Email/Password login is disabled in Firebase.";
  if (code === "auth/invalid-api-key")
    return "Firebase config error (invalid API key). Check src/firebase.js.";
  if (code === "auth/unauthorized-domain")
    return "This domain is not authorized. Add it in Firebase Auth → Settings → Authorized domains.";
  if (code === "auth/network-request-failed")
    return "Network error. Check your connection / adblock / VPN and try again.";

  return `Login failed (${code}).`;
}

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, cleanEmail, password);
      navigate("/admin", { replace: true });
    } catch (err) {
      // ✅ This is the key debug info
      console.log("LOGIN ERROR:", err?.code, err?.message, err);

      const code = err?.code || "";
      setError(humanizeFirebaseError(code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-xl font-semibold">Admin Login</h1>
        <p className="mt-1 text-white/70 text-sm">
          Sign in to manage Raudhah Rich Auto.
        </p>

        {error && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
            <div className="mt-2 text-xs text-red-200/80">
              Open DevTools → Console and send me the <b>LOGIN ERROR</b> code.
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-sm text-white/80">Email</label>
            <input
              type="email"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-white/30"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              inputMode="email"
              required
            />
          </div>

          <div>
            <label className="text-sm text-white/80">Password</label>
            <div className="mt-2 flex items-stretch gap-2">
              <input
                type={showPass ? "text" : "password"}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-white/30"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="shrink-0 rounded-xl border border-white/10 bg-white/10 px-4 text-sm font-semibold hover:bg-white/15 transition"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white text-black font-semibold py-3 hover:bg-white/90 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-4 text-xs text-white/50">
          Tip: If login fails on Vercel, add your domain in Firebase Auth → Authorized domains.
        </div>
      </div>
    </div>
  );
}