import React from 'react'
import 'regenerator-runtime/runtime'

import ReactDOM from 'react-dom';
import App from './App';
import { MyProvider } from './Context';
import FetchApp from './FetchApp';

// ReactDOM.render(<MyProvider>
//   <App />
// </MyProvider>, document.getElementById('root'))


ReactDOM.render(<FetchApp />, document.getElementById('root'));

