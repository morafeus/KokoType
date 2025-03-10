import React, { useEffect, useState } from 'react';
import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ errorCount }) => {
    const [flashClass, setFlashClass] = useState('');

    useEffect(() => {
        if (errorCount > 0) {
            setFlashClass(styles.flash);

            const timer = setTimeout(() => {
                setFlashClass('');
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [errorCount]);

    return (
        <div className={`${styles.errorMessage} ${flashClass}`}>
            {errorCount > 0 && `Errors: ${errorCount}`}
        </div>
    );
};

export default ErrorMessage;
