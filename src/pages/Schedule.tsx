import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchRaces, fetchResults } from '../lib/api';
import { fallbackRaces } from '../lib/fallbackData';
import { Race, Result } from '../types';
import { formatDate, getCountryFlag, slugify } from '../lib/utils';
import SectionHeader from '../components/SectionHeader';
import ErrorState from '../components/ErrorState';
import { Trophy, MapPin, CalendarDays, ChevronRight } from 'lucide-react';

export default function Schedule() {
  const [races, setRaces] = useState<Race[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);

  const load = async () => {
    setLoading(true);
    setError(false);
    try {
      const [r, res] = await Promise.all([fetchRaces(), fetchResults()]);
      setRaces(r);
      setResults(res);
      const next = r.find((race: Race) => race.status === 'next');
      setSelectedRace(next || r[0]);
    } catch {
      setError(true);
      setRaces(fallbackRaces);
      setSelectedRace(fallbackRaces.find((r) => r.status === 'next') || fallbackRaces[0]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const raceResults = selectedRace
    ? results.filter((r) => r.race_id === selectedRace.id).sort((a, b) => a.position - b.position)
    : [];

  return (
    <div className="min-h-screen bg-f1-dark pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="2026 Race"
          highlight="Calendar"
          subtitle="The 2026 FIA Formula One World Championship features 22 races across five continents"
        />

        {!loading && error && (
          <div className="mb-8">
            <ErrorState message="Showing cached data - live connection unavailable" onRetry={load} />
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="skeleton h-24 rounded-xl" />
              ))}
            </div>
            <div className="lg:col-span-2 skeleton h-96 rounded-2xl" />
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            <div className="lg:col-span-1 space-y-3 max-h-[800px] overflow-y-auto pr-2">
              {races.map((race) => (
                <button
                  key={race.id}
                  onClick={() => setSelectedRace(race)}
                  className={`w-full text-left rounded-xl p-4 border transition-all relative group ${
                    selectedRace?.id === race.id
                      ? 'bg-f1-red/10 border-f1-red'
                      : 'bg-f1-card border-f1 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Round {race.round}</p>
                      <h3 className="font-display font-bold text-white">{race.name}</h3>
                      <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                        <MapPin size={12} /> {race.circuit}
                      </p>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <span className="text-2xl">{getCountryFlag(race.country_code)}</span>
                      <div>
                        <p className="text-xs text-gray-500">{formatDate(race.date_start)}</p>
                        <Link 
                          to={`/races/${slugify(race.name)}`}
                          className="flex items-center gap-1 text-f1-red text-xs font-bold hover:underline"
                        >
                          View Details <ChevronRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {selectedRace && (
                  <motion.div
                    key={selectedRace.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-f1-card border border-white/10 rounded-2xl overflow-hidden"
                  >
                    <div className="h-2 bg-gradient-to-r from-f1-red via-orange-500 to-f1-red" />
                    <div className="p-6 sm:p-8">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                          <p className="text-f1-red text-xs font-black uppercase tracking-[0.2em] mb-1">Round {selectedRace.round}</p>
                          <h2 className="font-display font-black text-3xl sm:text-4xl text-white">{selectedRace.name}</h2>
                          <p className="text-gray-400 mt-1">{selectedRace.circuit}, {selectedRace.country}</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="flex items-center gap-2 text-gray-300">
                            <CalendarDays size={16} />
                            <span>{formatDate(selectedRace.date_start)} - {formatDate(selectedRace.date_end)}</span>
                          </div>
                          <span className={`inline-block mt-2 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                            selectedRace.status === 'completed'
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : selectedRace.status === 'next'
                              ? 'bg-f1-red/20 text-f1-red border border-f1-red/30'
                              : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          }`}>
                            {selectedRace.status}
                          </span>
                        </div>
                      </div>

                      {raceResults.length > 0 ? (
                        <div>
                          <h3 className="font-display font-bold text-xl text-white mb-4 flex items-center gap-2">
                            <Trophy size={20} className="text-f1-red" /> Race Results
                          </h3>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left">
                              <thead className="bg-black/40 text-gray-400 text-xs uppercase tracking-wider">
                                <tr>
                                  <th className="px-4 py-3 rounded-l-lg">Pos</th>
                                  <th className="px-4 py-3">Driver</th>
                                  <th className="px-4 py-3">Team</th>
                                  <th className="px-4 py-3 text-right rounded-r-lg">Points</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-white/5">
                                {raceResults.map((r) => (
                                  <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-4 py-3 font-display font-black text-white">{r.position}</td>
                                    <td className="px-4 py-3 font-bold text-white">
                                      {r.drivers?.first_name} {r.drivers?.last_name}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-400">{r.drivers?.teams?.name}</td>
                                    <td className="px-4 py-3 text-right font-display font-bold text-white">{r.points}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-16 bg-black/20 rounded-xl border border-dashed border-white/10">
                          <CalendarDays size={40} className="mx-auto text-gray-500 mb-3" />
                          <p className="text-gray-400">Results will be available after the race weekend.</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
