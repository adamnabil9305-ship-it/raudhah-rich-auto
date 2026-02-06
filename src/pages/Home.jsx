import { useEffect } from "react";
import { siteContent } from "../data/siteContent";

export default function Home() {
  useEffect(() => {
    document.title = "Raudhah Rich Auto | Trusted Auto Services";
  }, []);

  const { promo } = siteContent;

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="bg-red-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Trusted Auto Service You Can Rely On
          </h1>
          <p className="mt-4 text-sm md:text-lg opacity-90 max-w-2xl mx-auto">
            Professional servicing, repairs, and inspections across Shah Alam & Batu Caves.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/locations"
              className="inline-block bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
            >
              View Locations
            </a>
            <a
              href="/contact"
              className="inline-block bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
            >
              Contact HQ
            </a>
          </div>
        </div>
      </section>

      {/* TRUST CARDS */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-6">
            <TrustCard
              icon="📍"
              title="Multiple Branches"
              desc="Choose the nearest workshop location for convenience."
            />
            <TrustCard
              icon="🛠️"
              title="Experienced Team"
              desc="Reliable technicians for servicing, repairs, and inspections."
            />
            <TrustCard
              icon="✅"
              title="Trusted Support"
              desc="Clear communication and practical advice before you proceed."
            />
          </div>
        </div>
      </section>

      {/* PROMO / ADS SLOT (editable from siteContent.js) */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="rounded-2xl border shadow-sm p-6 md:p-8 bg-gradient-to-r from-black to-gray-900 text-white">
            <p className="text-xs uppercase tracking-widest text-gray-300">
              {promo.badge}
            </p>
            <h2 className="text-xl md:text-2xl font-bold mt-2">{promo.title}</h2>
            <p className="text-gray-300 mt-2 max-w-2xl">{promo.description}</p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={promo.primaryButtonLink}
                className="inline-block bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition text-center"
              >
                {promo.primaryButtonText}
              </a>
              <a
                href={promo.secondaryButtonLink}
                className="inline-block border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition text-center"
              >
                {promo.secondaryButtonText}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <InfoBox
              title="Fast Enquiries"
              desc="Reach HQ via call, WhatsApp, or email. We’ll guide you on the next best step."
            />
            <InfoBox
              title="Convenient Navigation"
              desc="Use Google Maps, Waze, or Apple Maps to get directions to any branch."
            />
            <InfoBox
              title="Transparent Communication"
              desc="We explain what’s needed and what can wait—so you stay in control."
            />
            <InfoBox
              title="Client-ready Updates"
              desc="Promos, gallery, and future admin features can be added when content is ready."
            />
          </div>
        </div>
      </section>

      {/* SMALL CTA */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <h3 className="text-xl md:text-2xl font-bold">Ready to visit us?</h3>
          <p className="text-gray-600 mt-2">
            View the nearest branch and navigate instantly.
          </p>
          <a
            href="/locations"
            className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Find a Branch
          </a>
        </div>
      </section>
    </div>
  );
}

function TrustCard({ icon, title, desc }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-md transition">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function InfoBox({ title, desc }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h4 className="font-semibold text-lg mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}
