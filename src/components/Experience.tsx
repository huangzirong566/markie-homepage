import { motion } from "framer-motion";
import { Download, Briefcase, GraduationCap, Award } from "lucide-react";

const history = [
  {
    type: "work",
    year: "2025.10 — Present",
    role: "Product Intern (AI Video)",
    company: "LeWo Unlimited",
    description: "Driving growth for 'imastudio' AIGC platform. Optimized video generation features, served 100+ AI drama studios, and built Agent workflows to match user needs with model capabilities."
  },
  {
    type: "work",
    year: "2025.04 — 2025.09",
    role: "Product Intern (AI Anime)",
    company: "NetEase Games",
    description: "Produced 50+ AI anime episodes for Douyin. Built ComfyUI workflows from scratch, managed 30+ LoRA models, and developed intelligent storyboard Agents using Coze."
  },
  {
    type: "project",
    year: "2025.09",
    role: "First Prize Winner",
    company: "WaytoAGI Hackathon",
    description: "Developed a video-to-summary workflow tool in 3 hours using Vibe Coding. Solved information overload for 300+ knowledge workers."
  },
  {
    type: "project",
    year: "2024.11 — 2025.01",
    role: "Content Operation Intern",
    company: "Star River Awakening",
    description: "Operated 'Tipsy' AI companion platform targeting global markets. Created 6 hit characters with >100k interactions using Midjourney & SD WebUI."
  },
  {
    type: "education",
    year: "2022 — 2026",
    role: "B.A. Broadcasting & Hosting",
    company: "Nanchang Hangkong University",
    description: "Undergraduate student. Combining artistic expression with technical AI skills."
  }
];

export default function Experience() {
  return (
    <section className="py-32 px-6 md:px-24 w-full max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl md:text-6xl font-bold mb-8 md:mb-0"
        >
          Journey <br />&amp; <span className="text-white/40">Milestones.</span>
        </motion.h2>
        
        <motion.a
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          href="/resume.pdf" 
          download="Markie_Resume.pdf"
          className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-white/90 transition-colors flex items-center gap-3"
        >
          <Download className="w-4 h-4" /> Download Resume
        </motion.a>
      </div>
      
      <div className="space-y-12 border-l border-white/10 pl-8 md:pl-16 relative">
        {history.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className="absolute -left-[calc(2rem+5px)] md:-left-[calc(4rem+5px)] top-2 w-2.5 h-2.5 bg-white rounded-full ring-4 ring-black" />
            
            <span className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2 block">
              {item.year}
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">
              {item.role}
            </h3>
            <div className="flex items-center gap-2 text-sm uppercase tracking-wide text-white/70 mb-4">
              {item.type === 'work' ? <Briefcase className="w-3 h-3" /> : item.type === 'project' ? <Award className="w-3 h-3" /> : <GraduationCap className="w-3 h-3" />}
              {item.company}
            </div>
            <p className="text-muted-foreground font-light max-w-xl text-base">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
