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
    <footer className="py-8 px-6 md:px-24 w-full max-w-[1400px] mx-auto border-t border-white/5">
      <div className="flex justify-between items-center">
        {/* Copyright - Left */}
        <div className="text-white/30 text-xs font-light">
          &copy; {new Date().getFullYear()} Mark
        </div>

        {/* Social Icons - Right */}
        <div className="flex items-center gap-4">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target={social.url.startsWith("#") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="text-white/25 hover:text-white/60 transition-colors"
              title={social.name}
            >
              {social.icon === "github" ? (
                <Github className="w-4 h-4" />
              ) : (
                <img src={social.icon} alt={social.name} className="w-4 h-4 object-contain opacity-25 hover:opacity-60 transition-opacity" />
              )}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
