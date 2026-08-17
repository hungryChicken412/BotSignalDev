"use client";



const colors = {
	success: {
		dot: "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]",
	},
	warning: {
		dot: "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]",
	},
	error: {
		dot: "bg-rose-400 shadow-[0_0_6px_rgba(251,113,133,0.8)]",
	},
	node: {
		dot: "bg-gray-400 shadow-[0_0_6px_rgba(251,113,133,0.8)]",
	},
};

function CrawlJourney({ crawlSteps }: { crawlSteps: any }) {
	return (
		// Container constrained to max 150px with a premium glassmorphism feel
		<div className="md:w-[39%] w-full m-auto md:ml-auto h-fit bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
			{/* Header */}
			<div className="flex flex-col gap-1.5 mb-4">
				<div className="flex items-center justify-between">
					<span className="text-[12.5px] font-bold uppercase tracking-widest text-indigo-500">AI Discovery Journey </span>
					<span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-md font-bold text-emerald-600 border border-emerald-100/50 shadow-sm">92/100</span>
				</div>
				<h2 className="text-sm font-bold text-slate-800 leading-tight tracking-tight">How AI discovers your website</h2>
			</div>

			{/* Timeline */}
			<div className="relative space-y-0">
				{crawlSteps.map((step : any, index : any) => {
					const style = colors[step.status as keyof typeof colors];

					return (
						<div key={step.title} className="relative flex gap-2 pb-8 last:pb-0">
							{/* Vertical connecting line */}
							{index !== crawlSteps.length - 1 && <div className="absolute left-[3px] top-2.5 h-[calc(100%-2px)] w-[1px] bg-gradient-to-b from-slate-200 to-slate-100" />}

							{/* Glowing Dot */}
							<div className="relative z-10 flex-shrink-0 mt-[3px]">
								<div className={`h-1.5 w-1.5 rounded-full ${style.dot} ring-[1.5px] ring-white`} />
							</div>

							{/* Content */}
							<div className="flex-1 min-w-0 flex flex-col justify-center">
								<h3 className="text-sm font-semibold text-slate-700 truncate">{step.title}</h3>
								<p className="text-md text-slate-400 truncate mt-0.5">{step.description}</p>
							</div>
						</div>
					);
				})}
			</div>

			<hr className="mt-4" />
		</div>
	);
}

export default CrawlJourney;
