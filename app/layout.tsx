import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";

import {Plus_Jakarta_Sans} from "next/font/google";

import Footer from "./components/FooterDocs";
import NextTopLoader from "nextjs-toploader";
import {ToastContainer} from "react-toastify";

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
	title: "BotSignal.Dev | Will ChatGPT recommend your website?",
	description: "Scan your website for AI discoverability and if LLM bots can find and understand your website. LLM compatibility, and SEO issues in under 60 seconds.",
	icons: {
		icon: "/botsignaldevicon.png", // Maps to public/brand-icon.png
		apple: "/apple-touch-icon.png",
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
			</body>
		</html>
	);
}
