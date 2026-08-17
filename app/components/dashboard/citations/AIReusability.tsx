"use client";

import React, {memo} from "react";
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell} from "recharts";





// 1. Define the single data prop structure
export type ReusabilityData = {
	title?: string;
	score: number;
	comparisonText: string;
	chartData: Array<{
		name: string;
		value: number;
		gradient: string; // e.g., "colorReusable", "colorEditing", "colorMarketing"
	}>;
};

function AIReusability({data}: {data: ReusabilityData}) {
	// Safety check
	console.log(data);

	const sectionTitle = "Content Reusability Status";

	return (
		<div className="md:col-span-8 bg-white border border-gray-100 rounded-2xl p-8 flex flex-col justify-between shadow-[0px_4px_20px_-4px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0px_8px_24px_-4px_rgba(0,0,0,0.08)]">
			{/* Header Section */}
			<div className="mb-10">
				<h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">{sectionTitle} </h2>
				<div className="flex items-baseline gap-2">
					<p className="text-4xl font-semibold text-gray-900 tracking-tight">{data.score}%</p>
					<p className="text-sm font-medium text-gray-500">{data.comparisonText}</p>
				</div>
			</div>

			{/* Chart Section */}
			<div className="w-full h-52">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						layout="vertical"
						data={data.chartData}
						margin={{top: 0, right: 10, bottom: 0, left: 0}}
						barSize={12} // Thinner, more elegant bars
					>
						{/* Gradient Definitions */}
						<defs>
							<linearGradient id="colorReusable" x1="0" y1="0" x2="1" y2="0">
								<stop offset="0%" stopColor="#059669" stopOpacity={1} />
								<stop offset="100%" stopColor="#34d399" stopOpacity={1} />
							</linearGradient>
							<linearGradient id="colorEditing" x1="0" y1="0" x2="1" y2="0">
								<stop offset="0%" stopColor="#d97706" stopOpacity={1} />
								<stop offset="100%" stopColor="#fbbf24" stopOpacity={1} />
							</linearGradient>
							<linearGradient id="colorMarketing" x1="0" y1="0" x2="1" y2="0">
								<stop offset="0%" stopColor="#e11d48" stopOpacity={1} />
								<stop offset="100%" stopColor="#fb7185" stopOpacity={1} />
							</linearGradient>
						</defs>

						<XAxis type="number" hide domain={[0, 100]} />

						<YAxis
							dataKey="name"
							type="category"
							axisLine={false}
							tickLine={false}
							width={140}
							tick={{
								fill: "#64748b",
								fontSize: 18,

								fontWeight: 500,
								fontFamily: "inherit",
							}}
						/>

						{/* Premium Dark Tooltip */}
						<Tooltip
							cursor={{fill: "transparent"}} // Removes the clunky gray hover background
							contentStyle={{
								backgroundColor: "#1e293b",
								color: "#f8fafc",
								borderRadius: "10px",
								border: "none",
								padding: "8px 16px",
								boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
								fontSize: "13px",
								fontWeight: 500,
							}}
							itemStyle={{color: "#f8fafc"}}
							formatter={(value) => [`${value}%`, "Share"]}
						/>

						{/* Sleek Bars with Background Tracks */}
						<Bar
							dataKey="value"
							radius={4} // Fully rounded pill shape
							background={{fill: "#f8fafc", radius: 4}} // Subtle track behind the bar
							label={{
								position: "right",
								fill: "#94a3b8",
								fontSize: 23,
								fontWeight: 500,
								//formatter: (val: number) => `${val}%`,
								dx: 8, // Pushes the label slightly away from the bar
							}}
						>
							{data.chartData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={`url(#${entry.gradient})`} />
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export default memo(AIReusability);


