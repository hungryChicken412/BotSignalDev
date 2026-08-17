"use client";

import { AlertCircle, AlertTriangle } from "lucide-react";

import Tooltip from "@/app/components/Tooltip";





type ImprovementItem = {
	title: string;
	notes: string;
	points: number;
	time?: number;
};

type Priority = "highPriority" | "mediumPriority" | "lowPriority";

type ImprovementsProps = {
	Improvements: Record<Priority, ImprovementItem[]>;
};

export default function PriorityImprovements({
	Improvements,
}: ImprovementsProps) {
	return (
		<div className="bg-white rounded-3xl border border-gray-200 p-0">
			<h3 className="text-2xl font-bold text-gray-900 mb-8 p-8 pb-0 flex items-center">
				Top Improvements <Tooltip content="A prioritized list of actionable fixes. Resolving these specific issues will directly increase your overall AI Readiness score by the point values shown." />
			</h3>
			<div className="space-y-6 p-2">
				{Improvements.highPriority.map((item, index) => (
					<div key={index + "highPriority"} className="flex items-center justify-between p-6 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors duration-200">
						<div className="flex items-start  gap-2 md:gap-6">
							<div className="w-4 h-4 rounded  bg-red-100 md:h-8 md:w-8 text-red-600 flex items-center justify-center shrink-0 mt-1">
								<AlertCircle className="w-[18px] h-[18px]" />
							</div>
							<div>
								<p className="text-lg font-medium text-gray-900">{item.title}</p>
								<p className="text-lg text-sm text-gray-600">2 min</p>
							</div>
						</div>
						<div className="text-right hidden md:block">
							<span className="text-2xl font-bold text-green-700">+{item.points}</span>
							<p className="text-xs font-semibold uppercase tracking-wider text-gray-500">pts</p>
						</div>
					</div>
				))}

				{Improvements.mediumPriority.map((item, index) => (
					<div key={index + "medmPriority"} className="flex items-center justify-between p-6 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors duration-200">
						<div className="flex items-start gap-2 md:gap-6">
							<div className="w-4 h-4	 rounded md:h-8 md:w-8 bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0 mt-1">
								<AlertCircle className="w-[18px] h-[18px]" />
							</div>
							<div>
								<p className="text-lg font-medium text-gray-900">{item.title}</p>
								<p className="text-lg text-sm text-gray-600">4 min</p>
							</div>
						</div>
						<div className="text-right hidden md:block">
							<span className="text-2xl font-bold text-green-700">+{item.points}</span>
							<p className="text-xs font-semibold uppercase tracking-wider text-gray-500">pts</p>
						</div>
					</div>
				))}

				{Improvements.lowPriority.map((item, index) => (
					<div key={index + "lowwPriority"} className="flex items-center justify-between p-6 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors duration-200">
						<div className="flex items-start gap-2 gap-6">
							<div className="w-4 h-4 rounded md:h-8 md:w-8 bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-1">
								<AlertCircle className="w-[18px] h-[18px]" />
							</div>
							<div>
								<p className="text-lg font-medium text-gray-900">{item.title}</p>
								<p className="text-lg text-sm text-gray-600">4 min</p>
							</div>
						</div>
						<div className="text-right hidden md:block">
							<span className="text-2xl font-bold text-green-700">+{item.points}</span>
							<p className="text-xs font-semibold uppercase tracking-wider text-gray-500">pts</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
