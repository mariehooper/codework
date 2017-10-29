import PropTypes from 'prop-types';
import React from 'react';

import ChallengeImportForm from './ChallengeImportForm';
import ChallengeList from './ChallengeList';
import { StyledHomeContent } from './Content';
import ErrorMessage from './ErrorMessage';

export default function HomePage({ handleChange, handleSubmit, url, challenges, error, user }) {
  return (
    <StyledHomeContent>
      {error &&
        <ErrorMessage message={error} />
      }
      <ChallengeImportForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        url={url}
        user={user}
      />
      <ChallengeList challenges={challenges} />
    </StyledHomeContent>
  );
}

HomePage.propTypes = {
  challenges: PropTypes.array.isRequired,
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  user: PropTypes.object, // eslint-disable-line react/require-default-props
};

HomePage.defaultProps = {
  error: null,
};
