import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { toast } from "sonner";

export default function Hero() {
  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} 已复制`);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col justify-center px-6 md:px-24">
      {/* Background with less overlay to show color */}
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="Background" className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
      </div>
      
      <div className="relative z-10 max-w-4xl pt-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-sm md:text-base font-sans tracking-[0.3em] text-white/70 mb-6 uppercase border-l-2 border-white pl-4">
            Product Manager & Creator
          </h2>
          <h1 className="text-6xl md:text-8xl font-bold leading-[1.1] text-white mb-8 font-display">
            黄子榕 <br/>
            <span className="italic font-light opacity-80">- Mark</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light italic font-display">
            "独立思考，无限进步"
          </p>
        </motion.div>
      </div>

      {/* Navigation Guide - Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute right-8 md:right-16 top-1/3 z-20 hidden md:flex flex-col items-center gap-6"
      >
        {/* Up Arrow - Works */}
        <a 
          href="#works" 
          className="group flex flex-col items-center gap-3 cursor-pointer px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/70 group-hover:text-white transition-colors"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </motion.div>
          <span className="text-sm font-medium tracking-wide text-white/70 group-hover:text-white transition-colors writing-vertical">
            我的作品
          </span>
        </a>

        {/* Decorative Element */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
        </div>

        {/* Down Arrow - About */}
        <a 
          href="#about" 
          className="group flex flex-col items-center gap-3 cursor-pointer px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all"
        >
          <span className="text-sm font-medium tracking-wide text-white/70 group-hover:text-white transition-colors writing-vertical">
            我是谁
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/70 group-hover:text-white transition-colors"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </a>
      </motion.div>

      {/* Fixed Contact Widget - Bottom Right */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 right-6 md:right-12 z-20"
      >
        <div className="glass-panel p-6 rounded-none backdrop-blur-2xl border-l-2 border-white/20 min-w-[280px]">
           <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Contact</h3>
           <div className="space-y-4">
             <div onClick={() => copy("hzr18679640565", "WeChat")} className="flex items-center justify-between group cursor-pointer">
               <span className="text-white/80 group-hover:text-white transition-colors text-sm">WeChat</span>
               <span className="text-white/40 text-xs group-hover:text-white transition-colors font-mono">hzr18679640565</span>
             </div>
             <div onClick={() => copy("18679640565", "Phone")} className="flex items-center justify-between group cursor-pointer">
               <span className="text-white/80 group-hover:text-white transition-colors text-sm">Phone</span>
               <span className="text-white/40 text-xs group-hover:text-white transition-colors font-mono">18679640565</span>
             </div>
             <div onClick={() => copy("3083985811@qq.com", "Email")} className="flex items-center justify-between group cursor-pointer">
               <span className="text-white/80 group-hover:text-white transition-colors text-sm">Email</span>
               <span className="text-white/40 text-xs group-hover:text-white transition-colors font-mono">3083985811@qq.com</span>
             </div>
           </div>
        </div>
      </motion.div>
    </section>
  );
}
