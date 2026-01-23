import { useState, useCallback } from 'react'
import { 
  FileText, 
  FileJson, 
  Copy, 
  Check, 
  Trash2, 
  Download,
  ChevronRight,
  File,
  Folder,
  Terminal,
  Settings,
  Search,
  GitBranch,
  Home
} from 'lucide-react'
import { useLocation } from 'wouter'

type OutputFormat = 'markdown' | 'json'

export default function TextConverter() {
  const [, setLocation] = useLocation()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [format, setFormat] = useState<OutputFormat>('markdown')
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'input' | 'output'>('input')

  // 文本转 Markdown
  const textToMarkdown = (text: string): string => {
    if (!text.trim()) return ''
    
    const lines = text.split('\n')
    const result: string[] = []
    let inList = false
    
    for (const line of lines) {
      const trimmed = line.trim()
      
      if (!trimmed) {
        if (inList) {
          inList = false
          result.push('')
        }
        result.push('')
        continue
      }
      
      // 检测标题（全大写或以数字开头的短行）
      if (trimmed === trimmed.toUpperCase() && trimmed.length < 50 && /[A-Z]/.test(trimmed)) {
        result.push(`## ${trimmed}`)
        result.push('')
        continue
      }
      
      // 检测列表项（以 - * · 或数字开头）
      if (/^[-*·•]\s/.test(trimmed) || /^\d+[.)]\s/.test(trimmed)) {
        if (!inList) inList = true
        result.push(trimmed.replace(/^[-*·•]\s/, '- ').replace(/^\d+[.)]\s/, '- '))
        continue
      }
      
      // 检测键值对
      if (trimmed.includes(':') && trimmed.indexOf(':') < 30) {
        const [key, ...valueParts] = trimmed.split(':')
        const value = valueParts.join(':').trim()
        if (value) {
          result.push(`**${key.trim()}**: ${value}`)
          continue
        }
      }
      
      // 普通段落
      result.push(trimmed)
    }
    
    return result.join('\n').replace(/\n{3,}/g, '\n\n').trim()
  }

  // 文本转 JSON
  const textToJson = (text: string): string => {
    if (!text.trim()) return '{}'
    
    const lines = text.split('\n').filter(line => line.trim())
    const result: Record<string, unknown> = {}
    let currentSection = 'content'
    let currentItems: string[] = []
    
    const saveCurrentItems = () => {
      if (currentItems.length > 0) {
        if (currentItems.length === 1) {
          result[currentSection] = currentItems[0]
        } else {
          result[currentSection] = currentItems
        }
        currentItems = []
      }
    }
    
    for (const line of lines) {
      const trimmed = line.trim()
      
      // 检测标题/节名
      if (trimmed === trimmed.toUpperCase() && trimmed.length < 50 && /[A-Z]/.test(trimmed)) {
        saveCurrentItems()
        currentSection = trimmed.toLowerCase().replace(/\s+/g, '_')
        continue
      }
      
      // 检测键值对
      if (trimmed.includes(':') && trimmed.indexOf(':') < 30) {
        const colonIndex = trimmed.indexOf(':')
        const key = trimmed.slice(0, colonIndex).trim()
        const value = trimmed.slice(colonIndex + 1).trim()
        if (key && value) {
          saveCurrentItems()
          const keyName = key.toLowerCase().replace(/\s+/g, '_')
          result[keyName] = value
          continue
        }
      }
      
      // 列表项
      const listMatch = trimmed.match(/^[-*·•]\s*(.+)$/) || trimmed.match(/^\d+[.)]\s*(.+)$/)
      if (listMatch) {
        currentItems.push(listMatch[1])
        continue
      }
      
      // 普通文本
      currentItems.push(trimmed)
    }
    
    saveCurrentItems()
    
    return JSON.stringify(result, null, 2)
  }

  // 转换处理
  const handleConvert = useCallback(() => {
    if (format === 'markdown') {
      setOutput(textToMarkdown(input))
    } else {
      setOutput(textToJson(input))
    }
    setActiveTab('output')
  }, [input, format])

  // 复制到剪贴板
  const handleCopy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // 下载文件
  const handleDownload = () => {
    const ext = format === 'markdown' ? 'md' : 'json'
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `converted.${ext}`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 清空
  const handleClear = () => {
    setInput('')
    setOutput('')
    setActiveTab('input')
  }

  // 统计信息
  const inputStats = {
    lines: input.split('\n').length,
    chars: input.length,
    words: input.trim() ? input.trim().split(/\s+/).length : 0
  }

  return (
    <div className="h-screen flex flex-col" style={{ background: '#1e1e1e', fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, Monaco, monospace" }}>
      {/* 自定义样式 */}
      <style>{`
        .ide-scrollbar::-webkit-scrollbar { width: 10px; height: 10px; }
        .ide-scrollbar::-webkit-scrollbar-track { background: #1e1e1e; }
        .ide-scrollbar::-webkit-scrollbar-thumb { background: #424242; }
        .ide-scrollbar::-webkit-scrollbar-thumb:hover { background: #4f4f4f; }
        .ide-textarea { font-family: 'JetBrains Mono', 'Fira Code', Consolas, Monaco, monospace; font-size: 13px; line-height: 1.6; tab-size: 2; }
        .ide-textarea:focus { outline: none; }
        ::selection { background: #264f78; color: #ffffff; }
      `}</style>

      {/* 标题栏 */}
      <div className="h-8 flex items-center px-4" style={{ background: '#252526', borderBottom: '1px solid #3c3c3c' }}>
        <div className="flex items-center gap-2 text-xs" style={{ color: '#808080' }}>
          <FileText size={14} style={{ color: '#0e639c' }} />
          <span>Text Converter</span>
          <span>-</span>
          <span>文本转换器</span>
        </div>
        <div className="flex-1" />
        <button 
          onClick={() => setLocation('/')}
          className="flex items-center gap-1 px-2 py-1 rounded text-xs hover:bg-white/10 transition-colors"
          style={{ color: '#cccccc' }}
        >
          <Home size={12} />
          返回首页
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* 侧边栏 - 活动栏 */}
        <div className="w-12 flex flex-col items-center py-2" style={{ background: '#252526', borderRight: '1px solid #3c3c3c' }}>
          <button className="w-12 h-12 flex items-center justify-center" style={{ color: '#cccccc', borderLeft: '2px solid #0e639c', background: '#1e1e1e' }}>
            <File size={24} />
          </button>
          <button className="w-12 h-12 flex items-center justify-center hover:text-white" style={{ color: '#808080' }}>
            <Search size={24} />
          </button>
          <button className="w-12 h-12 flex items-center justify-center hover:text-white" style={{ color: '#808080' }}>
            <GitBranch size={24} />
          </button>
          <div className="flex-1" />
          <button className="w-12 h-12 flex items-center justify-center hover:text-white" style={{ color: '#808080' }}>
            <Settings size={24} />
          </button>
        </div>

        {/* 侧边栏 - 资源管理器 */}
        <div className="w-56 flex flex-col" style={{ background: '#252526', borderRight: '1px solid #3c3c3c' }}>
          <div className="h-9 px-4 flex items-center text-[11px] uppercase tracking-wider" style={{ color: '#808080' }}>
            资源管理器
          </div>
          
          <div className="flex-1 text-sm">
            <div className="px-2">
              <div className="flex items-center gap-1 py-1 px-2 cursor-pointer hover:bg-white/5" style={{ color: '#808080' }}>
                <ChevronRight size={16} className="rotate-90" />
                <Folder size={16} style={{ color: '#dcdcaa' }} />
                <span style={{ color: '#cccccc' }}>text-converter</span>
              </div>
              
              <div className="ml-4">
                <div 
                  className={`flex items-center gap-1 py-1 px-2 cursor-pointer`}
                  style={{ background: activeTab === 'input' ? '#37373d' : 'transparent' }}
                  onClick={() => setActiveTab('input')}
                >
                  <File size={16} style={{ color: '#808080' }} />
                  <span style={{ color: activeTab === 'input' ? '#ffffff' : '#cccccc' }}>input.txt</span>
                </div>
                <div 
                  className={`flex items-center gap-1 py-1 px-2 cursor-pointer`}
                  style={{ background: activeTab === 'output' ? '#37373d' : 'transparent' }}
                  onClick={() => setActiveTab('output')}
                >
                  <File size={16} style={{ color: format === 'markdown' ? '#569cd6' : '#dcdcaa' }} />
                  <span style={{ color: activeTab === 'output' ? '#ffffff' : '#cccccc' }}>
                    output.{format === 'markdown' ? 'md' : 'json'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 输出格式选择 */}
          <div className="p-3" style={{ borderTop: '1px solid #3c3c3c' }}>
            <div className="text-[11px] uppercase tracking-wider mb-2" style={{ color: '#808080' }}>输出格式</div>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setFormat('markdown')}
                className="flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors"
                style={{ 
                  background: format === 'markdown' ? '#0e639c' : '#37373d',
                  color: format === 'markdown' ? '#ffffff' : '#cccccc'
                }}
              >
                <FileText size={16} />
                Markdown
              </button>
              <button
                onClick={() => setFormat('json')}
                className="flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors"
                style={{ 
                  background: format === 'json' ? '#0e639c' : '#37373d',
                  color: format === 'json' ? '#ffffff' : '#cccccc'
                }}
              >
                <FileJson size={16} />
                JSON
              </button>
            </div>
          </div>
        </div>

        {/* 主编辑区 */}
        <div className="flex-1 flex flex-col">
          {/* 标签栏 */}
          <div className="h-9 flex items-center" style={{ background: '#252526', borderBottom: '1px solid #3c3c3c' }}>
            <div 
              className="h-full px-4 flex items-center gap-2 text-sm cursor-pointer"
              style={{ 
                background: activeTab === 'input' ? '#1e1e1e' : 'transparent',
                color: activeTab === 'input' ? '#ffffff' : '#808080',
                borderRight: '1px solid #3c3c3c'
              }}
              onClick={() => setActiveTab('input')}
            >
              <File size={14} />
              input.txt
            </div>
            <div 
              className="h-full px-4 flex items-center gap-2 text-sm cursor-pointer"
              style={{ 
                background: activeTab === 'output' ? '#1e1e1e' : 'transparent',
                color: activeTab === 'output' ? '#ffffff' : '#808080',
                borderRight: '1px solid #3c3c3c'
              }}
              onClick={() => setActiveTab('output')}
            >
              <File size={14} style={{ color: format === 'markdown' ? '#569cd6' : '#dcdcaa' }} />
              output.{format === 'markdown' ? 'md' : 'json'}
            </div>
          </div>

          {/* 面包屑 */}
          <div className="h-6 px-4 flex items-center text-xs" style={{ background: '#1e1e1e', color: '#808080', borderBottom: '1px solid #3c3c3c' }}>
            <span>text-converter</span>
            <ChevronRight size={12} className="mx-1" />
            <span style={{ color: '#cccccc' }}>{activeTab === 'input' ? 'input.txt' : `output.${format === 'markdown' ? 'md' : 'json'}`}</span>
          </div>

          {/* 编辑器 */}
          <div className="flex-1 flex overflow-hidden">
            {/* 行号区域 */}
            <div className="w-14 text-right pr-4 pt-2 text-sm select-none ide-scrollbar overflow-y-auto" style={{ background: '#1e1e1e', color: '#808080', borderRight: '1px solid #3c3c3c' }}>
              {(activeTab === 'input' ? input : output).split('\n').map((_, i) => (
                <div key={i} style={{ height: '1.6em', lineHeight: '1.6' }}>{i + 1}</div>
              ))}
              {(activeTab === 'input' ? input : output) === '' && <div style={{ height: '1.6em', lineHeight: '1.6' }}>1</div>}
            </div>

            {/* 编辑区 */}
            <div className="flex-1 relative">
              {activeTab === 'input' ? (
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="// 在此粘贴或输入任意文本..."
                  className="w-full h-full p-2 resize-none ide-textarea ide-scrollbar"
                  style={{ background: '#1e1e1e', color: '#cccccc' }}
                  spellCheck={false}
                />
              ) : (
                <pre className="w-full h-full p-2 overflow-auto whitespace-pre-wrap ide-scrollbar" style={{ background: '#1e1e1e', color: '#cccccc', fontSize: '13px', lineHeight: '1.6' }}>
                  {output || <span style={{ color: '#808080' }}>// 转换后的内容将显示在这里...</span>}
                </pre>
              )}
            </div>
          </div>

          {/* 操作栏 */}
          <div className="h-12 flex items-center px-4 gap-2" style={{ background: '#252526', borderTop: '1px solid #3c3c3c' }}>
            <button
              onClick={handleConvert}
              disabled={!input.trim()}
              className="px-4 py-1.5 text-white text-sm rounded flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: '#0e639c' }}
            >
              <Terminal size={14} />
              转换
            </button>
            
            <button
              onClick={handleCopy}
              disabled={!output}
              className="px-3 py-1.5 text-sm rounded flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: '#37373d', color: '#cccccc' }}
            >
              {copied ? <Check size={14} style={{ color: '#4ec9b0' }} /> : <Copy size={14} />}
              {copied ? '已复制' : '复制'}
            </button>

            <button
              onClick={handleDownload}
              disabled={!output}
              className="px-3 py-1.5 text-sm rounded flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: '#37373d', color: '#cccccc' }}
            >
              <Download size={14} />
              下载
            </button>

            <button
              onClick={handleClear}
              className="px-3 py-1.5 text-sm rounded flex items-center gap-2 transition-colors"
              style={{ background: '#37373d', color: '#cccccc' }}
            >
              <Trash2 size={14} />
              清空
            </button>

            <div className="flex-1" />

            <div className="text-xs" style={{ color: '#808080' }}>
              {format === 'markdown' ? 'Markdown' : 'JSON'} • UTF-8
            </div>
          </div>
        </div>
      </div>

      {/* 状态栏 */}
      <div className="h-6 flex items-center px-4 text-xs text-white" style={{ background: '#0e639c' }}>
        <div className="flex items-center gap-4">
          <span>行 {inputStats.lines}</span>
          <span>字符 {inputStats.chars}</span>
          <span>词 {inputStats.words}</span>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-4">
          <span>UTF-8</span>
          <span>LF</span>
          <span>{format === 'markdown' ? 'Markdown' : 'JSON'}</span>
        </div>
      </div>
    </div>
  )
}
