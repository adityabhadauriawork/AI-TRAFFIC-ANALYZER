import { useState } from "react";
import { UploadCloud, FileVideo, Loader2, ArrowRight } from "lucide-react";

export default function Demo() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  function handleFile(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
    setFileName(file.name);
  }

  async function analyzeVideo() {
    if (!selectedFile) {
      alert("Please choose a traffic video first.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("video", selectedFile);

      const response = await fetch(
        "http://127.0.0.1:5000/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(
          `Server returned ${response.status}`
        );
      }

      const result = await response.json();

      console.log("Fresh analysis result:", result);

      /*
        Save the NEW analysis result.
        The dashboard reads this value.
      */
      sessionStorage.setItem(
        "visionflow_analysis",
        JSON.stringify(result)
      );

      /*
        Open the dashboard after the backend
        finishes processing the video.
      */
      window.location.href = "/dashboard";

    } catch (error) {
      console.error("Video analysis failed:", error);

      alert(
        "Unable to analyze the video. Make sure the Flask backend is running."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="demo"
      className="border-t border-white/[0.06] bg-[#070b17] py-28"
    >
      <div className="mx-auto w-full max-w-[1100px] px-6 lg:px-10">

        {/* Heading */}

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-400">
            Start analyzing
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-white sm:text-5xl">
            Turn a traffic video into insight.
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
            Upload your footage and let VisionFlow analyze
            the traffic automatically.
          </p>

        </div>

        {/* Upload Card */}

        <div className="mt-14 rounded-3xl border border-white/[0.08] bg-[#0b1020] p-3">

          <div
            className="
              rounded-[20px]
              border
              border-dashed
              border-white/[0.12]
              bg-white/[0.015]
              px-6
              py-16
              text-center
              transition
              hover:border-cyan-400/30
              hover:bg-cyan-400/[0.02]
              sm:px-12
            "
          >

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.06]">

              <UploadCloud
                size={26}
                className="text-cyan-400"
              />

            </div>

            <h3 className="mt-6 text-xl font-semibold text-white">
              Upload your traffic video
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              MP4 and other common video formats
            </p>

            {/* Choose video */}

            <label
              className="
                mt-7
                inline-flex
                cursor-pointer
                items-center
                gap-2
                rounded-full
                border
                border-white/[0.1]
                bg-white/[0.04]
                px-5
                py-2.5
                text-sm
                font-medium
                text-white
                transition
                hover:border-cyan-400/30
                hover:bg-white/[0.07]
              "
            >
              Choose video

              <input
                type="file"
                accept="video/*"
                hidden
                onChange={handleFile}
              />
            </label>

            {/* Selected file */}

            {fileName && (
              <div className="mx-auto mt-7 flex max-w-md items-center gap-3 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] px-4 py-3 text-left">

                <FileVideo
                  size={20}
                  className="shrink-0 text-cyan-400"
                />

                <div className="min-w-0">

                  <p className="text-xs text-slate-500">
                    Selected video
                  </p>

                  <p className="truncate text-sm font-medium text-white">
                    {fileName}
                  </p>

                </div>

              </div>
            )}

            {/* Analyze button */}

            <button
              type="button"
              onClick={analyzeVideo}
              disabled={loading}
              className="
                mt-8
                inline-flex
                min-w-[190px]
                items-center
                justify-center
                gap-2
                rounded-full
                bg-cyan-400
                px-6
                py-3.5
                text-sm
                font-semibold
                text-slate-950
                transition
                hover:-translate-y-0.5
                hover:bg-cyan-300
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >

              {loading ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />

                  Analyzing video...
                </>
              ) : (
                <>
                  Analyze traffic

                  <ArrowRight size={17} />
                </>
              )}

            </button>

          </div>

        </div>

      </div>
    </section>
  );
}