import React, { useState } from "react";
import styles from "./StatisticList.module.css"; // Импортируем модульные стили

const StatisticList = ({ stats }) => {
    const [hovered, setHovered] = useState(null); // Для отслеживания строки, на которой наведен курсор

    // Функция для обработки клика по строке
    const handleRowClick = (index) => {
        // Если кликнули по уже выбранной строке, сбрасываем hovered в null
        setHovered(prevState => (prevState === index ? null : index));
    };

    return (
        <div className={styles.statisticsList}>
            {/* Заголовок таблицы */}
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr>
                        <th className={styles.th}>#</th> {/* Порядковый номер */}
                        <th className={styles.th}>Accuracy</th>
                        <th className={styles.th}>Speed</th>
                    </tr>
                </thead>
            </table>

            {/* Контейнер с прокручиваемым телом таблицы */}
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <tbody>
                        {stats.map((stat, index) => (
                            <tr
                                key={stat.id || index} // Используем индекс, если нет уникального id
                                className={`${styles.tr} ${hovered === index ? styles.activeRow : ""}`} // Добавляем класс для активной строки
                                onClick={() => handleRowClick(index)} // Устанавливаем выбранный элемент
                            >
                                <td className={styles.td}>{index + 1}</td> {/* Порядковый номер строки */}
                                <td className={styles.td}>{stat.accuracy}%</td>
                                <td className={styles.td}>{stat.speed} wpm</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Блок с ошибками, всегда видимый, но с изменением стиля */}
            <div
                className={
                    hovered === null
                        ? `${styles.errorContainer} ${styles.errorContainerDefault}`  // Стиль по умолчанию
                        : `${styles.errorContainer} ${styles.errorContainerActive}`  // Стиль при выбранном элементе
                }
            >
                <h4>
                    {hovered === null
                        ? "Choose one of the list"  // Подсказка, если ничего не выбрано
                        : `Errors for Statistic #${hovered + 1}`} {/* Порядковый номер строки в окошке */}
                </h4>
                <div className={styles.errorText}>
                    {hovered === null
                        ? "Please select a row to view the errors."  // Текст подсказки
                        : stats[hovered]?.errors || "No errors."} {/* Показываем ошибки для выбранного элемента */}
                </div>
            </div>
        </div>
    );
};

export default StatisticList;
