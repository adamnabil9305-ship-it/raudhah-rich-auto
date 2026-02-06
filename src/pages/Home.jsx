import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Raudhah Rich Auto | Trusted Auto Services";
  }, []);

  return (
    <>
      <section className="bg-red-600 text-white py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Trusted Auto Service You Can Rely On
          </h1>
          <p className="mt-4 text-sm md:text-lg opacity-90">
            Professional servicing, repairs, and inspections in Shah Alam & Batu Caves.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-2xl border bg-white shadow-sm p-6 md:p-8">
            <p className="text-xs uppercase tracking-widest text-gray-500">
              Promotion / Announcement
            </p>
            <h2 className="text-xl md:text-2xl font-bold mt-2">
              Promo slot (content to be updated)
            </h2>
            <p className="text-gray-600 mt-2">
              Free inspection • Seasonal promo • Special offer
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
