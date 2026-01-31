
import React from 'react';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';

const Blog: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
            <div className="flex items-center space-x-4 text-sky-600 text-sm font-bold mb-4 uppercase tracking-widest">
                <Tag className="h-4 w-4" />
                <span>Dicas de Economia</span>
                <span>•</span>
                <Calendar className="h-4 w-4" />
                <span>24 Mai, 2024</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
                Como encontrar passagens aéreas baratas para Lisboa no verão de 2024
            </h1>
            <div className="flex items-center space-x-3 text-slate-500">
                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold">CP</div>
                <span className="font-medium">Escrito por Cleu Paixão</span>
            </div>
        </header>

        <img src="https://picsum.photos/seed/lisboa-summer/1200/600" alt="Lisboa no Verão" className="w-full h-96 object-cover rounded-3xl mb-12 shadow-lg" />

        <div className="prose prose-sky max-w-none text-slate-700 leading-relaxed space-y-6">
            <p className="text-lg">
                Viajar para a Europa no verão é o sonho de muitos brasileiros, mas o custo das passagens aéreas pode ser um grande impeditivo. No entanto, com as estratégias certas de <strong>baixo custo</strong> e as ferramentas da <strong>Paixão por Viagem</strong>, você pode realizar esse sonho gastando muito menos do que imagina.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8">1. Antecedência é a Alma do Negócio</h2>
            <p>
                Para voos internacionais na alta temporada (junho a agosto), o ideal é começar a pesquisar com pelo menos 4 a 6 meses de antecedência. Em nosso site, você pode ativar alertas de preços que avisam no momento exato em que a tarifa baixa.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8">2. Seja Flexível com Datas e Aeroportos</h2>
            <p>
                Muitas vezes, voar numa terça-feira em vez de um domingo pode economizar até 30% do valor da passagem. Além disso, considere aeroportos alternativos. Se o destino final é Lisboa, verifique voos para o Porto ou Faro e finalize o trajeto de trem (comboio), que é barato e oferece paisagens incríveis.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8">3. Limpe os Cookies ou Use Aba Anônima</h2>
            <p>
                Algoritmos de busca podem aumentar os preços se perceberem que você está pesquisando o mesmo trecho repetidamente. Na Paixão por Viagem, garantimos transparência total, mas em outros buscadores, essa dica é fundamental para evitar inflação artificial.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8">4. Aproveite as Promoções de Madrugada</h2>
            <p>
                Muitas companhias aéreas liberam assentos promocionais durante a madrugada (entre 00h e 05h). Fique atento às nossas notificações de "Ofertas Relâmpago" para não perder essas oportunidades únicas de <strong>passagens aéreas baratas</strong>.
            </p>

            <div className="bg-sky-50 p-8 rounded-3xl border border-sky-100 my-12">
                <h3 className="text-xl font-bold text-sky-900 mb-2">Conclusão</h3>
                <p className="text-sky-800">
                    Encontrar voos econômicos requer paciência e as ferramentas certas. Com a nossa plataforma focada em baixo custo, simplificamos o processo para que sua única preocupação seja fazer as malas. <strong>Lisboa te espera!</strong>
                </p>
            </div>
        </div>
      </article>
    </div>
  );
};

export default Blog;
