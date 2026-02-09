import { useEffect, useMemo, useState } from "react";
import SectionHeader from "../components/SectionHeader";

const WHATSAPP_NUMBER = "60133300069";

function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function saveInboxItem(item) {
  const key = "raudhah_inbox";
  const current = localStorage.getItem(key);
  const list = current ? JSON.parse(current) : [];
  list.unshift(item);
  localStorage.setItem(key, JSON.stringify(list));
}

export default function Shop() {
  useEffect(() => {
    document.title = "Shop | Raudhah Rich Auto";
  }, []);

  const branches = useMemo(
    () => ["Seksyen 23, Shah Alam", "Seksyen 15, Shah Alam", "U12, Shah Alam", "Batu Caves, KL"],
    []
  );

  const adminParts = useMemo(() => {
    try {
      const saved = localStorage.getItem("parts_list");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }, []);

  const fallback = [
    { id: "oil", name: "Engine Oil (4L)", price: "120", branch: "Any branch" },
    { id: "battery", name: "Car Battery", price: "280", branch: "Any branch" },
    { id: "brake", name: "Brake Pads", price: "180", branch: "Any branch" },
  ];

  const products = adminParts.length ? adminParts : fallback;

  const [selectedId, setSelectedId] = useState(products[0]?.id || "");
  const selected = products.find((p) => p.id === selectedId) || products[0];

  const [branch, setBranch] = useState(branches[0]);
  const [install, setInstall] = useState(true);
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");

  function sendWhatsApp() {
    if (!selected) return;

    const lines = [
      "Hi Raudhah Rich Auto 👋",
      "",
      "I want to buy a car part:",
      `• Item: ${selected.name}`,
      `• Price (est.): RM ${selected.price || "-"}`,
      `• Branch: ${branch}`,
      `• Installation: ${install ? "Yes (assemble at workshop)" : "No (part only)"}`,
      name.trim() ? `• Customer name: ${name.trim()}` : null,
      notes.trim() ? `• Notes: ${notes.trim()}` : null,
      "",
      "Please confirm availability and total price. Thank you!",
    ].filter(Boolean);

    const message = lines.join("\n");

    saveInboxItem({
      id: crypto.randomUUID(),
      type: "shop",
      createdAt: new Date().toISOString(),
      message,
      meta: { item: selected.name, branch, install },
    });

    window.open(waLink(message), "_blank");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <SectionHeader
          title="Shop"
          subtitle="Choose a part, select a branch, and send an enquiry via WhatsApp. (Phase 2 draft)"
        />

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border shadow p-6">
            <h2 className="text-xl font-semibold">Available Items</h2>
            <p className="text-sm text-gray-600 mt-1">
              Add items from <span className="font-semibold">Admin → Parts Catalog</span>.
            </p>

            <div className="mt-4 space-y-3">
              {products.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  className={
                    "w-full text-left border rounded-xl p-4 transition " +
                    (p.id === selectedId ? "border-black bg-gray-50" : "hover:bg-gray-50")
                  }
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        RM {p.price || "-"} <span className="mx-2">•</span> {p.branch || "Any branch"}
                      </p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-gray-100 border">Select</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border shadow p-6">
            <h2 className="text-xl font-semibold">Confirm via WhatsApp</h2>
            <p className="text-sm text-gray-600 mt-1">
              This sends a formatted message + saves into <span className="font-semibold">Admin Inbox</span>.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="text-sm font-semibold">Selected item</label>
                <div className="mt-1 border rounded-xl px-4 py-3 bg-gray-50">
                  <p className="font-semibold">{selected?.name || "-"}</p>
                  <p className="text-sm text-gray-600">RM {selected?.price || "-"}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold">Choose branch</label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="mt-1 w-full border rounded-xl px-4 py-3"
                >
                  {branches.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="install"
                  type="checkbox"
                  checked={install}
                  onChange={(e) => setInstall(e.target.checked)}
                  className="h-4 w-4"
                />
                <label htmlFor="install" className="text-sm font-semibold">
                  Assemble/install at workshop
                </label>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold">Customer name (optional)</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full border rounded-xl px-4 py-3"
                    placeholder="e.g. Adam"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">Notes (optional)</label>
                  <input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1 w-full border rounded-xl px-4 py-3"
                    placeholder="e.g. My car model is..."
                  />
                </div>
              </div>

              <button
                onClick={sendWhatsApp}
                className="w-full bg-green-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
              >
                Send to WhatsApp
              </button>

              <p className="text-xs text-gray-500">
                Phase 3: real checkout + stock tracking database.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
