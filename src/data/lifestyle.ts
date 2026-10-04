export interface TimelinePhase {
  phasePt: string;
  phaseEn: string;
  weeks: string;
  icon: string;
  titlePt: string;
  titleEn: string;
  descriptionPt: string;
  descriptionEn: string;
  keyChangesPt: string[];
  keyChangesEn: string[];
}

export const BIOLOGICAL_TIMELINE: TimelinePhase[] = [
  {
    phasePt: 'Fase 1: Saturação Celular & Ativação',
    phaseEn: 'Phase 1: Cellular Saturation & Priming',
    weeks: 'Semanas 1 - 2 (Dias 1 - 14)',
    icon: 'Sparkles',
    titlePt: 'Depósito de Zinco & Vasodilatação Inicial',
    titleEn: 'Zinc Replenishment & Initial Vasodilation',
    descriptionPt: 'O corpo absorve a L-Arginina e a casca de pinho, restaurando a síntese de óxido nítrico nas artérias cavernosas. Os estoques de zinco celular começam a ser restabelecidos.',
    descriptionEn: 'The body assimilates L-Arginine and pine bark, restoring nitric oxide synthesis across cavernosal arteries. Depleted cellular zinc reserves begin replenishment.',
    keyChangesPt: [
      'Aumento da libido basal e apetite sexual',
      'Ereções matinais mais firmes e consistentes',
      'Início do relaxamento da musculatura lisa prostática'
    ],
    keyChangesEn: [
      'Elevated baseline libido and sexual appetite',
      'Firmer, more reliable morning erections',
      'Early soothing of smooth prostatic muscle tone'
    ]
  },
  {
    phasePt: 'Fase 2: Estímulo das Vesículas Seminais',
    phaseEn: 'Phase 2: Seminal Vesicle Hyper-Activation',
    weeks: 'Semanas 3 - 4 (Dias 15 - 30)',
    icon: 'Droplets',
    titlePt: 'Aumento da Densidade & Volume Visível',
    titleEn: 'Seminal Density & Visible Volume Surge',
    descriptionPt: 'As vesículas seminais (responsáveis por 70% do volume total do sêmen) passam a produzir fluidos ricos em frutose com auxílio da L-Lisina e do pólen de flor sueca.',
    descriptionEn: 'The seminal vesicles (responsible for 70% of total ejaculate volume) produce fructose-rich fluid powered by L-Lysine and Swedish flower pollen.',
    keyChangesPt: [
      'Fluido seminal notavelmente mais denso, viscoso e esbranquiçado',
      'Sensação de "pressão cheia" antes do clímax',
      'Orgasmos com as primeiras ondas de contração estendidas'
    ],
    keyChangesEn: [
      'Noticeably thicker, whiter, and denser fluid consistency',
      'Pleasant "full tank" sensation preceding climax',
      'Orgasms featuring prolonged rhythmic contraction waves'
    ]
  },
  {
    phasePt: 'Fase 3: O Ciclo da Espermatogênese Completa',
    phaseEn: 'Phase 3: Full Spermatogenesis Synergy',
    weeks: 'Semanas 5 - 8 (Dias 31 - 60)',
    icon: 'Flame',
    titlePt: 'Pico dos Estudos Clínicos (+48,8%)',
    titleEn: 'Peak Clinical Study Results (+48.8%)',
    descriptionPt: 'A janela de 60 dias documentada no estudo clínico do Dr. Craig Hall. É aqui que todos os 3 centros glandulares (vesículas, próstata e glândulas bulbouretrais) operam na capacidade máxima.',
    descriptionEn: 'The 60-day window documented in Dr. Craig Hall’s clinical trial. All 3 glandular powerhouses (vesicles, prostate, and bulbourethral) operate at peak capacity.',
    keyChangesPt: [
      'Aumento de até 48,8% no volume do jato',
      'Contrações do músculo pubococcígeo com 70% mais intensidade',
      'Redução drástica no tempo de recuperação entre ejaculações'
    ],
    keyChangesEn: [
      'Up to +48.8% laboratory-verified surge in ejaculate output',
      'Pubococcygeus muscle spasms hitting 70% greater intensity',
      'Drastic reduction in refractory downtime between rounds'
    ]
  },
  {
    phasePt: 'Fase 4: Consolidação & Controle Master',
    phaseEn: 'Phase 4: Output Mastery & Consolidation',
    weeks: 'Semanas 9 - 12+ (Dias 61 - 90+)',
    icon: 'ShieldCheck',
    titlePt: 'Rendimento Máximo Permanente',
    titleEn: 'Peak Sustained Performance & Power',
    descriptionPt: 'Novo ciclo celular de espermatozoides 100% maduro, com motilidade e volume em níveis de atleta. Memória neuromuscular e condicionamento pélvico consolidados.',
    descriptionEn: 'A completely new 100% renewed sperm cell cycle, with motility and load volume at peak levels. Pelvic muscle memory firmly locked in.',
    keyChangesPt: [
      'Volume consistentemente gigante em todas as ocasiões',
      'Controle absoluto sobre o timing da ejaculação',
      'Confiança inabalável e satisfação sexual multiplicada'
    ],
    keyChangesEn: [
      'Consistently immense volume across all occasions',
      'Supreme mastery over ejaculatory timing and surge control',
      'Unshakable bedroom confidence and multiplied partner satisfaction'
    ]
  }
];

