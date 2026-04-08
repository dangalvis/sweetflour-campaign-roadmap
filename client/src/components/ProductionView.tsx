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
  design: { bg: '#EDE9FE', text: '#7C3AED', label: 'Design' },
  media: { bg: '#DBEAFE', text: '#2563EB', label: 'Media' },
  client: { bg: '#FEF3C7', text: '#D97706', label: 'Client' },
  production: { bg: '#D1FAE5', text: '#059669', label: 'Production' },
};

const STATUS_CONFIG = {
  pending: { icon: 'pending', label: 'Pending', color: '#6B7280' },
  'in-progress': { icon: 'in-progress', label: 'In Progress', color: '#D97706' },
  done: { icon: 'done', label: 'Done', color: '#059669' },
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
        borderColor: isUrgent ? '#A8DDE9' : isPast ? '#E4F5F9' : '#E4F5F9',
        background: isUrgent ? '#FDF3E8' : isPast ? '#F5F5F5' : 'white',
        opacity: isPast ? 0.6 : 1,
      }}
    >
      <div
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ background: typeColors[deadline.type] || '#6B7280' }}
      />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium" style={{ color: '#3D1A0A' }}>{deadline.event}</div>
          {campaign && (
          <div className="text-xs mt-0.5" style={{ color: '#6B7280' }}>
            {campaign.name}
          </div>
        )}
      </div>
      <div className="text-right flex-shrink-0">
        <div className="text-sm font-medium" style={{ color: '#4B3728' }}>{deadline.date}</div>
        <div
          className="text-xs font-medium"
          style={{
            color: isPast ? '#6B7280' : isUrgent ? '#D97706' : '#6B7280',
          }}
        >
          {isPast ? 'Past' : isUrgent ? `${daysUntil}d — Urgent` : `${daysUntil}d`}
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
    <div className="p-6 space-y-6" style={{ background: '#F8FBFC' }}>
      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending Tasks', value: pendingCount, iconType: 'pending', color: '#6B7280', bg: '#F3F4F6' },
          { label: 'In Progress', value: inProgressCount, iconType: 'progress', color: '#D97706', bg: '#FEF3C7' },
          { label: 'Completed', value: doneCount, iconType: 'done', color: '#059669', bg: '#D1FAE5' },
        ].map(item => (
          <div key={item.label} className="rounded-xl border p-4 flex items-center gap-4" style={{ borderColor: '#E4F5F9', background: 'white' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: item.bg }}>
              {item.iconType === 'pending' && <Clock size={22} style={{ color: item.color }} />}
              {item.iconType === 'progress' && <AlertCircle size={22} style={{ color: item.color }} />}
              {item.iconType === 'done' && <CheckCircle size={22} style={{ color: item.color }} />}
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: item.color, fontFamily: "'Playfair Display', serif" }}>{item.value}</div>
              <div className="text-xs" style={{ color: '#6B7280' }}>{item.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Production Calendar */}
        <div>
          <h2 className="sf-section-title mb-4">Production Calendar</h2>
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: '#E4F5F9', background: 'white' }}>
            <div className="px-4 py-3 border-b" style={{ borderColor: '#E4F5F9', background: '#FBF7F2' }}>
              <div className="flex items-center gap-4 text-xs">
                {[
                  { color: '#7C3AED', label: 'Design deadline' },
                  { color: '#059669', label: 'Campaign launch' },
                  { color: '#D97706', label: 'Production start' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                    <span style={{ color: '#6B5744' }}>{item.label}</span>
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
            <h2 className="sf-section-title">Tasks by Owner</h2>
            <div className="flex items-center gap-2">
              <Filter size={14} style={{ color: '#6B7280' }} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className="text-xs border rounded-lg px-2 py-1 outline-none"
                style={{ borderColor: '#E4F5F9', color: '#4B3728', background: 'white' }}
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
                  background: ownerFilter === o ? '#3D1A0A' : 'white',
                  color: ownerFilter === o ? 'white' : '#6B5744',
                  borderColor: ownerFilter === o ? '#3D1A0A' : '#E4F5F9',
                }}
              >
                {o === 'all' ? 'All' : OWNER_COLORS[o]?.label || o}
              </button>
            ))}
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {allTasks.length === 0 ? (
              <div className="text-center py-8 text-sm" style={{ color: '#6B7280' }}>
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
                    style={{ borderColor: '#E4F5F9', background: 'white' }}
                    onClick={() => onCampaignClick(task.campaign)}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#FBF7F2'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'white'; }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5">
                        {task.status === 'pending' && <Clock size={14} style={{ color: '#9CA3AF' }} />}
                        {task.status === 'in-progress' && <AlertCircle size={14} style={{ color: '#D97706' }} />}
                        {task.status === 'done' && <CheckCircle size={14} style={{ color: '#059669' }} />}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium" style={{ color: '#3D1A0A' }}>{task.task}</div>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{ background: ownerConfig?.bg || '#F3F4F6', color: ownerConfig?.text || '#6B7280' }}
                          >
                            {ownerConfig?.label || task.owner}
                          </span>
                          <span className="text-xs" style={{ color: '#6B7280' }}>
                            {task.campaign.name}
                          </span>
                          {task.dueWeeks > 0 && (
                            <span className="text-xs" style={{ color: '#6B7280' }}>
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
        <h2 className="sf-section-title mb-4">Asset Requirements by Campaign</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {campaigns.filter(c => c.assets.length > 0).map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border p-4 cursor-pointer transition-all"
              style={{ borderColor: '#E4F5F9', background: 'white' }}
              onClick={() => onCampaignClick(c)}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = c.seasonalColor || '#A8DDE9'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#E4F5F9'; }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{c.emoji}</span>
                <div>
                  <div className="text-sm font-semibold" style={{ color: '#3D1A0A' }}>{c.name}</div>
                  <div className="text-xs" style={{ color: '#6B7280' }}>{c.startDate}</div>
                </div>
              </div>
              <div className="space-y-1">
                {c.assets.map((asset, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs" style={{ color: '#6B5744' }}>
                    <span style={{ color: c.seasonalColor || '#A8DDE9' }}>→</span>
                    {asset}
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t flex items-center justify-between" style={{ borderColor: '#E4F5F9' }}>
                <span className="text-xs" style={{ color: '#6B7280' }}>
                  {c.productionTasks.filter(t => t.status === 'done').length}/{c.productionTasks.length} tasks done
                </span>
                <div className="flex-1 mx-3 h-1.5 rounded-full overflow-hidden" style={{ background: '#E4F5F9' }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${c.productionTasks.length > 0 ? (c.productionTasks.filter(t => t.status === 'done').length / c.productionTasks.length) * 100 : 0}%`,
                      background: c.seasonalColor || '#A8DDE9',
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
