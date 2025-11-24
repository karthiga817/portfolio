import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'

console.log('Test Main executing...');

try {
    ReactDOM.createRoot(document.getElementById('root')).render(
        <div style={{ background: 'red', color: 'white', height: '100vh', padding: '20px' }}>
            <h1>TEST RENDER WORKING</h1>
        </div>
    )
    console.log('Test Main rendered');
} catch (e) {
    console.error('Test Main failed', e);
}
