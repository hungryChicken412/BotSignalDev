"use client";

import {useReport} from "./reportContext";

import PriorityImprovements from "../components/dashboard/Overview/PriorityImprovements";

import {Globe, ShieldCheck, Sparkles, Loader2, BookCheck, File} from "lucide-react";
import Image from "next/image";

// In your dashboard/page.tsx
import dynamic from "next/dynamic";
import {useMemo} from "react";

// 1. Swap your normal import for a dynamic one:
// import DataRadar from "../components/dashboard/Overview/dataRadar";
const DataRadar = dynamic(() => import("../components/dashboard/Overview/dataRadar"), {
	ssr: false,
	loading: () => (
		<div className="rounded-3xl border border-gray-200 bg-white animate-pulse">
			<div className="p-8 pb-0">
				<div className="h-6 w-48 bg-gray-200 rounded-lg mb-6"></div>
			</div>
			<div className="h-96 p-8 pt-0 flex flex-col justify-around border-l border-b border-gray-200 border-dashed ml-20 mr-8 mb-4">
				{[1, 2, 3, 4, 5, 6].map((i) => (
					<div key={i} className="flex items-center gap-4 relative">
						{/* Fake Y-Axis Label */}
						<div className="absolute -left-20 h-4 w-16 bg-gray-200 rounded"></div>
						{/* Fake Bar */}
						<div className="h-8 w-3/4 bg-gray-100 rounded-r-md"></div>
					</div>
				))}
			</div>
		</div>
	),
});

const Readyness = dynamic(() => import("../components/dashboard/Overview/Readyness"), {
	ssr: false,
	loading: () => (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
			{/* Left Circle Chart Skeleton */}
			<div className="lg:col-span-1 bg-white rounded-3xl border border-gray-200 p-8 flex flex-col items-center justify-center shadow-xl h-[410px]">
				<div className="w-full pb-8">
					<div className="h-3 w-32 bg-gray-200 rounded mb-3"></div>
					<div className="h-8 w-56 bg-gray-200 rounded-lg"></div>
				</div>
				<div className="w-48 h-48 rounded-full border-[10px] border-gray-100 mb-6"></div>
				<div className="h-6 w-32 bg-gray-200 rounded-full"></div>
			</div>

			{/* Right Grid Skeleton (4 smaller cards) */}
			<div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
				{[1, 2, 3, 4].map((i) => (
					<div key={i} className="bg-white rounded-3xl border border-gray-200 p-6 flex flex-col justify-between h-48">
						<div className="flex justify-between items-start mb-6">
							<div className="h-3 w-32 bg-gray-200 rounded"></div>
							<div className="w-5 h-5 bg-gray-200 rounded-full"></div>
						</div>
						<div className="flex items-end justify-between">
							<div className="h-10 w-16 bg-gray-200 rounded-lg"></div>
							<div className="h-4 w-24 bg-gray-100 rounded"></div>
						</div>
					</div>
				))}
			</div>
		</div>
	),
});

