"use client";

import {
	AlertTriangle,
	ChevronDown,
	ChevronUp,
	type LucideIcon,
} from "lucide-react";
import { useState, type ReactNode } from "react";

type WeaknessItem = {
	title: string;
	indicatorColor: string;
	impactText: string;
	whyItMatters: string;
	fix: string;
};

type WeaknessesSectionProps = {
	title?: string;
	icon?: LucideIcon;
	items: WeaknessItem[];
};

function AccordionItem({
	title,
	indicatorColor,
	impactText,
	children,
}: {
	title: string;
	indicatorColor: string;
	impactText: string;
	children: ReactNode;
}) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<li className="bg-white/50 rounded-2xl border border-gray-200 overflow-hidden transition-colors hover:bg-white">
			<button className="w-full px-3 py-2.5 flex items-start justify-between text-left" onClick={() => setIsOpen(!isOpen)}>
				<div className="flex items-start gap-3 pr-4">
					<div className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${indicatorColor}`}></div>
					<h3 className="text-sm font-medium text-gray-900 leading-snug">{title}</h3>
				</div>
				<ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 mt-0.5 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`} />
			</button>

			<div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
				<div className="px-3 pb-3 pt-1 ml-5">
					<div className="border-l-0 md:border-l-2 border-gray-100 pl-0 md:pl-3">
						{children}
						<div className="flex items-center gap-2 pt-1">
							<span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Impact:</span>
							<span className="text-purple-700 font-semibold text-xs">{impactText}</span>
						</div>
					</div>
				</div>
			</div>
		</li>
	);
}

export function WeaknessesSection({
	title = "AI Cannot Answer",
	icon: Icon = AlertTriangle,
	items,
}: WeaknessesSectionProps) {
	return (
		<section>
			<div className="flex items-center gap-2 mb-4">
				<Icon className="w-5 h-5 text-red-500" />
				<h2 className="text-lg font-semibold">{title}</h2>
			</div>

			<ul className="flex flex-col gap-2">
				{items.map((item) => (
					<AccordionItem
						key={item.title}
						title={item.title}
						indicatorColor={item.indicatorColor}
						impactText={item.impactText}
					>
						<div>
							<div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">
								Why It Matters
							</div>
							<p className="text-xs text-gray-600 leading-relaxed">
								{item.whyItMatters}
							</p>
						</div>
						<div>
							<div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">
								Fix
							</div>
							<p className="text-xs font-medium text-primary leading-relaxed">
								{item.fix}
							</p>
						</div>
					</AccordionItem>
				))}
			</ul>
		</section>
	);
}
