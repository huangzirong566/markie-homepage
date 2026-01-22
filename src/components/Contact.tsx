import { motion } from "framer-motion";
import { Github } from "lucide-react";
import iconBilibili from "@/assets/icon-bilibili.svg";
import iconDouyin from "@/assets/icon-douyin.svg";
import iconXiaohongshu from "@/assets/icon-xiaohongshu.svg";
import iconWechat from "@/assets/icon-wechat.svg";

const socials = [
  { name: "GitHub", icon: "github", url: "https://github.com/huangzirong566" },
  { name: "Bilibili", icon: iconBilibili, url: "https://space.bilibili.com/" },
  { name: "抖音", icon: iconDouyin, url: "https://www.douyin.com/user/self" },
  { name: "小红书", icon: iconXiaohongshu, url: "https://www.xiaohongshu.com/user/profile/60f8378f0000000001002283" },
  { name: "微信", icon: iconWechat, url: "#/contact" },
];

export default function Contact() {
  return (
    <footer className="py-16 px-6 md:px-24 w-full max-w-[1400px] mx-auto border-t border-white/5">
      {/* Social Links */}
      <div className="flex flex-col items-center gap-8 mb-12">
        <div className="flex items-center gap-6">
          {socials.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target={social.url.startsWith("#") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-colors group"
              title={social.name}
            >
              {social.icon === "github" ? (
                <Github className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
              ) : (
                <img src={social.icon} alt={social.name} className="w-5 h-5 object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
              )}
            </motion.a>
          ))}
        </div>
        
        {/* Contact Button */}
        <motion.a
          href="#/contact"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          联系我
        </motion.a>
      </div>

      {/* Copyright */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
        <div className="text-white/40 text-sm font-light">
          &copy; {new Date().getFullYear()} Huang Zirong. All rights reserved.
        </div>
        <div className="text-white/20 text-xs uppercase tracking-widest">
          Beijing · China
        </div>
      </div>
    </footer>
  );
}
