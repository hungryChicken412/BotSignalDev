"use client";
import { type LucideIcon } from "lucide-react";

type DiagnosticCard = {
	title: string;
	description: string;
	icon: LucideIcon;
	badge: string;
	badgeTone?: "high" | "medium" | "low" | "default";
	iconTone?: string;
};

// Premium badge styles using soft backgrounds and subtle inset rings
const badgeStyles = {
	high: "bg-red-50 text-red-600 ring-1 ring-inset ring-red-600/10",
	medium: "bg-amber-50 text-amber-600 ring-1 ring-inset ring-amber-600/20",
	low: "bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-600/20",
	default: "bg-slate-50 text-slate-600 ring-1 ring-inset ring-slate-200"

};

export default function DiagnosticCard({title, description, icon: Icon, badge, badgeTone = "default", iconTone = "text-slate-600"}: DiagnosticCard) {
	return (
		<div className="group relative bg-white border border-neutral-200 rounded-2xl p-6 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.02)] hover:shadow-[0px_12px_28px_-4px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer">
			<div className="flex justify-between items-start mb-5">
				{/* Elevated Icon Container */}
				<div className="p-2.5 bg-slate-50/80 rounded-xl ring-1 ring-slate-100  group-hover:bg-white group-hover:shadow-sm group-hover:ring-slate-200 transition-all duration-300">
					<Icon className={`${iconTone} w-5 h-5`} strokeWidth={1.75} />
				</div>

				{/* Refined Badge */}
				<span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] ${badgeStyles[badgeTone]}`}>{badge}</span>
			</div>

			{/* Typography Hierarchy */}
			<h4 className="text-[15px] font-semibold text-slate-900 mb-1.5 tracking-tight">{title}</h4>
			<p className="text-sm text-slate-500 leading-relaxed">{description}</p>
		</div>
	);
}
