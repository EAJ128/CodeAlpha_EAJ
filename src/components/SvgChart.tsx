import React, { useState } from 'react';

interface SvgChartProps {
  type: 'line' | 'bar';
  data: { label: string; value: number }[];
  color?: 'cyan' | 'purple';
}

export const SvgChart: React.FC<SvgChartProps> = ({ type, data, color = 'cyan' }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-slate-500 font-mono text-xs">
        No active analytics stream available.
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.value), 20); // enforce minimum range height
  const gradientId = `chart-gradient-${type}-${color}`;
  const neonGlowColor = color === 'cyan' ? '#06b6d4' : '#d946ef';

  // Height and Width dimensions
  const height = 180;
  const width = 450;
  const paddingLeft = 45;
  const paddingRight = 15;
  const paddingTop = 20;
  const paddingBottom = 25;

  const chartHeight = height - paddingTop - paddingBottom;
  const chartWidth = width - paddingLeft - paddingRight;

  if (type === 'line') {
    // Generate SVG coordinates for line paths
    const points = data.map((d, index) => {
      const x = paddingLeft + (index / (data.length - 1)) * chartWidth;
      const y = paddingTop + chartHeight - (d.value / maxValue) * chartHeight;
      return { x, y, label: d.label, value: d.value };
    });

    // Create Path Strings
    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    
    // Create Filled Area Path details
    const areaPath = points.length > 0
      ? `${linePath} L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`
      : '';

    return (
      <div className="relative w-full">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible select-none">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={neonGlowColor} stopOpacity="0.4" />
              <stop offset="100%" stopColor={neonGlowColor} stopOpacity="0" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor={neonGlowColor} floodOpacity="0.6" />
            </filter>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = paddingTop + chartHeight * ratio;
            return (
              <line
                key={idx}
                x1={paddingLeft}
                y1={y}
                x2={width - paddingRight}
                y2={y}
                className="stroke-slate-800"
                strokeWidth={1}
                strokeDasharray="4,4"
              />
            );
          })}

          {/* X & Y Axis */}
          <line
            x1={paddingLeft}
            y1={paddingTop + chartHeight}
            x2={width - paddingRight}
            y2={paddingTop + chartHeight}
            className="stroke-slate-700"
            strokeWidth={1}
          />
          <line
            x1={paddingLeft}
            y1={paddingTop}
            x2={paddingLeft}
            y2={paddingTop + chartHeight}
            className="stroke-slate-700"
            strokeWidth={1}
          />

          {/* Left Y Axis Labels */}
          {[0, 0.5, 1].map((ratio, idx) => {
            const val = Math.round(maxValue * (1 - ratio));
            const y = paddingTop + chartHeight * ratio + 4;
            return (
              <text key={idx} x={paddingLeft - 8} y={y} className="fill-slate-500 font-mono text-[9px] text-right" textAnchor="end">
                ${val}
              </text>
            );
          })}

          {/* Area under the curve */}
          {areaPath && (
            <path d={areaPath} fill={`url(#${gradientId})`} />
          )}

          {/* Glowing Line */}
          {linePath && (
            <path
              d={linePath}
              className="fill-none"
              stroke={neonGlowColor}
              strokeWidth={2}
              style={{ filter: 'url(#glow)' }}
            />
          )}

          {/* Interactive Nodes */}
          {points.map((p, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <g key={idx} onMouseEnter={() => setHoveredIndex(idx)} onMouseLeave={() => setHoveredIndex(null)}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 6 : 3.5}
                  className="cursor-pointer transition-all duration-150"
                  fill="#020617"
                  stroke={neonGlowColor}
                  strokeWidth={2.5}
                />
                
                {/* Horizontal label rendering */}
                {idx % (data.length > 5 ? 2 : 1) === 0 && (
                  <text
                    x={p.x}
                    y={height - 6}
                    className="fill-slate-400 font-mono text-[9px]"
                    textAnchor="middle"
                  >
                    {p.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredIndex !== null && points[hoveredIndex] && (
          <div
            className="absolute z-10 p-2 text-[10px] font-mono tracking-wider font-bold bg-slate-950/90 border rounded border-slate-700 text-slate-200 pointer-events-none shadow-indigo-500/20 shadow-md backdrop-blur-sm"
            style={{
              left: `${(points[hoveredIndex].x / width) * 100}%`,
              top: `${(points[hoveredIndex].y / height) * 100 - 35}%`,
              transform: 'translateX(-50%)'
            }}
          >
            {points[hoveredIndex].label}: <span className="text-cyan-400">${points[hoveredIndex].value.toFixed(2)}</span>
          </div>
        )}
      </div>
    );
  } else {
    // Generate bar coordinates
    const barSpacing = chartWidth / data.length;
    const barWidth = Math.max(barSpacing * 0.55, 10);

    return (
      <div className="relative w-full">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible select-none">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={neonGlowColor} stopOpacity="0.8" />
              <stop offset="100%" stopColor={neonGlowColor} stopOpacity="0.2" />
            </linearGradient>
            <filter id="barglow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="1" stdDeviation="3" floodColor={neonGlowColor} floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = paddingTop + chartHeight * ratio;
            return (
              <line
                key={idx}
                x1={paddingLeft}
                y1={y}
                x2={width - paddingRight}
                y2={y}
                className="stroke-slate-800"
                strokeWidth={1}
                strokeDasharray="4,4"
              />
            );
          })}

          {/* Left Y Axis Labels */}
          {[0, 0.5, 1].map((ratio, idx) => {
            const val = Math.round(maxValue * (1 - ratio));
            const y = paddingTop + chartHeight * ratio + 4;
            return (
              <text key={idx} x={paddingLeft - 8} y={y} className="fill-slate-500 font-mono text-[9px] text-right" textAnchor="end">
                ${val}
              </text>
            );
          })}

          {/* Dynamic Bars */}
          {data.map((d, idx) => {
            const isHovered = hoveredIndex === idx;
            const barHeight = (d.value / maxValue) * chartHeight;
            const x = paddingLeft + idx * barSpacing + (barSpacing - barWidth) / 2;
            const y = paddingTop + chartHeight - barHeight;

            return (
              <g
                key={idx}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Visual Glass Bar with Neon Glow */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={Math.max(barHeight, 2)}
                  rx={2}
                  fill={`url(#${gradientId})`}
                  className="stroke-[#06b6d4]/50 hover:stroke-[#d946ef] transition-all"
                  strokeWidth={0.5}
                  style={isHovered ? { filter: 'url(#barglow)', strokeWidth: 1 } : {}}
                />

                {/* Condensed categories names */}
                <text
                  x={x + barWidth / 2}
                  y={height - 6}
                  className="fill-slate-400 font-mono text-[9px]"
                  textAnchor="middle"
                >
                  {d.label.length > 8 ? `${d.label.substring(0, 7)}.` : d.label}
                </text>
              </g>
            );
          })}

          {/* Zero Line */}
          <line
            x1={paddingLeft}
            y1={paddingTop + chartHeight}
            x2={width - paddingRight}
            y2={paddingTop + chartHeight}
            className="stroke-slate-700"
            strokeWidth={1}
          />
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredIndex !== null && data[hoveredIndex] && (
          <div
            className="absolute z-10 p-2 text-[10px] font-mono tracking-wider font-bold bg-slate-950/95 border rounded border-slate-700 text-slate-200 pointer-events-none shadow-fuchsia-500/20 shadow-md backdrop-blur-sm"
            style={{
              left: `${((paddingLeft + hoveredIndex * (chartWidth / data.length) + (chartWidth / data.length) / 2) / width) * 100}%`,
              top: `${((paddingTop + chartHeight - (data[hoveredIndex].value / maxValue) * chartHeight) / height) * 100 - 32}%`,
              transform: 'translateX(-50%)'
            }}
          >
            {data[hoveredIndex].label}: <span className="text-fuchsia-400">${data[hoveredIndex].value.toFixed(2)}</span>
          </div>
        )}
      </div>
    );
  }
};
