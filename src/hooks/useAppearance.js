import { useSyncExternalStore } from 'react';

const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

const prefersDark = (appearance) => {
  return appearance === 'dark' || (appearance === 'system' && darkQuery?.matches);
}

function applyTheme(appearance) {
  const isDark = prefersDark(appearance);

  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  window.localStorage.setItem('appearance', isDark ? "dark" : "light")
}

function getSnapshot() {
  return localStorage.getItem('appearance') || 'system';
}

const handleSystemThemeChange = () => {
  const currentAppearance = localStorage.getItem('appearance');
  applyTheme(currentAppearance || 'system');
};

function initializeTheme() {
  const savedTheme = getSnapshot();
  applyTheme(savedTheme);
  darkQuery?.addEventListener('change', handleSystemThemeChange)
}

function subscribe(callback) {
  darkQuery?.addEventListener('change', callback);
  window.addEventListener('storage', callback);
  
  return () => {
    darkQuery?.removeEventListener('change', callback);
    window.removeEventListener('storage', callback);
  };
}

function useAppearance() {
  const appearance = useSyncExternalStore(
    subscribe,
    getSnapshot
  );

  const updateAppearance = (newTheme) => {
    applyTheme(newTheme);
    window.dispatchEvent(new Event('storage'));
  };

  return [appearance, updateAppearance];
}

export { initializeTheme, useAppearance }
