import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function VideoCard({ note }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="card overflow-hidden">
      <Link to={`/videos/${note._id}`} className="block">
        <div className="aspect-video bg-ink-900 relative overflow-hidden">
          {note.thumbnail ? (
            <img src={note.thumbnail} alt={note.subject} className="w-full h-full object-cover opacity-80" />
          ) : null}
          <div className="absolute inset-0 grid place-items-center">
            <div className="w-14 h-14 rounded-full bg-white/90 grid place-items-center shadow-glow">
              <Play className="w-6 h-6 text-brand-600 ml-0.5" fill="currentColor" />
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            {note.faculty && <span className="px-2 py-0.5 bg-slate-100 rounded">{note.faculty}</span>}
            {note.semester && <span className="px-2 py-0.5 bg-slate-100 rounded">Sem {note.semester}</span>}
          </div>
          <h3 className="font-semibold line-clamp-1">{note.subject}</h3>
          <p className="text-sm text-slate-600 mt-1 line-clamp-2">{note.description}</p>
        </div>
      </Link>
    </motion.div>
  );
}
