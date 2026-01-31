
import React, { useState } from 'react';
import { Heart, User, Briefcase, HelpCircle, LayoutDashboard, Menu, X } from 'lucide-react';
import { AppView } from '../types';

interface HeaderProps {
  onNavigate: (view: AppView) => void;
  currentView: AppView;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { view: AppView.HOME, label: 'Início', icon: null },
    { view: AppView.BLOG, label: 'Dicas', icon: null },
    { view: AppView.MY_TRIPS, label: 'Minhas Viagens', icon: <Briefcase className="h-4 w-4 mr-1"/> },
    { view: AppView.SUPPORT, label: 'Suporte', icon: <HelpCircle className="h-4 w-4 mr-1"/> },
  ];

  const handleNavigate = (view: AppView) => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-[100] bg-slate-950/90 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex items-center cursor-pointer space-x-3 group"
            onClick={() => handleNavigate(AppView.HOME)}
          >
            <div className="bg-blue-600 p-2 rounded-xl group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
              <Heart className="h-6 w-6 text-white fill-white/20" />
            </div>
            <span className="text-xl font-black text-white tracking-tight">
              PAIXÃO <span className="text-blue-500">POR</span> VIAGEM
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button 
                key={item.view}
                onClick={() => handleNavigate(item.view)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  currentView === item.view 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => handleNavigate(AppView.LOGIN)}
              className="hidden sm:flex items-center bg-white text-slate-950 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-50 transition-all shadow-xl"
            >
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Painel
            </button>
            
            <button 
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-slate-950 border-b border-white/10 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <button 
                key={item.view}
                onClick={() => handleNavigate(item.view)}
                className={`flex items-center p-4 rounded-xl text-lg font-bold transition-all ${
                  currentView === item.view ? 'bg-blue-600 text-white' : 'text-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => handleNavigate(AppView.LOGIN)}
              className="flex items-center p-4 rounded-xl text-lg font-bold text-blue-400 border border-blue-400/30"
            >
              Meu Painel
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
