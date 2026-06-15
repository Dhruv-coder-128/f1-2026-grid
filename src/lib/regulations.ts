import { Regulation, NewsItem } from '../types';

export const regulations: Regulation[] = [
  {
    id: 'pu-2026',
    title: '50/50 Power Split',
    category: 'Power Unit',
    description: 'The 2026 power units keep the 1.6L V6 turbo but dramatically increase electrical output to 350 kW, while ICE output drops to around 400 kW. The MGU-H is removed; the MGU-K handles recovery and deployment.',
    impact: 'More reliance on electrical power, different energy management strategies, and closer manufacturer competition.',
  },
  {
    id: 'active-aero',
    title: 'Active Aerodynamics',
    category: 'Aerodynamics',
    description: 'Cars switch between high-downforce Z-mode for corners and low-drag X-mode for straits via movable front and rear wing elements. DRS is replaced by a manual override boost system.',
    impact: 'Improved overtaking opportunities, reduced drag on straights, and a new strategic layer to races.',
  },
  {
    id: 'car-size',
    title: 'Smaller & Lighter Cars',
    category: 'Chassis',
    description: 'Maximum wheelbase reduced to 3,400 mm, width to 1,900 mm, and minimum weight cut by ~30 kg to 768 kg. Tyres are also narrower.',
    impact: 'More agile, raceable cars that are easier to follow and overtake.',
  },
  {
    id: 'fuel',
    title: '100% Sustainable Fuels',
    category: 'Sustainability',
    description: 'All power units run on advanced sustainable drop-in fuels, targeting fossil-free racing and improved road-relevance.',
    impact: 'Major step toward F1\'s 2030 net-zero carbon goal while maintaining performance.',
  },
  {
    id: 'adu',
    title: 'ADUO Development',
    category: 'Sporting',
    description: 'Additional Development & Upgrade Opportunities give struggling manufacturers structured extra development time if they fall behind on ICE performance.',
    impact: 'Prevents one manufacturer from dominating while avoiding Balance of Performance.',
  },
  {
    id: 'tyres',
    title: 'C1-C5 Compound Range',
    category: 'Sporting',
    description: 'Pirelli maintains a five-compound slick range from C1 (hardest) to C5 (softest), nominating three compounds per race weekend.',
    impact: 'Strategic variety with tyre management playing a key role in race outcomes.',
  },
];

export const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Hamilton Claims First Ferrari Victory in Barcelona',
    excerpt: 'Lewis Hamilton celebrates his maiden Grand Prix win for Scuderia Ferrari at the Spanish Grand Prix.',
    category: 'Race Report',
    date: '2026-06-14',
  },
  {
    id: '2',
    title: 'Antonelli Leads Championship After Stunning Start',
    excerpt: 'Mercedes rookie Kimi Antonelli holds a commanding 41-point lead after seven rounds of the 2026 season.',
    category: 'Championship',
    date: '2026-06-14',
  },
  {
    id: '3',
    title: 'Cadillac Scores First Points in F1',
    excerpt: 'The American newcomer team continues its learning season with promising pace improvements.',
    category: 'Team News',
    date: '2026-06-10',
  },
  {
    id: '4',
    title: '2026 Regulations Deliver Closer Racing',
    excerpt: 'Early data shows a significant reduction in following-car performance loss compared to 2025.',
    category: 'Technical',
    date: '2026-05-28',
  },
];
