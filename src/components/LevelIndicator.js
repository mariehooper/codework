import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

function getLevel(points) {
  switch (points) {
    case 8:
      return { text: 'Beginner', color: '#58D68D' };
    case 7:
    case 6:
      return { text: 'Intermediate', color: '#ffeb3b' };
    default:
      return { text: 'Advanced', color: '#f44336' };
  }
}

const StyledLevelIndicator = styled.span`
  color: #8898aa;
  font-size: 0.875rem;
  font-weight: 500;

  &::before {
    background-color: ${props => props.color};
    border-radius: 50%;
    content: ' ';
    display: inline-block;
    height: 10px;
    margin-right: 0.25rem;
    width: 10px;
  }
`;

export default function LevelIndicator({ points }) {
  const { text, color } = getLevel(parseInt(points, 10));
  return (
    <StyledLevelIndicator color={color}>
      <span>{text}</span>
    </StyledLevelIndicator>
  );
}

LevelIndicator.propTypes = {
  points: PropTypes.string.isRequired,
};
