import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';

import './global.css';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('app'));
registerServiceWorker();
