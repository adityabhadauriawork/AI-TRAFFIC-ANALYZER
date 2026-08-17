export default function AnimatedBackground() {
  return (
    <>

      <div className="fixed inset-0 -z-50 overflow-hidden bg-[#020617]">

        <div className="
        absolute
        left-[-250px]
        top-[120px]
        h-[500px]
        w-[500px]
        rounded-full
        bg-cyan-500/20
        blur-[160px]
        animate-pulse
        " />

        <div className="
        absolute
        right-[-250px]
        bottom-[50px]
        h-[500px]
        w-[500px]
        rounded-full
        bg-blue-600/20
        blur-[170px]
        animate-pulse
        " />

        <div className="
        absolute
        left-1/2
        top-1/2
        h-[350px]
        w-[350px]
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        bg-cyan-400/10
        blur-[140px]
        " />

      </div>

    </>
  );
}