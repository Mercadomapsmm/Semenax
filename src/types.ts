export type Language = 'pt' | 'en';

export interface Ingredient {
  id: string;
  name: string;
  latinName: string;
  dosage: string;
  targetOrgan: 'vesicles' | 'prostate' | 'testosterone' | 'bloodflow' | 'vitality';
  targetOrganLabel: string;
  targetOrganLabelEn: string;
  descriptionPt: string;
  descriptionEn: string;
  mechanismPt: string;
  mechanismEn: string;
  scientificBenefit: string;
  scientificBenefitEn: string;
}

export interface ClinicalMetric {
  metricPt: string;
  metricEn: string;
  placeboPercentage: number;
  semenaxPercentage: number;
  delta: string;
  detailPt: string;
  detailEn: string;
  iconName: string;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  morningPills: boolean; // 2 capsules
  eveningPills: boolean; // 2 capsules
  waterMl: number; // Goal: 3000ml
  kegelDone: boolean;
  notes?: string;
  overallVitalityRating?: number; // 1 to 5
}

export interface ProductBundle {
  id: string;
  months: number;
  bottles: number;
  titlePt: string;
  titleEn: string;
  badgePt?: string;
  badgeEn?: string;
  priceBrl: number;
  originalPriceBrl: number;
  installmentsBrl: string;
  freeShipping: boolean;
  freeGiftsPt: string[];
  freeGiftsEn: string[];
  popular?: boolean;
  bestValue?: boolean;
}

export interface QuizQuestion {
  id: number;
  questionPt: string;
  questionEn: string;
  options: {
    labelPt: string;
    labelEn: string;
    points: number;
    explanationPt: string;
    explanationEn: string;
  }[];
}
