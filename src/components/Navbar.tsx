import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
     <motion.nav 
       initial={{ y: -100 }}
       animate={{ y: 0 }}
       transition={{ duration: 0.8, ease: "circOut" }}
       className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 transition-all duration-300 ${isScrolled ? "bg-black/50 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent"}`}
     >
       <div 
         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
         className="cursor-pointer"
       >
         <span className="font-display font-bold text-2xl tracking-tight italic">Mark.</span>
       </div>
       
       <div className="flex gap-8">
         <a href="#about" className="text-sm uppercase tracking-widest text-white/60 hover:text-white transition-colors">Profile</a>
         <a href="#works" className="text-sm uppercase tracking-widest text-white/60 hover:text-white transition-colors">Works</a>
       </div>
     </motion.nav>
  );
}
