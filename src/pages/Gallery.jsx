import { useEffect, useMemo } from "react";

const TOTAL = 6;

export default function Gallery() {
  useEffect(() => {
    document.title = "Gallery | Raudhah Rich Auto";
  }, []);

  const enabled = localStorage.getItem("gallery_enabled") === "yes";

  const images = useMemo(() => {
    return Array.from({ length: TOTAL }, (_, i) => ({
      id: i + 1,
      src: `/gallery/gallery-${i + 1}.jpg`,
      alt: `Workshop photo ${i + 1}`,
    }));
  }, []);

  if (!enabled) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-14 text-center">
          <h1 className="text-4xl font-bold">Gallery</h1>
          <p className="text-gray-600 mt-3">
            Coming soon. We’re collecting workshop photos and will update this page.
          </p>

          <div className="mt-8 bg-white border rounded-2xl shadow p-6 max-w-xl mx-auto text-left">
            <p className="text-sm text-gray-700 font-semibold">Admin note:</p>
            <p className="text-sm text-gray-600 mt-1">
              Turn Gallery ON from <span className="font-semibold">Admin Dashboard</span> once photos are ready.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold">Gallery</h1>
        <p className="text-gray-600 mt-2">
          Workshop photos (client will update). If an image is missing, it will show a placeholder.
        </p>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <div key={img.id} className="bg-white border rounded-2xl shadow overflow-hidden">
              <div className="aspect-[4/3] bg-gray-100">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "data:image/svg+xml;charset=UTF-8," +
                      encodeURIComponent(
                        `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>
                          <rect width='100%' height='100%' fill='#F3F4F6'/>
                          <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
                            font-family='Arial' font-size='28' fill='#6B7280'>
                            Missing: gallery-${img.id}.jpg
                          </text>
                        </svg>`
                      );
                  }}
                />
              </div>
              <div className="p-4">
                <p className="font-semibold">Workshop photo {img.id}</p>
                <p className="text-sm text-gray-600">File: gallery-{img.id}.jpg</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-10">
          Upload images to <span className="font-mono">public/gallery/</span> as{" "}
          <span className="font-mono">gallery-1.jpg</span> …{" "}
          <span className="font-mono">gallery-6.jpg</span>.
        </p>
      </div>
    </div>
  );
}
