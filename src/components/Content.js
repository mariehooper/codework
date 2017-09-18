import styled from 'styled-components';

export const StyledHomeContent = styled.main`
  margin: 0 auto;
  max-width: 45rem;
  padding-top: 1.5rem;
  @media (max-width: 680px) {
    padding: 1rem;
  }
`;

export const StyledChallengeContent = StyledHomeContent.extend`
  display: flex;
  max-width: 75rem;
  @media (max-width: 680px) {
    display: block;
  }
`;
