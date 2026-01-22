import { useState, useRef, useEffect, useCallback } from "react";
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
  Star,
  Sparkles
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
  createdAt: number;
}

// Coze API 配置
const COZE_API_KEY = 'pat_03i5KSo6wLJy5qQCcC4PGcRrFw7VFywoRJj9ROdd5wLJKCgjlKeDZXUmygoDgRif';
const BOT_ID = '7598089557539618858';

// 初始灵感问题
const INITIAL_INSPIRATIONS = [
  "介绍一下你自己",
  "你有什么特长？",
  "你最近在做什么项目？",
];

// 根据话题生成延伸问题的映射
const TOPIC_EXTENSIONS: Record<string, string[]> = {
  "自己|介绍|是谁": ["你的性格是什么样的？", "你有什么独特的经历？", "你的座右铭是什么？"],
  "工作|项目|经历": ["这个项目遇到过什么挑战？", "你最有成就感的项目是什么？", "未来有什么计划？"],
  "AI|人工智能|技术": ["你觉得 AI 会取代人类吗？", "推荐一些 AI 学习资源", "你用过哪些 AI 工具？"],
  "兴趣|爱好|喜欢": ["你最喜欢的书/电影是什么？", "周末一般怎么度过？", "有什么特别的收藏吗？"],
  "学习|技能|成长": ["你是怎么学习新技能的？", "有什么学习心得分享？", "推荐一些好用的工具"],
  "游戏|娱乐|放松": ["你最喜欢什么类型的游戏？", "有什么推荐的休闲方式？", "聊聊你的游戏经历"],
  "编程|代码|开发": ["你最擅长什么编程语言？", "有什么编程技巧分享？", "聊聊你的技术栈"],
  "生活|日常|习惯": ["你的一天是怎么安排的？", "有什么好的生活习惯？", "聊聊你的生活态度"],
};

// 根据消息内容生成延伸问题
function generateFollowUpQuestions(message: string): string[] {
  const lowerMsg = message.toLowerCase();
  
  for (const [keywords, questions] of Object.entries(TOPIC_EXTENSIONS)) {
    const keywordList = keywords.split("|");
    if (keywordList.some(kw => lowerMsg.includes(kw))) {
      // 随机打乱并返回
      return [...questions].sort(() => Math.random() - 0.5);
    }
  }
  
  // 默认问题
  return [
    "能详细说说吗？",
    "还有什么想分享的？",
    "这个话题很有趣，继续聊聊？",
  ];
}

// 本地存储 key
const STORAGE_KEY = 'cozer_chat_history';

// 保存对话到本地
function saveConversations(conversations: Conversation[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  } catch (e) {
    console.error('Failed to save conversations:', e);
  }
}

// 从本地加载对话
function loadConversations(): Conversation[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load conversations:', e);
    return [];
  }
}

// 保存聊天记录到后端
async function saveChatLog(visitorId: string, question: string, answer: string) {
  try {
    await fetch('https://store.cozer.us/api/chat-logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visitorId, question, answer }),
    });
  } catch (e) {
    console.error('Failed to save chat log:', e);
  }
}

