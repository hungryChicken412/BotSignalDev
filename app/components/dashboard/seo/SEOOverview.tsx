import {
	FileText,
	Heading,
	Braces,
	Image as ImageIcon,
	LucideIcon,
} from "lucide-react";

const icons = {
	"Meta Description": FileText,
	"Title Quality": Heading,
	"Schema Markup": Braces,
	"Image Opt.": ImageIcon,
};

type IconKey = keyof typeof icons;


type CardTypes = {
	icon: LucideIcon;
	name: string;
	score: number;
	info: IconKey;
};

export function SEOOVerview({ data }: { data: CardTypes[] }) {
	return (
		<section className="grid grid-cols-2 md:grid-cols-4 gap-4">
			{data.map((card, idx) => {
				const ItemIcon = icons[card.info];
				return (
					<div
						key={idx}
						className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
					>
						<div className="flex justify-between items-start">
							<div className="w-10 h-10 rounded-2xl bg-neutral-100 flex items-center justify-center">
								<ItemIcon className="w-5 h-5 text-neutral-500" />
							</div>
							<span className="inline-flex items-center px-2 py-1 rounded-2xl bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
								{card.name}
							</span>
						</div>
						<div>
							<h3 className="text-xl font-semibold text-neutral-900">
								{card.score}
							</h3>
							<p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mt-1">
								{card.info}
							</p>
						</div>
					</div>
				);
			})}
		</section>
	);
}
