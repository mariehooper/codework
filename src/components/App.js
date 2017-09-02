import React from 'react';
import styled from 'styled-components';

import database from '../database';
import ChallengeImportForm from './ChallengeImportForm';
import ChallengeList from './ChallengeList';
import Header from './Header';

const Content = styled.main`
  margin: 0 auto;
  max-width: 45rem;
  padding-top: 2rem;
`;

export default class App extends React.Component {
  state = {
    challenges: [],
    url: '',
  };

  componentDidMount() {
    database.syncState('challenges', {
      asArray: true,
      context: this,
      state: 'challenges',
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      challenges: [...this.state.challenges, this.state.url],
      url: '',
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <Header />
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
