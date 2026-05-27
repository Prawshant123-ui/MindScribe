import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { getNotes, searchNotes } from "../api/notes.js";
import VideoCard from "../components/VideoCard.jsx";
import Loader from "../components/Loader.jsx";

export default function Videos() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const d = await getNotes(1, 100);
      setItems((d.notes || []).filter((n) => n.videoUrl));
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const onSearch = async (e) => {
    e.preventDefault();
    if (!q.trim()) return load();
    setLoading(true);
    try {
      const list = await searchNotes(q.trim());
      setItems(list.filter((n) => n.videoUrl));
    } finally { setLoading(false); }
  };

  return (
    <section className="container-page py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold">Video Lectures</h1>
          <p className="text-slate-600 mt-1">Stream lectures from your faculty on demand.</p>
        </div>
        <form onSubmit={onSearch} className="flex gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className="input pl-9 w-72" placeholder="Search lectures..." value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <button className="btn-primary">Search</button>
        </form>
      </div>

      {loading ? <Loader /> : items.length === 0 ? (
        <div className="card p-10 mt-8 text-center text-slate-500">No video lectures available yet.</div>
      ) : (
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((n) => <VideoCard key={n._id} note={n} />)}
        </div>
      )}
    </section>
  );
}
