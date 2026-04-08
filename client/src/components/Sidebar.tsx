// Sidebar — Sweet Flour Campaign Roadmap
// Design: chocolate brown sidebar (#3D1A0A) + sky blue (#A8DDE9) active state
// Icons: plain single-color lucide icons only

import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, Calendar, ClipboardList, BarChart2, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import type { ViewMode } from "@/pages/Home";

// Brand constants
const BROWN = '#3D1A0A';
const BROWN_LIGHT = '#5A2A14';
const SKY = '#A8DDE9';
const SKY_DARK = '#5BB8CC';
const WHITE = '#FFFFFF';
const WHITE_DIM = 'rgba(255,255,255,0.55)';

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
    icon: <Calendar size={17} strokeWidth={1.8} />,
    description: 'Monthly & quarterly timeline',
  },
  {
    id: 'dashboard',
    label: 'Overview',
    icon: <LayoutGrid size={17} strokeWidth={1.8} />,
    description: 'Campaign summary & KPIs',
  },
  {
    id: 'production',
    label: 'Production Tracker',
    icon: <ClipboardList size={17} strokeWidth={1.8} />,
    description: 'Design & asset deadlines',
  },
  {
    id: 'performance',
    label: 'Performance Data',
    icon: <BarChart2 size={17} strokeWidth={1.8} />,
    description: 'Benchmarks & insights',
  },
];

export default function Sidebar({ collapsed, onToggle, activeView, onViewChange }: SidebarProps) {
  return (
    <motion.aside
      animate={{ width: collapsed ? 60 : 232 }}
      transition={{ duration: 0.22, ease: "easeInOut" }}
      className="relative flex flex-col h-full overflow-hidden flex-shrink-0"
      style={{
        background: BROWN,
        borderRight: `1px solid ${BROWN_LIGHT}`,
      }}
    >
      {/* Logo area */}
      <div
        className="relative flex items-center gap-3 px-3 py-4 border-b"
        style={{ borderColor: BROWN_LIGHT }}
      >
        {/* SF monogram circle */}
        <div
          className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs tracking-wide"
          style={{ background: SKY, color: BROWN }}
        >
          SF
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden"
            >
              <div
                className="text-sm font-semibold leading-tight"
                style={{ fontFamily: "'Playfair Display', serif", color: WHITE }}
              >
                Sweet Flour
              </div>
              <div className="text-xs leading-tight mt-0.5" style={{ color: WHITE_DIM }}>
                Campaign Roadmap
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav items */}
      <nav className="relative flex-1 py-3 space-y-0.5 px-2">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className="w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg transition-all duration-150 text-left"
              style={{
                background: isActive ? SKY : 'transparent',
                color: isActive ? BROWN : WHITE_DIM,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = BROWN_LIGHT;
                  (e.currentTarget as HTMLElement).style.color = WHITE;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = WHITE_DIM;
                }
              }}
            >
              <span
                className="flex-shrink-0"
                style={{ color: isActive ? BROWN : WHITE_DIM }}
              >
                {item.icon}
              </span>
              <AnimatePresence>
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="overflow-hidden min-w-0"
                  >
                    <div
                      className="text-xs font-semibold leading-tight truncate"
                      style={{ color: isActive ? BROWN : WHITE }}
                    >
                      {item.label}
                    </div>
                    {!isActive && (
                      <div
                        className="text-xs leading-tight mt-0.5 truncate"
                        style={{ color: WHITE_DIM, fontSize: '10px' }}
                      >
                        {item.description}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div
        className="relative px-2 pb-3 space-y-0.5 border-t pt-2"
        style={{ borderColor: BROWN_LIGHT }}
      >
        <a
          href="https://www.sweetflour.ca"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all duration-150 text-left"
          style={{ color: WHITE_DIM }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = BROWN_LIGHT;
            (e.currentTarget as HTMLElement).style.color = WHITE;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'transparent';
            (e.currentTarget as HTMLElement).style.color = WHITE_DIM;
          }}
        >
          <ExternalLink size={14} strokeWidth={1.8} className="flex-shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs truncate"
                style={{ color: WHITE_DIM }}
              >
                sweetflour.ca
              </motion.span>
            )}
          </AnimatePresence>
        </a>

        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all duration-150"
          style={{ color: WHITE_DIM }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = BROWN_LIGHT;
            (e.currentTarget as HTMLElement).style.color = WHITE;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'transparent';
            (e.currentTarget as HTMLElement).style.color = WHITE_DIM;
          }}
        >
          {collapsed ? <ChevronRight size={14} strokeWidth={1.8} /> : <ChevronLeft size={14} strokeWidth={1.8} />}
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs"
                style={{ color: WHITE_DIM }}
              >
                Collapse
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
