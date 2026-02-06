export default function Gallery() {
  const photos = [
    { title: "Workshop", src: "/gallery-1.jpg" },
    { title: "Servicing Bay", src: "/gallery-2.jpg" },
    { title: "Repair Work", src: "/gallery-3.jpg" },
    { title: "Tools & Parts", src: "/gallery-4.jpg" },
    { title: "Before / After", src: "/gallery-5.jpg" },
    { title: "Customer Cars", src: "/gallery-6.jpg" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-4">Gallery</h1>
      <p className="text-center text-gray-600 mb-12">
        Photos of our workshops, service work, and customer vehicles.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((p, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              <img
                src={p.src}
                alt={p.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // fallback so page still looks good even before you add images
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement.className =
                    "aspect-video bg-gray-100 flex items-center justify-center text-gray-500 text-sm";
                  e.currentTarget.parentElement.innerText =
                    "Add image: " + p.src.replace("/", "");
                }}
              />
            </div>

            <div className="p-4">
              <h2 className="font-semibold">{p.title}</h2>
              <p className="text-sm text-gray-600">
                Tap to view (images will be added later).
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center text-sm text-gray-500">
        Tip: Put your images in the <span className="font-semibold">public</span>{" "}
        folder with names: <span className="font-semibold">
          gallery-1.jpg ... gallery-6.jpg
        </span>
      </div>
    </div>
  );
}
