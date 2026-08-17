import { ArrowRight, Play, Activity, Car, Bike, Bus, Truck } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-[#050816]"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-[-180px] top-[120px] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="pointer-events-none absolute right-[-160px] top-[80px] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]" />

      {/* Main content */}
      <div className="relative mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-[1280px] items-center px-6 py-20 lg:px-10">
        
        <div className="grid w-full items-center gap-16 lg:grid-cols-[0.95fr_1.05fr]">

          {/* LEFT */}
          <div className="max-w-[600px]">

            {/* Eyebrow */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />

              <span className="text-sm font-medium tracking-wide text-cyan-300">
                AI-Powered Traffic Intelligence
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-6xl lg:text-[4.25rem]">
              Turn traffic data
              <br />
              into{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                smarter decisions.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-[560px] text-lg leading-8 text-slate-400">
              Analyze traffic footage with computer vision, detect vehicles
              automatically, measure congestion and generate actionable
              insights for smarter cities.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">

              <a
                href="#demo"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-cyan-400 px-6 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-300"
              >
                Start Analysis
                <ArrowRight size={18} />
              </a>

              <a
                href="#workflow"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 font-medium text-white transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06]"
              >
                <Play size={16} />
                See how it works
              </a>

            </div>

            {/* Technology line */}
            <div className="mt-12 border-t border-white/[0.08] pt-6">

              <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-slate-600">
                Built with modern computer vision
              </p>

              <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-slate-500">
                <span>YOLOv8</span>
                <span className="text-slate-700">•</span>
                <span>ByteTrack</span>
                <span className="text-slate-700">•</span>
                <span>OpenCV</span>
                <span className="text-slate-700">•</span>
                <span>React</span>
              </div>

            </div>
          </div>

          {/* RIGHT — PRODUCT PREVIEW */}
          <div className="relative">

            <div className="overflow-hidden rounded-[24px] border border-white/[0.10] bg-[#0b1020]/90 shadow-[0_30px_100px_rgba(0,0,0,0.45)]">

              {/* Window header */}
              <div className="flex h-12 items-center justify-between border-b border-white/[0.08] px-5">

                <div className="flex gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                </div>

                <span className="text-xs text-slate-600">
                  visionflow.ai
                </span>

                <div className="w-12" />
              </div>

              {/* Dashboard */}
              <div className="p-5 sm:p-6">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-400">
                      Live analysis
                    </p>

                    <h2 className="mt-1 text-xl font-semibold text-white">
                      Traffic Overview
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-xs text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Processing
                  </div>

                </div>

                {/* Stats */}
                <div className="mt-5 grid grid-cols-2 gap-3">

                  <StatCard
                    icon={<Car size={17} />}
                    label="Cars"
                    value="26"
                  />

                  <StatCard
                    icon={<Bike size={17} />}
                    label="Bikes"
                    value="18"
                  />

                  <StatCard
                    icon={<Bus size={17} />}
                    label="Buses"
                    value="07"
                  />

                  <StatCard
                    icon={<Truck size={17} />}
                    label="Trucks"
                    value="11"
                  />

                </div>

                {/* Activity */}
                <div className="mt-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-xs text-slate-500">
                        Vehicle activity
                      </p>

                      <p className="mt-1 text-lg font-semibold text-white">
                        62 vehicles
                      </p>
                    </div>

                    <Activity
                      size={22}
                      className="text-cyan-400"
                    />

                  </div>

                  {/* Chart */}
                  <div className="mt-5 flex h-32 items-end gap-2">

                    {[35, 48, 40, 62, 52, 76, 58, 84, 66, 78, 55, 72].map(
                      (height, index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-t-md bg-gradient-to-t from-cyan-500/20 to-cyan-400/80"
                          style={{ height: `${height}%` }}
                        />
                      )
                    )}

                  </div>

                  <div className="mt-2 flex justify-between text-[10px] text-slate-600">
                    <span>08:00</span>
                    <span>10:00</span>
                    <span>12:00</span>
                    <span>14:00</span>
                    <span>16:00</span>
                  </div>

                </div>

                {/* Insight */}
                <div className="mt-3 flex items-center gap-3 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.035] px-4 py-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-400/10">
                    <Activity
                      size={16}
                      className="text-cyan-400"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-cyan-400">
                      AI Insight
                    </p>

                    <p className="text-xs text-slate-500">
                      High traffic density detected.
                    </p>
                  </div>

                </div>

              </div>
            </div>

            {/* Small floating badge */}
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-white/10 bg-[#0b1020] px-5 py-4 shadow-xl sm:block">
              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                Detection accuracy
              </p>

              <p className="mt-1 text-xl font-semibold text-white">
                Real-time
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* Small dashboard card */
function StatCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">

      <div className="flex items-center gap-2 text-cyan-400">
        {icon}

        <span className="text-xs text-slate-500">
          {label}
        </span>
      </div>

      <p className="mt-2 text-2xl font-semibold text-white">
        {value}
      </p>

    </div>
  );
}