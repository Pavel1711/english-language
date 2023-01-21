import React from 'react'; 
import ReactDOM from 'react-dom/client';
import App from './components/App.js';

const container = document.getElementById('main');
const root = ReactDOM.createRoot(container);
root.render(<App/>);