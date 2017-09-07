import marked from 'marked';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';

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

const StyledCardBottom = styled.div`
  display: block;
  margin-top: 1rem;
  text-align: right;
`;

const StyledButton = styled(Link)`
  background: #1ee4b7;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  color: #fff;
  display: inline-block;
  font-size: 15px;
  font-weight: 600;
  height: 40px;
  letter-spacing: 0.025em;
  line-height: 40px;
  padding: 0 14px;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }
`;

export default function ChallengeCard({ challenge, user }) {
  return (
    <StyledChallengeCard>
      <StyledCardTop>
        <StyledContributorWrapper>
          <StyledAvatar>
            <img src={user.photoURL} alt={user.displayName} />
          </StyledAvatar>
          <div>
            <p>{user.displayName}</p>
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
      <StyledCardBottom>
        <StyledButton to={`challenge/${challenge.id}`}>Solve</StyledButton>
      </StyledCardBottom>
    </StyledChallengeCard>
  );
}

ChallengeCard.propTypes = {
  challenge: PropTypes.shape({
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    points: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
  }).isRequired,
};
