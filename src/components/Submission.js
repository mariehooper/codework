import marked from 'marked';
import PropTypes from 'prop-types';
import React from 'react';

import Card, { CardBody } from './Card';
import Metadata from './Metadata';

export default function Submission({ submission }) {
  return (
    <Card margin="0.5rem" padding="1rem">
      <Metadata data={submission} showTime />
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
    solution: PropTypes.string.isRequired,
  }).isRequired,
};
