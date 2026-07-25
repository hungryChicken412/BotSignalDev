"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
	// We use a ref to target the section element directly.
	// This is much better for performance than using React state,
	// which would cause the entire component to re-render on every pixel the mouse moves.
	const sectionRef = useRef<HTMLElement>(null);

	const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
		if (!sectionRef.current) return;

		// Calculate the mouse position relative to the section
		const rect = sectionRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		// Update the CSS variables for the glow effect
		sectionRef.current.style.setProperty("--mouse-x", `${x}px`);
		sectionRef.current.style.setProperty("--mouse-y", `${y}px`);
	};

	return (
		<section
			ref={sectionRef}
			onMouseMove={handleMouseMove}
			className="py-section-gap px-container-padding relative overflow-hidden flex flex-col items-center justify-center min-h-[70vh] group/cta"
		>
			<div className="absolute inset-0 bg-surface -z-10" />

			<div
				className="absolute inset-0 opacity-20 -z-10"
				style={{
					background:
						"radial-gradient(circle at 10% 20%, #312e81 0%, transparent 50%), radial-gradient(circle at 90% 80%, #581c87 0%, transparent 50%), radial-gradient(circle at 50% 50%, #134e4a 0%, transparent 70%)",
				}}
			/>

			<div
				className="absolute inset-0 -z-10 opacity-0 group-hover/cta:opacity-40 transition-opacity duration-500"
				style={{
					background:
						"radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.4), rgba(168, 85, 247, 0.3), transparent 60%)",
				}}
			/>

			<h2 className="font-display-xl text-[54px] leading-tight mb-10 text-center relative z-10 max-w-2xl drop-shadow-sm text-on-surface">
				So, what are you waiting for?
			</h2>

			<Link
				href="#"
				className="inline-flex items-center gap-3 bg-white/40 backdrop-blur-md border border-white/60 font-body-md text-body-md font-medium px-6 py-2.5 rounded-full hover:bg-white/60 hover:scale-105 transition-all shadow-sm group relative z-10 text-on-surface"
			>
				Get started
				<div className="w-5 h-5 flex items-center justify-center">
					<span className="material-symbols-outlined text-on-surface text-[16px] group-hover:translate-x-0.5 transition-transform">
						<ArrowRight />
					</span>
				</div>
			</Link>
		</section>
	);
}
