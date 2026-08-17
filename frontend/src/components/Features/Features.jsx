import {
  Car,
  Activity,
  BrainCircuit,
  FileText,
} from "lucide-react";

const features = [
  {
    icon: Car,
    title: "Vehicle Detection",
    description:
      "Detect cars, motorcycles, buses and trucks from uploaded traffic footage.",
  },
  {
    icon: Activity,
    title: "Traffic Analytics",
    description:
      "Turn detected vehicles into clear counts, density levels and traffic insights.",
  },
  {
    icon: BrainCircuit,
    title: "AI Recommendations",
    description:
      "Generate practical recommendations based on the traffic conditions detected.",
  },
  {
    icon: FileText,
    title: "Analysis Reports",
    description:
      "Review your analysis and access the generated traffic intelligence in one place.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="border-t border-white/[0.06] bg-[#070b17] py-24"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-10">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-400">
            Platform capabilities
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-white sm:text-5xl">
            Everything you need to understand traffic.
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
            VisionFlow AI combines computer vision, object tracking and
            analytics into one simple traffic intelligence platform.
          </p>

        </div>

        {/* Feature grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  group
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-[#0b1020]
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-cyan-400/20
                  hover:bg-[#0d1426]
                "
              >

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-cyan-400/10
                    bg-cyan-400/[0.07]
                    text-cyan-400
                    transition
                    group-hover:bg-cyan-400/10
                  "
                >
                  <Icon size={21} strokeWidth={1.8} />
                </div>

                <h3 className="mt-6 text-lg font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}