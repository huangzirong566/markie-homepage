import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import {
  Sun,
  Cloud,
  CloudRain,
  Snowflake,
  Wind,
  RefreshCw,
  MapPin,
  Thermometer,
  CloudSun,
} from "lucide-react";

interface CityWeather {
  name: string;
  lat: number;
  lng: number;
  weather: string;
  temp: string;
  nightTemp: string;
  wind: string;
  isSunny: boolean;
}

interface WeatherData {
  success: boolean;
  timestamp: string;
  totalCities: number;
  sunnyCities: number;
  cities: CityWeather[];
}

// 模拟数据（当 API 不可用时使用）
const MOCK_DATA: WeatherData = {
  success: true,
  timestamp: new Date().toISOString(),
  totalCities: 50,
  sunnyCities: 18,
  cities: [
    { name: "北京", lat: 39.9, lng: 116.4, weather: "晴", temp: "2", nightTemp: "-11", wind: "东北", isSunny: true },
    { name: "上海", lat: 31.2, lng: 121.5, weather: "晴", temp: "9", nightTemp: "1", wind: "东南", isSunny: true },
    { name: "天津", lat: 39.1, lng: 117.2, weather: "晴", temp: "3", nightTemp: "-8", wind: "北", isSunny: true },
    { name: "重庆", lat: 29.6, lng: 106.5, weather: "阴", temp: "10", nightTemp: "7", wind: "东", isSunny: false },
    { name: "石家庄", lat: 38.0, lng: 114.5, weather: "晴", temp: "5", nightTemp: "-6", wind: "西北", isSunny: true },
    { name: "太原", lat: 37.9, lng: 112.5, weather: "晴", temp: "1", nightTemp: "-12", wind: "北", isSunny: true },
    { name: "呼和浩特", lat: 40.8, lng: 111.7, weather: "晴", temp: "-5", nightTemp: "-18", wind: "西北", isSunny: true },
    { name: "沈阳", lat: 41.8, lng: 123.4, weather: "晴", temp: "-8", nightTemp: "-20", wind: "西北", isSunny: true },
    { name: "长春", lat: 43.9, lng: 125.3, weather: "晴", temp: "-12", nightTemp: "-24", wind: "西", isSunny: true },
    { name: "哈尔滨", lat: 45.8, lng: 126.6, weather: "多云", temp: "-15", nightTemp: "-26", wind: "西南", isSunny: false },
    { name: "大连", lat: 38.9, lng: 121.6, weather: "晴", temp: "-1", nightTemp: "-8", wind: "北", isSunny: true },
    { name: "南京", lat: 32.1, lng: 118.8, weather: "晴", temp: "8", nightTemp: "0", wind: "东北", isSunny: true },
    { name: "杭州", lat: 30.3, lng: 120.2, weather: "晴", temp: "10", nightTemp: "2", wind: "北", isSunny: true },
    { name: "合肥", lat: 31.8, lng: 117.3, weather: "多云", temp: "7", nightTemp: "-1", wind: "东北", isSunny: false },
    { name: "福州", lat: 26.1, lng: 119.3, weather: "多云", temp: "14", nightTemp: "8", wind: "东北", isSunny: false },
    { name: "南昌", lat: 28.7, lng: 115.9, weather: "晴", temp: "11", nightTemp: "3", wind: "北", isSunny: true },
    { name: "济南", lat: 36.7, lng: 117.0, weather: "晴", temp: "4", nightTemp: "-5", wind: "北", isSunny: true },
    { name: "青岛", lat: 36.1, lng: 120.4, weather: "晴", temp: "3", nightTemp: "-3", wind: "西北", isSunny: true },
    { name: "郑州", lat: 34.8, lng: 113.7, weather: "多云", temp: "6", nightTemp: "-2", wind: "东北", isSunny: false },
    { name: "武汉", lat: 30.6, lng: 114.3, weather: "多云", temp: "9", nightTemp: "2", wind: "北", isSunny: false },
    { name: "长沙", lat: 28.2, lng: 112.9, weather: "阴", temp: "8", nightTemp: "3", wind: "北", isSunny: false },
    { name: "广州", lat: 23.1, lng: 113.3, weather: "多云", temp: "16", nightTemp: "6", wind: "北", isSunny: false },
    { name: "深圳", lat: 22.5, lng: 114.1, weather: "多云", temp: "17", nightTemp: "9", wind: "北", isSunny: false },
    { name: "南宁", lat: 22.8, lng: 108.4, weather: "阴", temp: "14", nightTemp: "10", wind: "东北", isSunny: false },
    { name: "海口", lat: 20.0, lng: 110.3, weather: "多云", temp: "20", nightTemp: "14", wind: "东北", isSunny: false },
    { name: "成都", lat: 30.7, lng: 104.1, weather: "阴", temp: "11", nightTemp: "5", wind: "东北", isSunny: false },
    { name: "贵阳", lat: 26.6, lng: 106.7, weather: "阴", temp: "6", nightTemp: "2", wind: "东", isSunny: false },
    { name: "昆明", lat: 25.0, lng: 102.7, weather: "晴", temp: "16", nightTemp: "2", wind: "西南", isSunny: true },
    { name: "拉萨", lat: 29.6, lng: 91.1, weather: "晴", temp: "8", nightTemp: "-8", wind: "西南", isSunny: true },
    { name: "西安", lat: 34.3, lng: 108.9, weather: "多云", temp: "5", nightTemp: "-4", wind: "东北", isSunny: false },
    { name: "兰州", lat: 36.1, lng: 103.8, weather: "晴", temp: "2", nightTemp: "-10", wind: "东", isSunny: true },
    { name: "西宁", lat: 36.6, lng: 101.8, weather: "晴", temp: "0", nightTemp: "-14", wind: "东南", isSunny: true },
    { name: "银川", lat: 38.5, lng: 106.3, weather: "晴", temp: "-1", nightTemp: "-13", wind: "东北", isSunny: true },
    { name: "乌鲁木齐", lat: 43.8, lng: 87.6, weather: "小雪", temp: "-10", nightTemp: "-17", wind: "西北", isSunny: false },
    { name: "三亚", lat: 18.3, lng: 109.5, weather: "多云", temp: "25", nightTemp: "19", wind: "东北", isSunny: false },
    { name: "大理", lat: 25.6, lng: 100.2, weather: "晴", temp: "15", nightTemp: "1", wind: "西南", isSunny: true },
    { name: "丽江", lat: 26.9, lng: 100.2, weather: "晴", temp: "14", nightTemp: "-2", wind: "西南", isSunny: true },
    { name: "桂林", lat: 25.3, lng: 110.3, weather: "阴", temp: "10", nightTemp: "5", wind: "北", isSunny: false },
  ],
};

