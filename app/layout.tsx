import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";

import {Plus_Jakarta_Sans} from "next/font/google";

import Footer from "./components/FooterDocs";
import NextTopLoader from "nextjs-toploader";
import {ToastContainer} from "react-toastify";
import FirebaseAnalytics from "./components/FirebaseAnalytics";
import { Suspense } from "react";

// Configure the text font
const plusJakartaSans = Plus_Jakarta_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
	variable: "--font-plus-jakarta", // CSS variable name
});

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	// MUST UPDATE: Required for resolving relative image URLs in OG/Twitter tags
	metadataBase: new URL("https://botsignal.dev"),

	title: "BotSignal.Dev | Will ChatGPT recommend your website?",
	description: "Scan your website for AI discoverability and if LLM bots can find and understand your website. Fix LLM compatibility and SEO issues in under 60 seconds.",
	keywords: ["AI SEO", "LLM optimization", "ChatGPT website scan", "bot discoverability", "AI search engine optimization", "AI crawler tool"],

	// Open Graph (Facebook, LinkedIn, Discord, iMessage)
	openGraph: {
		title: "BotSignal.Dev | Will ChatGPT recommend your website?",
		description: "Scan your website for AI discoverability and fix LLM compatibility issues in under 60 seconds.",
		url: "https://botsignal.dev",
		siteName: "BotSignal.Dev",
		images: [
			{
				url: "/og-image.jpg", // Add this to your public/ folder (1200x630px)
				width: 1200,
				height: 630,
				alt: "BotSignal.Dev - AI Discoverability Scanner",
			},
		],
		locale: "en_US",
		type: "website",
	},

	// Twitter / X
	twitter: {
		card: "summary_large_image",
		title: "BotSignal.Dev | Will ChatGPT recommend your website?",
		description: "Scan your website for AI discoverability and fix LLM compatibility issues in under 60 seconds.",
		images: ["/og-image.jpg"], // Add this to your public/ folder (1200x630px)
	},

	// Search Engine Crawling
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},

	// Canonical URL to prevent duplicate content issues
	alternates: {
		canonical: "https://botsignal.dev",
	},

	icons: {
		icon: "/botsignaldevicon.png",
		apple: "/og-image.jpg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} h-full antialiased`}>
			<body className="min-h-full flex flex-col">
				<NextTopLoader />
				<ToastContainer />

				{children}
				<Footer />

				<Suspense fallback={null}>
					<FirebaseAnalytics />
				</Suspense>
			</body>
		</html>
	);
}
