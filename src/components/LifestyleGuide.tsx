import React from 'react';
import { Clock, Sparkles, Droplets, Flame, ShieldCheck, Apple, Ban, HeartHandshake } from 'lucide-react';
import { Language } from '../types';
import { BIOLOGICAL_TIMELINE, NUTRITION_TIPS } from '../data/lifestyle';

interface LifestyleGuideProps {
  lang: Language;
}

export const LifestyleGuide: React.FC<LifestyleGuideProps> = ({ lang }) => {
  const getPhaseIcon = (name: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-blue-400" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-amber-400" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
          <Clock className="w-3.5 h-3.5" />
          <span>{lang === 'pt' ? 'Fisiologia Masculina: O Ciclo de 90 Dias' : 'Male Physiology: The 90-Day Cycle'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
          {lang === 'pt' ? 'A Linha do Tempo da Espermatogênese' : 'The Spermatogenesis Output Timeline'}
        </h2>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto">
          {lang === 'pt'
            ? 'A espermatogênese humana completa leva de 64 a 72 dias. Descubra as transformações biológicas que ocorrem a cada semana com a posologia diária do Semenax.'
            : 'Human spermatogenesis requires 64 to 72 days for a full cellular turnover. Here is how your glandular output transforms week-by-week on Semenax.'}
        </p>
      </div>

      {/* Biological Timeline Cards */}
      <div className="space-y-6">
        {BIOLOGICAL_TIMELINE.map((phase, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#0b1329]/90 border border-slate-800 space-y-4 hover:border-cyan-800/80 transition-all duration-300 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                  {getPhaseIcon(phase.icon)}
                </div>
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    {lang === 'pt' ? phase.weeks : phase.weeks}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    {lang === 'pt' ? phase.titlePt : phase.titleEn}
                  </h3>
                </div>
              </div>

              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 w-fit">
                {lang === 'pt' ? phase.phasePt : phase.phaseEn}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {lang === 'pt' ? phase.descriptionPt : phase.descriptionEn}
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {lang === 'pt' ? 'O que você vai notar nesta fase:' : 'What you will notice during this phase:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {(lang === 'pt' ? phase.keyChangesPt : phase.keyChangesEn).map((change, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-cyan-100 flex items-start gap-2"
                  >
                    <span className="text-cyan-400 font-bold">✔</span>
                    <span>{change}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Nutrition & Lifestyle Dos and Don'ts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Do: Volume Friendly Foods */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-900/50 space-y-4">
          <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-base">
            <Apple className="w-5 h-5 shrink-0" />
            <h3>{lang === 'pt' ? NUTRITION_TIPS[0].categoryPt : NUTRITION_TIPS[0].categoryEn}</h3>
          </div>

          <div className="space-y-2.5 text-xs text-slate-300">
            {(lang === 'pt' ? NUTRITION_TIPS[0].itemsPt : NUTRITION_TIPS[0].itemsEn).map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 leading-relaxed">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Don't: Volume Inhibitors */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-rose-900/50 space-y-4">
          <div className="flex items-center gap-2.5 text-rose-400 font-bold text-base">
            <Ban className="w-5 h-5 shrink-0" />
            <h3>{lang === 'pt' ? NUTRITION_TIPS[1].categoryPt : NUTRITION_TIPS[1].categoryEn}</h3>
          </div>

          <div className="space-y-2.5 text-xs text-slate-300">
            {(lang === 'pt' ? NUTRITION_TIPS[1].itemsPt : NUTRITION_TIPS[1].itemsEn).map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 leading-relaxed">
                {item}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
