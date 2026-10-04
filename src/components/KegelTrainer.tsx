import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, CheckCircle, Info, Sparkles, Award } from 'lucide-react';
import { Language } from '../types';

interface KegelTrainerProps {
  lang: Language;
  onWorkoutComplete?: () => void;
}

type Phase = 'ready' | 'contract' | 'hold' | 'relax' | 'finished';

interface RoutineConfig {
  namePt: string;
  nameEn: string;
  contractTime: number; // seconds
  holdTime: number; // seconds
  relaxTime: number; // seconds
  totalReps: number;
}

const ROUTINES: { [key: string]: RoutineConfig } = {
  beginner: {
    namePt: 'Iniciante: Ativação & Controle',
    nameEn: 'Beginner: Activation & Control',
    contractTime: 3,
    holdTime: 2,
    relaxTime: 4,
    totalReps: 8
  },
  intermediate: {
    namePt: 'Intermediário: Resistência Ejaculatória',
    nameEn: 'Intermediate: Ejaculatory Stamina',
    contractTime: 5,
    holdTime: 4,
    relaxTime: 5,
    totalReps: 12
  },
  advanced: {
    namePt: 'Avançado: Propulsão Máxima do Jato',
    nameEn: 'Advanced: Maximum Propulsion Thrust',
    contractTime: 8,
    holdTime: 6,
    relaxTime: 4,
    totalReps: 15
  }
};

