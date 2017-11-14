import format from 'date-fns/format';
import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Avatar from './Avatar';

const MetadataWrapper = styled.div`
  align-items: center;
  display: flex;
`;

const Name = styled.p`
  font-size: 0.8125rem;
  margin: 0 0 0.2rem;
`;

const CreatedAt = styled.p`
  font-size: 0.75rem;
  margin: 0;
`;

export default class Metadata extends React.Component {
  state = {
    displayName: '',
    photoURL: '',
  };

  componentDidMount() {
    this.userRef = firebase.database().ref(`/users/${this.props.data.submittedBy}`);
    this.userRef.on('value', (snapshot) => {
      const { displayName, photoURL } = snapshot.val() || {};
      this.setState({ displayName, photoURL });
    });
  }

  componentWillUnmount() {
    this.userRef.off();
  }

  render() {
    const { data, showTime } = this.props;
    const dateFormat = showTime ? 'MMMM D, YYYY h:mma' : 'MMMM D, YYYY';
    return (
      <MetadataWrapper>
        <Avatar alt={this.state.displayName} src={this.state.photoURL} />
        <div>
          <Name>{this.state.displayName || <span>&nbsp;</span>}</Name>
          <CreatedAt>{format(data.createdAt, dateFormat)}</CreatedAt>
        </div>
      </MetadataWrapper>
    );
  }
}

Metadata.propTypes = {
  data: PropTypes.shape({
    submittedBy: PropTypes.string,
    createdAt: PropTypes.number.isRequired,
  }).isRequired,
  showTime: PropTypes.bool,
};

Metadata.defaultProps = {
  showTime: false,
};
