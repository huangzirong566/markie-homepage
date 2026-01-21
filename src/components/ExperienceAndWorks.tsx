import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const history = [
  {
    year: "2025.10 — Present",
    role: "产品实习生 (AI Video)",
    company: "乐我无限",
    desc: "负责 imastudio 平台增长，优化视频生成体验，搭建 Agent 工作流。"
  },
  {
    year: "2025.04 — 2025.09",
    role: "产品实习生 (AI Anime)",
    company: "网易互娱",
    desc: "产出 50+ AI 漫剧，搭建 ComfyUI 工作流与智能分镜 Agent。"
  },
  {
    year: "2025.09",
    role: "一等奖",
    company: "WaytoAGI 黑客松",
    desc: "开发视频转总结工具，解决信息过载问题。"
  }
];

export default function ExperienceAndWorks() {
  return (
    <section id="works" className="py-24 px-6 md:px-24 w-full max-w-[1400px] mx-auto border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
        
        {/* Left: Experience List */}
        <div>
           <div className="flex items-center justify-between mb-12">
             <h2 className="text-3xl font-display font-bold text-white">经历与里程碑</h2>
             <a href="/resume.pdf" download className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors border-b border-white/20 pb-0.5">
               <Download className="w-4 h-4" /> 简历 PDF
             </a>
           </div>
           
           <div className="space-y-12">
             {history.map((item, i) => (
               <div key={i} className="group">
                 <div className="flex items-center gap-4 text-xs font-bold text-white/30 uppercase tracking-widest mb-2">
                   <span>{item.year}</span>
                   <div className="h-[1px] flex-1 bg-white/10 group-hover:bg-white/30 transition-colors" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-1 group-hover:text-white/80 transition-colors">{item.role}</h3>
                 <div className="text-sm text-white/50 mb-3">{item.company}</div>
                 <p className="text-white/60 font-light text-sm leading-relaxed max-w-md">
                   {item.desc}
                 </p>
               </div>
             ))}
           </div>
        </div>

        {/* Right: Selected Works (Empty State as requested) */}
        <div>
           <div className="flex items-center justify-between mb-12">
             <h2 className="text-3xl font-display font-bold text-white">精选作品</h2>
           </div>
           
           <div className="h-[500px] border border-white/10 bg-white/5 flex flex-col items-center justify-center text-center p-8 group hover:bg-white/10 transition-colors cursor-pointer">
              <Link href="/portfolio">
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <h3 className="text-2xl font-bold text-white mb-4">View Full Portfolio</h3>
                  <p className="text-white/50 max-w-sm mb-8">
                    Explore a collection of photography, design, and AI-generated works.
                  </p>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
           </div>
        </div>

      </div>
    </section>
  );
}
