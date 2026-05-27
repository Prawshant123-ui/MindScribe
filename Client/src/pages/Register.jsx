import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { register, login } from "../api/auth.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { loginWithToken } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      // auto log them in
      const data = await login({ email: form.email, password: form.password });
      const user = loginWithToken(data.token, { name: form.name, email: form.email });
      toast.success("Account created — welcome!");
      navigate(user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container-page py-16 grid lg:grid-cols-2 gap-12 items-center">
      <div className="hidden lg:block">
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl font-semibold leading-tight"
        >
          Join <span className="text-brand-600">MindScribe</span> today.
        </motion.h1>
        <p className="mt-4 text-slate-600 text-lg max-w-md">
          Free to start. Access curated notes and video lectures in seconds.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="card p-8 max-w-md w-full mx-auto"
      >
        <h2 className="font-display text-2xl font-semibold">Create your account</h2>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input required minLength={3} className="input mt-1"
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input required type="email" className="input mt-1"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input required type="password" minLength={6} className="input mt-1"
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <p className="text-xs text-slate-500 mt-1">At least 6 characters.</p>
          </div>
          <button disabled={loading} className="btn-primary w-full">
            <UserPlus className="w-4 h-4" /> {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="text-sm text-slate-600 mt-5 text-center">
          Already have an account? <Link to="/login" className="text-brand-700 font-medium">Log in</Link>
        </p>
      </motion.div>
    </section>
  );
}
