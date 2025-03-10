import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import styles from './AuthWindow.module.css'; // Импортируем модульные стили

const AuthWindow = observer(() => {
    const [isLogin, setIsLogin] = useState(true);

    

    const toggleForm = () => {
        setIsLogin(prev => !prev);
    };

    
    return (
        <div className={styles.authWindow}>
            <div className={styles.formContainer}>
                <h2 className={styles.title}>{isLogin ? "Login" : "Register"}</h2>
                {isLogin ? <LoginForm /> : <RegisterForm toggleForm={toggleForm}/>}
                <button className={styles.button} onClick={toggleForm}>
                    {isLogin ? "Switch to Register" : "Switch to Login"}
                </button>
                {isLogin &&
                    <button className={styles.buttonForgot}>
                        Forgot password?
                    </button>
                }
               
            </div>
        </div>
    );
});

export default AuthWindow;