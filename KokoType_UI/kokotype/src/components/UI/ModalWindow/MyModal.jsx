import { observer } from "mobx-react-lite";
import React from "react";

import classes from './MyModal.module.css';

const MyModal = observer(({ children, visible, setVisible, onAccept }) => {
    return (
        <div onClick={() => setVisible(false)} className={[classes.modal, visible ? classes.active : ''].join(' ')}>
            {visible && (
                <div className={classes.modalBackground}></div>
            )}
            <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
                {/* Кнопка Accept */}
                <button 
                    className={classes.acceptButton} 
                    onClick={() => {
                        if (onAccept) onAccept(); // Вызов функции при нажатии на Accept
                        setVisible(false); // Закрытие модального окна
                    }}
                >
                    Accept
                </button>
            </div>
        </div>
    );
});

export default MyModal;