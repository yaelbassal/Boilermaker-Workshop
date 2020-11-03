import React from 'react';
import ReactDOM from 'react-dom';
import store from '../app/redux/store';
import { Provider } from 'react-redux';
import HomePage from '../app/components/HomePage';
import './index.css'


ReactDOM.render(
  <Provider store={store}>
    <HomePage/>
  </Provider>,
  document.getElementById('app')
)
