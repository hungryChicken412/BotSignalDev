import { Zap } from "lucide-react";

// 1. Define the single data prop structure
export type ActionPlanData = {
	title?: string; // Optional, defaults to "Action Plan"
	quickWins: Array<{
		text: string;
	}>;
	strategyTitle: string;
	strategyDescription: string;
	articleTypes: string[];
	faqStructure: string;
};

export function ActionPlanSection({ data }: { data: ActionPlanData }) {
	// Safety check
	if (!data) return null;

	// Use the provided title or fallback to the default
	const sectionTitle = data.title || "Action Plan";

	return (
		<section className="mt-12 border-t border-gray-200 pt-12">
			<h2 className="text-3xl font-semibold mb-8">{sectionTitle}</h2>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Quick Wins Column */}
				<div className="lg:col-span-1">
					<div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
						<div className="flex items-center gap-2 mb-6">
							<Zap className="w-6 h-6 text-purple-700 fill-purple-700/20" />
							<h3 className="text-lg font-semibold">Quick Wins</h3>
						</div>
						<ul className="space-y-4">
							{data.quickWins.map((item) => (
								<li key={item.text} className="flex gap-3">
									<div className="mt-1 w-5 h-5 rounded border border-gray-300 flex items-center justify-center shrink-0"></div>
									<span className="text-sm">{item.text}</span>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Strategy Column */}
				<div className="lg:col-span-2">
					<div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm h-full">
						<h3 className="text-xl font-semibold mb-6">{data.strategyTitle}</h3>
						<div className="space-y-6">
							<div>
								<h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">ARTICLE TYPES</h4>
								<p className="text-sm text-gray-900 mb-3">{data.strategyDescription}</p>
								<div className="flex flex-wrap gap-2">
									{data.articleTypes.map((type) => (
										<span key={type} className="px-3 py-1 bg-gray-100 rounded-full text-xs font-mono border border-gray-200">
											{type}
										</span>
									))}
								</div>
							</div>
							<div className="pt-4 border-t border-gray-200">
								<h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">FAQ STRUCTURE TACTICS</h4>
								<p className="text-sm text-gray-900">{data.faqStructure}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
