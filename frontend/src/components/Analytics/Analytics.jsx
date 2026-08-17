import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import {
  Car,
  Bike,
  Bus,
  Truck,
  Activity,
  BrainCircuit,
  CheckCircle2,
  AlertTriangle,
  Gauge,
} from "lucide-react";

const COLORS = [
  "#22d3ee",
  "#60a5fa",
  "#8b5cf6",
  "#34d399",
];

export default function Analytics({ analysisData }) {

  /* --------------------------------
     Empty dashboard state
  -------------------------------- */

  if (!analysisData) {
    return (
      <div className="rounded-3xl border border-white/[0.08] bg-[#0b1020] p-10">

        <div className="flex min-h-[420px] flex-col items-center justify-center text-center">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/[0.08]">
            <Activity
              size={30}
              className="text-cyan-400"
            />
          </div>

          <h2 className="mt-6 text-2xl font-semibold text-white">
            No analysis yet
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
            Upload a traffic video from the VisionFlow homepage to generate
            vehicle detection and traffic intelligence.
          </p>

        </div>

      </div>
    );
  }

  /* --------------------------------
     Data
  -------------------------------- */

  const chartData = [
    {
      name: "Cars",
      value: analysisData.car || 0,
    },
    {
      name: "Bikes",
      value: analysisData.motorcycle || 0,
    },
    {
      name: "Buses",
      value: analysisData.bus || 0,
    },
    {
      name: "Trucks",
      value: analysisData.truck || 0,
    },
  ];

  const density = analysisData.density || "Unknown";

  const densityConfig = {
    Low: {
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/20",
      icon: CheckCircle2,
      message:
        "Traffic flow is currently light. No immediate intervention is required.",
    },

    Medium: {
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      border: "border-yellow-400/20",
      icon: Gauge,
      message:
        "Moderate traffic detected. Consider optimizing signal timing during peak periods.",
    },

    High: {
      color: "text-red-400",
      bg: "bg-red-400/10",
      border: "border-red-400/20",
      icon: AlertTriangle,
      message:
        "Heavy traffic detected. Consider extending green signal duration and managing congestion.",
    },

    Unknown: {
      color: "text-slate-400",
      bg: "bg-white/5",
      border: "border-white/10",
      icon: Activity,
      message:
        "Traffic density information is currently unavailable.",
    },
  };

  const currentDensity =
    densityConfig[density] || densityConfig.Unknown;

  const DensityIcon = currentDensity.icon;

  return (
    <div className="space-y-6">

      {/* --------------------------------
          Overview header
      -------------------------------- */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

        <div>

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Latest analysis
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-white">
            Traffic overview
          </h2>

        </div>

        <div
          className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${currentDensity.bg} ${currentDensity.border} ${currentDensity.color}`}
        >

          <DensityIcon size={14} />

          {density} traffic

        </div>

      </div>

      {/* --------------------------------
          KPI cards
      -------------------------------- */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">

        <MetricCard
          icon={<Car size={19} />}
          label="Cars"
          value={analysisData.car || 0}
        />

        <MetricCard
          icon={<Bike size={19} />}
          label="Motorcycles"
          value={analysisData.motorcycle || 0}
        />

        <MetricCard
          icon={<Bus size={19} />}
          label="Buses"
          value={analysisData.bus || 0}
        />

        <MetricCard
          icon={<Truck size={19} />}
          label="Trucks"
          value={analysisData.truck || 0}
        />

        <MetricCard
          icon={<Activity size={19} />}
          label="Total vehicles"
          value={analysisData.total || 0}
          highlight
        />

      </div>

      {/* --------------------------------
          Charts
      -------------------------------- */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Distribution */}

        <div className="rounded-3xl border border-white/[0.08] bg-[#0b1020] p-6">

          <div className="mb-4">

            <h3 className="text-base font-semibold text-white">
              Vehicle distribution
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Breakdown of detected vehicles
            </p>

          </div>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <PieChart>

              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={72}
                outerRadius={108}
                paddingAngle={3}
              >

                {chartData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index]}
                    stroke="transparent"
                  />
                ))}

              </Pie>

              <Tooltip
                contentStyle={{
                  background: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />

            </PieChart>

          </ResponsiveContainer>

          <div className="grid grid-cols-2 gap-3">

            {chartData.map((item, index) => (

              <div
                key={item.name}
                className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
              >

                <div className="flex items-center gap-2">

                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: COLORS[index],
                    }}
                  />

                  <span className="text-xs text-slate-400">
                    {item.name}
                  </span>

                </div>

                <span className="text-sm font-semibold text-white">
                  {item.value}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Bar chart */}

        <div className="rounded-3xl border border-white/[0.08] bg-[#0b1020] p-6">

          <div className="mb-4">

            <h3 className="text-base font-semibold text-white">
              Vehicle count
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Detected objects by vehicle type
            </p>

          </div>

          <ResponsiveContainer
            width="100%"
            height={390}
          >

            <BarChart
              data={chartData}
              margin={{
                top: 15,
                right: 10,
                left: -20,
                bottom: 5,
              }}
            >

              <CartesianGrid
                stroke="rgba(148,163,184,0.08)"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#64748b",
                  fontSize: 11,
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
                tick={{
                  fill: "#64748b",
                  fontSize: 11,
                }}
              />

              <Tooltip
                cursor={{
                  fill: "rgba(255,255,255,0.03)",
                }}
                contentStyle={{
                  background: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />

              <Bar
                dataKey="value"
                radius={[8, 8, 0, 0]}
                fill="#22d3ee"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* --------------------------------
          AI insight
      -------------------------------- */}

      <div
        className={`rounded-3xl border p-6 ${currentDensity.border} ${currentDensity.bg}`}
      >

        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">

            <BrainCircuit
              size={22}
              className="text-cyan-400"
            />

          </div>

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              AI insight
            </p>

            <h3 className="mt-2 text-lg font-semibold text-white">
              Traffic density: {density}
            </h3>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              {currentDensity.message}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}


/* --------------------------------
   Metric card
-------------------------------- */

function MetricCard({
  icon,
  label,
  value,
  highlight = false,
}) {
  return (
    <div
      className={`
        rounded-2xl
        border
        p-5
        ${
          highlight
            ? "border-cyan-400/20 bg-cyan-400/[0.04]"
            : "border-white/[0.08] bg-[#0b1020]"
        }
      `}
    >

      <div className="flex items-center justify-between">

        <div
          className={`
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            ${
              highlight
                ? "bg-cyan-400/10 text-cyan-400"
                : "bg-white/[0.04] text-slate-400"
            }
          `}
        >
          {icon}
        </div>

      </div>

      <p className="mt-5 text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-semibold tracking-tight text-white">
        {value}
      </p>

    </div>
  );
}