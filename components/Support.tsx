
import React from 'react';
import { HelpCircle, MessageSquare, Phone, Mail, ChevronDown } from 'lucide-react';

const Support: React.FC = () => {
  const faqs = [
    { q: "Como cancelar minha passagem?", a: "Você pode solicitar o cancelamento diretamente no seu painel de cliente ou enviando um e-mail para paixaoporviagens18@gmail.com." },
    { q: "Quais as formas de pagamento aceitas?", a: "Aceitamos todos os cartões de crédito, PIX e boleto bancário com parcelamento em até 12x." },
    { q: "Como alterar a data do meu voo?", a: "Alterações podem ser feitas até 48h antes do voo, sujeitas a taxas da companhia aérea e diferença tarifária." },
    { q: "Tive um problema no aeroporto, o que fazer?", a: "Ligue imediatamente para nosso suporte emergencial: +34 711086870 (WhatsApp disponível 24h)." }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Central de Ajuda</h1>
          <p className="text-lg text-slate-500 font-medium">Estamos aqui para garantir que sua única preocupação seja aproveitar a viagem.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center group hover:border-blue-500 transition-all cursor-pointer">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-all">
              <MessageSquare className="h-8 w-8 text-blue-600 group-hover:text-white" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">WhatsApp</h3>
            <p className="text-sm text-slate-500">+34 711086870</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center group hover:border-blue-500 transition-all cursor-pointer">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-all">
              <Mail className="h-8 w-8 text-blue-600 group-hover:text-white" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">E-mail</h3>
            <p className="text-sm text-slate-500">paixaoporviagens18@gmail.com</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center group hover:border-blue-500 transition-all cursor-pointer">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-all">
              <Phone className="h-8 w-8 text-blue-600 group-hover:text-white" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Telefone</h3>
            <p className="text-sm text-slate-500">Atendimento 24h</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100">
            <h2 className="text-2xl font-black text-slate-900">Perguntas Frequentes</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {faqs.map((item, idx) => (
              <div key={idx} className="p-6 hover:bg-slate-50 transition-all cursor-pointer group">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800">{item.q}</h4>
                  <ChevronDown className="h-5 w-5 text-slate-400 group-hover:text-blue-600 transition-all" />
                </div>
                <p className="mt-4 text-sm text-slate-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
