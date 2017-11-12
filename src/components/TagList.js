import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledTagList = styled.ul`
  list-style-type: none;
  margin: 2rem 0 0;
  padding-left: 0;
`;

const StyledTag = styled.li`
  background: #b6faff;
  border-radius: 2px;
  display: inline-block;
  font-size: 0.8rem;
  margin: 0.25rem 0.3rem;
  padding: 0.3rem 0.5rem;

  &:first-child {
    margin-left: 0;
  }
`;

export default function TagList({ tags }) {
  return (
    <StyledTagList>
      {tags.map(tag => (
        <StyledTag key={tag}>{tag}</StyledTag>
      ))}
    </StyledTagList>
  );
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};
