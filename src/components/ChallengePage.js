import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import ChallengeCard from './ChallengeCard';
import { StyledChallengeContent } from './Content';
import { StyledExternalLink } from './StyledButton';
import SubmissionList from './SubmissionList';
import SubmissionForm from './SubmissionForm';
import ErrorMessage from './ErrorMessage';

const StyledColumn = styled.div`
  flex: 1;
  width: 50%;
  @media (max-width: 680px) {
    width: 100%;
  }

  &:not(:last-child) {
    padding-right: 1rem;
    @media (max-width: 680px) {
      padding-right: 0;
    }
  }
`;

export default class ChallengePage extends React.Component {
  state = {
    submissions: [],
    isLoading: true,
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
        isLoading: false,
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

    if (!this.state.isLoading) {
      return (
        <SubmissionForm
          user={user}
          submissionsRef={this.submissionsRef}
          signIn={signIn}
        />
      );
    }

    return null;
  }

  render() {
    const { challenge, contributor, error } = this.props;
    return (
      <StyledChallengeContent>
        <StyledColumn>
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            contributor={contributor}
            tags={challenge.tags}
            link={
              <StyledExternalLink
                href={`${challenge.url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Start Solving
              </StyledExternalLink>
            }
          />
        </StyledColumn>
        <StyledColumn>
          {error &&
            <ErrorMessage message={error} />
          }
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
  error: PropTypes.string,
};

ChallengePage.defaultProps = {
  user: null,
  error: null,
};
