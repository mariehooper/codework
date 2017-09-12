import PropTypes from 'prop-types';
import React from 'react';

import ChallengeCard from './ChallengeCard';

export default function ChallengePage({ challenge, user }) {
  return (
    <ChallengeCard
      key={challenge.id}
      challenge={challenge}
      user={user}
    />
  );
}

ChallengePage.propTypes = {
  challenge: PropTypes.shape({
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    points: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
  }).isRequired,
};
