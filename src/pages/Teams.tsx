import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchTeams, fetchDrivers } from '../lib/api';
import { fallbackTeams, fallbackDrivers } from '../lib/fallbackData';
import { Team, Driver } from '../types';
import TeamCard from '../components/TeamCard';
import SectionHeader from '../components/SectionHeader';
import ErrorState from '../components/ErrorState';
import { Loader2 } from 'lucide-react';

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(false);
    try {
      const [t, d] = await Promise.all([fetchTeams(), fetchDrivers()]);
      setTeams(t);
      setDrivers(d);
    } catch {
      setError(true);
      setTeams(fallbackTeams);
      setDrivers(fallbackDrivers);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const getTeamDrivers = (teamId: string) => drivers.filter((d) => d.team_id === teamId);

  return (
    <div className="min-h-screen bg-f1-dark pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="2026"
          highlight="Constructors"
          subtitle="Explore all 11 teams on the grid, including newcomer Cadillac, with power units and lineups"
        />

        {!loading && error && (
          <div className="mb-8">
            <ErrorState message="Showing cached data - live connection unavailable" onRetry={load} />
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-f1-card border border-f1 rounded-xl p-6 h-80">
                <div className="skeleton h-4 w-32 mb-4" />
                <div className="skeleton h-8 w-48 mb-6" />
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="skeleton h-20 rounded-lg" />
                  <div className="skeleton h-20 rounded-lg" />
                </div>
                <div className="space-y-2">
                  <div className="skeleton h-3 w-full" />
                  <div className="skeleton h-3 w-3/4" />
                  <div className="skeleton h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            {teams.map((team, idx) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <TeamCard team={team} index={idx} />
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {getTeamDrivers(team.id).map((driver) => (
                    <div
                      key={driver.id}
                      className="flex items-center gap-3 bg-black/40 border border-white/5 rounded-xl px-4 py-3 hover:border-white/10 transition-colors"
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-display font-bold text-white border-2"
                        style={{ borderColor: team.color, backgroundColor: `${team.color}20` }}
                      >
                        {driver.code}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{driver.first_name} {driver.last_name}</p>
                        <p className="text-xs text-gray-500">#{driver.number}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
