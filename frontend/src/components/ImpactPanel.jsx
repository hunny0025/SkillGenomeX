import { Cpu, Users, Check, ShieldCheck, IndianRupee, TrendingUp } from 'lucide-react';

const ImpactPanel = () => {
    return (
        <div className="space-y-6">
            {/* Economic Impact */}
            <div className="bg-gradient-to-br from-green-900/40 to-black border border-green-500/30 rounded-lg p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-20"><IndianRupee size={48} /></div>
                <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <h3 className="text-xs font-bold text-green-300 tracking-wider">ECONOMIC UNLOCK</h3>
                </div>
                <div className="text-2xl font-bold text-white mb-1">₹ 285.4 Cr</div>
                <div className="text-[10px] text-green-400/80 mb-3">Projected Annual GDP Contribution from Hidden Talent</div>

                <div className="w-full bg-gray-800 h-1.5 rounded-full mb-1">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '72%' }}></div>
                </div>
                <div className="text-[10px] text-right text-gray-500">72% Realization Probability</div>
            </div>

            {/* System Users */}
            <div className="bg-panel border border-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3 border-b border-gray-800 pb-2">
                    <Users className="w-4 h-4 text-accent" />
                    <h3 className="text-sm font-bold text-gray-300">SYSTEM USERS</h3>
                </div>
                <ul className="text-xs text-gray-400 space-y-2">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> State Skill Dev Missions</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> District Employment Offices</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div> National Policy Planners</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> Rural NGO Programs</li>
                </ul>
            </div>

            {/* AI Status */}
            <div className="bg-panel border border-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3 border-b border-gray-800 pb-2">
                    <Cpu className="w-4 h-4 text-purple-400" />
                    <h3 className="text-sm font-bold text-gray-300">ACTIVE INTELLIGENCE</h3>
                </div>
                <ul className="text-xs space-y-2">
                    {[
                        "Gradient Boosting Regressor (v4.1)",
                        "Isolation Forest (Anomaly Detection)",
                        "Time-Series Trend Engine",
                        "Policy Impact Simulator",
                        "Hidden Talent Detector",
                        "Migration Risk Predictor"
                    ].map((model, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-300">
                            <ShieldCheck className="w-3 h-3 text-accent" /> {model}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ImpactPanel;
