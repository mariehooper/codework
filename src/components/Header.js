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
    const { name, photoUrl } = this.props.user;
    return (
      <StyledAccountDropdown>
        <Avatar src={photoUrl} alt={name} size="small" />
        <span>{name}</span>
      </StyledAccountDropdown>
    );
  }

  renderUserMenu() {
    const { user, userIsLoading, signIn, signOut } = this.props;

    if (userIsLoading) {
      return null;
    }

    if (user) {
      return (
        <Dropdown trigger={this.renderDropdownTrigger()}>
          <StyledButtonLink onClick={signOut}>Sign out</StyledButtonLink>
        </Dropdown>
      );
    }

    return <StyledButtonLink onClick={signIn}>Sign in</StyledButtonLink>;
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
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photoUrl: PropTypes.string.isRequired,
  }),
  userIsLoading: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

Header.defaultProps = {
  user: null,
};
