import { useEffect, useMemo, useState } from "react";

export default function Locations() {
  useEffect(() => {
    document.title = "Locations | Raudhah Rich Auto";
  }, []);

  // Approx coords (good enough for “nearest suggestion”)
  // If you later want PERFECT coords, we can refine from Google Maps pins.
  const branches = useMemo(
    () => [
      {
        name: "Raudhah Rich Auto Services (Seksyen 23)",
        address: "No 54, Jalan Pelabur A, 23/A, Seksyen 23, 40000 Shah Alam, Selangor",
        lat: 3.0608,
        lng: 101.5315,
      },
      {
        name: "Raudhah Rich Auto Services (Seksyen 15)",
        address: "No 25-G, Blok 10, Jalan Pahat J 15/J, Dataran Otomobil, 40200 Shah Alam, Selangor",
        lat: 3.0616,
        lng: 101.5359,
      },
      {
        name: "Raudhah Rich Auto Services (U12)",
        address: "1, Jln Selasih J U12/J, Cahaya Alam, 40170 Shah Alam, Selangor",
        lat: 3.0837,
        lng: 101.4864,
      },
      {
        name: "Raudhah Auto KL",
        address: "No 3, Jalan SBC 5, Taman Seri Batu Caves, 68100 Batu Caves, Selangor",
        lat: 3.2370,
        lng: 101.6810,
      },
    ],
    []
  );

  const [nearest, setNearest] = useState(null);
  const [status, setStatus] = useState("");

  function haversineKm(aLat, aLng, bLat, bLng) {
    const R = 6371;
    const dLat = ((bLat - aLat) * Math.PI) / 180;
    const dLng = ((bLng - aLng) * Math.PI) / 180;
    const s1 = Math.sin(dLat / 2) ** 2;
    const s2 =
      Math.cos((aLat * Math.PI) / 180) *
      Math.cos((bLat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(s1 + s2), Math.sqrt(1 - (s1 + s2)));
    return R * c;
  }

  function getNavLinks(address) {
    const q = encodeURIComponent(address);
    return {
      google: `https://www.google.com/maps/search/?api=1&query=${q}`,
      waze: `https://waze.com/ul?q=${q}&navigate=yes`,
      apple: `https://maps.apple.com/?q=${q}`,
    };
  }

  function useMyLocation() {
    setStatus("Requesting location permission…");
    setNearest(null);

    if (!navigator.geolocation) {
      setStatus("Geolocation not supported on this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        let best = null;
        for (const b of branches) {
          const dist = haversineKm(latitude, longitude, b.lat, b.lng);
          if (!best || dist < best.distanceKm) {
            best = { ...b, distanceKm: dist };
          }
        }

        setNearest(best);
        setStatus("");
      },
      () => {
        setStatus("Location permission denied. You can still open maps manually below.");
      },
      { enableHighAccuracy: true, timeout: 12000 }
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-4">Locations</h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Choose a branch and navigate using Google Maps, Waze, or Apple Maps.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <button
            onClick={useMyLocation}
            className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Use My Location → Suggest Nearest Branch
          </button>
          <a
            href="/contact"
            className="border px-6 py-3 rounded-xl font-semibold text-center hover:bg-gray-100 transition"
          >
            Contact HQ
          </a>
        </div>

        {status && (
          <div className="mb-8 bg-white border rounded-2xl shadow-sm p-4 text-sm text-gray-700">
            {status}
          </div>
        )}

        {nearest && (
          <div className="mb-10 bg-white border rounded-2xl shadow p-6">
            <p className="text-xs uppercase tracking-widest text-gray-500">Nearest branch</p>
            <h2 className="text-2xl font-bold mt-1">{nearest.name}</h2>
            <p className="text-gray-600 mt-2">{nearest.address}</p>
            <p className="text-sm text-gray-600 mt-2">
              Approx distance: <span className="font-semibold">{nearest.distanceKm.toFixed(1)} km</span>
            </p>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <a
                href={getNavLinks(nearest.address).google}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition text-center"
              >
                Open in Google Maps
              </a>
              <a
                href={getNavLinks(nearest.address).waze}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition text-center"
              >
                Open in Waze
              </a>
              <a
                href={getNavLinks(nearest.address).apple}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition text-center"
              >
                Open in Apple Maps
              </a>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {branches.map((b) => {
            const links = getNavLinks(b.address);
            return (
              <div key={b.name} className="bg-white rounded-2xl border shadow-sm p-6">
                <h3 className="text-lg font-bold">{b.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{b.address}</p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={links.google}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition text-sm"
                  >
                    Google Maps
                  </a>
                  <a
                    href={links.waze}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl border bg-white font-semibold hover:bg-gray-100 transition text-sm"
                  >
                    Waze
                  </a>
                  <a
                    href={links.apple}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl border bg-white font-semibold hover:bg-gray-100 transition text-sm"
                  >
                    Apple Maps
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-gray-500 mt-10 text-center">
          Note: Nearest-branch suggestion uses approximate coordinates (good for guidance).
        </p>
      </div>
    </div>
  );
}
