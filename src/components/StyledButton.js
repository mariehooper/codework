import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledButton = styled(Link)`
  background: #1ee4b7;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  color: #fff;
  display: inline-block;
  font-size: 15px;
  font-weight: 600;
  height: 40px;
  letter-spacing: 0.025em;
  line-height: 40px;
  padding: 0 14px;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }
`;

export default StyledButton;

export const StyledExternalLink = StyledButton.withComponent('a');

export const StyledButtonLink = styled.button`
  background: none;
  border: none;
  color: #00bcd4;

  &:hover {
    color: #1ed4d4;
    cursor: pointer;
    text-decoration: underline;
  }
`;
