import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 45rem;
  padding-top: 1rem;
  text-align: center;
`;

const StyledPageTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

export default function Header({ authLink }) {
  return (
    <StyledHeader>
      <StyledPageTitle>Programming Challenges</StyledPageTitle>
      {authLink}
    </StyledHeader>
  );
}

Header.propTypes = {
  authLink: PropTypes.element.isRequired,
};
