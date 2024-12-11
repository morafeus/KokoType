import React, { useState } from "react";
import { registration } from "../../../http/authAPI";
import styles from './RegisterForm.module.css'; // Импортируем модульные стили
import toastr from 'toastr'; // Импортируем toastr
import 'toastr/build/toastr.min.css'; 
import All_Routes from "../../../utils/consts";
import { observer } from 'mobx-react-lite'; // Импортируем observer

const RegisterForm = observer(({toggleForm}) => {
    const [registerModel, setRegisterModel] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    toastr.options = {
        positionClass: "toast-bottom-right", // Позиция уведомления
        timeOut: 5000, // Время отображения уведомления в миллисекундах
        closeButton: true, // Кнопка закрытия уведомления
        progressBar: true // Полоска прогресса
    };


    const handleRegister = async (e) => {
        e.preventDefault(); // Предотвращаем отправку формы

        const { userName, password, email, confirmPassword } = registerModel;

        // Проверка на обязательные поля и совпадение паролей
        if (!userName || !email || !password || !confirmPassword) {
            toastr.error("Put values to all fields."); // Сообщение об ошибке
            return;
        }
        
        if (password !== confirmPassword) {
            toastr.error("Passwords not equal."); // Сообщение об ошибке
            return;
        }

        const data = await registration({ userName, password, email });
        console.log(data);
        if (!data.error) {
            toastr.success("Registration successful!"); // Сообщение об успешной регистрации
            toggleForm();
        } else {
            toastr.error(data.error); // Сообщение об ошибке
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target; // Получаем имя и значение инпута
        setRegisterModel(prev => ({ ...prev, [name]: value })); // Обновляем состояние
    };

    return (
        <form className={styles.form} onSubmit={handleRegister} noValidate>
            <div className={styles.formItem}>
                <input 
                    type="text"
                    name="userName" 
                    required 
                    placeholder="Login" 
                    className={styles.input} 
                    onChange={handleChange}
                    value={registerModel.userName}
                />
            </div>
            <div className={styles.formItem}>
                <input 
                    type="email" 
                    name="email" 
                    required 
                    placeholder="Email" 
                    className={styles.input} 
                    onChange={handleChange}
                    value={registerModel.email}
                />
            </div>
            <div className={styles.formItem}>
                <input 
                    type="password" 
                    name="password" 
                    required 
                    placeholder="Password" 
                    className={styles.input} 
                    onChange={handleChange}
                    value={registerModel.password}
                />
            </div>
            <div className={styles.formItem}>
                <input 
                    type="password" 
                    name="confirmPassword" 
                    required 
                    placeholder="Confirm Password" 
                    className={styles.input}
                    onChange={handleChange} 
                    value={registerModel.confirmPassword}
                />
            </div>
            <button type="submit" className={styles.button}>Register</button>
        </form>
    );
});

export default RegisterForm;