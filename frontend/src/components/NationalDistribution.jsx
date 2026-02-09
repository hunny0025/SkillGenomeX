import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import axios from 'axios';

const NationalDistribution = ({ language }) => {
    const [data, setData] = useState(null);
    const COLORS = ['#6C5CE7', '#00b894', '#0984e3', '#fdcb6e', '#e17055', '#d63031'];

    useEffect(() => {
        axios.get('/api/national-distribution').then(res => setData(res.data));
    }, []);

    if (!data) return <div>Loading national data...</div>;

    const chartData = Object.keys(data.distribution).map(key => ({
        name: key,
        value: data.distribution[key]
    }));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-panel border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4">
                    {language === 'en' ? 'National Talent Distribution' : 'राष्ट्रीय प्रतिभा वितरण'}
                </h2>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151' }} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-panel border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-danger mb-2">
                        {language === 'en' ? 'Underrepresented Sectors' : 'कम प्रतिनिधित्व वाले क्षेत्र'}
                    </h3>
                    <div className="space-y-2">
                        {data.underrepresented.length > 0 ? (
                            data.underrepresented.map(sector => (
                                <div key={sector} className="flex justify-between items-center bg-danger/10 p-3 rounded border border-danger/20">
                                    <span className="text-danger font-medium">{sector}</span>
                                    <span className="text-xs text-danger/70">CRITICAL SHORTAGE</span>
                                </div>
                            ))
                        ) : (
                            <div className="text-success">Balanced Distribution Detected</div>
                        )}
                    </div>
                </div>

                <div className="bg-panel border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-accent mb-2">Total Analyzed Profiles</h3>
                    <div className="text-4xl font-bold text-white">{data.total_users.toLocaleString()}</div>
                    <div className="text-xs text-muted mt-1">Live synthetic nodes</div>
                </div>
            </div>
        </div>
    );
};

export default NationalDistribution;
