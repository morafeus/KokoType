import React, { useState } from "react";
import styles from "./StatisticList.module.css"; // Импортируем модульные стили

const StatisticList = ({ stats, params }) => {
    const [hovered, setHovered] = useState(null); // Для отслеживания строки, на которой наведен курсор

    // Функция для обработки клика по строке
    const handleRowClick = (index) => {
        setHovered(prevState => (prevState === index ? null : index));
    };

    // Вычисление средних значений
    const calculateAverages = () => {
        if (stats.length === 0) return { accuracy: 0, speed: 0 };

        const totalAccuracy = stats.reduce((acc, stat) => acc + stat.accuracy, 0);
        const totalSpeed = stats.reduce((acc, stat) => acc + stat.speed, 0);
        const averageAccuracy = (totalAccuracy / stats.length).toFixed(2); // Округляем до двух знаков
        const averageSpeed = (totalSpeed / stats.length).toFixed(2); // Округляем до двух знаков

        return { accuracy: averageAccuracy, speed: averageSpeed };
    };

    const { accuracy, speed } = calculateAverages();

    return (
        <div className={styles.statisticsList} tabIndex={-1}>
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
            <div className={styles.tableWrapper} tabIndex={-1}>
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
                        ? params // Отображаем средние значения
                        : `Errors for Statistic #${hovered + 1}`} {/* Порядковый номер строки в окошке */}
                </h4>
                <div className={styles.errorText}>
                    {hovered === null
                        ? `AVG Accuracy: ${accuracy}% | AVG Speed: ${speed} wpm`  // Убираем текст, если ничего не выбрано
                        : stats[hovered]?.errors || "No errors."} {/* Показываем ошибки для выбранного элемента */}
                </div>
            </div>
        </div>
    );
};

export default StatisticList;