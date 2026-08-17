import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#workflow" },
  { label: "Demo", href: "#demo" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNavClick() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#050816]/80 backdrop-blur-xl">

      <nav className="mx-auto flex h-[68px] w-full max-w-[1280px] items-center justify-between px-6 lg:px-10">

        {/* Logo */}

        <Link
          to="/"
          onClick={handleNavClick}
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.07]">
            <span className="text-sm font-bold text-cyan-400">
              V
            </span>
          </div>

          <div className="leading-none">
            <p className="text-[15px] font-semibold tracking-tight text-white">
              VisionFlow
            </p>

            <p className="mt-1 text-[8px] font-medium uppercase tracking-[0.22em] text-slate-600">
              AI Traffic Intelligence
            </p>
          </div>
        </Link>

        {/* Desktop navigation */}

        <div className="hidden items-center gap-8 md:flex">

          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-slate-400 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}

        </div>

        {/* Desktop actions */}

        <div className="hidden items-center gap-3 md:flex">

          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 text-sm text-slate-400 transition hover:text-white"
          >
            GitHub
          </a>

          {/* THIS NOW OPENS DASHBOARD */}

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.2)]"
          >
            Analyze video
            <ArrowRight size={15} />
          </Link>

        </div>

        {/* Mobile menu button */}

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-300 md:hidden"
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

      </nav>

      {/* Mobile navigation */}

      {menuOpen && (
        <div className="border-t border-white/[0.06] bg-[#050816]/95 px-6 py-5 backdrop-blur-xl md:hidden">

          <div className="mx-auto flex max-w-[1280px] flex-col gap-2">

            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={handleNavClick}
                className="rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/[0.04] hover:text-white"
              >
                {item.label}
              </a>
            ))}

            <Link
              to="/dashboard"
              onClick={handleNavClick}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950"
            >
              Analyze video
              <ArrowRight size={16} />
            </Link>

          </div>

        </div>
      )}

    </header>
  );
}