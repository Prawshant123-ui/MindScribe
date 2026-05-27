import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import toast from "react-hot-toast";
import { login } from "../api/auth.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { loginWithToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(form);
      const user = loginWithToken(data.token, { email: form.email });
      toast.success("Welcome back!");
      const from = location.state?.from?.pathname;
      navigate(from || (user.role === "admin" ? "/admin" : "/dashboard"), { replace: true });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
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
          Welcome back to <span className="text-brand-600">MindScribe</span>.
        </motion.h1>
        <p className="mt-4 text-slate-600 text-lg max-w-md">
          Pick up right where you left off — your notes and lectures are waiting.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="card p-8 max-w-md w-full mx-auto"
      >
        <h2 className="font-display text-2xl font-semibold">Log in</h2>
        <p className="text-sm text-slate-500 mt-1">Enter your credentials to continue.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input type="email" required className="input mt-1"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input type="password" required className="input mt-1"
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <button disabled={loading} className="btn-primary w-full">
            <LogIn className="w-4 h-4" /> {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-sm text-slate-600 mt-5 text-center">
          New here? <Link to="/register" className="text-brand-700 font-medium">Create an account</Link>
        </p>
      </motion.div>
    </section>
  );
}
