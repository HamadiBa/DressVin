export type Language = 'fr' | 'en' | 'es' | 'it';

export interface VintedUser {
  id: string;
  username: string;
  avatar?: string;
  isAuthenticated: boolean;
}

export interface ProductFormData {
  name: string;
  size: string;
  color: string;
  brand: string;
  condition: 'new' | 'good' | 'worn';
  category: string;
  style: string;
  material?: string;
  price: number;
  keywords?: string[];
}

export interface Category {
  id: string;
  name: {
    fr: string;
    en: string;
  };
  subcategories: {
    id: string;
    name: {
      fr: string;
      en: string;
    };
  }[];
}

export interface SEOSuggestion {
  keyword: string;
  score: number;
  reason: {
    fr: string;
    en: string;
  };
}

export interface GeneratedDescription {
  description: string;
  tags: string[];
  seoScore: number;
  suggestions: SEOSuggestion[];
}