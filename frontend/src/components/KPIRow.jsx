import React from 'react';
import { TrendingUp, Users, ShieldCheck, Activity } from 'lucide-react';

const KPIRow = ({ data, language }) => {
    // Use data from API or defaults
    const stability = data?.stability_index || '--';
    const hiddenTalent = 12.4; // Mock avg if not in API yet
    const riskStates = 3;

    const metrics = [
        {
            label: language === 'en' ? 'National Stability' : 'राष्ट्रीय स्थिरता',
            val: `${stability}%`,
            trend: '+2.1%',
            icon: ShieldCheck,
            color: 'text-emerald-400'
        },
        {
            label: language === 'en' ? 'Hidden Talent Rate' : 'छिपी हुई प्रतिभा',
            val: `${hiddenTalent}%`,
            trend: '+5.3%',
            icon: Users,
            color: 'text-yellow-400'
        },
        {
            label: language === 'en' ? 'Critical Risk Zones' : 'महत्वपूर्ण जोखिम क्षेत्र',
            val: riskStates,
            trend: 'Stable',
            icon: Activity,
            color: 'text-red-400'
        },
        {
            label: language === 'en' ? 'Skill Velocity' : 'कौशल वेग',
            val: '8.2/10',
            trend: '+1.2',
            icon: TrendingUp,
            color: 'text-blue-400'
        }
    ];

    return (
        <div className="grid grid-cols-4 gap-0 border-b border-gray-800 bg-panel/30">
            {metrics.map((m, i) => {
                const Icon = m.icon;
                return (
                    <div key={i} className="p-4 border-r border-gray-800 flex items-center justify-between group hover:bg-white/5 transition-colors">
                        <div>
                            <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">{m.label}</div>
                            <div className="text-2xl font-mono font-medium text-white group-hover:scale-105 transition-transform origin-left">{m.val}</div>
                            <div className="text-[10px] text-gray-400 mt-1">
                                <span className={m.trend.includes('+') ? 'text-green-500' : 'text-gray-500'}>{m.trend}</span> vs last month
                            </div>
                        </div>
                        <div className={`p-2 rounded-full bg-gray-900 ${m.color.replace('text', 'bg')}/10`}>
                            <Icon className={`w-5 h-5 ${m.color}`} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default KPIRow;
