import React, { useState } from 'react';
import { ShieldCheck, Truck, Lock, CheckCircle2, ArrowRight, Sparkles, Star, CreditCard, QrCode } from 'lucide-react';
import { Language, ProductBundle } from '../types';
import { PRODUCT_BUNDLES } from '../data/packages';
import { IMAGES } from '../assets/images';

interface StoreSectionProps {
  lang: Language;
}

export const StoreSection: React.FC<StoreSectionProps> = ({ lang }) => {
  const [selectedBundle, setSelectedBundle] = useState<ProductBundle | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('pix');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: ''
  });

  const handleOpenCheckout = (bundle: ProductBundle) => {
    setSelectedBundle(bundle);
    setCheckoutStep('details');
  };

  const handleCloseCheckout = () => {
    setSelectedBundle(null);
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('success');
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      
      {/* Title & Trust Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{lang === 'pt' ? 'Canal de Distribuição Oficial cGMP' : 'Official cGMP Distribution Hub'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
          {lang === 'pt' ? 'Adquira o Semenax® Original' : 'Order Authentic Semenax®'}
        </h2>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto">
          {lang === 'pt'
            ? 'Todos os pedidos contam com a garantia incondicional de 67 dias da Leading Edge Health. Envio 100% discreto em caixa lacrada sem qualquer menção externa ao produto.'
            : 'All orders are backed by Leading Edge Health 67-Day 100% Money-Back Guarantee. Shipped in 100% plain, discreet unmarked packaging.'}
        </p>
      </div>

      {/* Product Bundles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {PRODUCT_BUNDLES.map((bundle) => {
          const isPopular = bundle.popular;
          return (
            <div
              key={bundle.id}
              className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
                isPopular
                  ? 'bg-gradient-to-b from-slate-900 via-[#0b1329] to-[#070d19] border-2 border-cyan-400 shadow-2xl shadow-cyan-950/50 md:-translate-y-2'
                  : 'bg-slate-900/80 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Badge */}
              {bundle.badgePt && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-[11px] uppercase tracking-wider shadow-lg">
                  {lang === 'pt' ? bundle.badgePt : bundle.badgeEn}
                </div>
              )}

              <div className="space-y-4 pt-2">
                
                {/* Header */}
                <div className="text-center">
                  <h3 className="font-extrabold text-white text-lg">
                    {lang === 'pt' ? bundle.titlePt : bundle.titleEn}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {bundle.bottles} {bundle.bottles === 1 ? (lang === 'pt' ? 'Frasco (120 Cápsulas)' : 'Bottle (120 Caps)') : (lang === 'pt' ? `Frascos (${bundle.bottles * 120} Cápsulas)` : `Bottles (${bundle.bottles * 120} Caps)`)}
                  </p>
                </div>

                {/* Bottle preview thumbnail */}
                <div className="py-2 flex justify-center">
                  <img
                    src={IMAGES.bottle}
                    alt="Semenax Bottle"
                    className="h-32 object-contain drop-shadow-md"
                  />
                </div>

                {/* Pricing Block */}
                <div className="text-center py-2 border-y border-slate-800/80 space-y-1">
                  <div className="text-xs text-slate-400 line-through">
                    R$ {bundle.originalPriceBrl},00
                  </div>
                  <div className="text-3xl font-black text-white">
                    R$ {bundle.priceBrl},00
                  </div>
                  <div className="text-xs font-semibold text-cyan-400">
                    {bundle.installmentsBrl} sem juros
                  </div>
                </div>

                {/* Free Gifts / Features List */}
                <div className="space-y-2.5 text-xs text-slate-300">
                  {(lang === 'pt' ? bundle.freeGiftsPt : bundle.freeGiftsEn).map((gift, gIdx) => (
                    <div key={gIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{gift}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Order Button */}
              <div className="pt-6">
                <button
                  onClick={() => handleOpenCheckout(bundle)}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg ${
                    isPopular
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  <span>{lang === 'pt' ? 'Pedir Agora com Garantia' : 'Order Now with Guarantee'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 mt-2">
                  <Truck className="w-3 h-3 text-emerald-400" />
                  <span>{bundle.freeShipping ? (lang === 'pt' ? 'Frete Grátis Expresso' : 'Free Express Shipping') : (lang === 'pt' ? 'Envio Seguro Rastreável' : 'Tracked Insured Delivery')}</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* 67-Day Guarantee Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-cyan-950/40 border border-amber-500/40 flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
          <ShieldCheck className="w-9 h-9" />
        </div>
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-lg font-black text-white">
            {lang === 'pt' ? 'Garantia Incondicional de 67 Dias de Satisfação' : '100% 67-Day Money-Back Risk-Free Guarantee'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {lang === 'pt'
              ? 'Use o Semenax por 60 dias completos. Se você não notar um aumento colossal no volume do sêmen e na intensidade dos seus orgasmos, devolva os frascos (mesmo vazios) nos próximos 67 dias para receber 100% do seu dinheiro de volta.'
              : 'Try Semenax for a full 60 days. If you do not experience a massive surge in ejaculate fluid and explosive climax contractions, simply return your containers (even empty) within 67 days for a 100% refund.'}
          </p>
        </div>
      </div>

      {/* Checkout Modal */}
      {selectedBundle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0b1329] border border-cyan-700/60 p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  {lang === 'pt' ? 'Checkout Oficial Seguro (SSL 256-Bit)' : 'Official Secure Checkout (256-Bit SSL)'}
                </span>
                <h3 className="text-lg font-extrabold text-white">
                  {lang === 'pt' ? selectedBundle.titlePt : selectedBundle.titleEn}
                </h3>
              </div>
              <button
                onClick={handleCloseCheckout}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {checkoutStep === 'details' ? (
              <form onSubmit={handleCompleteOrder} className="space-y-4">
                
                {/* Price summary pill */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{lang === 'pt' ? 'Total do Pedido:' : 'Order Total:'}</span>
                  <span className="text-lg font-black text-white">R$ {selectedBundle.priceBrl},00</span>
                </div>

                {/* Form fields */}
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      {lang === 'pt' ? 'Nome Completo' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: João Carlos Silva"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">E-mail</label>
                      <input
                        type="email"
                        required
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        {lang === 'pt' ? 'WhatsApp / Telefone' : 'Phone'}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(11) 99999-9999"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      {lang === 'pt' ? 'Endereço de Entrega (Sigiloso)' : 'Delivery Address (Confidential)'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Rua, Número, Complemento, Bairro"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* Payment Selector */}
                <div className="space-y-2 pt-1">
                  <label className="block text-xs text-slate-300 font-semibold">
                    {lang === 'pt' ? 'Método de Pagamento' : 'Payment Method'}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('pix')}
                      className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                        paymentMethod === 'pix'
                          ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-md'
                          : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      <QrCode className="w-4 h-4" />
                      <span>PIX (Aprovação Imediata)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                        paymentMethod === 'card'
                          ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-md'
                          : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>{lang === 'pt' ? 'Cartão em até 12x' : 'Credit Card'}</span>
                    </button>
                  </div>
                </div>

                {/* Discreet packaging guarantee */}
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {lang === 'pt'
                      ? 'Embalagem 100% Discreta: Remetente sigiloso, sem menção a produtos masculinos.'
                      : '100% Discreet Packaging: Plain exterior box with zero reference to contents.'}
                  </span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>{lang === 'pt' ? 'Finalizar Pedido com Garantia' : 'Complete Secure Order'}</span>
                </button>

              </form>
            ) : (
              /* Success screen */
              <div className="text-center space-y-4 py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-extrabold text-white">
                  {lang === 'pt' ? 'Pedido Confirmado com Sucesso!' : 'Order Successfully Placed!'}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                  {lang === 'pt'
                    ? 'Seu lote de Semenax® original está sendo separado na central de distribuição cGMP. Você receberá o código de rastreamento por e-mail e WhatsApp em instantes.'
                    : 'Your authentic Semenax® batch is being prepared at our cGMP distribution center. Your express tracking number will arrive by email shortly.'}
                </p>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-left space-y-1">
                  <div className="text-slate-400">{lang === 'pt' ? 'Código de Rastreio Inicial:' : 'Batch Tracking ID:'}</div>
                  <div className="font-mono font-bold text-cyan-400">SNX-BR-{Math.floor(100000 + Math.random() * 900000)}</div>
                  <div className="text-[11px] text-slate-400 mt-2">
                    {lang === 'pt' ? 'Prazo estimado de entrega: 3 a 5 dias úteis em embalagem discreta.' : 'Estimated delivery: 3 to 5 business days in discreet package.'}
                  </div>
                </div>

                <button
                  onClick={handleCloseCheckout}
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
                >
                  {lang === 'pt' ? 'Voltar ao Painel' : 'Back to Dashboard'}
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