export const KegelTrainer: React.FC<KegelTrainerProps> = ({ lang, onWorkoutComplete }) => {
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [phase, setPhase] = useState<Phase>('ready');
  const [currentRep, setCurrentRep] = useState<number>(1);
  const [timeLeft, setTimeLeft] = useState<number>(3);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [completed, setCompleted] = useState<boolean>(false);

  const audioContextRef = useRef<AudioContext | null>(null);

  // Sound generator via Web Audio API
  const playBeep = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      const osc = audioContextRef.current.createOscillator();
      const gain = audioContextRef.current.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
      gain.gain.setValueAtTime(0.12, audioContextRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioContextRef.current.destination);

      osc.start();
      osc.stop(audioContextRef.current.currentTime + duration);
    } catch {
      // Audio not permitted without interaction
    }
  };

  const currentRoutine = ROUTINES[level];

  // Start trainer
  const handleStart = () => {
    setIsActive(true);
    setCompleted(false);
    if (phase === 'ready' || phase === 'finished') {
      setCurrentRep(1);
      setPhase('contract');
      setTimeLeft(currentRoutine.contractTime);
      playBeep(587.33, 0.25); // D5 high tone
    }
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('ready');
    setCurrentRep(1);
    setTimeLeft(currentRoutine.contractTime);
    setCompleted(false);
  };

  // Timer loop
  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        // Phase transitions
        if (phase === 'contract') {
          if (currentRoutine.holdTime > 0) {
            setPhase('hold');
            playBeep(659.25, 0.2); // E5
            return currentRoutine.holdTime;
          } else {
            setPhase('relax');
            playBeep(392.00, 0.35); // G4
            return currentRoutine.relaxTime;
          }
        } else if (phase === 'hold') {
          setPhase('relax');
          playBeep(392.00, 0.35); // G4
          return currentRoutine.relaxTime;
        } else if (phase === 'relax') {
          if (currentRep < currentRoutine.totalReps) {
            setCurrentRep((r) => r + 1);
            setPhase('contract');
            playBeep(587.33, 0.25);
            return currentRoutine.contractTime;
          } else {
            // Finished routine
            setIsActive(false);
            setPhase('finished');
            setCompleted(true);
            playBeep(880.00, 0.6); // A5 celebration
            if (onWorkoutComplete) {
              onWorkoutComplete();
            }
            return 0;
          }
        }
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase, currentRep, currentRoutine, onWorkoutComplete]);

  // Phase text & colors
  const getPhaseDisplay = () => {
    switch (phase) {
      case 'contract':
        return {
          titlePt: 'CONTRAIA FIRME!',
          titleEn: 'CONTRACT FIRMLY!',
          subPt: 'Aperte e puxe o assoalho pélvico para cima',
          subEn: 'Squeeze and lift pelvic floor upward',
          color: 'from-cyan-500 to-blue-600',
          glow: 'shadow-cyan-500/50',
          scale: 'scale-110'
        };
      case 'hold':
        return {
          titlePt: 'SEGURE A TENSÃO!',
          titleEn: 'HOLD THE TENSION!',
          subPt: 'Mantenha a contração sem prender a respiração',
          subEn: 'Hold firm squeeze while breathing evenly',
          color: 'from-amber-500 to-orange-600',
          glow: 'shadow-amber-500/50',
          scale: 'scale-110'
        };
      case 'relax':
        return {
          titlePt: 'RELAXE TOTALMENTE',
          titleEn: 'RELAX FULLY',
          subPt: 'Solte completamente a musculatura pélvica',
          subEn: 'Completely release and drop pelvic tension',
          color: 'from-emerald-500 to-teal-600',
          glow: 'shadow-emerald-500/40',
          scale: 'scale-95'
        };
      case 'finished':
        return {
          titlePt: 'TREINO CONCLUÍDO!',
          titleEn: 'WORKOUT COMPLETE!',
          subPt: 'Excelente trabalho! Músculo pubococcígeo condicionado',
          subEn: 'Outstanding job! Pubococcygeus conditioned',
          color: 'from-purple-500 to-indigo-600',
          glow: 'shadow-purple-500/50',
          scale: 'scale-100'
        };
      default:
        return {
          titlePt: 'PRONTO PARA COMEÇAR?',
          titleEn: 'READY TO BEGIN?',
          subPt: 'Pressione Iniciar e siga os sinais na tela',
          subEn: 'Press Start and follow on-screen pulses',
          color: 'from-slate-700 to-slate-800',
          glow: 'shadow-none',
          scale: 'scale-100'
        };
    }
  };

  const phaseDisplay = getPhaseDisplay();

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      
      {/* Title & Routine Selector */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-800/60 text-purple-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{lang === 'pt' ? 'Treinador Pélvico Masculino Semenax' : 'Semenax Male Pelvic Floor Trainer'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          {lang === 'pt' ? 'Controle de Propulsão & Força Ejaculatória' : 'Propulsion Control & Ejaculatory Power'}
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          {lang === 'pt'
            ? 'O músculo pubococcígeo (PC) é o motor que bombeia o esperma através da uretra. 3 minutos diários aumentam a força do jato em até 63%.'
            : 'The pubococcygeus (PC) muscle is the mechanical pump driving ejaculate through the urethra. 3 daily minutes boost thrust force up to 63%.'}
        </p>

        {/* Level Selector */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {(['beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
            <button
              key={lvl}
              disabled={isActive}
              onClick={() => {
                setLevel(lvl);
                handleReset();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                level === lvl
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 border border-cyan-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              } ${isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {lang === 'pt' ? ROUTINES[lvl].namePt : ROUTINES[lvl].nameEn}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Orb & Display */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#0b1329]/90 border border-slate-800 text-center flex flex-col items-center justify-center space-y-6 overflow-hidden">
        
        {/* Audio Toggle & Rep Counter */}
        <div className="w-full flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            <span>{soundEnabled ? (lang === 'pt' ? 'Som Ativado' : 'Audio On') : (lang === 'pt' ? 'Mudo' : 'Mute')}</span>
          </button>

          <div className="font-bold text-slate-300">
            {lang === 'pt' ? 'Repetição' : 'Repetition'}: <span className="text-cyan-400 text-sm">{currentRep}</span> / {currentRoutine.totalReps}
          </div>
        </div>

        {/* Pulsing Visual Orb */}
        <div className="relative flex items-center justify-center py-6">
          {/* Animated Glow Circle */}
          <div
            className={`w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr ${phaseDisplay.color} p-1 shadow-2xl ${phaseDisplay.glow} transition-all duration-700 ease-out flex items-center justify-center ${phaseDisplay.scale}`}
          >
            <div className="w-full h-full rounded-full bg-[#070d19] flex flex-col items-center justify-center p-4">
              <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">
                {phase === 'ready' ? '▶' : phase === 'finished' ? '★' : `${timeLeft}s`}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-1">
                {phase === 'finished' ? (lang === 'pt' ? 'Sucesso' : 'Success') : phase}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Instruction Text */}
        <div className="space-y-1 max-w-md">
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide">
            {lang === 'pt' ? phaseDisplay.titlePt : phaseDisplay.titleEn}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            {lang === 'pt' ? phaseDisplay.subPt : phaseDisplay.subEn}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 pt-2">
          {!isActive ? (
            <button
              onClick={handleStart}
              className="px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-xl shadow-cyan-600/30 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{phase === 'finished' ? (lang === 'pt' ? 'Repetir Treino' : 'Restart Workout') : (lang === 'pt' ? 'Iniciar Treino' : 'Start Workout')}</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="px-8 py-3.5 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xl shadow-amber-500/30 flex items-center gap-2 transition-all"
            >
              <Pause className="w-4 h-4 fill-slate-950" />
              <span>{lang === 'pt' ? 'Pausar' : 'Pause'}</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Workout Completed Alert */}
        {completed && (
          <div className="w-full p-4 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {lang === 'pt'
                  ? 'Sessão concluída com sucesso! Registrada no seu Rastreador Diário.'
                  : 'Workout session completed! Automatically logged to your Daily Tracker.'}
              </span>
            </div>
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
          </div>
        )}

      </div>

      {/* Clinical Guide Box: How to Locate the PC Muscle */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
        <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold">
          <Info className="w-4 h-4" />
          <span>{lang === 'pt' ? 'Como Isolar e Sentir o Músculo Pubococcígeo (PC)' : 'How to Locate & Isolate Your PC Muscle'}</span>
        </div>
        <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
          <p>
            {lang === 'pt' ? (
              <>
                <strong>1. Teste de Parada Miccional:</strong> Da próxima vez que for urinar, tente interromper o fluxo no meio do caminho sem usar as mãos. O músculo que você tensionou para segurar a urina é exatamente o <em>músculo pubococcígeo</em>.
              </>
            ) : (
              <>
                <strong>1. Mid-Stream Stop Technique:</strong> Next time you urinate, stop the flow midway without using your hands. The muscular squeeze you feel is the exact <em>pubococcygeus (PC) muscle</em>.
              </>
            )}
          </p>
          <p>
            {lang === 'pt' ? (
              <>
                <strong>2. Postura Correta:</strong> Não contraia o abdômen, glúteos ou coxas. O movimento deve ser estritamente interno e focado na base do pênis e ânus, puxando para cima.
              </>
            ) : (
              <>
                <strong>2. Isolation Form:</strong> Do not flex your glutes, thighs, or abdominals. The tension should be strictly internal, lifting upward at the perineum.
              </>
            )}
          </p>
        </div>
      </div>

    </div>
  );
};
