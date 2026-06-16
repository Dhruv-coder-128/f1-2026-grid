import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Trophy, Clock, Gauge, Zap, Calendar, TrendingUp, MapPin } from 'lucide-react';
import StandingsTable from '../components/StandingsTable';
import Countdown from '../components/Countdown';
import SectionHeader from '../components/SectionHeader';
import { fetchRaces, fetchStandings, fetchResults } from '../lib/api';
import { Race, Driver, Result } from '../types';
import { getPositionSuffix } from '../lib/utils';

export default function Home() {
  const [nextRace, setNextRace] = useState<Race | null>(null);
  const [latestRace, setLatestRace] = useState<Race | null>(null);
  const [leader, setLeader] = useState<Driver | null>(null);
  const [latestResults, setLatestResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchRaces(), fetchStandings(), fetchResults()])
      .then(([racesData, standingsData, resultsData]) => {
        const completed = racesData.filter((r: Race) => r.status === 'completed');
        const upcoming = racesData.filter((r: Race) => r.status === 'upcoming' || r.status === 'next');
        const lastRace = completed[completed.length - 1];
        setLatestRace(lastRace || null);
        setNextRace(upcoming[0] || null);
        setLeader(standingsData.drivers?.[0] || null);
        if (lastRace) {
          setLatestResults(resultsData.filter((r: Result) => r.race_id === lastRace.id).slice(0, 3));
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-f1-dark">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden grain-overlay">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: 'url(/f1-hero.jpg)' }}
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-t from-f1-dark via-transparent to-f1-dark/80" />
        <div className="absolute top-0 left-0 right-0 h-px racing-line opacity-50" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-f1-red/10 border border-f1-red/30 text-f1-red text-xs font-black uppercase tracking-[0.2em] mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-f1-red animate-pulse" />
                2026 Season Live
              </motion.div>

              <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-7xl xl:text-8xl text-white leading-[0.9] mb-6 glow-text">
                FORMULA<br />
                <span className="text-gradient-red">ONE</span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-300 mb-4 font-display font-bold tracking-wide">
                2026 CHAMPIONSHIP
              </p>
              <p className="text-gray-400 text-lg mb-10 max-w-xl leading-relaxed">
                Experience the new era of Formula 1. Smaller cars, active aerodynamics, 50/50 hybrid power, and the most competitive grid in history.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/drivers" className="btn-primary px-8 py-4 text-white font-black uppercase tracking-wider text-sm clip-slant inline-flex items-center gap-2">
                  View Grid <ChevronRight size={18} />
                </Link>
                <Link to="/schedule" className="btn-secondary px-8 py-4 text-white font-black uppercase tracking-wider text-sm clip-slant-reverse inline-flex items-center gap-2">
                  Race Calendar
                </Link>
              </div>
            </motion.div>

            {!loading && nextRace && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="hidden lg:block"
              >
                <div className="relative bg-f1-card/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-f1-red/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-f1-red text-xs font-black uppercase tracking-[0.2em]">Next Race</span>
                      <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Round {nextRace.round}</span>
                    </div>
                    <h3 className="font-display font-black text-3xl text-white mb-2">{nextRace.name}</h3>
                    <div className="flex items-center gap-2 text-gray-400 mb-8">
                      <MapPin size={16} className="text-f1-red" />
                      <span>{nextRace.circuit}, {nextRace.country}</span>
                    </div>
                    <Countdown targetDate={nextRace.date_start} />
                    <div className="mt-6 text-center">
                      <span className="text-gray-500 text-sm">{new Date(nextRace.date_start).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-f1-red to-transparent" />
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="relative bg-f1-card border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="py-8 px-6 flex items-center gap-5 group hover:bg-white/[0.02] transition-colors">
              <div className="w-14 h-14 rounded-xl bg-f1-red/10 border border-f1-red/20 flex items-center justify-center group-hover:bg-f1-red/20 transition-colors">
                <Trophy className="text-f1-red" size={28} />
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-[0.2em] font-bold mb-1">Championship Leader</p>
                <p className="font-display font-black text-2xl text-white">{leader ? `${leader.first_name} ${leader.last_name}` : '—'}</p>
                <p className="text-f1-red font-bold">{leader ? `${leader.points} PTS` : ''}</p>
              </div>
            </div>
            <div className="py-8 px-6 flex items-center gap-5 group hover:bg-white/[0.02] transition-colors">
              <div className="w-14 h-14 rounded-xl bg-f1-red/10 border border-f1-red/20 flex items-center justify-center group-hover:bg-f1-red/20 transition-colors">
                <Clock className="text-f1-red" size={28} />
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-[0.2em] font-bold mb-1">Next Race</p>
                <p className="font-display font-black text-2xl text-white">{nextRace ? nextRace.name.replace(' Grand Prix', ' GP') : '—'}</p>
                <p className="text-gray-400 font-medium">{nextRace ? `${nextRace.circuit}` : ''}</p>
              </div>
            </div>
            <div className="py-8 px-6 flex items-center gap-5 group hover:bg-white/[0.02] transition-colors">
              <div className="w-14 h-14 rounded-xl bg-f1-red/10 border border-f1-red/20 flex items-center justify-center group-hover:bg-f1-red/20 transition-colors">
                <Gauge className="text-f1-red" size={28} />
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-[0.2em] font-bold mb-1">Grid Size</p>
                <p className="font-display font-black text-2xl text-white">11 Teams</p>
                <p className="text-gray-400 font-medium">22 Drivers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2026 What's New */}
      <section className="py-24 bg-f1-dark relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="The New Era of"
            highlight="Formula 1"
            subtitle="2026 brings revolutionary changes to the sport. Discover what's different this season."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {[
              { icon: Zap, title: '50/50 Power Split', desc: '350kW electric motor paired with a 400kW ICE for near-equal hybrid power.' },
              { icon: Gauge, title: 'Smaller & Lighter', desc: 'Cars shrink to 3.4m wheelbase, 1.9m width, and 768kg minimum weight.' },
              { icon: TrendingUp, title: 'Active Aero', desc: 'Z-Mode and X-Mode wing configurations replace DRS for overtaking.' },
              { icon: Calendar, title: '22 Races', desc: 'A packed calendar spanning five continents, including the new Madrid round.' },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="stat-card rounded-xl p-6 group"
              >
                <div className="w-12 h-12 rounded-lg bg-f1-red/10 border border-f1-red/20 flex items-center justify-center mb-4 group-hover:bg-f1-red/20 transition-colors">
                  <item.icon className="text-f1-red" size={24} />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Standings */}
      <section className="py-24 bg-f1-card-2 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <SectionHeader
              title="Championship"
              highlight="Standings"
              subtitle="Live points after Round 7, Barcelona-Catalunya"
            />
            <Link to="/drivers" className="inline-flex items-center gap-1 text-f1-red font-black uppercase tracking-wider text-sm hover:underline mb-2">
              Full Standings <ChevronRight size={16} />
            </Link>
          </div>
          <StandingsTable />
        </div>
      </section>

      {/* Latest Race */}
      {latestRace && (
        <section className="py-24 bg-f1-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Latest"
              highlight="Race Result"
              subtitle={`Round ${latestRace.round}: ${latestRace.circuit}, ${latestRace.country}`}
            />

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 bg-f1-card border border-white/10 rounded-2xl p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-f1-red via-orange-500 to-f1-red" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div>
                    <span className="text-f1-red text-xs font-black uppercase tracking-[0.2em]">Round {latestRace.round}</span>
                    <h3 className="font-display font-black text-3xl text-white mt-2">{latestRace.name}</h3>
                    <p className="text-gray-400 mt-1 flex items-center gap-2">
                      <MapPin size={16} className="text-f1-red" /> {latestRace.circuit}, {latestRace.country}
                    </p>
                  </div>
                  <Link
                    to="/schedule"
                    className="btn-secondary px-6 py-3 text-white font-bold text-sm uppercase tracking-wider rounded-lg inline-flex items-center justify-center"
                  >
                    Full Results
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {latestResults.map((result, idx) => (
                    <div
                      key={result.id}
                      className="bg-black/40 border border-white/5 rounded-xl p-5 text-center relative overflow-hidden"
                    >
                      <div
                        className="absolute top-0 left-0 w-full h-1"
                        style={{ backgroundColor: result.drivers?.teams?.color || '#666' }}
                      />
                      <div className="text-4xl font-display font-black text-white/10 absolute top-2 right-3">{idx + 1}</div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{getPositionSuffix(idx + 1)} Place</p>
                      <p className="font-display font-bold text-white text-lg truncate">
                        {result.drivers?.first_name} <span style={{ color: result.drivers?.teams?.color }}>{result.drivers?.last_name}</span>
                      </p>
                      <p className="text-gray-400 text-sm">{result.drivers?.teams?.name}</p>
                      <p className="font-display font-black text-white mt-2">{result.points} PTS</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-f1-card border border-white/10 rounded-2xl overflow-hidden"
              >
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url(/f1-podium.png)' }} />
                <div className="p-6">
                  <h4 className="font-display font-bold text-white text-lg mb-2">2026 Season So Far</h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    Kimi Antonelli leads the championship after a stunning start to his rookie season, with Lewis Hamilton securing his first Ferrari win in Barcelona.
                  </p>
                  <Link to="/schedule" className="text-f1-red text-sm font-bold uppercase tracking-wider hover:underline inline-flex items-center gap-1">
                    View Calendar <ChevronRight size={14} />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/f1-detail.png)', opacity: 0.4}}
        />
        <div className="absolute inset-0 bg-f1-dark/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-f1-dark via-transparent to-f1-dark" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              READY FOR <span className="text-gradient-red">RACE WEEK?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
              Explore the full 2026 grid, compare drivers, check team stats, and never miss a race weekend.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/drivers" className="btn-primary px-8 py-4 text-white font-black uppercase tracking-wider text-sm clip-slant inline-flex items-center gap-2">
                Meet the Drivers <ChevronRight size={18} />
              </Link>
              <Link to="/teams" className="btn-secondary px-8 py-4 text-white font-black uppercase tracking-wider text-sm clip-slant-reverse inline-flex items-center gap-2">
                Explore Teams
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
