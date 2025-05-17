
import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage.js';

const SettingsContext = createContext();

const initialSettings = {
  siteName: 'MovieStream',
  siteDescription: 'Tu destino para películas y series.',
  logoUrl: 'https://images.unsplash.com/photo-1569587889770-9134d27b292e', // Default logo
  faviconUrl: '/favicon.svg',
  tmdbApiKey: '',
  moviesPerPage: 12,
  adsContent: {
    detailsPageTop: '',
    detailsPageBottom: '',
  }
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useLocalStorage('siteSettings', initialSettings);

  const updateSettings = (newSettings) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings,
      adsContent: { // Ensure adsContent is merged correctly
        ...prevSettings.adsContent,
        ...(newSettings.adsContent || {}),
      }
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
