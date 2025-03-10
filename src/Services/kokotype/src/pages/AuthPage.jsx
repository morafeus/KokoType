import { observer } from 'mobx-react-lite'
import React from 'react'
import AuthWindow from '../components/AuthWindow/AuthWindow';
import TypingEffect from '../components/AuthWindow/TypingEffect/TypingEffect';
import '../styles/page/AuthPage.css'

const AuthPage = observer(()=> {
    const typingText = "Welcome to the KokoType. Kokotype - the best type practice machine. You can type like that and even better, just practice. Please Login or Sign Up if you don't have an account."; // Пример текста для анимации

    return (
        <div className="container">
            <div className="formContainer">
                <AuthWindow />
            </div>
            <div className="textContainer">
                <TypingEffect template={{ text: typingText }} />
            </div>
        </div>
    );
});

export default AuthPage;