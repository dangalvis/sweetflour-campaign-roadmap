// DashboardView — Campaign overview + KPIs + seasonal calendar
// Design: Warm Artisan Editorial

import { motion } from "framer-motion";
import { TrendingUp, Target, DollarSign, Zap, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import { allCampaigns, benchmarks, type Campaign } from "@/lib/campaignData";

interface DashboardViewProps {
  onCampaignClick: (c: Campaign) => void;
}

const MONTHLY_PERFORMANCE = [
  { month: 'Jan 25', outboundCTR: 1.02, cpm: 14.2, roas: 8.1, frequency: 1.4 },
  { month: 'Feb 25', outboundCTR: 1.74, cpm: 15.8, roas: 48.1, frequency: 1.5 },
  { month: 'Mar 25', outboundCTR: 1.08, cpm: 14.5, roas: 10.2, frequency: 1.3 },
  { month: 'Apr 25', outboundCTR: 0.81, cpm: 16.1, roas: 7.8, frequency: 1.6 },
  { month: 'May 25', outboundCTR: 0.88, cpm: 17.2, roas: 6.4, frequency: 1.7 },
  { month: 'Jun 25', outboundCTR: 0.90, cpm: 16.8, roas: 5.9, frequency: 1.8 },
  { month: 'Jul 25', outboundCTR: 1.01, cpm: 15.4, roas: 7.2, frequency: 1.5 },
  { month: 'Aug 25', outboundCTR: 1.11, cpm: 15.9, roas: 8.8, frequency: 1.4 },
  { month: 'Sep 25', outboundCTR: 1.37, cpm: 16.3, roas: 9.1, frequency: 1.5 },
  { month: 'Oct 25', outboundCTR: 1.47, cpm: 17.8, roas: 12.4, frequency: 1.6 },
  { month: 'Nov 25', outboundCTR: 1.68, cpm: 20.1, roas: 15.8, frequency: 1.7 },
  { month: 'Dec 25', outboundCTR: 2.04, cpm: 23.4, roas: 21.8, frequency: 1.9 },
  { month: 'Jan 26', outboundCTR: 1.19, cpm: 15.1, roas: 9.2, frequency: 1.4 },
  { month: 'Feb 26', outboundCTR: 1.35, cpm: 16.4, roas: 11.5, frequency: 1.5 },
  { month: 'Mar 26', outboundCTR: 1.28, cpm: 15.8, roas: 10.1, frequency: 1.4 },
];

const SEASONAL_ROAS = [
  { name: "Valentine's", roas: 48.1, ctr: 1.74, color: '#E8637A' },
  { name: 'Holiday/BFCM', roas: 21.8, ctr: 2.04, color: '#2E7D32' },
  { name: 'Easter', roas: 15.1, ctr: 1.16, color: '#7BC47B' },
  { name: 'Thanksgiving', roas: 8.9, ctr: 1.35, color: '#C8813A' },
  { name: 'Halloween', roas: 6.9, ctr: 1.73, color: '#E07B39' },
  { name: "Mother's Day", roas: 4.1, ctr: 1.01, color: '#E8A0BF' },
  { name: "Father's Day", roas: 3.8, ctr: 0.44, color: '#5B8DB8' },
];

function KPICard({ label, value, sub, icon, color, trend }: {
  label: string; value: string; sub: string; icon: React.ReactNode; color: string; trend?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border p-5"
      style={{ borderColor: 'oklch(0.88 0.02 75)', background: 'white' }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${color}22` }}>
          <span style={{ color }}>{icon}</span>
        </div>
        {trend && (
          <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ background: 'oklch(0.95 0.015 145)', color: 'oklch(0.45 0.12 145)' }}>
            {trend}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold mb-1" style={{ color: '#2C1A0E', fontFamily: "'Playfair Display', serif" }}>
        {value}
      </div>
      <div className="text-sm font-medium mb-0.5" style={{ color: 'oklch(0.28 0.07 42)' }}>{label}</div>
      <div className="text-xs" style={{ color: 'oklch(0.55 0.04 55)' }}>{sub}</div>
    </motion.div>
  );
}

function InsightCard({ type, title, body, action }: { type: 'success' | 'warning' | 'info'; title: string; body: string; action?: string }) {
  const colors = {
    success: { bg: 'oklch(0.95 0.015 145)', border: 'oklch(0.55 0.15 145)', icon: <CheckCircle size={16} />, text: 'oklch(0.35 0.12 145)' },
    warning: { bg: 'oklch(0.97 0.02 55)', border: 'oklch(0.65 0.12 55)', icon: <AlertTriangle size={16} />, text: 'oklch(0.45 0.10 55)' },
    info: { bg: 'oklch(0.97 0.01 200)', border: 'oklch(0.55 0.10 200)', icon: <Clock size={16} />, text: 'oklch(0.35 0.10 200)' },
  };
  const c = colors[type];
  return (
    <div className="rounded-lg p-4 border-l-4" style={{ background: c.bg, borderLeftColor: c.border }}>
      <div className="flex items-start gap-2">
        <span style={{ color: c.text, marginTop: 1 }}>{c.icon}</span>
        <div>
          <div className="text-sm font-semibold mb-1" style={{ color: 'oklch(0.22 0.04 55)' }}>{title}</div>
          <div className="text-xs leading-relaxed" style={{ color: 'oklch(0.35 0.04 55)' }}>{body}</div>
          {action && <div className="text-xs font-medium mt-1.5" style={{ color: c.text }}>→ {action}</div>}
        </div>
      </div>
    </div>
  );
}

export default function DashboardView({ onCampaignClick }: DashboardViewProps) {
  const highPriority = allCampaigns.filter(c => c.priority === 'high');
  const upcoming = allCampaigns.filter(c => c.status === 'planned' || c.status === 'in-production');

  return (
    <div className="p-6 space-y-6" style={{ background: 'oklch(0.98 0.008 75)' }}>
      {/* Account KPIs */}
      <div>
        <h2 className="sf-section-title mb-4">Account Performance — Jan 2025 to Mar 2026</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            label="Avg Outbound CTR"
            value="1.13%"
            sub="Prospecting benchmark: ≥1.0% ✓"
            icon={<Target size={20} />}
            color="oklch(0.55 0.15 145)"
            trend="Strong"
          />
          <KPICard
            label="Avg Purchase ROAS"
            value="11.2x"
            sub="Peak: 48x (Valentine's)"
            icon={<TrendingUp size={20} />}
            color="oklch(0.65 0.12 55)"
            trend="Excellent"
          />
          <KPICard
            label="Avg CPM"
            value="CAD $16.36"
            sub="Q4 spike to $23 is seasonal"
            icon={<DollarSign size={20} />}
            color="oklch(0.55 0.10 200)"
          />
          <KPICard
            label="Avg Frequency"
            value="1.62x"
            sub="No account-level saturation"
            icon={<Zap size={20} />}
            color="oklch(0.55 0.08 285)"
            trend="Healthy"
          />
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Outbound CTR trend */}
        <div className="rounded-xl border p-5" style={{ borderColor: 'oklch(0.88 0.02 75)', background: 'white' }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: 'oklch(0.28 0.07 42)', fontFamily: "'Playfair Display', serif" }}>
            Outbound CTR Monthly Trend
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={MONTHLY_PERFORMANCE} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 75)" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'oklch(0.55 0.04 55)' }} />
              <YAxis tick={{ fontSize: 10, fill: 'oklch(0.55 0.04 55)' }} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                formatter={(v: number) => [`${v.toFixed(2)}%`, 'Outbound CTR']}
                contentStyle={{ background: 'oklch(0.22 0.04 55)', border: 'none', borderRadius: 8, color: 'white', fontSize: 12 }}
              />
              {/* Benchmark line */}
              <Line type="monotone" dataKey={() => 1.0} stroke="oklch(0.55 0.15 27)" strokeDasharray="4 4" strokeWidth={1} dot={false} name="Min Benchmark (1.0%)" />
              <Line type="monotone" dataKey="outboundCTR" stroke="oklch(0.65 0.12 55)" strokeWidth={2.5} dot={{ fill: 'oklch(0.65 0.12 55)', r: 3 }} name="Outbound CTR" />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-0.5 rounded" style={{ background: 'oklch(0.65 0.12 55)' }} />
              <span className="text-xs" style={{ color: 'oklch(0.55 0.04 55)' }}>Outbound CTR</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 border-t border-dashed" style={{ borderColor: 'oklch(0.55 0.15 27)' }} />
              <span className="text-xs" style={{ color: 'oklch(0.55 0.04 55)' }}>1.0% benchmark</span>
            </div>
          </div>
        </div>

        {/* Seasonal ROAS */}
        <div className="rounded-xl border p-5" style={{ borderColor: 'oklch(0.88 0.02 75)', background: 'white' }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: 'oklch(0.28 0.07 42)', fontFamily: "'Playfair Display', serif" }}>
            Seasonal ROAS Performance (2025)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={SEASONAL_ROAS} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 75)" />
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: 'oklch(0.55 0.04 55)' }} />
              <YAxis tick={{ fontSize: 10, fill: 'oklch(0.55 0.04 55)' }} tickFormatter={(v) => `${v}x`} />
              <Tooltip
                formatter={(v: number, name: string) => [name === 'roas' ? `${v.toFixed(1)}x` : `${v.toFixed(2)}%`, name === 'roas' ? 'ROAS' : 'Outbound CTR']}
                contentStyle={{ background: 'oklch(0.22 0.04 55)', border: 'none', borderRadius: 8, color: 'white', fontSize: 12 }}
              />
              <Bar dataKey="roas" fill="oklch(0.65 0.12 55)" radius={[4, 4, 0, 0]} name="ROAS" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Insights */}
      <div>
        <h2 className="sf-section-title mb-4">Key Insights & Action Items</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <InsightCard
            type="success"
            title="Valentine's Day = Highest ROAS Window"
            body="2025 Valentine's achieved 48x ROAS and 1.74% Outbound CTR — the single best performing period in the account. Budget allocation should be 20-25% of monthly spend."
            action="Launch Jan 15, 2027 — production starts Nov 2026"
          />
          <InsightCard
            type="success"
            title="Holiday/BFCM = Highest Outbound CTR"
            body="Dec 2025 achieved 2.04% Outbound CTR and 21.77x ROAS. BFCM urgency copy drives the highest click-through rates in the account."
            action="Launch Nov 1, 2026 — creative due Sep 15"
          />
          <InsightCard
            type="warning"
            title="Apr–Jun 2025 Fatigue Window Detected"
            body="Outbound CTR dropped below 1.0% benchmark (0.81–0.90%) during Apr–Jun 2025 while spend held steady. Creative refresh needed for Q2 2026."
            action="Produce new Q2 creative by March 2026"
          />
          <InsightCard
            type="warning"
            title="Father's Day Underperformed (0.44% CTR)"
            body="Father's Day 2025 had the lowest Outbound CTR in the account at 0.44% — well below the 0.7% weak threshold. Creative angle needs a complete rethink."
            action="Research new messaging angle before June 2026"
          />
          <InsightCard
            type="info"
            title="UGC Voice-Over = Top Creative Format"
            body="UGC voice-over content achieved 1.78% Outbound CTR — the highest single-format CTR in the account. Scaling UGC production is the #1 creative recommendation."
            action="Brief 2 new UGC creators for Q2 2026"
          />
          <InsightCard
            type="info"
            title="Add-to-Cart Remarketing Not Yet Running"
            body="The account has generated significant ATC traffic over 15 months but no dedicated remarketing campaign exists. This is the highest-intent audience available."
            action="Launch ATC remarketing by April 15, 2026"
          />
        </div>
      </div>

      {/* Upcoming campaigns */}
      <div>
        <h2 className="sf-section-title mb-4">Upcoming Campaigns</h2>
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'oklch(0.88 0.02 75)' }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: 'oklch(0.28 0.07 42)' }}>
                {['Campaign', 'Launch Date', 'Channel', 'Budget', 'CTR Target', 'ROAS Target', 'Priority'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-white uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {upcoming.map((c, i) => (
                <tr
                  key={c.id}
                  className="border-b cursor-pointer transition-colors"
                  style={{
                    borderColor: 'oklch(0.92 0.01 75)',
                    background: i % 2 === 0 ? 'white' : 'oklch(0.99 0.004 75)',
                  }}
                  onClick={() => onCampaignClick(c)}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'oklch(0.97 0.01 55)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? 'white' : 'oklch(0.99 0.004 75)'; }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span>{c.emoji}</span>
                      <span className="text-sm font-medium" style={{ color: 'oklch(0.28 0.07 42)' }}>{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: 'oklch(0.45 0.04 55)' }}>{c.startDate}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'oklch(0.45 0.04 55)' }}>
                    {c.channel === 'both' ? 'Meta + Google' : c.channel === 'meta' ? 'Meta' : 'Google'}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium" style={{ color: 'oklch(0.28 0.07 42)' }}>{c.monthlyBudget || '—'}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: 'oklch(0.55 0.15 145)' }}>
                    {c.benchmark.outboundCTR ? `≥${c.benchmark.outboundCTR}%` : '—'}
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: 'oklch(0.65 0.12 55)' }}>
                    {c.benchmark.roas ? `${c.benchmark.roas}x` : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-xs px-2 py-1 rounded-full font-medium"
                      style={{
                        background: c.priority === 'high' ? '#FEE2E2' : c.priority === 'medium' ? '#FEF3C7' : '#F3F4F6',
                        color: c.priority === 'high' ? '#DC2626' : c.priority === 'medium' ? '#D97706' : '#6B7280',
                      }}
                    >
                      {c.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
