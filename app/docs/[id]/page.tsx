import fs from "fs";
import path from "path";
import {MDXRemote} from "next-mdx-remote/rsc";
import {notFound} from "next/navigation";
import Link from "next/link";
import {ChevronRight, AlertCircle, Info} from "lucide-react";

// 1. Tell Next.js where to look for the MDX files
const docsDirectory = path.join(process.cwd(), "content/docs");

// 2. Fetch the specific file based on the URL slug
async function getDoc(id: string) {
	try {
		const filePath = path.join(docsDirectory, `${id}.mdx`);
		const fileContent = fs.readFileSync(filePath, "utf8");
		return fileContent;
	} catch (error) {
		return null; // File doesn't exist
	}
}

// 3. DEFINE YOUR CUSTOM MDX COMPONENTS HERE
const mdxComponents = {
	Callout: (props: {type?: "warning" | "info"; children: React.ReactNode}) => {
		const isWarning = props.type === "warning";
		return (
			<div className={`p-4 rounded-2xl border my-6 flex gap-3 items-start shadow-sm w-full max-w-full overflow-hidden ${isWarning ? "bg-amber-50 border-amber-200 text-amber-900" : "bg-indigo-50 border-indigo-200 text-indigo-900"}`}>
				{isWarning ? <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /> : <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />}
				{/* min-w-0 and flex-1 here prevent long strings from breaking out of the Callout */}
				<div className="text-sm leading-relaxed [&>p]:m-0 min-w-0 flex-1 break-words">{props.children}</div>
			</div>
		);
	},
};

export default async function DocPage({params}: {params: Promise<{id: string}>}) {
	// 4. Await params first (Next.js 15 requirement)
	const {id} = await params;

	// 5. Read the file
	const mdxContent = await getDoc(id);

	// 6. If the user types a bad URL, show a 404
	if (!mdxContent) {
		notFound();
	}

	return (
		<main className="ml-0 md:ml-64 pt-24 pb-24 md:pb-12 px-4 sm:px-6 md:px-8 w-full md:w-[calc(100%-16rem)] max-w-[100vw] min-h-screen text-gray-900 bg-gray-50/50 overflow-x-hidden flex flex-col">
			{/* Inner Wrapper restricts max width without blowing out viewport */}
			<div className="w-full max-w-5xl mx-auto min-w-0 flex-1">
				{/* Breadcrumb Navigation */}
				<div className="mb-6 flex flex-wrap items-center gap-2 text-sm font-medium text-gray-500">
					<Link href="/docs" className="hover:text-indigo-600 transition-colors shrink-0">
						Help Center
					</Link>
					<ChevronRight className="w-4 h-4 shrink-0" />
					<span className="text-gray-900 capitalize truncate min-w-0 shrink">{id.replace("-", " ")}</span>
				</div>

				{/* Markdown Container */}
				<article
					className="
                    w-full min-w-0 max-w-full
                    prose prose-slate lg:prose-lg max-w-none 
                    
                    /* Headings & Links */
                    prose-headings:font-bold prose-headings:tracking-tight 
                    prose-a:text-indigo-600 prose-a:break-words
                    
                    /* Paragraphs & Lists */
                    prose-p:break-words prose-li:break-words
                    
                    /* Inline Code Constraints (prevents long variables from stretching mobile screens) */
                    prose-code:text-indigo-900 prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md 
                    prose-code:break-words prose-code:before:content-none prose-code:after:content-none
                    
                    /* Pre Code Blocks (Allows horizontal scrolling exclusively inside the code block) */
                    [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit [&_pre_code]:break-normal [&_pre_code]:whitespace-pre
                    [&_pre]:overflow-x-auto [&_pre]:max-w-full [&_pre]:w-full [&_pre]:my-6
                    
                    /* Table Constraints */
                    [&_table]:block [&_table]:overflow-x-auto [&_table]:w-full [&_table]:max-w-full [&_table]:whitespace-nowrap sm:[&_table]:whitespace-normal
                    
                    /* Container Styling */
                    bg-white p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-gray-200 shadow-[0_4px_24px_rgba(0,0,0,0.02)]
                "
				>
					<MDXRemote source={mdxContent} components={mdxComponents} options={{parseFrontmatter: true}} />
				</article>
			</div>
		</main>
	);
}