// 获取天气图标
function getWeatherIcon(weather: string, className: string = "w-5 h-5") {
  if (weather === "晴" || weather === "晴间多云") {
    return <Sun className={`${className} text-amber-400`} />;
  } else if (weather.includes("云") || weather === "阴") {
    return <Cloud className={`${className} text-slate-400`} />;
  } else if (weather.includes("雨")) {
    return <CloudRain className={`${className} text-blue-400`} />;
  } else if (weather.includes("雪")) {
    return <Snowflake className={`${className} text-cyan-300`} />;
  } else if (weather.includes("风") || weather.includes("沙")) {
    return <Wind className={`${className} text-yellow-600`} />;
  }
  return <CloudSun className={`${className} text-slate-300`} />;
}

// 中国地图坐标转换（简化的投影）
function projectToMap(
  lat: number,
  lng: number,
  width: number,
  height: number
): { x: number; y: number } {
  // 中国大陆的经纬度范围
  const minLng = 73;
  const maxLng = 135;
  const minLat = 18;
  const maxLat = 54;

  const x = ((lng - minLng) / (maxLng - minLng)) * width;
  const y = ((maxLat - lat) / (maxLat - minLat)) * height;

  return { x, y };
}

export default function SunnyMapPage() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredCity, setHoveredCity] = useState<CityWeather | null>(null);
  const [filter, setFilter] = useState<"all" | "sunny" | "cloudy">("all");

  // 获取天气数据
  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/weather");
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setData(result);
          toast.success("天气数据已更新");
        } else {
          throw new Error("API returned error");
        }
      } else {
        throw new Error("API request failed");
      }
    } catch {
      // 使用模拟数据
      console.log("Using mock data");
      setData(MOCK_DATA);
      toast.info("使用缓存数据展示");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  // 过滤城市
  const filteredCities = useMemo(() => {
    if (!data) return [];
    switch (filter) {
      case "sunny":
        return data.cities.filter((c) => c.isSunny);
      case "cloudy":
        return data.cities.filter((c) => !c.isSunny);
      default:
        return data.cities;
    }
  }, [data, filter]);

  // 统计数据
  const stats = useMemo(() => {
    if (!data) return { sunny: 0, cloudy: 0, total: 0 };
    const sunny = data.cities.filter((c) => c.isSunny).length;
    return {
      sunny,
      cloudy: data.cities.length - sunny,
      total: data.cities.length,
    };
  }, [data]);

  // 地图尺寸
  const mapWidth = 800;
  const mapHeight = 600;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Spinner className="w-12 h-12 text-amber-400" />
          <p className="text-slate-400">正在获取全国天气数据...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sun className="w-10 h-10 text-amber-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              晴天地图
            </h1>
          </div>
          <p className="text-slate-400 mb-2">
            实时展示全国各地的晴天城市，找到阳光明媚的好去处
          </p>
          {data && (
            <p className="text-xs text-slate-500">
              更新时间：{new Date(data.timestamp).toLocaleString("zh-CN")}
            </p>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
          <Card
            className={`bg-gradient-to-br from-amber-500/20 to-orange-500/10 border-amber-500/30 p-4 text-center cursor-pointer transition-all hover:scale-105 ${filter === "sunny" ? "ring-2 ring-amber-400" : ""}`}
            onClick={() => setFilter(filter === "sunny" ? "all" : "sunny")}
          >
            <Sun className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-amber-400">
              {stats.sunny}
            </div>
            <div className="text-xs text-slate-400">晴天城市</div>
          </Card>
          <Card
            className={`bg-gradient-to-br from-slate-500/20 to-slate-600/10 border-slate-500/30 p-4 text-center cursor-pointer transition-all hover:scale-105 ${filter === "cloudy" ? "ring-2 ring-slate-400" : ""}`}
            onClick={() => setFilter(filter === "cloudy" ? "all" : "cloudy")}
          >
            <Cloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-300">
              {stats.cloudy}
            </div>
            <div className="text-xs text-slate-400">其他天气</div>
          </Card>
          <Card className="bg-gradient-to-br from-violet-500/20 to-purple-500/10 border-violet-500/30 p-4 text-center">
            <MapPin className="w-8 h-8 text-violet-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-violet-300">
              {stats.total}
            </div>
            <div className="text-xs text-slate-400">监测城市</div>
          </Card>
        </div>

        {/* Refresh Button */}
        <div className="flex justify-center mb-6">
          <Button
            variant="outline"
            onClick={fetchWeatherData}
            disabled={loading}
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            刷新数据
          </Button>
        </div>

        {/* Map Container */}
        <Card className="bg-slate-900/50 border-slate-800 p-6 mb-8 overflow-hidden">
          <div className="relative mx-auto" style={{ maxWidth: mapWidth }}>
            {/* SVG Map */}
            <svg
              viewBox={`0 0 ${mapWidth} ${mapHeight}`}
              className="w-full h-auto"
              style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}
            >
              {/* Grid lines */}
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="rgba(100,116,139,0.1)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* China outline (simplified) */}
              <path
                d="M 120 80 Q 200 60 320 90 Q 450 70 580 120 Q 680 100 720 160 
                   Q 740 220 720 280 Q 700 340 650 380 Q 600 420 520 460 
                   Q 450 500 380 520 Q 300 510 220 480 Q 160 440 100 380 
                   Q 60 320 80 240 Q 90 160 120 80 Z"
                fill="rgba(100,116,139,0.05)"
                stroke="rgba(100,116,139,0.2)"
                strokeWidth="2"
              />

              {/* City markers */}
              {filteredCities.map((city) => {
                const pos = projectToMap(city.lat, city.lng, mapWidth, mapHeight);
                const isHovered = hoveredCity?.name === city.name;

                return (
                  <g
                    key={city.name}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    onMouseEnter={() => setHoveredCity(city)}
                    onMouseLeave={() => setHoveredCity(null)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Glow effect for sunny cities */}
                    {city.isSunny && (
                      <circle
                        r={isHovered ? 24 : 16}
                        fill="url(#sunnyGlow)"
                        opacity={0.6}
                        className="transition-all duration-300"
                      />
                    )}

                    {/* Main marker */}
                    <circle
                      r={isHovered ? 10 : 6}
                      fill={city.isSunny ? "#fbbf24" : "#64748b"}
                      stroke={city.isSunny ? "#f59e0b" : "#475569"}
                      strokeWidth="2"
                      className="transition-all duration-300"
                    />

                    {/* City name label */}
                    {isHovered && (
                      <text
                        y={-16}
                        textAnchor="middle"
                        fill="white"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        {city.name}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Gradient definitions */}
              <defs>
                <radialGradient id="sunnyGlow">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>

            {/* Hover tooltip */}
            {hoveredCity && (
              <div
                className="absolute bg-slate-800/95 backdrop-blur-sm border border-slate-700 rounded-lg p-3 shadow-xl pointer-events-none z-10"
                style={{
                  left: projectToMap(hoveredCity.lat, hoveredCity.lng, mapWidth, mapHeight).x + 20,
                  top: projectToMap(hoveredCity.lat, hoveredCity.lng, mapWidth, mapHeight).y - 20,
                  transform: "translateY(-50%)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  {getWeatherIcon(hoveredCity.weather, "w-6 h-6")}
                  <span className="font-bold text-white">{hoveredCity.name}</span>
                  {hoveredCity.isSunny && (
                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                      晴天
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-300">
                  <span className="flex items-center gap-1">
                    <Thermometer className="w-4 h-4" />
                    {hoveredCity.temp}°C
                  </span>
                  <span>{hoveredCity.weather}</span>
                </div>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50" />
              <span>晴天</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-500" />
              <span>其他天气</span>
            </div>
          </div>
        </Card>

        {/* City List */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-400" />
            {filter === "sunny"
              ? "晴天城市列表"
              : filter === "cloudy"
                ? "其他天气城市列表"
                : "全部城市天气"}
            <Badge variant="secondary" className="ml-2">
              {filteredCities.length}
            </Badge>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {filteredCities.map((city) => (
              <Card
                key={city.name}
                className={`p-3 transition-all hover:scale-105 cursor-pointer ${
                  city.isSunny
                    ? "bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/20 hover:border-amber-500/40"
                    : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
                }`}
                onMouseEnter={() => setHoveredCity(city)}
                onMouseLeave={() => setHoveredCity(null)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white text-sm">
                    {city.name}
                  </span>
                  {getWeatherIcon(city.weather, "w-5 h-5")}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Thermometer className="w-3 h-3" />
                    {city.temp}°
                  </span>
                  <span>{city.weather}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Tips */}
        <Card className="bg-slate-900/30 border-slate-800 p-6">
          <h3 className="text-white font-medium mb-3 flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-400" />
            关于晴天地图
          </h3>
          <div className="text-sm text-slate-400 space-y-2">
            <p>
              晴天地图实时展示全国 {stats.total} 个主要城市的天气状况，帮助你快速找到阳光明媚的好去处。
            </p>
            <p>
              点击统计卡片可以筛选显示晴天或其他天气的城市，将鼠标悬停在地图上的城市标记可以查看详细天气信息。
            </p>
            <p className="text-xs text-slate-500">
              数据来源：高德开放平台天气 API，每次访问自动更新
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
