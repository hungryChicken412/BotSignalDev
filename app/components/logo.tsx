"use client";

import Link from "next/link";

import Image from "next/image";

export default function LogoBrand() {
	return (
		<Link className="font-display-xl text-2xl tracking-tighter text-blue-950  dark:text-primary-fixed-dim flex items-end gap-2 group" href="/">
			<div className="bg-transparent text-on-primary p-1.5 rounded-full group-hover:rotate-12 transition-transform duration-300">
				<Image src={"/botsignaldevIcon.png"} alt={"logo"} width={22} height={22} />
			</div>
			<span>
				BotSignal<span className="text-blue-400">.Dev</span>
			</span>
		</Link>
	);
}
