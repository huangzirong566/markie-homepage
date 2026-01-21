import { motion } from "framer-motion";

export default function Contact() {
  return (
    <footer className="py-12 px-6 md:px-24 w-full max-w-[1400px] mx-auto border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-white/40 text-sm font-light">
        &copy; {new Date().getFullYear()} Huang Zirong. All rights reserved.
      </div>
      
      <div className="text-white/20 text-xs uppercase tracking-widest">
        Beijing · China
      </div>
    </footer>
  );
}
