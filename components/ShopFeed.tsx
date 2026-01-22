import React from 'react';
import { Product } from '../types';
import { Search, ShoppingCart, Play } from 'lucide-react';

interface ShopFeedProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export const ShopFeed: React.FC<ShopFeedProps> = ({ products, onProductClick }) => {
  return (
    <div className="bg-black min-h-full pb-20 text-white">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black border-b border-white/10">
        {/* Top Tabs */}
        <div className="flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-400">
          <span>Live</span>
          <span>Explorar</span>
          <span>Cacoal</span>
          <span>Seguindo</span>
          <div className="flex flex-col items-center">
             <span className="text-white font-bold">Loja</span>
             <div className="w-8 h-0.5 bg-white mt-1 rounded-full"></div>
          </div>
          <span>Para você</span>
          <div className="relative">
             <ShoppingCart size={20} />
             <span className="absolute -top-1 -right-1 bg-brand text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">7</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-10 bg-[#1e1e1e] rounded-lg flex items-center px-3 gap-2">
              <Search size={18} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="perfumes" 
                className="bg-transparent text-white text-sm w-full outline-none placeholder:text-gray-500"
              />
            </div>
            <button className="text-sm font-bold text-white">Procurar</button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar text-sm text-gray-400 font-medium border-b border-white/5">
          <span className="text-white font-bold whitespace-nowrap">Todos</span>
          <span className="whitespace-nowrap">Eletrônicos</span>
          <span className="whitespace-nowrap">Beleza</span>
          <span className="whitespace-nowrap">Casa e Mais</span>
          <span className="whitespace-nowrap">Moda</span>
        </div>

        {/* Filter Tags */}
        <div className="flex gap-2 overflow-x-auto px-4 py-2 no-scrollbar">
            {['Frete grátis', '25% OFF', '25% OFF', '25% OFF'].map((tag, i) => (
                <div key={i} className={`whitespace-nowrap px-3 py-1 rounded-sm text-[10px] font-bold ${i === 0 ? 'bg-[#009b7c] text-white' : 'bg-[#3a1a1f] text-brand'}`}>
                    {tag}
                </div>
            ))}
        </div>
      </div>

      {/* Hero Banner */}
      <div className="mx-4 mt-2 rounded-xl overflow-hidden relative h-40 bg-gradient-to-r from-orange-900 to-amber-700 flex items-center p-4">
        <div className="z-10 w-2/3">
            <div className="flex items-center gap-1 mb-1">
                <span className="text-[10px] font-bold text-white">TikTok Shop</span>
            </div>
            <h2 className="text-2xl font-black italic uppercase leading-none mb-2">MARCAS EM<br/>DESTAQUE</h2>
            <div className="flex gap-2 text-[10px] font-medium text-white/80 mb-3">
                <span className="flex items-center gap-1">🔒 100% autêntico</span>
                <span className="flex items-center gap-1">🚚 Frete grátis</span>
            </div>
            <button className="bg-brand text-white text-xs font-bold px-4 py-1.5 rounded-full">Compre agora</button>
        </div>
        <img 
            src="https://png.pngtree.com/png-vector/20240314/ourmid/pngtree-3d-online-shopping-on-social-media-app-png-image_11959772.png" 
            className="absolute right-0 bottom-0 h-36 object-contain" 
            alt="Banner"
        />
      </div>

      {/* Grid */}
      <div className="p-2 grid grid-cols-2 gap-2 mt-2">
        {products.map((product) => (
            <div 
                key={product.id} 
                onClick={() => onProductClick(product)}
                className="bg-[#1e1e1e] rounded-md overflow-hidden active:opacity-90 transition-opacity"
            >
                <div className="relative aspect-[3/4]">
                    <img src={product.cover_url} alt={product.name} className="w-full h-full object-cover" />
                    {product.video_url && (
                        <div className="absolute top-2 right-2 bg-black/40 px-1.5 py-0.5 rounded flex items-center gap-1 backdrop-blur-sm">
                            <Play size={10} fill="white" className="text-white" />
                            <span className="text-[10px] font-bold">00:08</span>
                        </div>
                    )}
                    {product.tags && product.tags.length > 0 && (
                        <div className="absolute bottom-0 left-0 bg-brand text-white text-[10px] font-bold px-1.5 py-0.5">
                            {product.tags[0]}
                        </div>
                    )}
                </div>
                <div className="p-2">
                    <h3 className="text-xs text-gray-200 line-clamp-2 mb-1 leading-relaxed">{product.name}</h3>
                    <div className="flex items-baseline gap-1.5 mb-1">
                        <span className="text-brand font-bold text-sm">R$ {(product.price_cents/100).toFixed(2).replace('.',',')}</span>
                        {product.original_price_cents && (
                            <span className="text-gray-500 text-[10px] line-through">R$ {(product.original_price_cents/100).toFixed(2).replace('.',',')}</span>
                        )}
                    </div>
                    {product.discount_percent && (
                        <div className="flex items-center gap-1 mb-1">
                            <span className="bg-brand/20 text-brand text-[9px] px-1 rounded font-bold">{product.discount_percent}% OFF</span>
                            {product.tags?.includes('4x sem juros') && (
                                <span className="text-[9px] text-gray-400">4x sem juros</span>
                            )}
                        </div>
                    )}
                    
                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                        <div className="flex text-yellow-500">
                            {'★'.repeat(1)}
                            <span className="text-gray-300 font-bold ml-0.5">{product.rating}</span>
                        </div>
                        <span className="w-0.5 h-2 bg-gray-600"></span>
                        <span>{product.sold_count} vendidos</span>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};