// 获取或创建访客 ID
function getVisitorId(): string {
  let id = localStorage.getItem('cozer_visitor_id');
  if (!id) {
    id = `v_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem('cozer_visitor_id', id);
  }
  return id;
}

// 调用 Coze API (优化轮询间隔)
async function sendToCoze(message: string): Promise<string> {
  try {
    const createResponse = await fetch('https://api.coze.cn/v3/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COZE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bot_id: BOT_ID,
        user_id: `user_${Date.now()}`,
        stream: false,
        additional_messages: [
          {
            content: message,
            content_type: 'text',
            role: 'user',
            type: 'question',
          },
        ],
        parameters: {},
      }),
    });

    if (!createResponse.ok) throw new Error('创建对话失败');

    const createData = await createResponse.json();
    const chatId = createData.data?.id;
    const conversationId = createData.data?.conversation_id;

    if (!chatId || !conversationId) throw new Error('无法获取对话ID');

    // 轮询获取结果 (间隔 500ms)
    let attempts = 0;
    const maxAttempts = 60;
    
    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const retrieveResponse = await fetch(
        `https://api.coze.cn/v3/chat/retrieve?chat_id=${chatId}&conversation_id=${conversationId}`,
        { headers: { 'Authorization': `Bearer ${COZE_API_KEY}` } }
      );

      if (!retrieveResponse.ok) { attempts++; continue; }

      const retrieveData = await retrieveResponse.json();
      const status = retrieveData.data?.status;

      if (status === 'completed') {
        const messagesResponse = await fetch(
          `https://api.coze.cn/v3/chat/message/list?chat_id=${chatId}&conversation_id=${conversationId}`,
          { headers: { 'Authorization': `Bearer ${COZE_API_KEY}` } }
        );

        if (messagesResponse.ok) {
          const messagesData = await messagesResponse.json();
          const messages = messagesData.data || [];
          const assistantMessage = messages.find(
            (msg: { role: string; type: string; content: string }) => 
              msg.role === 'assistant' && msg.type === 'answer'
          );
          if (assistantMessage?.content) return assistantMessage.content;
        }
        break;
      } else if (status === 'failed') {
        throw new Error('对话失败');
      }
      attempts++;
    }

    return '抱歉，响应超时，请稍后再试。';
  } catch (error) {
    console.error('Error calling Coze API:', error);
    return '网络错误，请稍后再试。';
  }
}

