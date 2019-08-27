import MediaQuery from 'react-responsive';
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Col, Row } from 'antd';

import Drawer from '../Share/Drawer';
import Header from '../Share/Header';
import IconImg from '../static/icon.png';
import settings from '../../settings';
import {
  BackgroundColor,
  BigTitle,
  Hr,
  IconImage,
  LogoContent,
  MainRow,
  MedContent,
  PageLink,
  SmallContent,
  Text,
  TextCol,
  Title1,
  Title2,
  TitleText,
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
    height: 55vh;
  `};
`;

const IconStyleImage = styled(IconImage)`
  ${media.lessThan('notebook')`
    width: 8vw;
  `};
`;

const TitleStyleText = styled(TitleText)`
  ${media.lessThan('notebook')`
    font-size: 10vw;
  `};
`;

const InfoTextArea = styled.div`
  font-size: 1vw;
  color: white;
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
          //console.log(res);
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
    if (user) {
      if (settings.root_user_types.includes(user.profile.studentType)) {
        return <PageLink to="/management">Management Page</PageLink>;
      }
    }
  };

  render() {
    return (
      <Row>
        <Col xs={{ span: 24 }} xl={{ span: 9 }}>
          <BackgroundStyleColor color="#ffaaad">
            <MainRow type="flex" justify="center">
              <LogoContent xs={{ span: 22 }} xl={{ span: 18 }}>
                <Row type="flex" justify="start" align="middle" gutter={8}>
                  <Col>
                    <IconStyleImage src={IconImg} />
                  </Col>
                  <Col>
                    <Title1>NTHU</Title1>
                    <Title2>ELSA</Title2>
                  </Col>
                  <Col xs={{ span: 14 }} xl={{ span: 0 }} offset={4}>
                    {this.renderOtherBlock()}
                  </Col>
                </Row>
              </LogoContent>
              <SmallContent xs={{ span: 22 }} xl={{ span: 18 }} color="#8c8c8c">
                <Row type="flex" justify="start" align="bottom">
                  <Col span={6}>
                    <Hr color="#8c8c8c" />
                  </Col>
                  <Col span={12} offset={1}>
                    Home
                  </Col>
                </Row>
              </SmallContent>
              <BigTitle xs={{ span: 22 }} xl={{ span: 18 }}>
                <TitleStyleText>Hello, {this.renderProfile()}</TitleStyleText>
              </BigTitle>
              <MedContent xs={{ span: 22 }} xl={{ span: 12 }} color="#8c8c8c">
                Here's your informations
              </MedContent>
              <Col span={6} />
            </MainRow>
          </BackgroundStyleColor>
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 15 }}>
          <BackgroundStyleColor2 color="#906262">
            <MediaQuery query={`(max-width: ${notebook})`}>
              {matches => (!matches ? <Header fontColor="white" /> : <></>)}
            </MediaQuery>
            <TeachBlock>
              <Row type="flex" justify="start" align="top">
                <Col xs={{ span: 18, offset: 2 }} xl={{ span: 10 }}>
                  <InfoTextArea>
                    {this.renderManagementLink()}

                    {/* <div>Your Cources</div>
                    <div>Your Messages</div>
                    <div>Your News</div> */}
                  </InfoTextArea>
                </Col>
              </Row>
            </TeachBlock>
          </BackgroundStyleColor2>
        </Col>
      </Row>
    );
  }
}

export default Account;
