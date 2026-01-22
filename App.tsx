import React, { useState } from 'react';
import { MOCK_PRODUCTS } from './constants';
import { ShopFeed } from './components/ShopFeed';
import { ProductDetail } from './components/ProductDetail';
import { CheckoutDrawer } from './components/CheckoutDrawer';
import { AdminVault } from './components/AdminVault';
import { Product } from './types';
import { Settings, Home, Users, PlusSquare, MessageSquare, User } from 'lucide-react';

type ViewState = 'FEED' | 'PRODUCT';

export default function App() {
  const [view, setView] = useState<ViewState>('FEED');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('PRODUCT');
  };

  const handleBackToFeed = () => {
    setView('FEED');
    setSelectedProduct(null);
  };

  const handleBuyClick = () => {
    setIsCheckoutOpen(true);
  };

  return (
    <div className="relative h-screen w-full bg-black flex justify-center overflow-hidden font-sans">
      
      {/* Mobile Frame Container */}
      <div className="w-full md:max-w-[400px] h-full relative bg-black shadow-2xl overflow-hidden flex flex-col">
        
        {/* Admin Toggle */}
        <button 
          onClick={() => setShowAdmin(true)}
          className="absolute top-20 right-4 z-40 text-white/10 hover:text-white transition-colors p-2"
          title="Acesso Admin"
        >
          <Settings size={20} />
        </button>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative bg-black">
          {view === 'FEED' ? (
            <ShopFeed products={MOCK_PRODUCTS} onProductClick={handleProductClick} />
          ) : (
            selectedProduct && (
              <ProductDetail 
                product={selectedProduct} 
                onBack={handleBackToFeed} 
                onBuy={handleBuyClick} 
              />
            )
          )}
        </div>

        {/* Bottom Navigation (Only visible on Feed) */}
        {view === 'FEED' && (
          <div className="h-14 bg-black border-t border-white/10 flex justify-between items-center px-6 text-[#8a8b91] z-30 shrink-0">
              <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-white">
                  <Home size={22} />
                  <span className="text-[10px] font-medium">Início</span>
              </div>
              <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-white relative">
                  <Users size={22} />
                  <span className="text-[10px] font-medium">Amigos</span>
                  <span className="absolute -top-1 -right-2 bg-brand text-white text-[9px] px-1 rounded-full border border-black">37</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer">
                   <div className="bg-white rounded-lg px-3 py-1 mt-1">
                      <PlusSquare size={20} className="text-black fill-black" />
                   </div>
              </div>
              <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-white relative">
                  <MessageSquare size={22} />
                  <span className="text-[10px] font-medium">Mensagens</span>
                  <span className="absolute -top-1 -right-2 bg-brand text-white text-[9px] px-1 rounded-full border border-black">25</span>
              </div>
              <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-white">
                  <User size={22} />
                  <span className="text-[10px] font-medium">Perfil</span>
              </div>
          </div>
        )}

        {/* Checkout Modal */}
        <CheckoutDrawer 
          isOpen={isCheckoutOpen} 
          product={selectedProduct} 
          onClose={() => setIsCheckoutOpen(false)} 
        />

      </div>

      {/* Admin Overlay */}
      {showAdmin && <AdminVault onClose={() => setShowAdmin(false)} />}
    </div>
  );
}