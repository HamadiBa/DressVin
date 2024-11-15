import React from 'react';
import type { ProductFormData, Language } from '../types';
import { translations } from '../utils/translations';
import { categories } from '../data/categories';

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  isLoading: boolean;
  language: Language;
}

export function ProductForm({ onSubmit, isLoading, language }: ProductFormProps) {
  const t = translations[language];
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [selectedSubcategory, setSelectedSubcategory] = React.useState('');

  const currentCategory = categories.find(c => c.id === selectedCategory);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: ProductFormData = {
      name: formData.get('name') as string,
      size: formData.get('size') as string,
      color: formData.get('color') as string,
      brand: formData.get('brand') as string,
      condition: formData.get('condition') as 'new' | 'good' | 'worn',
      category: selectedSubcategory,
      style: formData.get('style') as string,
      material: formData.get('material') as string,
      price: Number(formData.get('price')),
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            {t.productName} *
          </label>
          <input
            required
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            {t.category} *
          </label>
          <select
            required
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSubcategory('');
            }}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-green-500"
          >
            <option value="">{language === 'fr' ? 'Sélectionner une catégorie' : 'Select a category'}</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name[language]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">
            {language === 'fr' ? 'Sous-catégorie' : 'Subcategory'} *
          </label>
          <select
            required
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-green-500"
            disabled={!selectedCategory}
          >
            <option value="">{language === 'fr' ? 'Sélectionner une sous-catégorie' : 'Select a subcategory'}</option>
            {currentCategory?.subcategories.map(sub => (
              <option key={sub.id} value={sub.id}>
                {sub.name[language]}
              </option>
            ))}
          </select>
        </div>

        {/* Rest of the form fields remain the same */}
        <div>
          <label htmlFor="style" className="block text-sm font-medium text-gray-700">
            {t.style} *
          </label>
          <select
            required
            id="style"
            name="style"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-green-500"
          >
            <option value="casual">{language === 'fr' ? 'Décontracté' : 'Casual'}</option>
            <option value="formal">{language === 'fr' ? 'Habillé' : 'Formal'}</option>
            <option value="streetwear">Streetwear</option>
            <option value="vintage">Vintage</option>
            <option value="bohemian">{language === 'fr' ? 'Bohème' : 'Bohemian'}</option>
            <option value="sporty">{language === 'fr' ? 'Sportif' : 'Sporty'}</option>
          </select>
        </div>

        <div>
          <label htmlFor="size" className="block text-sm font-medium text-gray-700">
            {t.size} *
          </label>
          <input
            required
            type="text"
            id="size"
            name="size"
            placeholder={language === 'fr' ? 'ex: S, M, L, 38, 40' : 'e.g., S, M, L, 38, 40'}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="color" className="block text-sm font-medium text-gray-700">
            {t.color} *
          </label>
          <input
            required
            type="text"
            id="color"
            name="color"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
            {t.brand}
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="material" className="block text-sm font-medium text-gray-700">
            {t.material}
          </label>
          <input
            type="text"
            id="material"
            name="material"
            placeholder={language === 'fr' ? 'ex: Coton, Soie, Cuir' : 'e.g., Cotton, Silk, Leather'}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            {t.price} *
          </label>
          <input
            required
            type="number"
            id="price"
            name="price"
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
            {t.condition} *
          </label>
          <select
            required
            id="condition"
            name="condition"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-green-500"
          >
            <option value="new">{language === 'fr' ? 'Neuf avec étiquettes' : 'New with tags'}</option>
            <option value="good">{language === 'fr' ? 'Très bon état' : 'Very good condition'}</option>
            <option value="worn">{language === 'fr' ? 'Bon état' : 'Good condition'}</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-3 px-4 rounded-md border border-transparent font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? t.generating : t.generate}
      </button>
    </form>
  );
}