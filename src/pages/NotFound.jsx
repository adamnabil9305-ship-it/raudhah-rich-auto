import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-2xl border shadow p-8 text-center">
        <div className="text-4xl mb-3">😵‍💫</div>
        <h1 className="text-2xl font-bold">Page not found</h1>
        <p className="text-gray-600 mt-2">
          The page you’re looking for doesn’t exist (or moved).
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            to="/"
            className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="border px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
