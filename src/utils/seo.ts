import type { ProductFormData, SEOSuggestion, Language } from '../types';
import { categories } from '../data/categories';

const TRENDING_KEYWORDS = {
  fr: ['vintage', 'oversize', 'tendance', 'streetwear', 'bohème', 'minimaliste'],
  en: ['vintage', 'oversize', 'trendy', 'streetwear', 'boho', 'minimalist']
};

const SEASONAL_KEYWORDS = {
  fr: ['printemps', 'été', 'automne', 'hiver'],
  en: ['spring', 'summer', 'autumn', 'winter']
};

export function generateSEOSuggestions(data: ProductFormData, language: Language): SEOSuggestion[] {
  const suggestions: SEOSuggestion[] = [];

  // Category-specific keywords
  const category = categories.find(c => 
    c.subcategories.some(sub => sub.id === data.category)
  );
  
  if (category) {
    suggestions.push({
      keyword: category.name[language],
      score: 85,
      reason: {
        fr: 'Mot-clé principal de catégorie',
        en: 'Main category keyword'
      }
    });
  }

  // Brand-related suggestion
  if (data.brand) {
    suggestions.push({
      keyword: data.brand.toLowerCase(),
      score: 90,
      reason: {
        fr: 'La marque est un critère de recherche important',
        en: 'Brand is a key search criterion'
      }
    });
  }

  // Style-related suggestions
  if (data.style) {
    const styleKeywords = {
      casual: {
        fr: ['décontracté', 'casual', 'confortable'],
        en: ['casual', 'comfortable', 'relaxed']
      },
      formal: {
        fr: ['élégant', 'chic', 'habillé'],
        en: ['elegant', 'chic', 'formal']
      },
      streetwear: {
        fr: ['urbain', 'street', 'moderne'],
        en: ['urban', 'street', 'modern']
      }
    };

    const keywords = styleKeywords[data.style as keyof typeof styleKeywords]?.[language] || [];
    keywords.forEach(keyword => {
      suggestions.push({
        keyword,
        score: 75,
        reason: {
          fr: 'Mot-clé de style pertinent',
          en: 'Relevant style keyword'
        }
      });
    });
  }

  // Trending keywords
  TRENDING_KEYWORDS[language].forEach(keyword => {
    suggestions.push({
      keyword,
      score: 80,
      reason: {
        fr: 'Mot-clé tendance',
        en: 'Trending keyword'
      }
    });
  });

  // Seasonal keywords
  const currentMonth = new Date().getMonth();
  const season = Math.floor(currentMonth / 3) % 4;
  suggestions.push({
    keyword: SEASONAL_KEYWORDS[language][season],
    score: 70,
    reason: {
      fr: 'Mot-clé saisonnier',
      en: 'Seasonal keyword'
    }
  });

  return suggestions.sort((a, b) => b.score - a.score);
}