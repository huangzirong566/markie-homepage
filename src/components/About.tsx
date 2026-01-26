import { motion } from "framer-motion";
import avatarImg from "@/assets/avatar-circle.png";
import { Github, Mail, Briefcase, MapPin } from "lucide-react";
import iconBilibili from "@/assets/icon-bilibili.svg";
import iconXiaohongshu from "@/assets/icon-xiaohongshu.svg";
import iconWechat from "@/assets/icon-wechat.svg";
import iconImastudio from "@/assets/icon-imastudio.png";

export default function About() {
  return (
    <section 
      id="about" 
      className="py-24 px-6 md:px-24 w-full bg-black"
    >
      <div className="max-w-4xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row gap-8 lg:gap-12"
        >
          {/* Left Column */}
          <div className="flex-1 space-y-6">
            
            {/* Name */}
            <h3 className="text-3xl font-bold text-white">
              Mark-黄子榕
            </h3>
            
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
          </div>

          {/* Right Column */}
          <div className="flex flex-col items-center lg:items-end gap-6">
            {/* Avatar */}
            <img 
              src={avatarImg} 
              alt="头像" 
              className="w-40 h-40 rounded-full object-cover shadow-xl"
            />
            
            {/* Contact Button */}
            <a 
              href="#/contact"
              className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 inline-flex items-center gap-2 shadow-lg"
            >
              <Mail className="w-5 h-5" />
              联系我
            </a>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
