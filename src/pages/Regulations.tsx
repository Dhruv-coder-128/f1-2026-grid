import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import { Zap, Gauge, Wind, Fuel, Cpu, Trophy, Scale, Settings } from 'lucide-react';

const regulations = [
  {
    icon: Zap,
    title: 'Power Unit Revolution',
    stat: '50/50 Split',
    desc: 'The 2026 power units produce roughly equal power from the 1.6L V6 turbo ICE (~400kW) and the upgraded electric motor (~350kW). The MGU-H is removed, while the MGU-K handles both drive and recuperation.',
  },
  {
    icon: Scale,
    title: 'Smaller & Lighter Cars',
    stat: '768 kg',
    desc: 'Cars are significantly smaller with a maximum wheelbase of 3,400mm and width of 1,900mm. Minimum weight drops by around 30kg to improve agility and racing in tighter circuits.',
  },
  {
    icon: Wind,
    title: 'Active Aerodynamics',
    stat: 'Z-Mode / X-Mode',
    desc: 'DRS is replaced by active aero. Cars switch between high-downforce Z-Mode for corners and low-drag X-Mode for straights, automatically in designated zones.',
  },
  {
    icon: Cpu,
    title: 'Manual Override Mode',
    stat: 'Overtake Boost',
    desc: 'A following car within one second can deploy extra electrical energy for an on-demand overtaking boost, replacing the straight-line advantage previously provided by DRS.',
  },
  {
    icon: Fuel,
    title: 'Sustainable Fuels',
    stat: '100% Sustainable',
    desc: 'All power units run on advanced sustainable drop-in fuels, moving F1 toward fossil-free racing while maintaining the same high-performance combustion.',
  },
  {
    icon: Settings,
    title: 'ADUO System',
    stat: 'Development Balance',
    desc: 'Additional Development & Upgrade Opportunities allow manufacturers demonstrably behind on ICE performance to receive structured extra development time.',
  },
];

export default function Regulations() {
  return (
    <div className="min-h-screen bg-f1-dark pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="2026"
          highlight="Regulations"
          subtitle="The biggest rule change in a generation. Here's everything you need to know about the new era of Formula 1."
          centered
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden h-80 lg:h-[500px]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/f1-regs.png)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-f1-dark via-f1-dark/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-f1-red/20 border border-f1-red/30 text-f1-red text-xs font-black uppercase tracking-wider mb-3">
                <Trophy size={12} /> New Era
              </div>
              <h3 className="font-display font-black text-2xl text-white">The Future of F1 is Here</h3>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="bg-f1-card border border-white/10 rounded-2xl p-6">
              <h3 className="font-display font-bold text-xl text-white mb-3">Why 2026 Changes Everything</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                The 2026 regulations represent F1's most significant transformation since the hybrid era began. With smaller, lighter cars, a radically different power unit philosophy, and active aerodynamics replacing DRS, the sport is prioritizing closer racing and sustainability without sacrificing speed.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Teams', value: '11' },
                  { label: 'Races', value: '22' },
                  { label: 'Power', value: '750kW' },
                ].map((s) => (
                  <div key={s.label} className="bg-black/40 rounded-lg p-3 text-center">
                    <p className="font-display font-black text-xl text-white">{s.value}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {regulations.map((reg, idx) => (
            <motion.div
              key={reg.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="stat-card rounded-xl p-6 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-f1-red/10 border border-f1-red/20 flex items-center justify-center group-hover:bg-f1-red/20 transition-colors">
                  <reg.icon className="text-f1-red" size={24} />
                </div>
                <span className="text-f1-red font-display font-black text-lg">{reg.stat}</span>
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">{reg.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{reg.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 bg-f1-card border border-white/10 rounded-2xl p-8"
        >
          <h3 className="font-display font-bold text-2xl text-white mb-4">Quick Comparison: 2022 vs 2026</h3>
          <div className="overflow-x-auto">
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
        </motion.div>
      </div>
    </div>
  );
}
