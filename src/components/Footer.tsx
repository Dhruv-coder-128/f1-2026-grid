import { Flag, ExternalLink, Trophy } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10 pt-16 pb-8 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px racing-line" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-f1-red clip-slant flex items-center justify-center">
                <span className="font-display font-black text-white text-lg italic">F1</span>
              </div>
              <div>
                <span className="font-display font-black text-xl tracking-wide text-white block leading-none">
                  2026 <span className="text-f1-red">GRID</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Formula One</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              The ultimate destination for the 2026 Formula 1 season. Live standings, driver profiles, team data, race calendar, and regulation changes.
            </p>
          </div>

          <div>
            <h3 className="font-display font-bold text-white mb-4 text-sm uppercase tracking-wider">Explore</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="/" className="hover:text-f1-red transition-colors flex items-center gap-2"><Trophy size={12} /> Home</a></li>
              <li><a href="/drivers" className="hover:text-f1-red transition-colors">Drivers</a></li>
              <li><a href="/teams" className="hover:text-f1-red transition-colors">Teams</a></li>
              <li><a href="/schedule" className="hover:text-f1-red transition-colors">Schedule</a></li>
              <li><a href="/regulations" className="hover:text-f1-red transition-colors">2026 Regulations</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-white mb-4 text-sm uppercase tracking-wider">Official Sources</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="https://www.formula1.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-f1-red transition-colors">
                  Formula1.com <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://www.fia.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-f1-red transition-colors">
                  FIA <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs text-center sm:text-left">
            Data reflects official 2026 FIA Formula One World Championship standings. Not affiliated with F1.
          </p>
          <div className="flex items-center gap-2 text-f1-red">
            <Flag size={14} />
            <span className="font-display text-sm font-black uppercase tracking-wider">Lights Out & Away We Go</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
