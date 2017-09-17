import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import marked from 'marked';
import 'normalize.css';
import prism from 'prismjs';
import React from 'react';
import ReactDOM from 'react-dom';

import './global.css';
import App from './components/App';
import registerServiceWorker from './utils/registerServiceWorker';

firebase.initializeApp({
  apiKey: 'AIzaSyAZ7UqAP3jO6DF6TGtGyFu2iGbcZWilWto',
  authDomain: 'letscodework.firebaseapp.com',
  databaseURL: 'https://letscodework.firebaseio.com',
  projectId: 'letscodework',
});

prism.languages.js = prism.languages.javascript;
marked.setOptions({
  highlight(code, language) {
    const grammar = prism.languages[language] || prism.languages.markup;
    return prism.highlight(code, grammar);
  },
  langPrefix: 'language-',
});

ReactDOM.render(<App />, document.getElementById('app'));
registerServiceWorker();
