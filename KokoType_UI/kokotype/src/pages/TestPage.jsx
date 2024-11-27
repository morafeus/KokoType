import { observer } from 'mobx-react-lite'
import React from 'react'
import TestSettings from '../components/TestSettings_Components/TestSettings';
import TestWindow from '../components/TestWindow_Components/TestWindow';

import '../styles/page/TestPage.css'

const TestPage = observer(()=> {
    return (
        <div className='testpage-main'>
            <TestWindow template={{text:"hello simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the"}}/>
        </div>
    )
});

export default TestPage;