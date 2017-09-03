import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';

import './global.css';
import App from './components/App';
import registerServiceWorker from './utils/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('app'));
registerServiceWorker();
