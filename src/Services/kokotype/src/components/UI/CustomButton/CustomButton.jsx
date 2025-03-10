import { observer } from "mobx-react-lite";
import React from "react";
import { ReactComponent as SettingsIcon } from '../../../assets/icons/SettingsIcon.svg';
import classes from './CustomButton.module.css';

const CustomButton = observer(({ isActive, ...props }) => {
    return (
        <button {...props} className={`${classes.iconButton} ${isActive ? classes.active : ''}`}>
            <SettingsIcon />
        </button>
    );
});

export default CustomButton;