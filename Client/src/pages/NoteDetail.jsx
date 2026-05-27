import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Download, ArrowLeft, PlayCircle } from "lucide-react";
import { getNoteById } from "../api/notes.js";
import Loader from "../components/Loader.jsx";

export default function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNoteById(id).then(setNote).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!note) return <div className="container-page py-20 text-center text-slate-500">Note not found.</div>;

  return (
    <section className="container-page py-10">
      <Link to="/notes" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-ink-900">
        <ArrowLeft className="w-4 h-4" /> Back to notes
      </Link>

      <div className="mt-6 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card overflow-hidden">
          {note.thumbnail && (
            <img src={note.thumbnail} alt={note.subject} className="w-full aspect-video object-cover" />
          )}
          <div className="p-6">
            <div className="flex flex-wrap gap-2 text-xs text-slate-600">
              {note.faculty && <span className="px-2 py-1 bg-slate-100 rounded">{note.faculty}</span>}
              {note.semester && <span className="px-2 py-1 bg-slate-100 rounded">Semester {note.semester}</span>}
            </div>
            <h1 className="mt-3 font-display text-3xl font-semibold">{note.subject}</h1>
            {note.description && <p className="mt-3 text-slate-600">{note.description}</p>}
            {note.content && (
              <div className="mt-6 prose max-w-none text-slate-800 whitespace-pre-wrap">{note.content}</div>
            )}
          </div>
        </div>

        <aside className="space-y-4">
          {note.pdfUrl && (
            <a href={note.pdfUrl} target="_blank" rel="noreferrer" className="btn-primary w-full">
              <Download className="w-4 h-4" /> Download PDF
            </a>
          )}
          {note.videoUrl && (
            <Link to={`/videos/${note._id}`} className="btn-outline w-full">
              <PlayCircle className="w-4 h-4" /> Watch lecture
            </Link>
          )}
          <div className="card p-5 text-sm text-slate-600">
            <p className="font-semibold text-ink-900 mb-2">About this resource</p>
            <p>Created on {new Date(note.createdAt).toLocaleDateString()}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
