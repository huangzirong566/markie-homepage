import { motion } from "framer-motion";
import { Download, Play, ExternalLink } from "lucide-react";
import work1Img from "@/assets/work-gaybar.png";
import work2Img from "@/assets/work-singer.webp";
import work3Img from "@/assets/work-canteen.jpg";
import iconBilibili from "@/assets/icon-bilibili.svg";
import iconDouyin from "@/assets/icon-douyin.svg";

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
    title: "直男 GAY 吧初体验",
    platform: "Bilibili",
    icon: iconBilibili,
    url: "https://www.bilibili.com/video/BV1vT5XzbE85",
    image: work1Img,
    views: "1.2w"
  },
  {
    title: "冷门歌手？AI 修复",
    platform: "Douyin",
    icon: iconDouyin,
    url: "https://www.douyin.com/video/7517631316435946764",
    image: work2Img,
    views: "热门"
  },
  {
    title: "学校食堂？预制菜？",
    platform: "Douyin",
    icon: iconDouyin,
    url: "https://www.douyin.com/video/7491249976077585690",
    image: work3Img,
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
             <h2 className="text-3xl font-display font-bold text-white">工作经历</h2>
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
             <h2 className="text-3xl font-display font-bold text-white">视频作品</h2>
           </div>
           
           {/* Works Container Frame */}
           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
             <div className="space-y-6">
               {works.map((work, i) => (
                 <a 
                   key={i} 
                   href={work.url} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="group flex gap-5 items-center p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/5"
                 >
                   {/* Thumbnail with Frame */}
                   <div className="relative w-40 aspect-video rounded-lg overflow-hidden border border-white/10 shadow-lg shrink-0">
                     <img 
                       src={work.image} 
                       alt={work.title} 
                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                     />
                     {/* Always visible Play Button overlay */}
                     <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                       <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                         <Play className="w-3 h-3 text-black fill-current ml-0.5" />
                       </div>
                     </div>
                   </div>

                   {/* Info */}
                   <div className="flex-1 min-w-0">
                     <div className="flex items-center gap-2 mb-1">
                       <div className={`w-auto h-4 px-1.5 py-0.5 rounded-full flex items-center justify-center ${
                         work.platform === 'Bilibili' ? 'bg-blue-500/20' : 'bg-black/20 border border-white/10'
                       }`}>
                         <img src={work.icon} alt={work.platform} className="h-full w-auto object-contain" />
                       </div>
                       <span className="text-[10px] text-white/40 uppercase tracking-wider">{work.views}</span>
                     </div>
                     <h3 className="text-base font-bold text-white leading-snug group-hover:text-emerald-400 transition-colors truncate pr-2">
                       {work.title}
                     </h3>
                   </div>
                   
                   <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors shrink-0 mr-2" />
                 </a>
               ))}
             </div>
           </div>
        </div>

      </div>
    </section>
  );
}
