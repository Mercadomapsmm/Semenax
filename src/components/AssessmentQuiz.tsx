import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw, CheckCircle2, Award, ShieldCheck, ShoppingCart } from 'lucide-react';
import { Language } from '../types';
import { QUIZ_QUESTIONS } from '../data/quiz';

interface AssessmentQuizProps {
  lang: Language;
  onSelectTab: (tab: string) => void;
}

export const AssessmentQuiz: React.FC<AssessmentQuizProps> = ({ lang, onSelectTab }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: { points: number; labelPt: string; labelEn: string; explanationPt: string; explanationEn: string } }>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (points: number, labelPt: string, labelEn: string, explanationPt: string, explanationEn: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: { points, labelPt, labelEn, explanationPt, explanationEn }
    });

    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedAnswers({});
    setIsFinished(false);
  };

  // Calculate score (out of 150 points max, normalize to 100%)
  const totalScore = Object.values(selectedAnswers).reduce((sum, item) => sum + item.points, 0);
  const maxScore = totalQuestions * 30;
  const scorePercent = Math.round((totalScore / maxScore) * 100);

  // Diagnostic level
  const getDiagnosis = () => {
    if (scorePercent < 45) {
      return {
        levelPt: 'Potencial Suprimido (Nível Crítico)',
        levelEn: 'Suppressed Potential (Critical Tier)',
        badgeColor: 'text-amber-400 bg-amber-950/80 border-amber-700',
        summaryPt: 'Suas glândulas seminais estão operando com reservas reduzidas de zinco, aminoácidos e água. Há uma margem enorme para ganho imediato de volume e intensidade.',
        summaryEn: 'Your seminal vesicles are operating with depleted reserves of zinc, amino acids, and water. There is immense headroom for immediate volume and climax gains.',
        recommendedCyclePt: 'Protocolo de Recuperação Total (3 a 6 Meses)',
        recommendedCycleEn: 'Total Recovery Protocol (3 to 6 Months)',
        expectedGainPt: '+48.8% a +65% de volume no ciclo de espermatogênese de 64-72 dias'
      };
    } else if (scorePercent < 75) {
      return {
        levelPt: 'Potencial Médio / Em Transição',
        levelEn: 'Moderate Baseline / Transition Tier',
        badgeColor: 'text-cyan-400 bg-cyan-950/80 border-cyan-700',
        summaryPt: 'Você possui uma base razoável, mas o esgotamento pós-relação e a perda de espasmo muscular limitam suas ejaculações. A suplementação diária de 4 cápsulas trará saltos nítidos.',
        summaryEn: 'You possess a solid baseline, but post-orgasm refractory fatigue and muted muscle contractions limit output. Daily 4-capsule intake will deliver noticeable jumps.',
        recommendedCyclePt: 'Ciclo de Ouro (3 Meses - O Mais Vendido)',
        recommendedCycleEn: 'Gold Cycle (3 Months - Most Popular)',
        expectedGainPt: '+48.8% de volume seminal e contrações 71% mais intensas'
      };
    } else {
      return {
        levelPt: 'Potencial Alto (Otimização Final)',
        levelEn: 'High Baseline (Peak Optimization)',
        badgeColor: 'text-emerald-400 bg-emerald-950/80 border-emerald-700',
        summaryPt: 'Seus hábitos são saudáveis. Com o Semenax, você alcançará o patamar de elite em volume, múltiplos disparos e controle ejaculatório absoluto.',
        summaryEn: 'You already maintain strong habits. Semenax will unlock elite-tier volume, back-to-back rounds, and absolute ejaculatory mastery.',
        recommendedCyclePt: 'Ciclo de Consolidação (3 Meses)',
        recommendedCycleEn: 'Consolidation Cycle (3 Months)',
        expectedGainPt: 'Máxima propulsão do jato e período refratário ultrarrápido'
      };
    }
  };

  const diagnosis = getDiagnosis();

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{lang === 'pt' ? 'Autoavaliação Clínica Gratuita' : 'Free Clinical Self-Assessment'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          {lang === 'pt' ? 'Diagnóstico de Volume & Potência Seminal' : 'Seminal Volume & Power Assessment'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          {lang === 'pt'
            ? 'Responda a 5 perguntas rápidas para receber seu índice de vitalidade e prescrição de rotina.'
            : 'Answer 5 quick clinical questions to reveal your vitality index and custom routine.'}
        </p>
      </div>

      {!isFinished ? (
        /* Active Question Card */
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-[#0b1329] to-slate-900 border border-slate-800 shadow-2xl space-y-6">
          
          {/* Progress Indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{lang === 'pt' ? `Pergunta ${currentStep + 1} de ${totalQuestions}` : `Question ${currentStep + 1} of ${totalQuestions}`}</span>
              <span className="font-bold text-cyan-400">{Math.round(((currentStep) / totalQuestions) * 100)}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="py-2">
            <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {lang === 'pt' ? currentQuestion.questionPt : currentQuestion.questionEn}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() =>
                  handleSelectOption(
                    opt.points,
                    opt.labelPt,
                    opt.labelEn,
                    opt.explanationPt,
                    opt.explanationEn
                  )
                }
                className="w-full p-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/60 text-left transition-all duration-200 group flex items-start gap-3.5"
              >
                <div className="w-6 h-6 rounded-full border border-slate-600 group-hover:border-cyan-400 group-hover:bg-cyan-950 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:text-cyan-300 shrink-0 mt-0.5">
                  {String.fromCharCode(65 + idx)}
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-slate-200 group-hover:text-white">
                    {lang === 'pt' ? opt.labelPt : opt.labelEn}
                  </div>
                  <div className="text-xs text-slate-400">
                    {lang === 'pt' ? opt.explanationPt : opt.explanationEn}
                  </div>
                </div>
              </button>
            ))}
          </div>

        </div>
      ) : (
        /* Results View */
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-[#0b1329] to-slate-900 border border-cyan-800/60 shadow-2xl space-y-6">
          
          <div className="text-center space-y-3 border-b border-slate-800 pb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${diagnosis.badgeColor}">
              <Award className="w-4 h-4" />
              <span>{lang === 'pt' ? diagnosis.levelPt : diagnosis.levelEn}</span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <span className="text-6xl font-black text-cyan-400">
                {scorePercent}%
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              {lang === 'pt' ? 'Índice de Eficiência Seminal Atual' : 'Current Seminal Efficiency Score'}
            </p>
          </div>

          {/* Diagnostic feedback */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong className="text-white block font-bold">
              {lang === 'pt' ? 'Análise do seu Perfil:' : 'Clinical Profile Breakdown:'}
            </strong>
            <p>{lang === 'pt' ? diagnosis.summaryPt : diagnosis.summaryEn}</p>
          </div>

          {/* Prescribed Protocol */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/50 to-blue-950/50 border border-cyan-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                {lang === 'pt' ? 'Protocolo Recomendado:' : 'Recommended Protocol:'}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-cyan-900 text-cyan-200 font-bold">
                64-72 Dias
              </span>
            </div>
            
            <h4 className="text-lg font-bold text-white">
              {lang === 'pt' ? diagnosis.recommendedCyclePt : diagnosis.recommendedCycleEn}
            </h4>

            <div className="flex items-center gap-2 text-xs text-cyan-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{diagnosis.expectedGainPt}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => onSelectTab('store')}
              className="w-full sm:flex-1 py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-xl shadow-cyan-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{lang === 'pt' ? 'Ver Pacotes Oficiais Semenax' : 'View Official Semenax Bundles'}</span>
            </button>

            <button
              onClick={handleRestart}
              className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{lang === 'pt' ? 'Refazer Teste' : 'Retake Quiz'}</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
