import React from "react";
import SettingItem from "./SettingItem";
import styles from './TextSettingsSection.module.css'; // Импортируем модульные стили

const TestSettingsSection = ({ section, items, selectedItem, onSelectItem, isMultiple }) => {
    return (
        <div className={styles.testSettingsSection}>
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