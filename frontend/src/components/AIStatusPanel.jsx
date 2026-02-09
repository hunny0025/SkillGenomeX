import React, { useEffect, useState } from 'react';
import { Cpu, Activity, Database, ShieldCheck, TrendingUp } from 'lucide-react';

const AIStatusPanel = () => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await fetch('/api/ai-status');
                const data = await res.json();
                setStatus(data);
            } catch (err) {
                console.error("AI Status Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
        const interval = setInterval(fetchStatus, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, []);

    if (loading || !status) return <div className="p-4 bg-gray-900 rounded-xl animate-pulse h-32"></div>;

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6 relative overflow-hidden">
            {/* Background Pulse Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${status.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        <Cpu size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">National AI Engine</h3>
                        <p className="text-sm text-gray-400 flex items-center space-x-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span>System Active & Learning</span>
                        </p>
                    </div>
                </div>

                <div className="text-right">
                    <div className="text-sm text-gray-400">Model Accuracy</div>
                    <div className="text-2xl font-bold text-green-400">{status.training_accuracy}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {/* Active Models */}
                <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
                    <div className="flex items-center space-x-2 mb-2 text-gray-300 text-sm">
                        <Activity size={16} />
                        <span>Active Models</span>
                    </div>
                    <div className="space-y-1">
                        {status.models.map((model, idx) => (
                            <div key={idx} className="text-xs bg-gray-700/50 text-blue-300 px-2 py-1 rounded inline-block mr-1 mb-1 border border-blue-500/20">
                                {model}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Data Foundation */}
                <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
                    <div className="flex items-center space-x-2 mb-2 text-gray-300 text-sm">
                        <Database size={16} />
                        <span>Knowledge Base</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <div>
                            <div className="text-xl font-bold text-white">{status.dataset_size.toLocaleString()}</div>
                            <div className="text-xs text-gray-400">Live Profiles</div>
                        </div>
                        <div className="text-xs text-gray-500">
                            Updated: {status.last_trained}
                        </div>
                    </div>
                </div>

                {/* Security / Anomaly */}
                <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-300"></div>
                    <div className="flex items-center space-x-2 mb-2 text-gray-300 text-sm">
                        <ShieldCheck size={16} />
                        <span>Anomaly Defense</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Isolation Forest</span>
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded border border-green-500/30">Active</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Filtering synthetic noise</div>
                </div>
            </div>
        </div>
    );
};

export default AIStatusPanel;
