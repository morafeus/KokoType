import React from "react";
import styles from './RegisterForm.module.css'; // Импортируем модульные стили

const RegisterForm = () => {
    const handleRegister = (e) => {
        e.preventDefault();
    };

    return (
        <form className={styles.form} onSubmit={handleRegister}>
            <div className={styles.formItem}>
                <label>Email:</label>
                <input type="email" required />
            </div>
            <div className={styles.formItem}>
                <label>Password:</label>
                <input type="password" required />
            </div>
            <div className={styles.formItem}>
                <label>Confirm Password:</label>
                <input type="password" required />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;