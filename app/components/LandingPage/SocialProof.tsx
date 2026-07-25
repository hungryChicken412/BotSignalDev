import {Building2, Command, Hexagon, Layers, Triangle} from "lucide-react";

export default function SocialProof() {
	return (
		<section className="py-12 px-container-padding border-b border-outline-variant/30">
			<div className="max-w-[1516px] mx-auto flex flex-col items-center gap-8">
				<p className="font-label-caps text-sm text-on-surface-variant uppercase tracking-widest text-center">Trusted by forward-thinking teams preparing for the AI era</p>
				<div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
					<div className="flex items-center gap-2 font-display-xl text-xl font-bold text-on-surface">
						<Triangle className="w-6 h-6" /> Vercel
					</div>
					<div className="flex items-center gap-2 font-display-xl text-xl font-bold text-on-surface">
						<Hexagon className="w-6 h-6" /> Acme Corp
					</div>
					<div className="flex items-center gap-2 font-display-xl text-xl font-bold text-on-surface">
						<Layers className="w-6 h-6" /> StackTech
					</div>
					<div className="flex items-center gap-2 font-display-xl text-xl font-bold text-on-surface">
						<Command className="w-6 h-6" /> Linear
					</div>
				</div>
			</div>
		</section>
	);
}
