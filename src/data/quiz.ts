import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionPt: 'Qual é a sua percepção atual sobre o volume do seu ejaculado?',
    questionEn: 'How would you describe your current ejaculate fluid volume?',
    options: [
      {
        labelPt: 'Bastante escasso ou quase inexistente (menos de meia colher de chá)',
        labelEn: 'Very low or barely noticeable (under half a teaspoon)',
        points: 10,
        explanationPt: 'Indica deficiência aguda nos fluidos das vesículas seminais e baixa hidratação celular.',
        explanationEn: 'Indicates acute depletion of seminal vesicle fluids and cellular dehydration.'
      },
      {
        labelPt: 'Moderado, porém inconsistente e oscila conforme o cansaço',
        labelEn: 'Moderate, but inconsistent and drops noticeably with stress/fatigue',
        points: 20,
        explanationPt: 'Sugere carência de micronutrientes catalisadores (Zinco, L-Lisina, L-Arginina).',
        explanationEn: 'Suggests depletion in catalytic micronutrients (Zinc, L-Lysine, L-Arginine).'
      },
      {
        labelPt: 'Normal, mas sinto que diminuíu nos últimos anos e quero maximizar',
        labelEn: 'Average, but has declined in recent years and I want peak explosive volume',
        points: 30,
        explanationPt: 'Excelente candidato para o protocolo completo de 90 dias com o pico de espermatogênese.',
        explanationEn: 'Prime candidate for the 90-day spermatogenesis peak output protocol.'
      }
    ]
  },
  {
    id: 2,
    questionPt: 'Como você descreveria a intensidade das contrações do seu orgasmo?',
    questionEn: 'How would you rate the intensity of your climax muscle contractions?',
    options: [
      {
        labelPt: 'Fracas ou rápidas demais, sem grande sensação de pulso',
        labelEn: 'Weak or over too fast, with minimal pulsing sensation',
        points: 10,
        explanationPt: 'O tônus do músculo pubococcígeo e os níveis de óxido nítrico precisam de fortalecimento.',
        explanationEn: 'Pubococcygeus muscle tone and nitric oxide signaling need reactivation.'
      },
      {
        labelPt: 'Boas, mas sinto que falta aquela força de espasmo que faz pulsar',
        labelEn: 'Decent, but lacking the deep involuntary pelvic spasm waves',
        points: 20,
        explanationPt: 'O extrato de flor sueca e a catuaba atuam diretamente no estímulo das contrações.',
        explanationEn: 'Swedish flower pollen and catuaba directly stimulate climactic contraction waves.'
      },
      {
        labelPt: 'Intensas, mas busco sensações mais prolongadas e múltiplos jatos',
        labelEn: 'Intense, but seeking prolonged sensations and long-distance thrusts',
        points: 30,
        explanationPt: 'A sinergia botânica do Semenax pode estender a duração das contrações em até 71%.',
        explanationEn: 'Semenax botanical synergy can prolong contraction duration up to 71%.'
      }
    ]
  },
  {
    id: 3,
    questionPt: 'Quanto tempo você geralmente leva para recuperar a prontidão entre rounds?',
    questionEn: 'How long does your refractory period typically take between rounds?',
    options: [
      {
        labelPt: 'Horas ou só no dia seguinte (período refratário longo)',
        labelEn: 'Several hours or next morning (long refractory window)',
        points: 10,
        explanationPt: 'Exaustão dos reservatórios de zinco testicular e neurotransmissores dopaminérgicos.',
        explanationEn: 'Depletion of testicular zinc reservoirs and dopaminergic neurotransmitters.'
      },
      {
        labelPt: 'Entre 30 e 60 minutos com esforço para restabelecer a rigidez',
        labelEn: 'Between 30 to 60 minutes with deliberate effort needed',
        points: 20,
        explanationPt: 'A Salsaparrilha e a L-Carnitina aceleram a síntese de ATP celular mitocondrial.',
        explanationEn: 'Sarsaparilla and L-Carnitine accelerate mitochondrial ATP regeneration.'
      },
      {
        labelPt: 'Menos de 20 minutos, porém o volume do 2º round é muito menor',
        labelEn: 'Under 20 minutes, though 2nd round volume is visibly diminished',
        points: 30,
        explanationPt: 'Semenax recarrega o pool seminal rapidamente permitindo alto volume mesmo em disparos seguidos.',
        explanationEn: 'Semenax rapidly replenishes the seminal pool, sustaining volume in follow-up rounds.'
      }
    ]
  },
  {
    id: 4,
    questionPt: 'Qual é o seu consumo médio de água por dia?',
    questionEn: 'What is your daily hydration baseline?',
    options: [
      {
        labelPt: 'Menos de 1,5 Litro por dia (frequentemente esqueço)',
        labelEn: 'Under 1.5 Liters per day (frequently forget)',
        points: 10,
        explanationPt: 'Mais de 70% do ejaculado é composto de fluidos biológicos aquosos. Hidratação é a base.',
        explanationEn: 'Over 70% of ejaculate is water-based biological fluid. Hydration is vital.'
      },
      {
        labelPt: 'Entre 1,5L e 2,5L de água por dia',
        labelEn: 'Between 1.5L and 2.5L daily',
        points: 20,
        explanationPt: 'Bom nível. Atingir a meta ideal de 3L maximizará a ação das vesículas seminais.',
        explanationEn: 'Good baseline. Hitting the 3L target will unlock full seminal output.'
      },
      {
        labelPt: 'Mais de 2,5L a 3L de água consistentemente',
        labelEn: 'Consistently 2.5L to 3L+ of water',
        points: 30,
        explanationPt: 'Excelente. Seu corpo está com a biofísica perfeita para absorver a fórmula Semenax.',
        explanationEn: 'Ideal. Your cellular environment is perfectly primed to absorb Semenax nutrients.'
      }
    ]
  },
  {
    id: 5,
    questionPt: 'Você pratica exercícios de fortalecimento do assoalho pélvico (Kegel para homens)?',
    questionEn: 'Do you practice male pelvic floor / Kegel conditioning exercises?',
    options: [
      {
        labelPt: 'Nunca pratiquei ou não sei como isolar o músculo pubococcígeo',
        labelEn: 'Never tried or unsure how to isolate the pubococcygeus muscle',
        points: 10,
        explanationPt: 'O treinador guiado do aplicativo Semenax vai te ensinar o passo a passo em 3 minutos/dia.',
        explanationEn: 'The Semenax app guided trainer will teach you step-by-step in 3 minutes a day.'
      },
      {
        labelPt: 'Às vezes lembro de fazer, mas sem rotina ou cronômetro',
        labelEn: 'Occasionally attempt it, but without a structured routine or timer',
        points: 20,
        explanationPt: 'A consistência com nosso timer sonoro aumentará em até 63% o controle do jato.',
        explanationEn: 'Consistency with our audio/haptic timer will boost thrust control by up to 63%.'
      },
      {
        labelPt: 'Faço regularmente e busco o combo definitivo com suplementação botânica',
        labelEn: 'I do them regularly and want the ultimate synergy with targeted botanical supplements',
        points: 30,
        explanationPt: 'A combinação de músculos pélvicos fortes + Semenax produz os jatos mais potentes documentados.',
        explanationEn: 'Strong pelvic muscles combined with Semenax formula deliver maximum propulsion velocity.'
      }
    ]
  }
];
