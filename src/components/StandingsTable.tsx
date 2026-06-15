import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchStandings } from '../lib/api';
import { fallbackDrivers, fallbackTeams } from '../lib/fallbackData';
import { Driver, Team } from '../types';
import { getCountryFlag } from '../lib/utils';
import ErrorState from './ErrorState';

export default function StandingsTable() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [view, setView] = useState<'drivers' | 'teams'>('drivers');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchStandings();
      setDrivers(data.drivers || []);
      setTeams(data.teams || []);
    } catch {
      setError(true);
      setDrivers(fallbackDrivers);
      setTeams(fallbackTeams);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="bg-f1-card border border-f1 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-f1">
          <div className="skeleton h-9 w-48 rounded-lg" />
        </div>
        <div className="p-4 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-12 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-f1-card border border-white/10 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-3 p-4 border-b border-white/10">
        <button
          onClick={() => setView('drivers')}
          className={`px-5 py-2.5 rounded-lg text-sm font-black uppercase tracking-wider transition-all ${
            view === 'drivers' ? 'bg-f1-red text-white shadow-lg shadow-f1-red/20' : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Drivers
        </button>
        <button
          onClick={() => setView('teams')}
          className={`px-5 py-2.5 rounded-lg text-sm font-black uppercase tracking-wider transition-all ${
            view === 'teams' ? 'bg-f1-red text-white shadow-lg shadow-f1-red/20' : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Constructors
        </button>
      </div>

      {error && (
        <div className="px-4 pt-4">
          <ErrorState message="Showing cached standings" onRetry={load} />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-black/40 text-gray-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3 font-bold">Pos</th>
              <th className="px-5 py-3 font-bold">{view === 'drivers' ? 'Driver' : 'Team'}</th>
              {view === 'drivers' && <th className="px-5 py-3 font-bold">Team</th>}
              <th className="px-5 py-3 font-bold text-right">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {(view === 'drivers' ? drivers : teams).map((item, idx) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="hover:bg-white/[0.03] transition-colors"
              >
                <td className="px-5 py-3.5">
                  <span className="font-display font-black text-xl text-white/80">{idx + 1}</span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    {view === 'drivers' ? (
                      <>
                        <div
                          className="w-1 h-10 rounded-full"
                          style={{ backgroundColor: (item as Driver).teams?.color || '#666' }}
                        />
                        <div>
                          <p className="font-bold text-white">
                            {(item as Driver).first_name} <span className="text-f1-red">{(item as Driver).last_name}</span>
                          </p>
                          <p className="text-xs text-gray-500">
                            {(item as Driver).nationality}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className="w-1.5 h-10 rounded-full"
                          style={{ backgroundColor: (item as Team).color }}
                        />
                        <span className="font-bold text-white">{(item as Team).name}</span>
                      </>
                    )}
                  </div>
                </td>
                {view === 'drivers' && (
                  <td className="px-5 py-3.5 text-sm text-gray-400">
                    {(item as Driver).teams?.name}
                  </td>
                )}
                <td className="px-5 py-3.5 text-right">
                  <span className="font-display font-black text-xl text-white">{item.points}</span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
