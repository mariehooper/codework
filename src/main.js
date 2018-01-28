import 'normalize.css';
import Vue from 'vue';
import firebase from 'firebase';

import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: 'AIzaSyDaUN3Jw6zowmzt5xEq0jiMX-H184EjH28',
  authDomain: 'letscodework-dev.firebaseapp.com',
  databaseURL: 'https://letscodework-dev.firebaseio.com',
  projectId: 'letscodework-dev',
});

firebase.auth().onAuthStateChanged((user) => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    created() {
      if (user) this.$store.dispatch('validateUser', user);
    },
    render: h => h(App),
  });
});
