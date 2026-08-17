"use client";

import {CheckCircle, ArrowDown, ArrowUp} from "lucide-react";
import type {LucideIcon} from "lucide-react";
import {memo} from "react";

import Tooltip from "@/app/components/Tooltip";




type ReadynessMetric = {
	label: string;
	value: string | number;
	delta?: string;
	deltaDirection?: string | "up" | "down" | "stable";
	icon: LucideIcon;
	info: string;
};

type ReadynessProps = {
	title?: string;
	score: number;
	maxScore?: number;
	status: string;
	statusTone?: "excellent" | "warning" | "critical";
	metrics: ReadynessMetric[];
	notes?: string;
};

const statusStyles = {
	excellent: "bg-green-100 text-green-700",
	warning: "bg-amber-100 text-amber-700",
	critical: "bg-red-100 text-red-700",
};

function Readyness({title = "AI Readiness", score, maxScore = 100, status, statusTone = "excellent", metrics, notes = "Top 18% of websites"}: ReadynessProps) {
	const radius = 45;
	const circumference = 2 * Math.PI * radius;
	const percentage = Math.max(0, Math.min(1, score / maxScore));
	const dashOffset = circumference * (1 - percentage);

	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-1 bg-white rounded-3xl border border-gray-200 p-8 flex flex-col items-center justify-center shadow-xl">
					<div className="w-full pb-8">
						<p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">{title}</p>

						<h2 className="mt-2 text-2xl font-semibold tracking-tight flex items-center ">
							AI Readiness Score <Tooltip content="Your aggregate grade combining crawlability, semantic structure, content density, and technical SEO. Improve this score by completing the tasks in your Top Improvements list." />
						</h2>
					</div>
					<div className="relative w-48 h-48 flex items-center justify-center mb-6">
						<svg className="w-full h-full" viewBox="0 0 100 100">
							<defs>
								<linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
									<stop offset="0%" stopColor="#22c55e" />
									<stop offset="100%" stopColor="#ea3a3f" />
								</linearGradient>
							</defs>
							<circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10" />
							<circle cx="50" cy="50" r="45" fill="none" stroke="url(#progressGradient)" strokeWidth="10" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={dashOffset} className="transition-all duration-700 ease-out" />
							<text x="50" y="52" textAnchor="middle" fontSize="24" fontWeight="700" fill="#111827">
								{score}
							</text>
							<text x="50" y="68" textAnchor="middle" fontSize="8" fill="#6b7280" letterSpacing="0.15em">
								/{maxScore}
							</text>
						</svg>
					</div>
					<div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${statusStyles[statusTone]}`}>
						<CheckCircle className="w-4 h-4" />
						Status: {status}
					</div>
					<div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${statusStyles[statusTone]} bg-transparent`}>{notes}</div>
				</div>

				<div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
					{metrics.map((metric) => {
						const deltaColor = metric.deltaDirection === "up" ? "text-green-700" : metric.deltaDirection === "down" ? "text-red-500" : "text-gray-500";

						return (
							<div key={metric.label} className="bg-white rounded-3xl border border-gray-200 p-6 flex flex-col justify-between hover:bg-gray-50 transition-colors duration-200">
								<div className="flex justify-between items-start mb-6">
									<span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{metric.label}</span>
									<metric.icon className="w-5 h-5 text-gray-500" />
								</div>
								<div className="flex items-end justify-between">
									<span className="text-3xl font-bold text-gray-900">{metric.value}</span>
									<span className={`md:text-sm text-[11px] text-right font-normal  flex items-center ${deltaColor}`}>{metric.info}</span>
								</div>
							</div>
						);
					})}
				</div>
			</div>{" "}
		</>
	);
}

export default memo(Readyness);
