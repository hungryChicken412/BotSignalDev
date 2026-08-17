"use client";
import React, {memo} from "react";








import {
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	LabelList,
	Cell,
} from "recharts";



export type DimensionDataItem = {
	subject: string;
	score: number;
	fullMark: number;
};

export type DimensionData = DimensionDataItem[];

export type DataRadarProps = {
	dimensionData: DimensionData;
};

function DataRadar({ dimensionData }: DataRadarProps) {
	const getBarColor = (score: number) => {
		if (score < 40) return "#fab4b6"; // red
		if (score < 60) return "#f97316"; // orange
		if (score < 75) return "#eac971"; // yellow
		return "#71d295"; // green
	};
	return (
		<div className="rounded-3xl border border-gray-200 bg-white ">
			<h3 className="mb-6 text-xl font-semibold p-8">Dimension Analysis</h3>

			<div className="h-96">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={dimensionData} layout="vertical" margin={{top: 10, right: 30, left: 0, bottom: 10}}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis type="number" domain={[0, 100]} />
						<YAxis type="category" dataKey="subject" width={120} />
						<Tooltip formatter={(value) => [`${value}/100`, "Score"]} />
						<Bar dataKey="score" radius={[0, 6, 6, 0]}>
							{dimensionData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
							))}

							<LabelList dataKey="score" position="right" />
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export default memo(DataRadar);


