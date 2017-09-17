import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledErrorMessage = styled.aside`
  background: #f65568;
  border-radius: 3px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  color: #fff;
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
`;

export default function ErrorMessage({ message }) {
  return (
    <StyledErrorMessage>
      <span>{message}</span>
    </StyledErrorMessage>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
