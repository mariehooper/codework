import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import ChallengeCard from './ChallengeCard';
import StyledButton from './StyledButton';

const StyledChallengeList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding-left: 0;
`;

export default function ChallengeList({ challenges }) {
  return (
    <StyledChallengeList>
      {challenges
        .sort((a, b) => b.createdAt - a.createdAt)
        .map(challenge => (
          <li key={challenge.id}>
            <ChallengeCard
              challenge={challenge}
              link={
                <StyledButton to={`challenge/${challenge.slug}`}>Solve</StyledButton>
              }
            />
          </li>
        ))
      }
    </StyledChallengeList>
  );
}

ChallengeList.propTypes = {
  challenges: PropTypes.arrayOf(PropTypes.shape({
    createdAt: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  })).isRequired,
};
