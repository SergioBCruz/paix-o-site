
import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Github, Chrome, CheckCircle2, Heart } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulação de autenticação
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-sky-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

      <div className="max-w-md w-full space-y-8 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-4 bg-blue-600 rounded-2xl shadow-xl shadow-blue-500/20 mb-6">
            <Heart className="h-8 w-8 text-white fill-white/20" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-500">
            {isLogin ? 'Acesse suas viagens e ofertas exclusivas.' : 'Junte-se a milhares de viajantes apaixonados.'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Nome Completo</label>
                <input 
                  type="text" 
                  required 
                  className="w-full pl-4 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-semibold transition-all" 
                  placeholder="Seu nome"
                />
              </div>
            )}
            
            <div className="relative">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input 
                  type="email" 
                  required 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-semibold transition-all" 
                  placeholder="exemplo@email.com"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input 
                  type="password" 
                  required 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-semibold transition-all" 
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500" id="remember" />
                <label htmlFor="remember" className="ml-2 block text-xs font-bold text-slate-500 uppercase tracking-wider">Lembrar de mim</label>
              </div>
              <button type="button" className="text-xs font-black text-blue-600 hover:text-blue-700 uppercase tracking-wider">Esqueceu a senha?</button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-5 px-4 border border-transparent text-sm font-black rounded-2xl text-white bg-slate-950 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all uppercase tracking-[0.2em] shadow-xl disabled:opacity-70"
          >
            {loading ? (
              <span className="flex items-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Validando...
              </span>
            ) : (
              <>
                {isLogin ? 'Entrar no Painel' : 'Criar Minha Conta'}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-white text-slate-400 font-bold uppercase tracking-widest">Ou continue com</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center py-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all">
              <Chrome className="h-5 w-5 mr-2 text-red-500" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-700">Google</span>
            </button>
            <button className="flex items-center justify-center py-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all">
              <Github className="h-5 w-5 mr-2 text-slate-900" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-700">Github</span>
            </button>
          </div>
        </div>

        <div className="text-center mt-8">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
          >
            {isLogin ? 'Não tem uma conta? ' : 'Já possui uma conta? '}
            <span className="text-blue-600 font-black uppercase tracking-wider">{isLogin ? 'Cadastre-se' : 'Faça Login'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
