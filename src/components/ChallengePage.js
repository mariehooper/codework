import firebase from 'firebase';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import marked from 'marked';

import ChallengeCard from './ChallengeCard';
import { StyledChallengeContent } from './Content';
import { StyledForm } from './ChallengeImportForm';
import Avatar from './Avatar';

const StyledColumn = styled.div`
  flex: 1;
  width: 50%;

  &:not(:last-child) {
    padding-right: 1rem;
  }
`;

const StyledTextArea = styled.textarea`
  border: none;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02);
  display: block;
  min-height: 8rem;
  outline: none;
  padding: 0.5rem;
  width: 100%;

  &.active {
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  }
`;

const StyledWhiteButton = styled.button`
  background: #fff;
  border: none;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  color: #00bcd4;
  display: block;
  font-size: 15px;
  letter-spacing: 0.025em;
  margin-left: auto;
  margin-top: 1rem;
  padding: 0.5rem 0.625rem;
  text-decoration: none;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }
`;

const StyledSubmission = styled.div`
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 3px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  margin-bottom: 0.5rem;
  padding: 1rem;
`;

const StyledAuthorWrapper = styled.div`
  align-items: center;
  display: flex;

  .author-name {
    font-size: 0.8rem;
    margin: 0 0 0.2rem;
  }

  .author-date {
    font-size: 0.75rem;
    margin: 0;
  }
`;

const StyledSolution = styled.article`
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.5;

  h1 {
    font-size: 1.25rem;
  }

  h2 {
    font-size: 1.2rem;
  }
`;

export default class ChallengePage extends React.Component {
  state = {
    submissions: [],
    solution: '',
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

  saveSubmission = () => {
    this.submissionsRef.push({
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      solution: this.state.solution,
      author: this.props.user.uid,
    });
    this.setState({
      solution: '',
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { user, signIn } = this.props;
    if (user) {
      this.saveSubmission();
    } else {
      signIn(this.saveSubmission);
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleFocus = (event) => {
    event.target.classList.add('active');
  }

  handleBlur = (event) => {
    event.target.classList.remove('active');
  }

  render() {
    const { challenge, contributor, users } = this.props;
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
          {this.state.submissions
            .sort((a, b) => a.createdAt - b.createdAt)
            .map(submission => (
              <StyledSubmission key={submission.id}>
                <StyledAuthorWrapper>
                  <Avatar
                    src={users[submission.author].photoURL}
                    alt={users[submission.author].displayName}
                  />
                  <div>
                    <p className="author-name">{contributor.displayName}</p>
                    <p className="author-date">{format(submission.createdAt, 'MMMM D, YYYY h:ma')}</p>
                  </div>
                </StyledAuthorWrapper>
                <StyledSolution
                  dangerouslySetInnerHTML={{
                    __html: marked(submission.solution),
                  }}
                />
              </StyledSubmission>
            ))
          }
          <StyledForm onSubmit={this.handleSubmit}>
            <StyledTextArea
              name="solution"
              placeholder="Add your solution"
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
              onChange={this.handleChange}
              value={this.state.solution}
            />
            <StyledWhiteButton type="submit">Submit</StyledWhiteButton>
          </StyledForm>
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
