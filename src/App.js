import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
  background-color: #FFF;
  border-bottom: 1px solid #eee;
  padding: 1rem;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const Content = styled.main`
  max-width: 720px;
  margin: 0 auto;
  padding-top: 2rem;
`;

const ChallengeList = styled.ul`
  padding-left: 0;
  list-style-type: none;
`;

const ChallengeCard = styled.li`
  margin: 0.5rem 0;
  padding: 1rem 2rem;
  box-shadow: 0 1px 4px rgba(0,0,0,.04);
  border: 1px solid rgba(0,0,0,.09);
  border-radius: 3px;
`;

const ChallengeSubmitWrap = styled.div`
  padding: 1.5rem;
  border: 1px solid #e6dbef;
  background: #f8f0ff;
  border-radius: 3px;
`;

const InputWrap = styled.div`
  display: flex;
  box-shadow: 0 1px 3px rgba(50,50,93,.15), 0 1px 0 rgba(0,0,0,.02);
  border-radius: 4px;
  overflow: hidden;
  label {
    flex: 1;
  }
  input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: none;
  }
  button {
    background: white;
    border: none;
    font-size: 0.9rem;
    padding: 0.75rem 1rem;
    position: relative;
    color: #673ab7;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 7px;
      bottom: 7px;
      width: 2px;
      background: #f2eaf7;
    }
  }
`;

export default class App extends React.Component {
  state = {
    challenges: ['Challenge 1', 'Challenge 2'],
    url: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      challenges: [...this.state.challenges, this.state.url],
      url: '',
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div className="wrapper">
        <Header>
          <PageTitle>Programming Challenges</PageTitle>
        </Header>
        <Content className="content">
          <form onSubmit={this.handleSubmit}>
            <ChallengeSubmitWrap>
              <InputWrap className="input-wrap">
                <label htmlFor="challenge-url">
                  <input
                    type="text"
                    id="challenge-url"
                    value={this.state.url}
                    name="url"
                    onChange={this.handleChange}
                    placeholder="CodeWars Challenge URL"
                  />
                </label>
                <button type="submit">Import</button>
              </InputWrap>
            </ChallengeSubmitWrap>
          </form>
          <ChallengeList className="challenge-list">
            {this.state.challenges.map(challenge => (
              <ChallengeCard className="challenge" key={challenge}>
                {challenge}
              </ChallengeCard>
            ))}
          </ChallengeList>
        </Content>
      </div>
    );
  }
}
