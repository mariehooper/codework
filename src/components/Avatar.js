import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledAvatar = styled.div`
  border-radius: 50%;
  margin-right: 0.5rem;
  overflow: hidden;
  width: ${props => props.size === 'small' ? '1.5rem' : '2.5rem'};

  img {
    display: block;
    height: ${props => props.size === 'small' ? '1.5rem' : '2.5rem'};
    object-fit: cover;
    width: 100%;
  }
`;

export default function Avatar({ src, alt, size }) {
  return (
    <StyledAvatar size={size}>
      <img src={src} alt={alt} />
    </StyledAvatar>
  );
}

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  size: PropTypes.string,
};

Avatar.defaultProps = {
  size: null,
};
