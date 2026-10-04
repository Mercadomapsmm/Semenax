import React from 'react';
import { ShieldCheck, Award, ArrowRight, Droplets, Flame, CheckCircle, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { IMAGES } from '../assets/images';

interface HeroBannerProps {
  lang: Language;
  onSelectTab: (tab: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ lang, onSelectTab }) => {
  return (
    <section className="relative overflow-hidden py-12 lg:py-20 bg-gradient-to-b from-[#070d19] via-[#0b1329] to-[#070d19]">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Clinical Value */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Pill badges */}
            <div className="inline-flex flex-wrap items-center gap-2 p-1 px-3 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>{lang === 'pt' ? 'Estudo Clínico Duplo-Cego Dr. Craig Hall' : 'Dr. Craig Hall Double-Blind Clinical Trial'}</span>
              <span className="text-slate-500">|</span>
              <span className="text-amber-400">★ +48.8% Volume</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              {lang === 'pt' ? (
                <>
                  Multiplique o seu <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">Volume Seminal</span> & a Intensidade do Orgasmo.
                </>
              ) : (
                <>
                  Amplify your <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">Seminal Fluid Volume</span> & Climax Force.
                </>
              )}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {lang === 'pt' ? (
                <>
                  O Semenax® é a fórmula médica natural de referência mundial, formulada com 17 aminoácidos e extratos botânicos concentrados para nutrir as vesículas seminais, a glândula prostática e maximizar a força das contrações pélvicas.
                </>
              ) : (
                <>
                  Semenax® is the gold-standard all-natural male health formulation, clinically formulated with 17 amino acids and concentrated botanicals targeting seminal vesicles, prostate secretions, and muscular ejaculatory propulsion.
                </>
              )}
            </p>

            {/* Key Clinical Proof Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-700/50 flex items-center justify-center text-cyan-400 shrink-0">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-bold text-white">+48.8%</div>
                  <div className="text-[11px] text-slate-400">{lang === 'pt' ? 'Mais Volume' : 'More Volume'}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-blue-950/80 border border-blue-700/50 flex items-center justify-center text-blue-400 shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-bold text-white">+71.3%</div>
                  <div className="text-[11px] text-slate-400">{lang === 'pt' ? 'Intensidade' : 'Climax Length'}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <div className="w-9 h-9 rounded-lg bg-amber-950/80 border border-amber-700/50 flex items-center justify-center text-amber-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-bold text-white">67 {lang === 'pt' ? 'Dias' : 'Days'}</div>
                  <div className="text-[11px] text-slate-400">{lang === 'pt' ? 'Garantia Total' : 'Money-Back'}</div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <button
                onClick={() => onSelectTab('tracker')}
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-xl shadow-cyan-600/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{lang === 'pt' ? 'Rastrear Dose de Hoje (4 Cápsulas)' : 'Track Today’s Dose (4 Capsules)'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSelectTab('quiz')}
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>{lang === 'pt' ? 'Teste de Potência Seminal (1 min)' : 'Volume Assessment Quiz (1 min)'}</span>
              </button>
            </div>

            {/* Safe badges info */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>cGMP Certified Facility</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Made in USA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>100% {lang === 'pt' ? 'Ingredientes Naturais' : 'Natural Botanicals'}</span>
              </div>
            </div>

          </div>

          {/* Right Column: High Quality Product Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              
              {/* Radial glow background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 via-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 scale-95" />
              
              {/* Product Card Container */}
              <div className="relative rounded-3xl p-4 sm:p-6 bg-gradient-to-b from-slate-900/90 to-[#0b1329]/95 border border-slate-800/90 shadow-2xl backdrop-blur-xl max-w-sm">
                
                {/* Official Badge Tag */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[11px] uppercase tracking-wider shadow-lg flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>{lang === 'pt' ? 'Fórmula Original Certificada' : 'Official Verified Formula'}</span>
                </div>

                {/* Bottle Image */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-800/40 to-slate-900/40 p-4 border border-slate-700/50 flex items-center justify-center my-3">
                  <img
                    src={IMAGES.bottle}
                    alt="Semenax Dietary Supplement Bottle"
                    className="w-full h-auto max-h-[360px] object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)] transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-slate-950/80 border border-slate-700 text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                    120 Cápsulas
                  </div>
                </div>

                {/* Micro Details Box */}
                <div className="space-y-2 pt-1 text-center">
                  <div className="flex items-center justify-between text-xs px-2 text-slate-400">
                    <span>{lang === 'pt' ? 'Posologia Diária' : 'Daily Routine'}</span>
                    <span className="font-semibold text-white">4 {lang === 'pt' ? 'cápsulas/dia' : 'caps/day'}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs px-2 text-slate-400">
                    <span>{lang === 'pt' ? 'Ciclo de Espermatogênese' : 'Cycle Duration'}</span>
                    <span className="font-semibold text-cyan-400">64 - 72 {lang === 'pt' ? 'dias' : 'days'}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs px-2 text-slate-400">
                    <span>{lang === 'pt' ? 'Fabricação' : 'Manufacturer'}</span>
                    <span className="font-semibold text-white">Leading Edge Health</span>
                  </div>

                  <button
                    onClick={() => onSelectTab('store')}
                    className="w-full mt-3 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-slate-800 hover:bg-cyan-600 hover:text-white text-cyan-400 border border-cyan-800/60 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>{lang === 'pt' ? 'Ver Pacotes & Preços Oficiais' : 'View Bundles & Official Pricing'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
