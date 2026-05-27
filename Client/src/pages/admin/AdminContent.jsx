import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, FileText, Film, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { getNotes, deleteNote } from "../../api/notes.js";
import Loader from "../../components/Loader.jsx";

export default function AdminContent() {
  const [tab, setTab] = useState("all");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const d = await getNotes(1, 200);
      setItems(d.notes || []);
    } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const onDelete = async (id) => {
    if (!confirm("Delete this resource permanently?")) return;
    try {
      await deleteNote(id);
      toast.success("Deleted");
      setItems((s) => s.filter((n) => n._id !== id));
    } catch (e) {
      toast.error(e?.response?.data?.message || "Delete failed");
    }
  };

  const filtered = items.filter((n) =>
    tab === "all" ? true : tab === "notes" ? n.pdfUrl : n.videoUrl
  );

  return (
    <section className="container-page py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold">Manage Content</h1>
          <p className="text-slate-600 mt-1">Edit or remove notes and video lectures.</p>
        </div>
        <Link to="/admin/upload" className="btn-primary"><Plus className="w-4 h-4" /> Upload new</Link>
      </div>

      <div className="mt-6 inline-flex bg-slate-100 rounded-lg p-1 gap-1">
        {[
          { k: "all", label: "All" },
          { k: "notes", label: "Notes (PDF)" },
          { k: "videos", label: "Videos" },
        ].map((t) => (
          <button
            key={t.k} onClick={() => setTab(t.k)}
            className={`px-4 py-1.5 text-sm rounded-md font-medium transition ${
              tab === t.k ? "bg-white shadow text-ink-900" : "text-slate-600"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? <Loader /> : (
        <div className="mt-6 card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="text-left px-4 py-3">Subject</th>
                  <th className="text-left px-4 py-3">Faculty</th>
                  <th className="text-left px-4 py-3">Semester</th>
                  <th className="text-left px-4 py-3">Type</th>
                  <th className="text-right px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((n) => (
                  <tr key={n._id} className="border-t hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium">{n.subject}</td>
                    <td className="px-4 py-3">{n.faculty || "—"}</td>
                    <td className="px-4 py-3">{n.semester || "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 text-xs">
                        {n.pdfUrl && <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded inline-flex items-center gap-1"><FileText className="w-3 h-3" />PDF</span>}
                        {n.videoUrl && <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded inline-flex items-center gap-1"><Film className="w-3 h-3" />Video</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link to={`/admin/upload/${n._id}`} className="inline-flex items-center gap-1 text-brand-700 hover:underline mr-3">
                        <Edit className="w-4 h-4" /> Edit
                      </Link>
                      <button onClick={() => onDelete(n._id)} className="inline-flex items-center gap-1 text-red-600 hover:underline">
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-10 text-center text-slate-500">No resources yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
