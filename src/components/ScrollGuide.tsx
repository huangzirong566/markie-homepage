import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollGuide() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      setIsVisible(true);
      clearTimeout(timeoutId);
      
      // 停止滑动 2秒后隐藏
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50, transition: { duration: 0.5 } }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed right-6 md:right-12 top-24 z-40 flex flex-col items-center gap-4 pointer-events-none select-none"
        >
          {/* 上指引 */}
          <div className="flex flex-col items-center gap-1">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-white drop-shadow-md"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </motion.div>
            <span className="text-xs font-bold tracking-widest text-white/90 drop-shadow-md writing-vertical">
              我的作品
            </span>
          </div>

          {/* 装饰线 */}
          <div className="h-16 w-0.5 bg-gradient-to-b from-white/10 via-white/80 to-white/10 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />

          {/* 下指引 */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-bold tracking-widest text-white/90 drop-shadow-md writing-vertical">
              我是谁
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-white drop-shadow-md"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
