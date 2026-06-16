import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Team } from '../types';
import { teamCarImages } from '../lib/data';
import { Trophy } from 'lucide-react';

interface TeamCardProps {
  team: Team;
  index: number;
}

export default function TeamCard({ team, index }: TeamCardProps) {
  const carImage = teamCarImages[team.id] || '';
  const teamColor = team.color;

  return (
    <Link to={`/teams/${team.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05, duration: 0.4 }}
        whileHover={{ scale: 1.03, y: -10 }}
        className="rounded-2xl overflow-hidden relative group"
      >
        {/* Team color glow */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-20 blur-3xl transition-opacity"
          style={{ backgroundColor: teamColor }}
        />

        {/* Glassmorphism card */}
        <div className="relative z-10 bg-f1-card/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          {/* Color accent bar */}
          <div className="h-2" style={{ backgroundColor: teamColor }} />

          <div className="p-6">
            {/* Top section: logo + position */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-[0.2em] font-bold mb-1">{team.full_name}</p>
                <h3 className="font-display font-black text-2xl text-white">{team.name}</h3>
              </div>
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${teamColor}20`, border: `1px solid ${teamColor}40` }}
              >
                <Trophy size={24} style={{ color: teamColor }} />
              </div>
            </div>

            {/* Car image */}
            <div className="mb-4">
              <div className="relative rounded-xl overflow-hidden" >
                <img 
                  src={carImage}
                  alt={`${team.name} car`}
                  className="w-full h-32 object-contain transition-transform"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/50 rounded-xl p-3 border border-white/5 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Points</p>
                <p className="font-display font-black text-xl text-white">{team.points}</p>
              </div>
              <div className="bg-black/50 rounded-xl p-3 border border-white/5 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Position</p>
                <p className="font-display font-black text-xl text-white">#{team.position}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
