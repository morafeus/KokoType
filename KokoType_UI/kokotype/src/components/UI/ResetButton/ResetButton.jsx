import { observer } from "mobx-react-lite";
import React, { useState } from "react";

import { ReactComponent as ResetIcon } from '../../../assets/icons/ResetIcon.svg';
import './ResetButton.css'; // Убедитесь, что этот путь правильный

const ResetButton = observer(() => {
    const [isRotating, setIsRotating] = useState(false);

    const handleClick = () => {
        setIsRotating(true);
        // Удаляем вращение через 1 секунду (или любое другое время анимации)
        setTimeout(() => {
            setIsRotating(false);
        }, 1000); // Длительность анимации
    };

    return (
        <div 
            className={`icon-button-class ${isRotating ? 'rotate' : ''}`}
            onClick={handleClick}
        >
            <ResetIcon />
        </div>
    );
});

export default ResetButton;