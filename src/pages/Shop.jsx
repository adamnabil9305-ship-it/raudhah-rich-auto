import { useEffect, useMemo, useState } from "react";

function saveInbox(type, message) {
  const saved = localStorage.getItem("raudhah_inbox");
  const arr = saved ? JSON.parse(saved) : [];
  arr.unshift({
    id: crypto.randomUUID(),
    type,
    message,
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem("raudhah_inbox", JSON.stringify(arr));
}

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
  const branches = useMemo(() => ["Seksyen 23", "Seksyen 15", "U12", "Batu Caves"], []);
  const timeSlots = useMemo(
    () => ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"],
    []
  );

  function buildMessage(item, state) {
    const {
      installOption,
      installBranch,
      preferredDate,
      preferredTime,
      qty,
      carModel,
      plateNo,
      notes,
    } = state;

    return (
      `Hi Ahmad Raudhah, saya nak tanya pasal part ini:\n\n` +
      `• Part: ${item.name}\n` +
      `• Price: RM ${item.price || "-"}\n` +
      `• Suggested branch: ${item.branch || "-"}\n` +
      `• Option: ${installOption}\n` +
      `• Quantity: ${qty}\n` +
      `• Car model: ${carModel || "-"}\n` +
      `• Plate no: ${plateNo || "-"}\n` +
      `• Install at: ${installBranch || "Not selected"}\n` +
      `• Preferred date: ${preferredDate || "Not selected"}\n` +
      `• Preferred time: ${preferredTime || "Not selected"}\n` +
      `• Notes: ${notes || "-"}\n\n` +
      `Boleh confirm availability & pemasangan?`
    );
  }

  function waLink(message) {
    return `${whatsappBase}?text=${encodeURIComponent(message)}`;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-4">Shop (Draft)</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Choose options and send enquiry via WhatsApp. (No online payment yet.)
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
                timeSlots={timeSlots}
                buildMessage={buildMessage}
                waLink={waLink}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ShopCard({ item, branches, timeSlots, buildMessage, waLink }) {
  const [installOption, setInstallOption] = useState("Install + Part");
  const [installBranch, setInstallBranch] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [qty, setQty] = useState(1);
  const [carModel, setCarModel] = useState("");
  const [plateNo, setPlateNo] = useState("");
  const [notes, setNotes] = useState("");

  const showInstallFields = installOption !== "Part Only";

  function sendWhatsApp() {
    const message = buildMessage(item, {
      installOption,
      installBranch,
      preferredDate,
      preferredTime,
      qty,
      carModel,
      plateNo,
      notes,
    });

    saveInbox("shop", message);
    window.open(waLink(message), "_blank", "noopener,noreferrer");
  }

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

      <div className="mt-4 space-y-3">
        <div>
          <label className="text-sm font-semibold">Option</label>
          <select
            value={installOption}
            onChange={(e) => setInstallOption(e.target.value)}
            className="mt-1 w-full border rounded-xl px-4 py-3 text-sm"
          >
            <option>Install + Part</option>
            <option>Install Only</option>
            <option>Part Only</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold">Quantity</label>
          <div className="mt-1 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-10 h-10 rounded-xl border hover:bg-gray-100 transition font-bold"
            >
              −
            </button>
            <input
              value={qty}
              onChange={(e) => {
                const v = parseInt(e.target.value || "1", 10);
                setQty(Number.isFinite(v) ? Math.max(1, v) : 1);
              }}
              className="w-full border rounded-xl px-4 py-3 text-sm text-center"
              inputMode="numeric"
            />
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              className="w-10 h-10 rounded-xl border hover:bg-gray-100 transition font-bold"
            >
              +
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold">Car model</label>
          <input
            value={carModel}
            onChange={(e) => setCarModel(e.target.value)}
            className="mt-1 w-full border rounded-xl px-4 py-3 text-sm"
            placeholder="e.g. Myvi 2018 / Vios / Civic"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Plate number</label>
          <input
            value={plateNo}
            onChange={(e) => setPlateNo(e.target.value)}
            className="mt-1 w-full border rounded-xl px-4 py-3 text-sm"
            placeholder="e.g. ABC1234"
          />
        </div>

        {showInstallFields && (
          <>
            <div>
              <label className="text-sm font-semibold">Install at (branch)</label>
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

            <div>
              <label className="text-sm font-semibold">Preferred date</label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="mt-1 w-full border rounded-xl px-4 py-3 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Preferred time</label>
              <select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="mt-1 w-full border rounded-xl px-4 py-3 text-sm"
              >
                <option value="">Select time</option>
                {timeSlots.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <div>
          <label className="text-sm font-semibold">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 w-full border rounded-xl px-4 py-3 text-sm"
            rows={3}
            placeholder="Symptoms / preferred brand / extra info"
          />
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <button
          onClick={sendWhatsApp}
          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold text-center hover:bg-green-700 transition"
        >
          WhatsApp Enquiry
        </button>

        <a
          href="/contact"
          className="px-4 py-2 rounded-xl border text-sm font-semibold hover:bg-gray-100 transition"
        >
          Contact
        </a>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        We’ll confirm availability & installation after you message us.
      </p>
    </div>
  );
}
