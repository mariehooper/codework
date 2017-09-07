import PropTypes from 'prop-types';
import React from 'react';

import ChallengeImportForm from './ChallengeImportForm';
import ChallengeList from './ChallengeList';

export default function HomePage({ handleChange, handleSubmit, url, challenges, users }) {
  return (
    <div>
      <ChallengeImportForm handleChange={handleChange} handleSubmit={handleSubmit} url={url} />
      <ChallengeList challenges={challenges} users={users} />
    </div>
  );
}

HomePage.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  challenges: PropTypes.array.isRequired,
  users: PropTypes.object.isRequired,
};
