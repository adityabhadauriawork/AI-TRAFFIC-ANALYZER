const technologies = [
  "YOLOv8",
  "ByteTrack",
  "OpenCV",
  "Flask",
  "React",
];

export default function Trusted() {
  return (
    <section className="border-y border-white/[0.06] bg-[#050816]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center px-6 py-10 lg:px-10">

        <p className="text-center text-[11px] font-medium uppercase tracking-[0.28em] text-slate-600">
          Built with modern computer vision
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">

          {technologies.map((technology, index) => (
            <div
              key={technology}
              className="flex items-center gap-x-8"
            >
              <span className="text-sm font-medium tracking-wide text-slate-500 transition hover:text-slate-300">
                {technology}
              </span>

              {index !== technologies.length - 1 && (
                <span className="hidden h-1 w-1 rounded-full bg-slate-700 sm:block" />
              )}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}