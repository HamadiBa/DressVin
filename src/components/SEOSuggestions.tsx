import React from 'react';
import { Lightbulb, Plus } from 'lucide-react';
import type { SEOSuggestion, Language } from '../types';

interface SEOSuggestionsProps {
  suggestions: SEOSuggestion[];
  language: Language;
  onAddKeyword: (keyword: string) => void;
}

export function SEOSuggestions({ suggestions, language, onAddKeyword }: SEOSuggestionsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-4">
        <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">
          {language === 'fr' ? 'Suggestions de mots-clés' : 'Keyword Suggestions'}
        </h3>
      </div>
      
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900">{suggestion.keyword}</span>
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {suggestion.score}%
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {suggestion.reason[language]}
              </p>
            </div>
            <button
              onClick={() => onAddKeyword(suggestion.keyword)}
              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Plus className="h-4 w-4 mr-1" />
              {language === 'fr' ? 'Ajouter' : 'Add'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}