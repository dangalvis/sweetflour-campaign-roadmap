// PerformanceView — Performance benchmarks, Google Ads data, Meta data
// Design: Warm Artisan Editorial

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, LineChart, Line } from "recharts";
import { benchmarks, googleCampaigns, metaCampaigns } from "@/lib/campaignData";

const FATIGUE_SIGNALS = [
  { month: 'Jan 25', outboundCTR: 1.02, frequency: 1.4, cpm: 14.2, signal: 'Healthy' },
  { month: 'Feb 25', outboundCTR: 1.74, frequency: 1.5, cpm: 15.8, signal: 'Peak' },
  { month: 'Mar 25', outboundCTR: 1.08, frequency: 1.3, cpm: 14.5, signal: 'Healthy' },
  { month: 'Apr 25', outboundCTR: 0.81, frequency: 1.6, cpm: 16.1, signal: 'Fatigue' },
  { month: 'May 25', outboundCTR: 0.88, frequency: 1.7, cpm: 17.2, signal: 'Fatigue' },
  { month: 'Jun 25', outboundCTR: 0.90, frequency: 1.8, cpm: 16.8, signal: 'Fatigue' },
  { month: 'Jul 25', outboundCTR: 1.01, frequency: 1.5, cpm: 15.4, signal: 'Healthy' },
  { month: 'Aug 25', outboundCTR: 1.11, frequency: 1.4, cpm: 15.9, signal: 'Healthy' },
  { month: 'Sep 25', outboundCTR: 1.37, frequency: 1.5, cpm: 16.3, signal: 'Strong' },
  { month: 'Oct 25', outboundCTR: 1.47, frequency: 1.6, cpm: 17.8, signal: 'Strong' },
  { month: 'Nov 25', outboundCTR: 1.68, frequency: 1.7, cpm: 20.1, signal: 'Peak' },
  { month: 'Dec 25', outboundCTR: 2.04, frequency: 1.9, cpm: 23.4, signal: 'Peak' },
  { month: 'Jan 26', outboundCTR: 1.19, frequency: 1.4, cpm: 15.1, signal: 'Healthy' },
  { month: 'Feb 26', outboundCTR: 1.35, frequency: 1.5, cpm: 16.4, signal: 'Strong' },
  { month: 'Mar 26', outboundCTR: 1.28, frequency: 1.4, cpm: 15.8, signal: 'Healthy' },
];

const SIGNAL_COLORS: Record<string, string> = {
  Fatigue: '#EF4444',
  Healthy: '#10B981',
  Strong: '#3B82F6',
  Peak: '#F59E0B',
};

