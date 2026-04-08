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
                <ProductionView
                  campaigns={allCampaigns}
                  onCampaignClick={openCampaign}
                />
              )}
              {view === 'performance' && (
                <PerformanceView />
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
