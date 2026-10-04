import React, { useState } from 'react';
import { Search, Filter, Sparkles, Shield, ChevronRight, Activity } from 'lucide-react';
import { Language, Ingredient } from '../types';
import { INGREDIENTS_DATA } from '../data/ingredients';

interface FormulaExplorerProps {
  lang: Language;
}

export const FormulaExplorer: React.FC<FormulaExplorerProps> = ({ lang }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTarget, setSelectedTarget] = useState<string>('all');
  const [activeIngredient, setActiveIngredient] = useState<Ingredient | null>(null);

  const targets = [
    { id: 'all', labelPt: 'Todos (17 Ativos)', labelEn: 'All (17 Actives)' },
    { id: 'vesicles', labelPt: 'Vesículas Seminais (Volume)', labelEn: 'Seminal Vesicles (Volume)' },
    { id: 'prostate', labelPt: 'Próstata & Canais', labelEn: 'Prostate Health' },
    { id: 'bloodflow', labelPt: 'Óxido Nítrico & Rigidez', labelEn: 'Nitric Oxide & Flow' },
    { id: 'testosterone', labelPt: 'Testosterona & Andrógenos', labelEn: 'Testosterone & Libido' },
    { id: 'vitality', labelPt: 'Mitocôndrias & Vigor', labelEn: 'Cellular Energy' }
  ];

  const filteredIngredients = INGREDIENTS_DATA.filter((item) => {
    const matchesTarget = selectedTarget === 'all' || item.targetOrgan === selectedTarget;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.latinName.toLowerCase().includes(query) ||
      item.descriptionPt.toLowerCase().includes(query) ||
      item.descriptionEn.toLowerCase().includes(query);
    return matchesTarget && matchesSearch;
  });

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      
      {/* Title & Scientific Credibility */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{lang === 'pt' ? 'Fórmula Farmacêutica Natural cGMP' : 'Natural Pharmaceutical Grade cGMP'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
          {lang === 'pt' ? 'Os 17 Ingredientes Ativos do Semenax' : 'The 17 Bioactive Ingredients of Semenax'}
        </h2>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto">
          {lang === 'pt'
            ? 'Diferente de suplementos genéricos, cada componente do Semenax foi dosado cientificamente para atuar nos 3 sistemas glandulares responsáveis pela produção de sêmen.'
            : 'Unlike generic supplements, every botanical and amino acid in Semenax is clinically calibrated to nourish the 3 key gland systems driving seminal fluid generation.'}
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'pt' ? 'Buscar ingrediente ou benefício...' : 'Search ingredient or benefit...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Target Organ Filter Pills */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {targets.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTarget(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedTarget === t.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {lang === 'pt' ? t.labelPt : t.labelEn}
            </button>
          ))}
        </div>

      </div>

      {/* Ingredients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredIngredients.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveIngredient(item)}
            className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0b1329]/90 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all duration-300 group hover:shadow-xl hover:shadow-cyan-950/30 flex flex-col justify-between"
          >
            <div className="space-y-3">
              
              {/* Top row: Target Badge & Dosage */}
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-md bg-cyan-950/90 text-cyan-300 border border-cyan-800/60 font-semibold text-[11px]">
                  {lang === 'pt' ? item.targetOrganLabel : item.targetOrganLabelEn}
                </span>
                <span className="font-extrabold text-white text-xs px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                  {item.dosage}
                </span>
              </div>

              {/* Title & Latin Name */}
              <div>
                <h3 className="font-extrabold text-white text-base group-hover:text-cyan-400 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-400 italic">
                  {item.latinName}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                {lang === 'pt' ? item.descriptionPt : item.descriptionEn}
              </p>

            </div>

            {/* Bottom Benefit Tag */}
            <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-cyan-400 font-semibold text-[11px] truncate pr-2">
                ★ {lang === 'pt' ? item.scientificBenefit : item.scientificBenefitEn}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0" />
            </div>

          </div>
        ))}
      </div>

      {/* Ingredient Detail Modal */}
      {activeIngredient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0b1329] border border-cyan-700/60 p-6 sm:p-8 space-y-6 shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-bold mb-2">
                  <Activity className="w-3.5 h-3.5" />
                  <span>{lang === 'pt' ? activeIngredient.targetOrganLabel : activeIngredient.targetOrganLabelEn}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {activeIngredient.name}
                </h3>
                <p className="text-xs text-slate-400 italic mt-0.5">
                  {activeIngredient.latinName}
                </p>
              </div>

              <button
                onClick={() => setActiveIngredient(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Dosage highlight */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">{lang === 'pt' ? 'Concentração na Dose Diária:' : 'Daily Protocol Concentration:'}</span>
              <span className="font-extrabold text-cyan-400 text-sm">{activeIngredient.dosage}</span>
            </div>

            {/* Detailed Mechanism */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                {lang === 'pt' ? 'Mecanismo de Ação Biológico' : 'Biological Mechanism of Action'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                {lang === 'pt' ? activeIngredient.mechanismPt : activeIngredient.mechanismEn}
              </p>
            </div>

            {/* Clinical Benefit */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-800/60 text-cyan-200 text-xs flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="font-bold">{lang === 'pt' ? 'Resultado Comprovado:' : 'Targeted Outcome:'}</span>{' '}
                {lang === 'pt' ? activeIngredient.scientificBenefit : activeIngredient.scientificBenefitEn}
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setActiveIngredient(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
            >
              {lang === 'pt' ? 'Fechar' : 'Close'}
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
