import React, { createContext, useContext, useEffect, useState } from 'react';
import { getItem, setItem } from '../utils/storage';

export type BrandColor = 'green' | 'orange' | 'purple' | 'blue' | 'red';
export type ViewportMode = 'mobile' | 'fullscreen';
export type CurrencyType = 'USD' | 'BRL';

interface WhitelabelConfig {
  appName: string;
  tagline: string;
  primaryColor: BrandColor;
  currency: CurrencyType;
  deliveryFee: number;
  freeDeliveryThreshold: number;
}

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  viewportMode: ViewportMode;
  setViewportMode: (mode: ViewportMode) => void;
  brandColor: BrandColor;
  setBrandColor: (color: BrandColor) => void;
  config: WhitelabelConfig;
  updateConfig: (newConfig: Partial<WhitelabelConfig>) => void;
}

const DEFAULT_CONFIG: WhitelabelConfig = {
  appName: 'Brago Distribuidora',
  tagline: 'Seu parceiro estratégico em embalagens, panificação e limpeza',
  primaryColor: 'blue',
  currency: 'BRL',
  deliveryFee: 15.00,
  freeDeliveryThreshold: 200.00,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => getItem('theme_dark_mode', false));
  const [viewportMode, setViewportModeState] = useState<ViewportMode>(() => getItem('viewport_mode', 'mobile'));
  const [config, setConfigState] = useState<WhitelabelConfig>(() => {
    const saved = getItem<WhitelabelConfig | null>('whitelabel_config', null);
    if (!saved || saved.appName === 'Delisas Agency') {
      return DEFAULT_CONFIG;
    }
    return saved;
  });

  useEffect(() => {
    setItem('theme_dark_mode', isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  useEffect(() => {
    document.documentElement.setAttribute('data-brand', config.primaryColor);
  }, [config.primaryColor]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const setViewportMode = (mode: ViewportMode) => {
    setViewportModeState(mode);
    setItem('viewport_mode', mode);
  };

  const setBrandColor = (color: BrandColor) => {
    const updated = { ...config, primaryColor: color };
    setConfigState(updated);
    setItem('whitelabel_config', updated);
  };

  const updateConfig = (newConfig: Partial<WhitelabelConfig>) => {
    setConfigState(prev => {
      const updated = { ...prev, ...newConfig };
      setItem('whitelabel_config', updated);
      return updated;
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        viewportMode,
        setViewportMode,
        brandColor: config.primaryColor,
        setBrandColor,
        config,
        updateConfig
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
