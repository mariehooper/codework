import firebase from 'firebase';
import React from 'react';
import styled from 'styled-components';

import ChallengeImportForm from './ChallengeImportForm';
import ChallengeList from './ChallengeList';
import Header from './Header';
import request from '../utils/request';

const Content = styled.main`
  margin: 0 auto;
  max-width: 45rem;
  padding-top: 1.5rem;
`;

const StyledButtonLink = styled.button`
  background: none;
  border: none;
  color: #00bcd4;

  &:hover {
    color: #1ed4d4;
    cursor: pointer;
    text-decoration: underline;
  }
`;

export default class App extends React.Component {
  state = {
    challenges: [],
    url: '',
    user: null,
  };

  setUser(userData) { // eslint-disable-line react/sort-comp
    if (/umich\.edu$/i.test(userData.email)) {
      const { displayName, email, photoURL, uid } = userData;
      const user = { displayName, email, photoURL, uid };
      this.usersRef.child(uid).set(user);
      this.setState({ user });
    } else {
      console.log('You must be part of the "umich.edu" domain to use this app.');
    }
  }

  componentDidMount() {
    this.usersRef = firebase.database().ref('users');

    this.challengesRef = firebase.database().ref('challenges');
    this.challengesRef.on('value', (snapshot) => {
      const challenges = snapshot.val() || {};
      this.setState({
        challenges: Object.values(challenges),
      });
    });

    this.auth = firebase.auth();
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setUser(user);
      }
    });
  }

  componentWillUnmount() {
    this.usersRef.off();
    this.challengesRef.off();
  }

  signIn = async () => {
    try {
      const google = new firebase.auth.GoogleAuthProvider();
      const { user } = await this.auth.signInWithPopup(google);
      this.setUser(user);
    } catch (error) {
      console.log(error.message);
    }
  }

  signOut = async () => {
    try {
      await this.auth.signOut();
      this.setState({
        user: null,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async importChallenge() {
    try {
      const [, slug] = this.state.url.match(/codewars.com\/kata\/([^/]+)/i);
      const data = await request(`/codewars/code-challenges/${slug}`);
      if (!this.state.challenges.find(challenge => challenge.id === data.id)) {
        const { description, id, name, rank, tags, url } = data;
        this.challengesRef.child(id).set({
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          description,
          id,
          name,
          points: rank.name,
          tags,
          url,
        });
        this.setState({
          url: '',
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    if (this.state.user) {
      this.importChallenge();
    } else {
      await this.signIn();
      if (this.state.user) {
        this.importChallenge();
      }
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  renderAuthLink() {
    if (this.state.user) {
      return <StyledButtonLink onClick={this.signOut}>Sign out</StyledButtonLink>;
    }

    return <StyledButtonLink onClick={this.signIn}>Sign in</StyledButtonLink>;
  }

  render() {
    return (
      <div>
        <Header authLink={this.renderAuthLink()} />
        <Content>
          <ChallengeImportForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            url={this.state.url}
          />
          <ChallengeList challenges={this.state.challenges} />
        </Content>
      </div>
    );
  }
}
