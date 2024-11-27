import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import TypingEffect from "../UI/TypingEffect/TypingEffect"; // Импортируем новый компонент
import styles from './AuthWindow.module.css'; // Импортируем модульные стили

const AuthWindow = observer(() => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(prev => !prev);
    };

    const typingText = "Welcome to the authentication system! Please log in or register. Welcome to the authentication system! Please log in or register."; // Пример текста для анимации

    return (
        <div className={styles.authWindow}>
            <div className={styles.formContainer}>
                <h2 className={styles.title}>{isLogin ? "Login" : "Register"}</h2>
                {isLogin ? <LoginForm /> : <RegisterForm />}
                <button className={styles.button} onClick={toggleForm}>
                    {isLogin ? "Switch to Register" : "Switch to Login"}
                </button>
            </div>
            <div className={styles.textContainer}>
                <TypingEffect template={{ text: typingText }} />
            </div>
            
        </div>
    );
});

export default AuthWindow;
