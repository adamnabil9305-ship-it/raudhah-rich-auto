import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminTopbar from "../components/AdminTopbar";

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin Dashboard | Raudhah Rich Auto";
    const isAuthed = localStorage.getItem("raudhah_admin_authed") === "yes";
    if (!isAuthed) navigate("/admin/login");
  }, [navigate]);

  const [promoTitle, setPromoTitle] = useState(
    localStorage.getItem("promo_title") || "Promo slot (update when client confirms)"
  );
  const [promoDesc, setPromoDesc] = useState(
    localStorage.getItem("promo_desc") ||
      "Example: Free inspection • Seasonal service promo • Special discount • New branch opening"
  );

  const [parts, setParts] = useState(() => {
    const saved = localStorage.getItem("parts_list");
    return saved ? JSON.parse(saved) : [];
  });

  const [newPart, setNewPart] = useState({ name: "", price: "", branch: "" });

  const branches = useMemo(() => ["Seksyen 23", "Seksyen 15", "U12", "Batu Caves"], []);
  const [galleryEnabled, setGalleryEnabled] = useState(localStorage.getItem("gallery_enabled") === "yes");

  function savePromo() {
    localStorage.setItem("promo_title", promoTitle);
    localStorage.setItem("promo_desc", promoDesc);
    alert("Saved promo (Phase 2 local only).");
  }

  function addPart() {
    if (!newPart.name.trim()) return;
    const updated = [
      ...parts,
      { id: crypto.randomUUID(), ...newPart, createdAt: new Date().toISOString() },
    ];
    setParts(updated);
    localStorage.setItem("parts_list", JSON.stringify(updated));
    setNewPart({ name: "", price: "", branch: "" });
  }

  function removePart(id) {
    const updated = parts.filter((p) => p.id !== id);
    setParts(updated);
    localStorage.setItem("parts_list", JSON.stringify(updated));
  }

  function toggleGallery(v) {
    setGalleryEnabled(v);
    localStorage.setItem("gallery_enabled", v ? "yes" : "no");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminTopbar subtitle="Dashboard" />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1 text-sm">
              Phase 2 (Admin-Lite): changes save in this browser only (localStorage).
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to="/admin/gallery"
              className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-100 transition text-sm font-semibold"
            >
              Gallery Checklist
            </Link>
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Link to="/admin/inbox" className="bg-white rounded-2xl border shadow p-6 hover:shadow-md transition">
            <h2 className="text-xl font-semibold">Inbox</h2>
            <p className="text-sm text-gray-600 mt-2">
              View saved Shop/Service enquiries (Phase 2 testing).
            </p>
          </Link>

          <Link to="/admin/gallery" className="bg-white rounded-2xl border shadow p-6 hover:shadow-md transition">
            <h2 className="text-xl font-semibold">Gallery Checklist</h2>
            <p className="text-sm text-gray-600 mt-2">
              Check missing gallery files + toggle Gallery.
            </p>
          </Link>

          <Link to="/admin/settings" className="bg-white rounded-2xl border shadow p-6 hover:shadow-md transition">
            <h2 className="text-xl font-semibold">Settings</h2>
            <p className="text-sm text-gray-600 mt-2">
              Change admin username/password (Phase 2 local).
            </p>
          </Link>
        </div>

        {/* Gallery toggle */}
        <div className="mt-8 bg-white rounded-2xl border shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Gallery Visibility</h2>
          <p className="text-sm text-gray-600 mb-4">
            If OFF, the Gallery page shows “Coming Soon”.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleGallery(true)}
              className={
                galleryEnabled
                  ? "px-4 py-2 rounded-xl bg-green-600 text-white font-semibold"
                  : "px-4 py-2 rounded-xl border bg-white hover:bg-gray-100 font-semibold"
              }
            >
              ON
            </button>
            <button
              onClick={() => toggleGallery(false)}
              className={
                !galleryEnabled
                  ? "px-4 py-2 rounded-xl bg-red-600 text-white font-semibold"
                  : "px-4 py-2 rounded-xl border bg-white hover:bg-gray-100 font-semibold"
              }
            >
              OFF
            </button>
            <span className="text-sm text-gray-600 ml-2">
              Current:{" "}
              <span className={galleryEnabled ? "text-green-700 font-semibold" : "text-red-700 font-semibold"}>
                {galleryEnabled ? "ON" : "OFF"}
              </span>
            </span>
          </div>
        </div>

        {/* Promo editor */}
        <div className="mt-8 bg-white rounded-2xl border shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Home Promo Editor</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold">Promo Title</label>
              <input
                value={promoTitle}
                onChange={(e) => setPromoTitle(e.target.value)}
                className="mt-1 w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Promo Description</label>
              <input
                value={promoDesc}
                onChange={(e) => setPromoDesc(e.target.value)}
                className="mt-1 w-full border rounded-xl px-4 py-3"
              />
            </div>
          </div>

          <button
            onClick={savePromo}
            className="mt-4 bg-green-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            Save Promo
          </button>
        </div>

        {/* Parts list */}
        <div className="mt-8 bg-white rounded-2xl border shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Parts Catalog (Draft)</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-semibold">Part Name</label>
              <input
                value={newPart.name}
                onChange={(e) => setNewPart({ ...newPart, name: e.target.value })}
                className="mt-1 w-full border rounded-xl px-4 py-3"
                placeholder="e.g. Engine Oil 4L"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Price (RM)</label>
              <input
                value={newPart.price}
                onChange={(e) => setNewPart({ ...newPart, price: e.target.value })}
                className="mt-1 w-full border rounded-xl px-4 py-3"
                placeholder="e.g. 120"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Branch</label>
              <select
                value={newPart.branch}
                onChange={(e) => setNewPart({ ...newPart, branch: e.target.value })}
                className="mt-1 w-full border rounded-xl px-4 py-3"
              >
                <option value="">Select branch</option>
                {branches.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={addPart}
            className="mt-4 bg-black text-white px-5 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Add Part
          </button>

          <div className="mt-6 border-t pt-4">
            {parts.length === 0 ? (
              <p className="text-sm text-gray-600">
                No parts added yet. Add a few to test Shop enquiries.
              </p>
            ) : (
              <div className="space-y-3">
                {parts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between gap-4 border rounded-xl p-4">
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-sm text-gray-600">
                        RM {p.price || "-"} • {p.branch || "No branch set"}
                      </p>
                    </div>
                    <button
                      onClick={() => removePart(p.id)}
                      className="text-sm font-semibold text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Phase 3: move parts/enquiries to real database for staff devices.
          </p>
        </div>
      </div>
    </div>
  );
}
