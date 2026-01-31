
import React from 'react';
// Added User to imports
import { Mail, Phone, Instagram, Facebook, Twitter, MapPin, Heart, User } from 'lucide-react';
import { AppView } from '../types';

interface FooterProps {
  onNavigate: (view: AppView) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center text-white">
              <Heart className="h-6 w-6 text-sky-500 mr-2" />
              <span className="text-2xl font-bold">Paixão por Viagem</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Sua agência OTA focada em democratizar o turismo com voos de baixo custo e suporte humanizado.
            </p>
            <div className="flex space-x-4">
              <Instagram className="h-5 w-5 hover:text-sky-500 cursor-pointer transition-colors" />
              <Facebook className="h-5 w-5 hover:text-sky-500 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 hover:text-sky-500 cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Links Úteis</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => onNavigate(AppView.HOME)} className="hover:text-sky-500 transition-colors">Início</button></li>
              <li><button onClick={() => onNavigate(AppView.BLOG)} className="hover:text-sky-500 transition-colors">Blog de Viagens</button></li>
              <li><a href="#" className="hover:text-sky-500 transition-colors">Políticas de Privacidade</a></li>
              <li><a href="#" className="hover:text-sky-500 transition-colors">Termos de Uso</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Destinos Populares</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-sky-500 transition-colors">Voos para Lisboa</a></li>
              <li><a href="#" className="hover:text-sky-500 transition-colors">Voos para Nova York</a></li>
              <li><a href="#" className="hover:text-sky-500 transition-colors">Voos para Buenos Aires</a></li>
              <li><a href="#" className="hover:text-sky-500 transition-colors">Voos para Paris</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Fale Conosco</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <User className="h-5 w-5 mr-3 text-sky-500 flex-shrink-0" />
                <span>Atendimento: Cleu Paixão</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-sky-500 flex-shrink-0" />
                <span>paixaoporviagens18@gmail.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-sky-500 flex-shrink-0" />
                <span>+34 711086870</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© 2024 Paixão por Viagem. Todos os direitos reservados. CNPJ: 00.000.000/0000-00</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
