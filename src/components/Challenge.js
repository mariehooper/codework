import marked from 'marked';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';

import Avatar from './Avatar';
import Card, { CardHeader, CardTitle, CardBody, CardFooter } from './Card';
import LevelIndicator from './LevelIndicator';
import TagList from './TagList';

const StyledContributorWrapper = styled.div`
  align-items: center;
  display: flex;

  p {
    font-size: 0.8rem;
    margin: 0.2rem 0;

    &.post-date {
      font-size: 0.7rem;
    }
  }
`;

export default function Challenge({ challenge, link, tags }) {
  return (
    <Card>
      <CardHeader>
        <StyledContributorWrapper>
          <Avatar
            src={challenge.contributor.photoURL}
            alt={challenge.contributor.displayName}
          />
          <div>
            <p>{challenge.contributor.displayName}</p>
            <p>{format(challenge.createdAt, 'MMMM D, YYYY')}</p>
          </div>
        </StyledContributorWrapper>
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
    contributor: PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      photoURL: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    points: PropTypes.string.isRequired,
  }).isRequired,
  link: PropTypes.element,
  tags: PropTypes.array,
};

Challenge.defaultProps = {
  link: null,
  tags: null,
};
