import marked from 'marked';
import PropTypes from 'prop-types';
import React from 'react';

import Card, { CardBody } from './Card';
import Metadata from './Metadata';

export default function Solution({ solution }) {
  return (
    <Card margin="0.5rem" padding="1rem">
      <Metadata data={solution} showTime />
      <CardBody
        dangerouslySetInnerHTML={{
          __html: marked(solution.content),
        }}
      />
    </Card>
  );
}

Solution.propTypes = {
  solution: PropTypes.shape({
    content: PropTypes.string.isRequired,
  }).isRequired,
};
