import { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    document.title = "Contact Us | Raudhah Rich Auto";
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Head Office</h2>
          <p className="font-semibold">RAUDHAH RICH GROUP SDN BHD (HQ)</p>
          <p className="mt-2 text-gray-700">
            No 68 Jalan Pelabur A23/A,<br />
            Seksyen 23, 40300 Shah Alam,<br />
            Selangor.
          </p>
        </div>

        <div className="bg-white rounded-2xl border shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Details</h2>
          <p>
            WhatsApp / Phone:{" "}
            <a
              href="https://wa.me/60133300069"
              className="text-green-600 hover:underline"
            >
              013-330 0069 (Ahmad Raudhah)
            </a>
          </p>
          <p className="mt-2">
            Email:{" "}
            <a
              href="mailto:raudhahrichgroup@gmail.com"
              className="text-blue-600 hover:underline"
            >
              raudhahrichgroup@gmail.com
            </a>
          </p>
          <p className="mt-4 text-sm text-gray-600">
            Mon–Sat 9:00 AM – 6:00 PM<br />
            Sun 9:00 AM – 3:00 PM
          </p>
        </div>
      </div>
    </div>
  );
}
