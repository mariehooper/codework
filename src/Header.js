import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  padding: 1rem;
  text-align: center;
`;

const StyledPageTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

export default function Header() {
  return (
    <StyledHeader>
      <StyledPageTitle>Programming Challenges</StyledPageTitle>
    </StyledHeader>
  );
}
