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
      mapEmbed:
        "https://www.google.com/maps?q=No%2054,%20Jalan%20Pelabur%20A,%2023/A,%20Seksyen%2023,%2040000%20Shah%20Alam,%20Selangor&output=embed",
    },
    {
      name: "Seksyen 15, Shah Alam",
      address:
        "No 25-G, Blok 10, Jalan Pahat J 15/J, Dataran Otomobil, 40200 Shah Alam, Selangor",
      mapEmbed:
        "https://www.google.com/maps?q=No%2025-G,%20Blok%2010,%20Jalan%20Pahat%20J%2015/J,%20Dataran%20Otomobil,%2040200%20Shah%20Alam,%20Selangor&output=embed",
    },
    {
      name: "U12, Shah Alam",
      address: "1, Jln Selasih J U12/J, Cahaya Alam, 40170 Shah Alam, Selangor",
      mapEmbed:
        "https://www.google.com/maps?q=1,%20Jln%20Selasih%20J%20U12/J,%20Cahaya%20Alam,%2040170%20Shah%20Alam,%20Selangor&output=embed",
    },
    {
      name: "Batu Caves, KL",
      address:
        "No 3, Jalan SBC 5, Taman Seri Batu Caves, 68100 Batu Caves, Selangor",
      mapEmbed:
        "https://www.google.com/maps?q=No%203,%20Jalan%20SBC%205,%20Taman%20Seri%20Batu%20Caves,%2068100%20Batu%20Caves,%20Selangor&output=embed",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-4">Our Locations</h1>
      <p className="text-center text-gray-600 mb-12">
        View the map or tap the address to open navigation.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {locations.map((loc) => (
          <div key={loc.name} className="bg-white rounded-2xl border shadow p-6">
            <h2 className="text-xl font-semibold mb-2">{loc.name}</h2>

            <div className="rounded-xl overflow-hidden border bg-gray-50">
              <iframe
                title={`Map - ${loc.name}`}
                src={loc.mapEmbed}
                width="100%"
                height="260"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
              />
            </div>

            <a
              className="block mt-4 text-blue-600 hover:underline text-sm"
              href={`https://www.google.com/maps?q=${encodeURIComponent(
                loc.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              📍 {loc.address}
            </a>

            <div className="mt-4">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  loc.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-black text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-800 transition"
              >
                Get Directions
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
