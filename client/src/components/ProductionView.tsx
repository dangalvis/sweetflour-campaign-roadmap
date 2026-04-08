// ProductionView — Production tracker with deadlines and task assignments
// Design: Warm Artisan Editorial

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, AlertCircle, CheckCircle, Clock, Filter } from "lucide-react";
import type { Campaign } from "@/lib/campaignData";
import { productionDeadlines } from "@/lib/campaignData";

interface ProductionViewProps {
  campaigns: Campaign[];
  onCampaignClick: (c: Campaign) => void;
}

type OwnerFilter = 'all' | 'design' | 'media' | 'client' | 'production';

const OWNER_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  design: { bg: '#EDE9FE', text: '#7C3AED', label: '🎨 Design' },
  media: { bg: '#DBEAFE', text: '#2563EB', label: '📊 Media' },
  client: { bg: '#FEF3C7', text: '#D97706', label: '👤 Client' },
  production: { bg: '#D1FAE5', text: '#059669', label: '📸 Production' },
};

const STATUS_CONFIG = {
  pending: { icon: '⏳', label: 'Pending', color: '#6B7280' },
  'in-progress': { icon: '🔄', label: 'In Progress', color: '#D97706' },
  done: { icon: '✅', label: 'Done', color: '#059669' },
};

function DeadlineItem({ deadline, campaign }: { deadline: typeof productionDeadlines[0]; campaign: Campaign | undefined }) {
  const typeColors: Record<string, string> = {
    design: '#7C3AED',
    launch: '#059669',
    production: '#D97706',
  };

  const today = new Date('2026-04-08');
  const dDate = new Date(deadline.date);
  const daysUntil = Math.ceil((dDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const isPast = daysUntil < 0;
  const isUrgent = daysUntil >= 0 && daysUntil <= 14;

  return (
    <div
      className="flex items-center gap-4 py-3 px-4 rounded-lg border transition-colors"
      style={{
        borderColor: isUrgent ? 'oklch(0.65 0.12 55)' : isPast ? 'oklch(0.88 0.02 75)' : 'oklch(0.88 0.02 75)',
        background: isUrgent ? 'oklch(0.97 0.015 55)' : isPast ? 'oklch(0.96 0.005 75)' : 'white',
        opacity: isPast ? 0.6 : 1,
      }}
    >
      <div
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ background: typeColors[deadline.type] || '#6B7280' }}
      />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium" style={{ color: 'oklch(0.28 0.07 42)' }}>{deadline.event}</div>
        {campaign && (
          <div className="text-xs mt-0.5" style={{ color: 'oklch(0.55 0.04 55)' }}>
            {campaign.emoji} {campaign.name}
          </div>
        )}
      </div>
      <div className="text-right flex-shrink-0">
        <div className="text-sm font-medium" style={{ color: 'oklch(0.35 0.04 55)' }}>{deadline.date}</div>
        <div
          className="text-xs font-medium"
          style={{
            color: isPast ? '#6B7280' : isUrgent ? '#D97706' : 'oklch(0.55 0.04 55)',
          }}
        >
          {isPast ? 'Past' : isUrgent ? `${daysUntil}d away ⚠️` : `${daysUntil}d`}
        </div>
      </div>
      <span
        className="text-xs px-2 py-1 rounded-full font-medium flex-shrink-0"
        style={{
          background: deadline.type === 'launch' ? '#D1FAE5' : deadline.type === 'design' ? '#EDE9FE' : '#FEF3C7',
          color: typeColors[deadline.type] || '#6B7280',
        }}
      >
        {deadline.type}
      </span>
    </div>
  );
}

