// src/components/SettingItem.js
import React from "react";
import './TestSettingsSection.css';

const SettingItem = ({ label, isSelected, onSelect }) => {
    const handleClick = () => {
        onSelect(); // Сообщаем родительскому компоненту о выборе
    };

    return (
        <div 
            className={`setting-item ${isSelected ? 'selected' : ''}`} 
            onClick={handleClick}
        >
            {label}
        </div>
    );
};

export default SettingItem;