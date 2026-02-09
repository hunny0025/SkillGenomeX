import React from 'react';
import { AlertTriangle, Zap } from 'lucide-react';

const TalentSummary = ({ data }) => {
    if (!data || !data.core) {
        return (
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center text-gray-400 mb-6">
                Enter signals to generate talent intelligence
            </div>
        );
    }

    const { core, trust, opportunity, growth, genome } = data;

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-400';
        if (score >= 50) return 'text-yellow-400';
        return 'text-red-400';
    };

    const isHiddenTalent = opportunity?.hidden_talent_flag;
    const isHighRisk =
        opportunity?.migration_risk === 'Critical' ||
        growth?.obsolescence_risk === 'High';

    return (
        <div className="bg-[#0F172A] border border-gray-800 rounded-xl p-6 mb-6 shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-gray-800 pb-4 mb-4">
                <div>
                    <h2 className="text-lg font-bold text-white tracking-wide">
                        NATIONAL TALENT ASSESSMENT
                    </h2>
                    <p className="text-xs text-gray-500 uppercase mt-1">
                        AI-DRIVEN DECISION INTELLIGENCE
                    </p>
                </div>

                <div className="flex gap-2">
                    {isHiddenTalent && (
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full border border-purple-500/30 flex items-center gap-1">
                            <Zap className="w-3 h-3" /> HIDDEN TALENT
                        </span>
                    )}

                    {isHighRisk && (
                        <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded-full border border-red-500/30 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> HIGH RISK
                        </span>
                    )}
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                {/* A. Core Result */}
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                    <h3 className="text-gray-400 text-xs font-bold uppercase mb-3">
                        Core Result
                    </h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-400">Domain</span>
                            <span className="text-sm text-white font-medium">
                                {core.domain}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-sm text-gray-400">Level</span>
                            <span className={`text-sm font-bold ${getScoreColor(core.score)}`}>
                                {core.level}
                            </span>
                        </div>

                        <div className="flex justify-between items-baseline">
                            <span className="text-sm text-gray-400">Score</span>
                            <span className={`text-2xl font-mono font-bold ${getScoreColor(core.score)}`}>
                                {core.score}
                                <span className="text-sm text-gray-500">/100</span>
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-sm text-gray-400">Confidence</span>
                            <span className="text-sm text-accent font-mono">
                                {core.confidence}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* B. Opportunity */}
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                    <h3 className="text-gray-400 text-xs font-bold uppercase mb-3">
                        Opportunity Matrix
                    </h3>

                    <div className="space-y-3">
                        <div className="flex justify-between border-b border-gray-800 pb-2">
                            <span className="text-xs text-gray-400">Match Score</span>
                            <span className="text-sm text-white font-mono">
                                {opportunity?.opportunity_match_score || 0}
                            </span>
                        </div>

                        <div className="flex justify-between border-b border-gray-800 pb-2">
                            <span className="text-xs text-gray-400">Retention Risk</span>
                            <span
                                className={`text-sm font-medium ${opportunity?.retention_risk === 'High'
                                        ? 'text-red-400'
                                        : 'text-green-400'
                                    }`}
                            >
                                {opportunity?.retention_risk || 'Low'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* C. Growth */}
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                    <h3 className="text-gray-400 text-xs font-bold uppercase mb-3 text-green-400">
                        Growth Outlook
                    </h3>

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-xs text-gray-400">Potential</span>
                            <span className="text-sm text-white font-bold">
                                {growth?.growth_potential || 'Linear'}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-xs text-gray-400">Momentum</span>
                            <span className="text-sm text-accent font-mono">
                                {growth?.learning_momentum || 0}
                            </span>
                        </div>

                        <div className="mt-3 pt-2 border-t border-gray-700 flex justify-between text-xs">
                            <span className="text-gray-500">Obsolescence Risk</span>
                            <span
                                className={
                                    growth?.obsolescence_risk === 'High'
                                        ? 'text-red-400'
                                        : 'text-gray-300'
                                }
                            >
                                {growth?.obsolescence_risk || 'Low'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* D. Risk */}
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                    <h3 className="text-gray-400 text-xs font-bold uppercase mb-3 text-red-300">
                        Risk Assessment
                    </h3>

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-xs text-gray-400">Migration Risk</span>
                            <span className="text-sm text-white">
                                {opportunity?.migration_risk || 'Low'}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-xs text-gray-400">Reliability</span>
                            <span
                                className={`text-sm font-mono ${trust?.reliability_score < 60
                                        ? 'text-red-400'
                                        : 'text-green-400'
                                    }`}
                            >
                                {trust?.reliability_score || 100}%
                            </span>
                        </div>

                        {trust?.adversarial_flag && (
                            <div className="mt-2 bg-red-900/30 border border-red-500/50 rounded px-2 py-1 text-xs text-red-300 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                Signal Inconsistent
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            {genome && (
                <div className="mt-4 pt-4 border-t border-gray-800 grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-xs text-gray-500 mb-1">Diversity Score</div>
                        <div className="text-sm text-white font-mono">
                            {genome.diversity_score || 0}
                        </div>
                    </div>

                    <div>
                        <div className="text-xs text-gray-500 mb-1">Emerging Skills</div>
                        <div className="text-sm text-white font-mono">
                            {genome.emerging_skills || 0}
                        </div>
                    </div>

                    <div>
                        <div className="text-xs text-gray-500 mb-1">Skill Pathways</div>
                        <div className="text-xs text-gray-300 truncate px-2">
                            {genome.transition_pathways?.join(', ')}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TalentSummary;

