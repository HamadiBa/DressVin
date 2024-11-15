import React from 'react';
import { Leaf } from 'lucide-react';
import { ProductForm } from './components/ProductForm';
import { Description } from './components/Description';
import { LanguageSelector } from './components/LanguageSelector';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { HelpSupport } from './components/HelpSupport';
import { MarketTrends } from './components/MarketTrends';
import { PremiumFeatures } from './components/PremiumFeatures';
import { generateDescription } from './utils/generateDescription';
import { translations } from './utils/translations';
import type { ProductFormData, Language } from './types';

export default function App() {
  const [description, setDescription] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [language, setLanguage] = React.useState<Language>('fr');
  const [keywords, setKeywords] = React.useState<string[]>([]);
  const [seoScore, setSeoScore] = React.useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState<'home' | 'market' | 'premium' | 'help'>('home');
  const [isPremium, setIsPremium] = React.useState(false);

  const t = translations[language];

  const handleSubmit = async (data: ProductFormData) => {
    setIsLoading(true);
    try {
      const result = generateDescription(data, language, keywords);
      setDescription(result.description);
      setSeoScore(result.seoScore || 0);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlanSelect = (plan: 'free' | 'premium') => {
    setIsPremium(plan === 'premium');
    setCurrentPage('home');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'market':
        return <MarketTrends language={language} />;
      case 'premium':
        return <PremiumFeatures language={language} onPlanSelect={handlePlanSelect} />;
      case 'help':
        return <HelpSupport language={language} />;
      default:
        return (
          <>
            <Dashboard seoScore={seoScore} language={language} />
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <ProductForm onSubmit={handleSubmit} isLoading={isLoading} language={language} />
                </div>
              </div>
              <div className="space-y-4">
                {description && (
                  <Description description={description} language={language} />
                )}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        language={language}
        onLanguageChange={setLanguage}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />

      <div className={`transition-all duration-300 ${isSidebarOpen ? 'lg:pl-64' : 'lg:pl-0'}`}>
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-600 focus:outline-none"
                aria-label={t.toggleSidebar}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Leaf className="h-8 w-8 text-green-600 ml-3" />
              <div className="ml-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  {t.appName}
                </h1>
                <p className="text-sm text-gray-500">{t.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector language={language} onChange={setLanguage} />
            </div>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
}