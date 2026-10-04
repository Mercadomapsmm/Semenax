import React, { useState } from 'react';
import { Award, FileText, CheckCircle, Droplet, Flame, Zap, Heart, Activity, ArrowUpRight, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { CLINICAL_METRICS, CLINICAL_STUDY_DETAILS } from '../data/clinicalStudy';

interface ClinicalStudyViewerProps {
  lang: Language;
}

export const ClinicalStudyViewer: React.FC<ClinicalStudyViewerProps> = ({ lang }) => {
  const [activeMetricIdx, setActiveMetricIdx] = useState<number>(0);

  const getMetricIcon = (name: string) => {
    switch (name) {
      case 'Droplet':
        return <Droplet className="w-5 h-5 text-cyan-400" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-amber-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-blue-400" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-rose-400" />;
      default:
        return <Activity className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
          <Award className="w-3.5 h-3.5" />
          <span>{lang === 'pt' ? 'Padrão Ouro: Estudo Clínico Duplo-Cego' : 'Gold Standard Double-Blind Clinical Trial'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
          {lang === 'pt' ? 'A Ciência Comprovada do Semenax®' : 'The Clinically Proven Science of Semenax®'}
        </h2>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto">
          {lang === 'pt'
            ? 'Enquanto a maioria dos suplementos masculinos se baseia em suposições, o Semenax foi submetido a rigoroso ensaio clínico humano duplo-cego controlado por placebo.'
            : 'While most male health products rely on hearsay, Semenax underwent a rigorous double-blind, randomized, placebo-controlled human trial.'}
        </p>
      </div>

      {/* Trial Overview Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0b1329] to-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              {lang === 'pt' ? 'Investigador Principal' : 'Principal Investigator'}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {CLINICAL_STUDY_DETAILS.investigator}
            </h3>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>{lang === 'pt' ? CLINICAL_STUDY_DETAILS.duration : CLINICAL_STUDY_DETAILS.durationEn}</span>
          </div>
        </div>

        {/* Methodology Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-slate-400 font-semibold block mb-1">
              {lang === 'pt' ? 'Metodologia Científica:' : 'Methodology Standard:'}
            </span>
            <span className="text-white font-medium">
              {lang === 'pt' ? CLINICAL_STUDY_DETAILS.protocol : CLINICAL_STUDY_DETAILS.protocolEn}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-slate-400 font-semibold block mb-1">
              {lang === 'pt' ? 'Coorte de Participantes:' : 'Trial Cohort:'}
            </span>
            <span className="text-white font-medium">
              {lang === 'pt' ? CLINICAL_STUDY_DETAILS.sampleSize : CLINICAL_STUDY_DETAILS.sampleSizeEn}
            </span>
          </div>
        </div>

        {/* Key takeaway callout */}
        <div className="p-4 rounded-2xl bg-cyan-950/50 border border-cyan-800/60 text-xs sm:text-sm text-cyan-100 leading-relaxed flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-cyan-300 block mb-0.5">
              {lang === 'pt' ? 'Conclusão Laboratorial Oficial:' : 'Official Laboratory Conclusion:'}
            </strong>
            {lang === 'pt' ? CLINICAL_STUDY_DETAILS.keyFindingPt : CLINICAL_STUDY_DETAILS.keyFindingEn}
          </div>
        </div>
      </div>

      {/* Interactive Metric Comparison Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span>{lang === 'pt' ? 'Resultados Comparativos: Placebo vs Semenax®' : 'Comparative Results: Placebo vs Semenax®'}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CLINICAL_METRICS.map((metric, idx) => {
            const isSelected = activeMetricIdx === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveMetricIdx(idx)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 space-y-4 ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500/80 shadow-xl shadow-cyan-950/40'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
                      {getMetricIcon(metric.iconName)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        {lang === 'pt' ? metric.metricPt : metric.metricEn}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {lang === 'pt' ? metric.detailPt : metric.detailEn}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-black text-cyan-400">
                      {metric.delta}
                    </span>
                  </div>
                </div>

                {/* Animated Comparative Bars */}
                <div className="space-y-2 pt-1">
                  
                  {/* Semenax Group Bar */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-cyan-300 flex items-center gap-1">
                        <span>Semenax®</span>
                        <CheckCircle className="w-3 h-3 text-cyan-400" />
                      </span>
                      <span className="text-cyan-400 font-bold">+{metric.semenaxPercentage}%</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(100, (metric.semenaxPercentage / 80) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Placebo Group Bar */}
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Placebo</span>
                      <span className="text-slate-400">+{metric.placeboPercentage}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-slate-600 rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(100, (metric.placeboPercentage / 80) * 100)}%` }}
                      />
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
