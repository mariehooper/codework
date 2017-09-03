import firebase from 'firebase';
import Rebase from 're-base';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAoG-4u2IkLkNQm_cVlqGMwyvTyp1qQHNs',
  authDomain: 'programming-challenges.firebaseapp.com',
  databaseURL: 'https://programming-challenges.firebaseio.com',
  messagingSenderId: '959126944723',
  projectId: 'programming-challenges',
  storageBucket: 'programming-challenges.appspot.com',
});

const database = Rebase.createClass(app.database());

export default database;
