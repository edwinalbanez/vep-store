import { useSyncExternalStore } from 'react';

const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

const prefersDark = () => darkQuery.matches;

const applyTheme = (appearance) => {
  const isDark =
    appearance === 'dark' || (appearance === 'system' && prefersDark());

  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
};

const handleSystemThemeChange = () => {
  const currentAppearance = localStorage.getItem('appearance');
  applyTheme(currentAppearance || 'system');
};

export function initializeTheme() {
  const savedAppearance =
    (localStorage.getItem('appearance')) || 'system';

  applyTheme(savedAppearance);

  // Add the event listener for system theme changes...
  darkQuery.addEventListener('change', handleSystemThemeChange);
}

function mediaQueryListener(callback) {
  darkQuery.addEventListener('change', callback);

  return () => {
    darkQuery.removeEventListener('change', callback);
  };
}

export function useAppearance() {
  return useSyncExternalStore(mediaQueryListener, prefersDark);
}




