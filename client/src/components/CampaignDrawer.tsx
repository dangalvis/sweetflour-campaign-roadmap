// CampaignDrawer — Slide-in detail panel for campaign details
// Design: Sweet Flour Brand — Chocolate Brown #3D1A0A + Sky Blue #A8DDE9

import { motion, AnimatePresence } from "framer-motion";
import {
  X, Calendar, Target, DollarSign, Users, MapPin,
  Lightbulb, CheckSquare, BarChart2, TrendingUp, AlertCircle,
  ShoppingBag, Palette, Circle, ArrowRight
} from "lucide-react";
import type { Campaign } from "@/lib/campaignData";

const BRAND = {
  brown: '#3D1A0A',
  skyBlue: '#A8DDE9',
  skyBlueBg: '#EEF9FC',
  skyBlueBorder: '#E4F5F9',
  cream: '#FBF7F2',
  creamBg: '#F8FBFC',
  caramel: '#C8813A',
  muted: '#6B7280',
  mutedLight: '#9CA3AF',
};

interface CampaignDrawerProps {
  campaign: Campaign | null;
  open: boolean;
  onClose: () => void;
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color: BRAND.brown }}>{icon}</span>
        <h3 className="text-sm font-semibold" style={{ color: BRAND.brown, fontFamily: "'Playfair Display', serif" }}>
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function MetricCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div
      className="rounded-lg p-3 border"
      style={{ borderColor: BRAND.skyBlueBorder, background: BRAND.creamBg }}
    >
      <div className="text-xs mb-1" style={{ color: BRAND.muted }}>{label}</div>
      <div
        className="text-lg font-bold"
        style={{ color: color || BRAND.brown, fontFamily: "'Playfair Display', serif" }}
      >
        {value}
      </div>
      {sub && <div className="text-xs mt-0.5" style={{ color: BRAND.mutedLight }}>{sub}</div>}
    </div>
  );
}

