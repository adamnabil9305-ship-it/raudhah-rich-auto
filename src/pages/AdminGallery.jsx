import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminTopbar from "../components/AdminTopbar";

const TOTAL = 6;

export default function AdminGallery() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Gallery Checklist | Admin";
    const isAuthed = localStorage.getItem("raudhah_admin_authed") === "yes";
    if (!isAuthed) navigate("/admin/login");
  }, [navigate]);

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const enabled = localStorage.getItem("gallery_enabled") === "yes";

  const files = useMemo(
    () =>
      Array.from({ length: TOTAL }, (_, i) => ({
        id: i + 1,
        path: `/gallery/gallery-${i + 1}.jpg`,
        name: `gallery-${i + 1}.jpg`,
      })),
    []
  );

  async function checkFiles() {
    setLoading(true);
    const checks = await Promise.all(
      files.map(async (f) => {
        try {
          const res = await fetch(f.path, { method: "HEAD" });
          return { ...f, ok: res.ok, status: res.status };
        } catch {
          return { ...f, ok: false, status: 0 };
        }
      })
    );
    setResults(checks);
    setLoading(false);
  }

  useEffect(() => {
    checkFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const missing = results.filter((r) => r.ok === false);
  const present = results.filter((r) => r.ok === true);

  function toggleGallery(v) {
    localStorage.setItem("gallery_enabled", v ? "yes" : "no");
    // refresh UI
    window.location.reload();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminTopbar subtitle="Gallery Checklist" />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold">Gallery Checklist</h1>
            <p className="text-sm text-gray-600 mt-1">
              Checks if gallery images exist on the deployed site. Upload photos into{" "}
              <span className="font-mono">public/gallery/</span>.
            </p>
          </div>

          <button
            onClick={checkFiles}
            className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition text-sm font-semibold"
          >
            {loading ? "Checking..." : "Re-check"}
          </button>
        </div>

        <div className="mt-6 bg-white rounded-2xl border shadow p-6">
          <h2 className="text-xl font-semibold">Gallery Visibility</h2>
          <p className="text-sm text-gray-600 mt-1">
            Keep it OFF until photos are ready.
          </p>

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => toggleGallery(true)}
              className={
                enabled
                  ? "px-4 py-2 rounded-xl bg-green-600 text-white font-semibold"
                  : "px-4 py-2 rounded-xl border bg-white hover:bg-gray-100 font-semibold"
              }
            >
              ON
            </button>
            <button
              onClick={() => toggleGallery(false)}
              className={
                !enabled
                  ? "px-4 py-2 rounded-xl bg-red-600 text-white font-semibold"
                  : "px-4 py-2 rounded-xl border bg-white hover:bg-gray-100 font-semibold"
              }
            >
              OFF
            </button>

            <span className="text-sm text-gray-600 ml-2">
              Current:{" "}
              <span className={enabled ? "text-green-700 font-semibold" : "text-red-700 font-semibold"}>
                {enabled ? "ON" : "OFF"}
              </span>
            </span>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border shadow p-6">
            <h2 className="text-xl font-semibold">Status Summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <p>
                Present: <span className="font-semibold text-green-700">{present.length}</span> / {TOTAL}
              </p>
              <p>
                Missing: <span className="font-semibold text-red-700">{missing.length}</span> / {TOTAL}
              </p>
            </div>

            <div className="mt-6 rounded-xl border bg-gray-50 p-4">
              <p className="text-sm font-semibold">Upload rules</p>
              <ul className="mt-2 text-sm text-gray-700 list-disc pl-5 space-y-1">
                <li>Put images inside <span className="font-mono">public/gallery/</span></li>
                <li>Names must be exactly: <span className="font-mono">gallery-1.jpg</span> … <span className="font-mono">gallery-6.jpg</span></li>
                <li>After pushing to GitHub, Vercel auto redeploys</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl border shadow p-6">
            <h2 className="text-xl font-semibold">Missing Files</h2>
            <p className="text-sm text-gray-600 mt-1">
              Send this list to client so they know what to provide.
            </p>

            {results.length === 0 ? (
              <p className="text-sm text-gray-600 mt-4">No results yet. Click Re-check.</p>
            ) : missing.length === 0 ? (
              <p className="text-sm text-green-700 font-semibold mt-4">All gallery images are present ✅</p>
            ) : (
              <div className="mt-4 space-y-2">
                {missing.map((m) => (
                  <div key={m.name} className="border rounded-xl p-3 flex items-center justify-between">
                    <span className="font-mono text-sm">{m.name}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-red-50 border text-red-700">
                      Missing
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl border shadow p-6">
          <h2 className="text-xl font-semibold">Preview</h2>
          <p className="text-sm text-gray-600 mt-1">
            These are the image URLs that the Gallery page uses.
          </p>

          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((f) => (
              <a
                key={f.name}
                href={f.path}
                target="_blank"
                rel="noreferrer"
                className="border rounded-xl p-3 hover:bg-gray-50 transition"
              >
                <p className="font-mono text-sm">{f.name}</p>
                <p className="text-xs text-gray-600 mt-1">{f.path}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
