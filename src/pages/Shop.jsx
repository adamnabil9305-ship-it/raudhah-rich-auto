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

  function enquiryLink(item) {
    const msg = `Hi Ahmad Raudhah, saya nak tanya pasal part ini:\n\n• Part: ${item.name}\n• Price: RM ${item.price || "-"}\n• Branch: ${item.branch || "-"}\n\nBoleh confirm availability & pemasangan?`;
    return `${whatsappBase}?text=${encodeURIComponent(msg)}`;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-4">Shop (Draft)</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          This is a draft catalogue. Items are added from the Admin Dashboard.
          For availability and installation, tap WhatsApp on an item.
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
              <div
                key={p.id}
                className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-lg transition"
              >
                <div className="text-3xl mb-3">🧩</div>
                <h2 className="text-xl font-semibold">{p.name}</h2>

                <p className="text-sm text-gray-600 mt-2">
                  Price: <span className="font-semibold">RM {p.price || "-"}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Branch: <span className="font-semibold">{p.branch || "-"}</span>
                </p>

                <div className="mt-5 flex gap-3">
                  <a
                    href={enquiryLink(p)}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
