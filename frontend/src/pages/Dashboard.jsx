import { useEffect, useState } from "react";

import {
    Activity,
    AlertTriangle,
    BarChart3,
    Bike,
    Bus,
    Car,
    FileText,
    Gauge,
    History,
    LayoutDashboard,
    Map,
    Settings,
    Truck,
    TrendingUp,
    Upload,
    Users,
} from "lucide-react";

export default function Dashboard() {

    const [analysisData, setAnalysisData] = useState(null);

    useEffect(() => {
        const savedData = sessionStorage.getItem("visionflow_analysis");

        if (savedData) {
            try {
                setAnalysisData(JSON.parse(savedData));
            } catch (error) {
                console.error("Invalid saved analysis data:", error);
            }
        }
    }, []);


    const data = analysisData || {
        car: 0,
        motorcycle: 0,
        bus: 0,
        truck: 0,
        total: 0,
        density: "No analysis",
        congestion_score: 0,
        peak_vehicles: 0,
        average_vehicles: 0,
        duration: 0,
        fps: 0,
        frames_processed: 0,
        resolution: "—",
        recommendation: "",
        traffic_flow: [],
    };


    const stats = [
        {
            title: "Total Vehicles",
            value: data.total,
            change: data.total > 0 ? "Detected" : "Awaiting analysis",
            icon: Car,
        },
        {
            title: "Cars",
            value: data.car,
            change: data.car > 0 ? "Detected" : "None detected",
            icon: Car,
        },
        {
            title: "Motorcycles",
            value: data.motorcycle,
            change: data.motorcycle > 0 ? "Detected" : "None detected",
            icon: Bike,
        },
        {
            title: "Buses",
            value: data.bus,
            change: data.bus > 0 ? "Detected" : "None detected",
            icon: Bus,
        },
        {
            title: "Avg Movement",
            value: data.average_pixel_speed ?? 0,
            unit: "px/s",
            change:
                data.average_pixel_speed > 0
                ? "Vehicle movement detected"
                : "No movement detected",
            icon: Gauge,
        },
    ];

    const vehicles = [
        {
            name: "Cars",
            value: data.car,
            icon: Car,
        },
        {
            name: "Motorcycles",
            value: data.motorcycle,
            icon: Bike,
        },
        {
            name: "Buses",
            value: data.bus,
            icon: Bus,
        },
        {
            name: "Trucks",
            value: data.truck,
            icon: Truck,
        },
    ];

    const totalVehicles = data.total || 0;

    const vehiclesWithPercentage = vehicles.map((vehicle) => ({
        ...vehicle,
        percentage:
            totalVehicles > 0
                ? Math.round((vehicle.value / totalVehicles) * 100)
                : 0,
    }));
    const flowData = data.traffic_flow || [];
    const laneData = data.lane_analysis || [];
    return (
        <div className="min-h-screen bg-[#050816] text-white">

            {/* Sidebar */}
            <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-white/[0.06] bg-[#080c1c] lg:flex lg:flex-col">

                <div className="flex h-20 items-center border-b border-white/[0.06] px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400 text-sm font-black text-slate-950">
                            V
                        </div>

                        <div>
                            <div className="text-lg font-bold">
                                VisionFlow<span className="text-cyan-400">AI</span>
                            </div>

                            <div className="text-[9px] uppercase tracking-[0.2em] text-slate-500">
                                Traffic Intelligence
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-6">

                    <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                        Platform
                    </p>

                    <nav className="space-y-1">

                        <a
                            href="/dashboard"
                            className="flex items-center gap-3 rounded-xl bg-cyan-400/10 px-3 py-3 text-sm font-medium text-cyan-400"
                        >
                            <LayoutDashboard size={18} />
                            Dashboard
                        </a>

                        <a
                            href="/"
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
                        >
                            <Upload size={18} />
                            Analyze Video
                        </a>

                        <a
                            href="#monitoring"
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
                        >
                            <Activity size={18} />
                            Live Monitoring
                        </a>

                        <a
                            href="#analytics"
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
                        >
                            <BarChart3 size={18} />
                            Analytics
                        </a>

                        <a
                            href="#history"
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
                        >
                            <History size={18} />
                            Analysis History
                        </a>

                        <a
                            href="#reports"
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
                        >
                            <FileText size={18} />
                            Reports
                        </a>

                    </nav>

                    <p className="mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                        System
                    </p>

                    <nav className="space-y-1">

                        <a
                            href="#alerts"
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
                        >
                            <AlertTriangle size={18} />
                            Alerts
                        </a>

                        <a
                            href="#settings"
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
                        >
                            <Settings size={18} />
                            Settings
                        </a>

                    </nav>
                </div>

                <div className="mt-auto border-t border-white/[0.06] p-4">
                    <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] p-4">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            <span className="text-xs font-medium text-emerald-400">
                                System Online
                            </span>
                        </div>

                        <p className="mt-2 text-xs leading-5 text-slate-500">
                            VisionFlow AI engine is ready for analysis.
                        </p>
                    </div>
                </div>

            </aside>

            {/* Main */}
            <main className="min-w-0 lg:ml-64">

                {/* Topbar */}
                <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/[0.06] bg-[#050816]/90 px-6 backdrop-blur-xl lg:px-10">

                    <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                            Overview
                        </p>

                        <h1 className="mt-1 text-xl font-semibold">
                            Traffic Dashboard
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">

                        <div className="hidden items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.05] px-4 py-2 text-xs text-emerald-400 sm:flex">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            Analysis Engine Online
                        </div>

                        <a
                            href="/"
                            className="flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                        >
                            <Upload size={16} />
                            Analyze Video
                        </a>

                    </div>

                </header>

                <div className="mx-auto min-w-0 max-w-[1600px] px-6 py-8 lg:px-10">

                    {/* Welcome */}
                    <section className="mb-8">

                        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

                            <div>
                                <p className="text-sm text-cyan-400">
                                    AI Traffic Intelligence
                                </p>

                                <h2 className="mt-2 text-3xl font-bold tracking-tight">
                                    Traffic overview
                                </h2>

                                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                                    Monitor vehicle activity, traffic flow, congestion and
                                    computer-vision insights from your latest analysis.
                                </p>
                            </div>

                            <div className="text-sm text-slate-500">
                                Last analysis · Today, 14:32
                            </div>

                        </div>

                    </section>

                    {/* KPI cards */}
                    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">

                        {stats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={stat.title}
                                    className="rounded-2xl border border-white/[0.07] bg-[#0b1022] p-5 transition hover:border-cyan-400/20"
                                >

                                    <div className="flex items-start justify-between">

                                        <div>
                                            <p className="text-sm text-slate-500">
                                                {stat.title}
                                            </p>

                                            <div className="mt-3 flex items-baseline gap-1">
                                                <span className="text-3xl font-bold">
                                                    {stat.value}
                                                </span>

                                                {stat.unit && (
                                                    <span className="text-sm text-slate-500">
                                                        {stat.unit}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                                            <Icon size={19} />
                                        </div>

                                    </div>

                                    <div className="mt-4 text-xs text-emerald-400">
                                        {stat.change}
                                    </div>

                                </div>
                            );
                        })}

                    </section>

                    {/* Main analytics */}
                    <section className="mt-6 grid min-w-0 gap-6 xl:grid-cols-[1.6fr_1fr]">

                        {/* Traffic flow */}
                        <div className="rounded-2xl border border-white/[0.07] bg-[#0b1022] p-6">

                            <div className="flex items-center justify-between">

                                <div>
                                    <h3 className="font-semibold">
                                        Traffic Flow
                                    </h3>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Vehicle activity throughout the analysis period
                                    </p>
                                </div>

                                <div className="rounded-lg border border-white/[0.06] px-3 py-2 text-xs text-slate-400">
                                    Today
                                </div>

                            </div>

                            <div className="mt-8 flex h-64 items-end gap-3">

                                {(flowData.length > 0 ? flowData : [0]).map(
                                    (vehicles, index) => (
                                        <div
                                        key={index}
                                        className="group relative flex h-full flex-1 items-end"
                                        >
                                        <div
                                            className="flex-1 rounded-t-lg bg-gradient-to-t from-cyan-500/20 to-cyan-400/80 transition group-hover:from-cyan-400/40 group-hover:to-cyan-300"
                                            style={{
                                            height: `${
                                                data.peak_vehicles > 0
                                                ? Math.max(
                                                    8,
                                                    (vehicles / data.peak_vehicles) * 100
                                                    )
                                                : 8
                                            }%`,
                                            }}
                                            title={`${vehicles} vehicles`}
                                        />
                                        </div>
                                    )
                                    )}

                            </div>

                            <div className="mt-3 flex justify-between text-[10px] text-slate-600">
                                <span>0s</span>
                                <span>
                                    {data.duration
                                    ? `${(data.duration * 0.25).toFixed(1)}s`
                                    : "—"}
                                </span>
                                <span>
                                    {data.duration
                                    ? `${(data.duration * 0.5).toFixed(1)}s`
                                    : "—"}
                                </span>
                                <span>
                                    {data.duration
                                    ? `${(data.duration * 0.75).toFixed(1)}s`
                                    : "—"}
                                </span>
                                <span>
                                    {data.duration
                                    ? `${data.duration.toFixed(1)}s`
                                    : "—"}
                                </span>
                                </div>

                        </div>

                        {/* Vehicle distribution */}
                        <div className="min-w-0 rounded-2xl border border-white/[0.07] bg-[#0b1022] p-6">

                            <div>
                                <h3 className="font-semibold">
                                    Vehicle Distribution
                                </h3>

                                <p className="mt-1 text-xs text-slate-500">
                                    Detected vehicles by class
                                </p>
                            </div>

                            <div className="mt-6 space-y-5">

                                {vehiclesWithPercentage.map((vehicle) => {
                                    const Icon = vehicle.icon;

                                    return (
                                        <div key={vehicle.name}>

                                            <div className="flex items-center justify-between">

                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] text-cyan-400">
                                                        <Icon size={17} />
                                                    </div>

                                                    <span className="text-sm text-slate-300">
                                                        {vehicle.name}
                                                    </span>

                                                </div>

                                                <div className="text-right">
                                                    <span className="text-sm font-semibold">
                                                        {vehicle.value}
                                                    </span>

                                                    <span className="ml-2 text-xs text-slate-600">
                                                        {vehicle.percentage}%
                                                    </span>
                                                </div>

                                            </div>

                                            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                                                <div
                                                    className="h-full rounded-full bg-cyan-400"
                                                    style={{ width: `${vehicle.percentage}%` }}
                                                />
                                            </div>

                                        </div>
                                    );
                                })}

                            </div>

                        </div>

                    </section>
                    {/* Processed Video */}
                    {analysisData && (
                        <div className="mb-6 rounded-2xl border border-white/[0.07] bg-[#0b1022] p-6">

                            <div className="flex items-center justify-between">

                            <div>
                                <h3 className="font-semibold text-white">
                                Processed Traffic Video
                                </h3>

                                <p className="mt-1 text-xs text-slate-500">
                                YOLOv8 + ByteTrack detection output
                                </p>
                            </div>

                            <div className="flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.05] px-3 py-1.5 text-xs text-emerald-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                Analysis Complete
                            </div>

                            </div>

                            <div className="mt-5 overflow-hidden rounded-xl border border-white/[0.06] bg-black">

                            <video
                                className="max-h-[560px] w-full rounded-xl object-contain"
                                controls
                                playsInline
                                preload="metadata"
                                src={`http://127.0.0.1:5000/processed-video?t=${Date.now()}`}
                            />

                            </div>

                        </div>
                    )}

                    {/* Bottom analytics */}
                    <section className="mt-6 grid min-w-0 grid-cols-1 gap-6 2xl:grid-cols-3">

                        {/* Congestion */}
                        <div className="rounded-2xl border border-white/[0.07] bg-[#0b1022] p-6">

                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold">
                                    Congestion
                                </h3>

                                <Activity size={18} className="text-cyan-400" />
                            </div>

                            <div className="mt-8 flex items-center justify-center">

                                <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[14px] border-red-400/20">

                                    <div
                                        className="absolute inset-[-14px] rounded-full border-[14px] border-transparent border-t-cyan-400 border-r-cyan-400"
                                        style={{
                                            transform: `rotate(${45 + (data.congestion_score ?? 0) * 3.6}deg)`,
                                        }}
                                    />

                                    <div className="text-center">
                                        <div className="text-4xl font-bold">
                                            {data.congestion_score ?? 0}
                                        </div>

                                        <div className="text-xs text-slate-500">
                                            / 100
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className="mt-5 text-center">

                                <p
                                    className={`font-semibold ${data.density === "High"
                                            ? "text-red-400"
                                            : data.density === "Medium"
                                                ? "text-amber-400"
                                                : data.density === "Low"
                                                    ? "text-emerald-400"
                                                    : "text-slate-400"
                                        }`}
                                >
                                    {data.density === "High"
                                        ? "Heavy Congestion"
                                        : data.density === "Medium"
                                            ? "Moderate Traffic"
                                            : data.density === "Low"
                                                ? "Light Traffic"
                                                : "Awaiting Analysis"}
                                </p>

                                <p className="mt-1 text-xs leading-5 text-slate-500">
  `                                  {data.density === "High"
                                        ? "Traffic density is high and may require immediate traffic-flow optimization."
                                        : data.density === "Medium"
                                        ? "Traffic density is moderate. Monitoring and signal optimization may improve flow."
                                        : data.density === "Low"
                                            ? "Traffic flow is currently light with no immediate intervention required."
                                            : "Upload a traffic video to generate congestion insights."}
                                </p>`

                            </div>

                        </div>

                        {/* Lane Analysis */}
                        <div className="min-w-0 rounded-2xl border border-white/[0.07] bg-[#0b1022] p-6">

                            <div className="flex items-center justify-between">

                                <div>
                                    <h3 className="font-semibold">
                                        Lane Analysis
                                    </h3>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Vehicle distribution by lane
                                    </p>
                                </div>

                                <Map size={18} className="text-cyan-400" />

                            </div>

                            <div className="mt-7 space-y-5">

                                {laneData.length > 0 ? (
                                    laneData.map((lane) => (

                                        <div key={lane.lane}>

                                            <div className="flex items-center justify-between">

                                                <span className="text-sm text-slate-300">
                                                    {lane.lane}
                                                </span>

                                                <div className="text-right">
                                                    <span className="text-sm font-semibold text-white">
                                                        {lane.vehicles}
                                                    </span>

                                                    <span className="ml-2 text-xs text-slate-500">
                                                        vehicles
                                                    </span>
                                                </div>

                                            </div>

                                            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.05]">

                                                <div
                                                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all"
                                                    style={{
                                                        width: `${Math.min(lane.occupancy, 100)}%`,
                                                    }}
                                                />

                                            </div>

                                            <div className="mt-1 flex justify-between text-[10px] text-slate-600">

                                                <span>{lane.vehicles} vehicles</span>

                                                <span>
                                                    {lane.occupancy}%
                                                </span>

                                            </div>

                                        </div>

                                    ))
                                ) : (

                                    <div className="flex min-h-[180px] items-center justify-center">

                                        <div className="text-center">

                                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                                                <Map size={22} />
                                            </div>

                                            <p className="mt-4 text-sm font-medium text-slate-300">
                                                No lane data available
                                            </p>

                                            <p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-slate-500">
                                                Upload and analyze a traffic video to generate lane-level statistics.
                                            </p>

                                        </div>

                                    </div>

                                )}

                            </div>

                            {laneData.length > 0 && (
                                <div className="mt-5 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.03] p-3 text-xs text-cyan-300">
                                    Lane occupancy is estimated from tracked vehicle positions across the video.
                                </div>
                            )}

                        </div>

                        {/* AI insight */}
                        <div className="min-w-0 rounded-2xl border border-cyan-400/10 bg-gradient-to-br from-cyan-400/[0.07] to-blue-500/[0.03] p-6">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                                    <TrendingUp size={19} />
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        AI Traffic Insight
                                    </h3>

                                    <p className="text-xs text-slate-500">
                                        Automated analysis
                                    </p>
                                </div>

                            </div>

                            <p className="mt-6 text-sm leading-7 text-slate-300">
                                {data.recommendation ||
                                    "Upload a traffic video to generate AI-powered traffic insights."}
                            </p>

                            <div className="mt-6 flex items-center gap-2 text-xs text-emerald-400">
                                <Users size={14} />
                                Based on current traffic measurements
                            </div>

                        </div>

                    </section>
                    <div className="mt-6 min-w-0 rounded-2xl border border-white/[0.07] bg-[#0b1022] p-6">

                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-white">
                                    Analysis Details
                                </h3>

                                <p className="mt-1 text-xs text-slate-500">
                                    Technical information from the processed video
                                </p>
                            </div>

                            <span className="rounded-full border border-cyan-400/10 bg-cyan-400/[0.05] px-3 py-1 text-xs text-cyan-400">
                                YOLOv8 + ByteTrack
                            </span>
                        </div>

                        <div className="mt-6 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">

                            <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4">
                                <p className="text-xs text-slate-500">
                                    Video Duration
                                </p>

                                <p className="mt-2 text-lg font-semibold text-white">
                                    {data.duration ?? 0}s
                                </p>
                            </div>

                            <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4">
                                <p className="text-xs text-slate-500">
                                    Frame Rate
                                </p>

                                <p className="mt-2 text-lg font-semibold text-white">
                                    {data.fps ?? 0} FPS
                                </p>
                            </div>

                            <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4">
                                <p className="text-xs text-slate-500">
                                    Resolution
                                </p>

                                <p className="mt-2 text-lg font-semibold text-white">
                                    {data.resolution ?? "—"}
                                </p>
                            </div>

                            <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4">
                                <p className="text-xs text-slate-500">
                                    Frames Processed
                                </p>

                                <p className="mt-2 text-lg font-semibold text-white">
                                    {data.frames_processed ?? 0}
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}