

import { Globe, Cpu, FileText, ArrowRight } from "lucide-react";

export default function HowItWorks() {
	const steps = [
		{
			id: 1,
			title: "Submit your URL",
			description:
				"Drop your website URL and email into our secure form. No credit card, no account required.",
			icon: Globe,
			colorClass: "text-sky-500",
			bgClass: "bg-sky-50",
			borderClass: "border-sky-100/50",
			hoverGradient: "from-sky-100/30",
		},
		{
			id: 2,
			title: "AI Analysis",
			description:
				"Our agents simulate an LLM web crawl, scraping your visible text and extracting semantic SEO tags to analyze your site's structure.",
			icon: Cpu,
			colorClass: "text-purple-500",
			bgClass: "bg-purple-50",
			borderClass: "border-purple-100/50",
			hoverGradient: "from-purple-100/30",
		},
		{
			id: 3,
			title: "Get Your Report",
			description:
				"Within minutes, receive a beautifully formatted PDF report directly in your inbox detailing your score and actionable fixes.",
			icon: FileText,
			colorClass: "text-fuchsia-500",
			bgClass: "bg-fuchsia-50",
			borderClass: "border-fuchsia-100/50",
			hoverGradient: "from-fuchsia-100/30",
		},
	];

	return (
		<section id="how-it-works" className="py-section-gap px-4 md:px-container-padding relative overflow-hidden">
			{/* Premium subtle background glow */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-purple-400/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

			<div className="max-w-[1516px] mx-auto flex flex-col items-center relative z-10 text-center">
				{/* Section Header */}
				<div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-xl border border-white/80 rounded-full px-4 py-1.5 mb-8 shadow-sm">
					<span className="font-label-caps text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">Step-by-Step</span>
				</div>

				<h2 className="font-display-xl text-[42px] md:text-[56px] leading-[1.1] text-on-surface mb-6 tracking-tight">
					How it <br className="md:hidden" />
					<span className="text-on-surface-variant font-light">works.</span>
				</h2>

				<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-20 leading-relaxed">Get a complete diagnostic of your website's AI readiness without writing a single line of code. Clear, actionable, and fast.</p>

				{/* Steps Container */}
				<div className="relative w-full">
					{/* Connecting Line (Desktop Only) */}
					<div className="hidden md:block absolute top-14 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent -z-10"></div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full text-left items-stretch">
						{steps.map((step, index) => {
							const Icon = step.icon;
							return (
								<div key={step.id} className="group p-10 bg-white/50 backdrop-blur-2xl rounded-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col relative overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500">
									{/* Subtle hover gradient background */}
									<div className={`absolute inset-0 bg-gradient-to-br ${step.hoverGradient} to-transparent -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

									{/* Giant Decorative Number */}
									<div className="absolute -top-6 -right-6 text-[140px] font-display-xl leading-none select-none z-0 text-transparent bg-clip-text bg-gradient-to-br from-gray-100 to-transparent group-hover:from-gray-200/50 transition-colors duration-500 pointer-events-none">{step.id}</div>

									{/* Icon Container */}
									<div className="relative z-10 mb-8 inline-flex">
										<div className={`p-3.5 ${step.bgClass} rounded-xl border ${step.borderClass} shadow-sm group-hover:scale-110 transition-transform duration-500`}>
											<Icon className={`w-6 h-6 ${step.colorClass}`} strokeWidth={2} />
										</div>
									</div>

									{/* Content */}
									<div className="relative z-10 flex-1 flex flex-col">
										<h3 className="font-headline-md text-[28px] font-medium text-on-surface tracking-tight mb-4 group-hover:text-gray-900 transition-colors duration-300">{step.title}</h3>
										<p className="font-body-md text-base text-on-surface-variant leading-relaxed">{step.description}</p>
									</div>

									{/* Arrow Indicator (Desktop) */}
									{index !== steps.length - 1 && (
										<div className="hidden md:flex absolute top-1/2 -right-6 -translate-y-1/2 w-12 h-12 items-center justify-center text-gray-300 z-20 pointer-events-none">
											<ArrowRight className="w-6 h-6 transform translate-x-4 group-hover:translate-x-6 group-hover:text-gray-400 transition-all duration-500" />
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
