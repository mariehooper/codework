import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import ChallengeCard from './ChallengeCard';

const StyledChallengeList = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

export default function ChallengeList({ challenges, users }) {
  return (
    <StyledChallengeList>
      {challenges
        .sort((a, b) => b.createdAt - a.createdAt)
        .map(challenge => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            user={users[challenge.contributor]}
          />
        ))
      }
    </StyledChallengeList>
  );
}

ChallengeList.propTypes = {
  challenges: PropTypes.array.isRequired,
  users: PropTypes.object.isRequired,
};
