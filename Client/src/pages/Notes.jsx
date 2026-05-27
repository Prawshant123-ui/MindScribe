import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { getNotes, searchNotes } from "../api/notes.js";
import NoteCard from "../components/NoteCard.jsx";
import Loader from "../components/Loader.jsx";

export default function Notes() {
  const [data, setData] = useState({ notes: [], total: 0, totalPages: 1, currentPage: 1 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");

  const load = async (p = 1) => {
    setLoading(true);
    try {
      const d = await getNotes(p, 12);
      setData(d);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(page); }, [page]);

  const onSearch = async (e) => {
    e.preventDefault();
    if (!q.trim()) return load(1);
    setLoading(true);
    try {
      const list = await searchNotes(q.trim());
      setData({ notes: list, total: list.length, totalPages: 1, currentPage: 1 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container-page py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold">Notes</h1>
          <p className="text-slate-600 mt-1">Browse, read descriptions, and download PDFs.</p>
        </div>
        <form onSubmit={onSearch} className="flex gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className="input pl-9 w-72"
              placeholder="Search by subject..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <button className="btn-primary">Search</button>
        </form>
      </div>

      {loading ? (
        <Loader />
      ) : data.notes.length === 0 ? (
        <div className="card p-10 mt-8 text-center text-slate-500">No notes found.</div>
      ) : (
        <>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {data.notes.map((n) => <NoteCard key={n._id} note={n} />)}
          </div>

          {data.totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="btn-outline"
              >Prev</button>
              <span className="px-4 py-2 text-sm text-slate-600">
                Page {data.currentPage} of {data.totalPages}
              </span>
              <button
                disabled={page >= data.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="btn-outline"
              >Next</button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
