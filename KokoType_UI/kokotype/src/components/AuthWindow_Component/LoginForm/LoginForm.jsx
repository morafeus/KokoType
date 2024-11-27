import React from "react";
import styles from './LoginForm.module.css'; // Импортируем модульные стили

const LoginForm = () => {
    const handleLogin = (e) => {
        e.preventDefault();
    };

    return (
        <form className={styles.form} onSubmit={handleLogin}>
            <div className={styles.formItem}>
                <label>Email:</label>
                <input type="email" required />
            </div>
            <div className={styles.formItem}>
                <label>Password:</label>
                <input type="password" required />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;