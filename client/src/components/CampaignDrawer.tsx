// CampaignDrawer — Slide-in detail panel for campaign details
// Design: Warm Artisan Editorial

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Target, DollarSign, Users, MapPin, Lightbulb, CheckSquare, BarChart2, TrendingUp, AlertCircle } from "lucide-react";
import type { Campaign } from "@/lib/campaignData";

interface CampaignDrawerProps {
  campaign: Campaign | null;
  open: boolean;
  onClose: () => void;
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color: 'oklch(0.65 0.12 55)' }}>{icon}</span>
        <h3 className="text-sm font-semibold" style={{ color: 'oklch(0.28 0.07 42)', fontFamily: "'Playfair Display', serif" }}>
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function MetricCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="rounded-lg p-3 border" style={{ borderColor: 'oklch(0.88 0.02 75)', background: 'oklch(0.99 0.004 75)' }}>
      <div className="text-xs mb-1" style={{ color: 'oklch(0.55 0.04 55)' }}>{label}</div>
      <div className="text-lg font-bold" style={{ color: color || 'oklch(0.28 0.07 42)', fontFamily: "'Playfair Display', serif" }}>{value}</div>
      {sub && <div className="text-xs mt-0.5" style={{ color: 'oklch(0.65 0.04 55)' }}>{sub}</div>}
    </div>
  );
}

