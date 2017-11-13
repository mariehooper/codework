import marked from 'marked';
import PropTypes from 'prop-types';
import React from 'react';

import Card, { CardHeader, CardTitle, CardBody, CardFooter } from './Card';
import LevelIndicator from './LevelIndicator';
import Metadata from './Metadata';
import TagList from './TagList';

export default function Challenge({ challenge, link, tags }) {
  return (
    <Card>
      <CardHeader>
        <Metadata data={challenge} />
        <LevelIndicator points={challenge.points} />
      </CardHeader>
      <CardTitle>{challenge.name}</CardTitle>
      <CardBody
        dangerouslySetInnerHTML={{
          __html: marked(challenge.description),
        }}
      />
      {tags &&
        <TagList tags={tags} />
      }
      <CardFooter>
        <span>{challenge.numSubmissions} solutions</span>
        {link}
      </CardFooter>
    </Card>
  );
}

Challenge.propTypes = {
  challenge: PropTypes.shape({
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    numSubmissions: PropTypes.number.isRequired,
    points: PropTypes.string.isRequired,
  }).isRequired,
  link: PropTypes.element,
  tags: PropTypes.array,
};

Challenge.defaultProps = {
  link: null,
  tags: null,
};
