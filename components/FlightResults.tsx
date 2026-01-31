
import React, { useMemo, useState } from 'react';
import { Search, Loader2, Plane, Filter, X, SlidersHorizontal, AlertTriangle } from 'lucide-react';
import { SearchParams, Flight } from '../types';
import FlightCard from './FlightCard';

interface FlightResultsProps {
  params: SearchParams | null;
  flights: Flight[];
  onSelect: (flight: Flight) => void;
  loading: boolean;
  error?: string;
  onNewSearch: () => void;
}

const FlightResults: React.FC<FlightResultsProps> = ({ params, flights, onSelect, loading, error, onNewSearch }) => {
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const lowestPrice = useMemo(() => {
    if (!flights.length) return null;
    return Math.min(...flights.map((f) => f.price));
  }, [flights]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-slate-50 px-4 text-center">
        <div className="relative mb-10 scale-150">
          <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
          <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-blue-900" />
        </div>
        <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Analisando 4.250 tarifas...</h3>
        <p className="text-slate-500 font-medium max-w-sm">Estamos conectando com GOL, LATAM, TAP e mais de 100 parceiros globais.</p>
        
        <div className="mt-12 w-full max-w-md bg-slate-200 h-2 rounded-full overflow-hidden shadow-inner">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-full animate-progress-fast" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <div className="p-4 rounded-2xl bg-red-50 text-red-700 border border-red-100 flex items-center space-x-3 mb-6">
          <AlertTriangle className="h-5 w-5" />
          <span className="font-semibold">{error}</span>
        </div>
        <button onClick={onNewSearch} className="bg-slate-950 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-blue-600 transition-all">
          Fazer nova busca
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6 flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
           <div className="flex items-center space-x-2">
             <div className="bg-blue-100 p-2 rounded-lg">
                <Search className="h-4 w-4 text-blue-600" />
             </div>
             <span className="font-bold text-slate-900">{params?.origin} ✈ {params?.destination}</span>
           </div>
           <button 
             onClick={() => setShowFiltersMobile(true)}
             className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold"
           >
             <Filter className="h-4 w-4 mr-2" />
             Filtrar
           </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
             <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm sticky top-28">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-black text-xl flex items-center text-slate-900">
                    <SlidersHorizontal className="h-5 w-5 mr-3 text-blue-600" />
                    Refinar Busca
                  </h3>
                </div>
                
                <div className="space-y-10">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Preço Máximo</label>
                    <input type="range" className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600" min="500" max="10000" />
                    <div className="flex justify-between mt-3 text-xs font-bold text-slate-500 uppercase">
                      <span>R$ 500</span>
                      <span>R$ 10.000+</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Escalas</label>
                    <div className="space-y-3">
                      {['Qualquer', 'Somente Direto', 'Até 1 Parada'].map(label => (
                        <label key={label} className="flex items-center group cursor-pointer">
                          <input type="checkbox" className="w-5 h-5 rounded-lg border-slate-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-3 text-sm font-bold text-slate-600 group-hover:text-blue-600 transition-colors">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
             </div>
          </aside>

          {/* Results List */}
          <div className="lg:col-span-9 space-y-6">
            <div className="hidden lg:flex bg-gradient-to-r from-slate-950 to-blue-900 p-8 rounded-[2rem] text-white shadow-2xl shadow-blue-900/20 justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10 scale-150">
                 <Plane className="h-32 w-32 -rotate-12" />
              </div>
              <div className="relative z-10">
                <p className="text-blue-300 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Melhores ofertas para</p>
                <h2 className="text-3xl font-black">{params?.origin} <span className="text-blue-500 mx-2">✈</span> {params?.destination}</h2>
                <div className="flex items-center mt-4 space-x-4">
                  <span className="bg-white/10 px-3 py-1 rounded-lg text-xs font-bold">{params?.departureDate}</span>
                  <span className="bg-white/10 px-3 py-1 rounded-lg text-xs font-bold uppercase">{params?.passengers} Viajante(s)</span>
                </div>
              </div>
              <div className="text-right relative z-10">
                <p className="text-blue-300 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Menor Preço Encontrado</p>
                <p className="text-4xl font-black text-white italic">{lowestPrice ? `R$ ${lowestPrice.toLocaleString()}` : '—'}</p>
              </div>
            </div>

            {flights.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-[2rem] p-12 text-center text-slate-600 shadow-sm">
                <p className="text-2xl font-black text-slate-900 mb-3">Nenhuma tarifa encontrada</p>
                <p className="text-slate-500 mb-6">Tente ajustar datas ou escolher outro aeroporto de saída/destino.</p>
                <button onClick={onNewSearch} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-blue-700 transition-all">
                  Nova busca
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {flights.map(flight => (
                  <FlightCard key={flight.id} flight={flight} onSelect={() => onSelect(flight)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showFiltersMobile && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setShowFiltersMobile(false)} />
          <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-[3rem] p-8 animate-in slide-in-from-bottom duration-300">
             <div className="flex items-center justify-between mb-8">
               <h3 className="font-black text-2xl text-slate-900">Filtros</h3>
               <button onClick={() => setShowFiltersMobile(false)} className="p-2 bg-slate-100 rounded-full">
                 <X className="h-6 w-6" />
               </button>
             </div>
             <div className="space-y-8 mb-10">
                <div>
                   <label className="block text-xs font-black text-slate-400 uppercase mb-4 tracking-widest">Preço Máximo</label>
                   <input type="range" className="w-full accent-blue-600" />
                </div>
                <div>
                   <label className="block text-xs font-black text-slate-400 uppercase mb-4 tracking-widest">Escalas</label>
                   <div className="flex flex-wrap gap-2">
                      {['Qualquer', 'Direto', '1 Parada'].map(f => (
                        <button key={f} className="px-5 py-2 rounded-xl bg-slate-100 font-bold text-sm text-slate-600 hover:bg-blue-600 hover:text-white transition-all">
                          {f}
                        </button>
                      ))}
                   </div>
                </div>
             </div>
             <button 
               onClick={() => setShowFiltersMobile(false)}
               className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl text-lg uppercase shadow-xl shadow-blue-500/30"
             >
               Aplicar Filtros
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightResults;
