import { motion } from 'framer-motion';
import { Team } from '../types';
import { Trophy, Zap, MapPin, Crown, Award } from 'lucide-react';

interface TeamCardProps {
  team: Team;
  index: number;
}

export default function TeamCard({ team, index }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="team-card-hover rounded-2xl overflow-hidden bg-f1-card border border-white/10 relative"
    >
      <div className="h-1.5" style={{ backgroundColor: team.color }} />
      <div className="p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-[0.15em] font-bold mb-1">{team.full_name}</p>
            <h3 className="font-display font-black text-2xl text-white">{team.name}</h3>
          </div>
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${team.color}15`, border: `1px solid ${team.color}40` }}
          >
            <Trophy size={26} style={{ color: team.color }} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-black/40 rounded-xl p-4 border border-white/5">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Points</p>
            <p className="font-display font-black text-2xl text-white">{team.points}</p>
          </div>
          <div className="bg-black/40 rounded-xl p-4 border border-white/5">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Position</p>
            <p className="font-display font-black text-2xl text-white">#{team.position}</p>
          </div>
        </div>

        <div className="space-y-2.5 text-sm text-gray-300">
          <div className="flex items-center gap-3">
            <Zap size={15} style={{ color: team.color }} />
            <span>Power Unit: <span className="text-white font-medium">{team.power_unit}</span></span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={15} style={{ color: team.color }} />
            <span>Base: <span className="text-white font-medium">{team.base}</span></span>
          </div>
          <div className="flex items-center gap-3">
            <Crown size={15} style={{ color: team.color }} />
            <span>Principal: <span className="text-white font-medium">{team.team_principal}</span></span>
          </div>
          <div className="flex items-center gap-3">
            <Award size={15} style={{ color: team.color }} />
            <span>Championships: <span className="text-white font-medium">{team.championships}</span></span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
