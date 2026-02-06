import { useEffect } from "react";

export default function Gallery() {
  useEffect(() => {
    document.title = "Gallery | Raudhah Rich Auto";
  }, []);

  const images = [
    { src: "/gallery/gallery-1.jpg", alt: "Workshop photo 1" },
    { src: "/gallery/gallery-2.jpg", alt: "Workshop photo 2" },
    { src: "/gallery/gallery-3.jpg", alt: "Workshop photo 3" },
    { src: "/gallery/gallery-4.jpg", alt: "Workshop photo 4" },
    { src: "/gallery/gallery-5.jpg", alt: "Workshop photo 5" },
    { src: "/gallery/gallery-6.jpg", alt: "Workshop photo 6" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-4">Gallery</h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Photos will be updated once the client provides them.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <div key={img.src} className="bg-white rounded-2xl border shadow-sm overflow-hidden">
              <div className="aspect-[4/3] bg-gray-100">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // If image not found yet, show a placeholder
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement.classList.add("flex", "items-center", "justify-center");
                    e.currentTarget.parentElement.innerHTML =
                      '<div class="text-center p-6"><div class="text-3xl mb-2">🖼️</div><p class="text-sm text-gray-600 font-semibold">Image pending</p><p class="text-xs text-gray-500 mt-1">Waiting for client photo</p></div>';
                  }}
                />
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold">{img.alt}</p>
                <p className="text-xs text-gray-500 mt-1">File: {img.src}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white border rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold mb-2">How to add photos later</h2>
          <ol className="list-decimal ml-5 text-sm text-gray-700 space-y-1">
            <li>Create folder: <span className="font-semibold">public/gallery</span></li>
            <li>
              Put images inside named exactly:
              <span className="font-semibold">
                {" "}
                gallery-1.jpg … gallery-6.jpg
              </span>
            </li>
            <li>Push to GitHub → Vercel updates automatically</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
