import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod_001',
    sku: 'LATTAFA-SAFEER',
    name: 'Perfume Árabe Lattafa Al Noble Safeer - 100ml Original',
    description: 'Fragrância luxuosa com notas amadeiradas e especiarias. Importado diretamente de Dubai. Alta fixação e projeção.',
    price_cents: 20691,
    original_price_cents: 39990,
    discount_percent: 48,
    rating: 4.9,
    reviews_count: 29,
    sold_count: 186,
    cover_url: 'https://m.media-amazon.com/images/I/71J185-y+IL._AC_SL1500_.jpg',
    images: [
      'https://m.media-amazon.com/images/I/71J185-y+IL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71+M+X0J7dL._AC_SL1500_.jpg'
    ],
    video_url: 'https://cdn.coverr.co/videos/coverr-spraying-perfume-5339/1080p.mp4',
    stock: 50,
    tags: ['Frete grátis', '25% OFF']
  },
  {
    id: 'prod_002',
    sku: 'PROJ-SCREEN',
    name: 'Tela de Projeção 80" a 150" – Experiência de Cinema em Casa',
    description: 'Material reflexivo de alta qualidade. Aumenta o brilho e contraste do seu projetor. Fácil instalação.',
    price_cents: 5669,
    original_price_cents: 8000,
    discount_percent: 10,
    rating: 4.3,
    reviews_count: 154,
    sold_count: 1007,
    cover_url: 'https://m.media-amazon.com/images/I/61M4J-a3bAL._AC_SL1000_.jpg',
    images: [
      'https://m.media-amazon.com/images/I/61M4J-a3bAL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/71pP5g0A+RL._AC_SL1500_.jpg'
    ],
    video_url: 'https://cdn.coverr.co/videos/coverr-watching-a-movie-at-home-4369/1080p.mp4',
    stock: 200,
    tags: ['10% OFF']
  },
  {
    id: 'prod_003',
    sku: 'KIT-MOCHILA',
    name: 'KIT MOCHILA ESCOLAR MENINA + Lancheira Térmica',
    description: 'Kit completo para volta às aulas. Material resistente e impermeável. Design ergonômico.',
    price_cents: 16191,
    original_price_cents: 17990,
    discount_percent: 10,
    rating: 4.8,
    reviews_count: 12,
    sold_count: 2,
    cover_url: 'https://m.media-amazon.com/images/I/71Y+w5vKxLL._AC_SL1200_.jpg',
    images: [
      'https://m.media-amazon.com/images/I/71Y+w5vKxLL._AC_SL1200_.jpg'
    ],
    stock: 15,
    tags: ['4x sem juros']
  },
  {
    id: 'prod_004',
    sku: 'LED-BAR',
    name: 'Barra de Luz LED Monitor - Proteção Ocular',
    description: 'Iluminação assimétrica para monitor. Sem reflexo na tela. Ajuste de temperatura de cor.',
    price_cents: 12990,
    original_price_cents: 19990,
    discount_percent: 35,
    rating: 4.7,
    reviews_count: 89,
    sold_count: 450,
    cover_url: 'https://m.media-amazon.com/images/I/61t+U5+M+8L._AC_SL1500_.jpg',
    images: ['https://m.media-amazon.com/images/I/61t+U5+M+8L._AC_SL1500_.jpg'],
    stock: 100,
    tags: ['Frete grátis']
  },
  {
    id: 'prod_005',
    sku: 'HOODIE-GREY',
    name: 'Moletom Canguru Unissex Cinza Oversized',
    description: 'Algodão premium 500g. Corte oversized moderno. Estampa gótica em relevo.',
    price_cents: 18990,
    original_price_cents: 22990,
    discount_percent: 17,
    rating: 4.5,
    reviews_count: 42,
    sold_count: 320,
    cover_url: 'https://m.media-amazon.com/images/I/61hQ6yTqVdL._AC_SL1027_.jpg',
    images: ['https://m.media-amazon.com/images/I/61hQ6yTqVdL._AC_SL1027_.jpg'],
    stock: 60,
    tags: []
  }
];

export const SHIPPING_FIXED_COST = 1490; // R$ 14,90