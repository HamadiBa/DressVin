import type { ProductFormData, Language, TrendAnalysis } from '../types';

const calculateSEOScore = (
  data: ProductFormData,
  keywords: string[],
  trends?: TrendAnalysis
): number => {
  let score = 0;

  // Basic information completeness (30%)
  if (data.name) score += 6;
  if (data.brand) score += 6;
  if (data.material) score += 6;
  if (data.image) score += 6;
  if (keywords.length >= 3) score += 6;

  // Keyword optimization (30%)
  const keywordScore = Math.min(keywords.length * 5, 30);
  score += keywordScore;

  // Trend alignment (40%)
  if (trends) {
    // Brand popularity impact (15%)
    score += trends.brandPopularity * 15;

    // Category demand impact (15%)
    score += trends.categoryDemand * 15;

    // Price optimization (10%)
    const { min, max, optimal } = trends.priceRange;
    const priceScore = 10 - Math.abs(data.price - optimal) / (max - min) * 10;
    score += Math.max(0, priceScore);
  }

  return Math.min(Math.round(score), 100);
};

export function generateDescription(
  data: ProductFormData,
  language: Language,
  keywords: string[]
): { description: string; tags: string[]; seoScore: number } {
  const conditionMap = {
    fr: {
      new: 'Neuf avec étiquettes',
      good: 'Très bon état',
      worn: 'Bon état',
    },
    en: {
      new: 'New with tags',
      good: 'Very good condition',
      worn: 'Good condition',
    },
  };

  const styleMap = {
    fr: {
      casual: 'décontracté',
      formal: 'habillé',
      streetwear: 'streetwear',
      vintage: 'vintage',
      bohemian: 'bohème',
      sporty: 'sportif',
    },
    en: {
      casual: 'casual',
      formal: 'formal',
      streetwear: 'streetwear',
      vintage: 'vintage',
      bohemian: 'bohemian',
      sporty: 'sporty',
    },
  };

  const tags = [
    data.brand.toLowerCase(),
    data.category.toLowerCase(),
    styleMap[language][data.style as keyof typeof styleMap.en],
    data.color.toLowerCase(),
    data.material?.toLowerCase(),
    ...keywords,
  ].filter(Boolean);

  const emoji = {
    condition: '💫',
    price: '💰',
    brand: '👕',
    size: '📏',
    color: '🎨',
    material: '🧵',
    style: '👗',
    shipping: '📫',
    contact: '💬',
  };

  let description = `${data.name}\n\n`;
  description += `${emoji.condition} ${language === 'fr' ? 'État' : 'Condition'}: ${
    conditionMap[language][data.condition]
  }\n`;
  description += `${emoji.price} ${
    language === 'fr' ? 'Prix' : 'Price'
  }: ${data.price}€\n\n`;

  if (data.brand) {
    description += `${emoji.brand} ${
      language === 'fr' ? 'Marque' : 'Brand'
    }: ${data.brand}\n`;
  }

  description += `${emoji.size} ${
    language === 'fr' ? 'Taille' : 'Size'
  }: ${data.size}\n`;
  description += `${emoji.color} ${
    language === 'fr' ? 'Couleur' : 'Color'
  }: ${data.color}\n`;

  if (data.material) {
    description += `${emoji.material} ${
      language === 'fr' ? 'Matière' : 'Material'
    }: ${data.material}\n`;
  }

  description += `${emoji.style} ${
    language === 'fr' ? 'Style' : 'Style'
  }: ${styleMap[language][data.style as keyof typeof styleMap.en]}\n\n`;

  // Condition-specific details
  if (data.condition === 'new') {
    description +=
      language === 'fr'
        ? '✨ Produit neuf avec étiquettes\n📦 Emballage d\'origine disponible\n'
        : '✨ Brand new with tags\n📦 Original packaging available\n';
  } else if (data.condition === 'good') {
    description +=
      language === 'fr'
        ? '✨ Article en excellent état\n🏷️ Rapport qualité-prix exceptionnel\n'
        : '✨ Item in excellent condition\n🏷️ Great value for money\n';
  } else {
    description +=
      language === 'fr'
        ? '💫 Pièce avec du caractère\n🌱 Choix mode éco-responsable\n'
        : '💫 Piece with character\n🌱 Eco-friendly fashion choice\n';
  }

  description +=
    language === 'fr'
      ? '\n📫 Expédition rapide\n💬 N\'hésitez pas à me contacter pour plus d\'informations !\n\n'
      : '\n📫 Fast shipping\n💬 Don\'t hesitate to contact me for more information!\n\n';

  // Add hashtags and keywords
  const allTags = [...new Set([...tags, ...keywords])];
  description += allTags.map((tag) => `#${tag.replace(/\s+/g, '')}`).join(' ');

  return {
    description,
    tags,
    seoScore: calculateSEOScore(data, keywords),
  };
}