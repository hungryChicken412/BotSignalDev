"use client";

import React, {useState} from "react";
import {Copy, Check, Sparkles, User, ArrowRight} from "lucide-react";

export interface AICitation {
	id: string;
	query: string;
	exact_source_sentence: string;
	highlight: string;
}

interface QuotableProps {
	citations: AICitation[];
}

export function Quotable({citations}: QuotableProps) {
	const [copiedId, setCopiedId] = useState<string | null>(null);

	const handleCopy = (item: AICitation) => {
		navigator.clipboard.writeText(item.exact_source_sentence);

		setCopiedId(item.id);
		setTimeout(() => setCopiedId(null), 2000);
	};

	return (
		<div className="md:col-span-7 bg-white border border-neutral-200 rounded-3xl p-8 flex flex-col shadow-[0px_4px_24px_-4px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.04)]">
			{/* Header */}
			<div className="flex items-center gap-4 mb-8">
				<div className="p-3 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl ring-1 ring-inset ring-indigo-100/50 shadow-sm">
					<Sparkles className="text-indigo-600 w-5 h-5" strokeWidth={1.75} />
				</div>

				<div>
					<h3 className="text-[17px] font-semibold text-slate-900 tracking-tight">Predicted AI Citations</h3>
					<p className="text-[13px] text-slate-500 mt-0.5">How LLMs will likely quote your content</p>
				</div>
			</div>

			{/* Citation List */}
			<div className="space-y-8 flex-1">
				{citations.map((item) => {
					const sentence = item.exact_source_sentence;
					const highlightIndex = sentence.indexOf(item.highlight);

					const textBefore = highlightIndex >= 0 ? sentence.slice(0, highlightIndex) : "";

					const textAfter = highlightIndex >= 0 ? sentence.slice(highlightIndex + item.highlight.length) : sentence;

					return (
						<div key={item.id} className="relative group flex flex-col gap-3">
							{/* User Query */}
							<div className="flex items-center gap-2.5 pl-2">
								<div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200/60">
									<User className="w-3.5 h-3.5 text-slate-500" strokeWidth={2} />
								</div>

								<p className="text-[13px] font-medium text-slate-600">"{item.query}"</p>
							</div>

							{/* AI Response */}
							<div className="relative flex gap-3 pl-0 md:pl-4">
								<div className="hidden md:flex flex-col items-center mt-1">
									<ArrowRight className="w-4 h-4 text-slate-300" />
								</div>

								<div className="relative flex-1 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl p-5 border border-slate-200/50 ring-1 ring-white/50 transition-all duration-300 group-hover:border-indigo-200/60 group-hover:shadow-sm">
									<div className="absolute left-0 top-6 bottom-6 w-[3px] bg-indigo-500 rounded-r-full opacity-80" />

									<p className="text-[14.5px] text-slate-700 leading-relaxed">
										{highlightIndex >= 0 ? (
											<>
												{textBefore}
												<span className="bg-indigo-100/60 text-indigo-900 font-medium px-1 rounded mx-0.5">{item.highlight}</span>
												{textAfter}
											</>
										) : (
											sentence
										)}
									</p>

									{/* Copy Button */}
									<button onClick={() => handleCopy(item)} className={`absolute top-4 right-4 opacity-0 -translate-y-1 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 border text-[11px] font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 backdrop-blur-md ${copiedId === item.id ? "bg-emerald-50 border-emerald-200 text-emerald-600 opacity-100 translate-y-0" : "bg-white/80 border-slate-200 text-slate-600 hover:bg-white hover:text-indigo-600 hover:border-indigo-200"}`}>
										{copiedId === item.id ? (
											<>
												<Check className="w-3.5 h-3.5" />
												Copied
											</>
										) : (
											<>
												<Copy className="w-3.5 h-3.5" />
												Copy
											</>
										)}
									</button>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
