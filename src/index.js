import firebase from 'firebase';
import marked from 'marked';
import 'normalize.css';
import prism from 'prismjs';
import React from 'react';
import ReactDOM from 'react-dom';

import './global.css';
import App from './components/App';
import registerServiceWorker from './utils/registerServiceWorker';

firebase.initializeApp({
  apiKey: 'AIzaSyAoG-4u2IkLkNQm_cVlqGMwyvTyp1qQHNs',
  authDomain: 'programming-challenges.firebaseapp.com',
  databaseURL: 'https://programming-challenges.firebaseio.com',
  messagingSenderId: '959126944723',
  projectId: 'programming-challenges',
  storageBucket: 'programming-challenges.appspot.com',
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
