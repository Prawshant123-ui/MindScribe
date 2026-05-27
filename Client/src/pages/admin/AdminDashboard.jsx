import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend, Filler,
} from "chart.js";
import { Upload, FolderCog, BookOpen, PlayCircle } from "lucide-react";
import { getNotes } from "../../api/notes.js";
import Loader from "../../components/Loader.jsx";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotes(1, 200).then(setData).catch(() => setData({ notes: [], total: 0 })).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const notes = data?.notes || [];
  const pdfs = notes.filter((n) => n.pdfUrl).length;
  const videos = notes.filter((n) => n.videoUrl).length;

  // group uploads by month (last 6)
  const buckets = {};
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const k = d.toLocaleString("default", { month: "short" });
    buckets[k] = 0;
  }
  notes.forEach((n) => {
    const d = new Date(n.createdAt);
    const k = d.toLocaleString("default", { month: "short" });
    if (k in buckets) buckets[k] += 1;
  });

  const chart = {
    labels: Object.keys(buckets),
    datasets: [{
      label: "Uploads",
      data: Object.values(buckets),
      borderColor: "#3a62ff",
      backgroundColor: "rgba(58,98,255,0.15)",
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "#3a62ff",
    }],
  };

  return (
    <section className="container-page py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold">Admin Overview</h1>
          <p className="text-slate-600 mt-1">Manage notes and video lectures.</p>
        </div>
        <Link to="/admin/upload" className="btn-primary"><Upload className="w-4 h-4" /> Upload new</Link>
      </div>

      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        {[
          { label: "Total resources", value: data?.total ?? notes.length },
          { label: "PDF notes", value: pdfs },
          { label: "Video lectures", value: videos },
        ].map((s) => (
          <div key={s.label} className="card p-5">
            <p className="text-sm text-slate-500">{s.label}</p>
            <p className="font-display text-3xl font-semibold mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 card p-6">
        <h3 className="font-semibold mb-4">Uploads — last 6 months</h3>
        <Line data={chart} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </div>

      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        <Link to="/admin/content" className="card p-6 flex items-center gap-4 hover:border-brand-300">
          <div className="w-12 h-12 rounded-xl bg-brand-50 grid place-items-center text-brand-600"><FolderCog /></div>
          <div className="flex-1">
            <p className="font-semibold">Manage Content</p>
            <p className="text-sm text-slate-600">Edit, delete and review notes & videos.</p>
          </div>
        </Link>
        <Link to="/admin/upload" className="card p-6 flex items-center gap-4 hover:border-brand-300">
          <div className="w-12 h-12 rounded-xl bg-brand-50 grid place-items-center text-brand-600"><Upload /></div>
          <div className="flex-1">
            <p className="font-semibold">Upload New</p>
            <p className="text-sm text-slate-600">Add notes (PDF) and video lectures.</p>
          </div>
        </Link>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-3"><BookOpen className="w-5 h-5 text-brand-600" /><h3 className="font-semibold">Latest notes</h3></div>
          <ul className="divide-y">
            {notes.filter((n) => n.pdfUrl).slice(0, 5).map((n) => (
              <li key={n._id} className="py-2 text-sm flex justify-between gap-2">
                <span className="truncate">{n.subject}</span>
                <span className="text-slate-500">{n.faculty}</span>
              </li>
            )) || <li className="text-sm text-slate-500">None yet.</li>}
          </ul>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-3"><PlayCircle className="w-5 h-5 text-brand-600" /><h3 className="font-semibold">Latest videos</h3></div>
          <ul className="divide-y">
            {notes.filter((n) => n.videoUrl).slice(0, 5).map((n) => (
              <li key={n._id} className="py-2 text-sm flex justify-between gap-2">
                <span className="truncate">{n.subject}</span>
                <span className="text-slate-500">{n.faculty}</span>
              </li>
            )) || <li className="text-sm text-slate-500">None yet.</li>}
          </ul>
        </div>
      </div>
    </section>
  );
}
