import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Home, Layers } from "lucide-react";

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
       <a 
         href="#/"
         className="cursor-pointer"
       >
         <span className="font-display font-bold text-2xl tracking-tight italic">Mark.</span>
       </a>
       
       <div className="flex gap-6 md:gap-8 items-center">
         <a href="#/" className="text-sm uppercase tracking-widest text-white/60 hover:text-white transition-colors flex items-center gap-1.5">
           <Home className="w-4 h-4" />
           <span className="hidden md:inline">Home</span>
         </a>
         <a href="#works" className="text-sm uppercase tracking-widest text-white/60 hover:text-white transition-colors">Works</a>
         <a href="#/matrix" className="text-sm uppercase tracking-widest text-white/60 hover:text-white transition-colors flex items-center gap-1.5">
           <Layers className="w-4 h-4" />
           <span>All in One</span>
           <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
         </a>
       </div>
     </motion.nav>
  );
}
