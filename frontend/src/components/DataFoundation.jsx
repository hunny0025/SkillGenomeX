import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Database, UserCheck, ShieldCheck, Activity, Globe, Clock, Server } from 'lucide-react';

const DataFoundation = () => {
    const [stats, setStats] = useState({
        profiles: 0,
        states: 0,
        rural_ratio: "0%",
        time_history: "Loading...",
        sources: "Initializing..."
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/data-foundation');
                if (res.data.profiles) setStats(res.data);
            } catch (e) {
                console.error("Data Foundation Error", e);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="bg-[#0B0F1A] border-y border-gray-800 p-4 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-400">
                {/* 1. Census Size */}
                <div className="flex items-center gap-3">
                    <Database className="w-5 h-5 text-blue-500" />
                    <div>
                        <strong className="text-white block text-sm">{stats.profiles.toLocaleString()} Profiles</strong>
                        <span>National Synthethic Census</span>
                    </div>
                </div>

                {/* 2. Rural Coverage */}
                <div className="flex items-center gap-3 border-l border-gray-800 pl-4">
                    <Globe className="w-5 h-5 text-green-500" />
                    <div>
                        <strong className="text-white block text-sm">{stats.rural_ratio} Rural Coverage</strong>
                        <span>Pan-India Distribution</span>
                    </div>
                </div>

                {/* 3. Time History */}
                <div className="flex items-center gap-3 border-l border-gray-800 pl-4">
                    <Clock className="w-5 h-5 text-yellow-500" />
                    <div>
                        <strong className="text-white block text-sm">{stats.time_history} History</strong>
                        <span>Time-Series Training Data</span>
                    </div>
                </div>

                {/* 4. Integrity */}
                <div className="flex items-center gap-3 border-l border-gray-800 pl-4">
                    <ShieldCheck className="w-5 h-5 text-purple-500" />
                    <div>
                        <strong className="text-gray-300 block text-sm">Anti-Fraud Active</strong>
                        <span>Isolation Forest Guard</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataFoundation;
