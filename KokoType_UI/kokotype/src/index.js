import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Context from './context';
import TestStore from './store/TestStore';
import UserStore from './store/UserStore';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Context.Provider value={{
        user: new UserStore(),
        test: new TestStore(),
    }}>
        <App />
    </Context.Provider>
    
);

