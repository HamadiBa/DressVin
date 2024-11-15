import type { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'tops',
    name: {
      fr: 'Hauts',
      en: 'Tops'
    },
    subcategories: [
      {
        id: 'sweaters',
        name: {
          fr: 'Pulls & Sweats',
          en: 'Sweaters & Sweatshirts'
        }
      },
      {
        id: 't-shirts',
        name: {
          fr: 'T-shirts',
          en: 'T-shirts'
        }
      },
      {
        id: 'blouses',
        name: {
          fr: 'Chemises & Blouses',
          en: 'Shirts & Blouses'
        }
      },
      {
        id: 'tanks',
        name: {
          fr: 'Débardeurs',
          en: 'Tank Tops'
        }
      },
      {
        id: 'crop-tops',
        name: {
          fr: 'Crop tops',
          en: 'Crop tops'
        }
      }
    ]
  },
  {
    id: 'bottoms',
    name: {
      fr: 'Bas',
      en: 'Bottoms'
    },
    subcategories: [
      {
        id: 'jeans',
        name: {
          fr: 'Jeans',
          en: 'Jeans'
        }
      },
      {
        id: 'pants',
        name: {
          fr: 'Pantalons',
          en: 'Pants'
        }
      },
      {
        id: 'shorts',
        name: {
          fr: 'Shorts',
          en: 'Shorts'
        }
      },
      {
        id: 'skirts',
        name: {
          fr: 'Jupes',
          en: 'Skirts'
        }
      },
      {
        id: 'leggings',
        name: {
          fr: 'Leggings',
          en: 'Leggings'
        }
      }
    ]
  },
  {
    id: 'dresses',
    name: {
      fr: 'Robes',
      en: 'Dresses'
    },
    subcategories: [
      {
        id: 'casual-dresses',
        name: {
          fr: 'Robes décontractées',
          en: 'Casual dresses'
        }
      },
      {
        id: 'evening-dresses',
        name: {
          fr: 'Robes de soirée',
          en: 'Evening dresses'
        }
      },
      {
        id: 'summer-dresses',
        name: {
          fr: 'Robes d\'été',
          en: 'Summer dresses'
        }
      }
    ]
  },
  {
    id: 'outerwear',
    name: {
      fr: 'Vestes & Manteaux',
      en: 'Outerwear'
    },
    subcategories: [
      {
        id: 'jackets',
        name: {
          fr: 'Vestes',
          en: 'Jackets'
        }
      },
      {
        id: 'coats',
        name: {
          fr: 'Manteaux',
          en: 'Coats'
        }
      },
      {
        id: 'blazers',
        name: {
          fr: 'Blazers',
          en: 'Blazers'
        }
      }
    ]
  },
  {
    id: 'accessories',
    name: {
      fr: 'Accessoires',
      en: 'Accessories'
    },
    subcategories: [
      {
        id: 'bags',
        name: {
          fr: 'Sacs',
          en: 'Bags'
        }
      },
      {
        id: 'jewelry',
        name: {
          fr: 'Bijoux',
          en: 'Jewelry'
        }
      },
      {
        id: 'scarves',
        name: {
          fr: 'Écharpes & Foulards',
          en: 'Scarves'
        }
      },
      {
        id: 'belts',
        name: {
          fr: 'Ceintures',
          en: 'Belts'
        }
      }
    ]
  }
];