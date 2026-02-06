import { useEffect, useMemo, useState } from "react";

export default function Shop() {
  useEffect(() => {
    document.title = "Shop | Raudhah Rich Auto";
  }, []);

  const [parts, setParts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("parts_list");
    setParts(saved ? JSON.parse(saved) : []);
  }, []);

  const whatsappBase = useMemo(() => "https://wa.me/60133300069", []);

  const branches = useMemo(
    () => ["Seksyen 23", "Seksyen 15", "U12", "Batu Caves"],
    []
  );

  function enquiryLink(item, installBranch) {
    const msg = `Hi Ahmad Raudhah, saya nak tanya pasal part ini:\n\n• Part: ${item.name}\n• Price: RM ${item.price || "-"}\n• Suggested branch: ${item.branch || "-"}\n• Install at: ${installBranch || "Not selected"}\n\nBoleh confirm availability & pemasangan?`;
    return `${whatsappBase}?text=${encodeURIComponent(msg)}`;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-4">Shop (Draft)</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Items are added from the Admin Dashboard. Choose your installation branch and tap
          WhatsApp to enquire.
        </p>

        {parts.length === 0 ? (
          <div className="bg-white border rounded-2xl shadow-sm p-8 text-center">
            <p className="text-gray-700 font-semibold">No parts available yet.</p>
            <p className="text-sm text-gray-600 mt-2">
              Add items in <span className="font-semibold">Admin → Parts Catalog</span>.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {parts.map((p) => (
              <ShopCard
                key={p.id}
                item={p}
                branches={branches}
                enquiryLink={enquiryLink}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ShopCard({ item, branches, enquiryLink }) {
  const [installBranch, setInstallBranch] = useState("");

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-lg transition">
      <div className="text-3xl mb-3">🧩</div>
      <h2 className="text-xl font-semibold">{item.name}</h2>

      <p className="text-sm text-gray-600 mt-2">
        Price: <span className="font-semibold">RM {item.price || "-"}</span>
      </p>
      <p className="text-sm text-gray-600">
        Suggested branch: <span className="font-semibold">{item.branch || "-"}</span>
      </p>

      <div className="mt-4">
        <label className="text-sm font-semibold">Install at (choose branch)</label>
        <select
          value={installBranch}
          onChange={(e) => setInstallBranch(e.target.value)}
          className="mt-1 w-full border rounded-xl px-4 py-3 text-sm"
        >
          <option value="">Select branch</option>
          {branches.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 flex gap-3">
        <a
          href={enquiryLink(item, installBranch)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold text-center hover:bg-green-700 transition"
        >
          WhatsApp Enquiry
        </a>

        <a
          href="/contact"
          className="px-4 py-2 rounded-xl border text-sm font-semibold hover:bg-gray-100 transition"
        >
          Contact
        </a>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Installation is subject to availability at the selected branch.
      </p>
    </div>
  );
}
