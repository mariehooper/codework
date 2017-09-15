import styled from 'styled-components';

export const StyledHomeContent = styled.main`
  margin: 0 auto;
  max-width: 45rem;
  padding-top: 1.5rem;
`;

export const StyledChallengeContent = StyledHomeContent.extend`
  display: flex;
  max-width: 75rem;
`;
