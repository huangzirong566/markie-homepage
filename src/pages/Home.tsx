import Hero from "@/components/Hero";
import About from "@/components/About";
import ExperienceAndWorks from "@/components/ExperienceAndWorks";
import Contact from "@/components/Contact";
import ScrollGuide from "@/components/ScrollGuide";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
      <ScrollGuide />
      <Hero />
      <About />
      <ExperienceAndWorks />
      <Contact />
    </div>
  );
}
