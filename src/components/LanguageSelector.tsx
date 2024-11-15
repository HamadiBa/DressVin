import React from 'react';
import { Globe } from 'lucide-react';
import type { Language } from '../types';

interface LanguageSelectorProps {
  language: Language;
  onChange: (lang: Language) => void;
}

export function LanguageSelector({ language, onChange }: LanguageSelectorProps) {
  const languages = {
    fr: { name: 'Français', flag: '🇫🇷' },
    en: { name: 'English', flag: '🇬🇧' },
    es: { name: 'Español', flag: '🇪🇸' },
    it: { name: 'Italiano', flag: '🇮🇹' }
  };

  return (
    <div className="relative inline-block">
      <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200">
        <Globe className="h-4 w-4 ml-3 text-gray-500" />
        <select
          value={language}
          onChange={(e) => onChange(e.target.value as Language)}
          className="appearance-none bg-transparent border-none py-2 pl-2 pr-8 focus:ring-0 text-sm"
        >
          {Object.entries(languages).map(([code, { name, flag }]) => (
            <option key={code} value={code}>
              {flag} {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}