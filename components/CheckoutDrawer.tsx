import React, { useState, useEffect } from 'react';
import { Product, CheckoutState } from '../types';
import { api } from '../services/mockApi';
import { X, Truck, CreditCard, QrCode, Lock, CheckCircle, Loader2 } from 'lucide-react';

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export const CheckoutDrawer: React.FC<CheckoutDrawerProps> = ({ isOpen, onClose, product }) => {
  const [state, setState] = useState<CheckoutState>({
    step: 'SHIPPING',
    cep: '',
    shippingCost: 0,
    paymentMethod: 'CREDIT_CARD',
    cardData: { number: '', holder: '', expiry: '', cvv: '' },
    pixData: null,
    orderId: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset state when drawer opens
  useEffect(() => {
    if (isOpen) {
      setState(prev => ({ ...prev, step: 'SHIPPING', pixData: null, orderId: null }));
      setError('');
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const total = (product.price_cents + (state.shippingCost * 100)) / 100;

  // Handlers
  const handleCepBlur = async () => {
    if (state.cep.length >= 8) {
      setIsLoading(true);
      const cost = await api.calculateShipping(state.cep);
      setState(prev => ({ ...prev, shippingCost: cost / 100 }));
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    setError('');
    setIsLoading(true);

    try {
      if (state.paymentMethod === 'PIX') {
        const pix = await api.generatePix();
        setState(prev => ({ ...prev, pixData: pix, step: 'PAYMENT' }));
        // Simulate Pix WebSocket/Polling success after 5 seconds for demo
        setTimeout(() => {
             setState(prev => ({ ...prev, step: 'SUCCESS', orderId: pix.orderId }));
        }, 5000);
      } else {
        // Validate Card (Basic)
        if (state.cardData.number.length < 13 || state.cardData.cvv.length < 3) {
            throw new Error("Dados do cartão inválidos");
        }
        const res = await api.processCardPayment(state.cardData, total);
        setState(prev => ({ ...prev, orderId: res.orderId, step: 'SUCCESS' }));
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao processar pagamento.');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper formats
  const formatCurrency = (val: number) => `R$ ${val.toFixed(2).replace('.', ',')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity duration-300" 
        onClick={onClose} 
      />

      {/* Drawer */}
      <div className="bg-white dark:bg-dark-card w-full max-w-md rounded-t-2xl shadow-2xl pointer-events-auto animate-slide-up max-h-[90vh] overflow-y-auto flex flex-col text-gray-900 dark:text-white">
        
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-dark-card z-10 p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <h2 className="font-bold text-lg">Resumo do Pedido</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <X size={20} />
            </button>
        </div>

        <div className="p-5 flex-1 space-y-6">
            
            {/* Product Summary */}
            <div className="flex gap-4">
                <img src={product.cover_url} className="w-20 h-20 rounded-lg object-cover bg-gray-200" alt={product.name} />
                <div className="flex-1">
                    <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                    <p className="text-brand font-bold mt-1">{formatCurrency(product.price_cents / 100)}</p>
                    <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                        <CheckCircle size={12} /> Estoque disponível
                    </div>
                </div>
            </div>

            {state.step === 'SUCCESS' ? (
                <div className="flex flex-col items-center justify-center py-10 space-y-4 animate-in fade-in zoom-in">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                        <CheckCircle size={48} />
                    </div>
                    <h3 className="text-xl font-bold">Compra Aprovada!</h3>
                    <p className="text-center text-gray-500 text-sm">
                        Seu pedido <strong>#{state.orderId}</strong> foi recebido.<br/>
                        Enviaremos os detalhes para seu e-mail.
                    </p>
                    <button onClick={onClose} className="w-full bg-gray-900 dark:bg-white dark:text-black text-white py-3 rounded-xl font-bold mt-4">
                        Continuar Comprando
                    </button>
                </div>
            ) : (
                <>
                    {/* Step 1: Shipping */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium flex items-center gap-2">
                            <Truck size={16} /> Endereço de Entrega
                        </label>
                        <div className="flex gap-2">
                            <input 
                                type="tel" 
                                placeholder="CEP (00000-000)" 
                                className="flex-1 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-brand outline-none transition-all"
                                value={state.cep}
                                onChange={(e) => setState(prev => ({...prev, cep: e.target.value}))}
                                onBlur={handleCepBlur}
                                maxLength={9}
                            />
                        </div>
                        {state.shippingCost > 0 && (
                            <div className="text-xs text-gray-500 flex justify-between px-1">
                                <span>Frete Econômico (14 dias)</span>
                                <span className="font-bold text-green-600">{formatCurrency(state.shippingCost)}</span>
                            </div>
                        )}
                    </div>

                    {/* Step 2: Payment Method */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium">Método de Pagamento</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button 
                                onClick={() => setState(prev => ({...prev, paymentMethod: 'CREDIT_CARD'}))}
                                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${state.paymentMethod === 'CREDIT_CARD' ? 'border-brand bg-brand/5 text-brand' : 'border-gray-200 dark:border-gray-700'}`}
                            >
                                <CreditCard size={20} />
                                <span className="text-xs font-bold">Cartão</span>
                            </button>
                            <button 
                                onClick={() => setState(prev => ({...prev, paymentMethod: 'PIX'}))}
                                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${state.paymentMethod === 'PIX' ? 'border-brand bg-brand/5 text-brand' : 'border-gray-200 dark:border-gray-700'}`}
                            >
                                <QrCode size={20} />
                                <span className="text-xs font-bold">Pix (-5%)</span>
                            </button>
                        </div>
                    </div>

                    {/* Pix Display */}
                    {state.paymentMethod === 'PIX' && state.pixData && (
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl flex flex-col items-center space-y-3 text-center animate-in fade-in">
                            <div className="bg-white p-2 rounded-lg">
                                {/* Simulated QR */}
                                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${state.pixData.code}`} alt="Pix QR" className="w-32 h-32" />
                            </div>
                            <p className="text-xs text-gray-500 break-all px-4">{state.pixData.code.substring(0, 30)}...</p>
                            <div className="text-xs font-bold text-brand animate-pulse">Aguardando pagamento... (Simulado)</div>
                        </div>
                    )}

                    {/* Credit Card Form */}
                    {state.paymentMethod === 'CREDIT_CARD' && (
                        <div className="space-y-3 animate-in fade-in">
                            <input 
                                placeholder="Número do Cartão" 
                                className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-brand/20"
                                value={state.cardData.number}
                                onChange={e => setState(prev => ({...prev, cardData: {...prev.cardData, number: e.target.value}}))}
                                maxLength={19}
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <input 
                                    placeholder="MM/AA" 
                                    className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-brand/20"
                                    value={state.cardData.expiry}
                                    onChange={e => setState(prev => ({...prev, cardData: {...prev.cardData, expiry: e.target.value}}))}
                                />
                                <input 
                                    placeholder="CVV" 
                                    type="password"
                                    maxLength={3}
                                    className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-brand/20"
                                    value={state.cardData.cvv}
                                    onChange={e => setState(prev => ({...prev, cardData: {...prev.cardData, cvv: e.target.value}}))}
                                />
                            </div>
                            <input 
                                placeholder="Nome como no cartão" 
                                className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-brand/20"
                                value={state.cardData.holder}
                                onChange={e => setState(prev => ({...prev, cardData: {...prev.cardData, holder: e.target.value}}))}
                            />
                            <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                <Lock size={10} />
                                Dados criptografados com AES-256-GCM. CVV não é armazenado.
                            </div>
                        </div>
                    )}
                </>
            )}

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium">
                    {error}
                </div>
            )}
        </div>

        {/* Footer Actions */}
        {state.step !== 'SUCCESS' && (
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-card sticky bottom-0">
                <div className="flex justify-between mb-2 text-sm">
                    <span className="text-gray-500">Total</span>
                    <span className="font-bold text-lg">{formatCurrency(total)}</span>
                </div>
                
                {state.paymentMethod === 'PIX' && !state.pixData ? (
                     <button 
                        onClick={handlePayment} 
                        disabled={isLoading || state.cep.length < 8}
                        className="w-full bg-brand hover:bg-brand-dark text-white py-3.5 rounded-full font-bold transition-all disabled:opacity-50 flex justify-center items-center gap-2"
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : 'Gerar Pix'}
                    </button>
                ) : state.paymentMethod === 'CREDIT_CARD' ? (
                    <button 
                        onClick={handlePayment} 
                        disabled={isLoading || state.cep.length < 8}
                        className="w-full bg-brand hover:bg-brand-dark text-white py-3.5 rounded-full font-bold transition-all disabled:opacity-50 flex justify-center items-center gap-2"
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : 'Pagar Agora'}
                    </button>
                ) : null}
            </div>
        )}
      </div>
    </div>
  );
};