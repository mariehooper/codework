import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Submission from './Submission';

const StyledSubmissionList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding-left: 0;
`;

export default function SubmissionList({ submissions }) {
  return (
    <StyledSubmissionList>
      {submissions
        .sort((a, b) => a.createdAt - b.createdAt)
        .map(submission => (
          <li key={submission.id}>
            <Submission submission={submission} />
          </li>
        ))
      }
    </StyledSubmissionList>
  );
}

SubmissionList.propTypes = {
  submissions: PropTypes.arrayOf(PropTypes.shape({
    createdAt: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
};
