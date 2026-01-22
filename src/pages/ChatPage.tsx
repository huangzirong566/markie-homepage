import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Plus, 
  Search, 
  Settings, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Copy, 
  RotateCcw,
  Sparkles,
  Menu,
  X
} from "lucide-react";
import avatarImg from "@/assets/avatar.jpeg";

// 消息类型
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// 对话类型
interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

// 预留的智能体接口
interface AgentConfig {
  apiEndpoint?: string;
  botId?: string;
  apiKey?: string;
}

// TODO: 接入 Coze 时替换这个函数
async function sendToAgent(message: string, config: AgentConfig): Promise<string> {
  // 模拟 AI 回复（预留接口）
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  const responses = [
    "你好！我是 Mark 的 AI 分身。有什么我可以帮助你的吗？",
    "这是一个很好的问题！让我想想...\n\n作为一个 AI 产品实习生，我认为最重要的是理解用户需求和技术能力之间的平衡。",
    "感谢你的提问！关于这个话题，我有一些想法可以分享。\n\n首先，AI 产品的核心是解决真实问题...",
    "很高兴和你聊天！如果你想了解更多关于我的经历，可以问我关于工作、项目或者兴趣爱好的问题。",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      title: "欢迎对话",
      messages: [
        {
          id: "1",
          role: "assistant",
          content: "👋 你好！我是 Mark 的 AI 分身。\n\n我可以回答关于 Mark 的工作经历、项目经验、技术栈等问题。有什么想了解的吗？",
          timestamp: new Date(),
        }
      ],
      createdAt: new Date(),
    }
  ]);
  const [currentConvId, setCurrentConvId] = useState("1");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // 智能体配置（预留）
  const agentConfig: AgentConfig = {
    // TODO: 填入 Coze Bot 配置
    // apiEndpoint: "https://api.coze.cn/open_api/v2/chat",
    // botId: "YOUR_BOT_ID",
    // apiKey: "YOUR_API_KEY",
  };

  const currentConversation = conversations.find(c => c.id === currentConvId);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentConversation?.messages]);

  // 发送消息
  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    // 更新对话
    setConversations(prev => prev.map(conv => 
      conv.id === currentConvId 
        ? { ...conv, messages: [...conv.messages, userMessage], title: conv.messages.length === 1 ? inputValue.slice(0, 20) + "..." : conv.title }
        : conv
    ));
    setInputValue("");
    setIsLoading(true);

    try {
      // 调用智能体接口
      const response = await sendToAgent(userMessage.content, agentConfig);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setConversations(prev => prev.map(conv => 
        conv.id === currentConvId 
          ? { ...conv, messages: [...conv.messages, assistantMessage] }
          : conv
      ));
    } catch (error) {
      console.error("Failed to get response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 新建对话
  const handleNewChat = () => {
    const newConv: Conversation = {
      id: Date.now().toString(),
      title: "新对话",
      messages: [
        {
          id: "1",
          role: "assistant",
          content: "👋 你好！有什么我可以帮助你的吗？",
          timestamp: new Date(),
        }
      ],
      createdAt: new Date(),
    };
    setConversations(prev => [newConv, ...prev]);
    setCurrentConvId(newConv.id);
    setSidebarOpen(false);
  };

  // 复制消息
  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  // 键盘事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : "-100%" }}
        className={`fixed md:relative md:translate-x-0 z-50 w-72 h-screen bg-[#111] border-r border-white/5 flex flex-col transition-transform md:transition-none`}
      >
        {/* Logo & New Chat */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span className="font-bold text-lg">Mark AI</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-white/60 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            新对话
          </button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="text-xs text-white/40 uppercase tracking-wider px-2 py-2">对话记录</div>
          {conversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => { setCurrentConvId(conv.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                conv.id === currentConvId 
                  ? "bg-white/10 text-white" 
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span className="truncate text-sm">{conv.title}</span>
            </button>
          ))}
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-white/5">
          <a href="#/" className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
              <img src={avatarImg} alt="Mark" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">Mark</div>
              <div className="text-xs text-white/40">返回主页</div>
            </div>
          </a>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-sm">
          <button 
            onClick={() => setSidebarOpen(true)} 
            className="md:hidden text-white/60 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-white/60">Mark AI · 智能分身</span>
          </div>
          <div className="w-6 md:hidden" /> {/* Spacer */}
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
            {currentConversation?.messages.map((msg, idx) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full shrink-0 overflow-hidden ${
                  msg.role === "user" 
                    ? "bg-blue-600 flex items-center justify-center text-sm font-bold"
                    : "border border-white/10"
                }`}>
                  {msg.role === "user" ? (
                    "你"
                  ) : (
                    <img src={avatarImg} alt="Mark AI" className="w-full h-full object-cover" />
                  )}
                </div>

                {/* Message Content */}
                <div className={`flex-1 max-w-[85%] ${msg.role === "user" ? "text-right" : ""}`}>
                  <div className={`inline-block px-4 py-3 rounded-2xl ${
                    msg.role === "user" 
                      ? "bg-blue-600 text-white rounded-br-md"
                      : "bg-white/5 text-white/90 rounded-bl-md"
                  }`}>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                  </div>

                  {/* Actions (only for assistant) */}
                  {msg.role === "assistant" && (
                    <div className="flex items-center gap-2 mt-2 text-white/30">
                      <button className="p-1 hover:text-white/60 transition-colors" title="点赞">
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1 hover:text-white/60 transition-colors" title="点踩">
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        className="p-1 hover:text-white/60 transition-colors" 
                        title="复制"
                        onClick={() => handleCopy(msg.content)}
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Loading */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4"
              >
                <div className="w-8 h-8 rounded-full shrink-0 overflow-hidden border border-white/10">
                  <img src={avatarImg} alt="Mark AI" className="w-full h-full object-cover" />
                </div>
                <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-white/5 bg-[#0a0a0a] p-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-end gap-2 bg-white/5 border border-white/10 rounded-2xl p-2 focus-within:border-blue-500/50 transition-colors">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="输入你的问题..."
                rows={1}
                className="flex-1 bg-transparent text-white placeholder-white/30 resize-none px-3 py-2 outline-none text-sm max-h-32"
                style={{ minHeight: "40px" }}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className={`p-2.5 rounded-xl transition-colors ${
                  inputValue.trim() && !isLoading
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "bg-white/5 text-white/30 cursor-not-allowed"
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-center text-xs text-white/30 mt-3">
              AI 分身可能会产生不准确的信息，仅供参考
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
