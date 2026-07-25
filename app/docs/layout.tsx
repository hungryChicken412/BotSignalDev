
import Navbar from "@/app/components/docs/Navbar";
import DocsBar from "../components/docs/docsBar";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-full flex flex-col relative z-0">
			<Navbar />
			   <DocsBar/>

			

			{children}
		</div>
	);
}
