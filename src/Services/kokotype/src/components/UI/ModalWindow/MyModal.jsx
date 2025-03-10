import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";

import classes from './MyModal.module.css';

const MyModal = observer(({ children, visible, setVisible, onAccept }) => {

    // При открытии модального окна фокус автоматически ставится на кнопку Accept
    useEffect(() => {
        if (visible) {
            const acceptButton = document.querySelector(`#acceptButton`);
            if (acceptButton) {
                acceptButton.focus();
            }
        }
    }, [visible]);

    return (
        <div 
            onClick={() => setVisible(false)} 
            className={[classes.modal, visible ? classes.active : ''].join(' ')}
        >
            {visible && (
                <div className={classes.modalBackground}></div>
            )}
            <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
                {/* Кнопка Accept с автофокусом */}
                <button 
                    id="acceptButton" 
                    className={classes.acceptButton} 
                    onClick={() => {
                        if (onAccept) onAccept(); // Вызов функции при нажатии на Accept
                        setVisible(false); // Закрытие модального окна
                    }}
                    tabIndex={0} // Убедимся, что кнопка Accept доступна для фокуса
                >
                    Accept
                </button>
            </div>
        </div>
    );
});

export default MyModal;
