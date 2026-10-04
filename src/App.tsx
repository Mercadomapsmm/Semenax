import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { DailyTracker } from './components/DailyTracker';
import { KegelTrainer } from './components/KegelTrainer';
import { FormulaExplorer } from './components/FormulaExplorer';
import { ClinicalStudyViewer } from './components/ClinicalStudyViewer';
import { AssessmentQuiz } from './components/AssessmentQuiz';
import { LifestyleGuide } from './components/LifestyleGuide';
import { BatchChecker } from './components/BatchChecker';
import { StoreSection } from './components/StoreSection';
import { Footer } from './components/Footer';
import { Language } from './types';
import { ShieldCheck, Flame, Droplet, Sparkles, Award, ArrowRight, CheckCircle2, Heart } from 'lucide-react';
import { IMAGES } from './assets/images';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [lang, setLang] = useState<Language>('pt');
  const [streakDays, setStreakDays] = useState<number>(1);
  const [todayCompleted, setTodayCompleted] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load language preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('semenax_lang') as Language;
      if (savedLang === 'pt' || savedLang === 'en') {
        setLang(savedLang);
      }
    }
  }, []);

  const toggleLanguage = () => {
    const nextLang = lang === 'pt' ? 'en' : 'pt';
    setLang(nextLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('semenax_lang', nextLang);
    }
  };

  const handleUpdateGlobalStreak = (streak: number, todayDone: boolean) => {
    setStreakDays(streak);
    setTodayCompleted(todayDone);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleKegelWorkoutComplete = () => {
    // Update local storage daily log to set kegelDone: true
    if (typeof window !== 'undefined') {
      const todayStr = new Date().toISOString().split('T')[0];
      const saved = localStorage.getItem('semenax_daily_logs');
      let logsObj: Record<string, unknown> = {};
      if (saved) {
        try {
          logsObj = JSON.parse(saved);
        } catch {
          // ignore
        }
      }
      const existing = (logsObj[todayStr] as Record<string, unknown>) || {};
      logsObj[todayStr] = {
        ...existing,
        kegelDone: true
      };
      localStorage.setItem('semenax_daily_logs', JSON.stringify(logsObj));
      showToast(lang === 'pt' ? 'Treino Kegel salvo no seu Rastreador Diário!' : 'Kegel workout recorded to Daily Tracker!');
    }
  };

  return (
    <div className="min-h-screen bg-[#070d19] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-cyan-950/95 border border-cyan-500 text-cyan-200 text-xs font-bold shadow-2xl flex items-center gap-2.5 animate-bounce">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        lang={lang}
        onToggleLang={toggleLanguage}
        todayCompleted={todayCompleted}
        streakDays={streakDays}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* TAB 1: OVERVIEW */}
        {currentTab === 'overview' && (
          <div className="space-y-12 pb-16">
            <HeroBanner lang={lang} onSelectTab={setCurrentTab} />

            {/* Quick Action Interactive Dashboard Card */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900/90 via-[#0b1329]/95 to-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      {lang === 'pt' ? 'Painel de Controle Diário' : 'Daily Command Center'}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      {lang === 'pt' ? 'Seu Protocolo Semenax de Hoje' : 'Today’s Semenax Protocol'}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium">
                      {lang === 'pt' ? 'Status Geral:' : 'Overall Status:'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                      todayCompleted
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                        : 'bg-amber-950/80 text-amber-300 border border-amber-800'
                    }`}>
                      {todayCompleted ? (lang === 'pt' ? '100% Concluído' : '100% Complete') : (lang === 'pt' ? 'Dose Pendente' : 'Intake Pending')}
                    </span>
                  </div>
                </div>

                {/* Dashboard Fast Jump Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* Card 1: Dose */}
                  <div
                    onClick={() => setCurrentTab('tracker')}
                    className="p-5 rounded-2xl bg-slate-950/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/60 cursor-pointer transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-700/60 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold text-cyan-400 group-hover:underline">
                        {lang === 'pt' ? 'Abrir →' : 'Open →'}
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-sm">
                      {lang === 'pt' ? 'Dose Diária (4 Cápsulas)' : 'Daily Dose (4 Caps)'}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {lang === 'pt' ? '2 pela manhã + 2 à noite com água' : '2 in morning + 2 at night with water'}
                    </p>
                  </div>

                  {/* Card 2: Kegel */}
                  <div
                    onClick={() => setCurrentTab('kegel')}
                    className="p-5 rounded-2xl bg-slate-950/60 hover:bg-slate-900 border border-slate-800 hover:border-purple-500/60 cursor-pointer transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-700/60 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                        <Flame className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold text-purple-400 group-hover:underline">
                        {lang === 'pt' ? 'Treinar →' : 'Train →'}
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-sm">
                      {lang === 'pt' ? 'Treinador Pélvico (Kegel)' : 'Pelvic Floor Trainer'}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {lang === 'pt' ? '3 minutos para +63% de força no jato' : '3 min daily for +63% thrust force'}
                    </p>
                  </div>

                  {/* Card 3: Study */}
                  <div
                    onClick={() => setCurrentTab('study')}
                    className="p-5 rounded-2xl bg-slate-950/60 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/60 cursor-pointer transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-700/60 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                        <Award className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold text-amber-400 group-hover:underline">
                        {lang === 'pt' ? 'Ver Estudo →' : 'View Trial →'}
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-sm">
                      {lang === 'pt' ? 'Estudo Clínico +48.8%' : 'Clinical Trial +48.8%'}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {lang === 'pt' ? 'Ensaio duplo-cego Dr. Craig Hall' : 'Double-blind Dr. Craig Hall data'}
                    </p>
                  </div>

                  {/* Card 4: Store */}
                  <div
                    onClick={() => setCurrentTab('store')}
                    className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/60 to-blue-950/60 hover:from-cyan-950 hover:to-blue-900 border border-cyan-700/60 cursor-pointer transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-900/80 border border-cyan-500 flex items-center justify-center text-cyan-300 group-hover:scale-105 transition-transform">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold text-cyan-300 group-hover:underline">
                        {lang === 'pt' ? 'Loja →' : 'Store →'}
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-sm">
                      {lang === 'pt' ? 'Garantia de 67 Dias' : '67-Day Full Guarantee'}
                    </h3>
                    <p className="text-xs text-cyan-200 mt-1">
                      {lang === 'pt' ? 'Frasco original com frete discreto' : 'Authentic bottle with discreet delivery'}
                    </p>
                  </div>

                </div>

              </div>
            </section>

            {/* Teaser 1: Formula Showcase preview */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-[#0b1329]">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                  <div className="lg:col-span-7 p-8 sm:p-12 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      {lang === 'pt' ? 'Sinérgica Farmacêutica' : 'Pharmaceutical Synergy'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {lang === 'pt' ? '17 Compostos Botânicos Calibrados para as 3 Glândulas Masculinas' : '17 Calibrated Botanical Actives for the 3 Male Glandular Centers'}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {lang === 'pt'
                        ? 'O sêmen não é produzido apenas nos testículos. Mais de 70% do volume vem das vesículas seminais e 25% da próstata. Semenax nutre diretamente esses reservatórios.'
                        : 'Semen is not produced exclusively in the testicles. Over 70% originates from seminal vesicles and 25% from the prostate gland. Semenax directly saturates these glandular stores.'}
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => setCurrentTab('formula')}
                        className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700 transition-all"
                      >
                        <span>{lang === 'pt' ? 'Explorar os 17 Ingredientes Ativos' : 'Explore All 17 Ingredients'}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-8 flex justify-center bg-gradient-to-l from-slate-900/60 to-transparent">
                    <img
                      src={IMAGES.banner}
                      alt="Semenax Science Banner"
                      className="rounded-2xl border border-slate-800 shadow-xl object-cover max-h-64 w-full"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials & Real Experience Highlights */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  {lang === 'pt' ? 'Experiência Real de Usuários' : 'Real Clinical Feedback'}
                </span>
                <h3 className="text-2xl font-black text-white">
                  {lang === 'pt' ? 'O Que Dizem os Homens que Usam Semenax' : 'What Men Report After 60 Days on Semenax'}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex text-amber-400 text-xs">★★★★★</div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    {lang === 'pt'
                      ? '“Na terceira semana já notei o esperma muito mais branco e espesso. Mas por volta do dia 45 o volume dobrou. Minha parceira ficou impressionada.”'
                      : '“By week 3 my ejaculate was noticeably whiter and denser. By day 45 the output practically doubled. My partner was truly amazed.”'}
                  </p>
                  <div className="text-xs font-bold text-white pt-2 border-t border-slate-800">
                    Rodrigo M., 38 anos
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex text-amber-400 text-xs">★★★★★</div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    {lang === 'pt'
                      ? '“O orgasmo dura muito mais tempo. Aquelas contrações fortes que parecem não acabar. A combinação de tomar as 4 cápsulas com o treino pélvico do app é imbatível.”'
                      : '“The climax duration is on another level. Deep rhythmic contractions that seem to never end. Combining 4 capsules with the app’s Kegel trainer is a game changer.”'}
                  </p>
                  <div className="text-xs font-bold text-white pt-2 border-t border-slate-800">
                    Carlos S., 45 anos
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex text-amber-400 text-xs">★★★★★</div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    {lang === 'pt'
                      ? '“Meu tempo de recuperação entre o primeiro e o segundo round diminuiu para menos de 15 minutos, e o segundo disparo continua com volume de primeiro.”'
                      : '“My refractory window between first and second round dropped to under 15 minutes, and the second load is as massive as the first.”'}
                  </p>
                  <div className="text-xs font-bold text-white pt-2 border-t border-slate-800">
                    Lucas P., 31 anos
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* TAB 2: DAILY TRACKER */}
        {currentTab === 'tracker' && (
          <DailyTracker
            lang={lang}
            onSelectTab={setCurrentTab}
            onUpdateGlobalStreak={handleUpdateGlobalStreak}
          />
        )}

        {/* TAB 3: KEGEL TRAINER */}
        {currentTab === 'kegel' && (
          <KegelTrainer
            lang={lang}
            onWorkoutComplete={handleKegelWorkoutComplete}
          />
        )}

        {/* TAB 4: FORMULA EXPLORER */}
        {currentTab === 'formula' && <FormulaExplorer lang={lang} />}

        {/* TAB 5: CLINICAL STUDY */}
        {currentTab === 'study' && <ClinicalStudyViewer lang={lang} />}

        {/* TAB 6: QUIZ / ASSESSMENT */}
        {currentTab === 'quiz' && <AssessmentQuiz lang={lang} onSelectTab={setCurrentTab} />}

        {/* TAB 7: 90-DAY GUIDE & NUTRITION */}
        {currentTab === 'guide' && <LifestyleGuide lang={lang} />}

        {/* TAB 8: BATCH CHECKER */}
        {currentTab === 'verify' && <BatchChecker lang={lang} />}

        {/* TAB 9: STORE */}
        {currentTab === 'store' && <StoreSection lang={lang} />}

      </main>

      {/* Global Footer */}
      <Footer lang={lang} onSelectTab={setCurrentTab} />

    </div>
  );
}
