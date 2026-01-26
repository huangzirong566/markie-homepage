import { motion } from "framer-motion";
import avatarImg from "@/assets/avatar-coffee.png";
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
      <div className="max-w-4xl mx-auto flex items-center flex-wrap">
        
        {/* Main Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl mx-6 lg:mx-0 relative bg-gray-900 opacity-95"
        >
          <div className="p-6 md:p-12 text-center lg:text-left">
            
            {/* Avatar (mobile) */}
            <div 
              className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center border-4 border-gray-800"
              style={{ backgroundImage: `url(${avatarImg})` }}
            />

            {/* Name */}
            <h3 className="text-3xl font-bold pt-8 lg:pt-0 text-white">
              Mark-黄子榕
            </h3>
            
            {/* Divider */}
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-purple-500 opacity-25" />

            {/* Job Title */}
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start text-white">
              <Briefcase className="w-4 h-4 mr-3 text-purple-500" />
              AI 产品实习生 / 独立创作者
            </p>

            {/* Location */}
            <p className="pt-2 text-xs lg:text-sm flex items-center justify-center lg:justify-start text-gray-400">
              <MapPin className="w-4 h-4 mr-3 text-purple-500" />
              中国 · 北京
            </p>

            {/* Description */}
            <p className="pt-8 text-sm text-gray-400">
              专注于 AI 产品的设计与开发，正在搭建一款AI创作平台，副业在做自媒体。
            </p>

            {/* Contact Button */}
            <div className="pt-12 pb-8">
              <a 
                href="#/contact"
                className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                联系我
              </a>
            </div>

            {/* Social Links - 微信、小红书、B站、GitHub、Imastudio */}
            <div className="mt-6 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex items-center justify-start gap-8">
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

        {/* Avatar (desktop) - 圆角头像形式 */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:w-2/5 hidden lg:flex items-center justify-center"
        >
          <div className="w-64 h-64 rounded-2xl shadow-2xl overflow-hidden border-4 border-gray-800">
            <img 
              src={avatarImg} 
              alt="头像" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
