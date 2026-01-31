
import React from 'react';
import { FilterState } from '../types';

interface FiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-8 sticky top-24">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-800">Filtros</h3>
        <button 
          onClick={() => setFilters({ maxPrice: 5000, stops: null, airlines: [], times: [] })}
          className="text-xs text-sky-600 font-bold hover:underline"
        >
          Limpar tudo
        </button>
      </div>

      {/* 1. Preço Máximo */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-4 uppercase tracking-tighter">Preço Máximo (R$ {filters.maxPrice})</label>
        <input 
          type="range" 
          min="500" 
          max="5000" 
          step="100"
          value={filters.maxPrice}
          onChange={e => setFilters({...filters, maxPrice: parseInt(e.target.value)})}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
        />
        <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium">
          <span>R$ 500</span>
          <span>R$ 5.000</span>
        </div>
      </div>

      {/* 2. Escalas */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-tighter">Paradas</label>
        <div className="space-y-2">
          {[
            { label: 'Direto', val: 0 },
            { label: '1 Parada', val: 1 },
            { label: '2+ Paradas', val: 2 },
          ].map(item => (
            <label key={item.val} className="flex items-center group cursor-pointer">
              <input 
                type="radio" 
                name="stops" 
                checked={filters.stops === item.val}
                onChange={() => setFilters({...filters, stops: item.val})}
                className="w-4 h-4 accent-sky-600 border-slate-300" 
              />
              <span className="ml-3 text-sm text-slate-600 group-hover:text-sky-600 transition-colors">{item.label}</span>
            </label>
          ))}
          <label className="flex items-center group cursor-pointer">
              <input 
                type="radio" 
                name="stops" 
                checked={filters.stops === null}
                onChange={() => setFilters({...filters, stops: null})}
                className="w-4 h-4 accent-sky-600 border-slate-300" 
              />
              <span className="ml-3 text-sm text-slate-600 group-hover:text-sky-600 transition-colors">Qualquer</span>
            </label>
        </div>
      </div>

      {/* 3. Companhias */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-tighter">Companhias</label>
        <div className="space-y-2">
          {['LATAM Airlines', 'Azul Linhas Aéreas', 'GOL Linhas Aéreas', 'TAP Air Portugal'].map(airline => (
            <label key={airline} className="flex items-center group cursor-pointer">
              <input 
                type="checkbox" 
                checked={filters.airlines.includes(airline)}
                onChange={e => {
                  const newAirlines = e.target.checked 
                    ? [...filters.airlines, airline]
                    : filters.airlines.filter(a => a !== airline);
                  setFilters({...filters, airlines: newAirlines});
                }}
                className="w-4 h-4 rounded text-sky-600 border-slate-300 focus:ring-sky-500" 
              />
              <span className="ml-3 text-sm text-slate-600 group-hover:text-sky-600 transition-colors">{airline}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Outros Filtros Importantes Recomendados */}
      <div className="pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-400 font-medium italic">Filtros adicionais: Horários, Aeroportos, Bagagem inclusa, Duração do voo, Classe da cabine, Flexibilidade de datas.</p>
      </div>
    </div>
  );
};

export default Filters;
