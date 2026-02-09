import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AlertTriangle, WifiOff, BookOpen } from 'lucide-react';

const RiskAnalysisPanel = ({ language }) => {
    const [risks, setRisks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // Safe fetch
            try {
                const res = await axios.get('/api/risk-analysis');
                setRisks(Array.isArray(res.data) ? res.data : []);
            } catch (e) {
                console.error("Risk API error:", e);
                setRisks([]);
            }
        };
        fetchData();
    }, []);

    if (!risks || risks.length === 0) return <div className="p-6 text-gray-500">Scanning Risk Zones... (No Data)</div>;

    const criticalCount = risks.filter(r => r?.level === 'Critical').length || 0;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white uppercase tracking-wider">
                    {language === 'en' ? 'Structural Risk Analysis' : 'संरचनात्मक जोखिम विश्लेषण'}
                </h2>
                <div className="px-3 py-1 bg-red-900/20 border border-red-500/30 text-red-400 rounded text-xs animate-pulse">
                    {criticalCount} Critical Zones Detected
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {risks.slice(0, 10).map((r, i) => {
                    if (!r) return null;
                    const digitalRisk = r?.digital_divide_risk ?? 0;
                    const skillRisk = r?.skill_imbalance_risk ?? 0;
                    const score = r?.risk_score ?? 0;
                    const level = r?.level || 'Unknown';
                    const stateName = r?.state || 'Unknown Region';

                    return (
                        <div key={i} className="bg-panel border border-gray-800 p-4 rounded hover:bg-white/5 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="text-lg font-bold text-white">{stateName}</div>
                                    <div className={`text-xs uppercase tracking-widest mt-1 ${level === 'Critical' ? 'text-red-500' :
                                        level === 'High' ? 'text-orange-500' : 'text-yellow-500'
                                        }`}>
                                        {level} Risk • Score: {score}
                                    </div>
                                </div>
                                <AlertTriangle className={`w-6 h-6 ${level === 'Critical' ? 'text-red-500' : 'text-orange-500'
                                    }`} />
                            </div>

                            {/* Factors Bar */}
                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                                        <span className="flex items-center gap-2"><WifiOff className="w-3 h-3" /> Digital Divide</span>
                                        <span>{digitalRisk}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500/60" style={{ width: `${digitalRisk}%` }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                                        <span className="flex items-center gap-2"><BookOpen className="w-3 h-3" /> Skill Deficit</span>
                                        <span>{skillRisk}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-purple-500/60" style={{ width: `${skillRisk}%` }}></div>
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

export default RiskAnalysisPanel;
