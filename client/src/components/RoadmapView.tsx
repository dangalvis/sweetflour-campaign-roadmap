// RoadmapView — Gantt-style campaign timeline
// Design: Warm Artisan Editorial

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, Info } from "lucide-react";
import type { Campaign } from "@/lib/campaignData";
import type { TimeView } from "@/pages/Home";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface RoadmapViewProps {
  campaigns: Campaign[];
  timeView: TimeView;
  onCampaignClick: (c: Campaign) => void;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const QUARTERS = [
  { label: 'Q1 2026', months: [0, 1, 2], bg: 'oklch(0.95 0.015 55)' },
  { label: 'Q2 2026', months: [3, 4, 5], bg: 'oklch(0.95 0.015 145)' },
  { label: 'Q3 2026', months: [6, 7, 8], bg: 'oklch(0.95 0.015 200)' },
  { label: 'Q4 2026', months: [9, 10, 11], bg: 'oklch(0.95 0.015 40)' },
];

const CURRENT_MONTH = 3; // April 2026 (0-indexed)

function getStatusColor(status: Campaign['status']): string {
  switch (status) {
    case 'active': return '#4CAF82';
    case 'in-production': return '#C8813A';
    case 'planned': return '#5B8DB8';
    case 'paused': return '#9B8EC4';
    case 'completed': return '#9CA3AF';
    default: return '#5B8DB8';
  }
}

function getStatusLabel(status: Campaign['status']): string {
  switch (status) {
    case 'active': return 'Active';
    case 'in-production': return 'In Production';
    case 'planned': return 'Planned';
    case 'paused': return 'Paused';
    case 'completed': return 'Completed';
    default: return status;
  }
}

function getPriorityDot(priority: Campaign['priority']): string {
  switch (priority) {
    case 'high': return '#EF4444';
    case 'medium': return '#F59E0B';
    case 'low': return '#9CA3AF';
  }
}

function getChannelBadge(channel: Campaign['channel']): string {
  switch (channel) {
    case 'meta': return '📘 Meta';
    case 'google': return '🔍 Google';
    case 'both': return '📘🔍 Both';
  }
}

type GroupKey = 'evergreen' | 'q1' | 'q2' | 'q3' | 'q4';

const GROUP_LABELS: Record<GroupKey, string> = {
  evergreen: '🌿 Always-On Campaigns',
  q1: '❄️ Q1 — Jan / Feb / Mar',
  q2: '🌸 Q2 — Apr / May / Jun',
  q3: '☀️ Q3 — Jul / Aug / Sep',
  q4: '🍂 Q4 — Oct / Nov / Dec',
};

function groupCampaigns(campaigns: Campaign[]): Record<GroupKey, Campaign[]> {
  const groups: Record<GroupKey, Campaign[]> = { evergreen: [], q1: [], q2: [], q3: [], q4: [] };
  campaigns.forEach(c => {
    if (c.type === 'evergreen' || c.type === 'remarketing' || c.type === 'corporate') {
      groups.evergreen.push(c);
    } else {
      const m = c.month;
      if (m <= 3) groups.q1.push(c);
      else if (m <= 6) groups.q2.push(c);
      else if (m <= 9) groups.q3.push(c);
      else groups.q4.push(c);
    }
  });
  return groups;
}

interface CampaignBarCellProps {
  campaign: Campaign;
  monthIndex: number;
  colCount: number;
  onClick: () => void;
  isMonthly: boolean;
}

function CampaignBarCell({ campaign, monthIndex, colCount, onClick, isMonthly }: CampaignBarCellProps) {
  const startCol = isMonthly ? campaign.month - 1 : Math.floor((campaign.month - 1) / 3);
  const endCol = isMonthly ? campaign.endMonth - 1 : Math.floor((campaign.endMonth - 1) / 3);

  // Only render bar in the start column
  if (monthIndex !== startCol) return <div />;

  const span = Math.max(1, endCol - startCol + 1);
  const barColor = campaign.seasonalColor || getStatusColor(campaign.status);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          onClick={onClick}
          style={{
            gridColumn: `span ${span}`,
            padding: '3px 2px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scaleX: 0.7 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-8 rounded-md flex items-center px-2.5 gap-1.5 cursor-pointer select-none overflow-hidden transition-all duration-150 hover:brightness-110 hover:shadow-md"
            style={{
              background: barColor,
              transformOrigin: 'left center',
            }}
          >
            <span className="text-sm flex-shrink-0">{campaign.emoji}</span>
            {span > 1 && (
              <span className="text-xs font-semibold text-white truncate">
                {campaign.name}
              </span>
            )}
          </motion.div>
        </div>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="max-w-xs p-3 text-left"
        style={{ background: 'oklch(0.22 0.04 55)', border: 'none' }}
      >
        <div className="text-white font-semibold text-sm mb-1">{campaign.emoji} {campaign.name}</div>
        <div className="text-xs space-y-1" style={{ color: 'oklch(0.78 0.04 75)' }}>
          <div>📅 {campaign.startDate} → {campaign.endDate}</div>
          <div>🎯 {campaign.goal.substring(0, 80)}{campaign.goal.length > 80 ? '...' : ''}</div>
          <div>💰 {campaign.monthlyBudget}</div>
          {campaign.benchmark.outboundCTR && (
            <div>📊 Outbound CTR target: ≥{campaign.benchmark.outboundCTR}%</div>
          )}
          {campaign.benchmark.roas && (
            <div>📈 ROAS target: {campaign.benchmark.roas}x</div>
          )}
        </div>
        <div className="mt-2 text-xs font-medium" style={{ color: 'oklch(0.65 0.12 55)' }}>
          Click for full details →
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

export default function RoadmapView({ campaigns, timeView, onCampaignClick }: RoadmapViewProps) {
  const [collapsedGroups, setCollapsedGroups] = useState<Set<GroupKey>>(new Set());
  const groups = groupCampaigns(campaigns);
  const isMonthly = timeView === 'monthly';
  const colCount = isMonthly ? 12 : 4;
  const headers = isMonthly ? MONTHS : QUARTERS.map(q => q.label);

  const toggleGroup = (key: GroupKey) => {
    setCollapsedGroups(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const COL_WIDTH = isMonthly ? 88 : 200;
  const LABEL_WIDTH = 230;
  const totalWidth = LABEL_WIDTH + colCount * COL_WIDTH;

  return (
    <div className="p-6 min-h-full" style={{ background: 'oklch(0.98 0.008 75)' }}>
      {/* Legend */}
      <div className="flex items-center gap-5 mb-5 flex-wrap">
        <span className="sf-label">Legend:</span>
        {[
          { label: 'Active', color: '#4CAF82' },
          { label: 'In Production', color: '#C8813A' },
          { label: 'Planned', color: '#5B8DB8' },
          { label: 'Paused', color: '#9B8EC4' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ background: item.color }} />
            <span className="text-xs" style={{ color: 'oklch(0.45 0.04 55)' }}>{item.label}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-1 text-xs" style={{ color: 'oklch(0.55 0.04 55)' }}>
          <Info size={12} />
          Click any campaign bar for full details
        </div>
      </div>

      {/* Timeline table */}
      <div
        className="rounded-xl border overflow-x-auto"
        style={{ borderColor: 'oklch(0.88 0.02 75)', background: 'white' }}
      >
        <div style={{ minWidth: totalWidth }}>

          {/* Header row — months/quarters */}
          <div
            className="flex border-b sticky top-0 z-20"
            style={{ borderColor: 'oklch(0.35 0.06 42)', background: 'oklch(0.28 0.07 42)' }}
          >
            <div
              className="flex-shrink-0 flex items-center px-4 py-3"
              style={{ width: LABEL_WIDTH, borderRight: '1px solid oklch(0.35 0.06 42)' }}
            >
              <span className="text-xs font-semibold text-white uppercase tracking-wider">Campaign</span>
            </div>
            {headers.map((h, i) => {
              const isCurrent = isMonthly ? i === CURRENT_MONTH : i === Math.floor(CURRENT_MONTH / 3);
              return (
                <div
                  key={h}
                  className="flex-shrink-0 flex items-center justify-center py-3 text-xs font-semibold uppercase tracking-wider border-r"
                  style={{
                    width: COL_WIDTH,
                    borderColor: 'oklch(0.35 0.06 42)',
                    color: isCurrent ? 'oklch(0.65 0.12 55)' : 'oklch(0.78 0.04 75)',
                    background: isCurrent ? 'oklch(0.22 0.06 42)' : 'transparent',
                  }}
                >
                  {isCurrent && <span className="mr-1 text-xs">▶</span>}
                  {h}
                </div>
              );
            })}
          </div>

          {/* Quarter sub-headers for monthly view */}
          {isMonthly && (
            <div
              className="flex border-b"
              style={{ borderColor: 'oklch(0.88 0.02 75)', background: 'oklch(0.97 0.01 75)' }}
            >
              <div
                className="flex-shrink-0"
                style={{ width: LABEL_WIDTH, borderRight: '1px solid oklch(0.88 0.02 75)' }}
              />
              {QUARTERS.map((q) => (
                <div
                  key={q.label}
                  className="flex items-center justify-center py-1.5 text-xs font-medium border-r"
                  style={{
                    width: COL_WIDTH * 3,
                    borderColor: 'oklch(0.88 0.02 75)',
                    color: 'oklch(0.45 0.04 55)',
                    background: q.bg,
                  }}
                >
                  {q.label}
                </div>
              ))}
            </div>
          )}

          {/* Campaign groups */}
          {(Object.keys(groups) as GroupKey[]).map((groupKey) => {
            const groupItems = groups[groupKey];
            if (groupItems.length === 0) return null;
            const isCollapsed = collapsedGroups.has(groupKey);

            return (
              <div key={groupKey}>
                {/* Group header row */}
                <div
                  className="flex items-center border-b cursor-pointer select-none transition-colors"
                  style={{ borderColor: 'oklch(0.88 0.02 75)', background: 'oklch(0.95 0.012 75)' }}
                  onClick={() => toggleGroup(groupKey)}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'oklch(0.92 0.015 75)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'oklch(0.95 0.012 75)'; }}
                >
                  <div
                    className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5"
                    style={{ width: LABEL_WIDTH, borderRight: '1px solid oklch(0.88 0.02 75)' }}
                  >
                    <span style={{ color: 'oklch(0.45 0.04 55)' }}>
                      {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                    </span>
                    <span className="text-xs font-semibold" style={{ color: 'oklch(0.28 0.07 42)' }}>
                      {GROUP_LABELS[groupKey]}
                    </span>
                    <span
                      className="ml-auto text-xs px-1.5 py-0.5 rounded-full"
                      style={{ background: 'oklch(0.28 0.07 42)', color: 'white' }}
                    >
                      {groupItems.length}
                    </span>
                  </div>
                  {/* Span remaining columns */}
                  <div
                    className="flex-1"
                    style={{ height: 36 }}
                  />
                </div>

                {/* Campaign rows */}
                {!isCollapsed && groupItems.map((campaign, rowIdx) => {
                  const startCol = isMonthly ? campaign.month - 1 : Math.floor((campaign.month - 1) / 3);
                  const endCol = isMonthly ? campaign.endMonth - 1 : Math.floor((campaign.endMonth - 1) / 3);
                  const barSpan = Math.max(1, endCol - startCol + 1);
                  const barColor = campaign.seasonalColor || getStatusColor(campaign.status);

                  return (
                    <motion.div
                      key={campaign.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: rowIdx * 0.03 }}
                      className="flex border-b"
                      style={{
                        borderColor: 'oklch(0.92 0.01 75)',
                        background: rowIdx % 2 === 0 ? 'white' : 'oklch(0.995 0.003 75)',
                        minHeight: 48,
                      }}
                    >
                      {/* Campaign label cell */}
                      <div
                        className="flex-shrink-0 flex items-center gap-2 px-4 py-2 cursor-pointer group"
                        style={{
                          width: LABEL_WIDTH,
                          borderRight: '1px solid oklch(0.92 0.01 75)',
                        }}
                        onClick={() => onCampaignClick(campaign)}
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0 mt-0.5"
                          style={{ background: getPriorityDot(campaign.priority) }}
                        />
                        <div className="min-w-0 flex-1">
                          <div
                            className="text-xs font-medium truncate group-hover:underline"
                            style={{ color: 'oklch(0.28 0.07 42)' }}
                          >
                            {campaign.emoji} {campaign.name}
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                            <span
                              className="inline-flex items-center px-1.5 py-0.5 rounded-sm font-medium"
                              style={{
                                background: `${barColor}22`,
                                color: barColor,
                                fontSize: '10px',
                              }}
                            >
                              {getStatusLabel(campaign.status)}
                            </span>
                            <span className="text-xs" style={{ color: 'oklch(0.65 0.04 55)', fontSize: '10px' }}>
                              {getChannelBadge(campaign.channel)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Timeline cells */}
                      <div
                        className="flex-1 relative"
                        style={{ height: 48, minHeight: 48 }}
                      >
                        {/* Current month highlight */}
                        {isMonthly && (
                          <div
                            className="absolute top-0 bottom-0 pointer-events-none z-0"
                            style={{
                              left: CURRENT_MONTH * COL_WIDTH,
                              width: COL_WIDTH,
                              background: 'oklch(0.65 0.12 55 / 0.06)',
                              borderLeft: '2px solid oklch(0.65 0.12 55 / 0.25)',
                            }}
                          />
                        )}

                        {/* Column grid lines */}
                        {Array.from({ length: colCount }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute top-0 bottom-0 border-r"
                            style={{
                              left: i * COL_WIDTH,
                              width: COL_WIDTH,
                              borderColor: 'oklch(0.93 0.01 75)',
                              zIndex: 0,
                            }}
                          />
                        ))}

                        {/* Campaign bar — positioned by startCol */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.div
                              initial={{ opacity: 0, scaleX: 0.7 }}
                              animate={{ opacity: 1, scaleX: 1 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              onClick={() => onCampaignClick(campaign)}
                              className="absolute cursor-pointer z-10 flex items-center gap-1.5 rounded-md px-2.5 overflow-hidden transition-all duration-150 hover:brightness-110 hover:shadow-md"
                              style={{
                                left: startCol * COL_WIDTH + 4,
                                top: 8,
                                width: barSpan * COL_WIDTH - 8,
                                height: 32,
                                background: barColor,
                                transformOrigin: 'left center',
                              }}
                            >
                              <span className="text-sm flex-shrink-0">{campaign.emoji}</span>
                              {barSpan > 1 && (
                                <span className="text-xs font-semibold text-white truncate">
                                  {campaign.name}
                                </span>
                              )}
                            </motion.div>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="max-w-xs p-3 text-left"
                            style={{ background: 'oklch(0.22 0.04 55)', border: 'none' }}
                          >
                            <div className="text-white font-semibold text-sm mb-1">{campaign.emoji} {campaign.name}</div>
                            <div className="text-xs space-y-1" style={{ color: 'oklch(0.78 0.04 75)' }}>
                              <div>📅 {campaign.startDate} → {campaign.endDate}</div>
                              <div>🎯 {campaign.goal.substring(0, 80)}{campaign.goal.length > 80 ? '...' : ''}</div>
                              <div>💰 {campaign.monthlyBudget}</div>
                              {campaign.benchmark.outboundCTR && (
                                <div>📊 Outbound CTR target: ≥{campaign.benchmark.outboundCTR}%</div>
                              )}
                              {campaign.benchmark.roas && (
                                <div>📈 ROAS target: {campaign.benchmark.roas}x</div>
                              )}
                            </div>
                            <div className="mt-2 text-xs font-medium" style={{ color: 'oklch(0.65 0.12 55)' }}>
                              Click for full details →
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quarterly Budget Overview */}
      {isMonthly && (
        <div className="mt-6 rounded-xl border overflow-hidden" style={{ borderColor: 'oklch(0.88 0.02 75)' }}>
          <div
            className="px-4 py-3 border-b"
            style={{ background: 'oklch(0.28 0.07 42)', borderColor: 'oklch(0.35 0.06 42)' }}
          >
            <span className="text-xs font-semibold text-white uppercase tracking-wider">Quarterly Budget Overview</span>
          </div>
          <div className="grid grid-cols-4">
            {[
              { q: 'Q1 2026', budget: 'CAD $3,600–4,500', focus: "Valentine's + Evergreen", roas: '48x peak', color: 'oklch(0.95 0.015 55)', border: '#C8813A' },
              { q: 'Q2 2026', budget: 'CAD $3,200–4,200', focus: "Easter + Mother's Day + Grad", roas: '8–15x', color: 'oklch(0.95 0.015 145)', border: '#4CAF82' },
              { q: 'Q3 2026', budget: 'CAD $2,800–3,800', focus: "Wedding + Back-to-School + TG", roas: '5–9x', color: 'oklch(0.95 0.015 200)', border: '#5B8DB8' },
              { q: 'Q4 2026', budget: 'CAD $4,500–6,000', focus: "Halloween + BFCM + Holiday", roas: '15–22x', color: 'oklch(0.95 0.015 40)', border: '#E07B39' },
            ].map((item, i) => (
              <div
                key={item.q}
                className="p-4 border-r last:border-r-0"
                style={{ background: item.color, borderColor: 'oklch(0.88 0.02 75)', borderTop: `3px solid ${item.border}` }}
              >
                <div
                  className="text-xs font-bold mb-1"
                  style={{ color: 'oklch(0.28 0.07 42)', fontFamily: "'Playfair Display', serif" }}
                >
                  {item.q}
                </div>
                <div className="text-sm font-semibold" style={{ color: 'oklch(0.28 0.07 42)' }}>{item.budget}</div>
                <div className="text-xs mt-1" style={{ color: 'oklch(0.45 0.04 55)' }}>{item.focus}</div>
                <div className="text-xs mt-1 font-medium" style={{ color: 'oklch(0.45 0.12 145)' }}>ROAS: {item.roas}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
