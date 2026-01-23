import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { Sun, Cloud, CloudRain, Snowflake, Wind, RefreshCw, MapPin, Thermometer, CloudSun, TrendingUp } from "lucide-react";

interface CityWeather {
  name: string; lat: number; lng: number; weather: string; temp: string; nightTemp: string; wind: string; isSunny: boolean;
}

const MOCK_DATA = {
  success: true, timestamp: new Date().toISOString(), totalCities: 38, sunnyCities: 21,
  cities: [
    { name: "北京", lat: 39.9, lng: 116.4, weather: "晴", temp: "2", nightTemp: "-11", wind: "东北", isSunny: true },
    { name: "上海", lat: 31.2, lng: 121.5, weather: "晴", temp: "9", nightTemp: "1", wind: "东南", isSunny: true },
    { name: "天津", lat: 39.1, lng: 117.2, weather: "晴", temp: "3", nightTemp: "-8", wind: "北", isSunny: true },
    { name: "广州", lat: 23.1, lng: 113.3, weather: "多云", temp: "16", nightTemp: "6", wind: "北", isSunny: false },
    { name: "深圳", lat: 22.5, lng: 114.1, weather: "多云", temp: "17", nightTemp: "9", wind: "北", isSunny: false },
    { name: "杭州", lat: 30.3, lng: 120.2, weather: "晴", temp: "10", nightTemp: "2", wind: "北", isSunny: true },
    { name: "南京", lat: 32.1, lng: 118.8, weather: "晴", temp: "8", nightTemp: "0", wind: "东北", isSunny: true },
    { name: "成都", lat: 30.7, lng: 104.1, weather: "阴", temp: "11", nightTemp: "5", wind: "东北", isSunny: false },
    { name: "武汉", lat: 30.6, lng: 114.3, weather: "多云", temp: "9", nightTemp: "2", wind: "北", isSunny: false },
    { name: "西安", lat: 34.3, lng: 108.9, weather: "多云", temp: "5", nightTemp: "-4", wind: "东北", isSunny: false },
    { name: "昆明", lat: 25.0, lng: 102.7, weather: "晴", temp: "16", nightTemp: "2", wind: "西南", isSunny: true },
    { name: "三亚", lat: 18.3, lng: 109.5, weather: "多云", temp: "25", nightTemp: "19", wind: "东北", isSunny: false },
    { name: "哈尔滨", lat: 45.8, lng: 126.6, weather: "多云", temp: "-15", nightTemp: "-26", wind: "西南", isSunny: false },
    { name: "沈阳", lat: 41.8, lng: 123.4, weather: "晴", temp: "-8", nightTemp: "-20", wind: "西北", isSunny: true },
    { name: "大连", lat: 38.9, lng: 121.6, weather: "晴", temp: "-1", nightTemp: "-8", wind: "北", isSunny: true },
    { name: "青岛", lat: 36.1, lng: 120.4, weather: "晴", temp: "3", nightTemp: "-3", wind: "西北", isSunny: true },
    { name: "济南", lat: 36.7, lng: 117.0, weather: "晴", temp: "4", nightTemp: "-5", wind: "北", isSunny: true },
    { name: "郑州", lat: 34.8, lng: 113.7, weather: "多云", temp: "6", nightTemp: "-2", wind: "东北", isSunny: false },
    { name: "长沙", lat: 28.2, lng: 112.9, weather: "阴", temp: "8", nightTemp: "3", wind: "北", isSunny: false },
    { name: "南昌", lat: 28.7, lng: 115.9, weather: "晴", temp: "11", nightTemp: "3", wind: "北", isSunny: true },
    { name: "福州", lat: 26.1, lng: 119.3, weather: "多云", temp: "14", nightTemp: "8", wind: "东北", isSunny: false },
    { name: "海口", lat: 20.0, lng: 110.3, weather: "多云", temp: "20", nightTemp: "14", wind: "东北", isSunny: false },
    { name: "贵阳", lat: 26.6, lng: 106.7, weather: "阴", temp: "6", nightTemp: "2", wind: "东", isSunny: false },
    { name: "拉萨", lat: 29.6, lng: 91.1, weather: "晴", temp: "8", nightTemp: "-8", wind: "西南", isSunny: true },
    { name: "兰州", lat: 36.1, lng: 103.8, weather: "晴", temp: "2", nightTemp: "-10", wind: "东", isSunny: true },
    { name: "银川", lat: 38.5, lng: 106.3, weather: "晴", temp: "-1", nightTemp: "-13", wind: "东北", isSunny: true },
    { name: "西宁", lat: 36.6, lng: 101.8, weather: "晴", temp: "0", nightTemp: "-14", wind: "东南", isSunny: true },
    { name: "乌鲁木齐", lat: 43.8, lng: 87.6, weather: "小雪", temp: "-10", nightTemp: "-17", wind: "西北", isSunny: false },
    { name: "大理", lat: 25.6, lng: 100.2, weather: "晴", temp: "15", nightTemp: "1", wind: "西南", isSunny: true },
    { name: "丽江", lat: 26.9, lng: 100.2, weather: "晴", temp: "14", nightTemp: "-2", wind: "西南", isSunny: true },
  ],
};

