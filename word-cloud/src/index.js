import 'regenerator-runtime/runtime'
import React from 'react'
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import './style.css';

// const el = document.getElementById('container');
// if (el) {
//   ReactDOM.render(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//   );
// }

render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'))