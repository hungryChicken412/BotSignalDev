import { Meta } from "./Meta";
import { SiteArchitecture } from "./SiteArchitecture";

export default function SeoAnalysis({
	metadata,
	siteArchitecture,
}: {
	metadata: any;
	siteArchitecture: any;
}) {
	return (
		<div className="lg:col-span-2 flex flex-col gap-6">
			<Meta metadata={metadata} />
			<SiteArchitecture data={siteArchitecture} />
		</div>
	);
}
