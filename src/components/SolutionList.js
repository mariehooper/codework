import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Solution from './Solution';

const StyledSolutionList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding-left: 0;
`;

export default function SolutionList({ solutions }) {
  return (
    <StyledSolutionList>
      {solutions
        .sort((a, b) => a.createdAt - b.createdAt)
        .map(solution => (
          <li key={solution.id}>
            <Solution solution={solution} />
          </li>
        ))
      }
    </StyledSolutionList>
  );
}

SolutionList.propTypes = {
  solutions: PropTypes.arrayOf(PropTypes.shape({
    createdAt: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
};
