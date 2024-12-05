import React from "react";
import styles from './LoginForm.module.css'; // Импортируем модульные стили

const LoginForm = () => {
    const handleLogin = (e) => {
        e.preventDefault();
    };

    return (
        <form className={styles.form} onSubmit={handleLogin}>
            <div className={styles.formItem}>
                <input 
                    type="email" 
                    required 
                    placeholder="Email" 
                    className={styles.input} 
                />
            </div>
            <div className={styles.formItem}>
                <input 
                    type="password" 
                    required 
                    placeholder="Password" 
                    className={styles.input} 
                />
            </div>
            <button type="submit" className={styles.button}>Login</button>
        </form>
    );
};

export default LoginForm;