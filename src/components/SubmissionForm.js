import firebase from 'firebase';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { StyledForm } from './ChallengeImportForm';

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

export default class SubmissionForm extends React.Component {
  state = {
    solution: '',
  };

  saveSubmission = () => {
    const { user, submissionsRef } = this.props;
    submissionsRef.push({
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      solution: this.state.solution,
      author: user.uid,
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
    return (
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
    );
  }
}

SubmissionForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }),
  signIn: PropTypes.func.isRequired,
  submissionsRef: PropTypes.object,
};

SubmissionForm.defaultProps = {
  user: null,
  submissionsRef: {},
};
