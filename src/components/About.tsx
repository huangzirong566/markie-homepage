import { motion } from "framer-motion";
import avatarImg from "@/assets/avatar.jpeg";
import { Github, Mail } from "lucide-react";
import iconBilibili from "@/assets/icon-bilibili.svg";
import iconDouyin from "@/assets/icon-douyin.svg";
import iconXiaohongshu from "@/assets/icon-xiaohongshu.svg";
import iconWechat from "@/assets/icon-wechat.svg";
import TagCloud from "@/components/TagCloud";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-24 w-full max-w-[1400px] mx-auto border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
        
        {/* Left Column: Profile Card (Arlo Style) */}
        <div className="md:col-span-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Round Avatar */}
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/10 shadow-xl">
              <img src={avatarImg} alt="Mark" className="w-full h-full object-cover" />
            </div>
            
            {/* Name */}
            <h3 className="text-4xl font-bold text-white">Mark</h3>
            
            {/* Subtitle - Highlighted */}
            <p className="text-xl text-blue-400 font-medium">
              AI 产品实习生 / 独立创作者
            </p>
            
            {/* Description */}
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                专注于 AI 产品的设计与开发，热衷于将 AI 能力转化为解决实际问题的产品。
              </p>
              <p>
                20岁，擅长从 0 到 1 打造产品，从需求洞察、产品设计到技术实现全流程把控。相信好的 AI 产品应该让复杂的技术变得简单易用。
              </p>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              <a href="https://github.com/huangzirong566" target="_blank" className="text-white/40 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://space.bilibili.com/" target="_blank" className="opacity-40 hover:opacity-100 transition-opacity">
                <img src={iconBilibili} alt="Bilibili" className="w-5 h-5" />
              </a>
              <a href="https://www.douyin.com/user/self" target="_blank" className="opacity-40 hover:opacity-100 transition-opacity">
                <img src={iconDouyin} alt="Douyin" className="w-5 h-5" />
              </a>
              <a href="https://www.xiaohongshu.com/user/profile/60f8378f0000000001002283" target="_blank" className="opacity-40 hover:opacity-100 transition-opacity">
                <img src={iconXiaohongshu} alt="小红书" className="w-5 h-5" />
              </a>
              <a href="#/contact" className="opacity-40 hover:opacity-100 transition-opacity">
                <img src={iconWechat} alt="微信" className="w-5 h-5" />
              </a>
            </div>
            
            {/* Contact Button */}
            <a 
              href="#/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors mt-2"
            >
              <Mail className="w-4 h-4" />
              联系我
            </a>
          </motion.div>
        </div>

        {/* Right Column: Tag Cloud */}
        <div className="md:col-span-8 space-y-12">
          {/* Interests & Skills (3D Tag Cloud) */}
          <div className="relative flex flex-col mb-16">
             <div className="flex items-center justify-between mb-4">
               <span className="text-xs font-bold text-white/40 uppercase tracking-widest">标签云</span>
               <div className="text-[10px] text-white/20 uppercase tracking-widest border border-white/10 px-2 py-0.5 rounded-full">3D View</div>
             </div>
             <div className="w-full h-[280px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm shadow-inner relative group">
               <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
               <TagCloud />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