export const NUTRITION_TIPS = [
  {
    categoryPt: 'Alimentos Aliados do Volume',
    categoryEn: 'Top Volume-Boosting Foods',
    itemsPt: [
      'Sementes de Abóbora: Altíssima concentração de zinco biodisponível e magnésio.',
      'Ostras e Frutos do Mar: Reis minerais da fertilidade e síntese de testosterona.',
      'Aipo e Salsa: Ricos em androstenona e apigenina para vasodilatação pélvica.',
      'Espinafre e Folhas Escuras: Fontes puras de folato e óxido nítrico vegetal.',
      'Água Mineral Eletrolítica: Base essencial para o volume osmótico das vesículas.'
    ],
    itemsEn: [
      'Pumpkin Seeds: Exceptional concentration of bioavailable zinc and magnesium.',
      'Oysters & Seafood: Nature’s supreme source for testosterone synthesis minerals.',
      'Celery & Parsley: Packed with androstenone and apigenin for pelvic dilation.',
      'Dark Leafy Greens: Rich in natural nitrates, folate, and cellular antioxidants.',
      'Electrolyte Mineral Water: Crucial bedrock for seminal vesicle osmotic fluid.'
    ]
  },
  {
    categoryPt: 'Hábitos a Evitar para Preservar o Fluido',
    categoryEn: 'Habits to Avoid for Peak Semen Volume',
    itemsPt: [
      'Calor Excessivo nos Testículos: Evite banheiras muito quentes, saunas longas e laptops no colo (os testículos precisam operar a 2°C abaixo da temperatura corporal).',
      'Desidratação Oculta: Café em excesso ou álcool sem reposição hídrica reduzem drasticamente o volume do disparo.',
      'Roupas Íntimas Excessivamente Apertadas: Diminuem a oxigenação testicular e a circulação sanguínea escrotal.',
      'Estresse Crônico & Falta de Sono: O cortisol alto inibe a liberação noturna de LH e testosterona livre.'
    ],
    itemsEn: [
      'Excessive Testicular Heat: Avoid prolonged hot tubs, saunas, and laptops directly on your lap (testes must stay 2°C cooler than body core).',
      'Hidden Dehydration: Heavy coffee or alcohol without compensatory water severely dries up seminal vesicle stores.',
      'Constrictive Underwear: Impairs scrotal thermal regulation and deep venous return.',
      'Chronic Stress & Sleep Deprivation: High cortisol blocks nocturnal luteinizing hormone and free testosterone output.'
    ]
  }
];
