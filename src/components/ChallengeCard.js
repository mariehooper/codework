import marked from 'marked';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';

import Avatar from './Avatar';

const StyledChallengeCard = styled.div`
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 3px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
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
  font-weight: 300;
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
`;

const StyledCardBottom = styled.div`
  display: block;
  margin-top: 1rem;
  text-align: right;
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

export default function ChallengeCard({ challenge, link, contributor, tags }) {
  return (
    <StyledChallengeCard>
      <StyledCardTop>
        <StyledContributorWrapper>
          <Avatar src={contributor.photoURL} alt={contributor.displayName} />
          <div>
            <p>{contributor.displayName}</p>
            <p>{format(challenge.createdAt, 'MMMM D, YYYY')}</p>
          </div>
        </StyledContributorWrapper>
        <span>{challenge.points}</span>
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
      <StyledCardBottom>{link}</StyledCardBottom>
    </StyledChallengeCard>
  );
}

ChallengeCard.propTypes = {
  challenge: PropTypes.shape({
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    points: PropTypes.string.isRequired,
  }).isRequired,
  link: PropTypes.element,
  tags: PropTypes.array,
  contributor: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
  }).isRequired,
};

ChallengeCard.defaultProps = {
  link: null,
  tags: null,
};
