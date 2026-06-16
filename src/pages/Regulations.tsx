import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import { Zap, Gauge, Wind, Fuel, Cpu, Trophy, Scale, Settings, ChevronRight, ArrowRight, Globe, TrendingUp, Users, Leaf } from 'lucide-react';

const regulations = [
  {
    icon: Zap,
    title: 'Power Unit Revolution',
    stat: '50/50 Split',
    desc: 'The 2026 power units produce roughly equal power from the 1.6L V6 turbo ICE (~400kW) and the upgraded electric motor (~350kW). The MGU-H is removed, while the MGU-K handles both drive and recuperation.',
    image: '/REGULATIONS/power-unit.jpeg',
  },
  {
    icon: Scale,
    title: 'Smaller & Lighter Cars',
    stat: '768 kg',
    desc: 'Cars are significantly smaller with a maximum wheelbase of 3,400mm and width of 1,900mm. Minimum weight drops by around 30kg to improve agility and racing in tighter circuits.',
    image: '/REGULATIONS/lighter-cars.jpeg',
  },
  {
    icon: Wind,
    title: 'Active Aerodynamics',
    stat: 'Z-Mode / X-Mode',
    desc: 'DRS is replaced by active aero. Cars switch between high-downforce Z-Mode for corners and low-drag X-Mode for straights, automatically in designated zones.',
    image: '/REGULATIONS/active-aero.jpeg',
  },
  {
    icon: Cpu,
    title: 'Manual Override Mode',
    stat: 'Overtake Boost',
    desc: 'A following car within one second can deploy extra electrical energy for an on-demand overtaking boost, replacing the straight-line advantage previously provided by DRS.',
    image: '/REGULATIONS/manual-override.jpeg',
  },
  {
    icon: Fuel,
    title: 'Sustainable Fuels',
    stat: '100% Sustainable',
    desc: 'All power units run on advanced sustainable drop-in fuels, moving F1 toward fossil-free racing while maintaining the same high-performance combustion.',
    image: '/REGULATIONS/sustainable-fuel.jpeg',
  },
  {
    icon: Settings,
    title: 'ADUO System',
    stat: 'Development Balance',
    desc: 'Additional Development & Upgrade Opportunities allow manufacturers demonstrably behind on ICE performance to receive structured extra development time.',
    image: '/REGULATIONS/aduo-system.jpeg',
  },
];