export default function ProductionView({ campaigns, onCampaignClick }: ProductionViewProps) {
  const [ownerFilter, setOwnerFilter] = useState<OwnerFilter>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in-progress' | 'done'>('all');

  // Flatten all production tasks
  const allTasks = campaigns.flatMap(c =>
    c.productionTasks
      .filter(t => ownerFilter === 'all' || t.owner === ownerFilter)
      .filter(t => statusFilter === 'all' || t.status === statusFilter)
      .map(t => ({ ...t, campaign: c }))
  );

  const tasksByOwner: Record<string, typeof allTasks> = {};
  allTasks.forEach(t => {
    if (!tasksByOwner[t.owner]) tasksByOwner[t.owner] = [];
    tasksByOwner[t.owner].push(t);
  });

  const pendingCount = allTasks.filter(t => t.status === 'pending').length;
  const inProgressCount = allTasks.filter(t => t.status === 'in-progress').length;
  const doneCount = allTasks.filter(t => t.status === 'done').length;

  // Get upcoming deadlines (next 90 days)
  const today = new Date('2026-04-08');
  const upcomingDeadlines = productionDeadlines
    .filter(d => {
      const dDate = new Date(d.date);
      const daysUntil = Math.ceil((dDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntil >= -7 && daysUntil <= 120;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="p-6 space-y-6" style={{ background: 'oklch(0.98 0.008 75)' }}>
      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending Tasks', value: pendingCount, icon: '⏳', color: '#6B7280', bg: '#F3F4F6' },
          { label: 'In Progress', value: inProgressCount, icon: '🔄', color: '#D97706', bg: '#FEF3C7' },
          { label: 'Completed', value: doneCount, icon: '✅', color: '#059669', bg: '#D1FAE5' },
        ].map(item => (
          <div key={item.label} className="rounded-xl border p-4 flex items-center gap-4" style={{ borderColor: 'oklch(0.88 0.02 75)', background: 'white' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: item.bg }}>
              {item.icon}
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: item.color, fontFamily: "'Playfair Display', serif" }}>{item.value}</div>
              <div className="text-xs" style={{ color: 'oklch(0.55 0.04 55)' }}>{item.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Production Calendar */}
        <div>
          <h2 className="sf-section-title mb-4">📅 Production Calendar</h2>
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'oklch(0.88 0.02 75)', background: 'white' }}>
            <div className="px-4 py-3 border-b" style={{ borderColor: 'oklch(0.88 0.02 75)', background: 'oklch(0.97 0.008 75)' }}>
              <div className="flex items-center gap-4 text-xs">
                {[
                  { color: '#7C3AED', label: 'Design deadline' },
                  { color: '#059669', label: 'Campaign launch' },
                  { color: '#D97706', label: 'Production start' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                    <span style={{ color: 'oklch(0.45 0.04 55)' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
              {upcomingDeadlines.map((d, i) => {
                const campaign = campaigns.find(c => c.id === d.campaign);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <DeadlineItem deadline={d} campaign={campaign} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Task Board by Owner */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="sf-section-title">🗂️ Tasks by Owner</h2>
            <div className="flex items-center gap-2">
              <Filter size={14} style={{ color: 'oklch(0.55 0.04 55)' }} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className="text-xs border rounded-lg px-2 py-1 outline-none"
                style={{ borderColor: 'oklch(0.88 0.02 75)', color: 'oklch(0.35 0.04 55)', background: 'white' }}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          {/* Owner filter pills */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {(['all', 'design', 'media', 'client', 'production'] as OwnerFilter[]).map(o => (
              <button
                key={o}
                onClick={() => setOwnerFilter(o)}
                className="text-xs px-3 py-1.5 rounded-full border font-medium transition-all"
                style={{
                  background: ownerFilter === o ? 'oklch(0.28 0.07 42)' : 'white',
                  color: ownerFilter === o ? 'white' : 'oklch(0.45 0.04 55)',
                  borderColor: ownerFilter === o ? 'oklch(0.28 0.07 42)' : 'oklch(0.88 0.02 75)',
                }}
              >
                {o === 'all' ? 'All' : OWNER_COLORS[o]?.label || o}
              </button>
            ))}
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {allTasks.length === 0 ? (
              <div className="text-center py-8 text-sm" style={{ color: 'oklch(0.55 0.04 55)' }}>
                No tasks match the current filters.
              </div>
            ) : (
              allTasks.map((task, i) => {
                const ownerConfig = OWNER_COLORS[task.owner];
                const statusConfig = STATUS_CONFIG[task.status];
                return (
                  <motion.div
                    key={`${task.id}-${i}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="rounded-lg border p-3 cursor-pointer transition-all"
                    style={{ borderColor: 'oklch(0.88 0.02 75)', background: 'white' }}
                    onClick={() => onCampaignClick(task.campaign)}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'oklch(0.97 0.01 55)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'white'; }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-base mt-0.5">{statusConfig.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium" style={{ color: 'oklch(0.28 0.07 42)' }}>{task.task}</div>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{ background: ownerConfig?.bg || '#F3F4F6', color: ownerConfig?.text || '#6B7280' }}
                          >
                            {ownerConfig?.label || task.owner}
                          </span>
                          <span className="text-xs" style={{ color: 'oklch(0.55 0.04 55)' }}>
                            {task.campaign.emoji} {task.campaign.name}
                          </span>
                          {task.dueWeeks > 0 && (
                            <span className="text-xs" style={{ color: 'oklch(0.55 0.04 55)' }}>
                              {task.dueWeeks}w before launch
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Asset requirements by campaign */}
      <div>
        <h2 className="sf-section-title mb-4">🎨 Asset Requirements by Campaign</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {campaigns.filter(c => c.assets.length > 0).map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border p-4 cursor-pointer transition-all"
              style={{ borderColor: 'oklch(0.88 0.02 75)', background: 'white' }}
              onClick={() => onCampaignClick(c)}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = c.seasonalColor || 'oklch(0.65 0.12 55)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'oklch(0.88 0.02 75)'; }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{c.emoji}</span>
                <div>
                  <div className="text-sm font-semibold" style={{ color: 'oklch(0.28 0.07 42)' }}>{c.name}</div>
                  <div className="text-xs" style={{ color: 'oklch(0.55 0.04 55)' }}>{c.startDate}</div>
                </div>
              </div>
              <div className="space-y-1">
                {c.assets.map((asset, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs" style={{ color: 'oklch(0.45 0.04 55)' }}>
                    <span style={{ color: c.seasonalColor || 'oklch(0.65 0.12 55)' }}>→</span>
                    {asset}
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t flex items-center justify-between" style={{ borderColor: 'oklch(0.92 0.01 75)' }}>
                <span className="text-xs" style={{ color: 'oklch(0.55 0.04 55)' }}>
                  {c.productionTasks.filter(t => t.status === 'done').length}/{c.productionTasks.length} tasks done
                </span>
                <div className="flex-1 mx-3 h-1.5 rounded-full overflow-hidden" style={{ background: 'oklch(0.92 0.01 75)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${c.productionTasks.length > 0 ? (c.productionTasks.filter(t => t.status === 'done').length / c.productionTasks.length) * 100 : 0}%`,
                      background: c.seasonalColor || 'oklch(0.65 0.12 55)',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
