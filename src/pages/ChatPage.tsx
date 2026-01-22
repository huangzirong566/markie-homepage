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
  MoreVertical,
  RotateCcw,
  Menu,
  X,
  Check,
  Smile,
  Trash2,
  Edit3,
  Star
} from "lucide-react";
import avatarImg from "@/assets/avatar.jpeg";

// 消息类型
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// 对话类型
interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  isActive?: boolean;
}

// 模拟 AI 回复（Coze API 接口预留）
async function sendToCoze(message: string): Promise<string> {
  // 模拟延迟
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  // 模拟回复
  const responses = [
    "这是一个很好的问题！让我来帮你分析一下...\n\n基于你的描述，我建议可以从以下几个方面入手：\n\n1. **明确目标** - 首先确定你想要达成的具体目标\n2. **制定计划** - 根据目标制定可执行的计划\n3. **持续迭代** - 在实践中不断调整和优化",
    "我理解你的需求。这个问题涉及到几个关键点：\n\n**首先**，我们需要理解背景和上下文。\n\n**其次**，考虑可能的解决方案。\n\n**最后**，选择最适合当前情况的方案。\n\n如果你有更多具体的问题，欢迎继续提问！",
    "感谢你的提问！我来为你详细解答：\n\n这个话题非常有趣，涉及到多个层面的考量。在实际应用中，我们通常会：\n\n1. 分析需求和现状\n2. 研究可行的技术方案\n3. 进行原型验证\n4. 迭代优化\n\n希望这些信息对你有帮助！",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

export default function ChatPage() {
  const [conversations] = useState<Conversation[]>([
    { id: "1", title: "Create Html Game Environment...", messages: [], isActive: false },
    { id: "2", title: "Apply To Leave For Emergency", messages: [], isActive: false },
    { id: "3", title: "What Is UI UX Design?", messages: [], isActive: false },
    { id: "4", title: "Create POS System", messages: [], isActive: false },
    { id: "5", title: "What Is UX Audit?", messages: [], isActive: false },
    { id: "6", title: "Create Chatbot GPT...", messages: [], isActive: true },
    { id: "7", title: "How Chat GPT Work?", messages: [], isActive: false },
  ]);
  
  const [olderConversations] = useState([
    { id: "8", title: "Crypto Lending App Name" },
    { id: "9", title: "Operator Grammar Types" },
    { id: "10", title: "Min States For Binary DFA" },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "user", content: "Create a chatbot gpt using python language what will be step for that" },
    { id: "2", role: "assistant", content: "Sure, I can help you get started with creating a chatbot using GPT in Python. Here are the basic steps you'll need to follow:\n\n1. **Install the required libraries:** You'll need to install the transformers library from Hugging Face to use GPT. You can install it using pip.\n\n2. **Load the pre-trained model:** GPT comes in several sizes and versions, so you'll need to choose the one that fits your needs. You can load a pre-trained GPT model. This loads the 1.3B parameter version of GPT-Neo, which is a powerful and relatively recent model.\n\n3. **Create a chatbot loop:** You'll need to create a loop that takes user input, generates a response using the GPT model, and outputs it to the user. Here's an example loop that uses the input() function to get user input and the gpt() function to generate a response. This loop will keep running until the user exits the program or the loop is interrupted.\n\n4. **Add some personality to the chatbot:** While GPT can generate text, it doesn't have any inherent personality or style. You can make your chatbot more interesting by adding custom prompts or responses that reflect your desired personality. You can then modify the chatbot loop to use these prompts and responses when appropriate. This will make the chatbot seem more human-like and engaging.\n\nThese are just the basic steps to get started with a GPT chatbot in Python. Depending on your requirements, you may need to add more features or complexity to the chatbot. Good luck!" },
    { id: "3", role: "user", content: "What is use of that chatbot ?" },
    { id: "4", role: "assistant", content: "Chatbots can be used for a wide range of purposes, including:\n\nCustomer service chatbots can handle frequently asked questions, provide basic support, and help customers navigate..." },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentConvId, setCurrentConvId] = useState("6");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await sendToCoze(userMessage.content);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: response }]);
    } catch (error) {
      console.error("Failed to get response:", error);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: "抱歉，出现了一些问题，请稍后再试。" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // 渲染消息内容（处理加粗）
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, i) => {
      // 处理编号列表 + 加粗
      const listMatch = line.match(/^(\d+\.)\s\*\*(.+?)\*\*(.*)$/);
      if (listMatch) {
        return (
          <p key={i} className="mt-4 first:mt-0">
            <span>{listMatch[1]} </span>
            <strong className="font-semibold text-[#1a1a1a]">{listMatch[2]}</strong>
            <span>{listMatch[3]}</span>
          </p>
        );
      }
      // 空行
      if (!line.trim()) return <div key={i} className="h-4" />;
      // 普通文本
      return <p key={i} className="mt-0">{line}</p>;
    });
  };

  return (
    <div 
      className="min-h-screen h-screen flex overflow-hidden"
      style={{ 
        background: "linear-gradient(180deg, #F8F5F1 0%, #F5F0EB 50%, #FDF8F4 100%)"
      }}
    >
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : "-100%" }}
        className="fixed md:relative md:translate-x-0 z-50 w-[260px] h-full bg-white md:ml-5 md:my-5 rounded-[24px] flex flex-col overflow-hidden"
        style={{ 
          boxShadow: "0px 4px 60px rgba(0, 0, 0, 0.04)"
        }}
      >
        {/* Logo */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <h1 className="text-[22px] font-bold text-[#1a1a1a] tracking-tight">CHAT A.I+</h1>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* New Chat & Search */}
        <div className="px-4 pb-4 flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 h-[48px] bg-[#5B7BF9] hover:bg-[#4A6AE8] text-white rounded-[14px] font-medium transition-colors text-[15px]">
            <Plus className="w-[18px] h-[18px]" />
            New chat
          </button>
          <button className="w-[48px] h-[48px] flex items-center justify-center bg-[#5B7BF9] hover:bg-[#4A6AE8] text-white rounded-[14px] transition-colors">
            <Search className="w-[18px] h-[18px]" />
          </button>
        </div>

        {/* Conversations Header */}
        <div className="px-6 py-2 flex items-center justify-between">
          <span className="text-[13px] text-[#9CA3AF]">Your conversations</span>
          <button className="text-[13px] text-[#5B7BF9] hover:underline">Clear All</button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto px-3">
          <div className="space-y-0.5">
            {conversations.map(conv => (
              <button
                key={conv.id}
                onClick={() => setCurrentConvId(conv.id)}
                className={`w-full flex items-center gap-3 px-3 py-[10px] rounded-[12px] text-left transition-all text-[14px] group ${
                  conv.id === currentConvId
                    ? "bg-[#EEF2FF]" 
                    : "hover:bg-[#F9FAFB]"
                }`}
              >
                <MessageSquare className={`w-[16px] h-[16px] shrink-0 ${conv.id === currentConvId ? "text-[#6B7280]" : "text-[#D1D5DB]"}`} />
                <span className={`truncate flex-1 ${conv.id === currentConvId ? "text-[#1F2937]" : "text-[#6B7280]"}`}>
                  {conv.title}
                </span>
                {conv.id === currentConvId && (
                  <div className="flex items-center gap-1.5">
                    <Trash2 className="w-[14px] h-[14px] text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer" />
                    <Edit3 className="w-[14px] h-[14px] text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer" />
                    <div className="w-[8px] h-[8px] rounded-full bg-[#5B7BF9] ml-1" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Last 7 Days */}
          <div className="mt-4 pt-2">
            <span className="text-[12px] text-[#9CA3AF] px-3">Last 7 Days</span>
            <div className="mt-2 space-y-0.5">
              {olderConversations.map(conv => (
                <button
                  key={conv.id}
                  className="w-full flex items-center gap-3 px-3 py-[10px] rounded-[12px] text-left text-[#9CA3AF] hover:bg-[#F9FAFB] transition-all text-[14px]"
                >
                  <MessageSquare className="w-[16px] h-[16px] text-[#E5E7EB] shrink-0" />
                  <span className="truncate">{conv.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 mt-auto">
          <button className="w-full flex items-center gap-3 px-3 py-[10px] rounded-[12px] text-[#6B7280] hover:bg-[#F9FAFB] transition-all text-[14px]">
            <Settings className="w-[18px] h-[18px] text-[#9CA3AF]" />
            <span>Settings</span>
          </button>
          
          <div className="flex items-center gap-3 px-3 py-3 mt-1">
            <div className="w-[36px] h-[36px] rounded-full overflow-hidden bg-[#E5E7EB]">
              <img src={avatarImg} alt="User" className="w-full h-full object-cover" />
            </div>
            <span className="text-[14px] font-medium text-[#374151]">Andrew Neilson</span>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full md:p-5 md:pl-4 overflow-hidden">
        <div 
          className="flex-1 flex flex-col h-full md:rounded-[24px] overflow-hidden relative"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.5) 100%)",
            backdropFilter: "blur(20px)"
          }}
        >
          {/* Mobile Header */}
          <header className="flex items-center justify-between px-4 py-3 md:hidden border-b border-gray-100/50">
            <button onClick={() => setSidebarOpen(true)} className="text-gray-600">
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-bold text-[#1a1a1a]">CHAT A.I+</span>
            <div className="w-6" />
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-[900px] mx-auto px-6 md:px-10 py-8">
              {messages.map((msg) => (
                <div key={msg.id} className="mb-6">
                  {msg.role === "user" ? (
                    // User Message
                    <div className="flex items-start gap-4">
                      <div className="w-[36px] h-[36px] rounded-full bg-[#FEF3C7] shrink-0 flex items-center justify-center">
                        <Smile className="w-[20px] h-[20px] text-[#F59E0B]" />
                      </div>
                      <div className="flex-1 pt-2">
                        <p className="text-[#374151] text-[15px] leading-[1.7]">{msg.content}</p>
                      </div>
                      <button className="text-[#D1D5DB] hover:text-[#9CA3AF] mt-2">
                        <Edit3 className="w-[16px] h-[16px]" />
                      </button>
                    </div>
                  ) : (
                    // Assistant Message
                    <div className="mt-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[#5B7BF9] font-semibold text-[13px] tracking-wide">CHAT A.I +</span>
                        <Check className="w-[14px] h-[14px] text-[#5B7BF9]" />
                      </div>
                      <div className="text-[#4B5563] text-[15px] leading-[1.75]">
                        {renderContent(msg.content)}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center gap-0 mt-4">
                        <button className="p-2 text-[#D1D5DB] hover:text-[#9CA3AF] transition-colors">
                          <ThumbsUp className="w-[16px] h-[16px]" />
                        </button>
                        <span className="text-[#E5E7EB] mx-1">|</span>
                        <button className="p-2 text-[#D1D5DB] hover:text-[#9CA3AF] transition-colors">
                          <ThumbsDown className="w-[16px] h-[16px]" />
                        </button>
                        <span className="text-[#E5E7EB] mx-1">|</span>
                        <button className="p-2 text-[#D1D5DB] hover:text-[#9CA3AF] transition-colors">
                          <Copy className="w-[16px] h-[16px]" />
                        </button>
                        <span className="text-[#E5E7EB] mx-1">|</span>
                        <button className="p-2 text-[#D1D5DB] hover:text-[#9CA3AF] transition-colors">
                          <MoreVertical className="w-[16px] h-[16px]" />
                        </button>
                        
                        <div className="flex-1" />
                        
                        <button className="flex items-center gap-2 px-4 py-2 text-[#9CA3AF] hover:text-[#6B7280] hover:bg-white/50 rounded-[10px] transition-all text-[13px]">
                          <RotateCcw className="w-[14px] h-[14px]" />
                          <span>Regenerate</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Loading */}
              {isLoading && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[#5B7BF9] font-semibold text-[13px] tracking-wide">CHAT A.I +</span>
                    <Check className="w-[14px] h-[14px] text-[#5B7BF9]" />
                  </div>
                  <div className="flex gap-1.5">
                    <span className="w-[8px] h-[8px] bg-[#5B7BF9] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-[8px] h-[8px] bg-[#5B7BF9] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-[8px] h-[8px] bg-[#5B7BF9] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 md:px-10 md:pb-8">
            <div className="max-w-[900px] mx-auto relative">
              <div 
                className="flex items-center bg-white rounded-full pl-5 pr-2 py-2 h-[52px]"
                style={{ 
                  boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.06)",
                  border: "1px solid rgba(0,0,0,0.04)"
                }}
              >
                <button className="text-[#F59E0B] mr-3">
                  <Smile className="w-[22px] h-[22px]" />
                </button>
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="What's in your mind?..."
                  className="flex-1 bg-transparent text-[#374151] placeholder-[#9CA3AF] outline-none text-[15px]"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className={`w-[40px] h-[40px] rounded-full flex items-center justify-center transition-all ${
                    inputValue.trim() && !isLoading
                      ? "bg-[#5B7BF9] hover:bg-[#4A6AE8] text-white"
                      : "bg-[#F3F4F6] text-[#D1D5DB]"
                  }`}
                >
                  <Send className="w-[16px] h-[16px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Upgrade to Pro Button */}
      <div className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-30">
        <button 
          className="flex flex-col items-center gap-2 bg-[#7C5CFC] hover:bg-[#6B4AEB] text-white pl-2 pr-3 py-5 rounded-l-[16px] transition-colors"
          style={{ 
            boxShadow: "0px 4px 20px rgba(124, 92, 252, 0.3)",
            writingMode: "vertical-rl",
            textOrientation: "mixed"
          }}
        >
          <Star className="w-[16px] h-[16px] text-[#FBBF24] fill-[#FBBF24] rotate-90" />
          <span className="text-[12px] font-medium tracking-wide">Upgrade to Pro</span>
        </button>
      </div>
    </div>
  );
}