export default function Regulations() {
  const highlights = [
    { label: 'Teams', value: '11' },
    { label: 'Races', value: '22' },
    { label: 'Weight', value: '768kg' },
    { label: 'Power Split', value: '50/50' },
    { label: 'Electric', value: '350kW' },
    { label: 'Sustainable', value: '100%' },
  ];

  const whyItMatters = [
    { icon: TrendingUp, title: 'Closer Racing', desc: 'Smaller cars and active aero create more opportunities for overtaking and wheel-to-wheel action.' },
    { icon: Zap, title: 'More Overtaking', desc: 'Overtake boost replaces DRS for more strategic and exciting passing maneuvers.' },
    { icon: Scale, title: 'Smaller Cars', desc: 'Reduced dimensions improve agility and make racing tighter on more circuits.' },
    { icon: Leaf, title: 'Sustainability', desc: '100% sustainable fuels and increased hybrid power move F1 toward carbon neutrality.' },
    { icon: Users, title: 'Manufacturer Growth', desc: 'New manufacturers join the grid with increased hybrid focus and sustainable technology.' },
  ];

  const comparison = [
    { spec: 'Wheelbase', old: '3,600mm', new: '3,400mm' },
    { spec: 'Width', old: '2,000mm', new: '1,900mm' },
    { spec: 'Minimum Weight', old: '798kg', new: '768kg' },
    { spec: 'Overtaking Aid', old: 'DRS System', new: 'Active Aero + Boost' },
    { spec: 'Electric Power', old: '~120kW', new: '~350kW' },
    { spec: 'MGU-H', old: 'Present', new: 'Removed' },
  ];

  return (
    <div className="min-h-screen bg-f1-dark">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: 'url(/f1-detail.png)' }}
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-t from-f1-dark via-f1-dark/40 to-f1-dark/90" />
        <div className="absolute top-0 left-0 right-0 h-px racing-line opacity-50" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-f1-red/10 border border-f1-red/30 text-f1-red text-xs font-black uppercase tracking-[0.2em] mb-8"
            >
              <Trophy size={14} /> New Era Begins
            </motion.div>

            <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl xl:text-9xl text-white leading-[0.9] mb-6 glow-text">
              2026 FORMULA<br />
              <span className="text-gradient-red">ONE REGULATIONS</span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-300 mb-4 font-display font-bold tracking-wide max-w-3xl mx-auto">
              The Biggest Rule Change in a Generation
            </p>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
              Experience the new era of Formula 1. Smaller cars, active aerodynamics, 50/50 hybrid power, and the most competitive grid in history.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/teams" className="btn-primary px-8 py-4 text-white font-black uppercase tracking-wider text-sm clip-slant inline-flex items-center gap-2">
                Explore Teams <ChevronRight size={18} />
              </Link>
              <Link to="/schedule" className="btn-secondary px-8 py-4 text-white font-black uppercase tracking-wider text-sm clip-slant-reverse inline-flex items-center gap-2">
                View Schedule
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll to Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-f1-red to-transparent" />
        </motion.div>
      </section>

      {/* Regulation Highlights */}
      <section className="py-20 bg-f1-card-2 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Regulation"
            highlight="Highlights"
            subtitle="The key numbers that define the 2026 Formula 1 era."
            centered
          />

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {highlights.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-f1-card border border-white/10 rounded-2xl p-6 text-center hover:border-f1-red/30 transition-colors"
              >
                <p className="font-display font-black text-4xl sm:text-5xl text-white mb-2">{item.value}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulation Timeline */}
      <section className="py-24 bg-f1-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Regulation"
            highlight="Timeline"
            subtitle="Each change designed to create better racing and a more sustainable future."
          />

          <div className="mt-16 space-y-8">
            {regulations.map((reg, idx) => (
              <motion.div
                key={reg.title}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-f1-red/10 border border-f1-red/20 flex items-center justify-center">
                      <reg.icon className="text-f1-red" size={32} />
                    </div>
                    <span className="text-f1-red font-display font-black text-xl">{reg.stat}</span>
                  </div>
                  <h3 className="font-display font-bold text-3xl text-white">{reg.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">{reg.desc}</p>
                </div>
                <div className="bg-f1-card border border-white/10 rounded-2xl p-0 relative overflow-hidden h-64">
                  <div className="absolute inset-0 bg-gradient-to-br from-f1-red/5 to-transparent" />
                  <img src={reg.image} alt={reg.title} className="w-full h-full object-cover" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Aerodynamics Showcase */}
      <section className="py-24 bg-f1-card-2 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Active"
            highlight="Aerodynamics"
            subtitle="Z-Mode for corners, X-Mode for straights. The future of overtaking."
            centered
          />

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-f1-card border border-white/10 rounded-3xl p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:from-blue-500/30 transition-all" />
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-4">
                    <Wind size={40} className="text-blue-400" />
                  </div>
                  <h3 className="font-display font-black text-3xl text-white mb-2">Z-Mode</h3>
                  <p className="text-gray-400">High Downforce for Corners</p>
                </div>
                <div className="bg-black/40 rounded-2xl p-6 border border-blue-500/20">
                  <p className="text-gray-300 text-center leading-relaxed">
                    Maximum downforce configuration for aggressive cornering, providing ultimate grip and stability through turns.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-f1-card border border-white/10 rounded-3xl p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-f1-red/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:from-f1-red/30 transition-all" />
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-f1-red/10 border border-f1-red/20 flex items-center justify-center mx-auto mb-4">
                    <Gauge size={40} className="text-f1-red" />
                  </div>
                  <h3 className="font-display font-black text-3xl text-white mb-2">X-Mode</h3>
                  <p className="text-gray-400">Low Drag for Straights</p>
                </div>
                <div className="bg-black/40 rounded-2xl p-6 border border-f1-red/20">
                  <p className="text-gray-300 text-center leading-relaxed">
                    Minimum drag configuration for maximum straight-line speed, automatically deployed in designated zones on the track.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-24 bg-f1-dark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Why It"
            highlight="Matters"
            subtitle="The 2026 regulations are designed for better racing and a better future."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyItMatters.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-f1-card border border-white/10 rounded-2xl p-8 hover:border-f1-red/30 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-f1-red/10 border border-f1-red/20 flex items-center justify-center mb-6">
                  <item.icon className="text-f1-red" size={28} />
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-14 max-w-4xl mx-auto bg-f1-card border border-white/10 rounded-2xl p-8"
      >
        <div className="max-w-4xl mx-auto">
          <h3 className="font-display font-bold text-2xl text-white mb-6 text-center">
            Quick Comparison: 2022 vs 2026
          </h3>        <div className="overflow-x-auto">
            <div className="overflow-hidden rounded-xl border border-white/5">
              <table className="w-full text-left">
                <thead className="bg-black/40 text-gray-400 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">Specification</th>
                    <th className="px-4 py-3">2022-2025</th>
                    <th className="px-4 py-3 rounded-r-lg">2026</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  <tr className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-white font-medium">Wheelbase</td>
                    <td className="px-4 py-3 text-gray-400">3,600mm</td>
                    <td className="px-4 py-3 text-f1-red font-bold">3,400mm</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-white font-medium">Width</td>
                    <td className="px-4 py-3 text-gray-400">2,000mm</td>
                    <td className="px-4 py-3 text-f1-red font-bold">1,900mm</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-white font-medium">Minimum Weight</td>
                    <td className="px-4 py-3 text-gray-400">798kg</td>
                    <td className="px-4 py-3 text-f1-red font-bold">768kg</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-white font-medium">Overtaking Aid</td>
                    <td className="px-4 py-3 text-gray-400">DRS (Drag Reduction System)</td>
                    <td className="px-4 py-3 text-f1-red font-bold">Active Aero + Manual Override</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-white font-medium">Electric Power</td>
                    <td className="px-4 py-3 text-gray-400">~120kW</td>
                    <td className="px-4 py-3 text-f1-red font-bold">~350kW</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-white font-medium">MGU-H</td>
                    <td className="px-4 py-3 text-gray-400">Present</td>
                    <td className="px-4 py-3 text-f1-red font-bold">Removed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Bottom CTA */}
      <section className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/f1-hero.png)', opacity: 0.3 }}
        />
        <div className="absolute inset-0 bg-f1-dark/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-f1-dark via-transparent to-f1-dark" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              READY FOR THE <span className="text-gradient-red">NEW ERA?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
              Explore the full 2026 grid, check out the new teams, and get ready for the most exciting season in Formula 1 history.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/teams" className="btn-primary px-8 py-4 text-white font-black uppercase tracking-wider text-sm clip-slant inline-flex items-center gap-2">
                Explore Teams <ChevronRight size={18} />
              </Link>
              <Link to="/schedule" className="btn-secondary px-8 py-4 text-white font-black uppercase tracking-wider text-sm clip-slant-reverse inline-flex items-center gap-2">
                View Schedule
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
