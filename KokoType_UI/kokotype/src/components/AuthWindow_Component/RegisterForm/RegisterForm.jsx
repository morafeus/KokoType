import React from "react";
import styles from './RegisterForm.module.css'; // Импортируем модульные стили

const RegisterForm = () => {
    const handleRegister = (e) => {
        e.preventDefault();
    };

    return (
        <form className={styles.form} onSubmit={handleRegister}>
              <div className={styles.formItem}>
                <input 
                    type="login" 
                    required 
                    placeholder="Login" 
                    className={styles.input} 
                />
            </div>
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
            <div className={styles.formItem}>
                <input 
                    type="password" 
                    required 
                    placeholder="Confirm Password" 
                    className={styles.input} 
                />
            </div>
            <button type="submit" className={styles.button}>Register</button>
        </form>
    );
};

export default RegisterForm;