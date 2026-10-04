import { ProductBundle } from '../types';

export const PRODUCT_BUNDLES: ProductBundle[] = [
  {
    id: 'bundle-1m',
    months: 1,
    bottles: 1,
    titlePt: 'Fornecimento para 1 Mês (Iniciação)',
    titleEn: '1-Month Supply (Starter)',
    badgePt: 'Ciclo Inicial',
    badgeEn: 'Starter Cycle',
    priceBrl: 349,
    originalPriceBrl: 429,
    installmentsBrl: '12x de R$ 34,90',
    freeShipping: false,
    freeGiftsPt: [
      'Frasco Oficial com 120 Cápsulas (Dose para 30 dias)',
      'Acesso Imediato ao App Companion Semenax'
    ],
    freeGiftsEn: [
      'Official 120-Capsule Bottle (Full 30-day supply)',
      'Immediate Lifetime Access to Semenax Companion App'
    ]
  },
  {
    id: 'bundle-3m',
    months: 3,
    bottles: 3,
    titlePt: 'Fornecimento para 3 Meses (Ciclo de Ouro)',
    titleEn: '3-Month Supply (Gold Cycle)',
    badgePt: 'MAIS VENDIDO ⭐',
    badgeEn: 'MOST POPULAR ⭐',
    popular: true,
    priceBrl: 799,
    originalPriceBrl: 1199,
    installmentsBrl: '12x de R$ 79,90',
    freeShipping: true,
    freeGiftsPt: [
      '3 Frascos Oficiais (360 Cápsulas - 90 dias completos)',
      'Cobre 100% da Espermatogênese Humana (64-72 dias)',
      'Frete Expresso Grátis com Rastreamento em Embalagem Discreta',
      'Guia Digital: Protocolo de Treino Pélvico Avançado'
    ],
    freeGiftsEn: [
      '3 Official Bottles (360 Capsules - Full 90-day protocol)',
      'Fully covers complete human spermatogenesis cycle (64-72 days)',
      'Free Express Discreet Insulated Shipping with Tracking',
      'Digital E-Book: Advanced Male Pelvic Power Masterclass'
    ]
  },
  {
    id: 'bundle-6m',
    months: 6,
    bottles: 6,
    titlePt: 'Fornecimento para 6 Meses (Máxima Potência)',
    titleEn: '6-Month Supply (Ultimate Output)',
    badgePt: 'MELHOR VALOR 🏆',
    badgeEn: 'BEST VALUE 🏆',
    bestValue: true,
    priceBrl: 1299,
    originalPriceBrl: 2199,
    installmentsBrl: '12x de R$ 129,90',
    freeShipping: true,
    freeGiftsPt: [
      '6 Frascos Oficiais (720 Cápsulas)',
      'Máximo Desconto por Frasco (-41% de economia)',
      'Garantia Incondicional de Reembolso de 67 Dias',
      'Frete Grátis Prioritário para todo o Brasil e Internacional',
      'Kit Brinde: Copo Dosador e Frasco de Bolso Semenax'
    ],
    freeGiftsEn: [
      '6 Official Bottles (720 Capsules)',
      'Maximum Volume Discount (-41% savings per bottle)',
      'Full 67-Day 100% Money-Back Guarantee Protection',
      'Free Express Priority Shipping Worldwide',
      'Bonus Gift: Semenax Sleek Travel Pocket Dispenser'
    ]
  }
];

export const AUTHENTIC_BATCHES: { [code: string]: { valid: boolean; batch: string; mfg: string; exp: string; facility: string; notePt: string; noteEn: string } } = {
  'SNX-8821-BR': {
    valid: true,
    batch: 'SNX-8821-BR',
    mfg: '01/2026',
    exp: '01/2028',
    facility: 'Leading Edge Health cGMP Certified Facility #4092, USA',
    notePt: 'Produto 100% Autêntico Verificado. Selo de segurança e controle botânico aprovado.',
    noteEn: '100% Authentic Verified Product. Safety seal and botanical assay certified.'
  },
  'SNX-2026-A89': {
    valid: true,
    batch: 'SNX-2026-A89',
    mfg: '02/2026',
    exp: '02/2028',
    facility: 'Leading Edge Health cGMP Certified Facility #4092, USA',
    notePt: 'Produto 100% Autêntico Verificado. Testado em cromatografia líquida para máxima pureza.',
    noteEn: '100% Authentic Verified Product. HPLC tested for peak bioactive potency.'
  },
  'SNX-9942-US': {
    valid: true,
    batch: 'SNX-9942-US',
    mfg: '12/2025',
    exp: '12/2027',
    facility: 'Leading Edge Health cGMP Certified Facility #4092, USA',
    notePt: 'Produto 100% Autêntico Verificado. Em conformidade com as diretrizes FDA cGMP 21 CFR.',
    noteEn: '100% Authentic Verified Product. Fully compliant with FDA cGMP 21 CFR guidelines.'
  },
  'SNX-TEST': {
    valid: true,
    batch: 'SNX-TEST-DEMO',
    mfg: '03/2026',
    exp: '03/2028',
    facility: 'Laboratório Central Oficial Leading Edge Health',
    notePt: 'Código de demonstração verificado com sucesso.',
    noteEn: 'Demo code verified successfully.'
  }
};
