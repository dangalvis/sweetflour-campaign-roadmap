// ============================================================
// SWEET FLOUR CAMPAIGN ROADMAP DATA
// Design: Warm Artisan Editorial
// Channels: Meta (Facebook/Instagram) + Google Ads
// Locations: GTA (Brampton, Markham, Mississauga, Oakville) + Canada
// ============================================================

export type CampaignType = 'evergreen' | 'seasonal' | 'corporate' | 'remarketing';
export type CampaignStatus = 'active' | 'planned' | 'paused' | 'completed' | 'in-production';
export type Channel = 'meta' | 'google' | 'both';
export type Priority = 'high' | 'medium' | 'low';
export type ProductCategory = 'cookies' | 'cupcakes' | 'gift-boxes' | 'corporate' | 'seasonal-special' | 'wedding' | 'all';

export interface ProductionTask {
  id: string;
  task: string;
  owner: 'design' | 'media' | 'client' | 'production';
  dueWeeks: number; // weeks before campaign launch
  status: 'pending' | 'in-progress' | 'done';
}

export interface PerformanceBenchmark {
  outboundCTR?: number;     // % target
  roas?: number;            // x target
  cpm?: number;             // CAD
  frequency?: number;       // x max
  budget?: string;          // CAD range
}

export interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  priority: Priority;
  channel: Channel;
  startDate: string;        // ISO date
  endDate: string;          // ISO date
  products: ProductCategory[];
  productLabels: string[];
  platforms: string[];
  goal: string;
  targetAudience: string;
  location: string;
  adCopy?: string;
  creativeIdeas?: string;
  assets: string[];
  productionTasks: ProductionTask[];
  benchmark: PerformanceBenchmark;
  monthlyBudget?: string;
  notes?: string;
  seasonalColor?: string;
  emoji?: string;
  quarter: 1 | 2 | 3 | 4;
  month: number; // 1-12 (primary month)
  endMonth: number; // 1-12
  year: number;
  ksNotes?: string;
  dataInsight?: string;
}

// ─────────────────────────────────────────────────────────────
// EVERGREEN CAMPAIGNS (Always On)
// ─────────────────────────────────────────────────────────────

