import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';

const StyledDropdownWrapper = styled.div`
  position: relative;
`;

const StyledDropdownMenu = styled.ul`
  background: white;
  border: 1px solid #eee;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  display: none;
  left: -0.375rem;
  list-style-type: none;
  margin: 0;
  padding-left: 0;
  position: absolute;
  top: 2.3rem;
  width: 100%;

  li {
    padding: 0.5rem;
  }

  &::before,
  &::after {
    content: '';
    display: inline-block;
    position: absolute;
  }

  &::before {
    border: 8px solid transparent;
    border-bottom-color: #eee;
    left: 9px;
    right: auto;
    top: -16px;
  }

  &::after {
    border: 7px solid transparent;
    border-bottom-color: #fff;
    left: 10px;
    right: auto;
    top: -14px;
  }
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
`;

class Dropdown extends React.Component {
  state = {
    showing: false,
  };

  toggleShowing = () => {
    this.setState({
      showing: !this.state.showing,
    });
  }

  handleClickOutside = () => {
    this.setState({
      showing: false,
    });
  }

  render() {
    const { trigger, children } = this.props;
    return (
      <StyledDropdownWrapper>
        <StyledButton onClick={this.toggleShowing}>
          {trigger}
        </StyledButton>
        <StyledDropdownMenu style={{ display: this.state.showing ? 'block' : 'none' }}>
          {React.Children.map(children, child => <li>{child}</li>)}
        </StyledDropdownMenu>
      </StyledDropdownWrapper>
    );
  }
}

Dropdown.propTypes = {
  trigger: PropTypes.element.isRequired,
  children: PropTypes.node.isRequired,
};

export default onClickOutside(Dropdown);
