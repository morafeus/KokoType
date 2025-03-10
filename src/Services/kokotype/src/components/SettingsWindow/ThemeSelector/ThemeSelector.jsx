import React from 'react';
import styles from './ThemeSelector.module.css';  // Импортируем стили

// Цветовые схемы
const themes = {
  light: {
        '--main-color': '#f0f0f0',
        '--second-color': '#ffffff',
        '--main-font-color': '#FFD700',
        '--test-font-color': '#285956',
        '--test-type-font-color': '#c5c6c7',
        '--test-invalid-font-color': '#f76c6c',
        '--hover-color': '#00fae9',
      },
      dark: {
        '--main-color': '#12141b',
        '--second-color': '#1f2833',
        '--main-font-color': '#66fcf1',
        '--test-font-color': '#285956',
        '--test-type-font-color': '#c5c6c7',
        '--test-invalid-font-color': '#f76c6c',
        '--hover-color': '#00fae9',
      },  
      elegant: {
        '--main-color': '#edc7b7',
        '--second-color': '#eee2dc',
        '--test-type-font-color': '#bab2b5',
        '--main-font-color': '#123c69',
        '--test-font-color': '#ac3b61',
        '--test-invalid-font-color': '#f76c6c',
        '--hover-color': '#00fae9',
      },
};

const ThemeSelector = ({ selectedTheme, changeTheme }) => {
  // Функция для смены темы
  const handleThemeChange = (themeName) => {
    changeTheme(themeName);
  };

  return (
    <div className={styles.themeSelector}>
      <h2>Choose theme</h2>
      <div className={styles.themesContainer}>
        {Object.keys(themes).map((themeName) => (
          <button
            key={themeName}
            className={`${styles.themeOption} ${selectedTheme === themeName ? styles.selected : ''}`}
            onClick={() => handleThemeChange(themeName)}
            disabled={selectedTheme === themeName}
          >
            <div className={styles.colorCircles}>
              {Object.keys(themes[themeName])
                .slice(0, 5) // Берем первые 5 цветов
                .map((colorKey, index) => (
                  <div
                    key={index}
                    className={styles.colorCircle}
                    style={{ backgroundColor: themes[themeName][colorKey] }}
                  />
                ))}
            </div>
            <span className={styles.themeName}>
              {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
