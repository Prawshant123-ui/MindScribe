import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";

export default function NoteCard({ note }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="card overflow-hidden flex flex-col"
    >
      <div className="aspect-video bg-gradient-to-br from-brand-100 to-brand-200 relative overflow-hidden">
        {note.thumbnail ? (
          <img src={note.thumbnail} alt={note.subject} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-brand-700">
            <FileText className="w-10 h-10" />
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          {note.faculty && <span className="px-2 py-0.5 bg-slate-100 rounded">{note.faculty}</span>}
          {note.semester && <span className="px-2 py-0.5 bg-slate-100 rounded">Sem {note.semester}</span>}
        </div>
        <h3 className="font-semibold text-lg line-clamp-1">{note.subject}</h3>
        <p className="text-sm text-slate-600 mt-1 line-clamp-2 flex-1">{note.description}</p>
        <div className="mt-3 flex items-center gap-2">
          <Link to={`/notes/${note._id}`} className="btn-outline flex-1 text-sm">View</Link>
          {note.pdfUrl && (
            <a href={note.pdfUrl} target="_blank" rel="noreferrer" className="btn-primary text-sm">
              <Download className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
