
import React from 'react';
import { Plane, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { Flight } from '../types';

interface FlightCardProps {
  flight: Flight;
  onSelect: () => void;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, onSelect }) => {
  return (
    <div className="bg-white rounded-[2rem] p-5 md:p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all group relative overflow-hidden">
      {flight.seatsLeft < 5 && (
        <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-1.5 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest flex items-center z-10">
            ÚLTIMAS VAGAS!
        </div>
      )}

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Airline & Route */}
        <div className="flex items-center space-x-6 w-full lg:w-1/4">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <img src={flight.logo} alt={flight.airline} className="w-12 h-12 object-contain" />
          </div>
          <div>
            <h4 className="font-black text-slate-900 text-base leading-tight">{flight.airline}</h4>
            <p className="text-xs text-blue-500 font-bold uppercase tracking-widest mt-1">{flight.cabin}</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex flex-row items-center justify-between lg:justify-center space-x-4 md:space-x-10 w-full lg:w-1/2 py-4 lg:py-0 border-y lg:border-y-0 border-slate-50">
          <div className="text-left md:text-center">
            <span className="block text-2xl font-black text-slate-900 leading-none">{flight.departureTime}</span>
            <span className="block text-sm font-black text-slate-400 mt-2 uppercase tracking-tighter">{flight.origin}</span>
          </div>
          
          <div className="flex flex-col items-center flex-grow max-w-[120px] md:max-w-[200px]">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{flight.duration}</span>
            <div className="relative w-full h-[3px] bg-blue-100 rounded-full my-2">
              <div className="absolute left-1/2 -translate-x-1/2 -top-2 bg-white px-2">
                <Plane className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${flight.stops === 0 ? 'text-green-600' : 'text-orange-500'}`}>
              {flight.stops === 0 ? 'DIRETO' : `${flight.stops} PARADA(S)`}
            </span>
          </div>

          <div className="text-right md:text-center">
            <span className="block text-2xl font-black text-slate-900 leading-none">{flight.arrivalTime}</span>
            <span className="block text-sm font-black text-slate-400 mt-2 uppercase tracking-tighter">{flight.destination}</span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between w-full lg:w-1/4 pt-2 lg:pt-0 lg:pl-8 lg:border-l border-slate-100">
          <div className="text-left lg:text-right">
            <div className="flex items-center text-green-600 mb-1">
              <CheckCircle2 className="h-4 w-4 mr-1" />
              <span className="text-[10px] font-black uppercase tracking-widest">TAXAS INCLUSAS</span>
            </div>
            <div className="text-3xl font-black text-blue-700 leading-none">
              R$ {flight.price.toLocaleString()}
            </div>
            <span className="hidden lg:block text-[10px] text-slate-400 font-bold mt-1">POR PASSAGEIRO</span>
          </div>
          
          <button 
            onClick={onSelect}
            className="bg-slate-950 text-white text-xs font-black px-6 py-4 rounded-2xl hover:bg-blue-600 transition-all flex items-center shadow-lg active:scale-95"
          >
            DETALHES
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
