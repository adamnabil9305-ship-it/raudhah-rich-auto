import { useEffect } from "react";

export default function Locations() {
  useEffect(() => {
    document.title = "Locations | Raudhah Rich Auto";
  }, []);

  const locations = [
    {
      name: "Seksyen 23, Shah Alam",
      address:
        "No 54, Jalan Pelabur A, 23/A, Seksyen 23, 40000 Shah Alam, Selangor",
    },
    {
      name: "Seksyen 15, Shah Alam",
      address:
        "No 25-G, Blok 10, Jalan Pahat J 15/J, Dataran Otomobil, 40200 Shah Alam, Selangor",
    },
    {
      name: "U12, Shah Alam",
      address:
        "1, Jln Selasih J U12/J, Cahaya Alam, 40170 Shah Alam, Selangor",
    },
    {
      name: "Batu Caves, KL",
      address:
        "No 3, Jalan SBC 5, Taman Seri Batu Caves, 68100 Batu Caves, Selangor",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-4">Our Locations</h1>
      <p className="text-center text-gray-600 mb-12">
        Tap a map or choose your preferred navigation app.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {locations.map((loc) => {
          const encoded = encodeURIComponent(loc.address);

          return (
            <div
              key={loc.name}
              className="bg-white rounded-2xl border shadow p-6"
            >
              <h2 className="text-xl font-semibold mb-2">{loc.name}</h2>

              {/* Embedded Google Map */}
              <div className="rounded-xl overflow-hidden border mb-4">
                <iframe
                  title={`Map - ${loc.name}`}
                  src={`https://www.google.com/maps?q=${encoded}&output=embed`}
                  width="100%"
                  height="260"
                  loading="lazy"
                  style={{ border: 0 }}
                />
              </div>

              {/* Address */}
              <p className="text-sm text-gray-700 mb-4">
                📍 {loc.address}
              </p>

              {/* Navigation Buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encoded}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-800 transition"
                >
                  Google Maps
                </a>

                <a
                  href={`https://waze.com/ul?q=${encoded}&navigate=yes`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
                >
                  Waze
                </a>

                <a
                  href={`https://maps.apple.com/?q=${encoded}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-200 text-black px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-300 transition"
                >
                  Apple Maps
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