export const evergreenCampaigns: Campaign[] = [
  {
    id: 'ev-gifting',
    name: 'Evergreen Gifting',
    type: 'evergreen',
    status: 'active',
    priority: 'high',
    channel: 'both',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    products: ['cookies', 'cupcakes', 'gift-boxes'],
    productLabels: ['Cookie Cakes', 'Gift Boxes', 'Cupcakes (under $20)'],
    platforms: ['Google PMax', 'Google Search', 'Meta'],
    goal: 'Drive consistent year-round gifting revenue — birthdays, thank you, congrats, get well, new baby',
    targetAudience: 'GTA residents 25–55, gift-givers, celebration occasions',
    location: 'GTA + Canada',
    adCopy: '"Make any day sweeter." / "The perfect gift, baked fresh today."',
    creativeIdeas: 'Evergreen product shots, lifestyle gifting scenes, unboxing moments',
    assets: ['Product photography', 'Gift box lifestyle shots', 'Slideshow video', 'UGC voice-over'],
    productionTasks: [
      { id: 'ev-1', task: 'Refresh hero product photography', owner: 'production', dueWeeks: 4, status: 'pending' },
      { id: 'ev-2', task: 'Update UGC voice-over creative (highest CTR format)', owner: 'production', dueWeeks: 3, status: 'pending' },
      { id: 'ev-3', task: 'Review PMax asset groups', owner: 'media', dueWeeks: 1, status: 'in-progress' },
      { id: 'ev-4', task: 'A/B test new ad copy angles', owner: 'media', dueWeeks: 2, status: 'pending' },
    ],
    benchmark: { outboundCTR: 1.0, roas: 8, cpm: 16, frequency: 2.5, budget: 'CAD $1,200–1,500/mo' },
    monthlyBudget: 'CAD $1,200–1,500',
    notes: 'Always-on foundation. Cupcakes Slideshow Video is top performer — maintain. UGC voice-over achieved 1.78% Outbound CTR.',
    seasonalColor: '#3D8B5E',
    emoji: '🎁',
    quarter: 1,
    month: 1,
    endMonth: 12,
    year: 2026,
    dataInsight: 'Account Outbound CTR: 1.13% | Top format: Slideshow Video + UGC | Avg ROAS: 11.2x',
  },
  {
    id: 'ev-corporate',
    name: 'Corporate Gifting — Always On',
    type: 'corporate',
    status: 'active',
    priority: 'high',
    channel: 'both',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    products: ['corporate', 'gift-boxes'],
    productLabels: ['Corporate Boxes', 'Wine + Cookies', 'Desk Drops', 'Custom Orders'],
    platforms: ['Google PMax', 'Meta', 'LinkedIn (test)'],
    goal: 'Acquire corporate accounts for bulk gifting — employee appreciation, client gifts, events',
    targetAudience: 'Business owners, HR managers, executive assistants, GTA companies',
    location: 'GTA + Canada',
    adCopy: '"Impress clients. Reward your team. Order custom cookie gifts."',
    creativeIdeas: 'Corporate gifting page, branded box photography, B2B testimonials',
    assets: ['Corporate gifting page', 'Branded box photos', 'B2B case studies'],
    productionTasks: [
      { id: 'corp-1', task: 'Create corporate gifting landing page', owner: 'client', dueWeeks: 3, status: 'pending' },
      { id: 'corp-2', task: 'Design B2B ad creative set', owner: 'design', dueWeeks: 2, status: 'pending' },
      { id: 'corp-3', task: 'Set up LinkedIn test campaign', owner: 'media', dueWeeks: 2, status: 'pending' },
    ],
    benchmark: { outboundCTR: 0.7, roas: 5, cpm: 20, frequency: 2.0, budget: 'CAD $250–500/mo' },
    monthlyBudget: 'CAD $250–500',
    notes: 'Nov–Dec is peak corporate gifting. LinkedIn test recommended — B2B audience quality higher despite higher CPM.',
    seasonalColor: '#2B6CB0',
    emoji: '🏢',
    quarter: 1,
    month: 1,
    endMonth: 12,
    year: 2026,
    ksNotes: 'Why not LinkedIn? Conventional wisdom says expensive, but B2B cookie gifting is unconventional — test $100/mo.',
  },
  {
    id: 'ev-remarketing',
    name: 'Add-to-Cart Remarketing',
    type: 'remarketing',
    status: 'active',
    priority: 'high',
    channel: 'meta',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    products: ['all'],
    productLabels: ['All Products — Dynamic'],
    platforms: ['Meta (Facebook + Instagram)'],
    goal: 'Re-engage add-to-cart abandoners within 14 days — highest purchase intent audience',
    targetAudience: 'ATC last 14 days, website visitors last 30 days',
    location: 'Canada',
    adCopy: '"Still thinking about it? Your order is waiting." / "Fresh-baked and ready for you."',
    creativeIdeas: 'Dynamic product ads, personalized cookie/cupcake imagery, urgency messaging',
    assets: ['Dynamic product catalog', 'Personalized ad templates', 'Urgency copy variants'],
    productionTasks: [
      { id: 'rem-1', task: 'Set up Meta product catalog', owner: 'media', dueWeeks: 2, status: 'pending' },
      { id: 'rem-2', task: 'Create remarketing ad templates', owner: 'design', dueWeeks: 2, status: 'pending' },
      { id: 'rem-3', task: 'Configure ATC audience (14-day window)', owner: 'media', dueWeeks: 1, status: 'pending' },
    ],
    benchmark: { outboundCTR: 1.5, roas: 15, cpm: 18, frequency: 3.0, budget: 'CAD $300–500/mo' },
    monthlyBudget: 'CAD $300–500',
    notes: 'Account generated 12,868 outbound clicks in 15 months — warm remarketing pool is substantial. Launch ASAP.',
    seasonalColor: '#7B5C3A',
    emoji: '',
    quarter: 1,
    month: 1,
    endMonth: 12,
    year: 2026,
    dataInsight: 'Total ATC events Jan 2025–Mar 2026: significant pool. Remarketing Outbound CTR target: ≥1.5%',
  },
];

// ─────────────────────────────────────────────────────────────
// SEASONAL CAMPAIGNS 2026
// ─────────────────────────────────────────────────────────────