function getWeatherIcon(weather: string, size = "w-5 h-5") {
  if (weather === "晴") return <Sun className={`${size} text-amber-400`} />;
  if (weather.includes("云") || weather === "阴") return <Cloud className={`${size} text-slate-400`} />;
  if (weather.includes("雨")) return <CloudRain className={`${size} text-blue-400`} />;
  if (weather.includes("雪")) return <Snowflake className={`${size} text-cyan-300`} />;
  return <CloudSun className={`${size} text-slate-300`} />;
}

function projectToMap(lat: number, lng: number, w: number, h: number) {
  return { x: ((lng - 73) / 62) * w, y: ((54 - lat) / 36) * h };
}

export default function SunnyMapPage() {
  const [data, setData] = useState(MOCK_DATA);
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState<CityWeather | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/weather");
      if (res.ok) { const r = await res.json(); if (r.success) { setData(r); toast.success("已更新"); } }
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const stats = useMemo(() => {
    const sunny = data.cities.filter(c => c.isSunny).length;
    const temps = data.cities.map(c => parseInt(c.temp));
    return { sunny, total: data.cities.length, avg: Math.round(temps.reduce((a, b) => a + b, 0) / temps.length), max: Math.max(...temps), min: Math.min(...temps) };
  }, [data]);

  const topHot = useMemo(() => [...data.cities].sort((a, b) => parseInt(b.temp) - parseInt(a.temp)).slice(0, 6), [data]);
  const topCold = useMemo(() => [...data.cities].sort((a, b) => parseInt(a.temp) - parseInt(b.temp)).slice(0, 6), [data]);
  const mapW = 420, mapH = 320;

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Sun className="w-8 h-8 text-amber-400" />
            <h1 className="text-2xl font-bold">晴天地图</h1>
            <span className="text-xs text-slate-500 ml-2">实时天气数据看板</span>
          </div>
          <button onClick={fetchData} disabled={loading} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-slate-300">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> 刷新
          </button>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 md:col-span-3 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-2xl p-5 border border-amber-500/20">
            <div className="flex items-start justify-between">
              <div><p className="text-xs text-amber-300/70 mb-1">晴天城市</p><p className="text-4xl font-bold text-amber-400">{stats.sunny}</p><p className="text-xs text-slate-500 mt-2">占比 {Math.round(stats.sunny / stats.total * 100)}%</p></div>
              <div className="p-2 rounded-xl bg-amber-500/20"><Sun className="w-6 h-6 text-amber-400" /></div>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3 bg-white/5 rounded-2xl p-5 border border-white/10">
            <div className="flex items-start justify-between">
              <div><p className="text-xs text-slate-400 mb-1">监测城市</p><p className="text-4xl font-bold text-white">{stats.total}</p><p className="text-xs text-slate-500 mt-2">全国主要城市</p></div>
              <div className="p-2 rounded-xl bg-white/10"><MapPin className="w-6 h-6 text-slate-400" /></div>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3 bg-white/5 rounded-2xl p-5 border border-white/10">
            <div className="flex items-start justify-between">
              <div><p className="text-xs text-slate-400 mb-1">平均温度</p><p className="text-4xl font-bold text-cyan-400">{stats.avg}°</p><p className="text-xs text-slate-500 mt-2">{stats.min}° ~ {stats.max}°</p></div>
              <div className="p-2 rounded-xl bg-cyan-500/20"><Thermometer className="w-6 h-6 text-cyan-400" /></div>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3 bg-white/5 rounded-2xl p-5 border border-white/10">
            <div className="flex items-start justify-between">
              <div><p className="text-xs text-slate-400 mb-1">更新时间</p><p className="text-lg font-medium text-white">{new Date(data.timestamp).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}</p><p className="text-xs text-slate-500 mt-1">{new Date(data.timestamp).toLocaleDateString("zh-CN")}</p></div>
              <div className="p-2 rounded-xl bg-emerald-500/20"><TrendingUp className="w-6 h-6 text-emerald-400" /></div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 bg-white/5 rounded-2xl p-5 border border-white/10">
            <p className="text-xs text-slate-400 mb-3">全国天气分布</p>
            <div className="relative" style={{ maxWidth: mapW }}>
              <svg viewBox={`0 0 ${mapW} ${mapH}`} className="w-full h-auto">
                <defs><radialGradient id="glow"><stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" /><stop offset="100%" stopColor="#fbbf24" stopOpacity="0" /></radialGradient></defs>
                <rect width="100%" height="100%" fill="rgba(255,255,255,0.02)" />
                <path d="M 65 44 Q 108 34 173 49 Q 244 38 314 65 Q 369 55 391 87 Q 401 120 391 151 Q 380 184 352 206 Q 325 227 282 250 Q 244 270 206 280 Q 163 275 120 260 Q 87 239 55 206 Q 33 173 43 130 Q 50 87 65 44 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                {data.cities.map((city) => {
                  const pos = projectToMap(city.lat, city.lng, mapW, mapH);
                  const isH = hovered?.name === city.name;
                  return (
                    <g key={city.name} transform={`translate(${pos.x}, ${pos.y})`} onMouseEnter={() => setHovered(city)} onMouseLeave={() => setHovered(null)} className="cursor-pointer">
                      {city.isSunny && <circle r={isH ? 14 : 9} fill="url(#glow)" />}
                      <circle r={isH ? 5 : 3} fill={city.isSunny ? "#fbbf24" : "#64748b"} stroke={city.isSunny ? "#fcd34d" : "#475569"} strokeWidth="1.5" />
                    </g>
                  );
                })}
              </svg>
              {hovered && (
                <div className="absolute bg-slate-900/95 border border-slate-700 rounded-lg p-3 shadow-xl pointer-events-none z-10" style={{ left: Math.min(projectToMap(hovered.lat, hovered.lng, mapW, mapH).x + 10, mapW - 100), top: projectToMap(hovered.lat, hovered.lng, mapW, mapH).y - 30 }}>
                  <div className="flex items-center gap-2 mb-1">{getWeatherIcon(hovered.weather, "w-4 h-4")}<span className="font-medium text-white">{hovered.name}</span>{hovered.isSunny && <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-300">晴天</span>}</div>
                  <div className="text-xs text-slate-400">{hovered.temp}°C · {hovered.weather}</div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs text-slate-500"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50" />晴天</span><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-500" />其他</span></div>
          </div>

          <div className="col-span-6 lg:col-span-2 bg-white/5 rounded-2xl p-4 border border-white/10">
            <p className="text-xs text-slate-400 mb-3 flex items-center gap-1"><TrendingUp className="w-3 h-3 text-rose-400" /> 最高温度</p>
            <div className="space-y-2">{topHot.map((city) => (<div key={city.name} className="flex items-center justify-between text-sm"><span className="text-slate-300 truncate">{city.name}</span><span className={`font-medium ${city.isSunny ? "text-amber-400" : "text-slate-400"}`}>{city.temp}°</span></div>))}</div>
          </div>

          <div className="col-span-6 lg:col-span-3 bg-white/5 rounded-2xl p-4 border border-white/10">
            <p className="text-xs text-slate-400 mb-3 flex items-center gap-1"><Snowflake className="w-3 h-3 text-cyan-400" /> 最低温度</p>
            <div className="space-y-2">{topCold.map((city) => (<div key={city.name} className="flex items-center justify-between text-sm"><span className="text-slate-300 truncate">{city.name}</span><span className="font-medium text-cyan-400">{city.temp}°</span></div>))}</div>
          </div>

          <div className="col-span-12 bg-white/5 rounded-2xl p-5 border border-white/10">
            <p className="text-xs text-slate-400 mb-4">晴天城市一览</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {data.cities.filter(c => c.isSunny).map((city) => (
                <div key={city.name} className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-xl p-3 border border-amber-500/20 hover:border-amber-500/40 transition-all">
                  <div className="flex items-center gap-2 mb-1"><Sun className="w-4 h-4 text-amber-400" /><span className="font-medium text-white text-sm truncate">{city.name}</span></div>
                  <div className="text-xs text-slate-400">{city.temp}°C</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-slate-600 mt-6">数据来源：高德开放平台天气 API</div>
      </div>
    </div>
  );
}
