import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Minus, Briefcase, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const MarketPanel = ({ language }) => {
    const [marketData, setMarketData] = useState({});
    const [trends, setTrends] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [marketRes, trendRes] = await Promise.all([
                    axios.get('/api/market-intelligence'),
                    axios.get('/api/skill-trends')
                ]);
                setMarketData(marketRes.data || {});
                setTrends(trendRes.data || {});
            } catch (err) {
                console.error("Market API error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="p-6 text-gray-500 animate-pulse">Loading Market Intelligence...</div>;
    if (!marketData || Object.keys(marketData).length === 0) return <div className="p-6 text-gray-500">No market data available.</div>;

    const chartData = Object.keys(marketData).map(domain => {
        const item = marketData[domain];
        return {
            name: domain,
            gap: item?.skill_gap || 0,
            status: item?.status
        };
    });

    const getStatusColor = (status) => {
        if (status === 'Critical Shortage') return 'text-red-500 font-bold';
        if (status === 'Shortage') return 'text-orange-400';
        if (status === 'Surplus') return 'text-blue-400';
        return 'text-green-400';
    };

    return (
        <div className="bg-panel border border-gray-800 rounded-lg p-6 h-full flex flex-col">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-accent" />
                {language === 'en' ? 'Market Demand Intelligence' : 'बाजार मांग खुफिया'}
            </h2>

            {/* Chart Section */}
            <div className="h-[200px] w-full mb-6 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={chartData} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#F3F4F6' }}
                            itemStyle={{ color: '#F3F4F6' }}
                            cursor={{ fill: 'transparent' }}
                        />
                        <Bar dataKey="gap" name="Talent Gap" radius={[0, 4, 4, 0]} barSize={20}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.gap > 0 ? '#EF4444' : '#10B981'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Detailed List */}
            <div className="space-y-4 overflow-y-auto flex-1 pr-2">
                {Object.entries(marketData).map(([domain, info]) => {
                    const trend = trends[domain] || { status: 'Stable', growth_rate: 0 };

                    return (
                        <div key={domain} className="bg-gray-900/50 border border-gray-800 rounded p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <div className="text-white font-bold">{domain}</div>
                                    <div className="flex items-center gap-2 text-xs mt-1">
                                        <span className={`px-2 py-0.5 rounded bg-gray-800 border border-gray-700 ${getStatusColor(info.status)}`}>
                                            {info.status}
                                        </span>
                                        {trend.status !== 'Stable' && (
                                            <span className={`flex items-center gap-1 ${trend.status === 'Emerging' ? 'text-green-400' : 'text-red-400'}`}>
                                                {trend.status === 'Emerging' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                                {trend.growth_rate > 0 ? '+' : ''}{trend.growth_rate}%
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-gray-400">Demand Gap</div>
                                    <div className={`font-mono font-bold text-lg ${info.skill_gap > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                                        {info.skill_gap > 0 ? '-' : '+'}{Math.abs(info.skill_gap)}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 grid grid-cols-2 gap-4 text-xs">
                                <div>
                                    <div className="flex justify-between text-gray-500 mb-1">
                                        <span>Demand Index</span>
                                        <span>{info.demand_index}</span>
                                    </div>
                                    <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-blue-500 h-full" style={{ width: `${info.demand_index}%` }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-gray-500 mb-1">
                                        <span>Talent Supply</span>
                                        <span>{info.supply_index}</span>
                                    </div>
                                    <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-purple-500 h-full" style={{ width: `${info.supply_index}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MarketPanel;