function TaskItem({ task }: { task: Campaign['productionTasks'][0] }) {
  const ownerColors: Record<string, string> = {
    design: '#7C3AED',
    media: '#0369A1',
    client: BRAND.caramel,
    production: '#059669',
  };
  const statusDot: Record<string, string> = {
    pending: BRAND.mutedLight,
    'in-progress': '#F59E0B',
    done: '#10B981',
  };

  return (
    <div
      className="flex items-start gap-3 py-2.5 border-b last:border-0"
      style={{ borderColor: BRAND.skyBlueBorder }}
    >
      <span className="mt-1 flex-shrink-0">
        <Circle size={8} fill={statusDot[task.status]} color={statusDot[task.status]} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-sm" style={{ color: BRAND.brown }}>{task.task}</div>
        <div className="flex items-center gap-2 mt-1">
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: `${ownerColors[task.owner]}22`, color: ownerColors[task.owner] }}
          >
            {task.owner}
          </span>
          {task.dueWeeks > 0 && (
            <span className="text-xs" style={{ color: BRAND.muted }}>
              {task.dueWeeks}w before launch
            </span>
          )}
          {task.dueWeeks === 0 && (
            <span className="text-xs font-medium" style={{ color: '#DC2626' }}>
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
            style={{ background: 'rgba(61,26,10,0.45)' }}
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
              borderLeft: `1px solid ${BRAND.skyBlueBorder}`,
            }}
          >
            {/* Header */}
            <div
              className="flex-shrink-0 px-6 py-5 relative overflow-hidden"
              style={{ background: campaign.seasonalColor || BRAND.brown }}
            >
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-8">
                    <h2
                      className="text-white text-xl font-semibold leading-tight"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {campaign.name}
                    </h2>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-medium capitalize"
                        style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}
                      >
                        {campaign.type}
                      </span>
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ background: 'rgba(168,221,233,0.3)', color: 'white' }}
                      >
                        {campaign.channel === 'both' ? 'Meta + Google' : campaign.channel === 'meta' ? 'Meta' : 'Google'}
                      </span>
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-medium capitalize"
                        style={{
                          background: campaign.priority === 'high'
                            ? 'rgba(239,68,68,0.75)'
                            : campaign.priority === 'medium'
                            ? 'rgba(245,158,11,0.75)'
                            : 'rgba(107,114,128,0.75)',
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
                    style={{
                      background: 'rgba(255,255,255,0.25)',
                      color: 'white',
                      border: '1.5px solid rgba(255,255,255,0.4)',
                    }}
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
                <div className="flex items-center gap-3 text-sm" style={{ color: BRAND.brown }}>
                  <span className="font-medium">{campaign.startDate}</span>
                  <ArrowRight size={14} style={{ color: BRAND.caramel }} />
                  <span className="font-medium">{campaign.endDate}</span>
                </div>
              </Section>

              {/* Goal */}
              <Section title="Campaign Goal" icon={<Target size={16} />}>
                <p className="text-sm leading-relaxed" style={{ color: '#4B3728' }}>
                  {campaign.goal}
                </p>
              </Section>

              {/* Audience + Location */}
              <Section title="Audience & Location" icon={<Users size={16} />}>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Users size={14} className="mt-0.5 flex-shrink-0" style={{ color: BRAND.muted }} />
                    <span className="text-sm" style={{ color: '#4B3728' }}>{campaign.targetAudience}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: BRAND.muted }} />
                    <span className="text-sm" style={{ color: '#4B3728' }}>{campaign.location}</span>
                  </div>
                </div>
              </Section>

              {/* Products */}
              <Section title="Products & Platforms" icon={<ShoppingBag size={16} />}>
                <div className="flex flex-wrap gap-2 mb-3">
                  {campaign.productLabels.map(p => (
                    <span
                      key={p}
                      className="text-xs px-2.5 py-1 rounded-full border"
                      style={{ borderColor: BRAND.skyBlueBorder, color: BRAND.brown, background: BRAND.creamBg }}
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
                      style={{ background: BRAND.brown, color: 'white' }}
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
                      color={BRAND.brown}
                    />
                  )}
                  {campaign.benchmark.outboundCTR && (
                    <MetricCard
                      label="Outbound CTR Target"
                      value={`≥${campaign.benchmark.outboundCTR}%`}
                      sub="Primary KPI"
                      color="#059669"
                    />
                  )}
                  {campaign.benchmark.roas && (
                    <MetricCard
                      label="ROAS Target"
                      value={`${campaign.benchmark.roas}x`}
                      color={BRAND.caramel}
                    />
                  )}
                  {campaign.benchmark.cpm && (
                    <MetricCard
                      label="CPM Target"
                      value={`≤CAD $${campaign.benchmark.cpm}`}
                      color="#0369A1"
                    />
                  )}
                  {campaign.benchmark.frequency && (
                    <MetricCard
                      label="Max Frequency"
                      value={`${campaign.benchmark.frequency}x`}
                      color="#7C3AED"
                    />
                  )}
                </div>
              </Section>

              {/* Data Insight */}
              {campaign.dataInsight && (
                <Section title="Data Insight (2025 Performance)" icon={<BarChart2 size={16} />}>
                  <div
                    className="rounded-lg p-3 text-sm"
                    style={{
                      background: BRAND.skyBlueBg,
                      color: BRAND.brown,
                      borderLeft: `3px solid ${BRAND.skyBlue}`,
                    }}
                  >
                    {campaign.dataInsight}
                  </div>
                </Section>
              )}

              {/* Ad Copy */}
              {campaign.adCopy && (
                <Section title="Ad Copy Direction" icon={<Palette size={16} />}>
                  <div
                    className="rounded-lg p-3 text-sm italic"
                    style={{
                      background: BRAND.cream,
                      color: BRAND.brown,
                      borderLeft: `3px solid ${BRAND.brown}`,
                    }}
                  >
                    {campaign.adCopy}
                  </div>
                </Section>
              )}

              {/* Creative Ideas */}
              {campaign.creativeIdeas && (
                <Section title="Creative Ideas" icon={<Lightbulb size={16} />}>
                  <p className="text-sm" style={{ color: '#4B3728' }}>{campaign.creativeIdeas}</p>
                </Section>
              )}

              {/* Assets */}
              <Section title="Required Assets" icon={<CheckSquare size={16} />}>
                <div className="space-y-1.5">
                  {campaign.assets.map((asset, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm" style={{ color: '#4B3728' }}>
                      <ArrowRight size={12} style={{ color: BRAND.caramel, flexShrink: 0 }} />
                      {asset}
                    </div>
                  ))}
                </div>
              </Section>

              {/* Production Tasks */}
              <Section title="Production Checklist" icon={<CheckSquare size={16} />}>
                <div
                  className="rounded-lg border overflow-hidden"
                  style={{ borderColor: BRAND.skyBlueBorder }}
                >
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
                    style={{
                      background: BRAND.skyBlueBg,
                      color: BRAND.brown,
                      borderLeft: `3px solid ${BRAND.skyBlue}`,
                    }}
                  >
                    {campaign.ksNotes}
                  </div>
                </Section>
              )}

              {/* Notes */}
              {campaign.notes && (
                <Section title="Additional Notes" icon={<AlertCircle size={16} />}>
                  <p className="text-sm leading-relaxed" style={{ color: '#4B3728' }}>
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
