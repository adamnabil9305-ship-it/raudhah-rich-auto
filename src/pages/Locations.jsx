import { useEffect } from "react";

export default function Locations() {
  useEffect(() => {
    document.title = "Locations | Raudhah Rich Auto";
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-4">Our Locations</h1>
      <p className="text-center text-gray-600 mb-12">
        Tap a map or address to navigate directly to our workshops.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        <Location
          name="Seksyen 23, Shah Alam"
          address="No 54, Jalan Pelabur A, 23/A, Seksyen 23, 40000 Shah Alam, Selangor"
        />
        <Location
          name="Seksyen 15, Shah Alam"
          address="No 25-G, Blok 10, Jalan Pahat J 15/J, Dataran Otomobil, 40200 Shah Alam, Selangor"
        />
        <Location
          name="U12, Shah Alam"
          address="1, Jln Selasih J U12/J, Cahaya Alam, 40170 Shah Alam, Selangor"
        />
        <Location
          name="Batu Caves, KL"
          address="No 3, Jalan SBC 5, Taman Seri Batu Caves, 68100 Batu Caves, Selangor"
        />
      </div>
    </div>
  );
}

function Location({ name, address }) {
  const link = `https://www.google.com/maps?q=${encodeURIComponent(address)}`;

  return (
    <div className="bg-white rounded-2xl border shadow p-6">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline text-sm"
      >
        📍 {address}
      </a>
    </div>
  );
}
