import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Home, Layers, Phone } from "lucide-react";

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
       <div className="flex items-center gap-6">
         <a 
           href="#/"
           className="cursor-pointer"
         >
           <span className="font-display font-bold text-2xl tracking-tight italic">Mark.</span>
         </a>

         <div className="h-6 w-px bg-white/10 hidden md:block" />

         <a href="#/contact" className="hidden md:flex items-center gap-3 text-white/60 hover:text-white transition-colors group">
           <div className="flex items-center gap-2">
             <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
               <Phone className="w-3.5 h-3.5" />
             </div>
             <span className="text-sm font-mono tracking-wider font-medium">18679640565</span>
           </div>
           
           <span className="text-white/20">/</span>
           
           <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
             <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
               <path d="M8.766 12.338c.366 0 .687-.29.687-.677 0-.387-.321-.677-.687-.677-.367 0-.687.29-.687.677 0 .387.32.677.687.677zm6.468 0c.367 0 .688-.29.688-.677 0-.387-.321-.677-.688-.677-.366 0-.687.29-.687.677 0 .387.321.677.687.677zm-3.234 5.25c-3.784 0-6.977-2.613-6.977-5.903 0-3.387 3.193-6 6.977-6 3.784 0 6.977 2.613 6.977 6 0 3.29-3.193 5.903-6.977 5.903z"/>
             </svg>
           </div>
         </a>
       </div>
       
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
