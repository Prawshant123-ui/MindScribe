import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { getNoteById } from "../api/notes.js";
import Loader from "../components/Loader.jsx";

export default function VideoDetail() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNoteById(id).then(setNote).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!note) return <div className="container-page py-20 text-center text-slate-500">Lecture not found.</div>;

  return (
    <section className="container-page py-10">
      <Link to="/videos" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-ink-900">
        <ArrowLeft className="w-4 h-4" /> Back to lectures
      </Link>

      <div className="mt-6 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-2xl overflow-hidden bg-black aspect-video shadow-glow">
            {note.videoUrl ? (
              <video src={note.videoUrl} controls poster={note.thumbnail} className="w-full h-full" />
            ) : (
              <div className="w-full h-full grid place-items-center text-white">No video available</div>
            )}
          </div>
          <div className="mt-5">
            <div className="flex flex-wrap gap-2 text-xs text-slate-600">
              {note.faculty && <span className="px-2 py-1 bg-slate-100 rounded">{note.faculty}</span>}
              {note.semester && <span className="px-2 py-1 bg-slate-100 rounded">Semester {note.semester}</span>}
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-semibold mt-2">{note.subject}</h1>
            {note.description && <p className="mt-3 text-slate-600">{note.description}</p>}
          </div>
        </div>

        <aside className="space-y-4">
          {note.pdfUrl && (
            <a href={note.pdfUrl} target="_blank" rel="noreferrer" className="btn-primary w-full">
              <Download className="w-4 h-4" /> Download accompanying PDF
            </a>
          )}
          <div className="card p-5 text-sm text-slate-600">
            <p className="font-semibold text-ink-900 mb-2">Lecture info</p>
            <p>Uploaded {new Date(note.createdAt).toLocaleDateString()}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
