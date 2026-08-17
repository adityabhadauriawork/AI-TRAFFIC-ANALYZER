import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#050816]">
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-10">

        <div className="flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">

          {/* Brand */}
          <div className="max-w-sm">
            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.07]">
                <span className="text-sm font-bold text-cyan-400">
                  V
                </span>
              </div>

              <div className="leading-none">
                <p className="text-[15px] font-semibold text-white">
                  VisionFlow
                </p>

                <p className="mt-1 text-[8px] uppercase tracking-[0.22em] text-slate-600">
                  AI Traffic Intelligence
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-6 text-slate-500">
              Turning traffic footage into intelligent, actionable
              insights with computer vision.
            </p>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-8 sm:grid-cols-3">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                Product
              </p>

              <div className="mt-4 flex flex-col gap-3">
                <a
                  href="#features"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Features
                </a>

                <a
                  href="#workflow"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  How it works
                </a>

                <a
                  href="#demo"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Analyze video
                </a>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                Technology
              </p>

              <div className="mt-4 flex flex-col gap-3">
                <span className="text-sm text-slate-400">
                  YOLOv8
                </span>

                <span className="text-sm text-slate-400">
                  ByteTrack
                </span>

                <span className="text-sm text-slate-400">
                  OpenCV
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                Connect
              </p>

              <div className="mt-4 flex flex-col gap-3">

                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                >
                  GitHub
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href="#demo"
                  className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                >
                  Get started
                  <ArrowUpRight size={14} />
                </a>

              </div>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-white/[0.06] py-6 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © 2026 VisionFlow AI. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <span>
              Built with React + Flask
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-slate-700 sm:block" />

            <span>
              Computer Vision
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}