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
        
        {/* Main Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-xl shadow-2xl bg-gray-900 opacity-95"
        >
          <div className="p-6 md:p-12">
            
            {/* Header: Name + Avatar */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold text-white">
                Mark-黄子榕
              </h3>
              <img 
                src={avatarImg} 
                alt="头像" 
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            
            {/* Divider */}
            <div className="w-full border-b-2 border-purple-500 opacity-25 mb-6" />

            {/* Job Title */}
            <p className="text-base font-bold flex items-center text-white mb-2">
              <Briefcase className="w-4 h-4 mr-3 text-purple-500" />
              AI 产品实习生 / 独立创作者
            </p>

            {/* Location */}
            <p className="text-xs lg:text-sm flex items-center text-gray-400 mb-8">
              <MapPin className="w-4 h-4 mr-3 text-purple-500" />
              中国 · 北京
            </p>

            {/* Description */}
            <p className="text-sm text-gray-400 mb-10">
              专注于 AI 产品的设计与开发，正在搭建一款AI创作平台，副业在做自媒体。
            </p>

            {/* Contact Button */}
            <div className="mb-8">
              <a 
                href="#/contact"
                className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                联系我
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-8">
              <a 
                href="#/contact" 
                className="text-gray-400 hover:text-green-400 transition-all duration-300 hover:-translate-y-0.5"
                title="微信"
              >
                <img src={iconWechat} alt="微信" className="w-7 h-7" />
              </a>
              
              <a 
                href="https://www.xiaohongshu.com/user/profile/60f8378f0000000001002283" 
                target="_blank" 
                className="text-gray-400 hover:text-red-400 transition-all duration-300 hover:-translate-y-0.5"
                title="小红书"
              >
                <img src={iconXiaohongshu} alt="小红书" className="w-7 h-7" />
              </a>
              
              <a 
                href="https://space.bilibili.com/" 
                target="_blank" 
                className="text-gray-400 hover:text-pink-400 transition-all duration-300 hover:-translate-y-0.5"
                title="哔哩哔哩"
              >
                <img src={iconBilibili} alt="哔哩哔哩" className="w-7 h-7" />
              </a>
              
              <a 
                href="https://github.com/huangzirong566" 
                target="_blank" 
                className="text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                title="GitHub"
              >
                <Github className="w-7 h-7" />
              </a>
              
              <a 
                href="https://www.imastudio.com/community" 
                target="_blank" 
                className="transition-all duration-300 hover:-translate-y-0.5"
                title="Ima Studio"
              >
                <img src={iconImastudio} alt="Ima Studio" className="w-7 h-7 rounded-lg" />
              </a>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
