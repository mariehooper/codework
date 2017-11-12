import marked from 'marked';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';

import Avatar from './Avatar';
import Card, { CardBody } from './Card';

const StyledAuthorWrapper = styled.div`
  align-items: center;
  display: flex;

  .author-name {
    font-size: 0.8rem;
    margin: 0 0 0.2rem;
  }

  .author-date {
    font-size: 0.75rem;
    margin: 0;
  }
`;

export default function Submission({ submission }) {
  return (
    <Card margin="0.5rem" padding="1rem">
      <StyledAuthorWrapper>
        <Avatar
          src={submission.author.photoURL}
          alt={submission.author.displayName}
        />
        <div>
          <p className="author-name">{submission.author.displayName}</p>
          <p className="author-date">{format(submission.createdAt, 'MMMM D, YYYY h:mma')}</p>
        </div>
      </StyledAuthorWrapper>
      <CardBody
        dangerouslySetInnerHTML={{
          __html: marked(submission.solution),
        }}
      />
    </Card>
  );
}

Submission.propTypes = {
  submission: PropTypes.shape({
    author: PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      photoURL: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    solution: PropTypes.string.isRequired,
  }).isRequired,
};
