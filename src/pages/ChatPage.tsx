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
  MoreHorizontal,
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
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  const responses = [
    "Sure, I can help you get started with creating a chatbot using GPT in Python. Here are the basic steps you'll need to follow:\n\n1. **Install the required libraries:** You'll need to install the transformers library from Hugging Face to use GPT. You can install it using pip.\n\n2. **Load the pre-trained model:** GPT comes in several sizes and versions, so you'll need to choose the one that fits your needs.\n\n3. **Create a chatbot loop:** You'll need to create a loop that takes user input, generates a response using the GPT model, and outputs it to the user.\n\n4. **Add some personality to the chatbot:** While GPT can generate text, it doesn't have any inherent personality or style. You can make your chatbot more interesting by adding custom prompts.",
    "Hello! I'm Mark's AI avatar. How can I help you today?\n\nI can answer questions about:\n- My work experience\n- Projects and portfolio\n- Technical skills\n- Personal interests",
    "That's a great question! Let me think about it...\n\nAs an AI product intern, I believe the most important thing is understanding the balance between user needs and technical capabilities.",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: "1", title: "Create Chatbot GPT...", messages: [
      { id: "1", role: "user", content: "Create a chatbot gpt using python language what will be step for that", timestamp: new Date() },
      { id: "2", role: "assistant", content: "Sure, I can help you get started with creating a chatbot using GPT in Python. Here are the basic steps you'll need to follow:\n\n1. **Install the required libraries:** You'll need to install the transformers library from Hugging Face to use GPT. You can install it using pip.\n\n2. **Load the pre-trained model:** GPT comes in several sizes and versions, so you'll need to choose the one that fits your needs. You can load a pre-trained GPT model. This loads the 1.3B parameter version of GPT-Neo, which is a powerful and relatively recent model.\n\n3. **Create a chatbot loop:** You'll need to create a loop that takes user input, generates a response using the GPT model, and outputs it to the user. Here's an example loop that uses the input() function to get user input and the gpt() function to generate a response. This loop will keep running until the user exits the program or the loop is interrupted.\n\n4. **Add some personality to the chatbot:** While GPT can generate text, it doesn't have any inherent personality or style. You can make your chatbot more interesting by adding custom prompts or responses that reflect your desired personality. You can then modify the chatbot loop to use these prompts and responses when appropriate. This will make the chatbot seem more human-like and engaging.\n\nThese are just the basic steps to get started with a GPT chatbot in Python. Depending on your requirements, you may need to add more features or complexity to the chatbot. Good luck!", timestamp: new Date() },
      { id: "3", role: "user", content: "What is use of that chatbot ?", timestamp: new Date() },
      { id: "4", role: "assistant", content: "Chatbots can be used for a wide range of purposes, including:\n\nCustomer service chatbots can handle frequently asked questions, provide basic support, and help customers navigate...", timestamp: new Date() },
    ], createdAt: new Date() },
    { id: "2", title: "Create Html Game Environment...", messages: [], createdAt: new Date() },
    { id: "3", title: "Apply To Leave For Emergency", messages: [], createdAt: new Date() },
    { id: "4", title: "What Is UI UX Design?", messages: [], createdAt: new Date() },
    { id: "5", title: "Create POS System", messages: [], createdAt: new Date() },
    { id: "6", title: "What Is UX Audit?", messages: [], createdAt: new Date() },
    { id: "7", title: "How Chat GPT Work?", messages: [], createdAt: new Date() },
  ]);
  
  const [olderConversations] = useState([
    { id: "8", title: "Crypto Lending App Name" },
    { id: "9", title: "Operator Grammar Types" },
    { id: "10", title: "Min States For Binary DFA" },
  ]);

  const [currentConvId, setCurrentConvId] = useState("1");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const agentConfig: AgentConfig = {};

  const currentConversation = conversations.find(c => c.id === currentConvId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentConversation?.messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setConversations(prev => prev.map(conv => 
      conv.id === currentConvId 
        ? { ...conv, messages: [...conv.messages, userMessage] }
        : conv
    ));
    setInputValue("");
    setIsLoading(true);

    try {
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

  const handleNewChat = () => {
    const newConv: Conversation = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
    };
    setConversations(prev => [newConv, ...prev]);
    setCurrentConvId(newConv.id);
    setSidebarOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg, #FDF8F3 0%, #F5EDE6 50%, #FDF5F0 100%)" }}>
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
        className="fixed md:relative md:translate-x-0 z-50 w-[280px] h-screen bg-white md:m-4 md:rounded-3xl shadow-xl flex flex-col overflow-hidden"
        style={{ boxShadow: "0 4px 40px rgba(0,0,0,0.08)" }}
      >
        {/* Header */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">CHAT A.I+</h1>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleNewChat}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#5B7BF9] hover:bg-[#4A6AE8] text-white rounded-xl font-medium transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              New chat
            </button>
            <button className="w-12 h-12 flex items-center justify-center bg-[#5B7BF9] hover:bg-[#4A6AE8] text-white rounded-xl transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto px-3">
          <div className="flex items-center justify-between px-2 py-3">
            <span className="text-xs text-gray-400">Your conversations</span>
            <button className="text-xs text-[#5B7BF9] hover:underline">Clear All</button>
          </div>
          
          <div className="space-y-1">
            {conversations.slice(0, 7).map(conv => (
              <button
                key={conv.id}
                onClick={() => { setCurrentConvId(conv.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all text-sm ${
                  conv.id === currentConvId 
                    ? "bg-[#EEF2FF] text-gray-900" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <MessageSquare className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="truncate flex-1">{conv.title}</span>
                {conv.id === currentConvId && (
                  <div className="flex items-center gap-1">
                    <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                    <Edit3 className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                    <div className="w-2 h-2 rounded-full bg-[#5B7BF9]" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Last 7 Days */}
          <div className="mt-4">
            <span className="text-xs text-gray-400 px-2">Last 7 Days</span>
            <div className="mt-2 space-y-1">
              {olderConversations.map(conv => (
                <button
                  key={conv.id}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-gray-500 hover:bg-gray-50 transition-all text-sm"
                >
                  <MessageSquare className="w-4 h-4 text-gray-300 shrink-0" />
                  <span className="truncate">{conv.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 transition-all text-sm mb-2">
            <Settings className="w-4 h-4 text-gray-400" />
            <span>Settings</span>
          </button>
          
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200">
              <img src={avatarImg} alt="User" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-medium text-gray-700">Mark</span>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen md:p-4">
        <div className="flex-1 flex flex-col bg-white/60 md:rounded-3xl backdrop-blur-sm overflow-hidden">
          {/* Mobile Header */}
          <header className="flex items-center justify-between px-4 py-3 md:hidden border-b border-gray-100">
            <button onClick={() => setSidebarOpen(true)} className="text-gray-600">
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-semibold text-gray-800">CHAT A.I+</span>
            <div className="w-6" />
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {currentConversation?.messages.map((msg) => (
                <div key={msg.id} className="space-y-4">
                  {msg.role === "user" ? (
                    // User Message
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-full overflow-hidden bg-amber-100 shrink-0 flex items-center justify-center">
                        <Smile className="w-5 h-5 text-amber-600" />
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-gray-800 text-[15px] leading-relaxed">{msg.content}</p>
                      </div>
                      <button className="text-gray-300 hover:text-gray-500 mt-1">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    // Assistant Message
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[#5B7BF9] font-semibold text-sm">CHAT A.I +</span>
                        <Check className="w-3.5 h-3.5 text-[#5B7BF9]" />
                      </div>
                      <div className="text-gray-700 text-[15px] leading-relaxed whitespace-pre-wrap">
                        {msg.content.split('\n').map((line, i) => {
                          if (line.startsWith('**') && line.endsWith('**')) {
                            return <strong key={i} className="font-semibold text-gray-900">{line.slice(2, -2)}</strong>;
                          }
                          if (line.match(/^\d+\.\s\*\*/)) {
                            const match = line.match(/^(\d+\.)\s\*\*(.+?)\*\*(.*)$/);
                            if (match) {
                              return (
                                <p key={i} className="mt-3">
                                  <span>{match[1]} </span>
                                  <strong className="font-semibold text-gray-900">{match[2]}</strong>
                                  <span>{match[3]}</span>
                                </p>
                              );
                            }
                          }
                          return <p key={i} className={line ? "" : "h-3"}>{line}</p>;
                        })}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center gap-1 pt-2">
                        <button className="p-1.5 text-gray-300 hover:text-gray-500 hover:bg-gray-100 rounded transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                        </button>
                        <span className="text-gray-200">|</span>
                        <button className="p-1.5 text-gray-300 hover:text-gray-500 hover:bg-gray-100 rounded transition-colors">
                          <ThumbsDown className="w-4 h-4" />
                        </button>
                        <span className="text-gray-200">|</span>
                        <button className="p-1.5 text-gray-300 hover:text-gray-500 hover:bg-gray-100 rounded transition-colors">
                          <Copy className="w-4 h-4" />
                        </button>
                        <span className="text-gray-200">|</span>
                        <button className="p-1.5 text-gray-300 hover:text-gray-500 hover:bg-gray-100 rounded transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                        
                        <div className="flex-1" />
                        
                        <button className="flex items-center gap-1.5 px-3 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm">
                          <RotateCcw className="w-3.5 h-3.5" />
                          Regenerate
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Loading */}
              {isLoading && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[#5B7BF9] font-semibold text-sm">CHAT A.I +</span>
                    <Check className="w-3.5 h-3.5 text-[#5B7BF9]" />
                  </div>
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-[#5B7BF9] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-[#5B7BF9] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-[#5B7BF9] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 md:px-8 md:pb-6">
            <div className="max-w-4xl mx-auto">
              <div className="relative flex items-center bg-white rounded-full shadow-lg border border-gray-100 pl-5 pr-2 py-2">
                <button className="text-gray-400 hover:text-gray-600 mr-3">
                  <Smile className="w-5 h-5" />
                </button>
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="What's in your mind?..."
                  className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 outline-none text-[15px]"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    inputValue.trim() && !isLoading
                      ? "bg-[#5B7BF9] hover:bg-[#4A6AE8] text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Upgrade to Pro Button (Right Side) */}
      <div className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-30">
        <button 
          className="bg-[#7C5CFC] hover:bg-[#6B4AEB] text-white px-3 py-6 rounded-l-xl shadow-lg flex flex-col items-center gap-2 transition-colors"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
          <span className="text-xs font-medium tracking-wider">Upgrade to Pro</span>
        </button>
      </div>
    </div>
  );
}
