import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, LogOut, LayoutDashboard, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/testimonials", label: "Testimonials" },
    { to: "/contact", label: "Contact" },
  ];
  const userLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/notes", label: "Notes" },
    { to: "/videos", label: "Videos" },
  ];
  const adminLinks = [
    { to: "/admin", label: "Overview" },
    { to: "/admin/content", label: "Manage Content" },
    { to: "/admin/upload", label: "Upload" },
  ];

  const links = !user ? publicLinks : user.role === "admin" ? adminLinks : userLinks;

  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-slate-200/70">
      <div className="container-page flex items-center justify-between h-16">
        <Link to={user ? (user.role === "admin" ? "/admin" : "/dashboard") : "/"} className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 grid place-items-center shadow-glow"
          >
            <BookOpen className="w-5 h-5 text-white" />
          </motion.div>
          <span className="font-display text-xl font-semibold tracking-tight">MindScribe</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive ? "text-brand-700 bg-brand-50" : "text-slate-600 hover:text-ink-900 hover:bg-slate-100"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {!user ? (
            <>
              <Link to="/login" className="btn-ghost">Log in</Link>
              <Link to="/register" className="btn-primary">Get started</Link>
            </>
          ) : (
            <>
              {user.role === "admin" && (
                <span className="px-2 py-1 text-xs rounded-md bg-brand-100 text-brand-700 font-semibold">
                  ADMIN
                </span>
              )}
              <Link
                to={user.role === "admin" ? "/admin" : "/dashboard"}
                className="btn-ghost"
                title="Dashboard"
              >
                <LayoutDashboard className="w-4 h-4" />
              </Link>
              <button onClick={onLogout} className="btn-outline">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          )}
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen((s) => !s)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="container-page py-3 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm ${isActive ? "bg-brand-50 text-brand-700" : "text-slate-700"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="pt-2 flex gap-2">
              {!user ? (
                <>
                  <Link to="/login" className="btn-ghost flex-1" onClick={() => setOpen(false)}>Log in</Link>
                  <Link to="/register" className="btn-primary flex-1" onClick={() => setOpen(false)}>Get started</Link>
                </>
              ) : (
                <button onClick={onLogout} className="btn-outline flex-1">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
