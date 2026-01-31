
import React from 'react';
// Added Clock to imports
import { ArrowLeft, Luggage, Coffee, Wifi, Tv, ShieldCheck, Star, Clock } from 'lucide-react';
import { Flight } from '../types';

interface FlightDetailsProps {
  flight: Flight | null;
  onBack: () => void;
  onCheckout: () => void;
}

const FlightDetails: React.FC<FlightDetailsProps> = ({ flight, onBack, onCheckout }) => {
  if (!flight) return null;

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="flex items-center text-sky-600 font-bold mb-8 hover:underline"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para resultados
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-sky-600 p-8 text-white flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Resumo do Voo</h2>
              <p className="opacity-80">De {flight.origin} para {flight.destination}</p>
            </div>
            <div className="text-right">
              <span className="block text-sm opacity-80 uppercase tracking-widest font-bold">Total</span>
              <span className="text-3xl font-black">R$ {flight.price.toLocaleString()}</span>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Flight Segment */}
            <div className="border-l-2 border-sky-100 pl-6 relative">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-sky-600 border-2 border-white" />
              <div className="mb-6">
                <span className="text-lg font-bold text-slate-800">{flight.departureTime} • {flight.origin}</span>
                <p className="text-sm text-slate-500 font-medium">Terminal 3, Aeroporto de Guarulhos</p>
              </div>
              
              <div className="flex items-center space-x-4 mb-6 text-slate-400">
                <div className="bg-slate-50 px-3 py-1 rounded-full text-xs font-bold flex items-center border border-slate-100">
                  <Clock className="h-3 w-3 mr-1" />
                  Duração: {flight.duration}
                </div>
                <div className="bg-slate-50 px-3 py-1 rounded-full text-xs font-bold flex items-center border border-slate-100">
                  <Star className="h-3 w-3 mr-1 text-yellow-500" />
                  Voo operado por {flight.airline}
                </div>
              </div>

              <div className="absolute -left-[9px] bottom-0 w-4 h-4 rounded-full bg-sky-600 border-2 border-white" />
              <div>
                <span className="text-lg font-bold text-slate-800">{flight.arrivalTime} • {flight.destination}</span>
                <p className="text-sm text-slate-500 font-medium">Aeroporto Humberto Delgado</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center text-center border border-slate-100">
                <Luggage className="h-6 w-6 text-sky-500 mb-2" />
                <span className="text-xs font-bold text-slate-700">Mala 23kg</span>
                <span className="text-[10px] text-green-600 font-bold uppercase">Incluso</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center text-center border border-slate-100">
                <Wifi className="h-6 w-6 text-sky-500 mb-2" />
                <span className="text-xs font-bold text-slate-700">Wi-Fi</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Disponível</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center text-center border border-slate-100">
                <Coffee className="h-6 w-6 text-sky-500 mb-2" />
                <span className="text-xs font-bold text-slate-700">Refeição</span>
                <span className="text-[10px] text-green-600 font-bold uppercase">Incluso</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center text-center border border-slate-100">
                <Tv className="h-6 w-6 text-sky-500 mb-2" />
                <span className="text-xs font-bold text-slate-700">Entretenimento</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Full HD</span>
              </div>
            </div>

            {/* Refund & Safety */}
            <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl flex items-start">
              <ShieldCheck className="h-6 w-6 text-orange-500 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-orange-900 mb-1">Flexibilidade & Reembolso</h4>
                <p className="text-sm text-orange-800 opacity-90 leading-relaxed">
                  Este voo permite cancelamento gratuito em até 24h após a compra. Alterações de data podem ter taxas adicionais conforme a política da {flight.airline}. Compre com tranquilidade garantida pela Paixão por Viagem.
                </p>
              </div>
            </div>

            <button 
              onClick={onCheckout}
              className="w-full bg-green-600 text-white py-5 rounded-2xl text-xl font-bold hover:bg-green-700 transition-all shadow-xl hover:shadow-green-200 active:scale-[0.98]"
            >
              Garantir minha vaga agora!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;
