import { useEffect } from "react";

export default function Services() {
  useEffect(() => {
    document.title = "Services | Raudhah Rich Auto";
  }, []);

  const services = [
    { icon: "🛠️", title: "General Servicing" },
    { icon: "⚙️", title: "Repairs & Diagnostics" },
    { icon: "🛞", title: "Tyre & Alignment" },
    { icon: "🔋", title: "Battery Services" },
    { icon: "🧼", title: "Inspection & Safety" },
    { icon: "🚗", title: "General Workshop Support" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-4">Services</h1>
        <p className="text-center text-gray-600 mb-12">
          Full service details will be updated soon.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-2xl border shadow-sm p-6"
            >
              <div className="text-3xl mb-4">{s.icon}</div>
              <h2 className="text-xl font-semibold">{s.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
