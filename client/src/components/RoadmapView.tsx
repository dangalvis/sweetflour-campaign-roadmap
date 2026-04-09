// RoadmapView — Gantt-style campaign timeline
// Design: Warm Artisan Editorial

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, Info, RefreshCw, Building2, ShoppingBag, Heart, Egg, Star, GraduationCap, Flower2, Sun, Cake, Leaf, Gift, ShoppingCart, Zap, Calendar } from "lucide-react";
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
  { label: 'Q1 2026', months: [0, 1, 2], bg: '#EEF9FC' },
  { label: 'Q2 2026', months: [3, 4, 5], bg: '#E8F8F2' },
  { label: 'Q3 2026', months: [6, 7, 8], bg: '#EEF9FC' },
  { label: 'Q4 2026', months: [9, 10, 11], bg: '#FDF3E8' },
];

const CURRENT_MONTH = 3; // April 2026 (0-indexed)

function getStatusColor(status: Campaign['status']): string {
  switch (status) {
    case 'active': return '#4CAF82';
    case 'in-production': return '#C8813A';
    case 'planned': return '#5B8DB8';
    case 'paused': return '#9B8EC4';
    default: return '#5B8DB8';
  }
}

function getStatusLabel(status: Campaign['status']): string {
  switch (status) {
    case 'active': return 'Active';
    case 'in-production': return 'In Production';
    case 'planned': return 'Planned';
    case 'paused': return 'Paused';
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

function getChannelLabel(channel: Campaign['channel']): string {
  switch (channel) {
    case 'meta': return 'Meta';
    case 'google': return 'Google';
    case 'both': return 'Meta + Google';
  }
}

function getChannelDot(channel: Campaign['channel']): string {
  switch (channel) {
    case 'meta': return '#1877F2';
    case 'google': return '#34A853';
    case 'both': return '#A8DDE9';
  }
}

function getCampaignIcon(id: string) {
  if (id.includes('evergreen') || id.includes('gifting')) return <Gift size={12} strokeWidth={2} />;
  if (id.includes('corp')) return <Building2 size={12} strokeWidth={2} />;
  if (id.includes('rem') || id.includes('remarketing')) return <RefreshCw size={12} strokeWidth={2} />;
  if (id.includes('valentine') || id.includes('val')) return <Heart size={12} strokeWidth={2} />;
  if (id.includes('easter') || id.includes('spring')) return <Egg size={12} strokeWidth={2} />;
  if (id.includes('admin')) return <Star size={12} strokeWidth={2} />;
  if (id.includes('mom') || id.includes('mother')) return <Flower2 size={12} strokeWidth={2} />;
  if (id.includes('grad')) return <GraduationCap size={12} strokeWidth={2} />;
  if (id.includes('dad') || id.includes('father')) return <ShoppingBag size={12} strokeWidth={2} />;
  if (id.includes('summer') || id.includes('wedding')) return <Sun size={12} strokeWidth={2} />;
  if (id.includes('school') || id.includes('back')) return <ShoppingCart size={12} strokeWidth={2} />;
  if (id.includes('halloween') || id.includes('spooky')) return <Zap size={12} strokeWidth={2} />;
  if (id.includes('bfcm') || id.includes('black')) return <ShoppingCart size={12} strokeWidth={2} />;
  if (id.includes('holiday') || id.includes('christmas')) return <Gift size={12} strokeWidth={2} />;
  if (id.includes('thanksgiv') || id.includes('grateful')) return <Leaf size={12} strokeWidth={2} />;
  if (id.includes('new-year') || id.includes('newyear')) return <Calendar size={12} strokeWidth={2} />;
  return <Cake size={12} strokeWidth={2} />;
}

type GroupKey = 'evergreen' | 'q1' | 'q2' | 'q3' | 'q4';

const GROUP_LABELS: Record<GroupKey, string> = {
  evergreen: 'Always-On Campaigns',
  q1: 'Q1 — Jan / Feb / Mar',
  q2: 'Q2 — Apr / May / Jun',
  q3: 'Q3 — Jul / Aug / Sep',
  q4: 'Q4 — Oct / Nov / Dec',
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
                    <span className="text-white flex-shrink-0">{getCampaignIcon(campaign.id)}</span>
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
        style={{ background: '#2C1A0E', border: 'none' }}
      >
                            <div className="text-white font-semibold text-sm mb-1">{campaign.name}</div>
        <div className="text-xs space-y-1" style={{ color: '#A8DDE9' }}>
          <div>{campaign.startDate} → {campaign.endDate}</div>
          <div>{campaign.goal.substring(0, 80)}{campaign.goal.length > 80 ? '...' : ''}</div>
          <div>Budget range: {campaign.monthlyBudget}</div>
          {campaign.benchmark.outboundCTR && (
            <div>Outbound CTR target: ≥{campaign.benchmark.outboundCTR}%</div>
          )}
          {campaign.benchmark.roas && (
            <div>ROAS target: {campaign.benchmark.roas}x</div>
          )}
        </div>
        <div className="mt-2 text-xs font-medium" style={{ color: '#A8DDE9' }}>
          Click for full details →
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

export default function RoadmapView({ campaigns, timeView, onCampaignClick }: RoadmapViewProps) {
   const [collapsedGroups, setCollapsedGroups] = useState<Set<GroupKey>>(new Set());
  const [cursorX, setCursorX] = useState<number | null>(null);
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const tableRef = useRef<HTMLDivElement>(null);
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

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!tableRef.current) return;
    const rect = tableRef.current.getBoundingClientRect();
    const scrollLeft = tableRef.current.scrollLeft;
    const x = e.clientX - rect.left + scrollLeft;
    if (x < LABEL_WIDTH) { setCursorX(null); return; }
    const colIdx = Math.floor((x - LABEL_WIDTH) / COL_WIDTH);
    if (colIdx < 0 || colIdx >= colCount) { setCursorX(null); return; }
    setCursorX(x);
    setCursorLabel(headers[colIdx]);
  }, [LABEL_WIDTH, COL_WIDTH, colCount, headers]);

  const handleMouseLeave = useCallback(() => {
    setCursorX(null);
  }, []);;

  return (
    <div className="p-6 min-h-full" style={{ background: '#F8FBFC' }}>
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
            <span className="text-xs" style={{ color: '#6B5744' }}>{item.label}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-1 text-xs" style={{ color: '#6B7280' }}>
          <Info size={12} />
          Click any campaign bar for full details
        </div>
      </div>

      {/* Timeline table */}
      <div
        ref={tableRef}
        className="rounded-xl border overflow-x-auto relative"
        style={{ borderColor: '#E4F5F9', background: 'white' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Vertical cursor line */}
        {cursorX !== null && (
          <div
            className="absolute top-0 bottom-0 pointer-events-none z-30"
            style={{
              left: cursorX,
              width: 1,
              background: 'rgba(200,129,58,0.55)',
              boxShadow: '0 0 6px rgba(200,129,58,0.3)',
            }}
          >
            <div
              className="absolute -top-0 left-1 text-xs font-semibold px-1.5 py-0.5 rounded whitespace-nowrap"
              style={{ background: '#C8813A', color: 'white', fontSize: 10, marginTop: 2 }}
            >
              {cursorLabel}
            </div>
          </div>
        )}
        <div style={{ minWidth: totalWidth }}>

          {/* Header row — months/quarters */}
          <div
            className="flex border-b sticky top-0 z-20"
            style={{ borderColor: '#2A1208', background: '#3D1A0A' }}
          >
            <div
              className="flex-shrink-0 flex items-center px-4 py-3"
              style={{ width: LABEL_WIDTH, borderRight: '1px solid #2A1208' }}
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
                    borderColor: '#2A1208',
                    color: isCurrent ? '#A8DDE9' : 'rgba(255,255,255,0.7)',
                    background: isCurrent ? '#2A1208' : 'transparent',
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
              className="flex border-b sticky z-20"
              style={{ borderColor: '#E4F5F9', background: '#EEF9FC', top: 41 }}
            >
              <div
                className="flex-shrink-0"
                style={{ width: LABEL_WIDTH, borderRight: '1px solid #E4F5F9' }}
              />
              {QUARTERS.map((q) => (
                <div
                  key={q.label}
                  className="flex items-center justify-center py-1.5 text-xs font-medium border-r"
                  style={{
                    width: COL_WIDTH * 3,
                    borderColor: '#E4F5F9',
                    color: '#3D1A0A',
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
                  style={{ borderColor: '#E4F5F9', background: '#EEF9FC' }}
                  onClick={() => toggleGroup(groupKey)}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#D8F0F7'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#EEF9FC'; }}
                >
                  <div
                    className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5"
                    style={{ width: LABEL_WIDTH, borderRight: '1px solid #E4F5F9' }}
                  >
                    <span style={{ color: '#3D1A0A' }}>
                      {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                    </span>
                    <span className="text-xs font-semibold" style={{ color: '#3D1A0A' }}>
                      {GROUP_LABELS[groupKey]}
                    </span>
                    <span
                      className="ml-auto text-xs px-1.5 py-0.5 rounded-full"
                      style={{ background: '#3D1A0A', color: 'white' }}
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
                        borderColor: '#E4F5F9',
                        background: rowIdx % 2 === 0 ? 'white' : '#FAFEFF',
                        minHeight: 48,
                      }}
                    >
                      {/* Campaign label cell */}
                      <div
                        className="flex-shrink-0 flex items-center gap-2 px-4 py-2 cursor-pointer group"
                        style={{
                          width: LABEL_WIDTH,
                          borderRight: '1px solid #E4F5F9',
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
                            style={{ color: '#3D1A0A' }}
                          >
                            {campaign.name}
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
                            <span
                              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm"
                              style={{ background: `${getChannelDot(campaign.channel)}18`, fontSize: '10px', color: getChannelDot(campaign.channel) }}
                            >
                              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: getChannelDot(campaign.channel) }} />
                              {getChannelLabel(campaign.channel)}
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
                              background: 'rgba(168, 221, 233, 0.12)',
                              borderLeft: '2px solid rgba(168, 221, 233, 0.5)',
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
                              borderColor: '#E4F5F9',
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
                              <span className="text-white flex-shrink-0">{getCampaignIcon(campaign.id)}</span>
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
                            style={{ background: '#2C1A0E', border: 'none' }}
                          >
                            <div className="text-white font-semibold text-sm mb-1">{campaign.name}</div>
                            <div className="text-xs space-y-1" style={{ color: '#A8DDE9' }}>
                              <div>{campaign.startDate} → {campaign.endDate}</div>
                              <div>{campaign.goal.substring(0, 80)}{campaign.goal.length > 80 ? '...' : ''}</div>
                              <div>Budget range: {campaign.monthlyBudget}</div>
                              {campaign.benchmark.outboundCTR && (
                                <div>Outbound CTR target: ≥{campaign.benchmark.outboundCTR}%</div>
                              )}
                              {campaign.benchmark.roas && (
                                <div>ROAS target: {campaign.benchmark.roas}x</div>
                              )}
                            </div>
                            <div className="mt-2 text-xs font-medium" style={{ color: '#A8DDE9' }}>
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
        <div className="mt-6 rounded-xl border overflow-hidden" style={{ borderColor: '#E4F5F9' }}>
          <div
            className="px-4 py-3 border-b"
            style={{ background: '#3D1A0A', borderColor: '#2A1208' }}
          >
            <span className="text-xs font-semibold text-white uppercase tracking-wider">Quarterly Budget Overview</span>
          </div>
          <div className="grid grid-cols-4">
            {[
              { q: 'Q1 2026', budget: '~28% of annual budget', focus: "Valentine's + Evergreen", roas: '48x peak', color: '#EEF9FC', border: '#C8813A' },
              { q: 'Q2 2026', budget: '~25% of annual budget', focus: "Easter + Mother's Day + Grad", roas: '8–15x', color: '#E8F8F2', border: '#4CAF82' },
              { q: 'Q3 2026', budget: '~22% of annual budget', focus: "Wedding + Back-to-School + TG", roas: '5–9x', color: '#EEF9FC', border: '#5B8DB8' },
              { q: 'Q4 2026', budget: '~35% of annual budget', focus: "Halloween + BFCM + Holiday", roas: '15–22x', color: '#FDF3E8', border: '#E07B39' },
            ].map((item, i) => (
              <div
                key={item.q}
                className="p-4 border-r last:border-r-0"
                style={{ background: item.color, borderColor: '#E4F5F9', borderTop: `3px solid ${item.border}` }}
              >
                <div
                  className="text-xs font-bold mb-1"
                  style={{ color: '#3D1A0A', fontFamily: "'Playfair Display', serif" }}
                >
                  {item.q}
                </div>
                <div className="text-sm font-semibold" style={{ color: '#3D1A0A' }}>{item.budget}</div>
                <div className="text-xs mt-1" style={{ color: '#6B5744' }}>{item.focus}</div>
                <div className="text-xs mt-1 font-medium" style={{ color: '#059669' }}>ROAS: {item.roas}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
