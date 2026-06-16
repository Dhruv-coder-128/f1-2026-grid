import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchRaces } from '../lib/api';
import { fallbackRaces } from '../lib/fallbackData';
import { Race } from '../types';
import { slugify, getCountryFlag, formatDate } from '../lib/utils';
import { raceDetails, getDriverById } from '../lib/raceData';
import { ArrowLeft, Trophy, MapPin, CalendarDays, Clock, Gauge, Sun, Cloud, CloudRain } from 'lucide-react';
import ErrorState from '../components/ErrorState';
import SectionHeader from '../components/SectionHeader';


const trackMaps: Record<string, string> = {
  'Australian Grand Prix': '/trackmaps/australian-grand-prix.avif',
  'Chinese Grand Prix': '/trackmaps/chinese-grand-prix.avif',
  'Japanese Grand Prix': '/trackmaps/japanese-grand-prix.avif',
  'Miami Grand Prix': '/trackmaps/miami-grand-prix.avif',
  'Monaco Grand Prix': '/trackmaps/monaco-grand-prix.avif',
  'Canadian Grand Prix': '/trackmaps/canadian-grand-prix.avif',
  'Spanish Grand Prix': '/trackmaps/spanish-grand-prix.avif',
  'Austrian Grand Prix': '/trackmaps/austrian-grand-prix.avif',
  'British Grand Prix': '/trackmaps/british-grand-prix.avif',
  'Belgian Grand Prix': '/trackmaps/belgian-grand-prix.avif',
  'Hungarian Grand Prix': '/trackmaps/hungarian-grand-prix.avif',
  'Dutch Grand Prix': '/trackmaps/dutch-grand-prix.avif',
  'Italian Grand Prix': '/trackmaps/italian-grand-prix.avif',
  'Azerbaijan Grand Prix': '/trackmaps/azerbaijan-grand-prix.avif',
  'Singapore Grand Prix': '/trackmaps/singapore-grand-prix.avif',
  'United States Grand Prix': '/trackmaps/united-states-grand-prix.avif',
  'Mexico City Grand Prix': '/trackmaps/mexico-city-grand-prix.avif',
  'São Paulo Grand Prix': '/trackmaps/sao-paulo-grand-prix.avif',
  'Las Vegas Grand Prix': '/trackmaps/las-vegas-grand-prix.avif',
  'Qatar Grand Prix': '/trackmaps/qatar-grand-prix.avif',
  'Abu Dhabi Grand Prix': '/trackmaps/abu-dhabi-grand-prix.avif',
};

