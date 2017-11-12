import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import HomePage from './HomePage';
import ChallengePage from './ChallengePage';
import ErrorPage from './ErrorPage';
import Header from './Header';
import addIdToItems from '../utils/addIdToItems';
import request from '../utils/request';

class App extends React.Component {
  state = {
    challenges: [],
    url: '',
    user: null,
    userIsLoading: true,
    users: {},
    error: null,
  };

  componentDidMount() {
    this.usersRef = firebase.database().ref('users');
    this.usersRef.on('value', (usersSnapshot) => {
      this.challengesRef = firebase.database().ref('challenges');
      this.challengesRef.on('value', (challengesSnapshot) => {
        const challenges = challengesSnapshot.val() || {};
        const users = usersSnapshot.val() || {};
        this.setState({
          challenges: addIdToItems(challenges),
          users,
        });
      });
    });

    this.auth = firebase.auth();
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setUser(user);
      } else {
        this.clearUser();
      }
    });

    this.stopListening = this.props.history.listen(() => {
      window.scrollTo(0, 0);
    });
  }

  componentWillUnmount() {
    this.usersRef.off();
    this.challengesRef.off();
    this.stopListening();
  }

  setError(errorMessage) {
    this.setState({
      userIsLoading: false,
      error: errorMessage,
    });
  }

  setUser(userData, onSuccess) {
    if (/umich\.edu$/i.test(userData.email)) {
      const { displayName, email, photoURL, uid } = userData;
      const user = { displayName, email, photoURL };
      this.usersRef.child(uid).set(user);
      this.setState({
        user: {
          ...user,
          id: uid,
        },
        userIsLoading: false,
        error: null,
      }, onSuccess);
    } else {
      this.signOut('You must be part of the "umich.edu" domain to use this app.');
    }
  }

  clearUser(errorMessage = null) {
    this.setState({
      user: null,
      userIsLoading: false,
      error: errorMessage,
    });
  }

  signIn = async () => {
    try {
      const google = new firebase.auth.GoogleAuthProvider();
      google.setCustomParameters({
        hd: 'umich.edu',
      });
      const { user } = await this.auth.signInWithPopup(google);
      this.setUser(user);
    } catch (error) {
      this.setError(error.message);
    }
  }

  signOut = async (errorMessage = null) => {
    try {
      await this.auth.signOut();
      if (typeof errorMessage === 'string') {
        this.clearUser(errorMessage);
      } else {
        this.clearUser();
      }
    } catch (error) {
      this.setError(error.message);
    }
  }

  async importChallenge() {
    const [, path] = this.state.url.match(/codewars.com\/kata\/([^/]+)/i) || [null, null];
    if (path) {
      try {
        const data = await request(`/api/codewars/code-challenges/${path}`);
        if (!this.state.challenges.find(challenge => challenge.id === data.id)) {
          const { description, id, name, rank, tags, url, slug } = data;
          this.challengesRef.child(id).set({
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            description,
            name,
            points: rank.name,
            tags,
            url,
            slug,
            contributor: this.state.user.id,
            numSubmissions: 0,
          });
          this.setState({
            url: '',
            error: null,
          });
        } else {
          this.setError('That challenge has already been imported!');
        }
      } catch (error) {
        this.setError(error.message);
      }
    } else {
      this.setError('Please enter a correctly-formatted Codewars Kata URL.');
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.importChallenge();
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  renderHomePage = () => (
    <HomePage
      handleChange={this.handleChange}
      handleSubmit={this.handleSubmit}
      error={this.state.error}
      url={this.state.url}
      challenges={this.state.challenges}
      user={this.state.user}
      userIsLoading={this.state.userIsLoading}
    />
  );

  renderChallengePage = ({ match }) => {
    const challenge = this.state.challenges.find(c => c.slug === match.params.slug);
    if (challenge) {
      return (
        <ChallengePage
          challenge={challenge}
          error={this.state.error}
          user={this.state.user}
          userIsLoading={this.state.userIsLoading}
        />
      );
    }

    return <ErrorPage />;
  };

  render() {
    return (
      <div>
        <Header
          signOut={this.signOut}
          signIn={this.signIn}
          user={this.state.user}
          userIsLoading={this.state.userIsLoading}
        />
        <Route exact path="/" render={this.renderHomePage} />
        {(this.state.challenges.length > 0) &&
          <Route path="/challenge/:slug" render={this.renderChallengePage} />
        }
      </div>
    );
  }
}

export default withRouter(App);

App.propTypes = {
  history: PropTypes.shape({
    listen: PropTypes.func.isRequired,
  }).isRequired,
};
