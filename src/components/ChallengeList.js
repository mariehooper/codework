import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import ChallengeCard from './ChallengeCard';

const StyledChallengeList = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

export default function ChallengeList({ challenges }) {
  return (
    <StyledChallengeList>
      {challenges
        .sort((a, b) => b.createdAt - a.createdAt)
        .map(challenge => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))
      }
    </StyledChallengeList>
  );
}

ChallengeList.propTypes = {
  challenges: PropTypes.array.isRequired,
};
