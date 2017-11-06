import React from 'react';
import styled from 'styled-components';

import StyledButton from './StyledButton';

const StyledErrorMessage = styled.div`
  margin: auto;
  max-width: 720px;
  padding: 3rem;
  text-align: center;

  p {
    margin-bottom: 2rem;
  }
`;


export default function ErrorPage() {
  return (
    <StyledErrorMessage>
      <h2>Page not found!</h2>
      <p>Sorry, but the page you were looking for could not be found.</p>
      <StyledButton to="/">Go Home</StyledButton>
    </StyledErrorMessage>
  );
}
