import {Bot, Code2, LayoutTemplate, Search, Sparkles, CheckCircle2} from "lucide-react";

export default function WhyItMatters() {
	return (
		<section className="py-section-gap px-4 md:px-container-padding relative overflow-hidden">
			{/* Ambient Premium Background Glows */}
			<div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-purple-400/15 blur-[120px] rounded-full pointer-events-none -z-10"></div>
			<div className="absolute bottom-0 -right-1/4 w-[600px] h-[600px] bg-sky-400/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>

			<div className="max-w-[1516px] mx-auto relative z-10">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
					{/* Left: Problem / Education */}
					<div className="flex flex-col gap-10">
						<div>
							{/* Premium Pill Label */}
							<div className="inline-flex items-center gap-2 bg-white/60 dark:bg-white/5 border border-white/80 dark:border-white/10 backdrop-blur-xl rounded-full px-4 py-1.5 w-max mb-8 shadow-sm">
								<span className="relative flex h-2 w-2">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
									<span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
								</span>
								<span className="font-label-caps text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">The New SEO</span>
							</div>

							<h2 className="font-display-xl text-[42px] md:text-[56px] leading-[1.1] text-on-surface tracking-tight mb-6">
								AI agents are the <br className="hidden md:block" /> new search engines. <br />
								<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-sky-500 pb-2 inline-block">Are you invisible?</span>
							</h2>

							<p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-xl">When users ask ChatGPT or Claude for recommendations, the AI crawls the web. If your website is bogged down with marketing fluff, bloated Javascript, or poor semantic structure, the AI simply skips you.</p>
						</div>

						{/* Feature Cards */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
							{/* Card 1 */}
							<div className="group bg-white/50 dark:bg-white/5 backdrop-blur-2xl border border-white/80 dark:border-white/10 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500">
								<div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 to-transparent dark:from-purple-900/20 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
								<div className="bg-purple-50 dark:bg-purple-500/10 border border-purple-100/50 dark:border-purple-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
									<Search className="w-5 h-5 text-purple-600 dark:text-purple-400" strokeWidth={2} />
								</div>
								<h4 className="font-headline-md text-xl font-medium text-on-surface mb-2 tracking-tight group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">Semantic Clarity</h4>
								<p className="font-body-md text-sm text-on-surface-variant leading-relaxed">We check if your core value proposition is instantly readable by machine agents.</p>
							</div>

							{/* Card 2 */}
							<div className="group bg-white/50 dark:bg-white/5 backdrop-blur-2xl border border-white/80 dark:border-white/10 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500">
								<div className="absolute inset-0 bg-gradient-to-br from-sky-100/40 to-transparent dark:from-sky-900/20 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
								<div className="bg-sky-50 dark:bg-sky-500/10 border border-sky-100/50 dark:border-sky-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
									<LayoutTemplate className="w-5 h-5 text-sky-500 dark:text-sky-400" strokeWidth={2} />
								</div>
								<h4 className="font-headline-md text-xl font-medium text-on-surface mb-2 tracking-tight group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">Information Density</h4>
								<p className="font-body-md text-sm text-on-surface-variant leading-relaxed">We calculate the exact ratio of hard, extractable facts versus useless marketing fluff.</p>
							</div>
						</div>
					</div>

					{/* Right: Sleek SaaS Mockup */}
					<div className="relative w-full aspect-square md:aspect-auto md:h-[650px] flex items-center justify-center group perspective-1000 z-10">
						{/* Dramatic 3D Glow behind mockup */}
						<div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-sky-500/20 blur-3xl -z-10 rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none"></div>

						{/* The Mockup Window */}
						<div className="w-full max-w-lg bg-white/60 dark:bg-[#1A1A1A]/60 backdrop-blur-3xl border border-white/80 dark:border-white/10 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transform rotate-y-[-5deg] rotate-x-[5deg] group-hover:rotate-0 group-hover:scale-[1.02] transition-all duration-700 ease-out overflow-hidden transform-gpu">
							{/* Browser Chrome */}
							<div className="bg-white/50 dark:bg-white/5 border-b border-gray-200/50 dark:border-white/10 px-5 py-4 flex items-center gap-4 backdrop-blur-md">
								<div className="flex gap-2">
									<div className="w-3 h-3 rounded-full bg-red-400/90 shadow-sm"></div>
									<div className="w-3 h-3 rounded-full bg-amber-400/90 shadow-sm"></div>
									<div className="w-3 h-3 rounded-full bg-green-400/90 shadow-sm"></div>
								</div>
								<div className="flex-1 flex justify-center">
									<div className="bg-gray-100/50 dark:bg-black/40 border border-gray-200/50 dark:border-white/5 text-gray-500 dark:text-gray-400 font-body-md text-xs px-6 py-1.5 rounded-full flex items-center gap-2 shadow-inner">
										<Bot className="w-3.5 h-3.5 text-purple-500" />
										horizon-audit.ai/analyze
									</div>
								</div>
							</div>

							{/* Mockup Body */}
							<div className="p-8">
								<div className="flex justify-between items-end border-b border-gray-200/50 dark:border-white/10 pb-8 mb-8">
									<div>
										<h3 className="font-headline-md text-[28px] font-medium text-on-surface mb-2 tracking-tight">LLM Readiness</h3>
										<p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2.5 uppercase tracking-wider">
											<span className="relative flex h-2.5 w-2.5">
												<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
												<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
											</span>
											Scan Complete
										</p>
									</div>

									{/* Circular Score Badge */}
									<div className="relative w-20 h-20 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
										<svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
											<path className="text-gray-200 dark:text-gray-800" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
											<path className="text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all duration-1000 ease-out" strokeDasharray="92, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
										</svg>
										<span className="font-display-xl text-2xl font-bold text-on-surface tracking-tighter">92</span>
									</div>
								</div>

								{/* Data Rows */}
								<div className="space-y-4">
									{/* Row 1 */}
									<div className="bg-white/60 dark:bg-white/5 border border-white/80 dark:border-white/10 p-5 rounded-2xl flex items-center gap-5 shadow-[0_4px_15px_rgb(0,0,0,0.02)] hover:shadow-md transition-all">
										<div className="bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 p-2.5 rounded-xl">
											<CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" strokeWidth={2.5} />
										</div>
										<div className="flex-1">
											<div className="flex justify-between items-center mb-2">
												<span className="font-headline-md text-[15px] font-medium text-on-surface">Information Density</span>
												<span className="text-green-600 dark:text-green-400 font-bold text-sm">88%</span>
											</div>
											<div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden shadow-inner">
												<div className="bg-gradient-to-r from-green-400 to-green-500 h-full w-[88%] rounded-full"></div>
											</div>
										</div>
									</div>

									{/* Row 2 */}
									<div className="bg-white/60 dark:bg-white/5 border border-white/80 dark:border-white/10 p-5 rounded-2xl flex items-center gap-5 shadow-[0_4px_15px_rgb(0,0,0,0.02)] hover:shadow-md transition-all">
										<div className="bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 p-2.5 rounded-xl">
											<CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" strokeWidth={2.5} />
										</div>
										<div className="flex-1">
											<div className="flex justify-between items-center">
												<span className="font-headline-md text-[15px] font-medium text-on-surface">Context Extraction</span>
												<span className="text-gray-500 dark:text-gray-400 text-sm font-medium bg-gray-100 dark:bg-white/5 px-2.5 py-1 rounded-md">Clear</span>
											</div>
										</div>
									</div>

									{/* Row 3 */}
									<div className="bg-white/60 dark:bg-white/5 border border-white/80 dark:border-white/10 p-5 rounded-2xl flex items-center gap-5 shadow-[0_4px_15px_rgb(0,0,0,0.02)] hover:shadow-md transition-all">
										<div className="bg-sky-50 dark:bg-sky-500/10 border border-sky-100 dark:border-sky-500/20 p-2.5 rounded-xl">
											<Code2 className="w-5 h-5 text-sky-500 dark:text-sky-400" strokeWidth={2.5} />
										</div>
										<div className="flex-1">
											<div className="flex justify-between items-center">
												<span className="font-headline-md text-[15px] font-medium text-on-surface">DOM Structure</span>
												<span className="text-gray-500 dark:text-gray-400 text-sm font-medium bg-gray-100 dark:bg-white/5 px-2.5 py-1 rounded-md">Optimized</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
