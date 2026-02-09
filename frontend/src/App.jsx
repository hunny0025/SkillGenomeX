import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Sidebar from './components/Sidebar';
import AlertsPanel from './components/AlertsPanel';
import KPIRow from './components/KPIRow';
import GenomeMap from './components/GenomeMap';
import RegionalMap from './components/RegionalMap';
import MarketPanel from './components/MarketPanel';
import RiskAnalysisPanel from './components/RiskAnalysisPanel';
import PolicyPanel from './components/PolicyPanel';
import ForecastPanel from './components/Forecast';
import WhatIf from './components/WhatIf';
import InputPanel from './components/InputPanel';
import DataFoundation from './components/DataFoundation';
import ImpactPanel from './components/ImpactPanel';
import PredictionSummary from './components/PredictionSummary';
import AIStatusPanel from './components/AIStatusPanel';

import { motion, AnimatePresence } from 'framer-motion';

function App() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [language, setLanguage] = useState('en');
    const [loading, setLoading] = useState(false);
    const [prediction, setPrediction] = useState(null);
    const [kpiData, setKpiData] = useState(null);

    // State for Inputs
    const [context, setContext] = useState({ state: 'Maharashtra', area_type: 'Urban', opportunity_level: 'High', infrastructure_access: 'High', digital_access: 'Regular' });
    const [signals, setSignals] = useState({
        creation_output: 50, learning_behavior: 50, experience_consistency: 50,
        economic_activity: 50, innovation_problem_solving: 50, collaboration_community: 50,
        offline_capability: 50, digital_presence: 50,
        learning_hours: 10, projects: 5, github_repos: 2, hackathons: 0
    });

    // Fetch National Stats initially
    useEffect(() => {
        fetchNationalStats();
    }, []);

    // Update Prediction when inputs change (debounced in real app, here direct)
    useEffect(() => {
        // Basic debounce could be added, but for now calling direct
        const timer = setTimeout(() => fetchPrediction(), 500);
        return () => clearTimeout(timer);
    }, [signals, context]);

    const fetchNationalStats = async () => {
        try {
            const res = await axios.get('/api/national-distribution');
            setKpiData(res.data);
        } catch (e) { console.error(e); }
    };

    const fetchPrediction = async () => {
        setLoading(true);
        try {
            const res = await axios.post('/api/predict', { signals, context });


          
            setPrediction(res.data);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    return (
        <div className="dashboard-grid bg-background text-text">
            {/* 1. LEFT SIDEBAR */}
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} language={language} setLanguage={setLanguage} />

            {/* 2. CENTER MAIN DASHBOARD */}
            <main className="flex flex-col h-full overflow-hidden border-r border-gray-800 relative">
                {/* KPI Header */}
                <KPIRow data={kpiData} language={language} />

                <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
                    <AnimatePresence mode="wait">
                        {activeTab === 'dashboard' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                                {/* AI System Status */}
                                <AIStatusPanel />

                                {/* Prediction Summary (Main Output) */}
                                <PredictionSummary data={prediction} />

                                {/* National Data Foundation */}
                                <DataFoundation />

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Input & Context */}
                                    <InputPanel signals={signals} context={context} setSignals={setSignals} setContext={setContext} language={language} />
                                    {/* Radar Analysis */}
                                    <GenomeMap prediction={prediction} language={language} />
                                </div>
                                {/* Growth & Forecast Row */}
                                <div className="grid grid-cols-1 gap-6">
                                    {prediction && (
                                        <div className="bg-panel border border-gray-800 p-4 rounded-lg">
                                            <h3 className="text-sm font-bold uppercase text-muted mb-2">Growth Intelligence</h3>
                                            <div className="grid grid-cols-3 gap-4 text-center">
                                                <div className="p-3 bg-gray-900 rounded">
                                                    <div className="text-xs text-gray-400">Momentum</div>
                                                    <div className="text-xl font-bold text-accent">{prediction.growth.learning_momentum}</div>
                                                </div>
                                                <div className="p-3 bg-gray-900 rounded">
                                                    <div className="text-xs text-gray-400">Potential</div>
                                                    <div className="text-lg font-bold text-white">{prediction.growth.growth_potential}</div>
                                                </div>
                                                <div className="p-3 bg-gray-900 rounded">
                                                    <div className="text-xs text-gray-400">Resilience</div>
                                                    <div className="text-xl font-bold text-green-400">{prediction.growth.resilience_score}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'regional' && <RegionalMap language={language} />}
                        {activeTab === 'market' && <MarketPanel language={language} />}
                        {activeTab === 'risk' && <RiskAnalysisPanel language={language} />}
                        {activeTab === 'forecast' && <ForecastPanel language={language} />}
                        {activeTab === 'policy' && <PolicyPanel language={language} />}
                        {activeTab === 'simulation' && <div className="space-y-6"><WhatIf language={language} /></div>}
                    </AnimatePresence>

                    {/* Footer / Watermark Area */}
                    <div className="mt-12 text-center opacity-20 text-xs">
                        <div>SKILLGENOME X NATIONAL INTELLIGENCE SYSTEM</div>
                        <div>SECURE CONNECTION ESTABLISHED</div>
                    </div>
                </div>
            </main>

            {/* 3. RIGHT ALERTS PANEL */}
            <aside className="h-full bg-panel/30 backdrop-blur border-l border-gray-800 p-4 overflow-y-auto w-80 shrink-0">
                <ImpactPanel />
                <div className="my-6 border-b border-gray-800"></div>
                <AlertsPanel prediction={prediction} language={language} />
            </aside>
        </div>
    );
}

export default App;




