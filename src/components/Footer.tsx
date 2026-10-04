import React from 'react';
import { ShieldCheck, Award, Lock, Heart, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onSelectTab }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#050914] text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Col */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-wider text-white">
              SEMEN<span className="text-cyan-400">AX</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800">
              Rx Natural
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {lang === 'pt'
              ? 'Aplicativo oficial de acompanhamento e suporte de vitalidade masculina Semenax®. Desenvolvido com padrão farmacêutico cGMP.'
              : 'Official Semenax® companion app and male reproductive output tracker. Formulated under strict cGMP pharmaceutical standards.'}
          </p>
          <div className="text-[11px] text-slate-500">
            © 2026 Semenax®. {lang === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}
          </div>
        </div>

        {/* Clinical Proof Badges */}
        <div className="space-y-3 md:col-span-1">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">
            {lang === 'pt' ? 'Certificações & Credenciais' : 'Certifications & Proof'}
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{lang === 'pt' ? 'Estudo Clínico Dr. Craig Hall' : 'Dr. Craig Hall Clinical Trial'}</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{lang === 'pt' ? 'Instalação cGMP Registrada' : 'cGMP Registered Facility'}</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{lang === 'pt' ? 'Fabricado nos Estados Unidos' : 'Made in USA'}</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{lang === 'pt' ? 'Garantia Incondicional 67 Dias' : '67-Day Full Guarantee'}</span>
            </li>
          </ul>
        </div>

        {/* Fast Links */}
        <div className="space-y-3 md:col-span-1">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">
            {lang === 'pt' ? 'Navegação do App' : 'App Navigation'}
          </h4>
          <div className="grid grid-cols-1 gap-1.5 text-xs">
            <button onClick={() => onSelectTab('tracker')} className="text-left hover:text-cyan-400 transition-colors">
              {lang === 'pt' ? '• Rastreador de Doses Diárias' : '• Daily Dosage Tracker'}
            </button>
            <button onClick={() => onSelectTab('kegel')} className="text-left hover:text-cyan-400 transition-colors">
              {lang === 'pt' ? '• Treinador Pélvico (Kegel)' : '• Pelvic Floor Trainer'}
            </button>
            <button onClick={() => onSelectTab('formula')} className="text-left hover:text-cyan-400 transition-colors">
              {lang === 'pt' ? '• 17 Ingredientes Ativos' : '• 17 Bioactive Formula'}
            </button>
            <button onClick={() => onSelectTab('study')} className="text-left hover:text-cyan-400 transition-colors">
              {lang === 'pt' ? '• Estudo Clínico +48.8%' : '• Clinical Trial +48.8%'}
            </button>
            <button onClick={() => onSelectTab('verify')} className="text-left hover:text-cyan-400 transition-colors">
              {lang === 'pt' ? '• Verificador de Código de Lote' : '• Batch Authenticity Checker'}
            </button>
            <button onClick={() => onSelectTab('store')} className="text-left font-bold text-cyan-400 hover:text-cyan-300 transition-colors">
              {lang === 'pt' ? '• Loja Oficial Semenax' : '• Official Store'}
            </button>
          </div>
        </div>

        {/* Security & Confidentiality */}
        <div className="space-y-3 md:col-span-1">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">
            {lang === 'pt' ? 'Privacidade & Sigilo' : 'Discreet Guarantee'}
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            {lang === 'pt'
              ? 'Privacidade total do cliente: Sua fatura e pacote não contêm detalhes sobre saúde masculina. Dados protegidos com criptografia SSL 256-bit.'
              : 'Complete customer confidentiality: Packaging and billing descriptions are 100% discrete. Encrypted under 256-bit SSL security.'}
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 pt-1">
            <Lock className="w-4 h-4" />
            <span>{lang === 'pt' ? 'Ambiente Seguro Verificado' : 'Verified Secure Portal'}</span>
          </div>
        </div>

      </div>

      {/* Medical Disclaimer */}
      <div className="max-w-7xl mx-auto border-t border-slate-900 pt-6 text-[11px] text-slate-300 leading-relaxed text-center space-y-2">
        <p>
          {lang === 'pt'
            ? 'Aviso Regulatório: As declarações neste aplicativo e sobre o produto Semenax® não foram avaliadas pela ANVISA ou FDA. Este produto é um suplemento alimentar botânico natural destinado a apoiar a saúde reprodutiva e a função das glândulas seminais masculinas, não se destinando a diagnosticar, tratar, curar ou prevenir qualquer doença. Consulte seu médico antes de iniciar qualquer regime de suplementação ou condicionamento físico.'
            : 'Regulatory Notice: Statements within this app and regarding Semenax® have not been evaluated by the FDA. This product is an all-natural dietary supplement formulated to support male reproductive wellness and seminal glandular output. It is not intended to diagnose, treat, cure, or prevent any medical disease. Always consult your physician before initiating any supplement regimen.'}
        </p>
      </div>
    </footer>
  );
};
