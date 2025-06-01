import React, { useState } from 'react';
import styles from './ActivityCalendar.module.css';

const ActivityCalendar = ({ stats }) => {
    const currentDate = new Date();
    const totalDays = 360; // Отображаем 360 дней
    const activityCounts = Array(totalDays).fill(0);

    // Состояние для хранения данных при наведении
    const [hoveredData, setHoveredData] = useState(null);

    // Обработка статистики для подсчета активности по дням за последние 360 дней
    stats.forEach(item => {
        const date = new Date(item.dateTime);

        // Приводим обе даты к одной дате (без времени) для сравнения
        const dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const currentDateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

        // Проверяем разницу в днях
        const timeDiff = currentDateWithoutTime - dateWithoutTime;
        const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        if (dayDiff >= 0 && dayDiff < totalDays) {
            activityCounts[totalDays - dayDiff - 1] += 1; // Увеличиваем счетчик активностей для этого дня
        }
    });

    return (
        <div className={styles.calendarContainer}>
            {/* Блок градации прозрачности */}
            <div className={styles.opacityGuide}>
                <string>progression:</string>
                <div className={styles.opacitySquare} style={{ opacity: 0.1 }}></div>
                <div className={styles.opacitySquare} style={{ opacity: 0.3 }}></div>
                <div className={styles.opacitySquare} style={{ opacity: 0.7 }}></div>
                <div className={styles.opacitySquare} style={{ opacity: 1 }}></div>
            </div>
            
            <div className={styles.calendar}>
                {activityCounts.map((count, index) => {
                    const date = new Date(currentDate);
                    date.setDate(date.getDate() - (totalDays - index - 1)); // Получаем дату для каждого квадратика

                    // Управляем прозрачностью в зависимости от числа тестов
                    let opacity;
                    if (count === 0) {
                        opacity = 0.1; // 10% для 0 тестов
                    } else if (count <= 5) {
                        opacity = 0.3; // 30% для 1-5 тестов
                    } else if (count <= 15) {
                        opacity = 0.7; // 70% для 6-15 тестов
                    } else {
                        opacity = 1; // 100% для более 15 тестов
                    }

                    return (
                        <div
                            key={index}
                            className={styles.daySquare}
                            style={{
                                opacity: opacity, // Устанавливаем рассчитанную прозрачность
                            }}
                            onMouseEnter={() => setHoveredData({ date, count })}
                            onMouseLeave={() => setHoveredData(null)}
                        >
                            {/* Удаляем количество из квадратика */}
                        </div>
                    );
                })}
            </div>
            {hoveredData && (
                <div className={styles.dateTooltip} style={{ left: '50%', top: '50%' }}>
                    {hoveredData.date.toLocaleDateString()}: {hoveredData.count} тестов пройдено.
                </div>
            )}
        </div>
    );
};

export default ActivityCalendar;