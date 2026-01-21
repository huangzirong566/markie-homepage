import Hero from "@/components/Hero";
import About from "@/components/About";
import ExperienceAndWorks from "@/components/ExperienceAndWorks";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
      <Hero />
      <About />
      <ExperienceAndWorks />
      <Contact />
    </div>
  );
}
