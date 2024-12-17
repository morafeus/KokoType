import React, { useEffect, useState } from 'react';
import styles from './ErrorMessage.module.css'; // Импортируем модуль стилей

const ErrorMessage = ({ errorCount }) => {
    const [flashClass, setFlashClass] = useState('');

    useEffect(() => {
        if (errorCount > 0) {
            setFlashClass(styles.flash); // Применяем класс для анимации появления

            // Ожидаем окончания анимации и затем плавно убираем текст
            const timer = setTimeout(() => {
                setFlashClass(''); // Убираем анимацию после её завершения
            }, 1500); // Время анимации появления, которое должно совпадать с длительностью анимации

            return () => clearTimeout(timer); // Очищаем таймер при изменении errorCount
        }
    }, [errorCount]);

    return (
        <div className={`${styles.errorMessage} ${flashClass}`}>
            {errorCount > 0 && `Errors: ${errorCount}`}
        </div>
    );
};

export default ErrorMessage;
