import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import { emailIsWhitelisted, addIdToItems } from '../utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
    challenges: {
      areLoading: true,
      items: [],
      ref: null,
    },
    solutions: {
      areLoading: true,
      items: [],
      ref: null,
    },
  },
  getters: {
    challenges: state => [...state.challenges.items].sort((a, b) => b.createdAt - a.createdAt),
    solutions: state => [...state.solutions.items].sort((a, b) => a.createdAt - b.createdAt),
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setChallenges(state, payload) {
      state.challenges = payload;
    },
    setSolutions(state, payload) {
      state.solutions = payload;
    },
    clearSolutions(state) {
      state.solutions.ref.off();
      state.solutions = {
        areLoading: true,
        items: [],
        ref: null,
      };
    },
  },
  actions: {
    validateUser({ commit, dispatch }, payload) {
      if (emailIsWhitelisted(payload.email)) {
        const { displayName: name, email, photoURL: photoUrl, uid: id } = payload;
        const user = { name, email, photoUrl };
        firebase.database().ref(`/users/${id}`).set(user);
        commit('setUser', { ...user, id });
        commit('setError', null);
      } else {
        dispatch('signOut', 'You must be part of the "umich.edu" domain to use this app.');
      }
    },
    signIn({ dispatch }) {
      const google = new firebase.auth.GoogleAuthProvider();
      google.setCustomParameters({ hd: 'umich.edu' });
      firebase.auth()
        .signInWithPopup(google)
        .then(({ user }) => { dispatch('validateUser', user); })
        .catch(() => {});
    },
    signOut({ commit }, payload) {
      firebase.auth().signOut();
      commit('setUser', null);
      const error = typeof payload === 'string' ? payload : null;
      commit('setError', error);
    },
    loadChallenges({ commit }) {
      const ref = firebase.database().ref('challenges');
      ref.on('value', (snapshot) => {
        commit('setChallenges', {
          items: addIdToItems(snapshot.val() || {}),
          areLoading: false,
          ref,
        });
      });
    },
    loadSolutions({ commit }, challengeId) {
      const ref = firebase.database().ref(`solutions/${challengeId}`);
      ref.on('value', (snapshot) => {
        commit('setSolutions', {
          items: addIdToItems(snapshot.val() || {}),
          areLoading: false,
          ref,
        });
      });
    },
  },
});
