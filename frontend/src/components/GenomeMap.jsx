import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Network, ArrowRight } from 'lucide-react';

const GenomeMap = ({ prediction, language }) => {
    if (!prediction) return (
        <div className="h-[400px] flex items-center justify-center border border-gray-800 rounded-lg bg-panel text-gray-500">
            Waiting for signals...
        </div>
    );

    const { genome, core, opportunity, growth } = prediction;

    const radarData = [
        { subject: 'Create', A: genome?.core_skills || 0, B: genome?.emerging_skills || 0, fullMark: 100 },
        { subject: 'Learn', A: core?.score || 0, B: (genome?.emerging_skills || 0) * 1.1, fullMark: 100 },
        { subject: 'Innovate', A: (genome?.cross_domain_synergy || 0) * 1.5, B: genome?.emerging_skills || 0, fullMark: 100 },
        { subject: 'Offline', A: opportunity?.hidden_talent_flag ? 90 : 60, B: 40, fullMark: 100 },
        { subject: 'Digital', A: (opportunity?.remote_work_potential || 0) > 50 ? 90 : 50, B: 70, fullMark: 100 },
        { subject: 'Growth', A: growth?.learning_momentum || 0, B: 60, fullMark: 100 },
    ];

    return (
        <div className="bg-panel border border-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-lg font-bold text-white tracking-wide">MULTI-LAYER SKILL GENOME</h2>
                    <div className="text-xs text-gray-500">
                        Confidence: {core?.confidence || 0}% • Diversty: {genome?.diversity_score || 0}
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-accent">{core?.domain || 'General'}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-widest">{core?.level || 'Analyzing...'} Level</div>
                </div>
            </div>

            <div className="h-[280px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                        <PolarGrid stroke="#374151" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name="Active Core" dataKey="A" stroke="#6C5CE7" strokeWidth={2} fill="#6C5CE7" fillOpacity={0.3} />
                        <Radar name="Emerging" dataKey="B" stroke="#00CEC9" strokeWidth={2} fill="#00CEC9" fillOpacity={0.1} />
                        <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#F3F4F6' }} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            {/* Transition Pathways */}
            <div className="mt-4 border-t border-gray-800 pt-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-2">
                    <Network className="w-3 h-3" /> Career Transition Pathways
                </h3>
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {genome?.transition_pathways?.map((path, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 rounded border border-gray-700 text-xs text-gray-300 whitespace-nowrap">
                            <span>{path}</span>
                            <ArrowRight className="w-3 h-3 text-gray-500" />
                        </div>
                    ))}
                </div>
                <div className="mt-2 text-[10px] text-gray-500">
                    AI Suggestion based on adjacent skill topology.
                </div>
            </div>
        </div>
    );
};

export default GenomeMap;
