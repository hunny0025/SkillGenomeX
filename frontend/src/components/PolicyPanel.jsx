import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ClipboardList, CheckSquare, Zap, Play, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const PolicyPanel = ({ language }) => {
    const [recommendations, setRecs] = useState([]);
    const [simState, setSimState] = useState('');
    const [simPolicy, setSimPolicy] = useState('Broadband');
    const [simulation, setSimulation] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/policy');
                setRecs(res.data);
                if (res.data.length > 0) setSimState(res.data[0].state);
            } catch (e) { console.error(e); }
        };
        fetchData();
    }, []);

    const runSimulation = async () => {
        if (!simState) return;
        setLoading(true);
        try {
            const res = await axios.post('/api/policy-simulate', {
                state: simState,
                policy_type: simPolicy
            });
            setSimulation(res.data);
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1. Automated Recommendations */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <ClipboardList className="w-6 h-6 text-accent" />
                    <h2 className="text-lg font-bold text-white uppercase tracking-wider">
                        {language === 'en' ? 'Active Policy Interventions' : 'नीति हस्तक्षेप'}
                    </h2>
                </div>

                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {recommendations.map((rec, i) => (
                        <div key={i} className="bg-panel border border-gray-800 p-5 rounded-lg border-l-4 border-l-red-500 flex items-start gap-4 hover:bg-gray-800/50 transition-colors">
                            <div className="mt-1">
                                <CheckSquare className="w-5 h-5 text-gray-500" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-bold text-white uppercase">{rec.state}</span>
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                                        PRIORITY {Math.round(rec.intervention_priority_score)}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-300 font-mono">
                                    exec: {rec.recommended_action}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. AI Impact Simulator (New) */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <Zap className="w-6 h-6 text-yellow-400" />
                    <h2 className="text-lg font-bold text-white uppercase tracking-wider">
                        Impact Simulator (AI Forecast)
                    </h2>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <div className="mb-4">
                        <label className="text-xs text-gray-500 uppercase block mb-2">Target Jurisdiction</label>
                        <select
                            className="w-full bg-black border border-gray-700 text-white p-2 rounded focus:border-accent outline-none"
                            value={simState}
                            onChange={(e) => setSimState(e.target.value)}
                        >
                            {/* Deduped states from recs or hardcoded list if empty */}
                            {[...new Set(recommendations.map(r => r.state))].map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                            {!simState && <option>Loading states...</option>}
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="text-xs text-gray-500 uppercase block mb-2">Policy Intervention</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['Broadband', 'Skilling', 'Hubs'].map(p => (
                                <button
                                    key={p}
                                    onClick={() => setSimPolicy(p)}
                                    className={`p-2 text-sm rounded border ${simPolicy === p ? 'bg-accent/20 border-accent text-accent' : 'bg-gray-800 border-gray-700 text-gray-400'}`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={runSimulation}
                        disabled={loading || !simState}
                        className="w-full bg-accent hover:bg-accent/80 text-black font-bold py-3 rounded flex items-center justify-center gap-2 transition-all"
                    >
                        {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Play className="w-4 h-4" />}
                        RUN SIMULATION
                    </button>

                    {/* Simulation Results */}
                    {simulation && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 border-t border-gray-800 pt-6"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white font-bold">Projected Risk Reduction</h3>
                                <div className="text-green-400 text-xl font-mono">-{simulation.reduction} pts</div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>Current Risk Score</span>
                                    <span className="text-red-400">{simulation.original_risk} (Critical)</span>
                                </div>
                                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-red-500"
                                        style={{ width: `${simulation.original_risk}%` }}
                                    ></div>
                                </div>

                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>Projected Score (Post-Policy)</span>
                                    <span className="text-green-400">{simulation.simulated_risk} (Moderate)</span>
                                </div>
                                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-500 transition-all duration-1000"
                                        style={{ width: `${simulation.simulated_risk}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                                <div className="bg-gray-800/50 p-2 rounded">
                                    <div className="text-[10px] text-gray-500">Digital Gap</div>
                                    <div className="text-green-400 text-xs">-{simulation.factors_impact.digital_divide}</div>
                                </div>
                                <div className="bg-gray-800/50 p-2 rounded">
                                    <div className="text-[10px] text-gray-500">Skill Deficit</div>
                                    <div className="text-green-400 text-xs">-{simulation.factors_impact.skill_deficit}</div>
                                </div>
                                <div className="bg-gray-800/50 p-2 rounded">
                                    <div className="text-[10px] text-gray-500">Migration</div>
                                    <div className="text-green-400 text-xs">-{simulation.factors_impact.migration}</div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PolicyPanel;
