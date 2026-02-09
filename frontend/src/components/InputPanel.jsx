import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sliders, MapPin, Activity } from 'lucide-react';

const InputPanel = ({ signals, context, setSignals, setContext, language }) => {
    const [openSection, setOpenSection] = useState('context');

    const handleChange = (e, field, type = 'signals') => {
        const val = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
        if (type === 'signals') setSignals(prev => ({ ...prev, [field]: val }));
        else setContext(prev => ({ ...prev, [field]: val }));
    };

    const runDemoScenario = () => {
        // Auto-fill Rural Hidden Talent (Farmer in Bihar)
        setContext({
            state: 'Bihar', area_type: 'Rural', opportunity_level: 'Low',
            infrastructure_access: 'Minimal', digital_access: 'Limited', domain: 'Agriculture'
        });
        setSignals({
            creation_output: 60, learning_behavior: 70, experience_consistency: 85,
            economic_activity: 40, innovation_problem_solving: 75, collaboration_community: 80,
            offline_capability: 90, digital_presence: 10,
            // Domain Specifics
            land_size_acres: 5, crop_diversity: 4, annual_yield_score: 92,
            agri_training_programs: 3, equipment_level: 2
        });
    };

    const sections = [
        {
            id: 'context',
            title: language === 'en' ? 'User Context & Environment' : 'उपयोगकर्ता संदर्भ',
            icon: MapPin,
            content: (
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 border-b border-gray-800 pb-4 mb-2">
                        <label className="text-xs text-accent block mb-1 font-bold uppercase tracking-wider">Primary Domain</label>
                        <select
                            value={context.domain || 'Technology'}
                            onChange={(e) => handleChange(e, 'domain', 'context')}
                            className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-sm text-white focus:border-accent outline-none font-medium"
                        >
                            <option>Technology</option>
                            <option>Data & Research</option>
                            <option>Skilled Trades</option>
                            <option>Agriculture</option>
                            <option>Creative</option>
                            <option>Business</option>
                            <option>Social Impact</option>
                            <option>Healthcare</option>
                            <option>Education</option>
                            <option>Craft & Artisan</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-xs text-gray-500 block mb-1">State / Province</label>
                        <select
                            value={context.state}
                            onChange={(e) => handleChange(e, 'state', 'context')}
                            className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-sm text-white focus:border-accent outline-none"
                        >
                            <option>Maharashtra</option><option>Karnataka</option><option>Delhi</option>
                            <option>Uttar Pradesh</option><option>Bihar</option><option>Tamil Nadu</option>
                            <option>West Bengal</option><option>Telangana</option><option>Odisha</option>
                            <option>Rajasthan</option><option>Kerala</option><option>Punjab</option>
                            <option>Haryana</option><option>Assam</option><option>Jharkhand</option>
                            <option>Chhattisgarh</option><option>Uttarakhand</option><option>Andhra Pradesh</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 block mb-1">Area Type</label>
                        <select
                            value={context.area_type}
                            onChange={(e) => handleChange(e, 'area_type', 'context')}
                            className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-sm text-white focus:border-accent outline-none"
                        >
                            <option>Urban</option><option>Semi-Urban</option><option>Rural</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 block mb-1">Infrastructure Access</label>
                        <select
                            value={context.infrastructure_access}
                            onChange={(e) => handleChange(e, 'infrastructure_access', 'context')}
                            className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-sm text-white focus:border-accent outline-none"
                        >
                            <option>High</option><option>Limited</option><option>Minimal</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 block mb-1">Digital Access</label>
                        <select
                            value={context.digital_access}
                            onChange={(e) => handleChange(e, 'digital_access', 'context')}
                            className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-sm text-white focus:border-accent outline-none"
                        >
                            <option>Regular</option><option>Limited</option><option>Occasional</option>
                        </select>
                    </div>
                </div>
            )
        },
        {
            id: 'dimensions',
            title: language === 'en' ? 'Behavioral Dimensions (0-100)' : 'व्यवहार आयाम',
            icon: Activity,
            content: (
                <div className="space-y-4">
                    {['creation_output', 'learning_behavior', 'experience_consistency', 'innovation_problem_solving',
                        'collaboration_community', 'offline_capability', 'digital_presence', 'economic_activity'].map(dim => (
                            <div key={dim}>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="text-xs text-gray-400 capitalize">{dim.replace(/_/g, ' ')}</label>
                                    <span className="text-xs font-mono text-accent">{signals[dim]}</span>
                                </div>
                                <input
                                    type="range" min="0" max="100"
                                    value={signals[dim]}
                                    onChange={(e) => handleChange(e, dim)}
                                    className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-accent"
                                />
                            </div>
                        ))}
                </div>
            )
        },
        {
            id: 'signals',
            title: language === 'en' ? 'Domain Signals' : 'डोमेन संकेत',
            icon: Sliders,
            content: (
                <div className="space-y-4">
                    {/* Dynamic Fields based on Domain */}
                    {(() => {
                        const domain = context.domain || 'Technology';

                        let fields = [];

                        if (domain === 'Technology' || domain === 'Data & Research') {
                            fields = [
                                { key: 'projects', label: 'Projects Completed', max: 50 },
                                { key: 'github_repos', label: 'GitHub Repositories', max: 100 },
                                { key: 'hackathons', label: 'Hackathons', max: 20 },
                                { key: 'learning_hours', label: 'Learning Hours/Week', max: 100 },
                                { key: 'certifications', label: 'Certifications', max: 10 }
                            ];
                        } else if (domain === 'Agriculture') {
                            fields = [
                                { key: 'land_size_acres', label: 'Land Size (Acres)', max: 50 },
                                { key: 'crop_diversity', label: 'Crop Diversity (Count)', max: 10 },
                                { key: 'annual_yield_score', label: 'Annual Yield Score (0-100)', max: 100 },
                                { key: 'agri_training_programs', label: 'Training Programs', max: 10 },
                                { key: 'equipment_level', label: 'Equipment Level (1=Low, 2=Med, 3=High)', max: 3 }
                            ];
                        } else if (domain === 'Skilled Trades') {
                            fields = [
                                { key: 'years_experience', label: 'Years Experience', max: 40 },
                                { key: 'clients_served', label: 'Clients Served', max: 500 },
                                { key: 'certifications', label: 'Trade Certifications', max: 10 },
                                { key: 'tools_quality', label: 'Tools Quality (1=Basic, 3=Pro)', max: 3 },
                                { key: 'monthly_income_range', label: 'Income Tier (1-10)', max: 10 }
                            ];
                        } else if (domain === 'Creative' || domain === 'Craft & Artisan') {
                            fields = [
                                { key: 'portfolio_items', label: 'Portfolio Items', max: 50 },
                                { key: 'exhibitions_or_sales', label: 'Exhibitions / Sales', max: 50 },
                                { key: 'client_projects', label: 'Client Projects', max: 100 },
                                { key: 'social_followers', label: 'Social Followers (k)', max: 100 },
                                { key: 'skill_specialization_score', label: 'Specialization Score', max: 100 }
                            ];
                            fields = [
                                { key: 'business_years', label: 'Years in Business', max: 50 },
                                { key: 'monthly_revenue_score', label: 'Revenue Score (0-100)', max: 100 },
                                { key: 'employees_count', label: 'Employees / Team Size', max: 50 },
                                { key: 'digital_presence_score', label: 'Digital Presence Score', max: 100 },
                                { key: 'customers_served', label: 'Customers Served (Active)', max: 1000 }
                            ];
                        } else if (domain === 'Healthcare') {
                            fields = [
                                { key: 'clinical_hours', label: 'Clinical Hours', max: 2000 },
                                { key: 'patient_satisfaction', label: 'Patient Reviews (0-100)', max: 100 },
                                { key: 'certifications', label: 'Medical Certs', max: 10 },
                                { key: 'emergency_response', label: 'Emergency Response Score', max: 100 },
                                { key: 'community_health_programs', label: 'Community Programs', max: 20 }
                            ];
                        } else if (domain === 'Education') {
                            fields = [
                                { key: 'teaching_years', label: 'Years Teaching', max: 40 },
                                { key: 'students_impacted', label: 'Students Impacted', max: 5000 },
                                { key: 'curriculum_development', label: 'Curriculum Dev Score', max: 100 },
                                { key: 'digital_teaching_tools', label: 'Digital Tools Usage', max: 100 },
                                { key: 'research_publications', label: 'Publications', max: 20 }
                            ];
                        } else {
                            // Default / Social Impact / Others
                            fields = [
                                { key: 'people_impacted', label: 'People Impacted', max: 1000 },
                                { key: 'programs_conducted', label: 'Programs Conducted', max: 50 },
                                { key: 'training_hours', label: 'Training Hours', max: 200 },
                                { key: 'community_engagement_score', label: 'Community Score', max: 100 },
                                { key: 'field_experience_years', label: 'Field Experience (Years)', max: 30 }
                            ];
                        }

                        return (
                            <div className="grid grid-cols-2 gap-4">
                                {fields.map(f => (
                                    <div key={f.key}>
                                        <label className="text-xs text-gray-400 block mb-1">{f.label}</label>
                                        <input
                                            type="number"
                                            value={signals[f.key] || 0}
                                            onChange={(e) => handleChange(e, f.key)}
                                            className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-sm text-white focus:border-accent outline-none font-mono"
                                            placeholder="0"
                                            min="0"
                                            max={f.max}
                                        />
                                    </div>
                                ))}
                            </div>
                        );
                    })()}
                </div>
            )
        }
    ];

    return (
        <div className="bg-panel border border-gray-800 rounded-lg overflow-hidden h-fit sticky top-6">
            <div className="p-3 bg-gray-900 border-b border-gray-800 flex justify-between items-center">
                <span className="font-bold text-sm text-gray-300">SIGNAL INPUT CONSOLE</span>
                <button
                    onClick={runDemoScenario}
                    className="text-[10px] bg-accent/20 hover:bg-accent/40 text-accent px-2 py-1 rounded border border-accent/30 transition-colors"
                >
                    DEMO: RURAL TALENT
                </button>
            </div>
            <div>
                {sections.map((section) => {
                    const Icon = section.icon;
                    const isOpen = openSection === section.id;
                    return (
                        <div key={section.id} className="border-b border-gray-800 last:border-0">
                            <button
                                onClick={() => setOpenSection(isOpen ? null : section.id)}
                                className={`w-full flex items-center justify-between p-3 text-sm font-medium transition-colors ${isOpen ? 'bg-gray-800/50 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                <div className="flex items-center gap-2">
                                    <Icon className="w-4 h-4" />
                                    {section.title}
                                </div>
                                {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                            </button>
                            {isOpen && (
                                <div className="p-4 bg-gray-900/30 animate-in slide-in-from-top-2 duration-200">
                                    {section.content}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default InputPanel;
