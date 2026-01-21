import { motion } from "framer-motion";
import avatarImg from "@/assets/avatar.jpg";
import { ArrowUpRight, MapPin, Heart, Star } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-24 w-full max-w-[1400px] mx-auto border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
        
        {/* Left Column: Avatar & Intro */}
        <div className="md:col-span-4 space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[3/4] w-full overflow-hidden bg-white/5"
          >
            {/* Removed grayscale class */}
            <img src={avatarImg} alt="Markie" className="w-full h-full object-cover transition-all duration-700" />
            <div className="absolute top-4 right-4 flex gap-2">
               <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-xs border border-white/10 uppercase tracking-wider">ENTJ</span>
               <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-xs border border-white/10 uppercase tracking-wider flex items-center gap-1"><MapPin className="w-3 h-3"/> Beijing</span>
            </div>
          </motion.div>
          
          <div className="space-y-4">
             <h3 className="text-2xl font-display font-bold text-white">黄子榕 / Mark</h3>
             <p className="text-white/60 font-light leading-relaxed">
               20岁，AI 产品实习生。<br/>
               生活日常：钢琴 ｜ 骑行 ｜ 自媒体。<br/>
               致力于探索 AIGC 工作流与多模态交互。
             </p>
          </div>
        </div>

        {/* Right Column: Details Grid */}
        <div className="md:col-span-8 space-y-12">
          
          {/* Socials */}
          <div>
            <span className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6 block">Social Media</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bilibili */}
              <a href="https://space.bilibili.com/" target="_blank" className="glass-panel p-6 flex items-center justify-between group hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center text-blue-400">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.758v6.844c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.35.004 16.829v-6.844c.032-1.51.552-2.769 1.556-3.773S3.822 4.688 5.332 4.653h.854l-3.04-3.04.707-.707 3.747 3.747h8.803l3.748-3.747.707.707-3.04 3.04zm-1.42 12.853a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-8.853 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg mb-1">Bilibili</div>
                    <div className="text-white/40 text-sm">快乐小狗的奇思妙想</div>
                  </div>
                </div>
                <ArrowUpRight className="text-white/40 group-hover:text-white transition-colors" />
              </a>

              {/* Douyin */}
              <a href="https://www.douyin.com/user/self?from_tab_name=main&showTab=post" target="_blank" className="glass-panel p-6 flex items-center justify-between group hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-black/20 border border-white/10 flex items-center justify-center text-white">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.05 4.91A9.03 9.03 0 0 1 17.63.75V0h-4.07v14.77a3.3 3.3 0 1 1-3.3-3.3 3.3 3.3 0 0 1 1.6.43V8.05A7.37 7.37 0 1 0 17.63 15V7.8a13 13 0 0 0 5.5 2.25V5.92a9.07 9.07 0 0 1-4.08-1.01z"/></svg>
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg mb-1">抖音</div>
                    <div className="text-white/40 text-sm">记录生活 Vlog</div>
                  </div>
                </div>
                <ArrowUpRight className="text-white/40 group-hover:text-white transition-colors" />
              </a>
              
              {/* RedNote */}
              <a href="https://www.xiaohongshu.com/user/profile/60f8378f0000000001002283?xsec_token=ABoMDNNd73C5XsVG3WbvfLCHLBbly-Fxr_1Lt_4-YhFhc%3D&xsec_source=pc_search" target="_blank" className="glass-panel p-6 flex items-center justify-between group hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
                    <span className="font-bold text-lg">红</span>
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg mb-1">小红书</div>
                    <div className="text-white/40 text-sm">AI搭子小龙</div>
                  </div>
                </div>
                <ArrowUpRight className="text-white/40 group-hover:text-white transition-colors" />
              </a>

              {/* WeChat */}
              <a href="https://mp.weixin.qq.com/s/R9d46WKHucFc3k5Ke6zpyg?clicktime=1769016370&enterid=1769016370&scene=126&sessionid=1769016362&subscene=227" target="_blank" className="glass-panel p-6 flex items-center justify-between group hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M8.766 12.338c.366 0 .687-.29.687-.677 0-.387-.321-.677-.687-.677-.367 0-.687.29-.687.677 0 .387.32.677.687.677zm6.468 0c.367 0 .688-.29.688-.677 0-.387-.321-.677-.688-.677-.366 0-.687.29-.687.677 0 .387.321.677.687.677zm-3.234 5.25c-3.784 0-6.977-2.613-6.977-5.903 0-3.387 3.193-6 6.977-6 3.784 0 6.977 2.613 6.977 6 0 3.29-3.193 5.903-6.977 5.903z"/></svg>
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg mb-1">公众号</div>
                    <div className="text-white/40 text-sm">AI产品经理日常</div>
                  </div>
                </div>
                <ArrowUpRight className="text-white/40 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Interests & Stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
               <span className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6 block">Interests</span>
               <ul className="space-y-4">
                 <li className="flex items-center gap-3 text-white/80">
                   <div className="w-1.5 h-1.5 bg-white/20 rounded-full" /> 
                   <span>孙燕姿 / 周杰伦</span>
                 </li>
                 <li className="flex items-center gap-3 text-white/80">
                   <div className="w-1.5 h-1.5 bg-white/20 rounded-full" /> 
                   <span>皇室战争 / 老友记</span>
                 </li>
                 <li className="flex items-center gap-3 text-white/80">
                   <div className="w-1.5 h-1.5 bg-white/20 rounded-full" /> 
                   <span>佳能 R62 摄影</span>
                 </li>
               </ul>
            </div>
            
            <div>
               <span className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6 block">Now Playing</span>
               <div className="flex flex-wrap gap-2">
                 {['Coze', 'Vibe Coding', 'Multi-modal', 'Vision Pro', 'SD'].map(tech => (
                   <span key={tech} className="px-3 py-1.5 border border-white/10 text-white/60 text-sm hover:text-white hover:border-white/40 transition-colors cursor-default">
                     {tech}
                   </span>
                 ))}
               </div>
            </div>
          </div>

          {/* Wish List */}
          <div className="glass-panel p-8 border-l-2 border-l-purple-500 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2 text-purple-400">
                  <Heart className="w-4 h-4 fill-current" />
                  <span className="text-xs font-bold uppercase tracking-widest">Wish List</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-1">寻找 AI 产品 Offer & 创业伙伴</h4>
                <p className="text-white/50 text-sm">Open to new opportunities in Beijing / Remote.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
