import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthContext from './context';
import UserStore from './store/UserStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContext.Provider value={{
        user: new UserStore(),
    }}>
        <App />
    </AuthContext.Provider>
    
);