export const seasonalCampaigns: Campaign[] = [
  {
    id: 'easter-2026',
    name: 'Spring Sweetness — Easter 2026',
    type: 'seasonal',
    status: 'in-production',
    priority: 'medium',
    channel: 'both',
    startDate: '2026-03-15',
    endDate: '2026-04-05',
    products: ['cookies', 'cupcakes', 'seasonal-special'],
    productLabels: ['Easter Cupcakes', 'Cookie Boxes', 'Spring Treats'],
    platforms: ['Google PMax', 'Meta'],
    goal: 'Drive Easter treat and gifting orders — families, spring events',
    targetAudience: 'GTA families, gift-givers, 25–50',
    location: 'GTA + Canada',
    adCopy: '"Hop into Easter with our fresh-baked treats." / "Make Easter sweeter."',
    creativeIdeas: 'Easter cupcakes, pastel cookie boxes, spring flat-lay photography',
    assets: ['Easter product photography', 'Spring carousel creative', 'Pastel-themed static ads'],
    productionTasks: [
      { id: 'ea-1', task: 'Easter product photography session', owner: 'production', dueWeeks: 3, status: 'in-progress' },
      { id: 'ea-2', task: 'Design Easter carousel (4 cards)', owner: 'design', dueWeeks: 2, status: 'pending' },
      { id: 'ea-3', task: 'Write Easter ad copy variants (3)', owner: 'media', dueWeeks: 2, status: 'pending' },
      { id: 'ea-4', task: 'Launch campaigns', owner: 'media', dueWeeks: 0, status: 'pending' },
    ],
    benchmark: { outboundCTR: 1.0, roas: 10, cpm: 16, budget: 'CAD $300–500' },
    monthlyBudget: 'CAD $300–500',
    notes: 'Easter 2025 achieved 1.16% Outbound CTR and 15.09x ROAS. Replicate with updated creative.',
    seasonalColor: '#2E9E5B',
    emoji: '🐣',
    quarter: 2,
    month: 3,
    endMonth: 4,
    year: 2026,
    dataInsight: '2025 Easter: Outbound CTR 1.16% | ROAS 15.09x | CPM $16.05',
  },
  {
    id: 'admin-day-2026',
    name: 'Admin Pro Gifting — Admin Day',
    type: 'seasonal',
    status: 'planned',
    priority: 'low',
    channel: 'both',
    startDate: '2026-04-06',
    endDate: '2026-04-30',
    products: ['corporate', 'gift-boxes'],
    productLabels: ['Corporate Assets', 'Gift Boxes'],
    platforms: ['Google', 'Meta'],
    goal: 'Corporate gifting for Administrative Professionals Day',
    targetAudience: 'Business owners, managers, GTA companies',
    location: 'GTA',
    adCopy: '"Thank your team with cookies. Make Admin Day extra sweet."',
    creativeIdeas: 'Corporate assets, desk-drop photography',
    assets: ['Corporate ad creative', 'B2B copy'],
    productionTasks: [
      { id: 'adm-1', task: 'Adapt corporate creative for Admin Day', owner: 'design', dueWeeks: 2, status: 'pending' },
    ],
    benchmark: { outboundCTR: 0.7, roas: 4, budget: 'CAD $100–200' },
    monthlyBudget: 'CAD $100–200',
    notes: 'Small spend, B2B focus. CPM is high on LinkedIn — use Meta B2B targeting instead.',
    seasonalColor: '#D63B6E',
    emoji: '💝',
    quarter: 2,
    month: 4,
    endMonth: 4,
    year: 2026,
    ksNotes: 'Small spend — use existing corporate creative. Why not LinkedIn? Conventional but CPM is high.',
  },
  {
    id: 'sweet-moments-mom-2026',
    name: 'Sweet Moments for Mom — Mother\'s Day',
    type: 'seasonal',
    status: 'planned',
    priority: 'high',
    channel: 'both',
    startDate: '2026-04-20',
    endDate: '2026-05-10',
    products: ['gift-boxes', 'cookies'],
    productLabels: ['Gift Boxes', 'Monogram Cookies', 'Cupcakes'],
    platforms: ['Google', 'Meta'],
    goal: 'Drive Mother\'s Day gifting orders — highest gifting occasion of the year',
    targetAudience: 'Adults 25–55 buying gifts for mothers, GTA + Canada',
    location: 'GTA + Canada',
    adCopy: '"Make Mom\'s day extra sweet." / "Show love with something sweet." / "The perfect gift for the woman who has everything."',
    creativeIdeas: 'Mother\'s Day newsletter creative, gift box carousel, monogram cookie showcase',
    assets: ['Mother\'s Day carousel', 'Gift box photography', 'Monogram cookie close-ups', 'Email newsletter'],
    productionTasks: [
      { id: 'mom-1', task: 'Mother\'s Day product photography', owner: 'production', dueWeeks: 4, status: 'pending' },
      { id: 'mom-2', task: 'Design gift box carousel (5 cards)', owner: 'design', dueWeeks: 3, status: 'pending' },
      { id: 'mom-3', task: 'Write 3 ad copy variants', owner: 'media', dueWeeks: 3, status: 'pending' },
      { id: 'mom-4', task: 'Email newsletter design', owner: 'design', dueWeeks: 2, status: 'pending' },
      { id: 'mom-5', task: 'Launch campaigns', owner: 'media', dueWeeks: 0, status: 'pending' },
    ],
    benchmark: { outboundCTR: 1.0, roas: 8, cpm: 18, budget: 'CAD $600–900' },
    monthlyBudget: 'CAD $600–900',
    notes: 'Start early — April 20 launch. Mother\'s Day 2025: 1.01% Outbound CTR, 4.14x ROAS. Increase budget and creative quality.',
    seasonalColor: '#E05A8A',
    emoji: '💐',
    quarter: 2,
    month: 4,
    endMonth: 5,
    year: 2026,
    dataInsight: '2025 Mother\'s Day: Outbound CTR 1.01% | ROAS 4.14x | Budget was underfunded',
  },
  {
    id: 'celebrate-success-2026',
    name: 'Celebrate Success — Graduation & Year-End',
    type: 'seasonal',
    status: 'planned',
    priority: 'medium',
    channel: 'both',
    startDate: '2026-05-15',
    endDate: '2026-06-15',
    products: ['cookies', 'gift-boxes'],
    productLabels: ['Grad Packs', 'Cookie Cakes', 'Custom Cookies'],
    platforms: ['Google', 'Meta'],
    goal: 'Capture graduation gifting — university, high school, professional milestones',
    targetAudience: 'Parents of graduates, GTA families, 35–60',
    location: 'GTA',
    adCopy: '"Celebrate grads with custom cookies." / "Cookies + milestone = perfect combo."',
    creativeIdeas: 'Graduation-themed cookie photography, custom message cookies',
    assets: ['Grad cookie photography', 'Custom cookie showcase', 'Grad creative'],
    productionTasks: [
      { id: 'grad-1', task: 'Grad product photography', owner: 'production', dueWeeks: 4, status: 'pending' },
      { id: 'grad-2', task: 'Design grad ad creative', owner: 'design', dueWeeks: 3, status: 'pending' },
      { id: 'grad-3', task: 'Must miss May gap — CPC is high on LinkedIn', owner: 'media', dueWeeks: 2, status: 'pending' },
    ],
    benchmark: { outboundCTR: 0.8, roas: 6, budget: 'CAD $300–500' },
    monthlyBudget: 'CAD $300–500',
    notes: 'Also consider university graduations and teacher appreciation. Must not miss May gap (CPC is high in May 2025 data).',
    seasonalColor: '#C8912A',
    emoji: '🎓',
    quarter: 2,
    month: 5,
    endMonth: 6,
    year: 2026,
    ksNotes: 'Also target university graduations and late enough for regular school. Also consider teacher appreciation gifts.',
  },
  {
    id: 'dad-deserves-2026',
    name: 'Dad Deserves It — Father\'s Day',
    type: 'seasonal',
    status: 'planned',
    priority: 'medium',
    channel: 'both',
    startDate: '2026-06-01',
    endDate: '2026-06-15',
    products: ['cookies', 'gift-boxes'],
    productLabels: ['Cookie Boxes', 'Bundles'],
    platforms: ['Google', 'Meta'],
    goal: 'Father\'s Day gifting — cookies and bundles for dads',
    targetAudience: 'Adults buying gifts for fathers, GTA',
    location: 'GTA',
    adCopy: '"Make Dad smile." / "Cookies + Dad = perfect combo."',
    creativeIdeas: 'Father\'s Day newsletter, masculine cookie box photography',
    assets: ['Father\'s Day newsletter', 'Cookie box photography'],
    productionTasks: [
      { id: 'dad-1', task: 'Father\'s Day creative adaptation', owner: 'design', dueWeeks: 2, status: 'pending' },
      { id: 'dad-2', task: 'Newsletter design', owner: 'design', dueWeeks: 2, status: 'pending' },
    ],
    benchmark: { outboundCTR: 0.7, roas: 5, budget: 'CAD $200' },
    monthlyBudget: 'CAD $200',
    notes: 'Father\'s Day 2025 had low Outbound CTR (0.44%) — refresh creative angle. Consider "Dad\'s sweet tooth" messaging.',
    seasonalColor: '#2B7CB0',
    emoji: '👨',
    quarter: 2,
    month: 6,
    endMonth: 6,
    year: 2026,
    dataInsight: '2025 Father\'s Day: Outbound CTR 0.44% (below benchmark) — creative refresh needed',
    ksNotes: 'Would do some market research into this — what messaging resonates for Father\'s Day cookie gifting?',
  },
  {
    id: 'wedding-summer-2026',
    name: 'Wedding Focus — Summer Wedding Season',
    type: 'seasonal',
    status: 'planned',
    priority: 'medium',
    channel: 'both',
    startDate: '2026-07-01',
    endDate: '2026-08-31',
    products: ['wedding', 'gift-boxes'],
    productLabels: ['Trays', 'Desk Drops', 'Wedding Orders', 'DIY Kits'],
    platforms: ['Google', 'Meta'],
    goal: 'Capture wedding dessert table and favor orders — GTA wedding season',
    targetAudience: 'Engaged couples, wedding planners, GTA brides 25–40',
    location: 'GTA',
    adCopy: '"Cookies for every celebration." / "Elevate your wedding dessert table."',
    creativeIdeas: 'Wedding dessert table photography, DIY kit showcase, bridal aesthetic',
    assets: ['Wedding dessert table photos', 'DIY kit photography', 'Bridal-themed creative'],
    productionTasks: [
      { id: 'wed-1', task: 'Wedding dessert table photography', owner: 'production', dueWeeks: 6, status: 'pending' },
      { id: 'wed-2', task: 'Design wedding-themed carousel', owner: 'design', dueWeeks: 4, status: 'pending' },
      { id: 'wed-3', task: 'Research GTA wedding show opportunities', owner: 'client', dueWeeks: 8, status: 'pending' },
    ],
    benchmark: { outboundCTR: 0.8, roas: 5, budget: 'CAD $200–400/mo' },
    monthlyBudget: 'CAD $200–400',
    notes: 'Wedding season is big in GTA. Also consider bridal show advertising. 2025 data: 1.11% Outbound CTR, 4.96x ROAS.',
    seasonalColor: '#7B5EA7',
    emoji: '💍',
    quarter: 3,
    month: 7,
    endMonth: 8,
    year: 2026,
    dataInsight: '2025 Wedding: Outbound CTR 1.11% | ROAS 4.96x | GTA wedding market is large',
    ksNotes: 'Cookies for wedding celebration. In TO, the big bridal show happens in August — consider event advertising.',
  },
  {
    id: 'back-to-school-2026',
    name: 'Back-to-School Sweetness',
    type: 'seasonal',
    status: 'planned',
    priority: 'low',
    channel: 'both',
    startDate: '2026-09-01',
    endDate: '2026-09-30',
    products: ['cookies', 'gift-boxes'],
    productLabels: ['Snack Packs', 'Baby Gifts', 'Teacher Gifts'],
    platforms: ['Google', 'Meta'],
    goal: 'Back-to-school treats — teacher gifts, snack packs, new baby celebrations',
    targetAudience: 'Parents, GTA families, 28–45',
    location: 'GTA',
    adCopy: '"Start the school year sweet." / "Teacher gifts they\'ll actually love."',
    creativeIdeas: 'Back-to-school themed cookies, teacher gift packaging',
    assets: ['Back-to-school creative', 'Teacher gift photography'],
    productionTasks: [
      { id: 'bts-1', task: 'Back-to-school creative', owner: 'design', dueWeeks: 2, status: 'pending' },
    ],
    benchmark: { outboundCTR: 0.8, roas: 5, budget: 'CAD $200–300' },
    monthlyBudget: 'CAD $200–300',
    notes: 'Sept and Jan are just-passed seasonal anchor points. Back-to-school is a good teacher gift angle.',
    seasonalColor: '#D4881E',
    emoji: '🎒',
    quarter: 3,
    month: 9,
    endMonth: 9,
    year: 2026,
    ksNotes: 'Back-to-school expert just-passed seasonal anchor. Sept + Jan are the two big ones.',
  },
  {
    id: 'grateful-gifting-2026',
    name: 'Grateful Gifting — Thanksgiving',
    type: 'seasonal',
    status: 'planned',
    priority: 'medium',
    channel: 'both',
    startDate: '2026-09-25',
    endDate: '2026-10-12',
    products: ['cookies', 'gift-boxes', 'seasonal-special'],
    productLabels: ['Signature Cookie Gift Box', 'Apple Pookie', 'Thanksgiving Cookies'],
    platforms: ['Google PMax', 'Meta'],
    goal: 'Thanksgiving gifting and entertaining — Canadian Thanksgiving October 13',
    targetAudience: 'GTA families, host gifts, 28–55',
    location: 'GTA + Canada',
    adCopy: '"Share cookies, share gratitude." / "Thanksgiving treats, made with love."',
    creativeIdeas: 'Apple Pookie Reel (proven high CTR), Thanksgiving cookie box, warm autumn photography',
    assets: ['Apple Pookie Reel (reuse/refresh)', 'Thanksgiving cookie photography', 'Autumn flat-lay'],
    productionTasks: [
      { id: 'tg-1', task: 'Refresh Apple Pookie Reel (top performer)', owner: 'production', dueWeeks: 4, status: 'pending' },
      { id: 'tg-2', task: 'Thanksgiving cookie photography', owner: 'production', dueWeeks: 3, status: 'pending' },
      { id: 'tg-3', task: 'Design Thanksgiving carousel', owner: 'design', dueWeeks: 2, status: 'pending' },
    ],
    benchmark: { outboundCTR: 1.0, roas: 9, cpm: 17, budget: 'CAD $400–600' },
    monthlyBudget: 'CAD $400–600',
    notes: 'Thanksgiving 2025: 1.35% Outbound CTR, 8.92x ROAS. Apple Pookie Reel was the top performer — refresh and relaunch.',
    seasonalColor: '#B86A20',
    emoji: '🍂',
    quarter: 4,
    month: 9,
    endMonth: 10,
    year: 2026,
    dataInsight: '2025 Thanksgiving: Outbound CTR 1.35% | ROAS 8.92x | Apple Pookie Reel = top creative',
  },
  {
    id: 'spooky-sweet-2026',
    name: 'Spooky Sweet — Halloween',
    type: 'seasonal',
    status: 'planned',
    priority: 'low',
    channel: 'both',
    startDate: '2026-10-10',
    endDate: '2026-10-31',
    products: ['cookies', 'seasonal-special', 'gift-boxes'],
    productLabels: ['Ghost Cookie Boxes', 'Spooky Cupcakes', 'Halloween Gift Boxes'],
    platforms: ['Google PMax', 'Meta'],
    goal: 'Halloween treat orders — parties, gifting, seasonal fun',
    targetAudience: 'GTA families, party planners, 25–45',
    location: 'GTA',
    adCopy: '"Trick or treat — mostly treat." / "Spooky cookies for your Halloween party."',
    creativeIdeas: 'Halloween Reels, ghost cookie close-ups, spooky gift box photography',
    assets: ['Halloween Reel', 'Ghost cookie photography', 'Spooky gift box shots'],
    productionTasks: [
      { id: 'hw-1', task: 'Halloween product photography', owner: 'production', dueWeeks: 3, status: 'pending' },
      { id: 'hw-2', task: 'Halloween Reel production', owner: 'production', dueWeeks: 2, status: 'pending' },
    ],
    benchmark: { outboundCTR: 0.8, roas: 7, budget: 'CAD $200–400' },
    monthlyBudget: 'CAD $200–400',
    notes: 'Halloween 2025: 1.73% Outbound CTR — strong seasonal performer. Mostly static, update with new creative.',
    seasonalColor: '#D45A1A',
    emoji: '🎃',
    quarter: 4,
    month: 10,
    endMonth: 10,
    year: 2026,
    dataInsight: '2025 Halloween: Outbound CTR 1.73% | ROAS 6.85x | Strong seasonal performer',
  },
  {
    id: 'holiday-cheer-2026',
    name: 'Holiday Cheer — BFCM + Christmas',
    type: 'seasonal',
    status: 'planned',
    priority: 'high',
    channel: 'both',
    startDate: '2026-11-01',
    endDate: '2026-12-24',
    products: ['gift-boxes', 'cookies', 'cupcakes', 'corporate'],
    productLabels: ['Gift Boxes', 'Custom Cookies', 'Corporate Orders', 'Holiday Bundles'],
    platforms: ['Google PMax', 'Meta'],
    goal: 'Maximum holiday revenue — BFCM deals + Christmas gifting. Highest spend period of the year.',
    targetAudience: 'GTA + Canada, gift-givers, corporate buyers, 25–60',
    location: 'GTA + Canada',
    adCopy: '"Start the year with fresh-baked cookies delivered." / "The gift of sweet perfection." / "Limited-time holiday deals."',
    creativeIdeas: 'Holiday carousel, BFCM promo creative, corporate gift box photography, Christmas lifestyle shots',
    assets: ['Holiday carousel (5 cards)', 'BFCM promo static', 'Corporate holiday creative', 'Christmas lifestyle video'],
    productionTasks: [
      { id: 'hol-1', task: 'Holiday product photography session', owner: 'production', dueWeeks: 6, status: 'pending' },
      { id: 'hol-2', task: 'BFCM promo creative (discount/urgency copy)', owner: 'design', dueWeeks: 5, status: 'pending' },
      { id: 'hol-3', task: 'Christmas carousel design (5 cards)', owner: 'design', dueWeeks: 4, status: 'pending' },
      { id: 'hol-4', task: 'Corporate holiday gift creative', owner: 'design', dueWeeks: 4, status: 'pending' },
      { id: 'hol-5', task: 'Holiday video production', owner: 'production', dueWeeks: 5, status: 'pending' },
      { id: 'hol-6', task: 'Set up BFCM campaign structure', owner: 'media', dueWeeks: 3, status: 'pending' },
      { id: 'hol-7', task: 'Weekly creative refresh schedule', owner: 'media', dueWeeks: 0, status: 'pending' },
    ],
    benchmark: { outboundCTR: 1.0, roas: 15, cpm: 22, budget: 'CAD $2,200–3,500' },
    monthlyBudget: 'CAD $2,200–3,500',
    notes: 'HIGHEST PRIORITY. Holiday/BFCM: 2.04% Outbound CTR (best in account), 21x ROAS. Dec 2025: 21.77x ROAS. Launch Nov 1. Weekly creative refresh. Monitor Outbound CTR weekly — refresh any ad below 0.7% immediately.',
    seasonalColor: '#1A7A3A',
    emoji: '🎄',
    quarter: 4,
    month: 11,
    endMonth: 12,
    year: 2026,
    dataInsight: 'BFCM/Holiday: Outbound CTR 2.04% (account best) | Dec 2025 ROAS: 21.77x | Highest revenue period',
  },
  {
    id: 'new-year-2027',
    name: 'New Year, New Treats',
    type: 'seasonal',
    status: 'planned',
    priority: 'low',
    channel: 'both',
    startDate: '2026-12-26',
    endDate: '2027-01-15',
    products: ['gift-boxes', 'cookies'],
    productLabels: ['Gift Boxes', 'Everyday Gifting'],
    platforms: ['Google', 'Meta'],
    goal: 'Post-holiday + New Year gifting — bridge to evergreen',
    targetAudience: 'GTA, 25–50',
    location: 'GTA + Canada',
    adCopy: '"Start the new year with something sweet." / "Fresh-baked cookies, delivered to your door."',
    creativeIdeas: 'Jan creative (evergreen anchor), New Year lifestyle photography',
    assets: ['New Year creative', 'Evergreen product shots'],
    productionTasks: [
      { id: 'ny-1', task: 'New Year creative adaptation', owner: 'design', dueWeeks: 2, status: 'pending' },
    ],
    benchmark: { outboundCTR: 0.8, roas: 6, budget: 'CAD $100–200' },
    monthlyBudget: 'CAD $100–200',
    notes: 'Also target the concept of "treat yourself" for someone on your list. Evergreen anchor for January.',
    seasonalColor: '#6B4FAA',
    emoji: '🥂',
    quarter: 4,
    month: 12,
    endMonth: 1,
    year: 2026,
  },
  {
    id: 'valentine-2027',
    name: 'Sweet Love — Valentine\'s Day 2027',
    type: 'seasonal',
    status: 'planned',
    priority: 'high',
    channel: 'both',
    startDate: '2027-01-15',
    endDate: '2027-02-13',
    products: ['gift-boxes', 'cookies', 'cupcakes'],
    productLabels: ['Monogram Cookies', 'Gift Boxes', 'Cupcakes', 'Valentine\'s Collection'],
    platforms: ['Google PMax', 'Meta'],
    goal: 'Valentine\'s Day gifting — HIGHEST ROAS window in the account (48x in 2025)',
    targetAudience: 'Adults 22–50, couples, self-treat, GTA + Canada',
    location: 'GTA + Canada',
    adCopy: '"Show love with something sweet." / "The sweetest Valentine\'s gift." / "Gift the sweetest treat."',
    creativeIdeas: 'Valentine\'s newsletter, gift box carousel, monogram heart cookies, romantic lifestyle photography',
    assets: ['Valentine\'s carousel (5 cards)', 'Heart cookie photography', 'Gift box lifestyle shots', 'Email newsletter'],
    productionTasks: [
      { id: 'val-1', task: 'Valentine\'s product photography (Dec)', owner: 'production', dueWeeks: 8, status: 'pending' },
      { id: 'val-2', task: 'Valentine\'s carousel design (5 cards)', owner: 'design', dueWeeks: 6, status: 'pending' },
      { id: 'val-3', task: 'Write 3 copy variants (gifting, self-treat, couple)', owner: 'media', dueWeeks: 5, status: 'pending' },
      { id: 'val-4', task: 'Email newsletter design', owner: 'design', dueWeeks: 4, status: 'pending' },
      { id: 'val-5', task: 'Launch campaigns Jan 15', owner: 'media', dueWeeks: 0, status: 'pending' },
    ],
    benchmark: { outboundCTR: 1.0, roas: 30, cpm: 18, budget: 'CAD $800–1,200' },
    monthlyBudget: 'CAD $800–1,200',
    notes: 'HIGHEST ROAS WINDOW. Valentine\'s 2025: 1.74% Outbound CTR, 48.06x ROAS. Allocate 20-25% of monthly budget. Start Jan 15. Test 3 angles: gifting, self-treat, couple.',
    seasonalColor: '#C8344A',
    emoji: '💝',
    quarter: 1,
    month: 1,
    endMonth: 2,
    year: 2027,
    dataInsight: '2025 Valentine\'s: Outbound CTR 1.74% | ROAS 48.06x | HIGHEST ROAS in account',
  },
];

