import { AlertTriangle, CheckCircle2, Rows } from "lucide-react";

import Tooltip from "@/app/components/Tooltip";



// 1. Define the expected shape of your metadata prop
export type MetadataProps = {
	title: {
		text: string;
		length: number;
		maxLength: number;
		isOptimal: boolean;
		message: string;
	};
	description: {
		text: string;
		length: number;
		maxLength: number;
		isOptimal: boolean;
		message: string;
	};
	canonical: {
		url: string;
		isOptimal: boolean;
		message: string;
	};
};

export function Meta({ metadata }: { metadata: MetadataProps }) {
	// Safety check in case metadata hasn't loaded yet
	

	return (
		<section className="bg-white border border-neutral-200 rounded-2xl  shadow-sm">
			<div className="p-6 border-b border-neutral-200 flex items-center gap-3">
				<div className="w-8 h-8 flex items-center justify-center">
					<Rows className="w-4 h-4 text-neutral-900" />
				</div>

				<h2 className="text-xl font-medium text-neutral-900 flex items-center ">
					Metadata Analysis <Tooltip content=" Evaluates core HTML tags. AI agents rely on concise titles and meta descriptions as primary context clues before committing resources to scrape your full page." />
				</h2>
			</div>

			<div className="p-6 space-y-6">
				{/* Title */}
				<div className="group">
					<div className="flex justify-between items-end mb-2">
						<label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Title Tag</label>

						<span className={`font-mono text-xs font-medium ${metadata.title.isOptimal ? "text-emerald-600" : "text-amber-600"}`}>
							{metadata.title.length} / {metadata.title.maxLength} chars
						</span>
					</div>

					<div className="p-4 bg-neutral-50 rounded-2xl border border-transparent group-hover:border-neutral-200 transition-colors">
						<p className="text-base text-neutral-900">{metadata.title.text}</p>
					</div>

					<p className="mt-2 flex items-center gap-1 text-xs text-neutral-500">
						{metadata.title.isOptimal ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />}
						{metadata.title.message}
					</p>
				</div>

				<hr className="border-neutral-200/50" />

				{/* Description */}
				<div className="group">
					<div className="flex justify-between items-end mb-2">
						<label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Meta Description</label>

						<span className={`font-mono text-xs font-medium ${metadata.description.isOptimal ? "text-emerald-600" : "text-amber-600"}`}>
							{metadata.description.length} / {metadata.description.maxLength} chars
						</span>
					</div>

					<div className="p-4 bg-neutral-50 rounded-2xl border border-transparent group-hover:border-neutral-200 transition-colors">
						<p className="text-sm text-neutral-900">{metadata.description.text}</p>
					</div>

					<p className="mt-2 flex items-center gap-1 text-xs text-neutral-500">
						{metadata.description.isOptimal ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />}
						{metadata.description.message}
					</p>
				</div>

				<hr className="border-neutral-200/50" />

				{/* Canonical */}
				<div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-4">
					<div className="truncate pr-4">
						<label className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-500">Canonical URL</label>

						<code className="font-mono text-xs text-neutral-900 truncate block">{metadata.canonical.url}</code>
					</div>

					<span className={`inline-flex items-center gap-1 rounded-2xl border px-3 py-1.5 text-xs font-medium shrink-0 ${metadata.canonical.isOptimal ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-700"}`}>
						{metadata.canonical.isOptimal ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
						{metadata.canonical.message}
					</span>
				</div>
			</div>
		</section>
	);
}
