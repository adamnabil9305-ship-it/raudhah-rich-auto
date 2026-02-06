export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/60133300069"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center hover:bg-green-600 transition"
      aria-label="Chat on WhatsApp"
    >
      <span className="text-2xl">💬</span>
    </a>
  );
}
