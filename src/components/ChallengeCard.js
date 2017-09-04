import marked from 'marked';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledChallengeCard = styled.li`
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 3px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  margin: 0.5rem 0;
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

const StyledAvatar = styled.div`
  border-radius: 50%;
  margin-right: 0.5rem;
  overflow: hidden;
  width: 2.5rem;

  img {
    display: block;
    height: 2.5rem;
    object-fit: cover;
    width: 100%;
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
`;

export default function ChallengeCard({ challenge }) {
  return (
    <StyledChallengeCard>
      <StyledCardTop>
        <StyledContributorWrapper>
          <StyledAvatar>
            <img src="https://unsplash.it/100/200" alt="" />
          </StyledAvatar>
          <div>
            <p>Marie Hooper</p>
            <p>August 31, 2017</p>
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
    </StyledChallengeCard>
  );
}

ChallengeCard.propTypes = {
  challenge: PropTypes.shape({
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    points: PropTypes.string.isRequired,
  }).isRequired,
};
