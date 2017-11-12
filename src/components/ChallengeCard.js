import marked from 'marked';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';

import Avatar from './Avatar';
import LevelIndicator from './LevelIndicator';

const StyledChallengeCard = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 6px 8px rgba(102, 119, 136, 0.03), 0 1px 2px rgba(102, 119, 136, 0.3);
  margin-bottom: 1.5rem;
  padding: 1.5rem;
`;

const StyledCardTop = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
`;

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

const StyledChallengeName = styled.h2`
  font-size: 1.25rem;
`;

const StyledDescription = styled.article`
  font-size: 0.9rem;
  line-height: 1.5;

  h1 {
    font-size: 1.25rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  a {
    word-break: break-word;
  }

  img {
    max-width: 100%;
  }
`;

const StyledCardBottom = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;

  span {
    color: #8898aa;
    font-size: 0.875rem;
    font-weight: 500;
  }
`;

const StyledTagList = styled.ul`
  list-style-type: none;
  margin: 2rem 0 0;
  padding-left: 0;
`;

const StyledTag = styled.li`
  background: #b6faff;
  border-radius: 2px;
  display: inline-block;
  font-size: 0.8rem;
  margin: 0.25rem 0.3rem;
  padding: 0.3rem 0.5rem;

  &:first-child {
    margin-left: 0;
  }
`;

export default function ChallengeCard({ challenge, link, tags }) {
  return (
    <StyledChallengeCard>
      <StyledCardTop>
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
      </StyledCardTop>
      <StyledChallengeName>{challenge.name}</StyledChallengeName>
      <StyledDescription
        dangerouslySetInnerHTML={{
          __html: marked(challenge.description),
        }}
      />
      {tags &&
        <StyledTagList>
          {tags.map(tag => <StyledTag key={tag}>{tag}</StyledTag>)}
        </StyledTagList>
      }
      <StyledCardBottom>
        <span>{challenge.numSubmissions} solutions</span>
        {link}
      </StyledCardBottom>
    </StyledChallengeCard>
  );
}

ChallengeCard.propTypes = {
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
  tags: PropTypes.arrayOf(PropTypes.string),
};

ChallengeCard.defaultProps = {
  link: null,
  tags: null,
};
