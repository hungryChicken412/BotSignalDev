import {useState} from "react";
import {Boxes, Check, GitFork, Link2Off, Network, AlertTriangle, X, ArrowRight} from "lucide-react";

// 1. Define the expected shape of your architecture props
export type ArchitectureProps = {
	brokenLinks: number;
	redirectChains: number;
	broken_links_list: string[];
	redirect_chains_list: string[];
	linkDensity: {
		level: string; // e.g., "High", "Medium", "Low", "Optimal"
		isOptimal: boolean;
		message: string;
	};
};

export function SiteArchitecture({data}: {data: ArchitectureProps}) {
	// State to track which modal is open ('broken', 'redirects', or null for closed)
	const [activeModal, setActiveModal] = useState<"broken" | "redirects" | null>(null);

	// Safety check in case data hasn't loaded yet
	if (!data) return null;

	// Determine modal content dynamically based on what was clicked
	const modalConfig = {
		broken: {
			title: "Broken Links (404)",
			description: "Links on your site that lead to dead or non-existent pages.",
			items: data.broken_links_list || [],
			emptyMessage: "Great job! No broken links found.",
		},
		redirects: {
			title: "Redirect Chains",
			description: "Links that bounce through multiple URLs before reaching their final destination.",
			items: data.redirect_chains_list || [],
			emptyMessage: "Awesome! No redirect chains detected.",
		},
	};

	const currentModal = activeModal ? modalConfig[activeModal] : null;

	return (
		<section className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
			<div className="p-6 border-b border-neutral-200 flex items-center gap-3">
				<div className="w-8 h-8 rounded-2xl bg-neutral-100 flex items-center justify-center">
					<Network className="text-neutral-900 w-4 h-4" />
				</div>
				<h2 className="text-xl font-medium text-neutral-900">Site Architecture</h2>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
				{/* Broken Links */}
				<div className="p-6 flex flex-col items-center text-center gap-2">
					<div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center mb-2">
						<Link2Off className="w-5 h-5 text-rose-600" />
					</div>
					<span className="text-4xl font-extrabold text-neutral-900 tracking-tight">{data.brokenLinks}</span>
					<span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Broken Links (404)</span>
					<button onClick={() => setActiveModal("broken")} className="mt-4 text-xs font-medium text-neutral-900 border-b border-neutral-900 pb-0.5 hover:text-neutral-500 hover:border-neutral-500 transition-colors cursor-pointer">
						View Details
					</button>
				</div>

				{/* Redirects */}
				<div className="p-6 flex flex-col items-center text-center gap-2">
					<div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-2">
						<GitFork className="w-5 h-5 text-amber-600 transform rotate-90" />
					</div>
					<span className="text-4xl font-extrabold text-neutral-900 tracking-tight">{data.redirectChains}</span>
					<span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Redirect Chains</span>
					<button onClick={() => setActiveModal("redirects")} className="mt-4 text-xs font-medium text-neutral-900 border-b border-neutral-900 pb-0.5 hover:text-neutral-500 hover:border-neutral-500 transition-colors cursor-pointer">
						View Details
					</button>
				</div>

				{/* Link Density */}
				<div className="p-6 flex flex-col items-center text-center gap-2">
					<div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-2">
						<Boxes className="w-5 h-5 text-indigo-600" />
					</div>
					<span className="text-4xl font-extrabold text-neutral-900 tracking-tight">{data.linkDensity.level}</span>
					<span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Internal Link Density</span>

					<span className={`mt-4 text-xs font-medium flex items-center gap-1 ${data.linkDensity.isOptimal ? "text-emerald-600" : "text-amber-600"}`}>
						{data.linkDensity.isOptimal ? <Check className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
						{data.linkDensity.message}
					</span>
				</div>
			</div>

			{/* Modal Overlay */}
			{activeModal && currentModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-sm">
					{/* Modal Content */}
					<div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200">
						{/* Modal Header */}
						<div className="flex items-center justify-between p-5 border-b border-neutral-200">
							<div>
								<h3 className="font-semibold text-neutral-900 text-lg">{currentModal.title}</h3>
								<p className="text-xs text-neutral-500 mt-1">{currentModal.description}</p>
							</div>
							<button onClick={() => setActiveModal(null)} className="p-2 bg-neutral-100 text-neutral-500 rounded-full hover:bg-neutral-200 hover:text-neutral-700 transition-colors cursor-pointer">
								<X className="w-4 h-4" />
							</button>
						</div>

						{/* Modal Body (Scrollable List) */}
						<div className="overflow-y-auto p-5 space-y-3 bg-neutral-50/50">
							{currentModal.items.length === 0 ? (
								<div className="text-center py-8 text-sm font-medium text-neutral-500 bg-white border border-neutral-200 rounded-xl">{currentModal.emptyMessage}</div>
							) : (
								currentModal.items.map((item, idx) => (
									<div key={idx} className="p-4 bg-white border border-neutral-200 rounded-xl">
										{/* If it's a redirect chain, parse it beautifully */}
										{activeModal === "redirects" ? (
											<div className="flex flex-col gap-2">
												{item.split("->").map((step, stepIdx) => (
													<div key={stepIdx} className="flex items-start gap-2 overflow-hidden">
														{stepIdx > 0 ? (
															<ArrowRight className="w-4 h-4 mt-0.5 text-amber-500 shrink-0" />
														) : (
															<div className="w-4 h-4 mt-0.5 shrink-0" /> // Spacer for alignment
														)}
														<span className="text-sm font-medium text-neutral-700 break-all">{step.trim()}</span>
													</div>
												))}
											</div>
										) : (
											/* If it's a standard broken link */
											<div className="flex items-start gap-2">
												<Link2Off className="w-4 h-4 mt-0.5 text-rose-500 shrink-0" />
												<span className="text-sm font-medium text-neutral-700 break-all">{item}</span>
											</div>
										)}
									</div>
								))
							)}
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
