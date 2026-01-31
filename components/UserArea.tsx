
import React, { useState } from 'react';
import { 
  User, Wallet, Ticket, Settings, ChevronRight, LogOut, 
  Mail, Phone, MapPin, CreditCard, Camera, 
  Plus, History, Plane
} from 'lucide-react';
import { AppView } from '../types';

type UserSection = 'data' | 'payments' | 'trips' | 'edit';

interface UserAreaProps {
  onNavigate: (view: AppView) => void;
}

const UserArea: React.FC<UserAreaProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState<UserSection>('data');

  const menuItems = [
    { id: 'data', label: 'Meus Dados', icon: <User className="h-5 w-5" /> },
    { id: 'payments', label: 'Pagamentos', icon: <Wallet className="h-5 w-5" /> },
    { id: 'trips', label: 'Minhas Viagens', icon: <Ticket className="h-5 w-5" /> },
    { id: 'edit', label: 'Editar Perfil', icon: <Settings className="h-5 w-5" /> },
  ];

  const handleLogout = () => {
    if (confirm("Deseja realmente encerrar sua sessão?")) {
      // Direciona para LOGIN em vez da HOME para permitir nova entrada
      onNavigate(AppView.LOGIN);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'data':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 mb-6">Informações Pessoais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome Completo</p>
                  <p className="text-slate-700 font-bold">Cleu Paixão</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CPF / Documento</p>
                  <p className="text-slate-700 font-bold">***.458.219-**</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data de Nascimento</p>
                  <p className="text-slate-700 font-bold">18/05/1992</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nacionalidade</p>
                  <p className="text-slate-700 font-bold">Brasileira</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 mb-6">Contatos e Endereço</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-50 p-3 rounded-xl"><Mail className="h-5 w-5 text-blue-600" /></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">E-mail Principal</p>
                    <p className="text-slate-700 font-bold">paixaoporviagens18@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-50 p-3 rounded-xl"><Phone className="h-5 w-5 text-blue-600" /></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Telefone</p>
                    <p className="text-slate-700 font-bold">+34 711086870</p>
                  </div>
                </div>
                <div className="md:col-span-2 flex items-center space-x-4">
                  <div className="bg-blue-50 p-3 rounded-xl"><MapPin className="h-5 w-5 text-blue-600" /></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Residência Atual</p>
                    <p className="text-slate-700 font-bold">Madrid, Espanha</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'payments':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-br from-slate-900 to-blue-900 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <CreditCard className="h-10 w-10 text-blue-400" />
                  <span className="text-xs font-black uppercase tracking-widest opacity-60">Cartão Principal</span>
                </div>
                <p className="text-2xl font-mono tracking-widest mb-6">**** **** **** 8821</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] uppercase opacity-60 mb-1">Titular</p>
                    <p className="font-bold uppercase">Cleu Paixão</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase opacity-60 mb-1">Validade</p>
                    <p className="font-bold">12/28</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-900">Histórico de Pagamentos</h3>
                <History className="h-5 w-5 text-slate-300" />
              </div>
              <div className="space-y-4">
                {[
                  { desc: 'Voo GRU -> LIS', val: 'R$ 2.450,40', date: '12 Out 2024', status: 'Aprovado' },
                  { desc: 'Reserva Hotel Madrid', val: 'R$ 850,00', date: '05 Out 2024', status: 'Aprovado' }
                ].map((pay, i) => (
                  <div key={i} className="flex justify-between items-center p-4 hover:bg-slate-50 rounded-2xl transition-colors">
                    <div>
                      <p className="font-bold text-slate-800">{pay.desc}</p>
                      <p className="text-xs text-slate-400 font-medium">{pay.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-slate-900">{pay.val}</p>
                      <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">{pay.status}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 flex items-center justify-center space-x-2 py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold hover:border-blue-400 hover:text-blue-600 transition-all">
                <Plus className="h-4 w-4" />
                <span>Adicionar Novo Cartão</span>
              </button>
            </div>
          </div>
        );
      case 'trips':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
               <h3 className="text-xl font-black text-slate-900 mb-6">Próxima Parada</h3>
               <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center space-x-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm"><Plane className="h-6 w-6 text-blue-600" /></div>
                    <div>
                      <p className="font-black text-slate-900">São Paulo ✈ Lisboa</p>
                      <p className="text-sm text-slate-500 font-medium">Partida: 22 de Outubro, 08:30</p>
                    </div>
                  </div>
                  <button className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30">
                    Ver Voucher
                  </button>
               </div>
             </div>
             
             <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
               <h3 className="text-xl font-black text-slate-900 mb-6">Viagens Passadas</h3>
               <div className="space-y-4">
                 {[
                   { route: 'Rio (GIG) ✈ Buenos Aires (EZE)', date: 'Março 2024' },
                   { route: 'Madrid (MAD) ✈ Paris (CDG)', date: 'Janeiro 2024' }
                 ].map((trip, i) => (
                   <div key={i} className="flex justify-between items-center p-4 border border-slate-50 rounded-2xl opacity-60">
                      <div className="flex items-center space-x-4">
                        <Ticket className="h-5 w-5 text-slate-400" />
                        <span className="font-bold text-slate-700">{trip.route}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-400">{trip.date}</span>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        );
      case 'edit':
        return (
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-black text-slate-900 mb-8">Editar Perfil</h3>
            <div className="flex flex-col items-center mb-10">
              <div className="relative group">
                <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
                  <User className="h-16 w-16 text-blue-600" />
                </div>
                <button className="absolute bottom-0 right-0 bg-slate-900 text-white p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-4 text-sm font-bold text-slate-400 uppercase tracking-widest">Alterar Foto de Perfil</p>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">E-mail</label>
                <input type="email" defaultValue="paixaoporviagens18@gmail.com" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-semibold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Telefone</label>
                <input type="tel" defaultValue="+34 711086870" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-semibold" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Senha Atual</label>
                <input type="password" placeholder="••••••••" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-semibold" />
              </div>
              <div className="md:col-span-2 pt-4">
                <button className="w-full bg-slate-950 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-blue-600 transition-all uppercase tracking-wider">
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        );
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-500/40">
              <User className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Painel de Controle</h1>
              <p className="text-slate-500 font-medium">Bem-vindo(a) de volta, <span className="text-blue-600 font-bold">Cleu Paixão</span></p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
             <div className="px-4 py-2 bg-green-50 rounded-xl">
               <p className="text-[10px] font-black text-green-600 uppercase">Status da Conta</p>
               <p className="text-sm font-bold text-slate-700">VIP Silver</p>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Sub-Navigation Sidebar */}
          <aside className="lg:col-span-3">
             <div className="bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-sm sticky top-28">
               <nav className="flex flex-col space-y-2">
                 {menuItems.map((item) => (
                   <button 
                     key={item.id}
                     onClick={() => setActiveSection(item.id as UserSection)}
                     className={`flex items-center justify-between p-5 rounded-[1.5rem] transition-all group ${
                       activeSection === item.id 
                       ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' 
                       : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'
                     }`}
                   >
                     <div className="flex items-center">
                       <span className={`p-2 rounded-xl mr-4 transition-colors ${activeSection === item.id ? 'bg-white/20' : 'bg-slate-50 group-hover:bg-blue-50'}`}>
                         {item.icon}
                       </span>
                       <span className="font-black text-sm uppercase tracking-wider">{item.label}</span>
                     </div>
                     <ChevronRight className={`h-4 w-4 transition-transform ${activeSection === item.id ? 'translate-x-1' : 'opacity-0'}`} />
                   </button>
                 ))}
                 
                 <div className="pt-6 mt-6 border-t border-slate-50">
                   <button 
                    onClick={handleLogout}
                    className="flex items-center w-full p-5 text-red-500 font-black text-sm uppercase tracking-wider hover:bg-red-50 rounded-[1.5rem] transition-all"
                   >
                     <LogOut className="h-5 w-5 mr-4" />
                     Encerrar Sessão
                   </button>
                 </div>
               </nav>
             </div>
          </aside>

          {/* Dynamic Content Area */}
          <div className="lg:col-span-9">
            {renderSection()}
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserArea;
