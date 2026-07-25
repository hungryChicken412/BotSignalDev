"use client";

import {
	CheckCircle,
	ChevronDown, // Notice we removed ChevronUp here
	type LucideIcon,
} from "lucide-react";
import {useState} from "react";

type StrengthItem = {
	title: string;
	description: string;
	icon: LucideIcon;
	fullWidth?: boolean;
};

type StrengthsSectionProps = {
	title?: string;
	icon?: LucideIcon;
	items: StrengthItem[];
};

function StrengthAccordionItem({title, description, icon: ItemIcon}: {title: string; description: string; icon: LucideIcon}) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<li className="bg-white/50 rounded-2xl border border-gray-200 overflow-hidden transition-colors hover:bg-white ">
			<button className="w-full px-3 py-2.5 flex items-start justify-between text-left cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
				<div className="flex items-start gap-3 pr-4">
					<ItemIcon className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
					<h3 className="text-sm font-medium text-gray-900 leading-snug">{title}</h3>
				</div>
				{/* Smoothly rotate the chevron when clicked */}
				<ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 mt-0.5 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`} />
			</button>

			{/* The Animated Wrapper using max-height instead of conditional rendering */}
			<div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
				<div className="px-3 pb-3 pt-1 ml-5">
					<div className="border-l-0 md:border-l-2 border-gray-100 pl-0 md:pl-3">
						<div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">Why It Succeeded</div>
						<p className="text-xs text-gray-600 leading-relaxed">{description}</p>
					</div>
				</div>
			</div>
		</li>
	);
}

export function StrengthsSection({title = "AI Can Answer", icon: Icon = CheckCircle, items}: StrengthsSectionProps) {
	return (
		<section>
			<div className="flex items-center gap-2 mb-4 ">
				<Icon className="w-5 h-5 text-green-700" />
				<h2 className="text-lg font-semibold">{title}</h2>
			</div>

			<ul className="flex flex-col gap-2">
				{items.map((item) => (
					<StrengthAccordionItem key={item.title} title={item.title} description={item.description} icon={item.icon} />
				))}
			</ul>
		</section>
	);
}
