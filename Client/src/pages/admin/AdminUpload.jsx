import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Upload, FileText, Film, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import { createNote, updateNote, getNoteById } from "../../api/notes.js";

const initial = {
  subject: "", faculty: "", semester: "", description: "", content: "",
};

export default function AdminUpload() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);

  const [form, setForm] = useState(initial);
  const [thumbnail, setThumbnail] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [existing, setExisting] = useState(null);

  useEffect(() => {
    if (!editing) return;
    getNoteById(id).then((n) => {
      setExisting(n);
      setForm({
        subject: n.subject || "",
        faculty: n.faculty || "",
        semester: n.semester || "",
        description: n.description || "",
        content: n.content || "",
      });
    });
  }, [id, editing]);

  const onChange = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.subject || !form.faculty || !form.semester) {
      return toast.error("Subject, faculty and semester are required");
    }
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (thumbnail) fd.append("thumbnail", thumbnail);
      if (pdfFile) fd.append("pdfUrl", pdfFile);
      if (videoFile) fd.append("videoUrl", videoFile);

      if (editing) {
        await updateNote(id, fd);
        toast.success("Updated");
      } else {
        await createNote(fd);
        toast.success("Uploaded");
      }
      navigate("/admin/content");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Upload failed");
    } finally { setLoading(false); }
  };

  return (
    <section className="container-page py-10">
      <h1 className="font-display text-3xl md:text-4xl font-semibold">
        {editing ? "Edit Resource" : "Upload Resource"}
      </h1>
      <p className="text-slate-600 mt-1">
        Add or update a subject with notes (PDF), a video lecture, and a thumbnail image.
      </p>

      <form onSubmit={onSubmit} className="mt-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Subject *"><input required className="input" value={form.subject} onChange={onChange("subject")} /></Field>
            <Field label="Faculty *">
              <input required list="faculty-list" className="input" value={form.faculty} onChange={onChange("faculty")} />
              <datalist id="faculty-list">
                <option value="Engineering" /><option value="Science" /><option value="Business" />
                <option value="Arts" /><option value="Medicine" /><option value="Law" />
              </datalist>
            </Field>
            <Field label="Semester *">
              <select required className="input" value={form.semester} onChange={onChange("semester")}>
                <option value="">Select semester</option>
                {[1,2,3,4,5,6,7,8].map((s) => <option key={s} value={s}>Semester {s}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Short description">
            <textarea rows={3} className="input" value={form.description} onChange={onChange("description")} />
          </Field>

          <Field label="Detailed content (optional)">
            <textarea rows={6} className="input" value={form.content} onChange={onChange("content")} />
          </Field>
        </div>

        <div className="space-y-4">
          <FilePicker
            label="Thumbnail image"
            icon={ImageIcon}
            accept="image/png,image/jpeg,image/jpg"
            file={thumbnail}
            onFile={setThumbnail}
            existingUrl={existing?.thumbnail}
          />
          <FilePicker
            label="PDF notes"
            icon={FileText}
            accept="application/pdf"
            file={pdfFile}
            onFile={setPdfFile}
            existingUrl={existing?.pdfUrl}
          />
          <FilePicker
            label="Video lecture (mp4)"
            icon={Film}
            accept="video/mp4"
            file={videoFile}
            onFile={setVideoFile}
            existingUrl={existing?.videoUrl}
          />

          <button disabled={loading} className="btn-primary w-full">
            <Upload className="w-4 h-4" /> {loading ? "Uploading..." : (editing ? "Save changes" : "Upload")}
          </button>
        </div>
      </form>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function FilePicker({ label, icon: Icon, accept, file, onFile, existingUrl }) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-5 h-5 text-brand-600" />
        <p className="font-medium">{label}</p>
      </div>
      <label className="block border-2 border-dashed border-slate-200 rounded-lg p-4 text-center text-sm text-slate-500 cursor-pointer hover:bg-slate-50">
        <input type="file" accept={accept} className="hidden" onChange={(e) => onFile(e.target.files?.[0] || null)} />
        {file ? <span className="text-ink-900 font-medium">{file.name}</span> : "Click to choose a file"}
      </label>
      {existingUrl && !file && (
        <p className="mt-2 text-xs text-slate-500 truncate">
          Current: <a href={existingUrl} target="_blank" rel="noreferrer" className="text-brand-700 underline">{existingUrl}</a>
        </p>
      )}
    </div>
  );
}