// ─────────────────────────────────────────────────────────────
// ALL CAMPAIGNS COMBINED
// ─────────────────────────────────────────────────────────────

export const allCampaigns: Campaign[] = [...evergreenCampaigns, ...seasonalCampaigns];

// ─────────────────────────────────────────────────────────────
// QUARTERLY BUDGET SUMMARY
// ─────────────────────────────────────────────────────────────

export const quarterlyBudgets = {
  q1: { label: 'Q1 2026', months: ['Jan', 'Feb', 'Mar'], budget: 'CAD $3,600–4,500', focus: 'Valentine\'s + Evergreen', roas: '48x (Valentine\'s peak)' },
  q2: { label: 'Q2 2026', months: ['Apr', 'May', 'Jun'], budget: 'CAD $3,200–4,200', focus: 'Easter + Mother\'s Day + Graduation', roas: '8–15x' },
  q3: { label: 'Q3 2026', months: ['Jul', 'Aug', 'Sep'], budget: 'CAD $2,800–3,800', focus: 'Wedding Season + Back-to-School + Thanksgiving', roas: '5–9x' },
  q4: { label: 'Q4 2026', months: ['Oct', 'Nov', 'Dec'], budget: 'CAD $4,500–6,000', focus: 'Halloween + BFCM + Holiday (PEAK)', roas: '15–22x' },
};

