import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  highlight: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({ title, highlight, subtitle, centered = false }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={centered ? 'text-center' : ''}
    >
      <div className={centered ? 'flex items-center justify-center gap-3 mb-3' : 'flex items-center gap-3 mb-3'}>
        <div className="h-px w-8 bg-f1-red" />
        <span className="text-f1-red text-xs font-black uppercase tracking-[0.25em]">Formula 1 2026</span>
        <div className="h-px w-8 bg-f1-red" />
      </div>
      <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-3">
        {title} <span className="text-gradient-red">{highlight}</span>
      </h2>
      {subtitle && <p className={`text-gray-400 max-w-2xl ${centered ? 'mx-auto' : ''}`}>{subtitle}</p>}
    </motion.div>
  );
}
