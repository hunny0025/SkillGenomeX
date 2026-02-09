import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RiskPanel = ({ language }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/api/policy').then(res => setData(res.data));
    }, []);

    return (
        <div className="bg-panel border border-gray-800 rounded-xl p-6 h-full">
            <h2 className="text-xl font-bold mb-4 text-white">
                {language === 'en' ? 'Structural Risk Zones' : 'संरचनात्मक जोखिम क्षेत्र'}
            </h2>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {data.map(state => (
                    <div key={state.state} className="bg-background/50 p-4 rounded border border-gray-700">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-white">{state.state}</h3>
                            <span className={`px-2 py-0.5 text-xs rounded uppercase font-bold ${state.risk_level === 'High' ? 'bg-danger text-white' :
                                    state.risk_level === 'Moderate' ? 'bg-warning text-black' :
                                        'bg-success text-white'
                                }`}>{state.risk_level} Risk</span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-xs text-muted">
                            <div>
                                <div className="mb-1">Low Skill</div>
                                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-danger" style={{ width: `${state.factors.low_skill_ratio * 100}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="mb-1">Low Digital</div>
                                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-warning" style={{ width: `${state.factors.low_digital_ratio * 100}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="mb-1">Low Learning</div>
                                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-accent" style={{ width: `${state.factors.low_learning_ratio * 100}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RiskPanel;
