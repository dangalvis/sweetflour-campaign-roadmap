// Sidebar — Sweet Flour Campaign Roadmap
// Design: Warm Artisan Editorial — deep chocolate brown sidebar

import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, Calendar, Wrench, BarChart2, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import type { ViewMode } from "@/pages/Home";

const PATTERN_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663363720526/BjGfUBmPomBGxVYqjKsNt7/sweetflour-seasonal-pattern-nDnb8R8aE8t5fPb6UErzPk.webp";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const navItems: { id: ViewMode; label: string; icon: React.ReactNode; description: string }[] = [
  {
    id: 'roadmap',
    label: 'Campaign Roadmap',
    icon: <Calendar size={18} />,
    description: 'Monthly & quarterly timeline',
  },
  {
    id: 'dashboard',
    label: 'Overview',
    icon: <LayoutGrid size={18} />,
    description: 'Campaign summary & KPIs',
  },
  {
    id: 'production',
    label: 'Production Tracker',
    icon: <Wrench size={18} />,
    description: 'Design & asset deadlines',
  },
  {
    id: 'performance',
    label: 'Performance Data',
    icon: <BarChart2 size={18} />,
    description: 'Benchmarks & insights',
  },
];

export default function Sidebar({ collapsed, onToggle, activeView, onViewChange }: SidebarProps) {
  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="relative flex flex-col h-full overflow-hidden flex-shrink-0"
      style={{
        background: 'oklch(0.25 0.06 42)',
        borderRight: '1px solid oklch(0.35 0.06 42)',
      }}
    >
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url(${PATTERN_URL})`,
          backgroundSize: '200px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Logo area */}
      <div className="relative flex items-center gap-3 px-4 py-5 border-b" style={{ borderColor: 'oklch(0.35 0.06 42)' }}>
        <div
          className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm"
          style={{ background: 'oklch(0.65 0.12 55)' }}
        >
          SF
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden"
            >
              <div className="text-white font-semibold text-sm leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Sweet Flour
              </div>
              <div className="text-xs" style={{ color: 'oklch(0.65 0.04 75)' }}>
                Campaign Roadmap
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav items */}
      <nav className="relative flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group text-left"
              style={{
                background: isActive ? 'oklch(0.65 0.12 55)' : 'transparent',
                color: isActive ? 'white' : 'oklch(0.75 0.04 75)',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = 'oklch(0.32 0.07 42)';
                  (e.currentTarget as HTMLElement).style.color = 'oklch(0.92 0.01 75)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = 'oklch(0.75 0.04 75)';
                }
              }}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <AnimatePresence>
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="overflow-hidden"
                  >
                    <div className="text-sm font-medium leading-tight">{item.label}</div>
                    {!isActive && (
                      <div className="text-xs opacity-60 leading-tight mt-0.5">{item.description}</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="relative px-2 pb-4 space-y-2 border-t pt-3" style={{ borderColor: 'oklch(0.35 0.06 42)' }}>
        <a
          href="https://www.sweetflour.ca"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 text-left"
          style={{ color: 'oklch(0.65 0.04 75)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'oklch(0.32 0.07 42)';
            (e.currentTarget as HTMLElement).style.color = 'oklch(0.92 0.01 75)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'transparent';
            (e.currentTarget as HTMLElement).style.color = 'oklch(0.65 0.04 75)';
          }}
        >
          <ExternalLink size={16} className="flex-shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs"
              >
                sweetflour.ca
              </motion.span>
            )}
          </AnimatePresence>
        </a>

        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150"
          style={{ color: 'oklch(0.55 0.04 75)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'oklch(0.32 0.07 42)';
            (e.currentTarget as HTMLElement).style.color = 'oklch(0.92 0.01 75)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'transparent';
            (e.currentTarget as HTMLElement).style.color = 'oklch(0.55 0.04 75)';
          }}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs"
              >
                Collapse sidebar
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
