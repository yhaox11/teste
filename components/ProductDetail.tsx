import React from 'react';
import { Product } from '../types';
import { ArrowLeft, Search, Share2, ShoppingCart, MoreHorizontal, Store, MessageCircle, Star, ChevronRight, Truck } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onBuy: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onBuy }) => {
  return (
    <div className="bg-black min-h-full pb-24 text-white animate-in slide-in-from-right duration-200">
        
        {/* Navbar */}
        <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between p-3 bg-gradient-to-b from-black/60 to-transparent">
            <button onClick={onBack} className="w-8 h-8 bg-black/40 backdrop-blur rounded-full flex items-center justify-center">
                <ArrowLeft size={18} />
            </button>
            <div className="flex items-center gap-3">
                <button className="w-8 h-8 bg-black/40 backdrop-blur rounded-full flex items-center justify-center"><Search size={18} /></button>
                <button className="w-8 h-8 bg-black/40 backdrop-blur rounded-full flex items-center justify-center"><Share2 size={18} /></button>
                <button className="w-8 h-8 bg-black/40 backdrop-blur rounded-full flex items-center justify-center relative">
                    <ShoppingCart size={18} />
                    <span className="absolute -top-1 -right-1 bg-brand text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">7</span>
                </button>
                <button className="w-8 h-8 bg-black/40 backdrop-blur rounded-full flex items-center justify-center"><MoreHorizontal size={18} /></button>
            </div>
        </div>

        {/* Gallery */}
        <div className="w-full aspect-square bg-[#1e1e1e] relative">
            <img src={product.cover_url} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-4 right-4 bg-black/60 px-2 py-1 rounded-full text-xs font-bold">
                1/{product.images.length || 1}
            </div>
        </div>

        {/* Info Block */}
        <div className="p-4 bg-black">
            {/* Price */}
            <div className="flex items-baseline gap-2 mb-1">
                <div className="flex items-center bg-brand px-1.5 py-0.5 rounded text-white text-xs font-bold">
                    -{product.discount_percent}%
                </div>
                <span className="text-brand text-2xl font-bold">R$ {(product.price_cents/100).toFixed(2).replace('.',',')}</span>
                <span className="text-gray-500 text-sm line-through decoration-gray-500">R$ {(product.original_price_cents ? product.original_price_cents/100 : 0).toFixed(2).replace('.',',')}</span>
            </div>
            
            {/* Installments */}
            <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1 text-xs text-white/90">
                    <span className="border border-white/20 px-1 rounded">💳</span>
                    <span>5x R$ 41,38 sem juros</span>
                </div>
                <ChevronRight size={14} className="text-gray-500" />
            </div>

            {/* Coupons */}
            <div className="bg-[#3a1a1f] text-brand text-xs font-bold p-2 rounded-lg flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className="bg-brand text-white px-1 rounded text-[10px]">🎫</span>
                    <span>Desconto de 10%, máximo de R$ 25</span>
                </div>
                <ChevronRight size={14} />
            </div>

            {/* Title */}
            <h1 className="text-sm font-medium text-white/90 leading-relaxed mb-2">
                {product.name}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-3 text-xs text-gray-400 border-b border-white/10 pb-4">
                <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={12} fill="currentColor" />
                    <span className="text-white font-bold">{product.rating}</span>
                    <span className="text-gray-500">({product.reviews_count})</span>
                </div>
                <span className="w-[1px] h-3 bg-gray-700"></span>
                <span>{product.sold_count} vendidos</span>
            </div>

            {/* Shipping */}
            <div className="py-4 border-b border-white/10 space-y-2">
                <div className="flex items-start gap-2">
                    <Truck size={18} className="text-gray-300 mt-0.5" />
                    <div className="flex-1">
                        <div className="text-sm text-white font-medium">Receba até 6-9 de fev</div>
                        <div className="text-xs text-gray-400 mt-0.5">
                            Taxa de envio: <span className="line-through">R$ 67,19</span> <span className="text-white">R$ 62,19</span>
                        </div>
                        <div className="text-xs text-[#009b7c] mt-1 font-medium">
                            Desconto de R$ 5 no frete em pedidos acima de R$ 109
                        </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-500" />
                </div>
            </div>

            {/* Shop Info (Generic) */}
            <div className="py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 overflow-hidden border border-white/10">
                    <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${product.sku}`} alt="shop" />
                </div>
                <div className="flex-1">
                    <h4 className="text-sm font-bold">Lattafa Official</h4>
                    <div className="text-xs text-gray-400">Verificado • 98% positivo</div>
                </div>
                <button className="border border-brand text-brand text-xs font-bold px-4 py-1.5 rounded">Visitar</button>
            </div>
        </div>

        {/* Footer */}
        <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 px-4 py-3 flex items-center gap-3 z-30">
            <div className="flex flex-col items-center gap-0.5 min-w-[40px]">
                <Store size={20} className="text-white" />
                <span className="text-[10px] text-white">Loja</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 min-w-[40px] relative">
                <MessageCircle size={20} className="text-white" />
                <span className="text-[10px] text-white">Chat</span>
                 <span className="absolute top-0 right-1 w-2 h-2 bg-brand rounded-full"></span>
            </div>
            
            <button className="flex-1 bg-[#2f2f2f] text-white font-bold text-sm py-2.5 rounded-lg">
                Adicionar ao carrinho
            </button>
            <button 
                onClick={onBuy}
                className="flex-1 bg-brand text-white font-bold text-sm py-2.5 rounded-lg"
            >
                Comprar agora
                <span className="block text-[9px] font-normal opacity-90">Sem juros</span>
            </button>
        </div>
    </div>
  );
};