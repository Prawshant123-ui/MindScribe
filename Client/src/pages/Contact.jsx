import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      return toast.error("Please fill in all fields");
    }
    toast.success("Thanks! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="container-page py-20">
      <h1 className="font-display text-4xl md:text-5xl font-semibold">Get in touch</h1>
      <p className="mt-3 text-slate-600 max-w-2xl">
        Have a question, suggestion, or partnership idea? We'd love to hear from you.
      </p>

      <div className="mt-12 grid lg:grid-cols-2 gap-10">
        <div className="space-y-5">
          {[
            { icon: Mail, label: "Email", value: "support@mindscribe.io" },
            { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
            { icon: MapPin, label: "Address", value: "MindScribe HQ, Online" },
          ].map((c) => (
            <div key={c.label} className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 grid place-items-center">
                <c.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">{c.label}</p>
                <p className="font-medium">{c.value}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className="card p-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input className="input mt-1" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input type="email" className="input mt-1" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea rows={5} className="input mt-1" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </div>
          <button className="btn-primary w-full"><Send className="w-4 h-4" /> Send message</button>
        </form>
      </div>
    </section>
  );
}
