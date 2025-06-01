// src/components/StatisticSettings.js
import React, { useContext, useState, useEffect } from 'react';
import styles from './StatisticSettings.module.css';
import TestSettingsSection from '../../UI/SettingBar/TextSettingsSection'; // Импортируем компонент
import Context from '../../../context';
import Cookies from 'js-cookie'; // Импортируем библиотеку для работы с cookies

const StatisticSettings = () => {
    const context = useContext(Context);

    // Массив с объектами настроек для статистики
    const [settings, setSettings] = useState([
        {
            name: 'Speed params',
            options: ['WPM', 'WPS'],
            selected: 'WPM', // Начальное значение
        },
        {
            name: 'Accuracy params',
            options: ['error count', 'accuracy'],
            selected: 'accuracy', // Начальное значение
        },
    ]);

    // Загружаем начальные значения из cookies или контекста при монтировании компонента
    useEffect(() => {
        // Сначала пытаемся загрузить из cookies
        const savedSettings = Cookies.get('statisticSettings');
        if (savedSettings) {
            // Если настройки есть в cookies, парсим их
            setSettings(JSON.parse(savedSettings));
        } else {
            // Если в cookies нет настроек, загружаем из контекста
            const { speed, accuracy } = context.params.params;

            setSettings((prevSettings) => prevSettings.map((setting) => {
                if (setting.name === 'Speed params' && speed) {
                    return { ...setting, selected: speed };
                } else if (setting.name === 'Accuracy params' && accuracy) {
                    return { ...setting, selected: accuracy };
                }
                return setting;
            }));
        }
    }, [context.params]); // Эффект сработает, когда контекст обновится

    // Функция для обновления выбранного значения
    const handleSelectChange = (section, selectedOption) => {
        setSettings((prevSettings) =>
            prevSettings.map((setting) =>
                setting.name === section
                    ? { ...setting, selected: selectedOption }
                    : setting
            )
        );
    };

    useEffect(() => {
        const newParams = {
            accuracy: settings.find(setting => setting.name === 'Accuracy params').selected,
            speed: settings.find(setting => setting.name === 'Speed params').selected,
        };

        // Сохраняем в контексте
        context.params.setParams(newParams);

        // Сохраняем в cookies
        Cookies.set('statisticSettings', JSON.stringify(settings), { expires: 30 }); 
    }, [settings, context.params]); 

    return (
        <div className={styles.statisticsSettings}>
            <h2>Statistic settings</h2>

            <div className={styles.settingsGrid}>
                {/* Для каждой настройки отображаем название и селектор */}
                {settings.map((setting, index) => (
                    <div key={index} className={styles.settingRow}>
                        {/* Название настройки */}
                        <div className={styles.settingName}>{setting.name}</div>

                        {/* Компонент TestSettingsSection для выбора параметра */}
                        <div className={styles.selectorContainer}>
                            <TestSettingsSection
                                section={setting.name}
                                items={setting.options}
                                selectedItem={setting.selected}
                                onSelectItem={handleSelectChange}
                                isMultiple={false} // У нас одиночный выбор, нет множественного
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatisticSettings;
