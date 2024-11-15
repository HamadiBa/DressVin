import React from 'react';
import { Heart, Eye, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../utils/translations';

interface TrendingItem {
  id: string;
  image: string;
  title: string;
  price: number;
  views: number;
  likes: number;
  brand: string;
  category: string;
}

const TRENDING_ITEMS: TrendingItem[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop',
    title: 'Robe d\'été fleurie',
    price: 45,
    views: 1200,
    likes: 89,
    brand: 'Zara',
    category: 'dresses'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=400&fit=crop',
    title: 'Blazer oversize',
    price: 65,
    views: 980,
    likes: 76,
    brand: 'Mango',
    category: 'outerwear'
  },
  // Add more items...
];

interface MarketTrendsProps {
  language: Language;
}

export function MarketTrends({ language }: MarketTrendsProps) {
  const t = translations[language];
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [sortBy, setSortBy] = React.useState<'views' | 'likes'>('views');
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 200]);
  const carouselRef = React.useRef<HTMLDivElement>(null);

  const filteredItems = TRENDING_ITEMS.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
    return matchesCategory && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'views') return b.views - a.views;
    return b.likes - a.likes;
  });

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: index * carouselRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  const nextSlide = () => {
    if (currentIndex < filteredItems.length - 1) {
      setCurrentIndex(prev => prev + 1);
      scrollToIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      scrollToIndex(currentIndex - 1);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🔥 {t.marketTrends}</h2>
        <button
          className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50"
          onClick={() => document.getElementById('filters-modal')?.showModal()}
        >
          <Filter className="h-5 w-5 mr-2" />
          {t.filters.title}
        </button>
      </div>

      {/* Filters Modal */}
      <dialog id="filters-modal" className="modal p-6 rounded-lg shadow-xl bg-white dark:bg-gray-800">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">{t.filters.title}</h3>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              {t.category}
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              {Object.entries(t.categories).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.filters.sortBy}
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'views' | 'likes')}
              className="w-full p-2 border rounded-md"
            >
              <option value="views">{t.filters.mostViewed}</option>
              <option value="likes">{t.filters.mostLiked}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.filters.priceRange}
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="200"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="200"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full"
              />
            </div>
            <div className="flex justify-between mt-2">
              <span>{priceRange[0]}€</span>
              <span>{priceRange[1]}€</span>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => document.getElementById('filters-modal')?.close()}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Fermer
            </button>
          </div>
        </div>
      </dialog>
      
      {/* Carousel */}
      <div className="relative">
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg"
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <div
          ref={carouselRef}
          className="flex overflow-x-hidden snap-x snap-mandatory"
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="min-w-full snap-center px-4"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.brand}</p>
                  <p className="text-lg font-bold mt-2 dark:text-white">{item.price}€</p>
                  <div className="flex justify-between mt-3 text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {item.views}
                    </span>
                    <span className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      {item.likes}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg"
          disabled={currentIndex === filteredItems.length - 1}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}