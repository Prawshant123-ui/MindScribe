import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const items = [
  { name: "Joshan P.", role: "BCA Student", text: "The notes are crisp and exam-ready. I cut my revision time in half." },
  { name: "Sushant S..", role: "Bsc CSIT Student", text: "Videos are clean and well-paced — feels like a real classroom." },
  { name: "Gaurav S..", role: "Engineering Student", text: "Finally a platform that actually organizes content by semester." },
  { name: "Maya T.", role: "Arts Student", text: "Beautiful interface and quick downloads. Highly recommend." },
];

export default function Testimonials() {
  return (
    <section className="container-page py-20">
      <h1 className="font-display text-4xl md:text-5xl font-semibold">What learners say</h1>
      <p className="mt-3 text-slate-600">Real feedback from students using MindScribe every day.</p>

      <div className="mt-12 grid md:grid-cols-2 gap-6">
        {items.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="card p-6 relative"
          >
            <Quote className="w-8 h-8 text-brand-200 absolute top-4 right-4" />
            <div className="flex gap-1 text-amber-400">
              {[...Array(5)].map((_, k) => <Star key={k} className="w-4 h-4" fill="currentColor" />)}
            </div>
            <p className="mt-3 text-slate-700">{t.text}</p>
            <div className="mt-4">
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-slate-500">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
