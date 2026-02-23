// src/pages/About.jsx
import React from "react";

export default function About() {
  const cards = [
    {
      title: "Our Vision",
      text: "To be a recognized Bumiputera Service Center delivering best in class quality output.",
    },
    {
      title: "Our Mission",
      text: "To facilitate high quality service, provide clear consultation, and offer the best solutions with the right options.",
    },
    {
      title: "Business Scope",
      text: "A one stop center for repairs, scheduled maintenance, spare parts, and air-conditioning specialization.",
    },
  ];

  const highlights = [
    { title: "Established", value: "2015" },
    { title: "One Stop Solution", value: "Service & Repairs" },
    { title: "Key Specialty", value: "Aircond Systems" },
    { title: "Growing", value: "Multiple Outlets" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="relative h-[60vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        {/* Background image (put in /public as rf-workshop.jpg) */}
        <img
          src="/rf-workshop.png"
          alt="Raudhah Rich Auto workshop"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            // Hide broken image icon if user hasn't added image yet
            e.currentTarget.style.display = "none";
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/55 to-red-700/35" />

        {/* Content */}
        <div className="relative z-10 px-6 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-sm text-white/90 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            Raudhah Rich Auto Sdn Bhd
          </div>

          <h1 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Start Your Impossible
          </h1>

          <p className="mt-4 text-base md:text-lg text-white/90 leading-relaxed">
            Through innovation and passion, we deliver ever-better service outputs and enrich
            the lives of the community — built from zero since 2015.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/contact"
              className="w-full sm:w-auto rounded-xl bg-red-600 px-6 py-3 font-semibold text-white shadow hover:bg-red-700 transition"
            >
              Contact Us
            </a>

            <a
              href="/services"
              className="w-full sm:w-auto rounded-xl bg-white/10 px-6 py-3 font-semibold text-white border border-white/15 hover:bg-white/15 transition backdrop-blur"
            >
              View Services
            </a>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm text-slate-500">{h.title}</p>
                <p className="mt-2 text-xl font-bold text-slate-900">{h.value}</p>
                <div className="mt-4 h-1 w-12 rounded-full bg-red-600" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT + IMAGE */}
      <section className="px-6 pb-14">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-extrabold">About Us</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Raudhah Rich Auto Sdn Bhd is a one stop automobile solution center focusing on
              quality workmanship, clear consultation, and customer-first service.
            </p>
            <p className="mt-4 text-slate-700 leading-relaxed">
              We are committed to correct SOPs, proper calibration, and using the right tools
              and parts quality — so your car gets the best care every time.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-red-50 text-red-700 border border-red-100 px-3 py-1 text-sm font-medium">
                Automotive Repairs
              </span>
              <span className="rounded-full bg-red-50 text-red-700 border border-red-100 px-3 py-1 text-sm font-medium">
                Aircond Specialist
              </span>
              <span className="rounded-full bg-red-50 text-red-700 border border-red-100 px-3 py-1 text-sm font-medium">
                Maintenance
              </span>
              <span className="rounded-full bg-red-50 text-red-700 border border-red-100 px-3 py-1 text-sm font-medium">
                Spare Parts
              </span>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 min-h-[320px]">
            {/* Put in /public as rf-tools.jpg or rf-team.jpg */}
            <img
              src="/rf-tools.png"
              alt="Workshop tools"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/35 via-transparent to-red-600/20" />

            <div className="relative p-6">
              <div className="inline-block rounded-xl bg-white/85 backdrop-blur px-4 py-2 text-slate-900 border border-white/60">
                <p className="text-sm font-semibold">Our Commitment</p>
                <p className="text-sm text-slate-600">is to YOUR satisfaction.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CARDS */}
      <section className="bg-slate-50 border-t border-b">
        <div className="px-6 py-14 max-w-6xl mx-auto">
          <h2 className="text-2xl font-extrabold">What We Stand For</h2>
          <p className="mt-3 text-slate-600 max-w-3xl">
            Clear, customer-first solutions — with quality outputs you can trust.
          </p>

          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {cards.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <span className="h-10 w-10 rounded-2xl bg-red-600/10 border border-red-600/15 grid place-items-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-600" />
                  </span>
                  <h3 className="text-lg font-bold">{c.title}</h3>
                </div>
                <p className="mt-4 text-slate-700 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-14">
        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-red-700 px-8 py-12 text-white">
            <h2 className="text-2xl md:text-3xl font-extrabold">
              Ready to service your car with confidence?
            </h2>
            <p className="mt-3 text-white/90 max-w-2xl">
              Book a visit or ask for consultation — we’ll recommend the best options with clear
              explanations.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a
                href="/contact"
                className="rounded-xl bg-white text-slate-900 px-6 py-3 font-semibold hover:bg-white/90 transition text-center"
              >
                Contact / Booking
              </a>
              <a
                href="/services"
                className="rounded-xl bg-white/10 border border-white/20 px-6 py-3 font-semibold hover:bg-white/15 transition text-center"
              >
                See Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER STRIP */}
      <footer className="px-6 py-8 border-t bg-white">
        <div className="max-w-6xl mx-auto text-sm text-slate-500 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Raudhah Rich Auto Sdn Bhd</p>
          <p className="text-slate-400">Built with care • Red / Black brand theme</p>
        </div>
      </footer>
    </div>
  );
}