export default function RaceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [race, setRace] = useState<Race | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(false);
    try {
      const r = await fetchRaces();
      const found = r.find((race: Race) => slugify(race.name) === slug);
      if (found && raceDetails[slug || '']) {
        setRace(found);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
      const found = fallbackRaces.find((race: Race) => slugify(race.name) === slug);
      if (found) {
        setRace(found);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-f1-dark flex items-center justify-center pt-20">
        <div className="w-12 h-12 border-2 border-f1-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !race || !slug || !raceDetails[slug]) {
    return (
      <div className="min-h-screen bg-f1-dark pt-24 px-4">
        <ErrorState message="Race not found" />
      </div>
    );
  }

  const details = raceDetails[slug];

  return (
    <div className="min-h-screen bg-f1-dark pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors font-medium"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* Hero */}
        <div className="relative rounded-3xl overflow-hidden mb-10 border border-white/10 bg-gradient-to-br from-f1-card/50 to-f1-dark">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${details.heroImage})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-f1-dark via-f1-dark/90 to-transparent" />

          <div className="relative z-10 p-8 lg:p-12">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{getCountryFlag(race.country_code)}</span>
              <div>
                <p className="text-f1-red text-xs font-black uppercase tracking-[0.2em] mb-1">Round {race.round}</p>
                <h1 className="font-display font-black text-4xl lg:text-6xl text-white">{race.name}</h1>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>{details.circuitName}, {details.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays size={18} />
                <span>{formatDate(race.date_start)} - {formatDate(race.date_end)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Circuit Info */}
            <div className="bg-f1-card border border-white/10 rounded-2xl p-6 sm:p-8">
              <SectionHeader title="Circuit" highlight="Information" />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                <div className="bg-black/40 rounded-xl p-4 border border-white/5 text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Length</p>
                  <p className="font-display font-bold text-2xl text-white">{details.length}</p>
                </div>
                <div className="bg-black/40 rounded-xl p-4 border border-white/5 text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Laps</p>
                  <p className="font-display font-bold text-2xl text-white">{details.laps}</p>
                </div>
                <div className="bg-black/40 rounded-xl p-4 border border-white/5 text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Turns</p>
                  <p className="font-display font-bold text-2xl text-white">{details.turns}</p>
                </div>
                <div className="bg-black/40 rounded-xl p-4 border border-white/5 text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Race Distance</p>
                  <p className="font-display font-bold text-2xl text-white">{details.raceDistance}</p>
                </div>
                <div className="bg-black/40 rounded-xl p-4 border border-white/5 text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">First Grand Prix</p>
                  <p className="font-display font-bold text-2xl text-white">{details.firstGrandPrix}</p>
                </div>
                <div className="bg-black/40 rounded-xl p-4 border border-white/5 text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Lap Record</p>
                  <p className="font-display font-bold text-2xl text-white">{details.lapRecord}</p>
                  <p className="text-sm text-gray-400">{details.recordHolder}</p>
                </div>
              </div>
            </div>

            {/* Track Map */}
            <div className="bg-f1-card border border-white/10 rounded-2xl p-6 sm:p-8">
              <SectionHeader title="Track" highlight="Map" />
              <div className="mt-6 flex justify-center">
                <div className="w-full max-w-2xl rounded-2xl bg-black/40 border border-white/10 p-6 flex items-center justify-center">
                  <div className="relative rounded-2xl overflow-hidden bg-black/40 border border-white/10 p-6">
                    <img
                      src={trackMaps[race.name]}
                      alt={race.name}
                      className="w-full max-h-[350px] object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Previous Winners */}
            <div className="bg-f1-card border border-white/10 rounded-2xl p-6 sm:p-8">
              <SectionHeader title="Previous" highlight="Winners" />
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {details.previousWinners.map((winner, idx) => (
                  <div key={idx} className="bg-black/40 rounded-xl p-4 border border-white/5">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{winner.year}</p>
                    <p className="font-bold text-white">{winner.driver}</p>
                    <p className="text-sm text-gray-400">{winner.team}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Race Results */}
            {details.results && (
              <div className="bg-f1-card border border-white/10 rounded-2xl p-6 sm:p-8">
                <SectionHeader title="Race" highlight="Results" />
                <div className="overflow-x-auto mt-6">
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
                      {details.results.map((r) => {
                        const driver = getDriverById(r.driverId);
                        return (
                          <tr key={r.position} className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-4 py-3 font-display font-black text-white">{r.position}</td>
                            <td className="px-4 py-3 font-bold text-white">
                              {driver ? `${driver.first_name} ${driver.last_name}` : 'Unknown'}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-400">
                              {driver?.teams?.name || 'Unknown'}
                            </td>
                            <td className="px-4 py-3 text-right font-display font-bold text-white">{r.points}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Weather */}
            <div className="bg-f1-card border border-white/10 rounded-2xl p-6">
              <h3 className="font-display font-bold text-xl text-white mb-4 flex items-center gap-2">
                <Sun size={20} className="text-f1-red" /> Weekend Forecast
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 rounded-xl p-4 border border-white/5 text-center">
                  <Gauge size={24} className="mx-auto mb-2 text-yellow-400" />
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Temperature</p>
                  <p className="font-display font-bold text-2xl text-white">{details.weather.temp}°C</p>
                </div>
                <div className="bg-black/40 rounded-xl p-4 border border-white/5 text-center">
                  {details.weather.rainChance > 30 ? (
                    <CloudRain size={24} className="mx-auto mb-2 text-blue-400" />
                  ) : (
                    <Cloud size={24} className="mx-auto mb-2 text-gray-400" />
                  )}
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Rain Chance</p>
                  <p className="font-display font-bold text-2xl text-white">{details.weather.rainChance}%</p>
                </div>
              </div>
              <div className="mt-4 bg-black/40 rounded-xl p-4 border border-white/5 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Conditions</p>
                <p className="text-white font-semibold">{details.weather.conditions}</p>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-f1-card border border-white/10 rounded-2xl p-6">
              <h3 className="font-display font-bold text-xl text-white mb-4 flex items-center gap-2">
                <Clock size={20} className="text-f1-red" /> Weekend Schedule
              </h3>
              <div className="space-y-3">
                {details.schedule.map((item, idx) => (
                  <div key={idx} className="bg-black/40 border border-white/5 rounded-xl p-4">
                    <p className="text-sm font-bold text-white mb-2">{item.day}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.sessions.map((session, sIdx) => (
                        <span key={sIdx} className="px-3 py-1 bg-f1-red/10 text-f1-red rounded-full text-xs font-bold">{session}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
