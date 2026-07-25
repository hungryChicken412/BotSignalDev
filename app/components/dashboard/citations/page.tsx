import React from "react";
import {
	BookOpen,
	ListOrdered,
	TableProperties,
	MessageSquare,
	BarChart3,
	Network,
	Scissors,
	Copy,
	CheckSquare,
	PlusCircle,
	List,
	Link,
} from "lucide-react";
import  CitationScore  from "@/app/components/dashboard/citations/CitationScore";

export default function CitationPotentialPage() {
	
	return (
		<main className="md:ml-64 pt-8 md:pt-28 px-4 md:px-8 max-w-7xl mx-auto pb-24 md:pb-16 flex flex-col gap-6 text-neutral-900 bg-neutral-50/50">
			{/* Bento Grid: Top Metrics */}
			<div className="grid grid-cols-1 md:grid-cols-12 gap-6">
				{/* Citation Score Gauge */}
				 <CitationScore score={0}/>

				

				{/* Content Reusability Visualization */}
				<div className="md:col-span-8 bg-white border border-neutral-200 rounded-xl p-6 flex flex-col justify-between shadow-sm">
					<div>
						<h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
							Content Reusability Status
						</h2>
						<p className="text-xl md:text-2xl font-medium text-neutral-900 mb-8">
							42% of your content is directly reusable by AI
							models without modification.
						</p>
					</div>

					<div className="w-full space-y-4">
						{/* Progress Bar Track */}
						<div className="h-4 w-full bg-neutral-100 rounded-full flex overflow-hidden">
							<div
								className="h-full bg-neutral-900"
								style={{ width: "42%" }}
							></div>
							<div
								className="h-full bg-neutral-300"
								style={{ width: "38%" }}
							></div>
							<div
								className="h-full bg-neutral-200"
								style={{ width: "20%" }}
							></div>
						</div>

						{/* Legend */}
						<div className="flex flex-wrap gap-6 pt-2">
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 rounded bg-neutral-900"></div>
								<span className="text-sm text-neutral-900 font-medium">
									42% Directly Reusable
								</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 rounded bg-neutral-300"></div>
								<span className="text-sm text-neutral-500">
									38% Needs Restructuring
								</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 rounded bg-neutral-200"></div>
								<span className="text-sm text-neutral-500">
									20% Low AI Value
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Diagnostic Grid */}
			<section className="flex flex-col gap-4">
				<h3 className="text-xl md:text-2xl font-semibold text-neutral-900">
					Citation Diagnostics
				</h3>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
					{/* Card 1 */}
					<div className="bg-white border border-neutral-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
						<div className="flex justify-between items-start mb-4">
							<BookOpen className="text-neutral-500 w-5 h-5" />
							<span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold tracking-widest">
								HIGH
							</span>
						</div>
						<h4 className="text-sm font-semibold text-neutral-900 mb-1">
							Clear Definitions
						</h4>
						<p className="text-sm text-neutral-500">
							Found 12 clear, standalone definitional sentences.
						</p>
					</div>

					{/* Card 2 */}
					<div className="bg-white border border-neutral-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
						<div className="flex justify-between items-start mb-4">
							<ListOrdered className="text-neutral-500 w-5 h-5" />
							<span className="px-2 py-0.5 rounded bg-yellow-100 text-black-600 text-[10px] font-bold tracking-widest">
								MED
							</span>
						</div>
						<h4 className="text-sm font-semibold text-neutral-900 mb-1">
							How-to Content
						</h4>
						<p className="text-sm text-neutral-500">
							Step-by-step structures detected, but lack schema
							markup.
						</p>
					</div>

					{/* Card 3 */}
					<div className="bg-white border border-neutral-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
						<div className="flex justify-between items-start mb-4">
							<TableProperties className="text-rose-600 w-5 h-5" />
							<span className="px-2 py-0.5 rounded border border-neutral-200 text-neutral-900 text-[10px] font-bold tracking-widest">
								LOW
							</span>
						</div>
						<h4 className="text-sm font-semibold text-neutral-900 mb-1">
							Tables &amp; Data
						</h4>
						<p className="text-sm text-neutral-500">
							Only 3 structured tables found. Improve data
							density.
						</p>
					</div>

					{/* Card 4 */}
					<div className="bg-white border border-neutral-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
						<div className="flex justify-between items-start mb-4">
							<MessageSquare className="text-neutral-500 w-5 h-5" />
							<span className="px-2 py-0.5 rounded bg-neutral-900 text-white text-[10px] font-bold tracking-widest">
								HIGH
							</span>
						</div>
						<h4 className="text-sm font-semibold text-neutral-900 mb-1">
							FAQs
						</h4>
						<p className="text-sm text-neutral-500">
							5 perfectly formatted, schema-ready FAQ blocks
							identified.
						</p>
					</div>

					{/* Card 5 */}
					<div className="bg-white border border-neutral-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
						<div className="flex justify-between items-start mb-4">
							<BarChart3 className="text-neutral-500 w-5 h-5" />
							<span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-900 text-[10px] font-bold tracking-widest">
								MED
							</span>
						</div>
						<h4 className="text-sm font-semibold text-neutral-900 mb-1">
							Original Statistics
						</h4>
						<p className="text-sm text-neutral-500">
							Unique data points detected, lacking explicit
							attribution anchors.
						</p>
					</div>

					{/* Card 6 */}
					<div className="bg-white border border-neutral-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
						<div className="flex justify-between items-start mb-4">
							<Network className="text-neutral-500 w-5 h-5" />
							<span className="px-2 py-0.5 rounded bg-neutral-900 text-white text-[10px] font-bold tracking-widest">
								HIGH
							</span>
						</div>
						<h4 className="text-sm font-semibold text-neutral-900 mb-1">
							Entity Coverage
						</h4>
						<p className="text-sm text-neutral-500">
							Rich semantic entity density found across core
							domain pages.
						</p>
					</div>
				</div>
			</section>

			{/* Bottom Bento Grid */}
			<div className="grid grid-cols-1 md:grid-cols-12 gap-6">
				{/* Quote-Worthy Paragraphs */}
				<div className="md:col-span-7 bg-white border border-neutral-200 rounded-xl p-6 flex flex-col shadow-sm">
					<div className="flex items-center gap-3 mb-6">
						<Scissors className="text-neutral-900 w-5 h-5" />
						<h3 className="text-xl font-semibold text-neutral-900">
							Quote-Worthy Snippets
						</h3>
					</div>

					<div className="space-y-4 flex-1">
						<div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 relative group">
							<p className="text-sm text-neutral-500 font-mono leading-relaxed pr-16">
								"The transition from heuristic-based search to
								generative retrieval mechanisms mandates a shift
								from keyword density to semantic entity
								relationships."
							</p>
							<button className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-neutral-200 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded shadow-sm flex items-center gap-1 hover:bg-neutral-50">
								<Copy className="w-3.5 h-3.5" />
								Copy
							</button>
						</div>

						<div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 relative group">
							<p className="text-sm text-neutral-500 font-mono leading-relaxed pr-16">
								"AI models prioritize content that provides
								high-density, definitive answers over narrative
								exposition when constructing synthesized
								responses."
							</p>
							<button className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-neutral-200 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded shadow-sm flex items-center gap-1 hover:bg-neutral-50">
								<Copy className="w-3.5 h-3.5" />
								Copy
							</button>
						</div>
					</div>
				</div>

				{/* Improvement Plan */}
				<div className="md:col-span-5 bg-white border border-neutral-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
					<div>
						<div className="flex items-center gap-3 mb-6">
							<CheckSquare className="text-neutral-900 w-5 h-5" />
							<h3 className="text-xl font-semibold text-neutral-900">
								Action Plan
							</h3>
						</div>

						<ul className="space-y-4">
							<li className="flex items-start gap-3">
								<PlusCircle className="text-neutral-400 mt-0.5 w-4 h-4 flex-shrink-0" />
								<div>
									<p className="text-sm font-medium text-neutral-900">
										Add Comparison Tables
									</p>
									<p className="text-xs text-neutral-500 mt-0.5">
										LLMs heavily index tabular data for
										feature comparisons.
									</p>
								</div>
							</li>

							<li className="flex items-start gap-3">
								<List className="text-neutral-400 mt-0.5 w-4 h-4 flex-shrink-0" />
								<div>
									<p className="text-sm font-medium text-neutral-900">
										Convert Narrative to Lists
									</p>
									<p className="text-xs text-neutral-500 mt-0.5">
										Break down paragraphs 4-6 on the
										'Features' page into bullet points.
									</p>
								</div>
							</li>

							<li className="flex items-start gap-3">
								<Link className="text-neutral-400 mt-0.5 w-4 h-4 flex-shrink-0" />
								<div>
									<p className="text-sm font-medium text-neutral-900">
										Strengthen Internal Anchors
									</p>
									<p className="text-xs text-neutral-500 mt-0.5">
										Use exact-match entity terms when
										linking definitions.
									</p>
								</div>
							</li>
						</ul>
					</div>

					<button className="w-full mt-8 py-3 rounded-lg border border-neutral-200 bg-white text-neutral-900 text-xs font-bold uppercase tracking-wider hover:bg-neutral-50 transition-colors duration-200">
						View Full Task List
					</button>
				</div>
			</div>
		</main>
	);
}
