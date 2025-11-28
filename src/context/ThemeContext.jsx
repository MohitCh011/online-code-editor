import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Editor theme (Monaco)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('editorTheme') || 'vs-dark';
  });

  // App color mode (dark/light)
  const [appTheme, setAppTheme] = useState(() => {
    return localStorage.getItem('appColorMode') || 'dark';
  });

  // NEW: UI Theme (modern/classic)
  const [uiTheme, setUiTheme] = useState(() => {
    return localStorage.getItem('uiTheme') || 'modern';
  });

  // Apply color mode
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', appTheme);
    localStorage.setItem('appColorMode', appTheme);
  }, [appTheme]);

  // Apply editor theme
  useEffect(() => {
    localStorage.setItem('editorTheme', theme);
  }, [theme]);

  // Apply UI theme
  useEffect(() => {
    document.documentElement.setAttribute('data-ui-theme', uiTheme);
    localStorage.setItem('uiTheme', uiTheme);
  }, [uiTheme]);

  const toggleAppTheme = () => {
    setAppTheme(prev => prev === 'dark' ? 'light' : 'dark');
    setTheme(prev => prev === 'vs-dark' ? 'light' : 'vs-dark');
  };

  const toggleUiTheme = () => {
    setUiTheme(prev => prev === 'modern' ? 'classic' : 'modern');
  };

  const value = {
    theme,
    setTheme,
    appTheme,
    setAppTheme,
    toggleAppTheme,
    uiTheme,
    setUiTheme,
    toggleUiTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
