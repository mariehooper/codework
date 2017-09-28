import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Avatar from './Avatar';
import Dropdown from './Dropdown';
import { StyledButtonLink } from './StyledButton';

const StyledHeader = styled.header`
  background: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  padding: 0.75rem;
`;

const StyledHeaderWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 75rem;
`;

const StyledPageTitle = styled(Link)`
  text-decoration: none;

  h1 {
    color: #00bcd4;
    font-size: 1.5rem;
    margin: 0;
  }

  span {
    color: #ccc;
  }
`;

const StyledAccountDropdown = styled.div`
  align-items: center;
  display: flex;
  font-size: 0.9rem;
  position: relative;
`;

export default class Header extends React.Component {
  renderDropdownTrigger() {
    const { displayName, photoURL } = this.props.user;
    return (
      <StyledAccountDropdown>
        <Avatar src={photoURL} alt={displayName} size="small" />
        <span>{displayName}</span>
      </StyledAccountDropdown>
    );
  }

  renderUserMenu() {
    const { user, signIn, signOut } = this.props;
    if (user) {
      return (
        <Dropdown trigger={this.renderDropdownTrigger()}>
          <StyledButtonLink onClick={signOut}>Sign out</StyledButtonLink>
        </Dropdown>
      );
    }

    if (user === null) {
      return <StyledButtonLink onClick={signIn}>Sign in</StyledButtonLink>;
    }

    return null;
  }

  render() {
    return (
      <StyledHeader>
        <StyledHeaderWrapper>
          <StyledPageTitle to="/"><h1>Co<span>de</span>work</h1></StyledPageTitle>
          {this.renderUserMenu()}
        </StyledHeaderWrapper>
      </StyledHeader>
    );
  }
}

Header.propTypes = {
  user: PropTypes.shape({ // eslint-disable-line react/require-default-props
    displayName: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
  }),
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};
