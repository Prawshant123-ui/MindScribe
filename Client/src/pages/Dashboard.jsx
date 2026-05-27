import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  Title, Tooltip, Legend, ArcElement,
} from "chart.js";
import { BookOpen, PlayCircle, ArrowRight } from "lucide-react";
import { getNotes } from "../api/notes.js";
import { useAuth } from "../context/AuthContext.jsx";
import Loader from "../components/Loader.jsx";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotes(1, 100).then((d) => setData(d)).catch(() => setData({ notes: [], total: 0 })).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const notes = data?.notes || [];
  const withPdf = notes.filter((n) => n.pdfUrl).length;
  const withVideo = notes.filter((n) => n.videoUrl).length;

  // Group by faculty
  const facultyCount = notes.reduce((acc, n) => {
    const k = n.faculty || "Other";
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});
  // Group by semester
  const semesterCount = notes.reduce((acc, n) => {
    const k = n.semester ? `Sem ${n.semester}` : "Other";
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(semesterCount),
    datasets: [{
      label: "Notes per semester",
      data: Object.values(semesterCount),
      backgroundColor: "#3a62ff",
      borderRadius: 8,
    }],
  };
  const doughnut = {
    labels: Object.keys(facultyCount),
    datasets: [{
      data: Object.values(facultyCount),
      backgroundColor: ["#3a62ff", "#5e87ff", "#90b1ff", "#1f31d8", "#1d2a8a", "#bdd1ff"],
      borderWidth: 0,
    }],
  };

  return (
    <section className="container-page py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl md:text-4xl font-semibold">
          Welcome{user?.name ? `, ${user.name}` : ""} 👋
        </h1>
        <p className="text-slate-600 mt-1">Your learning at a glance.</p>
      </motion.div>

      {/* Stats */}
      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        {[
          { label: "Total resources", value: data?.total ?? notes.length, color: "from-brand-500 to-brand-700" },
          { label: "PDF notes", value: withPdf, color: "from-emerald-500 to-emerald-700" },
          { label: "Video lectures", value: withVideo, color: "from-amber-500 to-amber-700" },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl p-5 text-white bg-gradient-to-br ${s.color} shadow-glow`}>
            <p className="text-sm opacity-90">{s.label}</p>
            <p className="font-display text-4xl font-semibold mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        <div className="card p-6 lg:col-span-2">
          <h3 className="font-semibold mb-4">Notes by semester</h3>
          {Object.keys(semesterCount).length ? (
            <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          ) : (
            <p className="text-sm text-slate-500">No data yet.</p>
          )}
        </div>
        <div className="card p-6">
          <h3 className="font-semibold mb-4">By faculty</h3>
          {Object.keys(facultyCount).length ? (
            <Doughnut data={doughnut} options={{ plugins: { legend: { position: "bottom" } } }} />
          ) : (
            <p className="text-sm text-slate-500">No data yet.</p>
          )}
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        <Link to="/notes" className="card p-6 flex items-center gap-4 hover:border-brand-300">
          <div className="w-12 h-12 rounded-xl bg-brand-50 grid place-items-center text-brand-600">
            <BookOpen />
          </div>
          <div className="flex-1">
            <p className="font-semibold">Browse Notes</p>
            <p className="text-sm text-slate-600">View descriptions and download PDFs.</p>
          </div>
          <ArrowRight className="text-slate-400" />
        </Link>
        <Link to="/videos" className="card p-6 flex items-center gap-4 hover:border-brand-300">
          <div className="w-12 h-12 rounded-xl bg-brand-50 grid place-items-center text-brand-600">
            <PlayCircle />
          </div>
          <div className="flex-1">
            <p className="font-semibold">Watch Video Lectures</p>
            <p className="text-sm text-slate-600">Stream lectures on demand.</p>
          </div>
          <ArrowRight className="text-slate-400" />
        </Link>
      </div>
    </section>
  );
}
