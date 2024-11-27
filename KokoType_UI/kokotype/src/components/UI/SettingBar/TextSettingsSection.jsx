// src/components/TestSettingsSection.js
import React from "react";
import SettingItem from "./SettingItem";
import './TestSettingsSection.css';

const TestSettingsSection = ({ section, items, selectedItem, onSelectItem, isMultiple }) => {
    return (
        <div className="test-settings-section">
            {items.map((item, index) => (
                <SettingItem 
                    key={index} 
                    label={item} 
                    isSelected={isMultiple ? selectedItem.includes(item) : item === selectedItem} // Проверяем на множественный выбор
                    onSelect={() => onSelectItem(section, item)} 
                />
            ))}
        </div>
    );
};

export default TestSettingsSection;