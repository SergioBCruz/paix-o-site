
import React from 'react';
import FlightSearch from './FlightSearch';
import { ShieldCheck, Globe, Zap, ArrowRight, Star } from 'lucide-react';
import { SearchParams } from '../types';

interface HeroProps {
  onSearch: (params: SearchParams) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  return (
    <div className="relative overflow-hidden bg-slate-950 pt-10 pb-20 md:pt-20 md:pb-32">
      {/* Imersive Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#2563eb] opacity-95" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-10 max-w-4xl mx-auto">
          
          <div className="inline-flex items-center bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2.5 rounded-full text-blue-200 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] animate-pulse">
            <Zap className="h-4 w-4 mr-2 text-yellow-400 fill-yellow-400" />
            OFERTAS RELÂMPAGO ATIVAS • ECONOMIZE ATÉ 60%
          </div>
          
          <h1 className="text-4xl md:text-8xl font-black text-white leading-tight tracking-tighter">
            O mundo é um livro, <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white">
              e quem não viaja lê apenas uma página.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-blue-100/70 font-medium leading-relaxed max-w-2xl">
            A paixão por viajar não deve pesar no seu bolso. Acesse tarifas exclusivas das maiores companhias aéreas do mundo com apenas um clique.
          </p>

          <div className="w-full pt-10 relative z-20">
            <FlightSearch onSearch={onSearch} />
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-white/60 pt-6">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-5 w-5 text-blue-400" />
              <span className="text-xs font-black uppercase tracking-widest">Checkout Seguro</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-blue-400" />
              <span className="text-xs font-black uppercase tracking-widest">Avaliação 4.9/5</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-blue-400" />
              <span className="text-xs font-black uppercase tracking-widest">Cias Mundiais</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
