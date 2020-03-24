import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import axios from 'axios'
// axios.defaults.baseURL = 'http://115.159.202.175:18102/ipms/trustSign';
axios.defaults.baseURL = 'http://115.159.202.175:18081/ipms/trustSign';
// axios.defaults.baseURL = 'http://192.168.1.250:8103/ipms/trustSign';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
