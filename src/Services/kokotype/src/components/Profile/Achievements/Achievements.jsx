import React, { useState } from 'react';
import styles from './Achievements.module.css';


import { ReactComponent as LockIcon } from '../../../assets/icons/LockIcon.svg';

const Achievements = ({ achives }) => {
    const [hoveredAchive, setHoveredAchive] = useState(null); // Состояние для хранения текущего достижения, на которое наведен курсор

    const itemsPerRow = 10;

    const totalAchievements = [...achives, ...Array(itemsPerRow - achives.length).fill({ locked: true })];

    return (
        <div className={styles.achievementsContainer}>
            {totalAchievements.map((achive, index) => (
                <div 
                    key={index} 
                    className={styles.achiveItem}
                    onMouseEnter={() => {
                        if (!achive.locked) setHoveredAchive(achive);
                    }}
                    onMouseLeave={() => setHoveredAchive(null)}
                >
                    {!achive.locked ? (
                        <>
                            <img 
                                src={`${process.env.PUBLIC_URL}${achive.imageUrl}`} 
                                alt={achive.name} 
                                className={styles.achiveImage} 
                            />
                            {hoveredAchive === achive && ( // Показываем всплывающее окно
                                <div className={styles.popup}>
                                    <h3 className={styles.achiveName}>{achive.name}</h3>
                                    <p className={styles.achiveCondition}>{achive.condition}</p>
                                    <p className={styles.achiveDescription}>{achive.description}</p>
                                </div>
                            )}
                        </>
                    ) : (
                        // Если "locked", выводим квадрат с текстом
                        <div className={styles.lockedAchive}>
                            <LockIcon/>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Achievements;