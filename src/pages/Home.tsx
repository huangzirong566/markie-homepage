import Hero from "@/components/Hero";
import About from "@/components/About";
import ExperienceAndWorks from "@/components/ExperienceAndWorks";
import Contact from "@/components/Contact";
import ScrollGuide from "@/components/ScrollGuide";
import { MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
      <ScrollGuide />
      <Hero />
      <About />
      <ExperienceAndWorks />
      <Contact />
      
      {/* 悬浮聊天按钮 */}
      <a
        href="#/chat"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
        title="和我对话"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
    </div>
  );
}
