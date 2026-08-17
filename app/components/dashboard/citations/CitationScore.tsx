import { memo } from "react";

import Tooltip from "@/app/components/Tooltip";




function CitationScore({score}: {score: number}) {
	const radius = 45;
	const circumference = 2 * Math.PI * radius;

	const maxScore = 100;
	const percentage = Math.max(0, Math.min(1, score / maxScore));
	const dashOffset = circumference * (1 - percentage);
	return (
		<div className="md:col-span-4 bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col items-center justify-center relative  group shadow-sm">
			<div className="absolute inset-0 bg-neutral-50 opacity-0  transition-opacity duration-300 pointer-events-none"></div>

			<h2 className="text-2xl font-bold text-gray-900 mb-6 w-full text-left flex items-center">
				Quoteability Score <Tooltip content="Measures the likelihood of an AI model extracting and directly quoting your exact text. Higher scores indicate dense, highly factual content." />
			</h2>

			<div className="relative w-48 h-48 flex items-center justify-center z-10">
				<svg className="w-full h-full" viewBox="0 0 100 100">
					<defs>
						<linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#6366f1" />
							<stop offset="100%" stopColor="#22c55e" />
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

			<div className="mt-6 flex items-center gap-2 text-sm text-neutral-500 relative z-10">
				<span className="w-2 h-2 rounded-full bg-neutral-900"></span>
				Ideally over 80%

			</div>
		</div>
	);
}

export default memo(CitationScore);
