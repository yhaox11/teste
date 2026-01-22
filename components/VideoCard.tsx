import React, { useRef, useEffect, useState } from 'react';
import { Product } from '../types';
import { Heart, MessageCircle, Share2, Music2, ShoppingBag } from 'lucide-react';

interface VideoCardProps {
  product: Product;
  isActive: boolean;
  onBuy: (product: Product) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ product, isActive, onBuy }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    } else if (!isActive && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div className="relative w-full h-full snap-start shrink-0 overflow-hidden bg-black">
      {/* Video Player */}
      <video
        ref={videoRef}
        src={product.video_url}
        className="w-full h-full object-cover"
        loop
        muted={true} // Start muted to satisfy browser policies
        playsInline
        onClick={togglePlay}
        poster={product.cover_url}
      />

      {/* Overlay UI */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/60">
        
        {/* Top Navbar Simulation */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center text-white/80 z-20">
            <span className="font-bold">Seguindo</span>
            <span className="font-bold text-white border-b-2 border-white pb-1">Para Você</span>
            <span className="font-bold">Live</span>
        </div>

        {/* Right Sidebar Interactions */}
        <div className="absolute right-2 bottom-20 flex flex-col gap-6 items-center pointer-events-auto z-20">
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full bg-white p-0.5 mb-1 overflow-hidden border-2 border-brand">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${product.id}`} alt="avatar" className="w-full h-full" />
            </div>
            <div className="-mt-4 bg-brand rounded-full p-0.5">
                <div className="w-4 h-4 text-white text-[10px] flex items-center justify-center font-bold">+</div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Heart size={32} className="text-white drop-shadow-md" />
            <span className="text-xs font-semibold">12.4K</span>
          </div>
          
          <div className="flex flex-col items-center gap-1">
            <MessageCircle size={32} className="text-white drop-shadow-md" />
            <span className="text-xs font-semibold">432</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Share2 size={32} className="text-white drop-shadow-md" />
            <span className="text-xs font-semibold">Share</span>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-4 left-4 right-16 flex flex-col gap-3 pointer-events-auto z-20">
            <div>
                <h3 className="text-white font-bold text-lg shadow-black drop-shadow-md">@{product.sku.toLowerCase()}</h3>
                <p className="text-white/90 text-sm leading-tight line-clamp-2 drop-shadow-md">
                    {product.description} #promocao #viral #fyp
                </p>
                <div className="flex items-center gap-2 mt-2 text-white/80">
                    <Music2 size={14} className="animate-spin-slow" />
                    <span className="text-xs">Som original - Marketplace Ágil</span>
                </div>
            </div>

            {/* Shop Link / Buy Button */}
            <div className="w-full bg-black/40 backdrop-blur-sm rounded-lg p-3 border border-white/10 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-xs text-brand font-bold">OFERTA RELÂMPAGO</span>
                    <span className="text-white font-bold">R$ {(product.price_cents / 100).toFixed(2).replace('.', ',')}</span>
                </div>
                <button 
                    onClick={() => onBuy(product)}
                    className="bg-brand hover:bg-brand-dark text-white px-6 py-2 rounded-full font-bold text-sm transition-transform active:scale-95 flex items-center gap-2"
                >
                    <ShoppingBag size={16} />
                    Comprar
                </button>
            </div>
        </div>

        {/* Unmute Hint */}
        {isMuted && isActive && (
            <button 
                onClick={toggleMute}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded-full pointer-events-auto backdrop-blur text-sm font-semibold"
            >
                Toque para ouvir
            </button>
        )}
      </div>
    </div>
  );
};