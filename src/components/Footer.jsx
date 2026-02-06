export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img
              src="/logo.png"
              alt="Raudhah Rich Auto Logo"
              className="h-10 w-10 object-contain"
            />
            <h3 className="text-lg font-bold">Raudhah Rich Auto</h3>
          </div>
          <p className="text-sm text-gray-300">
            Reliable automotive servicing with multiple branches across Selangor & KL.
          </p>
        </div>

        {/* HQ Address */}
        <div>
          <h4 className="font-semibold mb-3">Head Office</h4>
          <p className="text-sm text-gray-300 leading-relaxed">
            RAUDHAH RICH GROUP SDN BHD (HQ)<br />
            No 68 Jalan Pelabur A23/A,<br />
            Seksyen 23, 40300 Shah Alam,<br />
            Selangor.
          </p>
          <a
            className="text-sm text-blue-300 hover:underline inline-block mt-3"
            href="https://www.google.com/maps?q=No+68+Jalan+Pelabur+A23/A,+Seksyen+23,+40300+Shah+Alam,+Selangor"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open HQ in Google Maps →
          </a>
        </div>

        {/* Contact + Links */}
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-sm text-gray-300">
            WhatsApp / Phone:{" "}
            <a
              href="https://wa.me/60133300069"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-300 hover:underline"
            >
              013-330 0069
            </a>{" "}
            <span className="text-gray-400">(Ahmad Raudhah)</span>
          </p>

          <p className="text-sm text-gray-300 mt-2">
            Email:{" "}
            <a
              href="mailto:raudhahrichgroup@gmail.com"
              className="text-blue-300 hover:underline"
            >
              raudhahrichgroup@gmail.com
            </a>
          </p>

          <div className="mt-5 flex flex-wrap gap-4 text-sm">
            <a className="hover:text-red-400" href="/services">Services</a>
            <a className="hover:text-red-400" href="/shop">Shop</a>
            <a className="hover:text-red-400" href="/gallery">Gallery</a>
            <a className="hover:text-red-400" href="/locations">Locations</a>
            <a className="hover:text-red-400" href="/contact">Contact</a>
          </div>

          <p className="text-xs text-gray-400 mt-5">
            Mon–Sat 9:00 AM–6:00 PM • Sun 9:00 AM–3:00 PM
          </p>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Raudhah Rich Auto Services. All rights reserved.
      </div>
    </footer>
  );
}
