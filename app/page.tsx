import Navbar from "./components/Navbar";
import CTA from "./components/LandingPage/CTA";
import FAQSection from "./components/LandingPage/FAQ";
import Hero from "./components/LandingPage/Hero";
import PricingSection from "./components/LandingPage/Pricing";

import WhyItMatters from "./components/LandingPage/WhyItMatters";
import HowItWorks from "./components/LandingPage/HowItWorks";
import HeroLogin from "./components/LandingPage/HeroLogin";

export default function Home() {
	return (
		<>
			<Navbar />
			<main className="max-w-[1728px] mx-auto w-full">
				{/* <Hero /> */}
				<HeroLogin/>

				<WhyItMatters />
				<HowItWorks />

				<PricingSection />

				<FAQSection />

				<CTA />
			</main>
		</>
	);
}
