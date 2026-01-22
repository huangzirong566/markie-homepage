import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Copy, ArrowLeftRight, Trash2, FileJson, FileText } from "lucide-react";

export default function ToolsPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"md-to-json" | "json-to-md">("md-to-json");

  // Markdown 转 JSON
  const mdToJson = (md: string): string => {
    const lines = md.split("\n");
    const result: Record<string, unknown> = {};
    let currentKey = "";
    let currentContent: string[] = [];

    const saveCurrentSection = () => {
      if (currentKey) {
        const content = currentContent.join("\n").trim();
        result[currentKey] = content;
      }
    };

    for (const line of lines) {
      const h1Match = line.match(/^#\s+(.+)$/);
      const h2Match = line.match(/^##\s+(.+)$/);
      const h3Match = line.match(/^###\s+(.+)$/);

      if (h1Match || h2Match || h3Match) {
        saveCurrentSection();
        currentKey = (h1Match?.[1] || h2Match?.[1] || h3Match?.[1] || "").trim();
        currentContent = [];
      } else {
        currentContent.push(line);
      }
    }
    saveCurrentSection();

    if (Object.keys(result).length === 0) {
      return JSON.stringify({ content: md }, null, 2);
    }

    return JSON.stringify(result, null, 2);
  };

  // JSON 转 Markdown
  const jsonToMd = (jsonStr: string): string => {
    const obj = JSON.parse(jsonStr);
    return convertToMd(obj, 1);
  };

  const convertToMd = (obj: unknown, level: number): string => {
    if (obj === null || obj === undefined) return "";
    if (typeof obj !== "object") return String(obj);

    if (Array.isArray(obj)) {
      return obj.map((item) => `- ${typeof item === "object" ? JSON.stringify(item) : item}`).join("\n");
    }

    const lines: string[] = [];
    const prefix = "#".repeat(Math.min(level, 6));

    for (const [key, value] of Object.entries(obj)) {
      lines.push(`${prefix} ${key}`);
      lines.push("");
      if (typeof value === "object" && value !== null) {
        lines.push(convertToMd(value, level + 1));
      } else {
        lines.push(String(value));
      }
      lines.push("");
    }

    return lines.join("\n").trim();
  };

  const handleConvert = () => {
    if (!input.trim()) {
      toast.error("请输入内容");
      return;
    }

    try {
      if (mode === "md-to-json") {
        setOutput(mdToJson(input));
      } else {
        setOutput(jsonToMd(input));
      }
      toast.success("转换成功");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "转换失败，请检查格式");
    }
  };

  const handleCopy = () => {
    if (!output) {
      toast.error("没有可复制的内容");
      return;
    }
    navigator.clipboard.writeText(output);
    toast.success("已复制到剪贴板");
  };

  const handleSwap = () => {
    setInput(output);
    setOutput("");
    setMode(mode === "md-to-json" ? "json-to-md" : "md-to-json");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Markdown ↔ JSON 转换器
          </h1>
          <p className="text-slate-400 mb-6">
            在 Markdown 和 JSON 格式之间快速转换，完全免费
          </p>

          {/* Mode Toggle */}
          <div className="flex items-center justify-center gap-2">
            <Button
              variant={mode === "md-to-json" ? "default" : "outline"}
              onClick={() => setMode("md-to-json")}
              className={mode === "md-to-json" 
                ? "bg-violet-600 hover:bg-violet-700" 
                : "border-slate-700 text-slate-300 hover:bg-slate-800"}
            >
              <FileText className="w-4 h-4 mr-2" />
              MD → JSON
            </Button>
            <Button
              variant={mode === "json-to-md" ? "default" : "outline"}
              onClick={() => setMode("json-to-md")}
              className={mode === "json-to-md" 
                ? "bg-violet-600 hover:bg-violet-700" 
                : "border-slate-700 text-slate-300 hover:bg-slate-800"}
            >
              <FileJson className="w-4 h-4 mr-2" />
              JSON → MD
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Input */}
          <Card className="bg-slate-900/50 border-slate-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-medium flex items-center gap-2">
                {mode === "md-to-json" ? (
                  <>
                    <FileText className="w-4 h-4 text-emerald-400" />
                    Markdown 输入
                  </>
                ) : (
                  <>
                    <FileJson className="w-4 h-4 text-amber-400" />
                    JSON 输入
                  </>
                )}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="text-slate-400 hover:text-white"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === "md-to-json"
                  ? "# 标题\n\n内容...\n\n## 子标题\n\n更多内容..."
                  : '{\n  "title": "标题",\n  "content": "内容"\n}'
              }
              className="min-h-[400px] bg-slate-800/50 border-slate-700 text-white font-mono text-sm resize-none"
            />
          </Card>

          {/* Output */}
          <Card className="bg-slate-900/50 border-slate-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-medium flex items-center gap-2">
                {mode === "md-to-json" ? (
                  <>
                    <FileJson className="w-4 h-4 text-amber-400" />
                    JSON 输出
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 text-emerald-400" />
                    Markdown 输出
                  </>
                )}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="text-slate-400 hover:text-white"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <Textarea
              value={output}
              readOnly
              placeholder="转换结果将显示在这里..."
              className="min-h-[400px] bg-slate-800/50 border-slate-700 text-white font-mono text-sm resize-none"
            />
          </Card>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <Button
            onClick={handleConvert}
            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 px-8"
          >
            转换
          </Button>
          <Button
            variant="outline"
            onClick={handleSwap}
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <ArrowLeftRight className="w-4 h-4 mr-2" />
            交换输入输出
          </Button>
        </div>

        {/* Tips */}
        <Card className="bg-slate-900/30 border-slate-800 p-6 mt-8">
          <h3 className="text-white font-medium mb-3">使用说明</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-400">
            <div>
              <h4 className="text-slate-300 font-medium mb-2">MD → JSON</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>标题 (#, ##, ###) 会转换为 JSON 的 key</li>
                <li>标题下的内容会作为对应的 value</li>
                <li>支持多级标题嵌套</li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-300 font-medium mb-2">JSON → MD</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>对象的 key 会转换为 Markdown 标题</li>
                <li>嵌套对象会增加标题层级</li>
                <li>数组会转换为列表</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
