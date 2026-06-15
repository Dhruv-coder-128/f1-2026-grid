import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const links = [
  { path: '/', label: 'Home' },
  { path: '/drivers', label: 'Drivers' },
  { path: '/teams', label: 'Teams' },
  { path: '/schedule', label: 'Schedule' },
  { path: '/regulations', label: '2026 Regs' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        scrolled
          ? 'bg-black/95 backdrop-blur-xl border-white/10 py-3'
          : 'bg-transparent border-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 bg-f1-red clip-slant flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <span className="font-display font-black text-white text-lg italic tracking-tighter">F1</span>
              </div>
              <div className="absolute -inset-1 bg-f1-red/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-black text-xl tracking-wide text-white block leading-none">
                2026 <span className="text-f1-red">GRID</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium">Formula One</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const active = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'relative px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors',
                    active ? 'text-white' : 'text-gray-400 hover:text-white'
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-md border-b-2 border-f1-red"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          <button
            className="md:hidden p-2 text-white hover:text-f1-red transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/98 border-t border-white/10 overflow-hidden backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((link) => {
                const active = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center justify-between px-4 py-3 rounded-md text-sm font-bold uppercase tracking-wider transition-all',
                      active
                        ? 'text-white bg-f1-red/15 border-l-4 border-f1-red'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {link.label}
                    {active && <span className="w-2 h-2 rounded-full bg-f1-red" />}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
