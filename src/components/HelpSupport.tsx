import React from 'react';
import { Settings, HelpCircle, Mail, MessageCircle, Shield, Trash2, ChevronDown, ChevronUp, Send } from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../utils/translations';

interface HelpSupportProps {
  language: Language;
}

export function HelpSupport({ language }: HelpSupportProps) {
  const t = translations[language];
  const [activeQuestion, setActiveQuestion] = React.useState<number | null>(null);
  const [contactForm, setContactForm] = React.useState({
    name: '',
    email: '',
    message: ''
  });
  const [showNotification, setShowNotification] = React.useState(false);

  const FAQ = [
    {
      question: language === 'fr' ? "Comment générer une description optimisée ?" : "How to generate an optimized description?",
      answer: language === 'fr' 
        ? "Remplissez simplement le formulaire avec les détails de votre article. Notre algorithme générera automatiquement une description optimisée pour Vinted."
        : "Simply fill out the form with your item details. Our algorithm will automatically generate an optimized description for Vinted."
    },
    {
      question: language === 'fr' ? "Comment fonctionne l'analyse des tendances ?" : "How does trend analysis work?",
      answer: language === 'fr'
        ? "Notre système analyse en temps réel les articles les plus populaires sur Vinted pour vous donner des insights sur les prix."
        : "Our system analyzes the most popular items on Vinted in real-time to give you insights on prices."
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowNotification(true);
    setContactForm({ name: '', email: '', message: '' });
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-8">⚙️ {t.helpSupport}</h2>

      <div className="space-y-6">
        <section className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            FAQ
          </h3>
          <div className="space-y-4">
            {FAQ.map((item, index) => (
              <div key={index} className="border-b last:border-b-0">
                <button
                  className="w-full flex items-center justify-between p-4 text-left"
                  onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
                >
                  <span className="font-medium">{item.question}</span>
                  {activeQuestion === index ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                {activeQuestion === index && (
                  <p className="p-4 pt-0 text-gray-600">
                    {item.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Mail className="h-5 w-5 mr-2" />
            {language === 'fr' ? 'Contacter le support' : 'Contact Support'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">{language === 'fr' ? 'Nom' : 'Name'}</label>
              <input
                type="text"
                required
                value={contactForm.name}
                onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                required
                value={contactForm.email}
                onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{language === 'fr' ? 'Message' : 'Message'}</label>
              <textarea
                required
                value={contactForm.message}
                onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                className="w-full p-2 border rounded-md h-32"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 flex items-center justify-center"
            >
              <Send className="h-4 w-4 mr-2" />
              {language === 'fr' ? 'Envoyer' : 'Send'}
            </button>
          </form>
        </section>

        {showNotification && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-md shadow-lg">
            {language === 'fr' ? 'Message envoyé avec succès !' : 'Message sent successfully!'}
          </div>
        )}
      </div>
    </div>
  );
}