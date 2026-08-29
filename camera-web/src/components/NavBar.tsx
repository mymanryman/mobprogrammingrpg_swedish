import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Live', icon: '▶' },
  { to: '/clips', label: 'Clips', icon: '▣' },
  { to: '/settings', label: 'Settings', icon: '⚙' },
];

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-indigo-500/15 text-indigo-300'
      : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
  }`;

const mobileLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `flex flex-1 flex-col items-center gap-1 py-2 text-xs font-medium ${
    isActive ? 'text-indigo-300' : 'text-gray-500'
  }`;

export default function NavBar() {
  return (
    <>
      {/* Desktop / tablet top nav */}
      <header className="hidden sm:flex items-center justify-between border-b border-white/10 bg-[#12141b] px-6 py-3">
        <div className="flex items-center gap-2 text-gray-100 font-semibold">
          <span className="text-indigo-400">●</span> Home Watch
        </div>
        <nav className="flex items-center gap-1">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClasses}>
              <span aria-hidden>{l.icon}</span>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* Mobile top bar */}
      <header className="flex sm:hidden items-center justify-center border-b border-white/10 bg-[#12141b] px-4 py-3">
        <div className="flex items-center gap-2 text-gray-100 font-semibold">
          <span className="text-indigo-400">●</span> Home Watch
        </div>
      </header>

      {/* Mobile bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 flex sm:hidden border-t border-white/10 bg-[#12141b]/95 backdrop-blur">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.to === '/'} className={mobileLinkClasses}>
            <span aria-hidden className="text-base">
              {l.icon}
            </span>
            {l.label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
