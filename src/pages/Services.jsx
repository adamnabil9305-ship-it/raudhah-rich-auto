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

export default function Services() {
  useEffect(() => {
    document.title = "Services | Raudhah Rich Auto";
  }, []);

  const whatsappBase = useMemo(() => "https://wa.me/60133300069", []);
  const branches = useMemo(() => ["Seksyen 23", "Seksyen 15", "U12", "Batu Caves"], []);
  const services = useMemo(
    () => [
      "General Servicing (Oil + Filter)",
      "Brake Service / Repair",
      "Suspension / Absorber",
      "Battery Check / Replace",
      "Aircond Check / Service",
      "Tyre / Alignment / Balancing",
      "Engine Diagnosis",
      "Other (Explain in notes)",
    ],
    []
  );
  const timeSlots = useMemo(
    () => ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"],
    []
  );

  const [selectedService, setSelectedService] = useState(services[0]);
  const [branch, setBranch] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [carModel, setCarModel] = useState("");
  const [plateNo, setPlateNo] = useState("");
  const [notes, setNotes] = useState("");

  function buildMessage() {
    return (
      `Hi Ahmad Raudhah, saya nak buat service request:\n\n` +
      `• Service: ${selectedService}\n` +
      `• Branch: ${branch || "Not selected"}\n` +
      `• Preferred date: ${date || "Not selected"}\n` +
      `• Preferred time: ${time || "Not selected"}\n` +
      `• Car model: ${carModel || "-"}\n` +
      `• Plate no: ${plateNo || "-"}\n` +
      `• Notes: ${notes || "-"}\n\n` +
      `Boleh confirm availability & anggaran harga?`
    );
  }

  function sendWhatsApp() {
    const message = buildMessage();
    saveInbox("service", message);
    window.open(`${whatsappBase}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-4">Services</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Browse our services and send a request instantly. We’ll confirm availability and estimated cost via WhatsApp.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <ServiceCard icon="🛠️" title="General Servicing" desc="Oil change, filters, basic checks." />
          <ServiceCard icon="⚙️" title="Repairs & Diagnostics" desc="Troubleshoot issues, repair work." />
          <ServiceCard icon="🛞" title="Tyre & Alignment" desc="Tyre changes, balancing, alignment." />
          <ServiceCard icon="🔋" title="Battery" desc="Test, replace, and charging checks." />
          <ServiceCard icon="❄️" title="Aircond" desc="Cooling check, gas top up, service." />
          <ServiceCard icon="✅" title="Inspection" desc="Safety check & advice before long trips." />
        </div>

        <div className="bg-white rounded-2xl border shadow p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-2">Service Request</h2>
          <p className="text-sm text-gray-600 mb-6">
            Fill what you can — we’ll confirm via WhatsApp. (Phase 2 saves a copy into Admin Inbox for testing.)
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-semibold">Select service</label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="mt-1 w-full border rounded-xl px-4 py-3 text-sm"
              >
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold">Preferred branch</label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
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
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full border rounded-xl px-4 py-3 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Preferred time</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
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

            <div className="md:col-span-2">
              <label className="text-sm font-semibold">Notes (optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1 w-full border rounded-xl px-4 py-3 text-sm"
                rows={4}
                placeholder="Describe symptoms / preferred brand / etc."
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={sendWhatsApp}
              className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold text-center hover:bg-green-700 transition"
            >
              Send Request on WhatsApp
            </button>

            <a
              href="/contact"
              className="border px-6 py-3 rounded-xl font-semibold text-center hover:bg-gray-100 transition"
            >
              Contact Page
            </a>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            This does not confirm a booking. We’ll reply to confirm timing & price.
          </p>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ icon, title, desc }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-lg transition">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{desc}</p>
    </div>
  );
}
