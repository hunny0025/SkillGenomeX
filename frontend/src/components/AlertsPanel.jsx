import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AlertCircle, AlertTriangle, CheckCircle, Info, Zap } from 'lucide-react';

const AlertsPanel = ({ prediction, language }) => {
    const [systemAlerts, setSystemAlerts] = useState([]);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const res = await axios.get('/api/alerts');
                setSystemAlerts(res.data);
            } catch (e) { console.error(e); }
        };
        fetchAlerts();
        // Poll every 30s
        const interval = setInterval(fetchAlerts, 30000);
        return () => clearInterval(interval);
    }, []);

    const alerts = [];

    // 1. Prediction Alerts (Individual Level)
    if (prediction && prediction.core) {
        if (prediction?.core?.anomaly) {
            alerts.push({
                type: 'Critical',
                title: language === 'en' ? 'Security Alert' : 'सुरक्षा चेतावनी',
                msg: language === 'en' ? 'Adversarial pattern detected. Confidence reduced.' : 'शत्रुतापूर्ण पैटर्न का पता चला।',
                time: 'Now'
            });
        }
        if (prediction?.opportunity?.hidden_talent_flag) {
            alerts.push({
                type: 'Opportunity',
                title: language === 'en' ? 'Hidden Talent Found' : 'छिपी हुई प्रतिभा',
                msg: `Score boosted by +15. High capability in ${prediction?.opportunity?.migration_risk === 'Critical' ? 'high risk' : 'low access'} zone.`,
                time: 'Just now'
            });
        }
        if (prediction?.trust?.reliability_score < 50) {
            alerts.push({
                type: 'Warning',
                title: 'Low Reliability',
                msg: 'Signal consistency check failed.',
                time: 'Now'
            });
        }
    }

    // 2. System Alerts (National Level)
    systemAlerts.forEach(a => {
        alerts.push({
            type: a.type,
            title: a.title,
            msg: a.message,
            time: 'Active'
        });
    });

    const getIcon = (type) => {
        switch (type) {
            case 'Critical': return <AlertCircle className="w-4 h-4 text-red-500" />;
            case 'Warning': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
            case 'Opportunity': return <Zap className="w-4 h-4 text-yellow-400" />;
            case 'Info': return <Info className="w-4 h-4 text-blue-500" />;
            default: return <CheckCircle className="w-4 h-4 text-emerald-500" />;
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold uppercase text-muted tracking-wider">
                    {language === 'en' ? 'Early Warning System' : 'प्रारंभिक चेतावनी प्रणाली'}
                </h2>
                <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded border border-red-500/20 animate-pulse">LIVE</span>
            </div>

            <div className="space-y-3 h-[calc(100vh-180px)] overflow-y-auto pr-2 custom-scrollbar">
                {alerts.length === 0 && <div className="text-xs text-gray-500">No active alerts. System nominal.</div>}
                {alerts.map((alert, idx) => (
                    <div key={idx} className={`p-4 rounded border backdrop-blur-sm relative overflow-hidden group transition-all hover:scale-[1.02] cursor-pointer
                ${alert.type === 'Critical' ? 'bg-red-500/5 border-red-500/30' :
                            alert.type === 'Warning' ? 'bg-orange-500/5 border-orange-500/30' :
                                alert.type === 'Opportunity' ? 'bg-yellow-500/5 border-yellow-500/30' :
                                    'bg-blue-500/5 border-blue-500/30'
                        }`}>

                        <div className="flex items-start gap-3 relative z-10">
                            <div className="mt-0.5">{getIcon(alert.type)}</div>
                            <div>
                                <div className="flex items-center justify-between w-full mb-1">
                                    <h4 className="text-sm font-semibold text-gray-200">{alert.title}</h4>
                                    <span className="text-[10px] text-gray-500 font-mono">{alert.time}</span>
                                </div>
                                <p className="text-xs text-gray-400 leading-relaxed">{alert.msg}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlertsPanel;
