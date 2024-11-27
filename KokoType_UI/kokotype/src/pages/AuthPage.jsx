import { observer } from 'mobx-react-lite'
import React from 'react'
import AuthWindow from '../components/AuthWindow_Component/AuthWindow';

const AuthPage = observer(()=> {
    return (
        <AuthWindow/>
    )
});

export default AuthPage;