import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminTopbar from "../components/AdminTopbar";

export default function AdminInbox() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    document.title = "Admin Inbox | Raudhah Rich Auto";
    const isAuthed = localStorage.getItem("raudhah_admin_authed") === "yes";
    if (!isAuthed) navigate("/admin/login");
  }, [navigate]);

  function load() {
    const saved = localStorage.getItem("raudhah_inbox");
    setItems(saved ? JSON.parse(saved) : []);
  }

  useEffect(() => {
    load();
  }, []);

  const count = useMemo(() => items.length, [items]);

  function clearAll() {
    if (!confirm("Clear all inbox items (this browser only)?")) return;
    localStorage.setItem("raudhah_inbox", JSON.stringify([]));
    load();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminTopbar subtitle="Inbox" />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold">Admin Inbox</h1>
            <p className="text-sm text-gray-600 mt-1">
              Phase 2 inbox (localStorage). Used for testing enquiry flow.
            </p>
          </div>

          <button
            onClick={clearAll}
            className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition text-sm font-semibold"
          >
            Clear All
          </button>
        </div>

        <div className="mt-8 bg-white rounded-2xl border shadow p-6">
          <p className="text-sm text-gray-700">
            Total enquiries saved: <span className="font-semibold">{count}</span>
          </p>

          {items.length === 0 ? (
            <p className="text-sm text-gray-600 mt-4">
              No enquiries saved yet. Try sending from Shop or Services.
            </p>
          ) : (
            <div className="mt-5 space-y-3">
              {items.map((x) => (
                <div key={x.id} className="border rounded-xl p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold">
                        {x.type === "shop" ? "Shop enquiry" : "Service request"}
                      </p>
                      <p className="text-xs text-gray-500">{new Date(x.createdAt).toLocaleString()}</p>
                    </div>

                    <span className="text-xs px-3 py-1 rounded-full bg-gray-100 border">
                      {x.type.toUpperCase()}
                    </span>
                  </div>

                  <pre className="mt-3 text-xs bg-gray-50 border rounded-xl p-3 overflow-auto whitespace-pre-wrap">
{x.message}
                  </pre>
                </div>
              ))}
            </div>
          )}

          <p className="text-xs text-gray-500 mt-6">
            Phase 3: this becomes real database + staff view.
          </p>
        </div>
      </div>
    </div>
  );
}
