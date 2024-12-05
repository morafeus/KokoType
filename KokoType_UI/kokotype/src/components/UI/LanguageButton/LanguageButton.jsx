import { observer } from "mobx-react-lite";
import React, { Children } from "react";

import classes from './LanguageButton.module.css'

const LanguageButton = observer(({children, onClick})=> {
    return (
        <button onClick={onClick} className={classes.LanguageButton}>{children}</button>
    )
});

export default LanguageButton;