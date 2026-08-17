"use client";

import {HelpCircle} from "lucide-react";
import React, {ReactNode} from "react";

interface TooltipProps {
	/** The text or element to display inside the tooltip */
	content: string;
	position?: "top" | "bottom" | "left" | "right";
	/** Optional extra classes for the tooltip container */
	className?: string;
}

export default function Tooltip({content,  position = "top", className = ""}: TooltipProps) {
	// Positioning logic mapping for the tooltip container
	const positionClasses = {
		top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
		bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
		left: "right-full top-1/2 -translate-y-1/2 mr-2",
		right: "left-full top-1/2 -translate-y-1/2 ml-2",
	};

	// Positioning logic for the small pointer arrow
	const arrowClasses = {
		top: "top-full left-1/2 -translate-x-1/2 -mt-[1px] border-t-gray-900 border-x-transparent border-b-transparent",
		bottom: "bottom-full left-1/2 -translate-x-1/2 -mb-[1px] border-b-gray-900 border-x-transparent border-t-transparent",
		left: "left-full top-1/2 -translate-y-1/2 -ml-[1px] border-l-gray-900 border-y-transparent border-r-transparent",
		right: "right-full top-1/2 -translate-y-1/2 -mr-[1px] border-r-gray-900 border-y-transparent border-l-transparent",
	};

	return (
		<div className="relative inline-flex group w-fit">
			{/* Trigger Element */}
			<button className="p-2 text-gray-500 hover:text-indigo-600 transition-colors">
				<HelpCircle className="text-gray cursor-pointer" />
			</button>

			{/* Tooltip Body */}
			<div className={`absolute z-50 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none scale-95 group-hover:scale-100 ease-out ${positionClasses[position]} ${className}`} role="tooltip">
				<div className="px-3 py-1.5 text-[11px] font-bold w-[300px] text-white bg-gray-900 rounded-2xl shadow-lg whitespace-wrap border border-gray-700/50 backdrop-blur-md">{content}</div>

				{/* Tooltip Arrow */}
				<div className={`w-0 h-0 border-[5px] ${arrowClasses[position]}`}></div>
			</div>
		</div>
	);
}
