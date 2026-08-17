import {
  UploadCloud,
  ScanSearch,
  BarChart3,
  FileCheck2,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UploadCloud,
    title: "Upload your video",
    description:
      "Upload traffic footage directly from your device. MP4 and common video formats are supported.",
  },
  {
    number: "02",
    icon: ScanSearch,
    title: "AI detects vehicles",
    description:
      "YOLOv8 and ByteTrack identify and track cars, motorcycles, buses and trucks.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Analyze traffic",
    description:
      "The system converts detections into vehicle counts and traffic density insights.",
  },
  {
    number: "04",
    icon: FileCheck2,
    title: "Get your insights",
    description:
      "Review the results, recommendations and processed video from one dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="workflow"
      className="border-t border-white/[0.06] bg-[#0a0f1f] py-24"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-10">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-400">
            Simple workflow
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-white sm:text-5xl">
            From video to insight.
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
            A straightforward workflow that turns raw traffic footage into
            useful intelligence in just a few steps.
          </p>

        </div>

        {/* Steps */}
        <div className="relative mt-16">

          {/* Connecting line */}
          <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent lg:block" />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="
                    relative
                    rounded-2xl
                    border
                    border-white/[0.08]
                    bg-[#080d1a]
                    p-6
                  "
                >

                  {/* Number + icon */}
                  <div className="flex items-center justify-between">

                    <span className="text-xs font-semibold tracking-[0.2em] text-slate-600">
                      {step.number}
                    </span>

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.06] text-cyan-400">
                      <Icon size={22} strokeWidth={1.8} />
                    </div>

                  </div>

                  <h3 className="mt-7 text-lg font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {step.description}
                  </p>

                </div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
}