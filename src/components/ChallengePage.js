import firebase from 'firebase';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import ChallengeCard from './ChallengeCard';
import { StyledChallengeContent } from './Content';
import SubmissionList from './SubmissionList';
import SubmissionForm from './SubmissionForm';

const StyledColumn = styled.div`
  flex: 1;
  width: 50%;

  &:not(:last-child) {
    padding-right: 1rem;
  }
`;

export default class ChallengePage extends React.Component {
  state = {
    submissions: [],
  };

  componentDidMount() {
    this.submissionsRef = firebase.database().ref(`submissions/${this.props.challenge.id}`);
    this.submissionsRef.on('value', (snapshot) => {
      const submissions = snapshot.val() || {};
      this.setState({
        submissions: Object.entries(submissions).map(([key, submission]) => ({
          ...submission,
          id: key,
        })),
      });
    });
  }

  componentWillUnmount() {
    this.submissionsRef.off();
  }

  renderSubmissions() {
    const { users, user, signIn, contributor } = this.props;
    if (user && this.state.submissions.find(submission => submission.author === user.uid)) {
      return (
        <SubmissionList
          users={users}
          contributor={contributor}
          submissions={this.state.submissions}
        />
      );
    }

    return (
      <SubmissionForm
        user={user}
        submissionsRef={this.submissionsRef}
        signIn={signIn}
      />
    );
  }

  render() {
    const { challenge, contributor } = this.props;
    return (
      <StyledChallengeContent>
        <StyledColumn>
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            contributor={contributor}
            tags={challenge.tags}
          />
        </StyledColumn>
        <StyledColumn>
          {this.renderSubmissions()}
        </StyledColumn>
      </StyledChallengeContent>
    );
  }
}

ChallengePage.propTypes = {
  challenge: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    points: PropTypes.string.isRequired,
  }).isRequired,
  contributor: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }),
  signIn: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
};

ChallengePage.defaultProps = {
  user: null,
};
