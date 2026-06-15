import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  subtext?: string;
  color?: string;
  delay?: number;
}

export default function StatCard({ icon, label, value, subtext, color = '#e10600', delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass rounded-2xl border border-white/10 p-5 relative overflow-hidden group"
    >
      <div 
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${color}18`, color }}
      >
        {icon}
      </div>
      <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{label}</p>
      <p className="font-display font-black text-3xl text-white mb-1">{value}</p>
      {subtext && <p className="text-xs text-gray-500">{subtext}</p>}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-10" style={{ backgroundColor: color }} />
    </motion.div>
  );
}
