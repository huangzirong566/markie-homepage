import { motion } from "framer-motion";
import { Download, Play, ExternalLink } from "lucide-react";
import work1Img from "@/assets/work-1.jpg";
import work2Img from "@/assets/gallery-2.jpg";
import work3Img from "@/assets/gallery-3.jpg";

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

const works = [
  {
    title: "看见白袜就想闻怎么办？",
    platform: "Bilibili",
    url: "https://www.bilibili.com/video/BV1vT5XzbE85",
    image: work1Img,
    views: "1.2w"
  },
  {
    title: "AI 视频创作",
    platform: "Douyin",
    url: "https://www.douyin.com/video/7517631316435946764",
    image: work2Img, // 暂用 gallery-2
    views: "热门"
  },
  {
    title: "创意短片",
    platform: "Douyin",
    url: "https://www.douyin.com/video/7491249976077585690",
    image: work3Img, // 暂用 gallery-3
    views: "精选"
  }
];

export default function ExperienceAndWorks() {
  return (
    <section id="works" className="py-24 px-6 md:px-24 w-full max-w-[1400px] mx-auto border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        
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

        {/* Right: Selected Works */}
        <div>
           <div className="flex items-center justify-between mb-12">
             <h2 className="text-3xl font-display font-bold text-white">精选作品</h2>
           </div>
           
           <div className="grid grid-cols-3 gap-4">
             {works.map((work, i) => (
               <a 
                 key={i} 
                 href={work.url} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="group relative aspect-[9/16] bg-white/5 overflow-hidden border border-white/10 cursor-pointer"
               >
                 {/* Image */}
                 <img 
                   src={work.image} 
                   alt={work.title} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                 />
                 
                 {/* Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                 
                 {/* Play Icon */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                   <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                     <Play className="w-4 h-4 fill-current" />
                   </div>
                 </div>

                 {/* Content */}
                 <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                   <div className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1 flex items-center justify-between">
                     <span>{work.platform}</span>
                     <span>{work.views}</span>
                   </div>
                   <h3 className="text-sm font-bold text-white leading-tight line-clamp-2 group-hover:text-emerald-400 transition-colors">
                     {work.title}
                   </h3>
                 </div>
               </a>
             ))}
           </div>
        </div>

      </div>
    </section>
  );
}
