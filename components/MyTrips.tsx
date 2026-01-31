
import React from 'react';
import { Plane, Calendar, MapPin, Download, ChevronRight } from 'lucide-react';

const MyTrips: React.FC = () => {
  const trips = [
    { id: '1', route: 'São Paulo (GRU) ✈ Lisboa (LIS)', date: '15 Out 2024', status: 'Ativo', color: 'blue' },
    { id: '2', route: 'Rio de Janeiro (GIG) ✈ Buenos Aires (EZE)', date: '12 Dez 2023', status: 'Concluído', color: 'slate' },
    { id: '3', route: 'Brasília (BSB) ✈ Miami (MIA)', date: '05 Jan 2023', status: 'Concluído', color: 'slate' }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Minhas Viagens</h1>
            <p className="text-slate-500 font-medium">Histórico de reservas e tickets ativos.</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-blue-100">
            Buscar Nova Passagem
          </button>
        </div>

        <div className="space-y-6">
          {trips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col md:flex-row items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-6 w-full md:w-auto mb-6 md:mb-0">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${trip.status === 'Ativo' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}`}>
                  <Plane className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">{trip.route}</h3>
                  <div className="flex items-center text-sm text-slate-500 font-medium mt-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    {trip.date}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 w-full md:w-auto">
                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${trip.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                  {trip.status}
                </span>
                <button className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all text-slate-600" title="Baixar Voucher">
                  <Download className="h-5 w-5" />
                </button>
                <button className="flex items-center bg-slate-900 text-white px-6 py-3 rounded-xl text-sm font-bold">
                  Detalhes
                  <ChevronRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyTrips;
