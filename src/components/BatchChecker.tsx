import React, { useState } from 'react';
import { ShieldCheck, Search, AlertTriangle, CheckCircle, Award, Sparkles, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { AUTHENTIC_BATCHES } from '../data/packages';

interface BatchCheckerProps {
  lang: Language;
}

export const BatchChecker: React.FC<BatchCheckerProps> = ({ lang }) => {
  const [inputCode, setInputCode] = useState('');
  const [verificationResult, setVerificationResult] = useState<{
    tested: boolean;
    valid: boolean;
    data?: {
      batch: string;
      mfg: string;
      exp: string;
      facility: string;
      notePt: string;
      noteEn: string;
    };
  }>({ tested: false, valid: false });

  const handleVerify = (codeToTest?: string) => {
    const code = (codeToTest || inputCode).trim().toUpperCase();
    if (!code) return;

    const match = AUTHENTIC_BATCHES[code];
    if (match) {
      setVerificationResult({
        tested: true,
        valid: true,
        data: match
      });
    } else {
      setVerificationResult({
        tested: true,
        valid: false
      });
    }
  };

  const handleQuickFill = (code: string) => {
    setInputCode(code);
    handleVerify(code);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{lang === 'pt' ? 'Sistema Central Anti-Falsificação' : 'Anti-Counterfeit Central Verification'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          {lang === 'pt' ? 'Verificador de Autenticidade do Frasco' : 'Bottle Authenticity & Batch Verifier'}
        </h2>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          {lang === 'pt'
            ? 'Devido à enorme procura mundial pelo Semenax®, recomendamos verificar o código de lote impresso no fundo do seu frasco para garantir que recebeu o produto original cGMP.'
            : 'Due to global demand for Semenax®, verify the batch and lot code printed on your bottle base to confirm authenticity and cGMP safety certification.'}
        </p>
      </div>

      {/* Verifier Input Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-[#0b1329] to-slate-900 border border-slate-800 shadow-xl space-y-5">
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            {lang === 'pt' ? 'Digite o Código de Lote (Localizado no fundo do frasco):' : 'Enter Batch Code (Located on bottle base):'}
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Ex: SNX-8821-BR ou SNX-2026-A89"
              className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 uppercase"
            />
            <button
              onClick={() => handleVerify()}
              className="py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-600/25 transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>{lang === 'pt' ? 'Verificar Lote' : 'Verify Batch'}</span>
            </button>
          </div>
        </div>

        {/* Demo Codes Helper */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1">
          <span>{lang === 'pt' ? 'Códigos de exemplo para teste:' : 'Example codes for testing:'}</span>
          {['SNX-8821-BR', 'SNX-2026-A89', 'SNX-9942-US'].map((code) => (
            <button
              key={code}
              onClick={() => handleQuickFill(code)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-[11px] border border-slate-700"
            >
              {code}
            </button>
          ))}
        </div>

        {/* Result Display */}
        {verificationResult.tested && (
          <div className="pt-4 border-t border-slate-800">
            {verificationResult.valid && verificationResult.data ? (
              <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-600/70 space-y-3">
                <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>{lang === 'pt' ? 'LOTE 100% AUTÊNTICO E CERTIFICADO' : '100% AUTHENTIC & CERTIFIED BATCH'}</span>
                </div>

                <p className="text-xs text-slate-200">
                  {lang === 'pt' ? verificationResult.data.notePt : verificationResult.data.noteEn}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">{lang === 'pt' ? 'Lote:' : 'Batch:'}</span>
                    <span className="font-mono font-bold text-white">{verificationResult.data.batch}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">{lang === 'pt' ? 'Fabricação:' : 'Mfg Date:'}</span>
                    <span className="font-bold text-white">{verificationResult.data.mfg}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">{lang === 'pt' ? 'Validade:' : 'Exp Date:'}</span>
                    <span className="font-bold text-emerald-400">{verificationResult.data.exp}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">{lang === 'pt' ? 'Pureza HPLC:' : 'Purity Assay:'}</span>
                    <span className="font-bold text-cyan-400">99.8% Ativo</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 pt-1">
                  <strong>{lang === 'pt' ? 'Instalação:' : 'Facility:'}</strong> {verificationResult.data.facility}
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-600/70 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <span>{lang === 'pt' ? 'CÓDIGO NÃO LOCALIZADO NO REGISTRO OFICIAL' : 'CODE NOT FOUND IN OFFICIAL REGISTRY'}</span>
                </div>
                <p className="text-xs text-slate-300">
                  {lang === 'pt'
                    ? 'O código digitado não consta nos registros de lotes cGMP da Leading Edge Health. Certifique-se de que comprou exclusivamente no canal oficial para evitar falsificações nocivas à saúde.'
                    : 'The entered batch does not match authentic Leading Edge Health registry logs. Always ensure purchasing from official authorized distributors to protect your health.'}
                </p>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Anti-Counterfeit Checklist */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          <span>{lang === 'pt' ? 'Como Reconhecer a Embalagem Original Semenax®' : 'How to Spot Genuine Semenax® Packaging'}</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 space-y-1">
            <span className="font-bold text-white block">1. Lacre de Indução</span>
            <p className="text-slate-400 text-[11px]">
              {lang === 'pt' ? 'O frasco original possui selo de pressão térmico inviolável sob a tampa plástica.' : 'Features a tamper-evident induction seal under the child-resistant cap.'}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 space-y-1">
            <span className="font-bold text-white block">2. Código Laser no Fundo</span>
            <p className="text-slate-400 text-[11px]">
              {lang === 'pt' ? 'Impressão a laser nítida com data de validade de 2 anos e lote oficial rastreável.' : 'Crisp laser-etched 2-year expiration date and lot code stamped into base.'}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 space-y-1">
            <span className="font-bold text-white block">3. 120 Cápsulas Certificadas</span>
            <p className="text-slate-400 text-[11px]">
              {lang === 'pt' ? 'Cada frasco contém exatamente 120 cápsulas gelatinosas na cor padrão com aroma botânico.' : 'Exact 120-capsule count with uniform botanical herbal scent and color.'}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
