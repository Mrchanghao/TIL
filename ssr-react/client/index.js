import React from 'react'
import ReactDOM from 'react-dom';
import App from './compoents/App';

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.hydrate(
    <App />,
    document.getElementById('ssr-app'),
  )
})
