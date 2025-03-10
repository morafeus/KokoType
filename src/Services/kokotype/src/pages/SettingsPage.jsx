import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import ThemeSelector from '../components/SettingsWindow/ThemeSelector/ThemeSelector';
import StatisticSettings from '../components/SettingsWindow/StatisticSettings/StatisticSettings';

const SettingsPage = observer(() => {
  const [selectedTheme, setSelectedTheme] = useState('dark'); // Стандартная тема

  // Функция для переключения темы
  const changeTheme = (themeName) => {
    const theme = {
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

    const selectedThemeObj = themeName ? themeName : 'dark';
    const selectedThemeConfig = theme[selectedThemeObj];

    for (let key in selectedThemeConfig) {
      document.documentElement.style.setProperty(key, selectedThemeConfig[key]);
    }

    setSelectedTheme(selectedThemeObj);
    localStorage.setItem('theme', selectedThemeObj); // Сохраняем выбор в localStorage
  };

  useEffect(() => {
    // Проверяем, есть ли сохраненная тема в localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    changeTheme(savedTheme); // Применяем сохраненную тему или устанавливаем темную по умолчанию
  }, []);

  return (
    <div>
      <ThemeSelector selectedTheme={selectedTheme} changeTheme={changeTheme} />
      <StatisticSettings /> {/* Добавляем компонент статистики */}
    </div>
  );
});

export default SettingsPage;
