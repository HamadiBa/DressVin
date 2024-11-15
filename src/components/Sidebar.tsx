import React from 'react';
import { 
  Menu, 
  X, 
  Settings, 
  Globe, 
  Home,
  HelpCircle
} from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../utils/translations';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  currentPage: 'home' | 'help';
  onNavigate: (page: 'home' | 'help') => void;
}

export function Sidebar({
  isOpen,
  onClose,
  language,
  onLanguageChange,
  currentPage,
  onNavigate,
}: SidebarProps) {
  const t = translations[language];

  const navigation = [
    { name: 'Dashboard', icon: Home, page: 'home' as const },
    { name: 'Help & Support', icon: HelpCircle, page: 'help' as const },
  ];

  const handleNavigation = (page: 'home' | 'help') => {
    onNavigate(page);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100 z-30' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white transform transition-transform lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="px-4 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                Menu
              </h2>
              <button
                onClick={onClose}
                className="lg:hidden -mr-2 p-2 rounded-md text-gray-500 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.page)}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  currentPage === item.page
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-gray-500" />
                <span className="ml-3 text-sm font-medium text-gray-700">
                  Language
                </span>
              </div>
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="block w-24 py-1 px-2 text-sm border-gray-300 rounded-md"
              >
                <option value="fr">🇫🇷 Français</option>
                <option value="en">🇬🇧 English</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}