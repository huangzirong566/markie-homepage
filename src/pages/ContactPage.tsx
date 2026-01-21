import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, Copy, Check } from "lucide-react";
import { useState } from "react";

// 联系方式信息 - 你可以修改这里
const contactInfo = {
  wechat: "Markie",
  email: "huangzirong926@gmail.com", 
  phone: "+86 138-xxxx-xxxx", // 修改成你的手机号
  qq: "huangzirong926@qq.com",
};

export default function ContactPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const contactItems = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      label: "微信",
      value: contactInfo.wechat,
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: "邮箱",
      value: contactInfo.email,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: "QQ邮箱",
      value: contactInfo.qq,
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "手机",
      value: contactInfo.phone,
      color: "from-purple-500 to-violet-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-16 px-6 md:px-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
            联系我
          </span>
        </h1>
        <p className="text-white/50 text-lg">
          期待与你交流，随时欢迎联系
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        {/* WeChat QR Code */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-8 text-center"
        >
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold mb-4">微信扫码添加好友</h2>
          
          {/* QR Code Image */}
          <div className="bg-white rounded-2xl p-4 inline-block mb-4">
            <img 
              src="/wechat-qr.png" 
              alt="微信二维码"
              className="w-48 h-48 md:w-56 md:h-56 object-contain"
              onError={(e) => {
                // 如果图片加载失败，显示占位符
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          
          <p className="text-white/40 text-sm">
            微信号: <span className="text-white/70">{contactInfo.wechat}</span>
          </p>
        </motion.div>

        {/* Contact Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid gap-4"
        >
          {contactItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 flex items-center justify-between hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color}`}>
                  {item.icon}
                </div>
                <div>
                  <div className="text-white/50 text-sm">{item.label}</div>
                  <div className="text-white font-medium">{item.value}</div>
                </div>
              </div>
              
              <button
                onClick={() => copyToClipboard(item.value, item.label)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                title="复制"
              >
                {copiedField === item.label ? (
                  <Check className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Copy className="w-5 h-5 text-white/50" />
                )}
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-white/30 text-sm mt-12"
        >
          期待与你的每一次交流 ✨
        </motion.p>
      </div>
    </div>
  );
}
