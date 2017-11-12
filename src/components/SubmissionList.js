import marked from 'marked';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';

import Avatar from './Avatar';

const StyledSubmissionList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding-left: 0;
`;

const StyledSubmission = styled.li`
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 6px 8px rgba(102, 119, 136, 0.03), 0 1px 2px rgba(102, 119, 136, 0.3);
  margin-bottom: 0.5rem;
  padding: 1rem;
`;

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

const StyledSolution = styled.article`
  font-size: 0.9rem;
  line-height: 1.5;

  h1 {
    font-size: 1.25rem;
  }

  h2 {
    font-size: 1.2rem;
  }
`;

export default function SubmissionList({ submissions }) {
  return (
    <StyledSubmissionList>
      {submissions
        .sort((a, b) => a.createdAt - b.createdAt)
        .map(submission => (
          <StyledSubmission key={submission.id}>
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
            <StyledSolution
              dangerouslySetInnerHTML={{
                __html: marked(submission.solution),
              }}
            />
          </StyledSubmission>
        ))
      }
    </StyledSubmissionList>
  );
}

SubmissionList.propTypes = {
  submissions: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      photoURL: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    solution: PropTypes.string.isRequired,
  })),
};

SubmissionList.defaultProps = {
  submissions: null,
};
