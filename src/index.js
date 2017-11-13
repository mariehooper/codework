import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import marked from 'marked';
import 'normalize.css';
import prism from 'prismjs';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import config from './config';
import './global.css';
import App from './components/App';
import { unregister } from './utils/registerServiceWorker';

unregister();

firebase.initializeApp(config[process.env.NODE_ENV]);
prism.languages.js = prism.languages.javascript;
marked.setOptions({
  highlight(code, language) {
    const grammar = prism.languages[language] || prism.languages.markup;
    return prism.highlight(code, grammar);
  },
  langPrefix: 'language-',
});

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app'),
);
