import React from "react";
import { Link } from "react-router-dom";

const timeline = [
  { year: "2014", text: "Planning, feasibility study & basic setup." },
  { year: "2015", text: "Official operations & registration (Raudhah Rich Auto Services). Became an authorized dealer/appointment collaborations." },
  { year: "2016", text: "Expanded specialization (including air-conditioning) and grew technical scope." },
  { year: "2017", text: "Expanded with additional branch operations." },
  { year: "2019", text: "Added tyre scope and became a full one-stop automotive center." },
  { year: "2020", text: "Acquisition and upgrade to Sdn Bhd." },
  { year: "2021", text: "HQ office setup + continued expansion strategy." },
];

const scope = [
  "One-stop center for automotive repairs, scheduled maintenance & spare parts",
  "Specialization in automotive air-conditioning system maintenance, re-conditioning & upgrading",
  "Personal coaching for education institutions",
  "Community contributions and welfare services",
];

export default function About() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <div className="bg-slate-50 border-b">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-4xl font-extrabold tracking-tight">About Us</h1>
          <p className="mt-3 text-slate-600 max-w-3xl">
            Learn more about Raudhah Rich Auto — our story, our mission, and what we do as a
            trusted automotive service center in Selangor & Batu Caves.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="rounded-xl bg-black px-5 py-2.5 text-white font-semibold hover:bg-slate-800 transition"
            >
              Contact Us
            </Link>
            <Link
              to="/services"
              className="rounded-xl border border-slate-300 px-5 py-2.5 font-semibold hover:bg-white transition"
            >
              View Services
            </Link>
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold">Our Story</h2>
            <p className="mt-3 text-slate-700 leading-relaxed">
              Raudhah Rich Auto began its journey in 2015, growing from zero into a brand that
              believes in doing things differently — focusing on service output, integrity, and
              customer perspective from day one. Over the years, the company expanded through
              acquisitions and new branches, continuing to grow with innovation and passion.
            </p>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Our guiding spirit is <span className="font-semibold">“Start Your Impossible”</span> —
              a promise to customers and society to continuously improve, challenge limits, and
              build a dependable one-stop automobile solution.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="font-bold text-lg">What we focus on</h3>
            <ul className="mt-4 space-y-3 text-slate-700">
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-red-600" />
                Giving ever-better service outputs
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-red-600" />
                Enriching the lives of the community
              </li>
            </ul>

            <div className="mt-6 rounded-xl bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Established</div>
              <div className="text-xl font-extrabold">2015</div>
              <div className="mt-2 text-sm text-slate-600">
                Growing with multiple outlets across Shah Alam & Batu Caves.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-slate-50 border-y">
        <div className="mx-auto max-w-6xl px-4 py-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-7 shadow-sm border">
            <h2 className="text-2xl font-bold">Vision</h2>
            <p className="mt-3 text-slate-700 leading-relaxed">
              To be a recognized Bumiputera Service Center delivering best-in-class quality output.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-sm border">
            <h2 className="text-2xl font-bold">Mission</h2>
            <ol className="mt-4 space-y-3 text-slate-700 list-decimal list-inside">
              <li>Facilitate high-quality service towards customer satisfaction</li>
              <li>Provide consultation and clear advisory for car maintenance awareness</li>
              <li>Offer the best potential solution and options with honest verdicts</li>
            </ol>
            <p className="mt-4 text-slate-600 text-sm">
              We strive to practice proper SOPs, use the right equipment & quality parts, and grow
              personnel competency with integrity and dedication.
            </p>
          </div>
        </div>
      </section>

      {/* Business Scope */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">What We Do</h2>
        <p className="mt-3 text-slate-600 max-w-3xl">
          A practical, real-world scope that covers repairs, maintenance, parts, and service
          excellence — backed by experience and continuous improvement.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {scope.map((item) => (
            <div key={item} className="rounded-2xl border p-6 shadow-sm bg-white">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-red-600" />
                <p className="text-slate-700">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-slate-50 border-t">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold">Timeline & Growth</h2>
          <p className="mt-3 text-slate-600 max-w-3xl">
            Key milestones that shaped the company’s expansion and service coverage.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {timeline.map((t) => (
              <div key={t.year} className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="text-sm text-slate-500">{t.year}</div>
                <div className="mt-1 font-semibold text-slate-900">{t.text}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-black text-white p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-lg font-bold">Ready to service your car?</div>
              <div className="text-white/80 mt-1">
                Reach us via WhatsApp or visit the nearest branch.
              </div>
            </div>

            <Link
              to="/contact"
              className="rounded-xl bg-white text-black px-5 py-2.5 font-semibold hover:bg-slate-100 transition"
            >
              Go to Contact
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Raudhah Rich Auto Services
      </footer>
    </div>
  );
}