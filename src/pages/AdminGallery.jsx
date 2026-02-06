import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminGallery() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin Gallery | Raudhah Rich Auto";
    const isAuthed = localStorage.getItem("raudhah_admin_authed") === "yes";
    if (!isAuthed) navigate("/admin/login");
  }, [navigate]);

  const requiredFiles = useMemo(
    () => [
      "/gallery/gallery-1.jpg",
      "/gallery/gallery-2.jpg",
      "/gallery/gallery-3.jpg",
      "/gallery/gallery-4.jpg",
      "/gallery/gallery-5.jpg",
      "/gallery/gallery-6.jpg",
    ],
    []
  );

  const [enabled, setEnabled] = useState(localStorage.getItem("gallery_enabled") === "yes");
  const [status, setStatus] = useState({}); // file -> true/false (exists)

  async function checkFiles() {
    const results = {};
    await Promise.all(
      requiredFiles.map(async (p) => {
        try {
          const res = await fetch(p, { method: "HEAD", cache: "no-store" });
          results[p] = res.ok;
        } catch {
          results[p] = false;
        }
      })
    );
    setStatus(results);
  }

  useEffect(() => {
    checkFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleEnabled(v) {
    setEnabled(v);
    localStorage.setItem("gallery_enabled", v ? "yes" : "no");
  }

  const presentCount = requiredFiles.filter((f) => status[f]).length;
  const missingCount = requiredFiles.length - presentCount;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold">Gallery Checklist</h1>
            <p className="text-sm text-gray-600 mt-1">
              Check which gallery photos are uploaded and toggle the Gallery on/off.
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
              to="/gallery"
              className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition text-sm font-semibold"
            >
              View Gallery Page
            </Link>
          </div>
        </div>

        {/* Toggle */}
        <div className="mt-8 bg-white rounded-2xl border shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Gallery Visibility</h2>
          <p className="text-sm text-gray-600 mb-4">
            If OFF, public users will see a “Coming Soon” message instead of photos.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleEnabled(true)}
              className={
                enabled
                  ? "px-4 py-2 rounded-xl bg-green-600 text-white font-semibold"
                  : "px-4 py-2 rounded-xl border bg-white hover:bg-gray-100 font-semibold"
              }
            >
              ON
            </button>
            <button
              onClick={() => toggleEnabled(false)}
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

        {/* Checklist */}
        <div className="mt-8 bg-white rounded-2xl border shadow p-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-xl font-semibold mb-1">Required Files</h2>
              <p className="text-sm text-gray-600">
                Present: <span className="font-semibold">{presentCount}</span> • Missing:{" "}
                <span className="font-semibold">{missingCount}</span>
              </p>
            </div>

            <button
              onClick={checkFiles}
              className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition text-sm font-semibold"
            >
              Re-check Files
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {requiredFiles.map((f) => {
              const ok = status[f];
              return (
                <div
                  key={f}
                  className="flex items-center justify-between gap-4 border rounded-xl p-4"
                >
                  <div>
                    <p className="font-semibold">{f}</p>
                    <p className="text-xs text-gray-500">Put this file inside: public{f}</p>
                  </div>

                  <span
                    className={
                      ok
                        ? "px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold"
                        : "px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold"
                    }
                  >
                    {ok ? "FOUND" : "MISSING"}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-6 bg-gray-50 border rounded-xl p-4">
            <p className="text-sm font-semibold mb-1">Reminder</p>
            <p className="text-sm text-gray-700">
              When the client sends photos, rename them exactly:
              <span className="font-semibold"> gallery-1.jpg</span> to{" "}
              <span className="font-semibold">gallery-6.jpg</span>, then upload into{" "}
              <span className="font-semibold">public/gallery</span> and push to GitHub.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
