import PropTypes from 'prop-types';
import React from 'react';

import ChallengeImportForm from './ChallengeImportForm';
import ChallengeList from './ChallengeList';
import { StyledHomeContent } from './Content';
import ErrorMessage from './ErrorMessage';

export default function HomePage({ handleChange, handleSubmit, url, challenges, users, error }) {
  return (
    <StyledHomeContent>
      {error &&
        <ErrorMessage message={error} />
      }
      <ChallengeImportForm handleChange={handleChange} handleSubmit={handleSubmit} url={url} />
      <ChallengeList challenges={challenges} users={users} />
    </StyledHomeContent>
  );
}

HomePage.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  challenges: PropTypes.array.isRequired,
  users: PropTypes.object.isRequired,
  error: PropTypes.string,
};

HomePage.defaultProps = {
  error: null,
};
