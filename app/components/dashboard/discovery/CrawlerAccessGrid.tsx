"use client";

import { useState } from "react";
import {
	CheckCircle,
	XCircle,
	AlertTriangle,
	AlertCircle,
	LucideIcon,
} from "lucide-react";
import Image from "next/image";

// 1. TypeScript Interfaces for better type safety
interface MetadataItem {
	name: string;
	state: "success" | "warning" | "error" | string;
	detail: string;
}

interface BotData {
	id: string;
	name: string;
	iconLogo: string;
	status: string;
	statusColor: string;
	StatusIcon: string; // Received as a string from JSON props
	metadata: MetadataItem[];
}

interface CrawlerAccessGridProps {
	botsData: BotData[];
}

// 2. Icon Mapping Object
// This allows us to safely convert the string from JSON into a valid React Component
const IconMap: Record<string, LucideIcon> = {
	CheckCircle,
	AlertTriangle,
	XCircle,
	AlertCircle,
};

// 3. Helper to map metadata states to the correct icon and colors
const getMetadataUI = (state: string) => {
	switch (state) {
		case "success":
			return {
				Icon: CheckCircle,
				iconColor: "text-emerald-600",
				badgeStyle: "text-slate-500 bg-slate-100",
			};
		case "warning":
			return {
				Icon: AlertCircle,
				iconColor: "text-orange-500",
				badgeStyle: "text-slate-500 bg-slate-100",
			};
		case "error":
			return {
				Icon: XCircle,
				iconColor: "text-red-600",
				badgeStyle: "text-red-700 bg-red-50",
			};
		default:
			return {
				Icon: CheckCircle,
				iconColor: "text-slate-400",
				badgeStyle: "text-slate-500 bg-slate-100",
			};
	}
};

export default function CrawlerAccessGrid({
	botsData,
}: CrawlerAccessGridProps) {
	// 4. Safely initialize state with a fallback
	const [activeBotId, setActiveBotId] = useState<string>(
		botsData?.[0]?.id || "",
	);

	// Early return if no data is provided to prevent crashes
	if (!botsData || botsData.length === 0) {
		return <div className="p-4 text-slate-500">No bot data available.</div>;
	}

	// Find the data for the currently selected bot
	const activeBot = botsData.find((bot) => bot.id === activeBotId);

	return (
		<div className="flex flex-col gap-6 w-full md:w-[60%]">
			{/* Cards Section */}
			<div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
				<div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-4">
					<h3 className="text-2xl font-semibold text-slate-900">
						Crawler Access Grid
					</h3>
				</div>

				<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
					{/* Map over the array to render the buttons */}
					{botsData.map((bot) => {
						const isActive = activeBotId === bot.id;

						// Dynamically grab the correct icon component from the map, fallback to AlertCircle
						const CurrentStatusIcon =
							IconMap[bot.StatusIcon] || AlertCircle;

						return (
							<button
								key={bot.id}
								onClick={() => setActiveBotId(bot.id)}
								className={`flex flex-col items-center justify-center text-center p-4 rounded-2xl border transition-all duration-200 ${
									isActive
										? "border-slate-900 bg-slate-100 shadow-md scale-[1.02]"
										: "border-slate-200 bg-slate-50 hover:border-slate-400"
								}`}
							>
								<div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-2 overflow-hidden">
									<Image
										width={32}
										height={32}
										alt={`${bot.name} icon`}
										src={bot.iconLogo}
										className="object-contain"
									/>
								</div>

								<div
									className={`flex items-center text-[11px] uppercase tracking-[0.18em] font-semibold mt-1 gap-1 ${bot.statusColor}`}
								>
									<CurrentStatusIcon className="w-4 h-4" />
									{bot.status}
								</div>
							</button>
						);
					})}
				</div>
			</div>

			{/* Metadata Section */}
			{activeBot && (
				<div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
					<div className="mb-6 border-b border-slate-200 pb-4">
						<h3 className="text-xl font-semibold text-slate-900">
							Technical Metadata for {activeBot.name}
						</h3>
					</div>

					<div className="space-y-4">
						{/* Render the specific metadata for the active bot */}
						{activeBot.metadata.map((item, index) => {
							const { Icon, iconColor, badgeStyle } =
								getMetadataUI(item.state);

							return (
								<div
									key={index}
									className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-slate-200 last:border-0 group gap-2"
								>
									<div className="flex items-center gap-3">
										<Icon
											className={`w-5 h-5 ${iconColor}`}
										/>
										<span className="text-base font-medium text-slate-900 group-hover:underline decoration-slate-300 underline-offset-4">
											{item.name}
										</span>
									</div>

									<span
										className={`text-sm font-mono px-2 py-1 rounded w-fit ${badgeStyle}`}
									>
										{item.detail}
									</span>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}
