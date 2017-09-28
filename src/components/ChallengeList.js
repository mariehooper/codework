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

export default function ChallengeList({ challenges, users }) {
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
              contributor={users[challenge.contributor]}
            />
          </li>
        ))
      }
    </StyledChallengeList>
  );
}

ChallengeList.propTypes = {
  challenges: PropTypes.array.isRequired,
  users: PropTypes.object.isRequired,
};
