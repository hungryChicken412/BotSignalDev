"use client";
import {useState, useEffect} from "react";

const HERO_PHRASES = ["Is your website ready for AI?", "Find out why AI assistants ignore your website.", "See if ChatGPT, Gemini and Claude can actually understand your site.", "Can ChatGPT recommend your website?"];

export function TypewriterText() {
	const [phraseIndex, setPhraseIndex] = useState(0);
	const [text, setText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		let timeout: NodeJS.Timeout;
		const currentPhrase = HERO_PHRASES[phraseIndex];

		if (isDeleting) {
			if (text === "") {
				setIsDeleting(false);
				setPhraseIndex((prev) => (prev + 1) % HERO_PHRASES.length);
			} else {
				timeout = setTimeout(() => setText(currentPhrase.substring(0, text.length - 1)), 30);
			}
		} else {
			if (text === currentPhrase) {
				timeout = setTimeout(() => setIsDeleting(true), 2500);
			} else {
				timeout = setTimeout(() => setText(currentPhrase.substring(0, text.length + 1)), 50);
			}
		}
		return () => clearTimeout(timeout);
	}, [text, isDeleting, phraseIndex]);

	return (
		<h1 className="font-display-xl text-[48px] md:text-[64px] leading-[1.1] tracking-tighter text-on-surface">
			{text}
			<span className="inline-block animate-pulse text-primary font-light ml-1 -translate-y-1">|</span>
		</h1>
	);
}
