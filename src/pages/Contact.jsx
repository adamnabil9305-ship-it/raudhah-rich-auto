export default function Contact() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-center mb-4">Contact Us</h1>
      <p className="text-center text-gray-600 mb-12">
        Get in touch with our head office for enquiries or support.
      </p>

      <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
        {/* HQ INFO */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Head Office</h2>
          <p className="font-medium">RAUDHAH RICH GROUP SDN BHD (HQ)</p>
          <p className="text-gray-700">
            No 68, Jalan Pelabur A23/A,<br />
            Seksyen 23, 40300 Shah Alam,<br />
            Selangor.
          </p>
        </div>

        {/* CONTACT */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-1">Phone / WhatsApp</h3>
            <a
              href="tel:0133300069"
              className="text-blue-600 hover:underline block"
            >
              013-330 0069 (Ahmad Raudhah)
            </a>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Email</h3>
            <a
              href="mailto:raudhahrichgroup@gmail.com"
              className="text-blue-600 hover:underline block"
            >
              raudhahrichgroup@gmail.com
            </a>
          </div>
        </div>

        {/* BUSINESS HOURS */}
        <div>
          <h3 className="font-semibold mb-1">Business Hours</h3>
          <p className="text-gray-700">Monday – Saturday: 9.00 AM – 6.00 PM</p>
          <p className="text-gray-700">Sunday: 9.00 AM – 3.00 PM</p>
        </div>

        {/* MAP BUTTON */}
        <div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=No+68+Jalan+Pelabur+A23/A+Seksyen+23+Shah+Alam"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Open HQ in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
