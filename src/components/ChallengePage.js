import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { addIdToItems } from '../utils';
import Challenge from './Challenge';
import { StyledChallengeContent } from './Content';
import { StyledExternalLink } from './StyledButton';
import SolutionList from './SolutionList';
import SolutionForm from './SolutionForm';
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
    solutions: [],
    solutionsAreLoading: true,
  };

  componentDidMount() {
    const { challenge, clearError } = this.props;
    clearError();
    this.solutionsRef = firebase.database().ref(`solutions/${challenge.id}`);
    this.solutionsRef.on('value', (snapshot) => {
      this.setState({
        solutions: addIdToItems(snapshot.val() || {}),
        solutionsAreLoading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.clearError();
    this.solutionsRef.off();
  }

  renderSolutions() {
    const { user, userIsLoading, challenge } = this.props;

    if (this.state.solutionsAreLoading) {
      return null;
    }

    if (user && this.state.solutions.find(solution => solution.submittedBy === user.id)) {
      return <SolutionList solutions={this.state.solutions} />;
    }

    return (
      <SolutionForm
        user={user}
        userIsLoading={userIsLoading}
        solutionsRef={this.solutionsRef}
        challenge={challenge}
      />
    );
  }

  render() {
    const { challenge, error } = this.props;
    return (
      <StyledChallengeContent>
        <StyledColumn>
          <Challenge
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
          {this.renderSolutions()}
        </StyledColumn>
      </StyledChallengeContent>
    );
  }
}

ChallengePage.propTypes = {
  challenge: PropTypes.shape({
    id: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  clearError: PropTypes.func.isRequired,
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
