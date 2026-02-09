import React from 'react';
import { Award, Briefcase, Zap, ShieldAlert, TrendingUp, CheckCircle, Activity, Globe, Cpu } from 'lucide-react';

const PredictionSummary = ({ data }) => {
    if (!data || !data.core) return null;

    const { core, opportunity, growth, genome, intelligence } = data;
    const { score, level, domain, confidence } = core;

    // Safety check for opportunity
    const safeOpp = opportunity || {};
    const { hidden_talent_flag, migration_risk, retention_risk, opportunity_match_score } = safeOpp;

    const growth_potential = growth?.growth_potential || 'Moderate';
    const momentum = growth?.learning_momentum || 50;
    const top_career = genome?.transition_pathways?.[0] || 'Domain Specialist';

    const model_used = intelligence?.model_used || "Standard Logic";
    const is_anomaly = intelligence?.is_anomaly || false;

    // Visual Helpers
    const getScoreColor = (s) => s >= 80 ? 'text-green-400' : s >= 50 ? 'text-yellow-400' : 'text-red-400';
    const getRiskColor = (r) => r === 'Critical' || r === 'High' ? 'text-red-400' : r === 'Moderate' ? 'text-yellow-400' : 'text-green-400';
    const getPotentialColor = (p) => p === 'Exponential' || p === 'High' ? 'text-green-400' : 'text-blue-400';

    return (
        <div className="bg-[#0F172A] border border-gray-700 rounded-xl p-6 mb-6 shadow-2xl relative overflow-hidden">
            {/* Anomaly Overlay */}
            {is_anomaly && (
                <div className="absolute inset-x-0 top-0 bg-red-500/10 border-b border-red-500/50 p-2 text-center text-xs text-red-300 z-50 flex justify-center items-center gap-2">
                    <ShieldAlert size={14} />
                    Suspicious profile detected by Isolation Forest – Confidence penalized.
                </div>
            )}

            {/* Header */}
            <div className={`flex justify-between items-start border-b border-gray-800 pb-4 mb-6 ${is_anomaly ? 'mt-6' : ''}`}>
                <div>
                    <h2 className="text-xl font-bold text-white tracking-widest flex items-center gap-2">
                        <Activity className="w-5 h-5 text-accent" />
                        NATIONAL TALENT ASSESSMENT
                    </h2>
                    <div className="text-xs text-gray-500 uppercase mt-1 tracking-wider flex items-center gap-2">
                        <span>Domain: {domain}</span>
                        <span className="text-gray-700">|</span>
                        <Cpu size={12} className="text-blue-500" />
                        <span className="text-blue-400">{model_used}</span>
                    </div>
                </div>
                {hidden_talent_flag && (
                    <div className="px-4 py-1 bg-purple-900/40 border border-purple-500/50 rounded-full flex items-center gap-2 animate-pulse">
                        <Zap className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-bold text-purple-300 uppercase">Hidden Talent Detected</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* 1. Core Result */}
                <div className="lg:col-span-1 border-r border-gray-800 pr-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
                        <Award className="w-4 h-4" /> Core Result
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <div className="text-xs text-gray-500 uppercase">Skill Level</div>
                            <div className={`text-2xl font-bold ${getScoreColor(score)}`}>{level}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 uppercase">AI Score</div>
                            <div className="flex items-baseline gap-1">
                                <span className={`text-4xl font-mono font-bold ${getScoreColor(score)}`}>{score}</span>
                                <span className="text-sm text-gray-600">/100</span>
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 uppercase">Confidence</div>
                            <div className="flex items-center gap-2">
                                <div className="text-sm font-mono text-accent">{confidence}%</div>
                                <div className="w-16 bg-gray-800 h-1.5 rounded-full">
                                    <div className="bg-accent h-1.5 rounded-full" style={{ width: `${confidence}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Opportunity Matrix */}
                <div className="lg:col-span-1 border-r border-gray-800 pr-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
                        <Globe className="w-4 h-4" /> Opportunity Matrix
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-gray-900/50 p-2 rounded">
                            <span className="text-xs text-gray-400">Match Score</span>
                            <span className="text-lg font-bold text-white">{opportunity_match_score}%</span>
                        </div>
                        <div className="flex justify-between items-center bg-gray-900/50 p-2 rounded">
                            <span className="text-xs text-gray-400">Retention Risk</span>
                            <span className={`text-sm font-bold ${getRiskColor(retention_risk)}`}>{retention_risk}</span>
                        </div>
                        <div className="mt-2">
                            <div className="text-xs text-gray-500 uppercase mb-1">Top Career Path</div>
                            <div className="text-sm font-bold text-blue-300 flex items-center gap-1">
                                <Briefcase className="w-3 h-3" /> {top_career}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Growth Outlook */}
                <div className="lg:col-span-1 border-r border-gray-800 pr-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" /> Growth Outlook
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <div className="text-xs text-gray-500 uppercase">Growth Potential</div>
                            <div className={`text-lg font-bold ${getPotentialColor(growth_potential)}`}>
                                {growth_potential}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 uppercase mb-1">Learning Momentum</div>
                            <div className="w-full bg-gray-800 rounded-full h-2">
                                <div className="bg-accent h-2 rounded-full" style={{ width: `${momentum}%` }}></div>
                            </div>
                            <div className="text-right text-xs text-gray-400 mt-1">{momentum} / 100</div>
                        </div>
                    </div>
                </div>

                {/* 4. Risk Assessment */}
                <div className="lg:col-span-1">
                    <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" /> Risk Assessment
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-400">Migration Risk</span>
                            <span className={`text-sm font-bold ${getRiskColor(migration_risk)}`}>{migration_risk}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-400">Reliability</span>
                            <span className="text-sm font-bold text-green-400">High</span>
                        </div>
                        {migration_risk === 'Critical' && (
                            <div className="mt-2 p-2 bg-red-900/20 border border-red-500/30 rounded text-xs text-red-300">
                                ! Immediate Intervention Required
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PredictionSummary;
