import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Droplets, Dumbbell, Calendar, Flame, RefreshCw, Trophy, Bell, Heart, AlertCircle, Sparkles } from 'lucide-react';
import { Language, DailyLog } from '../types';

interface DailyTrackerProps {
  lang: Language;
  onSelectTab: (tab: string) => void;
  onUpdateGlobalStreak: (streak: number, todayDone: boolean) => void;
}

export const DailyTracker: React.FC<DailyTrackerProps> = ({
  lang,
  onSelectTab,
  onUpdateGlobalStreak
}) => {
  const getTodayDateStr = () => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  };

  const todayStr = getTodayDateStr();

  // Load logs from localStorage
  const [logs, setLogs] = useState<{ [date: string]: DailyLog }>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('semenax_daily_logs');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return {
      [todayStr]: {
        date: todayStr,
        morningPills: false,
        eveningPills: false,
        waterMl: 1000,
        kegelDone: false,
        overallVitalityRating: 4
      }
    };
  });

  const todayLog: DailyLog = logs[todayStr] || {
    date: todayStr,
    morningPills: false,
    eveningPills: false,
    waterMl: 0,
    kegelDone: false,
    overallVitalityRating: 0
  };

  // Calculate streak
  const calculateStreak = () => {
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 90; i++) {
      const checkDate = new Date();
      checkDate.setDate(today.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];
      const entry = logs[dateStr];
      if (entry && (entry.morningPills || entry.eveningPills)) {
        streak++;
      } else if (i === 0) {
        // Today might not be completed yet, do not break streak immediately
        continue;
      } else {
        break;
      }
    }
    return Math.max(1, streak);
  };

  const currentStreak = calculateStreak();
  const isTodayComplete = todayLog.morningPills && todayLog.eveningPills && todayLog.waterMl >= 2500;

  useEffect(() => {
    onUpdateGlobalStreak(currentStreak, isTodayComplete);
  }, [currentStreak, isTodayComplete, onUpdateGlobalStreak]);

  const updateTodayLog = (updates: Partial<DailyLog>) => {
    const updated = {
      ...todayLog,
      ...updates
    };
    const newLogs = {
      ...logs,
      [todayStr]: updated
    };
    setLogs(newLogs);
    if (typeof window !== 'undefined') {
      localStorage.setItem('semenax_daily_logs', JSON.stringify(newLogs));
    }
  };

  const addWater = (amount: number) => {
    const current = todayLog.waterMl || 0;
    const nextVal = Math.min(4000, current + amount);
    updateTodayLog({ waterMl: nextVal });
  };

  const resetWater = () => {
    updateTodayLog({ waterMl: 0 });
  };

  // Past 7 days data
  const pastWeek = Array.from({ length: 7 }).map((_, idx) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - idx));
    const dateStr = d.toISOString().split('T')[0];
    const log = logs[dateStr];
    const dayLabel = d.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', { weekday: 'short' });
    const isToday = dateStr === todayStr;
    const pillsDone = log ? log.morningPills && log.eveningPills : false;
    return { dateStr, dayLabel, isToday, pillsDone, water: log?.waterMl || 0 };
  });

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-semibold mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>{lang === 'pt' ? 'Protocolo Oficial Semenax' : 'Official Semenax Protocol'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {lang === 'pt' ? 'Rastreador de Doses & Consistência' : 'Dosage & Consistency Tracker'}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {lang === 'pt'
              ? 'Posologia recomendada: 4 cápsulas por dia (2 de manhã + 2 à noite) com 3L de água.'
              : 'Recommended intake: 4 capsules daily (2 in the morning + 2 at night) with 3L water.'}
          </p>
        </div>

        {/* Streak & Spermatogenesis Day Badge */}
        <div className="flex items-center gap-3">
          <div className="p-3 px-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/20 border border-amber-500/30 text-center">
            <div className="flex items-center justify-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-4 h-4 fill-amber-400" />
              <span>{lang === 'pt' ? 'Sequência' : 'Streak'}</span>
            </div>
            <div className="text-2xl font-black text-amber-300">
              {currentStreak} <span className="text-xs font-normal text-amber-200/80">{lang === 'pt' ? 'dias' : 'days'}</span>
            </div>
          </div>

          <div className="p-3 px-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/20 border border-cyan-500/30 text-center">
            <div className="flex items-center justify-center gap-1.5 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Trophy className="w-4 h-4" />
              <span>{lang === 'pt' ? 'Ciclo' : 'Cycle'}</span>
            </div>
            <div className="text-2xl font-black text-cyan-300">
              {Math.min(90, currentStreak)}/90 <span className="text-xs font-normal text-cyan-200/80">{lang === 'pt' ? 'dias' : 'd'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tracker Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Module 1: Capsules Check (Morning & Evening) */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-700/50 flex items-center justify-center text-blue-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">
                  {lang === 'pt' ? 'Dose de Semenax (4 Cápsulas)' : 'Semenax Dose (4 Capsules)'}
                </h3>
                <p className="text-xs text-slate-400">
                  {lang === 'pt' ? 'Divididas em 2 tomadas para absorção contínua' : 'Split into 2 intakes for 24h plasma levels'}
                </p>
              </div>
            </div>

            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              todayLog.morningPills && todayLog.eveningPills
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                : 'bg-slate-800 text-slate-400'
            }`}>
              {(todayLog.morningPills ? 2 : 0) + (todayLog.eveningPills ? 2 : 0)} / 4 {lang === 'pt' ? 'tomadas' : 'taken'}
            </span>
          </div>

          <div className="space-y-3">
            {/* Morning Dose */}
            <div
              onClick={() => updateTodayLog({ morningPills: !todayLog.morningPills })}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                todayLog.morningPills
                  ? 'bg-emerald-950/40 border-emerald-600/70 text-emerald-300'
                  : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-3">
                {todayLog.morningPills ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-500 shrink-0" />
                )}
                <div>
                  <div className="font-semibold text-sm text-white">
                    {lang === 'pt' ? 'Dose da Manhã (2 Cápsulas)' : 'Morning Intake (2 Capsules)'}
                  </div>
                  <div className="text-xs text-slate-400">
                    {lang === 'pt' ? 'Tomar com o café da manhã ou copo d’água' : 'Take with breakfast or full glass of water'}
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900/60">
                {todayLog.morningPills ? (lang === 'pt' ? 'Feito' : 'Done') : (lang === 'pt' ? 'Pendente' : 'Pending')}
              </span>
            </div>

            {/* Evening Dose */}
            <div
              onClick={() => updateTodayLog({ eveningPills: !todayLog.eveningPills })}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                todayLog.eveningPills
                  ? 'bg-emerald-950/40 border-emerald-600/70 text-emerald-300'
                  : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-3">
                {todayLog.eveningPills ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-500 shrink-0" />
                )}
                <div>
                  <div className="font-semibold text-sm text-white">
                    {lang === 'pt' ? 'Dose da Noite (2 Cápsulas)' : 'Evening Intake (2 Capsules)'}
                  </div>
                  <div className="text-xs text-slate-400">
                    {lang === 'pt' ? 'Tomar com o jantar ou antes de dormir' : 'Take with dinner or before sleep'}
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900/60">
                {todayLog.eveningPills ? (lang === 'pt' ? 'Feito' : 'Done') : (lang === 'pt' ? 'Pendente' : 'Pending')}
              </span>
            </div>
          </div>
        </div>

        {/* Module 2: Hydration Tracker (Goal 3000 ml) */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-700/50 flex items-center justify-center text-cyan-400">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">
                  {lang === 'pt' ? 'Meta de Hidratação Seminal' : 'Seminal Hydration Target'}
                </h3>
                <p className="text-xs text-slate-400">
                  {lang === 'pt' ? 'Fluido seminal é 70% aquoso - essencial para volume' : 'Seminal fluid is 70% water - essential for volume'}
                </p>
              </div>
            </div>

            <button
              onClick={resetWater}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
              title="Reset"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Water progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">{lang === 'pt' ? 'Ingestão Atual:' : 'Current Intake:'}</span>
              <span className="font-bold text-cyan-400 text-sm">{todayLog.waterMl} / 3000 ml</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (todayLog.waterMl / 3000) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>0 ml</span>
              <span>1500 ml</span>
              <span className="text-cyan-400 font-semibold">3000 ml ({lang === 'pt' ? 'Ideal' : 'Target'})</span>
            </div>
          </div>

          {/* Quick Add Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => addWater(250)}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-cyan-950 hover:border-cyan-700/60 border border-slate-700 text-xs font-bold text-slate-200 hover:text-cyan-300 transition-all"
            >
              + 250 ml (Copo)
            </button>
            <button
              onClick={() => addWater(500)}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-cyan-950 hover:border-cyan-700/60 border border-slate-700 text-xs font-bold text-slate-200 hover:text-cyan-300 transition-all"
            >
              + 500 ml (Garrafa)
            </button>
            <button
              onClick={() => addWater(1000)}
              className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-cyan-950 hover:border-cyan-700/60 border border-slate-700 text-xs font-bold text-slate-200 hover:text-cyan-300 transition-all"
            >
              + 1000 ml (1L)
            </button>
          </div>
        </div>

      </div>

      {/* Secondary Row: Pelvic Floor Routine & Vitality Rating */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Module 3: Kegel / Pelvic Routine Status */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-700/50 flex items-center justify-center text-purple-400">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">
                  {lang === 'pt' ? 'Treino Pélvico do Dia (Kegel)' : 'Daily Pelvic Floor Workout'}
                </h3>
                <p className="text-xs text-slate-400">
                  {lang === 'pt' ? 'Fortalece o músculo pubococcígeo para contrações vigorosas' : 'Strengthens PC muscle for explosive contraction bursts'}
                </p>
              </div>
            </div>

            <button
              onClick={() => onSelectTab('kegel')}
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 hover:underline"
            >
              {lang === 'pt' ? 'Abrir Treinador →' : 'Open Trainer →'}
            </button>
          </div>

          <div
            onClick={() => updateTodayLog({ kegelDone: !todayLog.kegelDone })}
            className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
              todayLog.kegelDone
                ? 'bg-purple-950/40 border-purple-600/70 text-purple-300'
                : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center gap-3">
              {todayLog.kegelDone ? (
                <CheckCircle2 className="w-6 h-6 text-purple-400 shrink-0" />
              ) : (
                <Circle className="w-6 h-6 text-slate-500 shrink-0" />
              )}
              <div>
                <div className="font-semibold text-sm text-white">
                  {lang === 'pt' ? 'Sessão Pélvica Concluída' : 'Pelvic Session Completed'}
                </div>
                <div className="text-xs text-slate-400">
                  {lang === 'pt' ? '3 a 5 minutos de contrações e relaxamentos' : '3 to 5 minutes of focused contractions'}
                </div>
              </div>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900/60">
              {todayLog.kegelDone ? (lang === 'pt' ? 'Concluído' : 'Done') : (lang === 'pt' ? 'Pendente' : 'Pending')}
            </span>
          </div>
        </div>

        {/* Module 4: Overall Vitality Rating */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-700/50 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                {lang === 'pt' ? 'Percepção de Vigor & Energia' : 'Vitality & Stamina Rating'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'pt' ? 'Como você se sentiu hoje em relação à energia e libido?' : 'How would you rate your energy and bedroom drive today?'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/70">
            <span className="text-xs text-slate-400">{lang === 'pt' ? 'Seu Nível Hoje:' : 'Today’s Level:'}</span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => updateTodayLog({ overallVitalityRating: star })}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-base font-bold transition-all ${
                    (todayLog.overallVitalityRating || 0) >= star
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-105'
                      : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Week Calendar History */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
        <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-cyan-400" />
          <span>{lang === 'pt' ? 'Histórico dos Últimos 7 Dias' : 'Past 7 Days Consistency'}</span>
        </h4>

        <div className="grid grid-cols-7 gap-2 sm:gap-3 text-center">
          {pastWeek.map((day, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 ${
                day.isToday
                  ? 'bg-cyan-950/50 border-cyan-500/60 shadow-lg shadow-cyan-950/40'
                  : 'bg-slate-800/40 border-slate-700/60'
              }`}
            >
              <span className={`text-[11px] font-bold uppercase ${day.isToday ? 'text-cyan-300' : 'text-slate-400'}`}>
                {day.dayLabel}
              </span>
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                {day.pillsDone ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-600" />
                )}
              </div>
              <span className="text-[10px] text-slate-400">
                {day.water > 0 ? `${(day.water / 1000).toFixed(1)}L` : '-'}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
