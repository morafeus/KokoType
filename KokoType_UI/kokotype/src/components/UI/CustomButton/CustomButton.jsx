import { observer } from "mobx-react-lite";
import React from "react";

import { ReactComponent as SettingsIcon } from '../../../assets/icons/SettingsIcon.svg';

import classes from './CustomButton.module.css'

const CustomButton = observer((props) => {
    return (
        <button {...props} className={classes.iconButton}>
            <SettingsIcon/>
        </button>
    )
});

export default CustomButton;