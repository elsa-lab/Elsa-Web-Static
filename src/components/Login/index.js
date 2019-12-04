import MediaQuery from 'react-responsive';
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import { Link } from 'react-router';

import './style.scss';

import Header from '../Share/Header';
import settings from '../../settings';
import Logo from '../Share/Logo';
import { BackgroundColor, PageLink, Text } from '../Share';
import { media, notebook } from '../size';

const TeachBlock = styled.div`
  width: 100%;
  float: right;
  margin-top: 20vh;
  padding-left: 5vw;

  ${media.lessThan('notebook')`
    margin-top: 3vh;
  `};
`;

const BackgroundStyleColor = styled(BackgroundColor)`
  ${media.lessThan('notebook')`
    height: 45vh;
  `};
`;

const BackgroundStyleColor2 = styled(BackgroundColor)`
  ${media.lessThan('notebook')`
    height: 55vh;
  `};
`;

const InputText = styled.div`
  font-weight: bold;
  color: white;
  margin-top: 1vh;
  margin-bottom: 1vh;
  display: inline-block;
`;

const ErrorText = styled.div`
  color: red;
  display: inline-block;
  margin-left: 1.2em;
`;

const SignUpLinkBlock = styled.div`
  background-color: rgba(161, 161, 161, 0.6);
  color: white;
  width: 100%;
  height: 4vh;
  font-size: 12px;
  line-height: 4vh;
  margin-top: 2vh;
  text-align: center;
  cursor: pointer;
`;

const SignUpLink = styled(Link)`
  text-decoration: none !important;
`;

class Login extends Component {
  state = {
    account: '',
    password: '',
    message: '',
    error: '',
  };

  renderMessage = () => {
    if (this.state.message) {
      return <div className="message">{this.state.message}</div>;
    }
  };

  handleChange = (id, event) => {
    if (id === 'account') {
      this.setState({ account: event.target.value });
    } else if (id === 'password') {
      this.setState({ password: event.target.value });
    }
  };

  handleSubmit = event => {
    axios
      .post(`${settings.backend_url}/api-token-auth/`, {
        username: this.state.account,
        password: this.state.password,
      })
      .then(
        response => {
          console.log(response.status);
          if (response.status === 400) {
            alert(`Please Try Again ! (${response.status})`);
          } else {
            const userId = response.data.user.id;
            localStorage.token = response.data.token;
            localStorage.user_id = userId;
            // redirect to user page
            if (
              settings.root_user_types.includes(
                response.data.user.profile.studentType
              )
            ) {
              window.location = `${settings.root_url}`;
            } else {
              window.location = `${settings.root_url}`;
            }
          }
        },
        error => {
          this.setState({ error: `錯誤代碼 : ${error.response.status}` });
        }
      );
    event.preventDefault();
  };

  renderLogin = () => {
    const { token } = localStorage;
    if (token) {
      return (
        <PageLink to="/logout">
          <Text color="rgba(0, 0, 0, 0.4)">Sign out</Text>
        </PageLink>
      );
    }
    return (
      <PageLink to="/login">
        <Text color="rgba(0, 0, 0, 0.4)">Sign in</Text>
      </PageLink>
    );
  };

  render() {
    return (
      <Row id="login">
        <Col xs={{ span: 24 }} xl={{ span: 9 }}>
          <BackgroundStyleColor color="#aac2ff">
            <Logo
              xs={{ span: 0 }}
              xl={{ span: 0 }}
              content="Login"
              describe={this.state.description}
            />
          </BackgroundStyleColor>
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 15 }}>
          <MediaQuery query={`(max-width: ${notebook})`}>
            {matches => (!matches ? <Header fontColor="white" /> : <></>)}
          </MediaQuery>
          <BackgroundStyleColor2 color="#6e7794">
            <TeachBlock>
              <Row type="flex" justify="start" align="top">
                <Col xs={{ span: 18, offset: 2 }} xl={{ span: 10 }}>
                  {this.renderMessage()}
                  <form onSubmit={e => this.handleSubmit(e)}>
                    <InputText>Email</InputText>
                    <ErrorText>{this.state.error}</ErrorText>
                    <input
                      size="large"
                      type="email"
                      required
                      value={this.state.account}
                      onChange={e => this.handleChange('account', e)}
                    />
                    <InputText>Password</InputText>
                    <input
                      size="large"
                      type="password"
                      required
                      value={this.state.password}
                      onChange={e => this.handleChange('password', e)}
                    />
                    <input
                      className="submitbtn"
                      type="submit"
                      value="Sign in"
                    />
                  </form>
                  <SignUpLink to="/register">
                    <SignUpLinkBlock color="dark">
                      Do not have an acoount ? Create one !
                    </SignUpLinkBlock>
                  </SignUpLink>
                </Col>
              </Row>
            </TeachBlock>
          </BackgroundStyleColor2>
        </Col>
      </Row>
    );
  }
}

export default Login;
