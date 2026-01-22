import type { VercelRequest, VercelResponse } from "@vercel/node";

// 全国主要城市列表（包含省会城市和主要地级市）
const CITIES = [
  // 直辖市
  { name: "北京", adcode: "110000", lat: 39.9, lng: 116.4 },
  { name: "上海", adcode: "310000", lat: 31.2, lng: 121.5 },
  { name: "天津", adcode: "120000", lat: 39.1, lng: 117.2 },
  { name: "重庆", adcode: "500000", lat: 29.6, lng: 106.5 },
  // 华北
  { name: "石家庄", adcode: "130100", lat: 38.0, lng: 114.5 },
  { name: "太原", adcode: "140100", lat: 37.9, lng: 112.5 },
  { name: "呼和浩特", adcode: "150100", lat: 40.8, lng: 111.7 },
  // 东北
  { name: "沈阳", adcode: "210100", lat: 41.8, lng: 123.4 },
  { name: "长春", adcode: "220100", lat: 43.9, lng: 125.3 },
  { name: "哈尔滨", adcode: "230100", lat: 45.8, lng: 126.6 },
  { name: "大连", adcode: "210200", lat: 38.9, lng: 121.6 },
  // 华东
  { name: "南京", adcode: "320100", lat: 32.1, lng: 118.8 },
  { name: "杭州", adcode: "330100", lat: 30.3, lng: 120.2 },
  { name: "合肥", adcode: "340100", lat: 31.8, lng: 117.3 },
  { name: "福州", adcode: "350100", lat: 26.1, lng: 119.3 },
  { name: "南昌", adcode: "360100", lat: 28.7, lng: 115.9 },
  { name: "济南", adcode: "370100", lat: 36.7, lng: 117.0 },
  { name: "青岛", adcode: "370200", lat: 36.1, lng: 120.4 },
  { name: "苏州", adcode: "320500", lat: 31.3, lng: 120.6 },
  { name: "宁波", adcode: "330200", lat: 29.9, lng: 121.5 },
  { name: "厦门", adcode: "350200", lat: 24.5, lng: 118.1 },
  // 中南
  { name: "郑州", adcode: "410100", lat: 34.8, lng: 113.7 },
  { name: "武汉", adcode: "420100", lat: 30.6, lng: 114.3 },
  { name: "长沙", adcode: "430100", lat: 28.2, lng: 112.9 },
  { name: "广州", adcode: "440100", lat: 23.1, lng: 113.3 },
  { name: "深圳", adcode: "440300", lat: 22.5, lng: 114.1 },
  { name: "南宁", adcode: "450100", lat: 22.8, lng: 108.4 },
  { name: "海口", adcode: "460100", lat: 20.0, lng: 110.3 },
  { name: "东莞", adcode: "441900", lat: 23.0, lng: 113.7 },
  { name: "佛山", adcode: "440600", lat: 23.0, lng: 113.1 },
  // 西南
  { name: "成都", adcode: "510100", lat: 30.7, lng: 104.1 },
  { name: "贵阳", adcode: "520100", lat: 26.6, lng: 106.7 },
  { name: "昆明", adcode: "530100", lat: 25.0, lng: 102.7 },
  { name: "拉萨", adcode: "540100", lat: 29.6, lng: 91.1 },
  // 西北
  { name: "西安", adcode: "610100", lat: 34.3, lng: 108.9 },
  { name: "兰州", adcode: "620100", lat: 36.1, lng: 103.8 },
  { name: "西宁", adcode: "630100", lat: 36.6, lng: 101.8 },
  { name: "银川", adcode: "640100", lat: 38.5, lng: 106.3 },
  { name: "乌鲁木齐", adcode: "650100", lat: 43.8, lng: 87.6 },
  // 其他重要城市
  { name: "无锡", adcode: "320200", lat: 31.5, lng: 120.3 },
  { name: "温州", adcode: "330300", lat: 28.0, lng: 120.7 },
  { name: "珠海", adcode: "440400", lat: 22.3, lng: 113.6 },
  { name: "三亚", adcode: "460200", lat: 18.3, lng: 109.5 },
  { name: "大理", adcode: "532900", lat: 25.6, lng: 100.2 },
  { name: "丽江", adcode: "530700", lat: 26.9, lng: 100.2 },
  { name: "桂林", adcode: "450300", lat: 25.3, lng: 110.3 },
  { name: "秦皇岛", adcode: "130300", lat: 39.9, lng: 119.6 },
  { name: "烟台", adcode: "370600", lat: 37.5, lng: 121.4 },
  { name: "威海", adcode: "371000", lat: 37.5, lng: 122.1 },
];

// 高德天气 API Key（需要替换为实际的 Key）
const AMAP_KEY = process.env.AMAP_API_KEY || "YOUR_AMAP_KEY";

interface WeatherForecast {
  date: string;
  week: string;
  dayweather: string;
  nightweather: string;
  daytemp: string;
  nighttemp: string;
  daywind: string;
  nightwind: string;
  daypower: string;
  nightpower: string;
}

interface AmapWeatherResponse {
  status: string;
  count: string;
  info: string;
  forecasts: Array<{
    city: string;
    adcode: string;
    province: string;
    reporttime: string;
    casts: WeatherForecast[];
  }>;
}

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 设置 CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // 批量获取天气数据
    const weatherPromises = CITIES.map(async (city) => {
      try {
        const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=${AMAP_KEY}&city=${city.adcode}&extensions=all`;
        const response = await fetch(url);
        const data: AmapWeatherResponse = await response.json();

        if (data.status === "1" && data.forecasts?.[0]?.casts?.[0]) {
          const today = data.forecasts[0].casts[0];
          const weather = today.dayweather;
          const isSunny = weather === "晴" || weather === "晴间多云";

          return {
            name: city.name,
            lat: city.lat,
            lng: city.lng,
            weather,
            temp: today.daytemp,
            nightTemp: today.nighttemp,
            wind: today.daywind,
            isSunny,
          } as CityWeather;
        }
        return null;
      } catch {
        return null;
      }
    });

    const results = await Promise.all(weatherPromises);
    const validResults = results.filter((r): r is CityWeather => r !== null);

    // 统计晴天城市数量
    const sunnyCities = validResults.filter((c) => c.isSunny);

    return res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      totalCities: validResults.length,
      sunnyCities: sunnyCities.length,
      cities: validResults,
    });
  } catch (error) {
    console.error("Weather API error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch weather data",
    });
  }
}
