import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const ForecastPanel = ({ language }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/forecast');
                setData(res.data);
            } catch (e) { console.error(e); }
        };
        fetchData();
    }, []);

    // Mock time-series data for visualization since backend returns summary
    const generateTrendData = (velocity, trend) => {
        const base = trend === 'Rising' ? 10 : trend === 'Stable' ? 50 : 80;
        const slope = trend === 'Rising' ? 5 : trend === 'Stable' ? 1 : -3;
        return [2024, 2025, 2026, 2027, 2028].map(year => ({
            year,
            val: base + (year - 2024) * slope * velocity * 0.5 + Math.random() * 5
        }));
    };

    if (!data) return <div className="p-6 text-gray-500">Generating Forecasts...</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">
                {language === 'en' ? 'Skill Evolution Forecast (2024-2028)' : 'कौशल विकास पूर्वानुमान'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(data).map(([domain, info]) => (
                    <div key={domain} className="bg-panel border border-gray-800 rounded-lg p-4 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4 z-10 relative">
                            <div>
                                <div className="text-sm font-bold text-white">{domain}</div>
                                <div className={`text-xs mt-1 font-mono ${info.trend === 'Rising' || info.trend === 'Exponential' ? 'text-green-400' :
                                        info.trend === 'Declining' ? 'text-red-400' : 'text-blue-400'
                                    }`}>
                                    {info.status} • v{info.velocity}
                                </div>
                            </div>
                            {info.trend.includes('Rising') ? <TrendingUp className="text-green-500 w-5 h-5" /> :
                                info.trend === 'Declining' ? <TrendingDown className="text-red-500 w-5 h-5" /> :
                                    <Minus className="text-blue-500 w-5 h-5" />}
                        </div>

                        <div className="h-[100px] w-full z-0 opacity-50">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={generateTrendData(info.velocity, info.trend)}>
                                    <Line
                                        type="monotone"
                                        dataKey="val"
                                        stroke={info.trend.includes('Rising') ? '#34D399' : info.trend === 'Declining' ? '#F87171' : '#60A5FA'}
                                        strokeWidth={3}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ForecastPanel;
