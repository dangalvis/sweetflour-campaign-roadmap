// Header — Sweet Flour Campaign Roadmap
// Design: Warm Artisan Editorial — filter bar + view toggles

import { Search, SlidersHorizontal, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type {
  TimeView, ChannelFilter, TypeFilter, StatusFilter, QuarterFilter
} from "@/pages/Home";

interface HeaderProps {
  timeView: TimeView;
  onTimeViewChange: (v: TimeView) => void;
  channelFilter: ChannelFilter;
  onChannelChange: (v: ChannelFilter) => void;
  typeFilter: TypeFilter;
  onTypeChange: (v: TypeFilter) => void;
  statusFilter: StatusFilter;
  onStatusChange: (v: StatusFilter) => void;
  quarterFilter: QuarterFilter;
  onQuarterChange: (v: QuarterFilter) => void;
  searchQuery: string;
  onSearchChange: (v: string) => void;
  campaignCount: number;
  totalCampaigns: number;
}

const HERO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663363720526/BjGfUBmPomBGxVYqjKsNt7/sweetflour-hero-banner-eqCEuTKbZQxEBpVo2meac3.webp";

function ToggleGroup<T extends string>({
  options, value, onChange, size = 'sm'
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  size?: 'sm' | 'xs';
}) {
  return (
    <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: '#E4F5F9' }}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 transition-all duration-150 font-medium ${size === 'xs' ? 'py-1 text-xs' : 'py-1.5 text-xs'}`}
          style={{
            background: value === opt.value ? '#3D1A0A' : 'white',
            color: value === opt.value ? 'white' : '#6B5744',
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function FilterChip<T extends string>({
  options, value, onChange, label
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs font-medium" style={{ color: '#6B7280' }}>{label}</span>
      <div className="flex gap-1">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className="px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-150 border"
            style={{
              background: value === opt.value ? '#A8DDE9' : 'white',
              color: value === opt.value ? 'white' : '#6B5744',
              borderColor: value === opt.value ? '#A8DDE9' : '#E4F5F9',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Header({
  timeView, onTimeViewChange,
  channelFilter, onChannelChange,
  typeFilter, onTypeChange,
  statusFilter, onStatusChange,
  quarterFilter, onQuarterChange,
  searchQuery, onSearchChange,
  campaignCount, totalCampaigns,
}: HeaderProps) {
  const hasActiveFilters = channelFilter !== 'all' || typeFilter !== 'all' ||
    statusFilter !== 'all' || quarterFilter !== 'all' || searchQuery;

  const clearAll = () => {
    onChannelChange('all');
    onTypeChange('all');
    onStatusChange('all');
    onQuarterChange('all');
    onSearchChange('');
  };

  return (
    <header className="flex-shrink-0 border-b" style={{ borderColor: '#E4F5F9', background: 'white' }}>
      {/* Top bar — title + hero image strip */}
      <div
        className="relative px-6 py-4 flex items-center justify-between overflow-hidden"
        style={{ background: '#3D1A0A' }}
      >
        {/* Background hero image */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${HERO_URL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />
        <div className="relative flex items-center gap-4">
          <div>
            <h1
              className="text-white text-xl font-semibold leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Campaign Roadmap 2026
            </h1>
            <p className="text-xs mt-0.5" style={{ color: '#A8DDE9' }}>
              Kim Gans — Sweet Flour | GTA + Canada | Meta + Google Ads
            </p>
          </div>
          <div className="flex gap-2">
            <span
              className="px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ background: '#A8DDE9', color: 'white' }}
            >
              {campaignCount} campaigns
            </span>
            {hasActiveFilters && (
              <span
                className="px-2.5 py-1 rounded-full text-xs font-medium"
                style={{ background: 'rgba(200,129,58,0.85)', color: 'white' }}
              >
                Filtered
              </span>
            )}
          </div>
        </div>

        <div className="relative flex items-center gap-3">
          {/* Time view toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium" style={{ color: '#A8DDE9' }}>View:</span>
            <ToggleGroup
              options={[
                { value: 'monthly', label: 'Monthly' },
                { value: 'quarterly', label: 'Quarterly' },
              ]}
              value={timeView}
              onChange={onTimeViewChange}
            />
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="px-6 py-3 flex items-center gap-4 flex-wrap" style={{ background: '#F8FBFC' }}>
        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 pr-3 py-1.5 text-xs rounded-lg border outline-none transition-all"
            style={{
              borderColor: '#E4F5F9',
              background: 'white',
              color: '#3D1A0A',
              width: '180px',
            }}
          />
        </div>

        <div className="w-px h-5" style={{ background: '#E4F5F9' }} />

        <FilterChip
          label="Channel:"
          options={[
            { value: 'all', label: 'All' },
            { value: 'meta', label: 'Meta' },
            { value: 'google', label: 'Google' },
            { value: 'both', label: 'Both' },
          ]}
          value={channelFilter}
          onChange={onChannelChange}
        />

        <div className="w-px h-5" style={{ background: '#E4F5F9' }} />

        <FilterChip
          label="Type:"
          options={[
            { value: 'all', label: 'All' },
            { value: 'evergreen', label: 'Evergreen' },
            { value: 'seasonal', label: 'Seasonal' },
            { value: 'corporate', label: 'Corporate' },
            { value: 'remarketing', label: 'Remarketing' },
          ]}
          value={typeFilter}
          onChange={onTypeChange}
        />

        <div className="w-px h-5" style={{ background: '#E4F5F9' }} />

        <FilterChip
          label="Quarter:"
          options={[
            { value: 'all', label: 'All' },
            { value: 'q1', label: 'Q1' },
            { value: 'q2', label: 'Q2' },
            { value: 'q3', label: 'Q3' },
            { value: 'q4', label: 'Q4' },
          ]}
          value={quarterFilter}
          onChange={onQuarterChange}
        />

        <div className="w-px h-5" style={{ background: '#E4F5F9' }} />

        <FilterChip
          label="Status:"
          options={[
            { value: 'all', label: 'All' },
            { value: 'active', label: 'Active' },
            { value: 'in-production', label: 'In Production' },
            { value: 'planned', label: 'Planned' },
            { value: 'paused', label: 'Paused' },
          ]}
          value={statusFilter}
          onChange={onStatusChange}
        />

        {hasActiveFilters && (
          <>
            <div className="w-px h-5" style={{ background: '#E4F5F9' }} />
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-xs font-medium transition-colors"
              style={{ color: '#DC2626' }}
            >
              <X size={12} />
              Clear filters
            </button>
          </>
        )}
      </div>
    </header>
  );
}
