import React, { useState } from 'react';
import { Sliders, RefreshCw, Save } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const WhatIf = ({ language }) => {
    const [params, setParams] = useState({
        migration: 0,
        funding: 0,
        digital: 0,
        disruption: 0
    });

    // Mock simulation result
    const [result, setResult] = useState({
        risk: 25, // Adjusted base to positive for bar chart visibility or logic
        growth: 42,
        stability: 65
    });

    const handleChange = (key, val) => {
        const newVal = parseInt(val);
        const next = { ...params, [key]: newVal };
        setParams(next);

        // Simple simulation logic
        // Digital access reduces risk, increases growth, increases stability
        // Tech disruption increases growth (efficiency) but increases risk and lowers stability slightly
        setResult({
            risk: Math.max(0, 30 - (next.digital * 0.3) - (next.funding * 0.2) + (next.disruption * 0.1) - (next.migration * 0.05)),
            growth: Math.min(100, 40 + (next.funding * 0.4) + (next.digital * 0.2) + (next.disruption * 0.1)),
            stability: Math.min(100, 60 + (next.digital * 0.1) - (next.disruption * 0.2) - (next.migration * 0.1))
        });
    };

    const chartData = [
        { name: 'Risk', val: result.risk, fill: '#F87171' },
        { name: 'Growth', val: result.growth, fill: '#60A5FA' },
        { name: 'Stability', val: result.stability, fill: '#A78BFA' }
    ];

    return (
        <div className="bg-panel border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-bold text-white uppercase tracking-wider">
                        {language === 'en' ? 'What-If Simulation Engine' : 'सिमुलेशन इंजन'}
                    </h2>
                    <p className="text-xs text-gray-400">Model policy impacts on national talent metrics.</p>
                </div>
                <button
                    onClick={() => {
                        setParams({ migration: 0, funding: 0, digital: 0, disruption: 0 });
                        setResult({ risk: 30, growth: 40, stability: 60 });
                    }}
                    className="p-2 bg-gray-900 rounded hover:bg-gray-800 text-accent transition-colors"
                    title="Reset Simulation"
                >
                    <RefreshCw className="w-5 h-5" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Controls */}
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between text-xs text-gray-400 mb-2">
                            <span>Talent Migration Flow</span>
                            <span className="font-mono text-accent">{params.migration}%</span>
                        </div>
                        <input type="range" min="-50" max="50" value={params.migration} onChange={(e) => handleChange('migration', e.target.value)} className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent" />
                    </div>
                    <div>
                        <div className="flex justify-between text-xs text-gray-400 mb-2">
                            <span>Education Funding Boost</span>
                            <span className="font-mono text-green-400">{params.funding}%</span>
                        </div>
                        <input type="range" min="0" max="100" value={params.funding} onChange={(e) => handleChange('funding', e.target.value)} className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500" />
                    </div>
                    <div>
                        <div className="flex justify-between text-xs text-gray-400 mb-2">
                            <span>Digital Access Expansion</span>
                            <span className="font-mono text-blue-400">{params.digital}%</span>
                        </div>
                        <input type="range" min="0" max="100" value={params.digital} onChange={(e) => handleChange('digital', e.target.value)} className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                    </div>
                    <div>
                        <div className="flex justify-between text-xs text-gray-400 mb-2">
                            <span>Tech Disruption Shock</span>
                            <span className="font-mono text-red-400">{params.disruption}%</span>
                        </div>
                        <input type="range" min="0" max="100" value={params.disruption} onChange={(e) => handleChange('disruption', e.target.value)} className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500" />
                    </div>
                </div>

                {/* Output Viz */}
                <div className="bg-gray-900/50 rounded p-4 border border-gray-800">
                    <h3 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-wider">Projected Output (12 Mo)</h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} layout="vertical" margin={{ left: 0 }}>
                                <XAxis type="number" domain={[0, 100]} hide />
                                <YAxis dataKey="name" type="category" width={60} tick={{ fill: '#9CA3AF', fontSize: 11 }} axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff' }} />
                                <Bar dataKey="val" barSize={24} radius={[0, 4, 4, 0]}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhatIf;
