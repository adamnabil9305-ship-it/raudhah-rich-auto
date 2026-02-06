import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 | Raudhah Rich Auto";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-gray-600 mb-6">Page not found.</p>
        <Link
          to="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
