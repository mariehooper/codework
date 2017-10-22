import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import HomePage from './HomePage';
import ChallengePage from './ChallengePage';
import Header from './Header';
import addIdToItems from '../utils/addIdToItems';
import request from '../utils/request';

class App extends React.Component {
  state = {
    challenges: [],
    url: '',
    user: undefined,
    users: {},
    error: null,
  };

  componentDidMount() {
    this.usersRef = firebase.database().ref('users');
    this.usersRef.on('value', (snapshot) => {
      this.setState({
        users: snapshot.val() || {},
      });
    });

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
        this.setState({
          user: null,
        });
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
        error: null,
      }, onSuccess);
    } else {
      this.setState({
        error: 'You must be part of the "umich.edu" domain to use this app.',
      });
    }
  }

  signIn = async (onSuccess) => {
    try {
      const google = new firebase.auth.GoogleAuthProvider();
      google.setCustomParameters({
        hd: 'umich.edu',
      });
      const { user } = await this.auth.signInWithPopup(google);
      if (typeof onSuccess === 'function') {
        this.setUser(user, onSuccess);
      } else {
        this.setUser(user);
      }
    } catch (error) {
      this.setState({
        error: error.message,
      });
    }
  }

  signOut = async () => {
    try {
      await this.auth.signOut();
      this.setState({
        user: null,
        error: null,
      });
    } catch (error) {
      this.setState({
        error: error.message,
      });
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
          });
          this.setState({
            url: '',
            error: null,
          });
        } else {
          this.setState({
            error: 'That challenge has already been imported!',
          });
        }
      } catch (error) {
        this.setState({
          error: error.message,
        });
      }
    } else {
      this.setState({
        error: 'Please enter a correctly-formatted Codewars Kata URL.',
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.user) {
      this.importChallenge();
    } else {
      this.signIn(this.importChallenge);
    }
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
      users={this.state.users}
      user={this.state.user}
    />
  );

  renderChallengePage = ({ match }) => {
    const challenge = this.state.challenges.find(c => c.slug === match.params.slug);
    return (
      <ChallengePage
        challenge={challenge}
        contributor={this.state.users[challenge.contributor]}
        error={this.state.error}
        signIn={this.signIn}
        user={this.state.user}
        users={this.state.users}
      />
    );
  };

  render() {
    return (
      <div>
        <Header signOut={this.signOut} signIn={this.signIn} user={this.state.user} />
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