// ─────────────────────────────────────────────────────────────
// PRODUCTION CALENDAR — Key Deadlines
// ─────────────────────────────────────────────────────────────

export const productionDeadlines = [
  { date: '2026-03-01', event: 'Easter creative due', campaign: 'easter-2026', type: 'design' },
  { date: '2026-03-15', event: 'Easter campaign launch', campaign: 'easter-2026', type: 'launch' },
  { date: '2026-04-01', event: 'Mother\'s Day creative due', campaign: 'sweet-moments-mom-2026', type: 'design' },
  { date: '2026-04-20', event: 'Mother\'s Day campaign launch', campaign: 'sweet-moments-mom-2026', type: 'launch' },
  { date: '2026-04-15', event: 'ATC Remarketing launch', campaign: 'ev-remarketing', type: 'launch' },
  { date: '2026-05-01', event: 'Graduation creative due', campaign: 'celebrate-success-2026', type: 'design' },
  { date: '2026-05-15', event: 'Graduation campaign launch', campaign: 'celebrate-success-2026', type: 'launch' },
  { date: '2026-06-01', event: 'Father\'s Day campaign launch', campaign: 'dad-deserves-2026', type: 'launch' },
  { date: '2026-06-15', event: 'Wedding creative due', campaign: 'wedding-summer-2026', type: 'design' },
  { date: '2026-07-01', event: 'Wedding campaign launch', campaign: 'wedding-summer-2026', type: 'launch' },
  { date: '2026-08-25', event: 'Thanksgiving creative due', campaign: 'grateful-gifting-2026', type: 'design' },
  { date: '2026-09-25', event: 'Thanksgiving campaign launch', campaign: 'grateful-gifting-2026', type: 'launch' },
  { date: '2026-10-01', event: 'Halloween creative due', campaign: 'spooky-sweet-2026', type: 'design' },
  { date: '2026-10-10', event: 'Halloween campaign launch', campaign: 'spooky-sweet-2026', type: 'launch' },
  { date: '2026-09-15', event: 'Holiday/BFCM creative due', campaign: 'holiday-cheer-2026', type: 'design' },
  { date: '2026-11-01', event: 'Holiday/BFCM campaign launch', campaign: 'holiday-cheer-2026', type: 'launch' },
  { date: '2026-11-15', event: 'Valentine\'s 2027 creative production starts', campaign: 'valentine-2027', type: 'production' },
  { date: '2027-01-15', event: 'Valentine\'s 2027 campaign launch', campaign: 'valentine-2027', type: 'launch' },
];

