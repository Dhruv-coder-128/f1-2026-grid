import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Drivers from './pages/Drivers';
import DriverDetail from './pages/DriverDetail';
import Teams from './pages/Teams';
import TeamDetail from './pages/TeamDetail';
import Schedule from './pages/Schedule';
import RaceDetail from './pages/RaceDetail';
import Regulations from './pages/Regulations';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-f1-dark">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/drivers/:id" element={<DriverDetail />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/teams/:id" element={<TeamDetail />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/races/:slug" element={<RaceDetail />} />
            <Route path="/regulations" element={<Regulations />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
