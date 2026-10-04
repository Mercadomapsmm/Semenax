import { ClinicalMetric } from '../types';

export const CLINICAL_METRICS: ClinicalMetric[] = [
  {
    metricPt: 'Volume de Fluido Seminal',
    metricEn: 'Total Seminal Fluid Volume',
    placeboPercentage: 4.8,
    semenaxPercentage: 48.8,
    delta: '+48.8%',
    detailPt: 'Medido laboratorialmente após 60 dias de uso diário de 4 cápsulas em protocolo duplo-cego.',
    detailEn: 'Laboratory quantified after 60 continuous days of 4 daily capsules under double-blind protocol.',
    iconName: 'Droplet'
  },
  {
    metricPt: 'Intensidade & Duração do Orgasmo',
    metricEn: 'Climax Intensity & Duration',
    placeboPercentage: 11.2,
    semenaxPercentage: 71.3,
    delta: '+71.3%',
    detailPt: 'Autoavaliação validada por questionários clínicos internacionais (IIEF modificado).',
    detailEn: 'Clinically validated questionnaire tracking wave contractions and sensation peak (Modified IIEF).',
    iconName: 'Flame'
  },
  {
    metricPt: 'Força de Contração Ejaculatória',
    metricEn: 'Ejaculatory Contraction Force',
    placeboPercentage: 8.5,
    semenaxPercentage: 63.5,
    delta: '+63.5%',
    detailPt: 'Músculo pubococcígeo (PC) e bulbocavernoso com contrações espasmódicas mais longas e vigorosas.',
    detailEn: 'Pubococcygeus (PC) and bulbocavernosus reflex exhibiting significantly longer spasmodic surges.',
    iconName: 'Zap'
  },
  {
    metricPt: 'Satisfação Global da Parceria',
    metricEn: 'Partner Sexual Satisfaction',
    placeboPercentage: 14.1,
    semenaxPercentage: 68.2,
    delta: '+68.2%',
    detailPt: 'Avaliação cega independente relatada pelas parceiras dos participantes do estudo.',
    detailEn: 'Independent blinded feedback reported by female partners during the 8-week clinical window.',
    iconName: 'Heart'
  },
  {
    metricPt: 'Velocidade de Recuperação (Refratário)',
    metricEn: 'Refractory Recovery Speed',
    placeboPercentage: 6.2,
    semenaxPercentage: 54.0,
    delta: '+54.0%',
    detailPt: 'Redução substancial no tempo necessário para obter nova ereção plena e novo disparo.',
    detailEn: 'Substantial reduction in time needed to achieve next rock-solid erection and follow-up output.',
    iconName: 'Activity'
  }
];

export const CLINICAL_STUDY_DETAILS = {
  investigator: 'Dr. Craig Hall, M.D. & Clinical Research Associates',
  protocol: 'Duplo-Cego, Randomizado e Controlado por Placebo (Gold Standard)',
  protocolEn: 'Double-Blind, Randomized, Placebo-Controlled Trial (Gold Standard)',
  sampleSize: '63 homens saudáveis entre 21 e 60 anos com queixas de baixo volume ejaculatório',
  sampleSizeEn: '63 healthy adult men aged 21-60 with self-reported low ejaculatory volume',
  duration: '8 Semanas (60 dias contínuos)',
  durationEn: '8 Weeks (60 continuous days)',
  keyFindingPt: 'O grupo ativo que utilizou Semenax demonstrou um aumento médio de 48,8% no volume total do ejaculado em comparação a meros 4,8% no grupo placebo (p < 0.001 estatisticamente significativo).',
  keyFindingEn: 'The active Semenax cohort exhibited a mean +48.8% surge in total ejaculate volume compared to just 4.8% in the placebo group (p < 0.001 statistically significant).'
};
