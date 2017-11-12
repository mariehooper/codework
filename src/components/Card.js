import styled from 'styled-components';

export default styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 6px 8px rgba(102, 119, 136, 0.03), 0 1px 2px rgba(102, 119, 136, 0.3);
  margin-bottom: ${props => props.margin || '1.5rem'};
  padding: ${props => props.padding || '1.5rem'};
`;

export const CardHeader = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
`;

export const CardTitle = styled.h2`
  font-size: 1.25rem;
`;

export const CardBody = styled.article`
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

export const CardFooter = styled.div`
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
