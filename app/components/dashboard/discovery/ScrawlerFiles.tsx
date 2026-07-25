"use client";

import {
	FileText,
	Check,
	File,
	Cpu,
	AlertTriangle,
	LucideIcon,
} from "lucide-react";

// 1. Define the TypeScript type/interface for strict safety
export interface CrawlerFileStatus {
	id: string;
	title: string;
	description: string;
	icon: string; // We'll map this string to a Lucide icon component below
	statusLabel: string;
	statusType: "success" | "warning" | "error"; // To determine colors
}

// 2. Define the props interface for the component
interface ScrawlerFilesProps {
	files: CrawlerFileStatus[];
}

// Dictionary to map icon string names to actual Lucide components
const iconMap: Record<string, LucideIcon> = {
	FileText: FileText,
	File: File,
	Cpu: Cpu,
};

export function ScrawlerFiles({ files }: ScrawlerFilesProps) {
	return (
		<div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
			{files.map((file) => {
				// Dynamically resolve the icon
				const IconComponent = iconMap[file.icon] || File;

				// Determine styling based on statusType
				const isSuccess = file.statusType === "success";

				// Main icon color
				const iconColor = isSuccess ? "text-slate-500" : "text-red-500";

				// Badge styling
				const badgeBg = isSuccess ? "bg-emerald-50" : "bg-red-50";
				const badgeText = isSuccess
					? "text-emerald-700"
					: "text-red-700";
				const badgeBorder = isSuccess
					? "border-emerald-200"
					: "border-red-200";
				const StatusIcon = isSuccess ? Check : AlertTriangle;

				return (
					<div
						key={file.id}
						className="bg-white rounded-2xl border border-slate-200 p-6 flex items-start justify-between shadow-sm hover:border-l-4 hover:border-l-red-500 hover:shadow-md transition-all cursor-pointer hover:bg-slate-50"
					>
						<div>
							<div className="flex items-center gap-2 mb-2">
								<IconComponent
									className={`w-5 h-5 ${iconColor}`}
								/>
								<h3 className="text-xl font-semibold text-slate-900">
									{file.title}
								</h3>
							</div>
							<p className="text-sm text-slate-500">
								{file.description}
							</p>
						</div>
						<div
							className={`${badgeBg} ${badgeText} px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase flex items-center gap-1 border ${badgeBorder}`}
						>
							<StatusIcon className="w-3.5 h-3.5" />
							{file.statusLabel}
						</div>
					</div>
				);
			})}
		</div>
	);
}
