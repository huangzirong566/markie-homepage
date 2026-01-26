import { motion } from "framer-motion";
import avatarImg from "@/assets/avatar-circle.png";
import { Github, Mail, Briefcase, MapPin } from "lucide-react";
import iconBilibili from "@/assets/icon-bilibili.svg";
import iconXiaohongshu from "@/assets/icon-xiaohongshu.svg";
import iconWechat from "@/assets/icon-wechat.svg";
import iconImastudio from "@/assets/icon-imastudio.png";

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

export default function About() {
  return (
    <section 
      id="about" 
      className="py-24 px-6 md:px-24 w-full bg-black"
    >
      <div className="max-w-6xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
        >
          {/* Left Column - Profile */}
          <div className="space-y-6">
            
            {/* Header: Name + Avatar */}
            <div className="flex items-start justify-between">
              <h3 className="text-3xl font-bold text-white">
                Mark-黄子榕
              </h3>
              <img 
                src={avatarImg} 
                alt="头像" 
                className="w-28 h-28 rounded-full object-cover shadow-xl"
              />
            </div>
            
            {/* Divider */}
            <div className="w-full border-b border-white/20" />

            {/* Info Card */}
            <div className="bg-gray-900 rounded-xl p-6 space-y-4">
              {/* Job Title */}
              <p className="text-base font-bold flex items-center text-white">
                <Briefcase className="w-4 h-4 mr-3 text-purple-500" />
                AI 产品<span className="bg-purple-600 text-white px-1.5 py-0.5 rounded text-sm mx-1">经理</span>/ 独立创作者
              </p>

              {/* Location */}
              <p className="text-sm flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-3 text-purple-500" />
                <span className="border border-white/20 rounded-full px-3 py-0.5">北京·朝阳</span>
              </p>

              {/* Description */}
              <p className="text-sm text-gray-400 pt-2">
                专注于 AI 产品的设计与开发，正在搭建一款AI创作平台，副业在做自媒体。
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6 pt-2">
              <a 
                href="#/contact" 
                className="text-gray-400 hover:text-green-400 transition-all duration-300 hover:-translate-y-0.5"
                title="微信"
              >
                <img src={iconWechat} alt="微信" className="w-8 h-8" />
              </a>
              
              <a 
                href="https://www.xiaohongshu.com/user/profile/60f8378f0000000001002283" 
                target="_blank" 
                className="text-gray-400 hover:text-red-400 transition-all duration-300 hover:-translate-y-0.5"
                title="小红书"
              >
                <img src={iconXiaohongshu} alt="小红书" className="w-8 h-8" />
              </a>
              
              <a 
                href="https://space.bilibili.com/" 
                target="_blank" 
                className="text-gray-400 hover:text-pink-400 transition-all duration-300 hover:-translate-y-0.5"
                title="哔哩哔哩"
              >
                <img src={iconBilibili} alt="哔哩哔哩" className="w-8 h-8" />
              </a>
              
              <a 
                href="https://github.com/huangzirong566" 
                target="_blank" 
                className="text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                title="GitHub"
              >
                <Github className="w-8 h-8" />
              </a>
              
              <a 
                href="https://www.imastudio.com/community" 
                target="_blank" 
                className="transition-all duration-300 hover:-translate-y-0.5"
                title="Ima Studio"
              >
                <img src={iconImastudio} alt="Ima Studio" className="w-8 h-8 rounded-lg" />
              </a>
            </div>

            {/* Contact Button */}
            <a 
              href="#/contact"
              className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 inline-flex items-center gap-2 shadow-lg"
            >
              <Mail className="w-5 h-5" />
              联系我
            </a>
          </div>

          {/* Right Column - Work Experience */}
          <div>
            <h2 className="text-3xl font-display font-bold text-white mb-12">工作经历</h2>
            
            <div className="space-y-10">
              {history.map((item, i) => (
                <div key={i} className="group">
                  <div className="flex items-center gap-4 text-xs font-bold text-white/30 uppercase tracking-widest mb-3">
                    <span>{item.year}</span>
                    <div className="h-[1px] flex-1 bg-white/10 group-hover:bg-white/30 transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-white/80 transition-colors">{item.role}</h3>
                  <div className="text-sm text-white/50 mb-3">{item.company}</div>
                  <p className="text-white/60 font-light text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
