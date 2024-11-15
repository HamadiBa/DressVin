import React from 'react';
import { Activity } from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../utils/translations';

interface DashboardProps {
  seoScore: number;
  language: Language;
}

export function Dashboard({ seoScore, language }: DashboardProps) {
  const t = translations[language];

  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6">
        <dt>
          <div className="absolute rounded-md p-3 bg-purple-100 text-purple-500">
            <Activity className="h-6 w-6" aria-hidden="true" />
          </div>
          <p className="ml-16 truncate text-sm font-medium text-gray-500">
            {t.seoScore}
          </p>
        </dt>
        <dd className="ml-16 flex items-baseline">
          <p className="text-2xl font-semibold text-gray-900">{seoScore}%</p>
        </dd>
      </div>
    </div>
  );
}