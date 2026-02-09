import { useEffect, useMemo, useState } from "react";

const WHATSAPP_NUMBER = "60133300069"; // international format without +

function waLink(message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

function saveInboxItem(item) {
  const key = "raudhah_inbox";
  const current = localStorage.getItem(key);
  const list = current ? JSON.parse(current) : [];
  list.unshift(item);
  localStorage.setItem(key, JSON.stringify(list));
}

export default function Services() {
  useEffect(() => {
    document.title = "Services | Raudhah Rich Auto";
  }, []);

  const services = useMemo(
    () => [
      { title: "General Servicing", desc: "Oil change, inspection, and regular maintenance." },
      { title: "Vehicle Repairs", desc: "Engine, brake, suspension, and diagnostics." },
      { title: "Inspection", desc: "Safety checks and pre-trip inspections." },
      { title: "Aircond Service", desc: "Cooling performance checks, gas top-up, and leak inspection." },
      { title: "Brake Service", desc: "Brake pads, discs, fluid checks, and brake noise diagnosis." },
      { title: "Tyre & Alignment", desc: "Tyre changes, balancing, alignment, and vibration checks." },
    ],
    []
  );

  const branches = useMemo(
    () => [
      "Seksyen 23, Shah Alam",
      "Seksyen 15, Shah Alam",
      "U12, Shah Alam",
      "Batu Caves, KL",
    ],
    []
  );

  const [selectedService, setSelectedService] = useState(services[0]?.title || "");
  const [branch, setBranch] = useState(branches[0]);
  const [carModel, setCarModel] = useState("");
  const [carPlate, setCarPlate] = useState("");
  const [issue, setIssue] = useState("");
  const [name, setName] = useState("");

  function sendWhatsApp() {
    const lines = [
      "Hi Raudhah Rich Auto 👋",
      "",
      "I want to request a service:",
      `• Service: ${selectedService}`,
      `• Branch: ${branch}`,
      carPlate.trim() ? `• Plate: ${carPlate.trim()}` : null,
      carModel.trim() ? `• Car model: ${carModel.trim()}` : null,
      name.trim() ? `• Customer name: ${name.trim()}` : null,
      issue.trim() ? `• Issue / Notes: ${issue.trim()}` : "• Issue / Notes: (not provided)",
      "",
      "Please advise available time and estimated price. Thank you!",
    ].filter(Boolean);

    const message = lines.join("\n");

    saveInboxItem({
      id: crypto.randomUUID(),
      type: "service",
      createdAt: new Date().toISOString(),
      message,
      meta: {
        service: selectedService,
        branch,
        plate: carPlate.trim(),
      },
    });

    window.open(waLink(message), "_blank");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold">Services</h1>
        <p className="text-gray-600 mt-2">
          Choose a service and send your request via WhatsApp. (Saved into Admin Inbox for tracking.)
        </p>

        <div className="mt-8 grid lg:grid-cols-2 gap-8">
          {/* Service cards */}
          <div className="bg-white rounded-2xl border shadow p-6">
            <h2 className="text-xl font-semibold">Our Services</h2>
            <p className="text-sm text-gray-600 mt-1">Pick one to fill the request form.</p>

            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {services.map((s) => (
                <button
                  key={s.title}
                  onClick={() => setSelectedService(s.title)}
                  className={
                    "text-left border rounded-xl p-4 transition " +
                    (selectedService === s.title ? "border-black bg-gray-50" : "hover:bg-gray-50")
                  }
                >
                  <p className="font-semibold">{s.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{s.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Request form */}
          <div className="bg-white rounded-2xl border shadow p-6">
            <h2 className="text-xl font-semibold">Request a Service</h2>
            <p className="text-sm text-gray-600 mt-1">
              This sends a formatted WhatsApp message + saves into Admin Inbox.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="text-sm font-semibold">Selected service</label>
                <div className="mt-1 border rounded-xl px-4 py-3 bg-gray-50 font-semibold">
                  {selectedService}
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

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold">Plate number (optional)</label>
                  <input
                    value={carPlate}
                    onChange={(e) => setCarPlate(e.target.value)}
                    className="mt-1 w-full border rounded-xl px-4 py-3"
                    placeholder="e.g. ABC1234"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">Car model (optional)</label>
                  <input
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    className="mt-1 w-full border rounded-xl px-4 py-3"
                    placeholder="e.g. Myvi 1.3"
                  />
                </div>
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
                  <label className="text-sm font-semibold">Issue / Notes</label>
                  <input
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    className="mt-1 w-full border rounded-xl px-4 py-3"
                    placeholder="e.g. brake noise, engine light on..."
                  />
                </div>
              </div>

              <button
                onClick={sendWhatsApp}
                className="w-full mt-2 bg-green-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
              >
                Send Service Request to WhatsApp
              </button>

              <p className="text-xs text-gray-500">
                Phase 3: appointment booking + real database tracking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