export default function Dashboard() {
	// 1. Instantly pull the fetched data from our Global Context
	const {reportData, isLoading, auditId} = useReport();

	console.log(reportData);

	// ---------------------------------------------------------
	// LOADING & EMPTY STATES
	// ---------------------------------------------------------
	if (isLoading) {
		return (
			<div className="ml-0 md:ml-64 mt-16 flex h-[80vh] items-center justify-center">
				<Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
				<span className="ml-4 text-lg font-semibold text-gray-600">Loading your analysis...</span>
			</div>
		);
	}

	if (!auditId || !reportData || !reportData.results) {
		return (
			<div className="ml-0 md:ml-64 mt-16 p-8 flex flex-col items-center justify-center text-center">
				<h2 className="text-2xl font-bold text-gray-800">No Audit Selected</h2>
				<p className="text-gray-500 mt-2">Please select an audit from your history to view its dashboard.</p>
			</div>
		);
	}

	// ---------------------------------------------------------
	// DATA MAPPING
	// ---------------------------------------------------------
	const resultsObj = reportData.results;

	const metrics = [
		{
			label: "AI Visibility",
			value: resultsObj.overview?.main_scores?.sub_metrics?.ai_visibility?.value || 0,
			icon: Globe,
			info: resultsObj.overview?.main_scores?.sub_metrics?.ai_visibility?.label || "AI access status.",
			deltaDirection: "up",
		},
		{
			label: "Information Density",
			value: resultsObj.overview?.main_scores?.sub_metrics?.information_density.value || 0,
			icon: BookCheck,
			info: resultsObj.overview?.main_scores?.sub_metrics?.information_density.label,
			deltaDirection: "up",
		},
		{
			label: "Indexing Authority",
			value: resultsObj.overview?.main_scores?.sub_metrics?.indexing_authority.value || 0,
			icon: File,
			info: resultsObj.overview?.main_scores?.sub_metrics?.indexing_authority.label,
			deltaDirection: "up",
		},
		{
			label: "Website Health",
			value: resultsObj.overview?.main_scores?.sub_metrics?.website_health.value || 0,
			icon: ShieldCheck,
			info: resultsObj.overview?.main_scores?.sub_metrics.website_health.label,
			deltaDirection: "up",
		},
	];

	const aiCompat = resultsObj.overview?.ai_compatibility || {};
	const getBgColor = (status: string) => {
		if (status === "EXCELLENT") return "bg-emerald-100 text-emerald-700 border-emerald-200";
		if (status === "WARNING") return "bg-amber-100 text-amber-700 border-amber-200";
		return "bg-red-100 text-red-700 border-red-200";
	};

	const aiPlatforms = [
		{
			name: "ChatGPT",
			status: aiCompat.GPTBot?.status || "Unknown",
			score: aiCompat.GPTBot?.score || 0,
			color: getBgColor(aiCompat.GPTBot?.status),
			icon: "/icons/openaiChatgpt.webp",
			dim: {x: 32, y: 32},
		},
		{
			name: "Claude",
			status: aiCompat.ClaudeBot?.status || "Unknown",
			score: aiCompat.ClaudeBot?.score || 0,
			color: getBgColor(aiCompat.ClaudeBot?.status),
			icon: "/icons/anthropicClaude.webp",
			dim: {x: 32, y: 32},
		},
		{
			name: "Gemini",
			status: aiCompat["Google-Extended"]?.status || "Unknown",
			score: aiCompat["Google-Extended"]?.score || 0,
			color: getBgColor(aiCompat["Google-Extended"]?.status),
			icon: "/icons/googleGemini.webp",
			dim: {x: 32, y: 32},
		},
		{
			name: "Perplexity",
			status: aiCompat.PerplexityBot?.status || "Unknown",
			score: aiCompat.PerplexityBot?.score || 0,
			color: getBgColor(aiCompat.PerplexityBot?.status),
			icon: "/icons/perplexityPerplexity.webp",
			dim: {x: 80, y: 120},
		},
	];

	const dim = resultsObj.overview?.dimension_analysis || {};
	const dimensionData = [
		{
			subject: "AI Discovery",
			score: dim.ai_discovery || 0,
			fullMark: 100,
		},
		{
			subject: "AI Understanding",
			score: dim.ai_understanding || 0,
			fullMark: 100,
		},
		{
			subject: "Citation Potential",
			score: resultsObj.details?.citation_score || 0,
			fullMark: 100,
		},
		{subject: "SEO", score: dim.technical || 0, fullMark: 100},
		/*  {
			subject: "Accessibility",
			score: resultsObj.details?.accessibility_score || 0,
			fullMark: 100,
		}, */
		{
			subject: "Indexing",
			score: dim.indexing_authority || 0,
			fullMark: 100,
		},
	];

	const rawImprovements = resultsObj.overview?.top_improvements || [];
	const Improvements = {
		highPriority: rawImprovements
			.filter((i: any) => i.points >= 10)
			.map((i: any) => ({
				title: i.title,
				notes: i.source,
				points: i.points,
			})),
		mediumPriority: rawImprovements
			.filter((i: any) => i.points >= 5 && i.points < 10)
			.map((i: any) => ({
				title: i.title,
				notes: i.source,
				points: i.points,
			})),
		lowPriority: rawImprovements
			.filter((i: any) => i.points < 5)
			.map((i: any) => ({
				title: i.title,
				notes: i.source,
				points: i.points,
			})),
	};

	// ---------------------------------------------------------
	// RENDER DASHBOARD
	// ---------------------------------------------------------
	return (
		<main className="ml-0  mt-16 p-4 md:p-8 min-h-screen bg-gray-50/50">
			<div className="max-w-7xl mx-auto space-y-8">
				{/* Premium AI Compatibility Section */}
				<div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm transition-all hover:shadow-md">
					<div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 blur-3xl opacity-70 pointer-events-none" />

					<div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
						<div className="max-w-2xl">
							<div className="flex items-center gap-3">
								<p className="text-xs font-bold uppercase tracking-widest text-indigo-500">AI Compatibility</p>
								<span className="relative flex h-2.5 w-2.5">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
									<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
								</span>
							</div>

							<h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">{resultsObj.overview?.header?.title || "Analysis Complete"}</h2>
							<p className="mt-3 text-gray-500 leading-relaxed text-base">{resultsObj.overview?.header?.summary || "Here is a breakdown of how well AI engines can process your site."}</p>
						</div>

						<div className="flex shrink-0 items-start">
							<div className="inline-flex items-center gap-2 rounded-full border uppercase border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 shadow-sm">
								<Sparkles className="h-4 w-4" />
								{resultsObj.overview?.main_scores?.ai_discoverability?.status.toString() || "Excellent"}
							</div>
						</div>
					</div>

					{/* AI Platforms Grid */}
					<div className="relative z-10 mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
						{aiPlatforms.map((platform) => (
							<div key={platform.name} className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/50 p-5 transition-all duration-300 hover:border-gray-200 hover:bg-white hover:shadow-xl hover:-translate-y-1">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-gray-100 transition-transform duration-300 group-hover:scale-110">
											<Image height={platform.dim.x} width={platform.dim.y} alt={`${platform.name} icon`} src={platform.icon} className="h-7 w-7 object-contain" />
										</div>
										<span className="font-semibold text-gray-900">{platform.name}</span>
									</div>
								</div>

								<div className="mt-8">
									<div className="mb-2 flex items-end justify-between">
										<span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${platform.color}`}>{platform.status}</span>
										<span className="text-xl font-bold text-gray-900">{platform.score}%</span>
									</div>
									<div className="h-1 w-full overflow-hidden rounded-full bg-gray-200/60">
										<div
											className="h-full rounded-full bg-indigo-500 transition-all duration-1000 ease-out group-hover:bg-indigo-600"
											style={{
												width: `${platform.score}%`,
											}}
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<Readyness score={resultsObj.overview?.main_scores?.ai_discoverability?.score || 0} status={resultsObj.overview?.main_scores?.ai_discoverability?.status || "Not Scanned"} statusTone={resultsObj.overview?.main_scores?.ai_discoverability?.status || "excellent"} metrics={metrics} notes={resultsObj.overview?.main_scores?.ai_discoverability?.notes || ""} />

				<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
					<DataRadar dimensionData={dimensionData} />
					<PriorityImprovements Improvements={Improvements} />
				</div>
			</div>
		</main>
	);
}
