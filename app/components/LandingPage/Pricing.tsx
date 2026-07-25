import {Check, Sparkles, Building2, Zap} from "lucide-react";
import Link from "next/link";

export default function PricingSection() {
	return (
		<section className="py-section-gap px-4 md:px-container-padding relative">
			{/* Optional subtle background glow for the whole section */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-purple-400/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

			<div className="max-w-[1516px] mx-auto relative z-10">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
					{/* Column 1: Info */}
					<div className="p-10 flex flex-col justify-center bg-white/40 backdrop-blur-2xl rounded-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
						<h2 className="font-display-xl text-[42px] leading-[1.1] text-on-surface mb-6 tracking-tight">
							Simple, <br />
							<span className="text-on-surface-variant font-light">transparent pricing.</span>
						</h2>
						<p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">Pay only for the scans you need. No monthly subscriptions or hidden fees. Start auditing your site immediately with absolute clarity.</p>
					</div>

					{/* Column 2: Free Tier (1 Scan) */}
					<div className="p-10 bg-white/50 backdrop-blur-2xl rounded-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col relative overflow-hidden group hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-500">
						<div className="absolute inset-0 bg-gradient-to-br from-sky-100/30 to-transparent -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

						<div className="flex items-center gap-3 mb-4">
							<div className="p-2 bg-sky-50 rounded-lg border border-sky-100/50">
								<Zap className="w-5 h-5 text-sky-500" />
							</div>
							<h3 className="font-headline-md text-[28px] font-medium text-on-surface tracking-tight">Free Scan</h3>
						</div>

						<div className="font-display-xl text-[56px] text-on-surface mb-8 flex items-baseline tracking-tight">
							$0
							<span className="font-body-md text-base text-on-surface-variant ml-2 font-normal">/ 1 scan</span>
						</div>

						<ul className="space-y-5 mb-10 flex-1 font-body-md text-on-surface-variant">
							<li className="flex items-start gap-4">
								<div className="mt-1 bg-sky-100/50 p-1 rounded-full">
									<Check className="w-3.5 h-3.5 text-sky-600 shrink-0" strokeWidth={3} />
								</div>
								<span>1 Free Site Audit</span>
							</li>
							<li className="flex items-start gap-4">
								<div className="mt-1 bg-sky-100/50 p-1 rounded-full">
									<Check className="w-3.5 h-3.5 text-sky-600 shrink-0" strokeWidth={3} />
								</div>
								<span>LLM Compatibility Scoring</span>
							</li>
							<li className="flex items-start gap-4">
								<div className="mt-1 bg-sky-100/50 p-1 rounded-full">
									<Check className="w-3.5 h-3.5 text-sky-600 shrink-0" strokeWidth={3} />
								</div>
								<span>Information Density Analysis</span>
							</li>
							<li className="flex items-start gap-4">
								<div className="mt-1 bg-sky-100/50 p-1 rounded-full">
									<Check className="w-3.5 h-3.5 text-sky-600 shrink-0" strokeWidth={3} />
								</div>
								<span>PDF Report Delivery</span>
							</li>
						</ul>

						<Link href="#hero" className="w-full inline-flex justify-center items-center bg-white/80 backdrop-blur-md border border-gray-200/80 shadow-sm text-on-surface rounded-xl py-4 font-body-md font-medium hover:bg-white hover:shadow-md transition-all duration-300 active:scale-[0.98]">
							Get Started
						</Link>
					</div>

					{/* Column 3: Paid Bundle (5 Scans) - PREMIUM STYLING */}
					<div className="relative group rounded-2xl transform hover:-translate-y-2 transition-all duration-500 z-10">
						{/* Gradient Border Wrapper */}
						<div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-fuchsia-400 to-sky-400 rounded-2xl opacity-40 group-hover:opacity-100 blur-[2px] transition-opacity duration-500 -z-20"></div>
						<div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-fuchsia-300 to-sky-300 rounded-2xl p-[1px] -z-10"></div>

						{/* Ambient Glow */}
						<div className="absolute inset-0 bg-purple-500/5 blur-2xl rounded-3xl -z-30 group-hover:bg-purple-500/15 transition-colors duration-500"></div>

						<div className="h-full p-10 bg-white/70 backdrop-blur-2xl rounded-2xl flex flex-col relative overflow-hidden">
							<div className="absolute top-6 right-6 bg-gradient-to-r from-purple-600 to-sky-500 text-white shadow-md text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5">
								<Sparkles className="w-3.5 h-3.5 fill-white/20" />
								Popular
							</div>

							<div className="flex items-center gap-3 mb-4">
								<div className="p-2 bg-purple-50 rounded-lg border border-purple-100/50">
									<Sparkles className="w-5 h-5 text-purple-600" />
								</div>
								<h3 className="font-headline-md text-[28px] font-medium text-on-surface tracking-tight">Scan Bundle</h3>
							</div>

							<div className="font-display-xl text-[56px] mb-8 flex items-baseline tracking-tight">
								<span className="bg-clip-text text-transparent bg-gradient-to-br from-purple-700 to-sky-600">$9</span>
								<span className="font-body-md text-base text-on-surface-variant ml-2 font-normal">/ 5 scans</span>
							</div>

							<ul className="space-y-5 mb-10 flex-1 font-body-md text-on-surface-variant">
								<li className="flex items-start gap-4">
									<div className="mt-1 bg-purple-100/50 p-1 rounded-full">
										<Check className="w-3.5 h-3.5 text-purple-600 shrink-0" strokeWidth={3} />
									</div>
									<span className="font-medium text-on-surface">5 Comprehensive Site Audits</span>
								</li>
								<li className="flex items-start gap-4">
									<div className="mt-1 bg-purple-100/50 p-1 rounded-full">
										<Check className="w-3.5 h-3.5 text-purple-600 shrink-0" strokeWidth={3} />
									</div>
									<span>Predictive Attention Heatmaps</span>
								</li>
								<li className="flex items-start gap-4">
									<div className="mt-1 bg-purple-100/50 p-1 rounded-full">
										<Check className="w-3.5 h-3.5 text-purple-600 shrink-0" strokeWidth={3} />
									</div>
									<span>Competitor Benchmarking</span>
								</li>
								<li className="flex items-start gap-4">
									<div className="mt-1 bg-purple-100/50 p-1 rounded-full">
										<Check className="w-3.5 h-3.5 text-purple-600 shrink-0" strokeWidth={3} />
									</div>
									<span>API Access (JSON Results)</span>
								</li>
							</ul>

							<button className="w-full bg-gradient-to-r from-purple-600 to-sky-500 hover:from-purple-500 hover:to-sky-400 text-white shadow-[0_8px_20px_rgb(147,51,234,0.2)] hover:shadow-[0_12px_25px_rgb(147,51,234,0.3)] rounded-xl py-4 font-body-md font-medium transition-all duration-300 active:scale-[0.98]">Buy Bundle</button>
						</div>
					</div>
				</div>

				{/* Enterprise Banner - Elevated Structural Look */}
				<div className="mt-8 group relative bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-white/80 dark:border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-primary/20 transition-all duration-500 overflow-hidden">
					<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[80px] -z-10 group-hover:bg-primary/10 transition-colors duration-700 pointer-events-none"></div>

					<div className="flex flex-col md:flex-row items-center justify-between relative z-10 gap-8">
						<div className="flex items-center gap-6 w-full md:w-auto">
							<div className="bg-white/80 dark:bg-white/10 w-16 h-16 hidden md:flex items-center justify-center rounded-2xl shadow-sm group-hover:bg-primary/5 transition-colors duration-500">
								<Building2 className="w-8 h-8 text-on-surface-variant group-hover:text-primary transition-colors duration-500" />
							</div>
							<div>
								<h4 className="font-headline-md text-2xl text-on-surface mb-2 group-hover:text-primary transition-colors duration-300">High volume needs?</h4>
								<p className="font-body-md text-on-surface-variant max-w-xl leading-relaxed">Need to audit thousands of URLs or integrate our scoring models directly into your internal tooling? Let's talk scale.</p>
							</div>
						</div>

						<button className="w-full md:w-auto bg-white/80 dark:bg-white/10 backdrop-blur-md border border-outline-variant/30 shadow-sm text-on-surface rounded-2xl px-10 py-4 font-body-md font-medium hover:bg-white dark:hover:bg-white/20 hover:text-primary hover:border-primary/30 transition-all duration-300 active:scale-[0.98] whitespace-nowrap">Contact Sales</button>
					</div>
				</div>
			</div>
		</section>
	);
}
