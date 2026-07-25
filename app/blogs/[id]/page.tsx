import fs from "fs";
import path from "path";
import {MDXRemote} from "next-mdx-remote/rsc";
import {notFound} from "next/navigation";
import Link from "next/link";
import {ChevronRight, AlertCircle, Info, ArrowLeft} from "lucide-react";

// 1. Tell Next.js where to look for the MDX files
// Ensure you have a 'content/blog' folder at the root of your Next.js project
const blogDirectory = path.join(process.cwd(), "content/blog");

// 2. Fetch the specific file based on the URL slug[cite: 4]
async function getBlogPost(id: string) {
	try {
		console.log(blogDirectory);
		const filePath = path.join(blogDirectory, `${id}.mdx`);
		const fileContent = fs.readFileSync(filePath, "utf8");
		return fileContent;
	} catch (error) {
		return null; // File doesn't exist[cite: 4]
	}
}

// 3. Define Custom MDX Components[cite: 4]
const mdxComponents = {
	Callout: (props: {type?: "warning" | "info"; children: React.ReactNode}) => {
		const isWarning = props.type === "warning";
		return (
			<div className={`p-4 rounded-2xl border my-6 flex gap-3 items-start shadow-sm w-full max-w-full overflow-hidden ${isWarning ? "bg-amber-50 border-amber-200 text-amber-900" : "bg-indigo-50 border-indigo-200 text-indigo-900"}`}>
				{isWarning ? <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /> : <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />}
				{/* min-w-0 and flex-1 here prevent long strings from breaking out of the Callout[cite: 4] */}
				<div className="text-sm leading-relaxed [&>p]:m-0 min-w-0 flex-1 break-words">{props.children}</div>
			</div>
		);
	},
};

export default async function BlogPostPage({params}: {params: Promise<{id: string}>}) {
	// 4. Await params first (Next.js 15 requirement)[cite: 4]
	const {id} = await params;

	// 5. Read the file[cite: 4]
	const mdxContent = await getBlogPost(id);

	// 6. If the user types a bad URL, show a 404[cite: 4]
	if (!mdxContent) {
		notFound();
	}

	return (
		<main className="min-h-screen bg-gray-50/50 pt-24 pb-24 md:pb-32 relative overflow-hidden z-0">
			{/* --- PREMIUM GRADIENT GLOW BEHIND HEADER --- */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-indigo-500/10 to-purple-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

			<div className="w-full max-w-3xl mx-auto px-6 md:px-8 relative z-10 min-w-0 flex-1">
				{/* Breadcrumb Navigation[cite: 4] */}
				<div className="mb-10 flex flex-wrap items-center gap-2 text-sm font-medium text-gray-500">
					<Link href="/blogs" className="hover:text-indigo-600 transition-colors shrink-0 flex items-center gap-1.5">
						<ArrowLeft className="w-4 h-4" />
						Back to articles
					</Link>
					<ChevronRight className="w-4 h-4 shrink-0 mx-1 opacity-50" />
					{/* Replaces all hyphens with spaces for a clean breadcrumb title */}
					<span className="text-gray-900 capitalize truncate min-w-0 shrink">{id.replace(/-/g, " ")}</span>
				</div>

				{/* Markdown Container */}
				<article
					className="
                    w-full min-w-0 max-w-full
                    prose prose-slate prose-base sm:prose-lg max-w-none
                    
                    /* Headings & Links[cite: 4] */
                    prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900
                    prose-h1:text-3xl sm:prose-h1:text-4xl md:prose-h1:text-5xl prose-h1:font-extrabold prose-h1:mb-12 prose-h1:leading-[1.15]
                    prose-h2:mt-12 prose-h3:mt-8
                    prose-a:text-indigo-600 prose-a:font-medium hover:prose-a:text-indigo-500 prose-a:underline-offset-4 prose-a:break-words
                    
                    /* Paragraphs, Lists & Blockquotes[cite: 4] */
                    prose-p:text-gray-600 prose-p:leading-relaxed prose-p:break-words 
                    prose-li:text-gray-600 prose-li:break-words
                    prose-blockquote:border-l-indigo-500 prose-blockquote:bg-indigo-50/50 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded-r-xl prose-blockquote:text-gray-700 prose-blockquote:not-italic
                    
                    /* Inline Code Constraints[cite: 4] */
                    prose-code:text-indigo-900 prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-semibold
                    prose-code:break-words prose-code:before:content-none prose-code:after:content-none
                    
                    /* Pre Code Blocks (Allows horizontal scrolling exclusively inside the code block)[cite: 4] */
                    [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-gray-200 [&_pre_code]:font-normal [&_pre_code]:break-normal [&_pre_code]:whitespace-pre
                    [&_pre]:bg-gray-900 [&_pre]:overflow-x-auto [&_pre]:max-w-full [&_pre]:w-full [&_pre]:my-8 [&_pre]:rounded-2xl [&_pre]:shadow-lg [&_pre]:border [&_pre]:border-gray-800 [&_pre]:p-6
                    
                    /* Images */
                    prose-img:rounded-2xl prose-img:border prose-img:border-gray-200 prose-img:shadow-sm
                    
                    /* Table Constraints[cite: 4] */
                    [&_table]:block [&_table]:overflow-x-auto [&_table]:w-full [&_table]:max-w-full [&_table]:whitespace-nowrap sm:[&_table]:whitespace-normal
                    prose-th:bg-gray-50 prose-th:px-4 prose-th:py-3 prose-th:text-gray-900 prose-th:border prose-th:border-gray-200
                    prose-td:px-4 prose-td:py-3 prose-td:text-gray-600 prose-td:border prose-td:border-gray-200
                "
				>
					{/* Render MDX using the content string returned from local filesystem[cite: 4] */}
					<MDXRemote source={mdxContent} components={mdxComponents} options={{parseFrontmatter: true}} />
				</article>

				{/* Premium Footer Touch */}
				<div className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
					<p className="text-sm text-gray-500 font-medium">Thanks for reading!</p>
					<Link href="/blogs" className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors">
						Read more articles
					</Link>
				</div>
			</div>
		</main>
	);
}
