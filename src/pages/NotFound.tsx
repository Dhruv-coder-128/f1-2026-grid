import { Link } from 'react-router-dom';
import { Flag, ChevronRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-f1-dark flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 rounded-full bg-f1-red/10 border border-f1-red/20 flex items-center justify-center mb-6">
        <Flag size={36} className="text-f1-red" />
      </div>
      <h1 className="font-display font-black text-7xl sm:text-8xl text-white mb-2">404</h1>
      <p className="text-gray-400 text-xl mb-8 font-display font-bold">This page has gone off track.</p>
      <Link
        to="/"
        className="btn-primary px-8 py-4 text-white font-black uppercase tracking-wider text-sm clip-slant inline-flex items-center gap-2"
      >
        Back to Pit Lane <ChevronRight size={18} />
      </Link>
    </div>
  );
}