// ─────────────────────────────────────────────────────────────
// PERFORMANCE BENCHMARKS REFERENCE
// ─────────────────────────────────────────────────────────────

export const benchmarks = {
  outboundCTR: {
    prospecting: { strong: 1.0, acceptable: 0.7, weak: 0 },
    remarketing: { strong: 1.5, acceptable: 1.0, weak: 0 },
  },
  accountAvg: {
    outboundCTR: 1.13,
    ctrAll: 2.00,
    cpm: 16.36,
    frequency: 1.62,
    roas: 11.20,
    totalSpend: 18557.71,
  },
  seasonal: {
    valentine: { outboundCTR: 1.74, roas: 48.06 },
    holiday: { outboundCTR: 2.04, roas: 21.05 },
    halloween: { outboundCTR: 1.73, roas: 6.85 },
    ugc: { outboundCTR: 1.78, roas: 8.35 },
    thanksgiving: { outboundCTR: 1.35, roas: 8.92 },
    easter: { outboundCTR: 1.16, roas: 15.09 },
  },
};

// ─────────────────────────────────────────────────────────────
// GOOGLE ADS CAMPAIGNS (from screenshot)
// ─────────────────────────────────────────────────────────────

export const googleCampaigns = [
  { name: 'PMax | Cookies | Canada | Max Conv Value', type: 'Performance Max', budget: 'CA$35/day', status: 'Eligible', cost: 720.65, impressions: 75864, clicks: 1374, ctr: 1.81, conversions: 69.56, convValue: 4529.84, roas: 6.29, cpc: 10.36 },
  { name: 'Search | Brand | GTA | Max Conv Value', type: 'Search', budget: 'CA$8.50/day', status: 'Eligible (Limited)', cost: 213.48, impressions: 1062, clicks: 364, ctr: 34.27, conversions: 45.53, convValue: 4739.20, roas: 22.20, cpc: 4.69 },
  { name: 'PMax | Cookie Cakes | GTA | Max Conv Value', type: 'Performance Max', budget: 'CA$4/day', status: 'Limited by Budget', cost: 339.81, impressions: 34424, clicks: 655, ctr: 1.90, conversions: 34.01, convValue: 1698.18, roas: 5.00, cpc: 9.99 },
  { name: 'PMax | Cupcakes | GTA | Max Conv Value', type: 'Performance Max', budget: 'CA$12/day', status: 'Eligible', cost: 289.58, impressions: 53527, clicks: 1284, ctr: 2.40, conversions: 27.27, convValue: 3111.70, roas: 10.75, cpc: 10.62 },
  { name: 'Demand Gen | Remarketing | Canada | Max Conv.', type: 'Demand Gen', budget: 'CA$0.50/day', status: 'Limited by Budget', cost: 94.15, impressions: 28825, clicks: 908, ctr: 3.15, conversions: 3.20, convValue: 406.31, roas: 4.32, cpc: 29.41 },
];

// ─────────────────────────────────────────────────────────────
// META CAMPAIGNS (from screenshot)
// ─────────────────────────────────────────────────────────────

export const metaCampaigns = [
  { name: 'Sweet Flour | Conversions | Cookies Campaign', results: 10, reach: 5125, impressions: 15990, costPerResult: 20.81, spend: 208.15, roas: 2.74 },
  { name: 'Sweet Flour | Conversions | Cupcakes Campaign', results: 2, reach: 3202, impressions: 5573, costPerResult: 39.24, spend: 78.49, roas: 3.13 },
  { name: 'Sweet Flour | Conversions | Seasonal Promos', results: 1, reach: 1117, impressions: 1489, costPerResult: 23.58, spend: 23.58, roas: 2.49 },
];
