import { observer } from "mobx-react-lite";
import React from "react";

import '../../styles/component/TestSettings.css'

const TestSettings = observer(() => {
    return (
        <div className='test-settings-container'>
            <div className="test-settins-section">
                Settings
            </div>
        </div>
    )
});

export default TestSettings;