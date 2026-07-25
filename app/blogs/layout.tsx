import Navbar from "@/app/components/Navbar";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-full flex flex-col relative z-0">
			<Navbar />

			{children}
		</div>
	);
}
