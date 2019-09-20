import MediaQuery from 'react-responsive';
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Col, Input, Row } from 'antd';

import Drawer from '../Share/Drawer';
import Header from '../Share/Header';
import settings from '../../settings';
import Logo from '../Share/Logo';
import {
  BackgroundColor,
  MedContent,
  PageLink,
  Text,
  TextCol,
} from '../Share';
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
    height: 70vh;
  `};
`;

const UserInput = styled(Input)`
  background-color: #cfcfcf;
  width: 100%;
  height: 4vh;
  box-shadow: 0 0 0 100px white inset;
  -webkit-box-shadow: 0 0 0 100px white inset;
`;

const InputText = styled.div`
  font-weight: bold;
  color: white;
  margin-top: 1vh;
  margin-bottom: 1vh;
`;

const SubmitButton = styled.div`
  width: 40%;
  height: 4vh;
  line-height: 4vh;
  background-color: #535353;
  color: white;
  margin-left: auto;
  margin-top: 2vh;
  text-align: center;
  cursor: pointer;
`;

class Register extends Component {
  state = {
    username: '',
    password: '',
    confirm_password: '',
    message: '',
    nick_name: '',
    student_id: '',
    picture: null,
  };

  renderMessage = () => {
    if (this.state.message) {
      return <div className="message">{this.state.message}</div>;
    }
  };

  handleChange = (id, event) => {
    if (id === 'username') {
      this.setState({ username: event.target.value });
    } else if (id === 'password') {
      this.setState({ password: event.target.value });
    }

    switch (id) {
      case 'username':
        this.setState({ username: event.target.value });
        break;
      case 'password':
        this.setState({ password: event.target.value });
        break;
      case 'confirm_password':
        this.setState({ confirm_password: event.target.value });
        break;
      case 'nick_name':
        this.setState({ nick_name: event.target.value });
        break;
      case 'student_id':
        this.setState({ student_id: event.target.value });
        break;
      case 'picture':
        this.setState({ picture: event.target.files[0] })
      default:
    }
  };

  validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // console.log(re)
    return re.test(this.state.username);
  };

  validatePassword = () => this.state.password === this.state.confirm_password;

  validateForm = () => {
    const { username, password, student_id, nick_name, picture } = this.state;
    if (!(username && password && student_id && nick_name && picture)) {
      this.setState({ message: '有資料未填' });
      return false;
    } else if (!this.validateEmail()) {
      this.setState({ message: '不正確的 Email 格式' });
      return false;
    } else if (!this.validatePassword()) {
      this.setState({ message: '密碼不一致' });
      return false;
    }
    return true;
  };

  handleSubmit = event => {
    if (!this.validateForm()) return;
    console.log(this.state);
    const data = new FormData()
    data.append('username', this.state.username)
    data.append('email', this.state.username)
    data.append('password', this.state.password)
    data.append('student_id', this.state.student_id)
    data.append('nick_name', this.state.nick_name)
    data.append('picture', this.state.picture)
    console.log(data)
    const react_ins = this;
    axios
      .post(`${settings.backend_url}/users`, data)
      .then(response => {
        console.log(response);
        // redirect to user page
        if (response.data.type === 'error') {
          react_ins.setState({ message: response.data.message }, () =>
            setTimeout(() => react_ins.setState({ message: '' }), 2000)
          );
        } else {
          window.location = `${settings.root_url}/login`;
        }
      })
      .catch(error => {
        console.log(error);
        react_ins.setState({ message: 'Unknown error.' }, () =>
          setTimeout(() => react_ins.setState({ message: '' }), 2000)
        );
      });
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

  renderOtherBlock = () => (
    <Row type="flex" justify="end">
      <Col span={14}>
        <TextCol>
          <PageLink to="/about">
            <Text color="rgba(0, 0, 0, 0.4)">About Elsa Lab</Text>
          </PageLink>
        </TextCol>
        <TextCol>{this.renderLogin()}</TextCol>
      </Col>
      <Col span={5}>
        <Drawer />
      </Col>
    </Row>
  );

  render() {
    return (
      <Row>
        <MediaQuery query={`(max-width: ${notebook})`}>
          {matches => (!matches ? <Header fontColor="white" /> : <></>)}
        </MediaQuery>
        <Col xs={{ span: 24 }} xl={{ span: 9 }}>
          <BackgroundStyleColor color="#b0d4b6">
              <Logo content="Sign up"></Logo>
          </BackgroundStyleColor>
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 15 }}>
          <BackgroundStyleColor2 color="#98c8a0">
            <TeachBlock>
              <Row type="flex" justify="start" align="top">
                <Col xs={{ span: 18, offset: 2 }} xl={{ span: 10 }}>
                  {this.renderMessage()}
                  <InputText>Email</InputText>
                  <UserInput
                    size="large"
                    type="text"
                    value={this.state.username}
                    onChange={e => this.handleChange('username', e)}
                  />
              <InputText>Nick name</InputText>
                  <UserInput
                    size="large"
                    type="text"
                    value={this.state.nick_name}
                    onChange={e => this.handleChange('nick_name', e)}
                  />
                  <InputText>Password</InputText>
                  <UserInput
                    size="large"
                    type="password"
                    value={this.state.password}
                    onChange={e => this.handleChange('password', e)}
                  />
                  <InputText>Confirm Password</InputText>
                  <UserInput
                    size="large"
                    type="password"
                    value={this.state.confirm_password}
                    onChange={e => this.handleChange('confirm_password', e)}
                  />
                  <InputText>Student ID</InputText>
                  <UserInput
                    size="large"
                    type="text"
                    value={this.state.student_id}
                    onChange={e => this.handleChange('student_id', e)}
                  />
                  <InputText>Profile picture</InputText>
                  <input
                      type="file"
                      name="file"
                      accept="image/*"
                      onChange={e => this.handleChange('picture', e)}
                  />
                  <SubmitButton onClick={e => this.handleSubmit(e)} href="#">
                    Sign Up
                  </SubmitButton>
                </Col>
              </Row>
            </TeachBlock>
          </BackgroundStyleColor2>
        </Col>
      </Row>
    );
  }
}

export default Register;
