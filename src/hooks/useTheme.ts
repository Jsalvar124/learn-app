import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : '';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return { isDark, toggleTheme: () => setIsDark(prev => !prev) };
};
