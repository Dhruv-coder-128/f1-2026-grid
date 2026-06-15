import { motion } from 'framer-motion';
import { Race } from '../types';
import { getCountryFlag, formatDate } from '../lib/utils';
import { Clock, MapPin, Trophy, Calendar } from 'lucide-react';

interface SessionCardProps {
  race: Race;
  type: 'next' | 'live' | 'completed';
}

export default function SessionCard({ race, type }: SessionCardProps) {
  const colors = {
    next: 'from-f1-red/20 to-f1-red/5 border-f1-red/30',
    live: 'from-green-500/20 to-green-500/5 border-green-500/30',
    completed: 'from-white/10 to-transparent border-white/10',
  };

  const badges = {
    next: { text: 'NEXT RACE', class: 'bg-f1-red text-white' },
    live: { text: 'LIVE NOW', class: 'bg-green-500 text-black' },
    completed: { text: 'COMPLETED', class: 'bg-white/10 text-gray-300' },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${colors[type]} p-6`}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider ${badges[type].class}`}>
            {badges[type].text}
          </span>
          <span className="text-3xl">{getCountryFlag(race.country_code)}</span>
        </div>

        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Round {race.round}</p>
        <h3 className="font-display font-black text-2xl text-white mb-2">{race.name}</h3>
        
        <div className="flex items-center gap-2 text-gray-300 text-sm mb-4">
          <MapPin size={14} />
          <span>{race.circuit}, {race.country}</span>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-gray-300">
            <Calendar size={14} className="text-f1-red" />
            <span>{formatDate(race.date_start)}</span>
          </div>
          {race.winner && (
            <div className="flex items-center gap-1.5 text-gray-300">
              <Trophy size={14} className="text-yellow-500" />
              <span>Winner: {race.winner.first_name} {race.winner.last_name}</span>
            </div>
          )}
        </div>
      </div>

      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-f1-red/10 rounded-full blur-3xl" />
    </motion.div>
  );
}
