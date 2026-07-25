import { Activity } from "lucide-react";

// 1. Define the single data prop structure
export type ExecutiveSummaryData = {
	badgeText: string;
	title: string;
	description: string;
	priority: {
		label: string;
		note: string;
		tone: "high" | "medium" | "low";
	};
};

const priorityPillStyles = {
	high: "bg-rose-50 text-rose-600",
	medium: "bg-amber-50 text-amber-600",
	low: "bg-emerald-50 text-emerald-600",
};

const priorityTextStyles = {
	high: "text-rose-600",
	medium: "text-amber-600",
	low: "text-emerald-600",
};

export function ExecutiveSummarySection({
	data,
}: {
	data: ExecutiveSummaryData;
}) {
	// Safety check
	if (!data) return null;

	return (
		<div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 ">
			<div className="md:col-span-8 bg-white rounded-2xl border mt-10 md:mt-0 border-gray-200 p-2 md:p-8 shadow-sm">
				<div className="max-w-2xl">
					<div className="flex items-center gap-3">
						<p className="text-xs font-bold uppercase tracking-widest text-indigo-500">{data.badgeText}</p>
						<span className="relative flex h-2.5 w-2.5">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
							<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
						</span>
					</div>

					<h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">{data.title}</h2>
					<p className="mt-3 text-gray-500 leading-relaxed text-base">{data.description}</p>
				</div>
			</div>

			<div className="md:col-span-4 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-50"></div>
				<div className="relative z-10 flex flex-col items-center">
					<div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">ACTION PRIORITY</div>
					{/* Make the large text color match the priority tone */}
					<div className={`text-6xl font-bold leading-none tracking-tight ${priorityTextStyles[data.priority.tone]}`}>{data.priority.label}</div>
					<div className={`mt-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${priorityPillStyles[data.priority.tone]}`}>{data.priority.note}</div>
				</div>
			</div>
		</div>
	);
}