function TaskItem({ task }: { task: Campaign['productionTasks'][0] }) {
  const ownerColors: Record<string, string> = {
    design: 'oklch(0.65 0.12 285)',
    media: 'oklch(0.55 0.12 200)',
    client: 'oklch(0.65 0.12 55)',
    production: 'oklch(0.55 0.15 145)',
  };
  const statusIcons: Record<string, string> = {
    pending: '⏳',
    'in-progress': '🔄',
    done: '✅',
  };

  return (
    <div className="flex items-start gap-3 py-2.5 border-b last:border-0" style={{ borderColor: 'oklch(0.92 0.01 75)' }}>
      <span className="text-sm mt-0.5">{statusIcons[task.status]}</span>
      <div className="flex-1 min-w-0">
        <div className="text-sm" style={{ color: 'oklch(0.28 0.07 42)' }}>{task.task}</div>
        <div className="flex items-center gap-2 mt-1">
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: `${ownerColors[task.owner]}22`, color: ownerColors[task.owner] }}
          >
            {task.owner}
          </span>
          {task.dueWeeks > 0 && (
            <span className="text-xs" style={{ color: 'oklch(0.55 0.04 55)' }}>
              {task.dueWeeks}w before launch
            </span>
          )}
          {task.dueWeeks === 0 && (
            <span className="text-xs font-medium" style={{ color: 'oklch(0.55 0.15 27)' }}>
              Launch day
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CampaignDrawer({ campaign, open, onClose }: CampaignDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40"
            style={{ background: 'oklch(0.1 0.04 42 / 0.5)' }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {open && campaign && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 flex flex-col overflow-hidden shadow-2xl"
            style={{
              width: 480,
              background: 'white',
              borderLeft: '1px solid oklch(0.88 0.02 75)',
            }}
          >
            {/* Header */}
            <div
              className="flex-shrink-0 px-6 py-5 relative overflow-hidden"
              style={{ background: campaign.seasonalColor || 'oklch(0.28 0.07 42)' }}
            >
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-8">
                    <div className="text-3xl mb-2">{campaign.emoji}</div>
                    <h2
                      className="text-white text-xl font-semibold leading-tight"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {campaign.name}
                    </h2>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}
                      >
                        {campaign.type}
                      </span>
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}
                      >
                        {campaign.channel === 'both' ? '📘🔍 Meta + Google' : campaign.channel === 'meta' ? '📘 Meta' : '🔍 Google'}
                      </span>
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{
                          background: campaign.priority === 'high' ? 'rgba(239,68,68,0.8)' : campaign.priority === 'medium' ? 'rgba(245,158,11,0.8)' : 'rgba(107,114,128,0.8)',
                          color: 'white',
                        }}
                      >
                        {campaign.priority} priority
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 flex-shrink-0 relative z-[60]"
                    style={{ background: 'rgba(255,255,255,0.25)', color: 'white', border: '1.5px solid rgba(255,255,255,0.4)' }}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {/* Dates */}
              <Section title="Campaign Dates" icon={<Calendar size={16} />}>
                <div className="flex items-center gap-3 text-sm" style={{ color: 'oklch(0.35 0.04 55)' }}>
                  <span className="font-medium">{campaign.startDate}</span>
                  <span style={{ color: 'oklch(0.65 0.04 55)' }}>→</span>
                  <span className="font-medium">{campaign.endDate}</span>
                </div>
              </Section>

              {/* Goal */}
              <Section title="Campaign Goal" icon={<Target size={16} />}>
                <p className="text-sm leading-relaxed" style={{ color: 'oklch(0.35 0.04 55)' }}>
                  {campaign.goal}
                </p>
              </Section>

              {/* Audience + Location */}
              <Section title="Audience & Location" icon={<Users size={16} />}>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Users size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'oklch(0.65 0.04 55)' }} />
                    <span className="text-sm" style={{ color: 'oklch(0.35 0.04 55)' }}>{campaign.targetAudience}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'oklch(0.65 0.04 55)' }} />
                    <span className="text-sm" style={{ color: 'oklch(0.35 0.04 55)' }}>{campaign.location}</span>
                  </div>
                </div>
              </Section>

              {/* Products */}
              <Section title="Products & Platforms" icon={<span>🛍️</span>}>
                <div className="flex flex-wrap gap-2 mb-3">
                  {campaign.productLabels.map(p => (
                    <span
                      key={p}
                      className="text-xs px-2.5 py-1 rounded-full border"
                      style={{ borderColor: 'oklch(0.88 0.02 75)', color: 'oklch(0.35 0.04 55)', background: 'oklch(0.97 0.008 75)' }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {campaign.platforms.map(p => (
                    <span
                      key={p}
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{ background: 'oklch(0.28 0.07 42)', color: 'white' }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </Section>

              {/* Budget & Benchmarks */}
              <Section title="Budget & Performance Targets" icon={<DollarSign size={16} />}>
                <div className="grid grid-cols-2 gap-3">
                  {campaign.monthlyBudget && (
                    <MetricCard
                      label="Monthly Budget"
                      value={campaign.monthlyBudget}
                      color="oklch(0.28 0.07 42)"
                    />
                  )}
                  {campaign.benchmark.outboundCTR && (
                    <MetricCard
                      label="Outbound CTR Target"
                      value={`≥${campaign.benchmark.outboundCTR}%`}
                      sub="Primary KPI"
                      color="oklch(0.55 0.15 145)"
                    />
                  )}
                  {campaign.benchmark.roas && (
                    <MetricCard
                      label="ROAS Target"
                      value={`${campaign.benchmark.roas}x`}
                      color="oklch(0.65 0.12 55)"
                    />
                  )}
                  {campaign.benchmark.cpm && (
                    <MetricCard
                      label="CPM Target"
                      value={`≤CAD $${campaign.benchmark.cpm}`}
                      color="oklch(0.55 0.10 200)"
                    />
                  )}
                  {campaign.benchmark.frequency && (
                    <MetricCard
                      label="Max Frequency"
                      value={`${campaign.benchmark.frequency}x`}
                      color="oklch(0.55 0.08 285)"
                    />
                  )}
                </div>
              </Section>

              {/* Data Insight */}
              {campaign.dataInsight && (
                <Section title="Data Insight (2025 Performance)" icon={<BarChart2 size={16} />}>
                  <div
                    className="rounded-lg p-3 text-sm"
                    style={{ background: 'oklch(0.95 0.015 55)', color: 'oklch(0.28 0.07 42)', borderLeft: '3px solid oklch(0.65 0.12 55)' }}
                  >
                    {campaign.dataInsight}
                  </div>
                </Section>
              )}

              {/* Ad Copy */}
              {campaign.adCopy && (
                <Section title="Ad Copy Direction" icon={<span>✍️</span>}>
                  <div
                    className="rounded-lg p-3 text-sm italic"
                    style={{ background: 'oklch(0.97 0.008 75)', color: 'oklch(0.35 0.04 55)', borderLeft: '3px solid oklch(0.28 0.07 42)' }}
                  >
                    {campaign.adCopy}
                  </div>
                </Section>
              )}

              {/* Creative Ideas */}
              {campaign.creativeIdeas && (
                <Section title="Creative Ideas" icon={<Lightbulb size={16} />}>
                  <p className="text-sm" style={{ color: 'oklch(0.35 0.04 55)' }}>{campaign.creativeIdeas}</p>
                </Section>
              )}

              {/* Assets */}
              <Section title="Required Assets" icon={<span>🎨</span>}>
                <div className="space-y-1.5">
                  {campaign.assets.map((asset, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm" style={{ color: 'oklch(0.35 0.04 55)' }}>
                      <span style={{ color: 'oklch(0.65 0.12 55)' }}>→</span>
                      {asset}
                    </div>
                  ))}
                </div>
              </Section>

              {/* Production Tasks */}
              <Section title="Production Checklist" icon={<CheckSquare size={16} />}>
                <div className="rounded-lg border overflow-hidden" style={{ borderColor: 'oklch(0.88 0.02 75)' }}>
                  {campaign.productionTasks.map(task => (
                    <TaskItem key={task.id} task={task} />
                  ))}
                </div>
              </Section>

              {/* KS Notes */}
              {campaign.ksNotes && (
                <Section title="Strategy Notes" icon={<TrendingUp size={16} />}>
                  <div
                    className="rounded-lg p-3 text-sm"
                    style={{ background: 'oklch(0.97 0.015 200)', color: 'oklch(0.28 0.07 42)', borderLeft: '3px solid oklch(0.55 0.10 200)' }}
                  >
                    {campaign.ksNotes}
                  </div>
                </Section>
              )}

              {/* Notes */}
              {campaign.notes && (
                <Section title="Additional Notes" icon={<AlertCircle size={16} />}>
                  <p className="text-sm leading-relaxed" style={{ color: 'oklch(0.45 0.04 55)' }}>
                    {campaign.notes}
                  </p>
                </Section>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
