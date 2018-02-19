import 'normalize.css';
import Vue from 'vue';
import firebase from 'firebase';
import marked from 'marked';
import prism from 'prismjs';
import App from './App';
import router from './router';
import store from './store';
import { getFirebaseConfig } from './utils';

Vue.config.productionTip = false;

firebase.initializeApp(getFirebaseConfig(process.env.NODE_ENV));
prism.languages.js = prism.languages.javascript;
marked.setOptions({
  highlight(code, language) {
    const grammar = prism.languages[language] || prism.languages.markup;
    return prism.highlight(code, grammar);
  },
  langPrefix: 'language-',
});

firebase.auth().onAuthStateChanged((user) => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    created() {
      if (user) this.$store.dispatch('validateUser', user);
      this.$store.dispatch('loadChallenges');
    },
    render: h => h(App),
  });
});
