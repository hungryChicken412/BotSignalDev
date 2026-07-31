import Navbar from "@/app/components/docs/Navbar";
import DocsBar from "../components/docs/docsBar";

export default function DocsLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-full flex flex-col relative z-0">
			<Navbar /> {/* Top navigation bar */}
			{/* Side-by-side flex container for Desktop */}
			<div className="flex flex-col md:flex-row flex-1 w-full">
				<DocsBar />

				{/* Main Content Area - takes up remaining width */}
				<div className="flex-1 min-w-0">{children}</div>
			</div>
		</div>
	);
}
