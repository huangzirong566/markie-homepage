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

      {/* Fixed Contact Widget - Removed as per request */}
    </section>
  );
}
