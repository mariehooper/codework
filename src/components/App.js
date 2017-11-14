import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import { addIdToItems, getCodewarsChallenge } from '../utils';
import HomePage from './HomePage';
import ChallengePage from './ChallengePage';
import ErrorPage from './ErrorPage';
import Header from './Header';

class App extends React.Component {
  state = {
    challenges: [],
    url: '',
    user: null,
    userIsLoading: true,
    error: null,
  };

  componentDidMount() {
    this.challengesRef = firebase.database().ref('challenges');
    this.challengesRef.on('value', (snapshot) => {
      this.setState({
        challenges: addIdToItems(snapshot.val() || {}),
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
    this.challengesRef.off();
    this.stopListening();
  }

  setError(errorMessage) {
    this.setState({
      userIsLoading: false,
      error: errorMessage,
    });
  }

  clearError = () => {
    this.setState({
      error: null,
    });
  }

  setUser(userData, onSuccess) {
    if (/umich\.edu$/i.test(userData.email)) {
      const { displayName, email, photoURL, uid } = userData;
      const user = { displayName, email, photoURL };
      firebase.database().ref(`/users/${uid}`).set(user);
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
    const [, idOrSlug] = this.state.url.match(/codewars.com\/kata\/([^/]+)/i) || [null, null];
    if (idOrSlug) {
      try {
        const data = await getCodewarsChallenge(idOrSlug);
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
          clearError={this.clearError}
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
