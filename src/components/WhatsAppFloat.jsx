import { useLocation } from "react-router-dom";

export default function WhatsAppFloat() {
  const location = useLocation();

  // Hide on admin routes
  if (location.pathname.startsWith("/admin")) return null;

  return (
    <a
      href="https://wa.me/60133300069"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded-full shadow-lg font-semibold hover:bg-green-700 transition"
    >
      WhatsApp Us
    </a>
  );
}
