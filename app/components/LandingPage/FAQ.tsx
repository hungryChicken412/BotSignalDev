"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";

export default function FAQSection() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleFAQ = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	// User-facing FAQs for marketing the product
	const faqs = [
		{
			question: "How long does the audit take?",
			answer: "Usually under 3 minutes. Once you submit your URL, our background workers immediately scrape your site, run it through our AI models, generate the PDF, and send it straight to your inbox.",
		},
		{
			question: "What exactly is LLM compatibility?",
			answer: "LLM (Large Language Model) compatibility measures how easily AI agents like ChatGPT, Claude, or Perplexity can read, understand, and extract factual data from your website without getting confused by bloated code or marketing fluff.",
		},
		{
			question: "Is the basic audit actually free?",
			answer: "Yes! The Basic Audit gives you 3 free site evaluations per month. You get full Information Density analysis and PDF report delivery at zero cost.",
		},
		{
			question: "Do you store my website data?",
			answer: "We only temporarily store the scraped text and screenshots required to run the AI analysis and generate your PDF report. We do not use your proprietary data to train our own models.",
		},
		{
			question: "Can I use this for my clients?",
			answer: "Absolutely. Our Pro and Enterprise tiers are designed for agencies. You can audit unlimited URLs and use our API to integrate the JSON results directly into your own client dashboards.",
		},
	];

	return (
		<section id="faq" className="py-section-gap  px-4 md:px-container-padding bg-surface">
			<div className="max-w-[1515px] mx-auto flex flex-col lg:flex-row gap-16">
				<div className="lg:w-1/3">
					<h2 className="font-display-xl text-[60px] leading-[1.1] text-on-surface sticky top-32">Frequently asked questions</h2>
				</div>

				<div className="lg:w-2/3 flex flex-col">
					{faqs.map((faq, index) => {
						const isOpen = openIndex === index;

						return (
							<div key={index} className="border-b border-outline-variant/30 py-4 group cursor-pointer flex flex-col" onClick={() => toggleFAQ(index)}>
								<div className="flex justify-between items-center w-full">
									<h3 className="text-headline-md text-on-surface group-hover:text-primary transition-colors text-xl font-light">{faq.question}</h3>
									<span className="text-on-surface-variant group-hover:text-primary transition-colors duration-300">{isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}</span>
								</div>

								<div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"}`}>
									<div className="overflow-hidden">
										<p className="text-on-surface-variant font-body-md text-base leading-relaxed max-w-3xl">{faq.answer}</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
