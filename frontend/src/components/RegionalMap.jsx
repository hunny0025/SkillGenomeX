import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import axios from 'axios';

// Local GeoJSON for India Map (No external CDN)
const geoUrl = "/maps/india_states.geojson";

const RegionalMap = ({ language }) => {
    const [data, setData] = useState([]);
    const [tooltipContent, setTooltipContent] = useState('');
    const [mapError, setMapError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/regional-analysis');
                setData(res.data);
            } catch (error) {
                console.error("Error fetching regional data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const colorScale = scaleQuantile()
        .domain(data.map(d => d.innovation_intensity))
        .range([
            "#2D3748",
            "#4C51BF",
            "#6C5CE7",
            "#A29BFE",
            "#E0E7FF"
        ]);

    return (
        <div className="bg-panel border border-gray-800 rounded-lg p-6 flex flex-col items-center relative gap-4">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-2 self-start w-full flex justify-between items-center">
                {language === 'en' ? 'Regional Talent Intelligence' : 'क्षेत्रीय प्रतिभा खुफिया'}
                <span className="text-[10px] bg-gray-900 text-gray-400 px-2 py-1 rounded border border-gray-700">LIVE HEATMAP</span>
            </h2>

            <div className="w-full h-[500px] relative bg-gray-900/50 rounded flex items-center justify-center overflow-hidden border border-gray-800/50">
                {loading && !mapError && <div className="text-gray-400 animate-pulse text-sm">Loading India Map...</div>}

                {!loading && !mapError && (
                    <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{ scale: 1000, center: [82, 22] }}
                        width={800}
                        height={600}
                        style={{ width: "100%", height: "100%" }}
                    >
                        <Geographies geography={geoUrl} onError={() => setMapError(true)}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    // Match state name from standard GeoJSON properties
                                    // Supporting ST_NM (standard), NAME_1 (common), st_nm (alt)
                                    const stateName = geo.properties.ST_NM || geo.properties.st_nm || geo.properties.NAME_1;
                                    const cur = data.find((s) => s.state === stateName);

                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={cur ? colorScale(cur.innovation_intensity) : '#1f2937'}
                                            stroke="#0B0F1A"
                                            strokeWidth={0.5}
                                            style={{
                                                default: { outline: "none" },
                                                hover: { fill: "#6C5CE7", outline: "none", cursor: 'pointer', transition: 'all 0.2s ease' },
                                                pressed: { outline: "none" },
                                            }}
                                            onMouseEnter={() => {
                                                if (cur) {
                                                    setTooltipContent(`
                          <div class="text-left w-48">
                            <strong class="text-accent text-sm block mb-1 border-b border-gray-700 pb-1">${cur.state}</strong>
                            <div class="grid grid-cols-2 gap-2 text-xs">
                                <span class="text-gray-400">Innovation:</span> <span class="text-white">${cur.innovation_intensity}</span>
                                <span class="text-gray-400">Hidden Talent:</span> <span class="text-yellow-400">${cur.hidden_talent_density}%</span>
                                <span class="text-gray-400">Specialization:</span> <span class="text-blue-300 col-span-2">${cur.specialization}</span>
                                <span class="text-gray-400">Ecosystem:</span> <span class="text-green-400">${cur.ecosystem_balance_score}</span>
                            </div>
                          </div>
                        `);
                                                } else {
                                                    setTooltipContent(`${stateName || 'Unknown Region'}: No Data`);
                                                }
                                            }}
                                            onMouseLeave={() => {
                                                setTooltipContent('');
                                            }}
                                            data-tooltip-id="region-tooltip"
                                        />
                                    );
                                })
                            }
                        </Geographies>
                    </ComposableMap>
                )}

                {mapError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500 text-xs bg-black/80 gap-2">
                        <span>Failed to load Map Data</span>
                        <span className="text-gray-500 text-[10px]">Source: {geoUrl}</span>
                    </div>
                )}

                <ReactTooltip
                    id="region-tooltip"
                    style={{ backgroundColor: "#111827", zIndex: 50 }}
                    opacity={1}
                    border="1px solid #374151"
                    float={true}
                />
            </div>

            <div className="absolute bottom-4 right-4 bg-gray-900/80 p-3 rounded border border-gray-800 text-xs text-gray-400 pointer-events-none">
                Data: National Skill Census v2.4
            </div>
        </div>
    );
};

export default RegionalMap;
