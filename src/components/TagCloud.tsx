import { useEffect, useRef, useState } from "react";

const skills = [
  { name: "AI Product Manager", weight: 700, size: 24, color: "#fff" },
  { name: "AIGC", weight: 600, size: 20, color: "#10b981" }, // emerald-500
  { name: "Coze", weight: 600, size: 20, color: "#3b82f6" }, // blue-500
  { name: "Agent", weight: 500, size: 18, color: "#fff" },
  { name: "Vibe Coding", weight: 500, size: 18, color: "#a855f7" }, // purple-500
  { name: "Multi-modal", weight: 500, size: 18, color: "#fff" },
  { name: "ComfyUI", weight: 400, size: 16, color: "rgba(255,255,255,0.6)" },
  { name: "ENTJ", weight: 400, size: 16, color: "rgba(255,255,255,0.6)" },
  { name: "Video Gen", weight: 400, size: 16, color: "rgba(255,255,255,0.6)" },
  { name: "Vision Pro", weight: 400, size: 16, color: "rgba(255,255,255,0.6)" },
  { name: "Stable Diffusion", weight: 400, size: 16, color: "rgba(255,255,255,0.6)" },
  { name: "Next.js", weight: 400, size: 16, color: "rgba(255,255,255,0.6)" },
  { name: "孙燕姿", weight: 300, size: 14, color: "rgba(255,255,255,0.4)" },
  { name: "周杰伦", weight: 300, size: 14, color: "rgba(255,255,255,0.4)" },
  { name: "皇室战争", weight: 300, size: 14, color: "rgba(255,255,255,0.4)" },
  { name: "佳能 R62", weight: 300, size: 14, color: "rgba(255,255,255,0.4)" },
  { name: "老友记", weight: 300, size: 14, color: "rgba(255,255,255,0.4)" },
  { name: "骑行", weight: 300, size: 14, color: "rgba(255,255,255,0.4)" },
  { name: "钢琴", weight: 300, size: 14, color: "rgba(255,255,255,0.4)" },
  { name: "Vlog", weight: 300, size: 14, color: "rgba(255,255,255,0.4)" },
];

export default function TagCloud() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 3D 旋转参数
  const radius = 120; // 半径
  const [tags, setTags] = useState<any[]>([]);

  useEffect(() => {
    // 初始化标签位置 (球体分布)
    const newTags = skills.map((skill, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      
      return {
        ...skill,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
      };
    });
    setTags(newTags);
  }, []);

  // 动画循环
  useEffect(() => {
    let animationFrameId: number;
    let angleX = 0.002;
    let angleY = 0.002;

    const animate = () => {
      setTags(currentTags => {
        return currentTags.map(tag => {
          // 绕 X 轴旋转
          const y1 = tag.y * Math.cos(angleX) - tag.z * Math.sin(angleX);
          const z1 = tag.z * Math.cos(angleX) + tag.y * Math.sin(angleX);
          
          // 绕 Y 轴旋转
          const x2 = tag.x * Math.cos(angleY) - z1 * Math.sin(angleY);
          const z2 = z1 * Math.cos(angleY) + tag.x * Math.sin(angleY);

          return { ...tag, x: x2, y: y1, z: z2 };
        });
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[300px] flex items-center justify-center overflow-hidden">
      {tags.map((tag, i) => {
        // 计算透明度和缩放 (基于 z 轴，制造景深感)
        const scale = (tag.z + radius * 2) / (radius * 3); // 0.6 ~ 1.3
        const alpha = Math.max(0.2, (tag.z + radius) / (radius * 2)); 
        
        return (
          <span
            key={i}
            className="absolute transition-transform duration-75 ease-linear will-change-transform cursor-default hover:scale-110 hover:z-50 hover:text-white"
            style={{
              transform: `translate3d(${tag.x}px, ${tag.y}px, 0) scale(${scale})`,
              fontSize: `${tag.size}px`,
              fontWeight: tag.weight,
              color: tag.color,
              opacity: alpha,
              zIndex: Math.round(scale * 100),
            }}
          >
            {tag.name}
          </span>
        );
      })}
    </div>
  );
}
