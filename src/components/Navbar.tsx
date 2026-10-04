import React from 'react';
import { ShieldCheck, Activity, Award, Menu, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  lang: Language;
  onToggleLang: () => void;
  todayCompleted: boolean;
  streakDays: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  lang,
  onToggleLang,
  todayCompleted,
  streakDays
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'overview', labelPt: 'Visão Geral', labelEn: 'Overview' },
    { id: 'tracker', labelPt: 'Rastreador Diário', labelEn: 'Daily Tracker' },
    { id: 'kegel', labelPt: 'Treino Pélvico', labelEn: 'Kegel Trainer' },
    { id: 'formula', labelPt: 'Fórmula & Ciência', labelEn: 'Formula & Science' },
    { id: 'study', labelPt: 'Estudo Clínico', labelEn: 'Clinical Trial' },
    { id: 'quiz', labelPt: 'Teste de Volume', labelEn: 'Volume Quiz' },
    { id: 'guide', labelPt: 'Guia 90 Dias', labelEn: '90-Day Guide' },
    { id: 'verify', labelPt: 'Verificar Lote', labelEn: 'Verify Batch' },
    { id: 'store', labelPt: 'Loja Oficial', labelEn: 'Official Store', highlight: true }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#070d19]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => onSelectTab('overview')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 p-[2px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#0b1329] rounded-[10px] flex items-center justify-center">
                <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  S
                </span>
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold tracking-wider text-white">
                  SEMEN<span className="text-cyan-400">AX</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 uppercase tracking-widest">
                  Rx Natural
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                {lang === 'pt' ? 'Vitalidade Masculina & Volume Seminal' : 'Male Vitality & Semen Output Companion'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              if (item.highlight) {
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className="ml-2 px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-200" />
                    <span>{lang === 'pt' ? item.labelPt : item.labelEn}</span>
                  </button>
                );
              }
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-800/90 text-cyan-400 shadow-sm border border-slate-700'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {lang === 'pt' ? item.labelPt : item.labelEn}
                </button>
              );
            })}
          </nav>

          {/* Actions: Streak & Language */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Streak Pill */}
            <div 
              onClick={() => onSelectTab('tracker')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer border transition-all ${
                todayCompleted
                  ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-400 hover:bg-emerald-900/60'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-cyan-500/50'
              }`}
              title={lang === 'pt' ? 'Sequência de uso diário' : 'Daily streak'}
            >
              {todayCompleted ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
              )}
              <span>
                {streakDays} {lang === 'pt' ? 'dias' : 'days'}
              </span>
            </div>

            {/* Language Switch */}
            <button
              onClick={onToggleLang}
              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors uppercase tracking-wider"
              aria-label="Toggle language"
            >
              {lang === 'pt' ? '🇺🇸 EN' : '🇧🇷 PT'}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#070d19]/95 px-4 pt-3 pb-6 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                currentTab === item.id
                  ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-800/50'
                  : item.highlight
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {lang === 'pt' ? item.labelPt : item.labelEn}
            </button>
          ))}
          <div className="pt-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700 text-xs">
              <span className="text-slate-400">
                {lang === 'pt' ? 'Sequência de Uso:' : 'Active Streak:'}
              </span>
              <span className="font-bold text-cyan-400">
                🔥 {streakDays} {lang === 'pt' ? 'dias consecutivos' : 'consecutive days'}
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
