import React from 'react';
import { Award, Briefcase, Zap, ShieldAlert, TrendingUp, CheckCircle } from 'lucide-react';

const FinalTalentReport = ({ data }) => {
    if (!data || !data.core) return null;

    const { core, opportunity, growth, genome } = data;
    const { score, level, domain, confidence } = core;
    const { hidden_talent_flag, migration_risk } = opportunity || {};
    const growth_potential = growth?.growth_potential || 'Moderate';
    const top_career = genome?.transition_pathways?.[0] || 'Domain Specialist';

    // Color Logic
    const getScoreColor = (s) => s >= 80 ? 'text-green-400' : s >= 50 ? 'text-yellow-400' : 'text-red-400';
    const getRiskColor = (r) => r === 'Critical' || r === 'High' ? 'text-red-400' : r === 'Moderate' ? 'text-yellow-400' : 'text-green-400';

    return (
        <div className="bg-[#0B1120] border border-gray-700 rounded-lg p-6 mb-6 shadow-2xl relative overflow-hidden">
            {/* Government Watermark */}
            <div className="absolute top-0 right-0 p-2 opacity-10">
                <Award className="w-24 h-24 text-gray-400" />
            </div>

            <div className="relative z-10">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-800 pb-4 mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-wider flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-accent" />
                            FINAL TALENT REPORT
                        </h2>
                        <div className="text-xs text-accent mt-1 uppercase tracking-widest">
                            System Decision Estimate • ID: {Math.floor(Math.random() * 90000) + 10000}
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-gray-500 uppercase">AI Confidence</div>
                        <div className="text-lg font-mono text-accent font-bold">{confidence}%</div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* 1. Core Assessment */}
                    <div className="bg-gray-900/50 p-4 rounded border-l-2 border-accent">
                        <div className="text-xs text-gray-400 uppercase mb-1">Assessed Level</div>
                        <div className={`text-2xl font-bold ${getScoreColor(score)}`}>{level}</div>
                        <div className="text-xs text-gray-500 mt-1">
                            Score: <span className="font-mono text-white">{score}</span> / 100
                        </div>
                    </div>

                    {/* 2. Hidden Talent & Risk */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-gray-900/30 rounded">
                            <div className="text-xs text-gray-400">Hidden Talent</div>
                            <div className={`text-sm font-bold ${hidden_talent_flag ? 'text-purple-400' : 'text-gray-500'}`}>
                                {hidden_talent_flag ? 'YES' : 'NO'}
                            </div>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-900/30 rounded">
                            <div className="text-xs text-gray-400">Migration Risk</div>
                            <div className={`text-sm font-bold ${getRiskColor(migration_risk)}`}>
                                {migration_risk}
                            </div>
                        </div>
                    </div>

                    {/* 3. Growth & Career */}
                    <div className="bg-gray-900/50 p-4 rounded border border-gray-800">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                            <div className="text-xs text-gray-400 uppercase">Growth Potential</div>
                        </div>
                        <div className="text-lg font-bold text-white">{growth_potential}</div>
                    </div>

                    <div className="bg-gray-900/50 p-4 rounded border border-gray-800">
                        <div className="flex items-center gap-2 mb-2">
                            <Briefcase className="w-4 h-4 text-blue-400" />
                            <div className="text-xs text-gray-400 uppercase">Recommendation</div>
                        </div>
                        <div className="text-sm font-bold text-white truncate" title={top_career}>
                            {top_career}
                        </div>
                    </div>
                </div>

                {/* Footer Label */}
                <div className="mt-4 pt-2 border-t border-gray-800 text-center">
                    <span className="text-[10px] text-gray-600 uppercase tracking-[0.2em] bg-gray-900 px-2 rounded">
                        AI Decision Summary • Confidential
                    </span>
                </div>
            </div>
        </div>
    );
};

export default FinalTalentReport;
