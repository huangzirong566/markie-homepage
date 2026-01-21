import { motion } from "framer-motion";
import { Store, User, FileText, Sparkles, Rocket, MessageCircle } from "lucide-react";

interface MatrixItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  url: string;
  color: string;
  status: "live" | "coming";
}

const matrixItems: MatrixItem[] = [
  {
    title: "插件商店",
    description: "API 插件市场，按需付费",
    icon: <Store className="w-8 h-8" />,
    url: "https://store.cozer.us",
    color: "from-violet-500 to-purple-600",
    status: "live",
  },
  {
    title: "个人主页",
    description: "了解我的经历与作品",
    icon: <User className="w-8 h-8" />,
    url: "/",
    color: "from-blue-500 to-cyan-500",
    status: "live",
  },
  {
    title: "技术博客",
    description: "分享技术文章与心得",
    icon: <FileText className="w-8 h-8" />,
    url: "#",
    color: "from-emerald-500 to-teal-500",
    status: "coming",
  },
  {
    title: "AI 工具集",
    description: "实用的 AI 小工具",
    icon: <Sparkles className="w-8 h-8" />,
    url: "#",
    color: "from-amber-500 to-orange-500",
    status: "coming",
  },
  {
    title: "开源项目",
    description: "我的开源作品集",
    icon: <Rocket className="w-8 h-8" />,
    url: "#",
    color: "from-rose-500 to-pink-500",
    status: "coming",
  },
  {
    title: "联系我",
    description: "商务合作与交流",
    icon: <MessageCircle className="w-8 h-8" />,
    url: "#contact",
    color: "from-indigo-500 to-violet-500",
    status: "live",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Matrix() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-16 px-6 md:px-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
            我的数字世界
          </span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          探索我的所有项目与服务，一站式入口
        </p>
      </motion.div>

      {/* Matrix Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {matrixItems.map((item, index) => (
          <motion.a
            key={index}
            href={item.url}
            target={item.url.startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10 ${
              item.status === "coming" ? "opacity-60 cursor-not-allowed" : ""
            }`}
            onClick={(e) => {
              if (item.status === "coming") {
                e.preventDefault();
              }
            }}
          >
            {/* Gradient Background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            />

            {/* Content */}
            <div className="relative z-10">
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color} mb-4`}
              >
                {item.icon}
              </div>

              <h3 className="font-display text-xl font-semibold mb-2 flex items-center gap-2">
                {item.title}
                {item.status === "coming" && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/50 font-normal">
                    即将上线
                  </span>
                )}
              </h3>

              <p className="text-white/50 text-sm">{item.description}</p>
            </div>

            {/* Arrow */}
            {item.status === "live" && (
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-5 h-5 text-white/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            )}
          </motion.a>
        ))}
      </motion.div>

      {/* Footer Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-white/30 text-sm mt-16"
      >
        更多精彩内容，敬请期待 ✨
      </motion.p>
    </div>
  );
}
