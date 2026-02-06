import { useEffect, useMemo, useState } from "react";

export default function Locations() {
  useEffect(() => {
    document.title = "Locations | Raudhah Rich Auto";
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || "";
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(ua));
  }, []);

  const locations = useMemo(
    () => [
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
    ],
    []
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-4">Our Locations</h1>
      <p className="text-center text-gray-600 mb-12">
        Tap a map or choose your preferred navigation app.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {locations.map((loc) => {
          const encoded = encodeURIComponent(loc.address);

          const googleDir = `https://www.google.com/maps/dir/?api=1&destination=${encoded}`;
          const wazeDir = `https://waze.com/ul?q=${encoded}&navigate=yes`;
          const appleDir = `https://maps.apple.com/?q=${encoded}`;

          // On mobile: highlight Waze (popular)
          // On desktop: highlight Google Maps (most universal)
          const primaryIsWaze = isMobile;

          return (
            <div
              key={loc.name}
              className="bg-white rounded-2xl border shadow p-6"
            >
              <h2 className="text-xl font-semibold mb-2">{loc.name}</h2>

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

              <p className="text-sm text-gray-700 mb-4">📍 {loc.address}</p>

              <div className="flex flex-wrap gap-3">
                {/* Google */}
                <a
                  href={googleDir}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    primaryIsWaze
                      ? "bg-gray-200 text-black px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-300 transition"
                      : "bg-black text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-800 transition"
                  }
                >
                  Google Maps
                </a>

                {/* Waze */}
                <a
                  href={wazeDir}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    primaryIsWaze
                      ? "bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
                      : "bg-gray-200 text-black px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-300 transition"
                  }
                >
                  Waze
                </a>

                {/* Apple */}
                <a
                  href={appleDir}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-200 text-black px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-300 transition"
                >
                  Apple Maps
                </a>
              </div>

              <p className="text-xs text-gray-500 mt-3">
                Tip: If you have Waze installed, the Waze button will open it directly.
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
