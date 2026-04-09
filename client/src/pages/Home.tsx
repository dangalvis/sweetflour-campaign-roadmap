// ============================================================
// SWEET FLOUR CAMPAIGN ROADMAP — Main Page
// Design: Warm Artisan Editorial
// Layout: Left sidebar nav + Top filter bar + Main content area
// ============================================================

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import RoadmapView from "@/components/RoadmapView";
import CampaignDrawer from "@/components/CampaignDrawer";
import DashboardView from "@/components/DashboardView";
import ProductionView from "@/components/ProductionView";
import PerformanceView from "@/components/PerformanceView";
import { campaigns as allCampaigns, type Campaign } from "@/lib/campaignData";

export type ViewMode = 'roadmap' | 'dashboard' | 'production' | 'performance';
export type TimeView = 'monthly' | 'quarterly';
export type ChannelFilter = 'all' | 'meta' | 'google' | 'both';
export type TypeFilter = 'all' | 'evergreen' | 'seasonal' | 'corporate' | 'remarketing';
export type StatusFilter = 'all' | 'active' | 'planned' | 'in-production' | 'paused';
export type QuarterFilter = 'all' | 'q1' | 'q2' | 'q3' | 'q4';

export default function Home() {
  const [view, setView] = useState<ViewMode>('roadmap');
  const [timeView, setTimeView] = useState<TimeView>('monthly');
  const [channelFilter, setChannelFilter] = useState<ChannelFilter>('all');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [quarterFilter, setQuarterFilter] = useState<QuarterFilter>('all');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCampaigns = useMemo(() => {
    return allCampaigns.filter(c => {
      if (channelFilter !== 'all' && c.channel !== channelFilter && c.channel !== 'both') return false;
      if (typeFilter !== 'all' && c.type !== typeFilter) return false;
      if (statusFilter !== 'all' && c.status !== statusFilter) return false;
      if (quarterFilter !== 'all') {
        const qMap: Record<QuarterFilter, number[]> = {
          all: [], q1: [1, 2, 3], q2: [4, 5, 6], q3: [7, 8, 9], q4: [10, 11, 12]
        };
        const months = qMap[quarterFilter];
        if (!months.includes(c.month) && !months.includes(c.endMonth)) return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!c.name.toLowerCase().includes(q) &&
            !c.goal.toLowerCase().includes(q) &&
            !c.productLabels.join(' ').toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [channelFilter, typeFilter, statusFilter, quarterFilter, searchQuery]);

  const openCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedCampaign(null), 300);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeView={view}
        onViewChange={setView}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <Header
          timeView={timeView}
          onTimeViewChange={setTimeView}
          channelFilter={channelFilter}
          onChannelChange={setChannelFilter}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          quarterFilter={quarterFilter}
          onQuarterChange={setQuarterFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          campaignCount={filteredCampaigns.length}
          totalCampaigns={allCampaigns.length}
        />

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="h-full overflow-auto"
              style={{ height: '100%' }}
            >
              {view === 'roadmap' && (
                <RoadmapView
                  campaigns={filteredCampaigns}
                  timeView={timeView}
                  onCampaignClick={openCampaign}
                />
              )}
              {view === 'dashboard' && (
                <DashboardView onCampaignClick={openCampaign} />
              )}
              {view === 'production' && (
                <div className="relative h-full">
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card px-12 py-10 shadow-xl text-center max-w-sm">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Production Tracker</h3>
                        <p className="mt-1 text-sm text-muted-foreground">This section is currently in progress and will be available soon.</p>
                      </div>
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">Coming Soon</span>
                    </div>
                  </div>
                  <div className="pointer-events-none opacity-20 h-full overflow-auto">
                    <ProductionView campaigns={allCampaigns} onCampaignClick={openCampaign} />
                  </div>
                </div>
              )}
              {view === 'performance' && (
                <div className="relative h-full">
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card px-12 py-10 shadow-xl text-center max-w-sm">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Performance Data</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Benchmarks and insights are being prepared and will be available soon.</p>
                      </div>
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">Coming Soon</span>
                    </div>
                  </div>
                  <div className="pointer-events-none opacity-20 h-full overflow-auto">
                    <PerformanceView />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Campaign Detail Drawer */}
      <CampaignDrawer
        campaign={selectedCampaign}
        open={drawerOpen}
        onClose={closeDrawer}
      />
    </div>
  );
}
