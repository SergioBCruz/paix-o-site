
import React, { useState } from 'react';
import { CreditCard, Lock, ShieldCheck, Mail, Phone, User } from 'lucide-react';
import { Flight } from '../types';

interface CheckoutProps {
  flight: Flight | null;
  onComplete: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ flight, onComplete }) => {
  const [loading, setLoading] = useState(false);

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
        alert("Reserva concluída com sucesso! Os vouchers foram enviados para seu e-mail.");
        onComplete();
    }, 2000);
  };

  if (!flight) return null;

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-3xl font-black text-slate-800">Finalizar Reserva</h2>

          <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold mb-6 flex items-center">
                <User className="h-5 w-5 mr-2 text-sky-600" />
                Dados do Passageiro
            </h3>
            <form onSubmit={handleFinish} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nome</label>
                        <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" required />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Sobrenome</label>
                        <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" required />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">E-mail</label>
                        <input type="email" placeholder="Para receber os vouchers" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" required />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Telefone</label>
                        <input type="tel" placeholder="+55 (11) 99999-9999" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" required />
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100">
                    <h3 className="text-xl font-bold mb-6 flex items-center">
                        <CreditCard className="h-5 w-5 mr-2 text-sky-600" />
                        Pagamento Seguro
                    </h3>
                    <div className="space-y-4">
                        <div className="relative">
                            <Lock className="absolute right-3 top-10 h-4 w-4 text-slate-300" />
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Número do Cartão</label>
                            <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" required />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Vencimento</label>
                                <input type="text" placeholder="MM/AA" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">CVV</label>
                                <input type="text" placeholder="123" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" required />
                            </div>
                        </div>
                    </div>
                </div>

                <button 
                  disabled={loading}
                  type="submit"
                  className="w-full bg-sky-600 text-white py-5 rounded-2xl text-xl font-bold hover:bg-sky-700 transition-all shadow-xl flex items-center justify-center disabled:opacity-50"
                >
                  {loading ? 'Processando...' : 'Finalizar Pagamento'}
                </button>
            </form>
          </section>
        </div>

        <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <h4 className="font-bold text-slate-800 mb-4 pb-4 border-b border-slate-100">Resumo do Pedido</h4>
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Voo {flight.origin} - {flight.destination}</span>
                        <span className="font-bold">R$ {flight.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Taxas de Embarque</span>
                        <span className="font-bold text-green-600">Grátis</span>
                    </div>
                </div>
                <div className="flex justify-between items-center text-xl font-black text-sky-700 pt-4 border-t border-slate-100">
                    <span>Total</span>
                    <span>R$ {flight.price.toLocaleString()}</span>
                </div>
            </div>

            <div className="bg-green-50 p-6 rounded-3xl border border-green-100 flex items-center">
                <ShieldCheck className="h-8 w-8 text-green-600 mr-4" />
                <p className="text-xs font-medium text-green-800">
                    Sua conexão é criptografada e seus dados estão 100% seguros com certificação SSL.
                </p>
            </div>
        </aside>

      </div>
    </div>
  );
};

export default Checkout;
