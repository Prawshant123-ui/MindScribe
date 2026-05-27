import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";

export default function About() {
  return (
    <section className="container-page py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-4xl md:text-5xl font-semibold">About MindScribe</h1>
        <p className="mt-4 text-lg text-slate-600 max-w-3xl">
          MindScribe is built for students who want quality study material and lectures
          without the noise. We focus on what helps you learn — clean notes, clear videos,
          and a structure organized the way real curriculums work.
        </p>
      </motion.div>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {[
          { icon: Target, title: "Our Mission", text: "Make high-quality study material accessible to every learner, regardless of background." },
          { icon: Eye, title: "Our Vision", text: "Become the most trusted academic companion across faculties and semesters." },
          { icon: Heart, title: "Our Values", text: "Clarity, quality, and respect for the student's time." },
        ].map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card p-6"
          >
            <div className="w-11 h-11 rounded-xl bg-brand-50 grid place-items-center text-brand-600">
              <b.icon className="w-6 h-6" />
            </div>
            <h3 className="mt-4 font-semibold text-lg">{b.title}</h3>
            <p className="mt-1 text-slate-600 text-sm">{b.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
