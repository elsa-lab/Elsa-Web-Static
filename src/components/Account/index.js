import MediaQuery from 'react-responsive';
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Col, Row } from 'antd';

import Drawer from '../Share/Drawer';
import Header from '../Share/Header';
import settings from '../../settings';
import Logo from '../Share/Logo';
import { BackgroundColor, PageLink, Text, TextCol } from '../Share';
import { media, notebook } from '../size';

import Person from './personal';

const BackgroundStyleColor = styled(BackgroundColor)`
  ${media.lessThan('notebook')`
    height: 45vh;
  `};
`;

class Account extends Component {
  state = {};

  componentWillMount() {
    const { user_id: userId, token } = localStorage;
    if (token) {
      const ins = axios.create({
        baseURL: settings.backend_url,
        timeout: 1000,
        headers: {
          Authorization: `JWT${token}`,
        },
      });

      ins
        .get(`user/${userId}`)
        .then(res => {
          // console.log(res);
          this.setState({ user: res.data });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

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

  renderProfile = () => {
    const { user } = this.state;
    if (user) {
      return user.profile.nick_name;
    }
    return <></>;
  };

  renderManagementLink = () => {
    const { user } = this.state;
    // console.log(this.state);
    if (user) {
      if (user.profile.studentType === '4') {
        return <Person />;
      } else {
        return <Person />;
      }
    }
  };

  render() {
    return (
      <Row id="account">
        <Col xs={{ span: 24 }} xl={{ span: 9 }}>
          <BackgroundStyleColor color="#ffaaad">
            <Logo
              xs={{ span: 0 }}
              xl={{ span: 0 }}
              content="Account"
              describe="Here is your information"
            />
          </BackgroundStyleColor>
        </Col>
        <Col className="right" xs={{ span: 24 }} xl={{ span: 15 }}>
          <MediaQuery query={`(max-width: ${notebook})`}>
            {matches => (!matches ? <Header fontColor="#f7f7f7" /> : <></>)}
          </MediaQuery>
          {this.renderManagementLink()}
        </Col>
      </Row>
    );
  }
}

export default Account;
