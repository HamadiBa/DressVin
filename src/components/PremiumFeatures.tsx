import React from 'react';
import { Check, Star, Lock } from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../utils/translations';

interface PremiumFeaturesProps {
  language: Language;
  onPlanSelect: (plan: 'free' | 'premium') => void;
}

export function PremiumFeatures({ language, onPlanSelect }: PremiumFeaturesProps) {
  const t = translations[language];
  const [isLoading, setIsLoading] = React.useState(false);

  const handlePlanSelection = async (plan: 'free' | 'premium') => {
    if (plan === 'free') {
      onPlanSelect('free');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan: 'premium' }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Payment error:', error);
      alert(t.premium.error);
    } finally {
      setIsLoading(false);
    }
  };

  const PLANS = [
    {
      name: t.premium.freePlan,
      price: 0,
      features: [
        {
          text: 'Génération de descriptions basiques',
          available: true
        },
        {
          text: 'Analyse SEO limitée',
          available: true
        },
        {
          text: 'Suggestions de prix de base',
          available: true
        },
        {
          text: '5 mots-clés par article',
          available: true
        },
        {
          text: 'Analyse des tendances',
          available: false
        },
        {
          text: 'Support prioritaire',
          available: false
        }
      ]
    },
    {
      name: t.premium.premiumPlan + ' ⭐',
      price: 9.99,
      features: [
        {
          text: 'Descriptions optimisées illimitées',
          available: true
        },
        {
          text: 'Analyse SEO avancée',
          available: true
        },
        {
          text: 'Analyse des tendances en temps réel',
          available: true
        },
        {
          text: 'Mots-clés illimités',
          available: true
        },
        {
          text: 'Suggestions de prix optimales',
          available: true
        },
        {
          text: 'Support prioritaire',
          available: true
        },
        {
          text: 'Statistiques détaillées',
          available: true
        },
        {
          text: 'Connexion avec Vinted',
          available: true
        }
      ]
    }
  ];

  return (
    <div className="py-12 px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">✨ {t.premium.title}</h2>
        <p className="mt-4 text-gray-600">
          {t.premium.subtitle}
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
          >
            <div className="p-6">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}€</span>
                <span className="text-gray-500">/mois</span>
              </div>

              <ul className="mt-6 space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    {feature.available ? (
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    ) : (
                      <Lock className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                    )}
                    <span className={feature.available ? '' : 'text-gray-400'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlanSelection(plan.price === 0 ? 'free' : 'premium')}
                disabled={isLoading}
                className={`mt-8 w-full py-3 px-6 rounded-md font-medium transition-colors duration-200 ${
                  plan.price > 0
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? '...' : plan.price > 0 ? t.premium.startPremium : t.premium.startFree}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}