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
    submissionsAreLoading: true,
  };

  componentDidMount() {
    const { addIdAndUserDataToItems, challenge } = this.props;
    this.submissionsRef = firebase.database().ref(`submissions/${challenge.id}`);
    this.submissionsRef.on('value', (submissionsSnapshot) => {
      const submissions = submissionsSnapshot.val() || {};
      this.setState({
        submissions: addIdAndUserDataToItems(submissions, 'author'),
        submissionsAreLoading: false,
      });
    });
  }

  componentWillUnmount() {
    this.submissionsRef.off();
  }

  renderSubmissions() {
    const { user, userIsLoading, challenge } = this.props;

    if (this.state.submissionsAreLoading) {
      return null;
    }

    if (user && this.state.submissions.find(submission => submission.author.id === user.id)) {
      return <SubmissionList submissions={this.state.submissions} />;
    }

    return (
      <SubmissionForm
        user={user}
        userIsLoading={userIsLoading}
        submissionsRef={this.submissionsRef}
        challenge={challenge}
      />
    );
  }

  render() {
    const { challenge, error } = this.props;
    return (
      <StyledChallengeContent>
        <StyledColumn>
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
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
  addIdAndUserDataToItems: PropTypes.func.isRequired,
  challenge: PropTypes.shape({
    id: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  error: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  userIsLoading: PropTypes.bool.isRequired,
};

ChallengePage.defaultProps = {
  error: null,
  user: null,
};
