import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, PlayCircle, GraduationCap, Sparkles, ArrowRight, Users, Layers, ShieldCheck } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

export default function Landing() {
  return (
    <>
      {/* Hero */}
      <section className="hero-bg text-white">
        <div className="container-page py-24 md:py-32 grid lg:grid-cols-2 gap-12 items-center">
          <div>
          
            <motion.h1
              initial="hidden" animate="show" custom={1} variants={fadeUp}
              className="mt-5 font-display text-4xl md:text-6xl font-semibold leading-tight"
            >
              Learn smarter with <span className="text-brand-300">notes</span> &{" "}
              <span className="text-brand-300">video lectures</span>.
            </motion.h1>
            <motion.p
              initial="hidden" animate="show" custom={2} variants={fadeUp}
              className="mt-5 text-lg text-slate-200/90 max-w-xl"
            >
              MindScribe brings together curated study notes, video lessons, and faculty-organized
              content — all in one beautifully simple platform.
            </motion.p>
            <motion.div
              initial="hidden" animate="show" custom={3} variants={fadeUp}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link to="/register" className="btn-primary">
                Start learning <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/about" className="btn bg-white/10 text-white hover:bg-white/20 border border-white/20">
                Learn more
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-brand-500/20 blur-3xl rounded-full" />
            <div className="relative grid grid-cols-2 gap-4">
              {[
                { icon: BookOpen, title: "Notes", subtitle: "Downloadable PDFs" },
                { icon: PlayCircle, title: "Video Lectures", subtitle: "Stream on demand" },
                { icon: GraduationCap, title: "By Faculty", subtitle: "Organized neatly" },
                { icon: Layers, title: "By Semester", subtitle: "Find fast" },
              ].map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur"
                >
                  <c.icon className="w-7 h-7 text-brand-200" />
                  <p className="mt-3 font-semibold">{c.title}</p>
                  <p className="text-sm text-slate-200/80">{c.subtitle}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-semibold">Everything you need to learn</h2>
            <p className="mt-3 text-slate-600">A focused, distraction-free workspace built around how you actually study.</p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: "Curated Notes", text: "Concise, exam-ready notes organized by subject, faculty and semester." },
              { icon: PlayCircle, title: "HD Video Lectures", text: "Watch high-quality lectures from experienced faculty, anywhere." },
              { icon: ShieldCheck, title: "Secure & Private", text: "Your account and progress are protected with industry-standard auth." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-50 grid place-items-center text-brand-600">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="mt-4 font-semibold text-lg">{f.title}</h3>
                <p className="mt-1 text-slate-600 text-sm">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-brand-600 to-brand-800 text-white">
        <div className="container-page flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-3xl font-semibold">Ready to get started?</h3>
            <p className="mt-2 text-brand-100">Create your free account and unlock notes + video lectures.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/register" className="btn bg-white text-brand-700 hover:bg-brand-50">Create account</Link>
            <Link to="/login" className="btn border border-white/40 text-white hover:bg-white/10">Log in</Link>
          </div>
        </div>
      </section>
    </>
  );
}
