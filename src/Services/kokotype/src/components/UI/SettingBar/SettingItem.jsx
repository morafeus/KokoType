import React from "react";
import styles from './TextSettingsSection.module.css'; // Импортируем модульные стили

const SettingItem = ({ label, isSelected, onSelect }) => {
    const handleClick = () => {
        onSelect(); // Сообщаем родительскому компоненту о выборе
    };

    return (
        <div 
            className={`${styles.settingItem} ${isSelected ? styles.selected : ''}`} 
            onClick={handleClick}
        >
            {label}
        </div>
    );
};

export default SettingItem;