export default function ChatPage() {
  // 对话列表
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConvId, setCurrentConvId] = useState<string | null>(null);
  
  // 当前消息
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // 灵感问题
  const [inspirations, setInspirations] = useState<string[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 初始化
  useEffect(() => {
    const saved = loadConversations();
    setConversations(saved);
    if (saved.length > 0) {
      setCurrentConvId(saved[0].id);
      setMessages(saved[0].messages);
      // 根据最后一条用户消息生成延伸问题
      const lastUserMsg = saved[0].messages.filter(m => m.role === 'user').pop();
      if (lastUserMsg) {
        setInspirations(generateFollowUpQuestions(lastUserMsg.content));
      } else {
        setInspirations(INITIAL_INSPIRATIONS);
      }
    } else {
      setInspirations(INITIAL_INSPIRATIONS);
    }
  }, []);

  // 滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 保存当前对话
  const saveCurrentConversation = useCallback((newMessages: Message[]) => {
    if (!currentConvId) return;
    
    setConversations(prev => {
      const updated = prev.map(conv => 
        conv.id === currentConvId 
          ? { ...conv, messages: newMessages, title: newMessages[0]?.content.slice(0, 30) || '新对话' }
          : conv
      );
      saveConversations(updated);
      return updated;
    });
  }, [currentConvId]);

  // 新建对话
  const handleNewChat = () => {
    const newConv: Conversation = {
      id: Date.now().toString(),
      title: '新对话',
      messages: [],
      createdAt: Date.now(),
    };
    
    const updated = [newConv, ...conversations];
    setConversations(updated);
    saveConversations(updated);
    setCurrentConvId(newConv.id);
    setMessages([]);
    setInspirations(INITIAL_INSPIRATIONS);
    setSidebarOpen(false);
  };

  // 切换对话
  const handleSelectConversation = (conv: Conversation) => {
    setCurrentConvId(conv.id);
    setMessages(conv.messages);
    setSidebarOpen(false);
    
    // 根据最后一条用户消息生成延伸问题
    const lastUserMsg = conv.messages.filter(m => m.role === 'user').pop();
    if (lastUserMsg) {
      setInspirations(generateFollowUpQuestions(lastUserMsg.content));
    } else {
      setInspirations(INITIAL_INSPIRATIONS);
    }
  };

  // 删除对话
  const handleDeleteConversation = (convId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = conversations.filter(c => c.id !== convId);
    setConversations(updated);
    saveConversations(updated);
    
    if (convId === currentConvId) {
      if (updated.length > 0) {
        setCurrentConvId(updated[0].id);
        setMessages(updated[0].messages);
      } else {
        setCurrentConvId(null);
        setMessages([]);
      }
    }
  };

  // 清空所有对话
  const handleClearAll = () => {
    setConversations([]);
    saveConversations([]);
    setCurrentConvId(null);
    setMessages([]);
  };

  // 发送消息
  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    // 如果没有当前对话，先创建一个
    let convId = currentConvId;
    if (!convId) {
      const newConv: Conversation = {
        id: Date.now().toString(),
        title: inputValue.trim().slice(0, 30),
        messages: [],
        createdAt: Date.now(),
      };
      const updated = [newConv, ...conversations];
      setConversations(updated);
      saveConversations(updated);
      convId = newConv.id;
      setCurrentConvId(convId);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await sendToCoze(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      };
      const finalMessages = [...newMessages, assistantMessage];
      setMessages(finalMessages);
      
      // 保存到本地
      setConversations(prev => {
        const updated = prev.map(conv => 
          conv.id === convId 
            ? { ...conv, messages: finalMessages, title: userMessage.content.slice(0, 30) }
            : conv
        );
        saveConversations(updated);
        return updated;
      });

      // 保存到后端数据库
      saveChatLog(getVisitorId(), userMessage.content, response);

      // 根据用户消息生成新的延伸问题
      setInspirations(generateFollowUpQuestions(userMessage.content));
    } catch (error) {
      console.error("Failed to get response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "抱歉，出现了一些问题，请稍后再试。",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 忽略输入法组合状态（中文输入时按回车是确认输入）
    if (e.nativeEvent.isComposing) return;
    
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // 点击灵感问题
  const handleInspirationClick = (question: string) => {
    setInputValue(question);
  };

  // 渲染消息内容
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, i) => {
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
      if (!line.trim()) return <div key={i} className="h-4" />;
      return <p key={i} className="mt-0">{line}</p>;
    });
  };

  return (
    <div 
      className="min-h-screen h-screen flex overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F8F5F1 0%, #F5F0EB 50%, #FDF8F4 100%)" }}
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
      <aside
        className={`fixed md:relative z-50 w-[260px] h-full bg-white md:ml-5 md:my-5 rounded-[24px] flex flex-col overflow-hidden transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{ boxShadow: "0px 4px 60px rgba(0, 0, 0, 0.04)" }}
      >
        {/* Logo */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <h1 className="text-[22px] font-bold text-[#1a1a1a] tracking-tight">Mark AI</h1>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* New Chat & Search */}
        <div className="px-4 pb-4 flex gap-2">
          <button 
            onClick={handleNewChat}
            className="flex-1 flex items-center justify-center gap-2 h-[48px] bg-[#5B7BF9] hover:bg-[#4A6AE8] text-white rounded-[14px] font-medium transition-colors text-[15px]"
          >
            <Plus className="w-[18px] h-[18px]" />
            新对话
          </button>
          <button className="w-[48px] h-[48px] flex items-center justify-center bg-[#5B7BF9] hover:bg-[#4A6AE8] text-white rounded-[14px] transition-colors">
            <Search className="w-[18px] h-[18px]" />
          </button>
        </div>

        {/* Conversations Header */}
        <div className="px-6 py-2 flex items-center justify-between">
          <span className="text-[13px] text-[#9CA3AF]">历史对话</span>
          <button onClick={handleClearAll} className="text-[13px] text-[#5B7BF9] hover:underline">清空</button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto px-3">
          <div className="space-y-0.5">
            {conversations.length === 0 ? (
              <p className="text-[13px] text-[#9CA3AF] text-center py-8">暂无对话记录</p>
            ) : (
              conversations.map(conv => (
                <button
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv)}
                  className={`w-full flex items-center gap-3 px-3 py-[10px] rounded-[12px] text-left transition-all text-[14px] group ${
                    conv.id === currentConvId ? "bg-[#EEF2FF]" : "hover:bg-[#F9FAFB]"
                  }`}
                >
                  <MessageSquare className={`w-[16px] h-[16px] shrink-0 ${conv.id === currentConvId ? "text-[#6B7280]" : "text-[#D1D5DB]"}`} />
                  <span className={`truncate flex-1 ${conv.id === currentConvId ? "text-[#1F2937]" : "text-[#6B7280]"}`}>
                    {conv.title}
                  </span>
                  <Trash2 
                    onClick={(e) => handleDeleteConversation(conv.id, e)}
                    className="w-[14px] h-[14px] text-[#D1D5DB] hover:text-[#EF4444] cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" 
                  />
                </button>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 mt-auto">
          <button className="w-full flex items-center gap-3 px-3 py-[10px] rounded-[12px] text-[#6B7280] hover:bg-[#F9FAFB] transition-all text-[14px]">
            <Settings className="w-[18px] h-[18px] text-[#9CA3AF]" />
            <span>设置</span>
          </button>
          
          <div className="flex items-center gap-3 px-3 py-3 mt-1">
            <div className="w-[36px] h-[36px] rounded-full overflow-hidden bg-[#E5E7EB]">
              <img src={avatarImg} alt="Mark" className="w-full h-full object-cover" />
            </div>
            <span className="text-[14px] font-medium text-[#374151]">Mark</span>
          </div>
        </div>
      </aside>

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
            <span className="font-bold text-[#1a1a1a]">Mark AI</span>
            <div className="w-6" />
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-[900px] mx-auto px-6 md:px-10 py-8">
              {messages.length === 0 ? (
                // 空状态 - 显示欢迎和灵感问题
                <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
                  <div className="w-[80px] h-[80px] rounded-full overflow-hidden mb-6">
                    <img src={avatarImg} alt="Mark" className="w-full h-full object-cover" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">你好，我是 Mark 的 AI 分身</h2>
                  <p className="text-[#6B7280] mb-8">有什么想问我的吗？</p>
                  
                  {/* 灵感问题 */}
                  <div className="flex flex-wrap justify-center gap-3 max-w-[600px]">
                    {inspirations.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleInspirationClick(q)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full text-[14px] text-[#374151] hover:bg-[#EEF2FF] hover:text-[#5B7BF9] transition-all border border-[#E5E7EB] hover:border-[#5B7BF9]/30"
                        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                      >
                        <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                // 消息列表
                messages.map((msg) => (
                  <div key={msg.id} className="mb-6">
                    {msg.role === "user" ? (
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
                      <div className="mt-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[#5B7BF9] font-semibold text-[13px] tracking-wide">Mark AI</span>
                          <Check className="w-[14px] h-[14px] text-[#5B7BF9]" />
                        </div>
                        <div className="text-[#4B5563] text-[15px] leading-[1.75]">
                          {renderContent(msg.content)}
                        </div>
                        
                        <div className="flex items-center gap-0 mt-4">
                          <button className="p-2 text-[#D1D5DB] hover:text-[#9CA3AF] transition-colors">
                            <ThumbsUp className="w-[16px] h-[16px]" />
                          </button>
                          <span className="text-[#E5E7EB] mx-1">|</span>
                          <button className="p-2 text-[#D1D5DB] hover:text-[#9CA3AF] transition-colors">
                            <ThumbsDown className="w-[16px] h-[16px]" />
                          </button>
                          <span className="text-[#E5E7EB] mx-1">|</span>
                          <button 
                            onClick={() => navigator.clipboard.writeText(msg.content)}
                            className="p-2 text-[#D1D5DB] hover:text-[#9CA3AF] transition-colors"
                          >
                            <Copy className="w-[16px] h-[16px]" />
                          </button>
                          <span className="text-[#E5E7EB] mx-1">|</span>
                          <button className="p-2 text-[#D1D5DB] hover:text-[#9CA3AF] transition-colors">
                            <MoreVertical className="w-[16px] h-[16px]" />
                          </button>
                          
                          <div className="flex-1" />
                          
                          <button className="flex items-center gap-2 px-4 py-2 text-[#9CA3AF] hover:text-[#6B7280] hover:bg-white/50 rounded-[10px] transition-all text-[13px]">
                            <RotateCcw className="w-[14px] h-[14px]" />
                            <span>重新生成</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}

              {/* Loading */}
              {isLoading && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[#5B7BF9] font-semibold text-[13px] tracking-wide">Mark AI</span>
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
              {/* 灵感问题（有消息时显示在输入框上方） */}
              {messages.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {inspirations.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleInspirationClick(q)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 rounded-full text-[12px] text-[#6B7280] hover:text-[#5B7BF9] hover:bg-[#EEF2FF] transition-all border border-[#E5E7EB]/50"
                    >
                      <Sparkles className="w-3 h-3 text-[#F59E0B]" />
                      {q}
                    </button>
                  ))}
                </div>
              )}
              
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
                  placeholder="想问点什么？..."
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
          <span className="text-[12px] font-medium tracking-wide">联系 Mark</span>
        </button>
      </div>
    </div>
  );
}
