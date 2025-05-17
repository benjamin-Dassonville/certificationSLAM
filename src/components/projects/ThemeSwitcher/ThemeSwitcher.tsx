import { useState, useEffect } from 'react';
import './ThemeSwitcher.css';

interface Theme {
  name: string;
  background: string;
  text: string;
  primary: string;
}

const themes: Theme[] = [
  {
    name: 'Clair',
    background: '#ffffff',
    text: '#333333',
    primary: '#0d6efd'
  },
  {
    name: 'Sombre',
    background: '#1a1a1a',
    text: '#ffffff',
    primary: '#66b3ff'
  },
  {
    name: 'Sépia',
    background: '#f4ecd8',
    text: '#5c4b37',
    primary: '#8b4513'
  }
];

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme-switcher');
    return saved ? JSON.parse(saved) : themes[0];
  });

  useEffect(() => {
    // Sauvegarder le thème actuel dans un stockage local différent
    localStorage.setItem('theme-switcher', JSON.stringify(currentTheme));
  }, [currentTheme]);

  return (
    <div 
      className="theme-switcher-container"
      style={{
        backgroundColor: currentTheme.background,
        color: currentTheme.text
      }}
    >
      <h3 className="mb-4">Sélectionnez votre thème</h3>
      
      <div className="themes-grid">
        {themes.map((theme) => (
          <div
            key={theme.name}
            className={`theme-card ${currentTheme.name === theme.name ? 'active' : ''}`}
            onClick={() => setCurrentTheme(theme)}
            style={{
              backgroundColor: theme.background,
              color: theme.text,
              borderColor: theme.primary
            }}
          >
            <div className="theme-preview">
              <div className="preview-header" style={{ backgroundColor: theme.primary }}></div>
              <div className="preview-content">
                <div className="preview-line"></div>
                <div className="preview-line"></div>
              </div>
            </div>
            <div className="theme-name">{theme.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ThemeSwitcher;