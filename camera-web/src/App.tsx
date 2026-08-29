import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import LivePage from './pages/LivePage';
import ClipsPage from './pages/ClipsPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0b0d12]">
      <NavBar />
      <main className="flex-1 pb-16 sm:pb-0">
        <Routes>
          <Route path="/" element={<LivePage />} />
          <Route path="/clips" element={<ClipsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  );
}
