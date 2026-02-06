import { useEffect, useMemo, useState } from "react";

export default function Gallery() {
  useEffect(() => {
    document.title = "Gallery | Raudhah Rich Auto";
  }, []);

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem("gallery_enabled") === "yes";
    setEnabled(v);
  }, []);

  const images = useMemo(
    () => [
      { src: "/gallery/gallery-1.jpg", alt: "Workshop photo 1" },
      { src: "/gallery/gallery-2.jpg", alt: "Workshop photo 2" },
      { src: "/gallery/gallery-3.jpg", alt: "Workshop photo 3" },
      { src: "/gallery/gallery-4.jpg", alt: "Workshop photo 4" },
      { src: "/gallery/gallery-5.jpg", alt: "Workshop photo 5" },
      { src: "/gallery/gallery-6.jpg", alt: "Workshop photo 6" },
    ],
    []
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-bold mb-2">Gallery</h1>
            <p className="text-gray-600">
              Workshop photos and updates. (Client photos will be added soon.)
            </p>
          </div>

          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-white text-sm font-semibold">
            <span className="text-yellow-600">●</span> Coming Soon
          </span>
        </div>

        {/* If disabled, show Coming Soon card */}
        {!enabled ? (
          <div className="mt-10 bg-white border rounded-2xl shadow-sm p-8">
            <h2 className="text-xl font-bold mb-2">Gallery is not live yet</h2>
            <p className="text-gray-600">
              We’re waiting for the workshop photos. Once ready, we’ll enable the gallery.
            </p>

            <div className="mt-5 bg-gray-50 border rounded-xl p-4">
              <p className="text-sm font-semibold mb-2">Needed files:</p>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                <li>public/gallery/gallery-1.jpg</li>
                <li>public/gallery/gallery-2.jpg</li>
                <li>public/gallery/gallery-3.jpg</li>
                <li>public/gallery/gallery-4.jpg</li>
                <li>public/gallery/gallery-5.jpg</li>
                <li>public/gallery/gallery-6.jpg</li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mt-10 mb-6">
              Tip: If a photo is missing, it will show a placeholder tile.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((img) => (
                <GalleryTile key={img.src} img={img} />
              ))}
            </div>
          </>
        )}

        <div className="mt-12 bg-white border rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold mb-2">How to add photos later</h2>
          <ol className="list-decimal ml-5 text-sm text-gray-700 space-y-1">
            <li>Create folder: <span className="font-semibold">public/gallery</span></li>
            <li>
              Put images inside named exactly:
              <span className="font-semibold"> gallery-1.jpg … gallery-6.jpg</span>
            </li>
            <li>Push to GitHub → Vercel updates automatically</li>
            <li>Admin → enable Gallery toggle when ready</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

function GalleryTile({ img }) {
  const [missing, setMissing] = useState(false);

  if (missing) {
    return (
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
          <div className="text-center p-6">
            <div className="text-3xl mb-2">🖼️</div>
            <p className="text-sm text-gray-600 font-semibold">Image pending</p>
            <p className="text-xs text-gray-500 mt-1">{img.src}</p>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm font-semibold">{img.alt}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <div className="aspect-[4/3] bg-gray-100">
        <img
          src={img.src}
          alt={img.alt}
          className="w-full h-full object-cover"
          onError={() => setMissing(true)}
        />
      </div>
      <div className="p-4">
        <p className="text-sm font-semibold">{img.alt}</p>
        <p className="text-xs text-gray-500 mt-1">File: {img.src}</p>
      </div>
    </div>
  );
}
