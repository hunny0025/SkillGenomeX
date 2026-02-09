import React from 'react';
import {
    LayoutDashboard, Map, BarChart3, AlertTriangle,
    TrendingUp, FileText, Activity, Zap
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, language, setLanguage }) => {
    const menuItems = [
        { id: 'dashboard', label: { en: 'Command Center', hi: 'कमांड सेंटर' }, icon: LayoutDashboard },
        { id: 'regional', label: { en: 'Regional Intel', hi: 'क्षेत्रीय खुफिया' }, icon: Map },
        { id: 'market', label: { en: 'Market Pulse', hi: 'बाजार के रुझान' }, icon: Activity },
        { id: 'forecast', label: { en: 'Future Forecast', hi: 'भविष्य का पूर्वानुमान' }, icon: TrendingUp },
        { id: 'risk', label: { en: 'Risk Analysis', hi: 'जोखिम विश्लेषण' }, icon: AlertTriangle },
        { id: 'policy', label: { en: 'Policy Action', hi: 'नीति कार्रवाई' }, icon: FileText },
        { id: 'simulation', label: { en: 'What-If Sim', hi: 'सिमुलेशन' }, icon: Zap },
    ];

    return (
        <div className="h-full bg-panel border-r border-gray-800 flex flex-col w-[240px]">
            <div className="p-6 border-b border-gray-800 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-accent to-purple-800 flex items-center justify-center shadow-lg shadow-accent/20">
                    <Activity className="text-white w-5 h-5" />
                </div>
                <div>
                    <h1 className="font-bold text-white tracking-wider text-sm">SKILLGENOME X</h1>
                    <div className="text-[10px] text-gray-500 tracking-widest uppercase">National Intelligence</div>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all 
                ${isActive
                                    ? 'bg-accent/10 text-accent border border-accent/20 shadow-[0_0_15px_rgba(108,92,231,0.1)]'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`}
                        >
                            <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-accent' : 'text-gray-500'}`} />
                            {language === 'en' ? item.label.en : item.label.hi}
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                    className="w-full py-2 px-4 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded text-xs text-gray-400 flex items-center justify-center transition-colors"
                >
                    {language === 'en' ? 'Switch to Hindi (हिंदी)' : 'Switch to English'}
                </button>
                <div className="mt-4 flex items-center justify-between text-[10px] text-gray-600">
                    <span>v2.0.4-GOV</span>
                    <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        ONLINE
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
