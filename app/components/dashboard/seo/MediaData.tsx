import { useState } from "react";
import { Images, X, FileImage, ArrowDownRight } from "lucide-react";

// 1. Updated data prop structure to include the list of oversized images
export type AuditData = {
	media: {
		missingAlt: {
			count: number;
			percentage: number;
			total: number;
		};
		oversized: {
			count: number;
			percentage: number;
			savingsMB: number;
			items: Array<{
				filename: string;
				currentSize: string;
				potentialSavings: string;
			}>;
		};
	};
};

export function MediaData({ data }: { data: AuditData }) {
	// 2. Add state to track if the modal is open
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Safety check
	if (!data) return null;

	return (
		<>
			{/* 5. Image Audit */}
			<section className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm h-fit">
				<div className="p-5 border-b border-neutral-200 flex items-center gap-2">
					<Images className="text-neutral-500 w-4 h-4" />
					<h2 className="text-base font-semibold text-neutral-900">
						Media Health
					</h2>
				</div>
				<div className="p-5">
					{/* Missing Alt Text */}
					<div className="mb-6">
						<div className="flex justify-between items-end mb-2">
							<span className="text-sm text-neutral-500">
								Missing Alt Text
							</span>
							<span className="text-xl font-semibold text-rose-600">
								{data.media.missingAlt.count}
							</span>
						</div>
						<div className="w-full bg-neutral-100 rounded-2xl h-1.5 overflow-hidden">
							<div
								className="bg-rose-500 h-1.5 rounded-2xl transition-all duration-1000"
								style={{
									width: `${data.media.missingAlt.percentage}%`,
								}}
							></div>
						</div>
						<p className="text-[11px] text-neutral-500 mt-2">
							{data.media.missingAlt.percentage}% of total images
							({data.media.missingAlt.total}) lack alt attributes.
						</p>
					</div>

					{/* Large Files */}
					<div>
						<div className="flex justify-between items-end mb-2">
							<span className="text-sm text-neutral-500">
								Oversized Images (&gt;500kb)
							</span>
							<span className="text-xl font-semibold text-amber-600">
								{data.media.oversized.count}
							</span>
						</div>
						<div className="w-full bg-neutral-100 rounded-2xl h-1.5 overflow-hidden">
							<div
								className="bg-amber-500 h-1.5 rounded-2xl transition-all duration-1000"
								style={{
									width: `${data.media.oversized.percentage}%`,
								}}
							></div>
						</div>
						<p className="text-[11px] text-neutral-500 mt-2">
							Total potential savings: ~
							{data.media.oversized.savingsMB} MB
						</p>
					</div>

					<button
						onClick={() => setIsModalOpen(true)}
						className="w-full mt-6 py-2.5 px-4 bg-white border border-neutral-200 text-neutral-900 rounded-2xl text-sm font-medium hover:bg-neutral-50 active:scale-98 transition-all cursor-pointer"
					>
						View Image Report
					</button>
				</div>
			</section>

			{/* Modal Overlay */}
			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-sm">
					{/* Modal Content */}
					<div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200">
						{/* Modal Header */}
						<div className="flex items-center justify-between p-5 border-b border-neutral-200">
							<div>
								<h3 className="font-semibold text-neutral-900 text-lg">
									Oversized Images
								</h3>
								<p className="text-xs text-neutral-500 mt-1">
									Images larger than 500kb that need
									compression.
								</p>
							</div>
							<button
								onClick={() => setIsModalOpen(false)}
								className="p-2 bg-neutral-100 text-neutral-500 rounded-full hover:bg-neutral-200 hover:text-neutral-700 transition-colors cursor-pointer"
							>
								<X className="w-4 h-4" />
							</button>
						</div>

						{/* Modal Body (Scrollable List) */}
						<div className="overflow-y-auto p-5 space-y-3 bg-neutral-50/50">
							{data.media.oversized.items.map((item, idx) => (
								<div
									key={idx}
									className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white border border-neutral-200 rounded-xl gap-3"
								>
									<div className="flex items-center gap-3 overflow-hidden">
										<div className="w-10 h-10 shrink-0 rounded-lg bg-indigo-50 flex items-center justify-center">
											<FileImage className="w-5 h-5 text-indigo-500" />
										</div>
										<div className="truncate pr-4">
											<p className="text-sm font-medium text-neutral-900 truncate">
												{item.filename}
											</p>
											<p className="text-xs text-neutral-500 mt-0.5">
												Current: {item.currentSize}
											</p>
											
										</div>
									</div>
									<div className="flex items-center gap-1.5 px-3 py-1.5 shrink-0 bg-red-50 border border-emerald-100 rounded-lg">
										<ArrowDownRight className="w-3.5 h-3.5 text-red-600" />
										<span className="text-xs font-semibold text-red-700">
											{item.potentialSavings}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