function BenchmarkRow({ label, value, benchmark, unit, higherIsBetter = true }: {
  label: string; value: number; benchmark: number; unit: string; higherIsBetter?: boolean;
}) {
  const isGood = higherIsBetter ? value >= benchmark : value <= benchmark;
  const pct = higherIsBetter
    ? Math.min(100, (value / (benchmark * 1.5)) * 100)
    : Math.min(100, (benchmark / value) * 100);

  return (
    <div className="py-3 border-b last:border-0" style={{ borderColor: 'oklch(0.92 0.01 75)' }}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium" style={{ color: 'oklch(0.28 0.07 42)' }}>{label}</span>
        <div className="flex items-center gap-3">
          <span className="text-xs" style={{ color: 'oklch(0.55 0.04 55)' }}>Benchmark: {benchmark}{unit}</span>
          <span
            className="text-sm font-bold"
            style={{ color: isGood ? '#059669' : '#DC2626' }}
          >
            {value}{unit}
          </span>
          <span className="text-lg">{isGood ? '✅' : '⚠️'}</span>
        </div>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'oklch(0.92 0.01 75)' }}>
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${pct}%`,
            background: isGood ? '#10B981' : '#EF4444',
          }}
        />
      </div>
    </div>
  );
}

export default function PerformanceView() {
  return (
    <div className="p-6 space-y-6" style={{ background: 'oklch(0.98 0.008 75)' }}>
      {/* Account benchmarks */}
      <div>
        <h2 className="sf-section-title mb-4">📊 Account vs. Benchmarks</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl border p-5" style={{ borderColor: 'oklch(0.88 0.02 75)', background: 'white' }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'oklch(0.28 0.07 42)', fontFamily: "'Playfair Display', serif" }}>
              Meta Ads — Prospecting Benchmarks
            </h3>
            <BenchmarkRow label="Outbound CTR" value={1.13} benchmark={1.0} unit="%" higherIsBetter />
            <BenchmarkRow label="Purchase ROAS" value={11.2} benchmark={4.0} unit="x" higherIsBetter />
            <BenchmarkRow label="CPM" value={16.36} benchmark={20} unit=" CAD" higherIsBetter={false} />
            <BenchmarkRow label="Frequency" value={1.62} benchmark={2.5} unit="x" higherIsBetter={false} />
          </div>

          <div className="rounded-xl border p-5" style={{ borderColor: 'oklch(0.88 0.02 75)', background: 'white' }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'oklch(0.28 0.07 42)', fontFamily: "'Playfair Display', serif" }}>
              CTR Framework — What Each Metric Means
            </h3>
            <div className="space-y-3">
              {[
                { label: '🎯 Outbound CTR (Primary KPI)', desc: 'Clicks that leave Meta to sweetflour.ca. Measures intent + traffic quality. Use for fatigue detection, scaling decisions.', color: '#059669', badge: '1.13% avg' },
                { label: '🔗 Link CTR (Secondary)', desc: 'Clicks on any link including internal Meta links. Slightly inflated vs Outbound CTR. Use for quick directional reads.', color: '#3B82F6', badge: '2.00% avg' },
                { label: '📊 CTR All (Vanity)', desc: 'Includes likes, comment expansions, profile clicks. NOT a performance metric. Do not use for decisions.', color: '#9CA3AF', badge: 'Vanity only' },
              ].map(item => (
                <div key={item.label} className="rounded-lg p-3 border" style={{ borderColor: 'oklch(0.88 0.02 75)', background: 'oklch(0.99 0.004 75)' }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold" style={{ color: 'oklch(0.28 0.07 42)' }}>{item.label}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium text-white" style={{ background: item.color }}>{item.badge}</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'oklch(0.45 0.04 55)' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Creative Fatigue Analysis */}
      <div>
        <h2 className="sf-section-title mb-4">🔥 Creative Fatigue Analysis — Monthly Signals</h2>
        <div className="rounded-xl border p-5" style={{ borderColor: 'oklch(0.88 0.02 75)', background: 'white' }}>
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            {Object.entries(SIGNAL_COLORS).map(([signal, color]) => (
              <div key={signal} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: color }} />
                <span className="text-xs" style={{ color: 'oklch(0.45 0.04 55)' }}>{signal}</span>
              </div>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'oklch(0.97 0.008 75)' }}>
                  {['Month', 'Outbound CTR', 'vs Benchmark', 'CPM', 'Frequency', 'Fatigue Signal'].map(h => (
                    <th key={h} className="text-left px-3 py-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'oklch(0.45 0.04 55)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FATIGUE_SIGNALS.map((row, i) => {
                  const vsB = row.outboundCTR - 1.0;
                  return (
                    <tr key={row.month} className="border-t" style={{ borderColor: 'oklch(0.92 0.01 75)', background: i % 2 === 0 ? 'white' : 'oklch(0.99 0.004 75)' }}>
                      <td className="px-3 py-2.5 font-medium" style={{ color: 'oklch(0.28 0.07 42)' }}>{row.month}</td>
                      <td className="px-3 py-2.5 font-bold" style={{ color: row.outboundCTR >= 1.0 ? '#059669' : '#DC2626' }}>
                        {row.outboundCTR.toFixed(2)}%
                      </td>
                      <td className="px-3 py-2.5 text-xs font-medium" style={{ color: vsB >= 0 ? '#059669' : '#DC2626' }}>
                        {vsB >= 0 ? '+' : ''}{vsB.toFixed(2)}pp
                      </td>
                      <td className="px-3 py-2.5" style={{ color: 'oklch(0.45 0.04 55)' }}>CAD ${row.cpm.toFixed(2)}</td>
                      <td className="px-3 py-2.5" style={{ color: row.frequency >= 2.5 ? '#DC2626' : 'oklch(0.45 0.04 55)' }}>
                        {row.frequency.toFixed(1)}x
                      </td>
                      <td className="px-3 py-2.5">
                        <span
                          className="text-xs px-2.5 py-1 rounded-full font-medium text-white"
                          style={{ background: SIGNAL_COLORS[row.signal] }}
                        >
                          {row.signal}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Google Ads Performance */}
      <div>
        <h2 className="sf-section-title mb-4">🔍 Google Ads — March 2026 Performance</h2>
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'oklch(0.88 0.02 75)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'oklch(0.28 0.07 42)' }}>
                {['Campaign', 'Type', 'Budget/Day', 'Cost', 'CTR', 'Conversions', 'Conv. Value', 'ROAS', 'Status'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-white uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {googleCampaigns.map((c, i) => (
                <tr key={c.name} className="border-t" style={{ borderColor: 'oklch(0.92 0.01 75)', background: i % 2 === 0 ? 'white' : 'oklch(0.99 0.004 75)' }}>
                  <td className="px-4 py-3 font-medium text-xs" style={{ color: 'oklch(0.28 0.07 42)', maxWidth: 200 }}>
                    <div className="truncate" title={c.name}>{c.name}</div>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'oklch(0.45 0.04 55)' }}>{c.type}</td>
                  <td className="px-4 py-3 text-xs font-medium" style={{ color: 'oklch(0.28 0.07 42)' }}>{c.budget}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'oklch(0.45 0.04 55)' }}>CA${c.cost.toFixed(2)}</td>
                  <td className="px-4 py-3 text-xs font-medium" style={{ color: c.ctr >= 1.0 ? '#059669' : '#D97706' }}>{c.ctr.toFixed(2)}%</td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'oklch(0.45 0.04 55)' }}>{c.conversions.toFixed(1)}</td>
                  <td className="px-4 py-3 text-xs font-medium" style={{ color: 'oklch(0.28 0.07 42)' }}>CA${c.convValue.toFixed(2)}</td>
                  <td className="px-4 py-3 text-xs font-bold" style={{ color: c.roas >= 4 ? '#059669' : '#D97706' }}>{c.roas.toFixed(2)}x</td>
                  <td className="px-4 py-3">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: c.status.includes('Limited') ? '#FEF3C7' : '#D1FAE5',
                        color: c.status.includes('Limited') ? '#D97706' : '#059669',
                      }}
                    >
                      {c.status.includes('Limited') ? '⚠️ Limited' : '✅ Eligible'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-3 border-t" style={{ borderColor: 'oklch(0.88 0.02 75)', background: 'oklch(0.97 0.008 75)' }}>
            <div className="flex items-center gap-2 text-xs" style={{ color: 'oklch(0.45 0.04 55)' }}>
              <span className="font-semibold" style={{ color: '#D97706' }}>⚠️ Key Finding:</span>
              3 of 5 campaigns are "Limited by Budget" — increasing daily budgets on Cookie Cakes ($4/day) and Demand Gen ($0.50/day) could unlock significant additional revenue.
              Brand Search campaign shows exceptional 22.2x ROAS at $8.50/day — this is severely underfunded.
            </div>
          </div>
        </div>
      </div>

      {/* Meta Campaigns */}
      <div>
        <h2 className="sf-section-title mb-4">📘 Meta Ads — April 2026 (Current)</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {metaCampaigns.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border p-5"
              style={{ borderColor: 'oklch(0.88 0.02 75)', background: 'white' }}
            >
              <div className="text-sm font-semibold mb-3 leading-tight" style={{ color: 'oklch(0.28 0.07 42)', fontFamily: "'Playfair Display', serif" }}>
                {c.name.replace('Sweet Flour | Conversions | ', '')}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Results', value: c.results, unit: ' purchases' },
                  { label: 'Reach', value: c.reach.toLocaleString(), unit: '' },
                  { label: 'Spend', value: `$${c.spend.toFixed(2)}`, unit: '' },
                  { label: 'Cost/Result', value: `$${c.costPerResult.toFixed(2)}`, unit: '' },
                ].map(item => (
                  <div key={item.label} className="rounded-lg p-2.5" style={{ background: 'oklch(0.97 0.008 75)' }}>
                    <div className="text-xs mb-0.5" style={{ color: 'oklch(0.55 0.04 55)' }}>{item.label}</div>
                    <div className="text-sm font-bold" style={{ color: 'oklch(0.28 0.07 42)' }}>{item.value}{item.unit}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t flex items-center justify-between" style={{ borderColor: 'oklch(0.92 0.01 75)' }}>
                <span className="text-xs" style={{ color: 'oklch(0.55 0.04 55)' }}>Purchase ROAS</span>
                <span className="text-lg font-bold" style={{ color: c.roas >= 4 ? '#059669' : '#D97706', fontFamily: "'Playfair Display', serif" }}>
                  {c.roas.toFixed(2)}x
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Funnel Diagnosis */}
      <div>
        <h2 className="sf-section-title mb-4">🔬 Funnel Diagnosis Framework</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[
            {
              scenario: 'High Outbound CTR + Low CVR',
              meaning: 'Landing page issue',
              description: 'Creative is working — people are clicking. But the website or product page is not converting them. Check page load speed, product descriptions, pricing, and checkout flow.',
              action: 'Audit sweetflour.ca product pages. A/B test landing pages.',
              color: '#F59E0B',
              icon: '🔗',
            },
            {
              scenario: 'Low Outbound CTR + Good CVR',
              meaning: 'Creative issue',
              description: 'The audience is interested when they arrive, but the ad is not compelling enough to generate clicks. Creative refresh needed — new hooks, formats, or angles.',
              action: 'Refresh creative. Test UGC, new hooks, video vs static.',
              color: '#EF4444',
              icon: '🎨',
            },
            {
              scenario: 'Low Both CTR + CVR',
              meaning: 'Full funnel issue',
              description: 'Both the ad and the landing page are underperforming. Could indicate audience mismatch, wrong product-market fit for the campaign, or seasonal fatigue.',
              action: 'Pause and audit. Check audience targeting, product-season fit.',
              color: '#7C3AED',
              icon: '⚠️',
            },
          ].map(item => (
            <div
              key={item.scenario}
              className="rounded-xl border p-5"
              style={{ borderColor: 'oklch(0.88 0.02 75)', background: 'white', borderTop: `3px solid ${item.color}` }}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-sm font-semibold mb-1" style={{ color: 'oklch(0.28 0.07 42)', fontFamily: "'Playfair Display', serif" }}>
                {item.scenario}
              </div>
              <div className="text-xs font-bold mb-2 px-2 py-1 rounded-full inline-block text-white" style={{ background: item.color }}>
                → {item.meaning}
              </div>
              <p className="text-xs leading-relaxed mb-3" style={{ color: 'oklch(0.45 0.04 55)' }}>{item.description}</p>
              <div className="text-xs font-medium p-2.5 rounded-lg" style={{ background: 'oklch(0.97 0.008 75)', color: 'oklch(0.35 0.04 55)' }}>
                <span style={{ color: item.color }}>Action: </span>{item.action}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
