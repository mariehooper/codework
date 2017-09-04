import firebase from 'firebase';
import React from 'react';
import styled from 'styled-components';

import ChallengeImportForm from './ChallengeImportForm';
import ChallengeList from './ChallengeList';
import Header from './Header';
import database from '../utils/database';
import request from '../utils/request';

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

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const [, slug] = this.state.url.match(/codewars.com\/kata\/([^/]+)/i);
      const data = await request(`/codewars/code-challenges/${slug}`);
      const challenges = [...this.state.challenges];
      if (!challenges.find(challenge => challenge.id === data.id)) {
        const { description, id, name, rank, tags } = data;
        challenges.unshift({
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          description,
          id,
          name,
          points: rank.name,
          tags,
        });
        this.setState({
          challenges,
          url: '',
        });
      }
    } catch (error) {
      console.log(error.message);
    }
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
