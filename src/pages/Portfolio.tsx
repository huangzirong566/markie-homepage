import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const projects = [
  {
    id: 1,
    title: "AI 漫剧工作流",
    category: "AIGC / ComfyUI",
    description: "在网易互娱期间搭建的自动化漫剧生成工作流，累计产出 50+ 剧集。",
    image: gallery1,
    span: "col-span-2 row-span-2",
  },
  {
    id: 2,
    title: "Tipsy 角色设计",
    category: "Character Design",
    description: "为海外陪伴平台打造的高热度虚拟角色，单角色互动破 10w+。",
    image: gallery2,
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    title: "黑客松获奖项目",
    category: "Product Design",
    description: "WaytoAGI 比赛一等奖作品，解决知识工作者信息过载问题。",
    image: gallery3,
    span: "col-span-1 row-span-2",
  },
  {
    id: 4,
    title: "摄影习作",
    category: "Photography",
    description: "日常观察与光影记录。",
    image: gallery4,
    span: "col-span-1 row-span-1",
  },
];

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] p-4 md:p-12">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-12 max-w-7xl mx-auto"
      >
        <Link href="/">
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all text-gray-600 hover:text-black">
            <ArrowLeft className="w-4 h-4" /> 返回主页
          </button>
        </Link>
        <h1 className="text-xl font-bold tracking-tight">Selected Works</h1>
      </motion.div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        {projects.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            className={`group relative overflow-hidden rounded-[2rem] bg-white shadow-sm hover:shadow-xl transition-all duration-500 ${item.span}`}
          >
            <div className="absolute inset-0">
               <img 
                 src={item.image} 
                 alt={item.title} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 md:translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex flex-col justify-end h-full">
               <div className="text-white/60 text-xs font-bold uppercase tracking-wider mb-2">{item.category}</div>
               <h3 className="text-white text-2xl font-bold mb-2">{item.title}</h3>
               <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-md line-clamp-2 md:line-clamp-none">
                 {item.description}
               </p>
               <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity delay-100 hover:scale-110">
                 <ArrowUpRight className="w-5 h-5" />
               </button>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 text-center pb-12">
         <p className="text-gray-400 text-sm">More works coming soon.</p>
      </div>
    </div>
  );
}
