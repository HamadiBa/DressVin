import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  onToggle: () => void;
}

export function ThemeToggle({ onToggle }: ThemeToggleProps) {
  const [isDark, setIsDark] = React.useState(false);

  const handleToggle = () => {
    setIsDark(!isDark);
    onToggle();
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-md text-gray-500 hover:text-gray-600"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}