import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';

import IconImg from '../static/icon.png';
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
import { media } from '../size';

import {
  backgroundColorInvertMap,
  backgroundImageMap,
  bigTitleMap,
  medContentMap,
} from './StyleMap';

const BackgroundImage = styled.div`
  background: url(${props => props.image});
  background-size: cover;
  height: 100vh;
  width: 100%;
  transition: 0.3s;
`;

const BackgroundStyleColor = styled(BackgroundColor)`
  background-color: #333;
  ${media.lessThan('md')`
    height: initial;
  `};
`;

const OtherLink = styled(Col)`
  margin-top: 5vh;
`;

const TitleStyleText = styled(TitleText)`
  ${media.lessThan('md')`
    font-size: 10vw;
  `};
`;

const IconStyleImage = styled(IconImage)`
  width: 35px;
  ${media.lessThan('md')`
    width: 35px;
  `};
`;

class FullPage extends Component {
  renderLogin = () => {
    const { token } = localStorage;
    if (token) {
      return (
        <PageLink to="/account">
          <Text color="black">Account</Text>
        </PageLink>
      );
    }
    return (
      <div>
        <PageLink to="/login">
          <Text color="black">Sign in</Text>
        </PageLink>
        <PageLink to="/register">
          <Text color="black">Sign up</Text>
        </PageLink>
      </div>
    );
  };

  renderOtherBlock = current => (
    <Row>
      <TextCol span={24}>
        <PageLink to="/about">
          <Text color="black">About</Text>
        </PageLink>
      </TextCol>
      <TextCol span={24}>{this.renderLogin(current)}</TextCol>
    </Row>
  );

  render() {
    const { current } = this.props;

    return (
      <Row>
        <Col xs={24} md={9}>
          <BackgroundStyleColor>
            <MainRow type="flex" justify="start">
              <LogoContent xs={24} md={18}>
                <Row type="flex" justify="start" align="middle" gutter={5}>
                  <Col>
                    <IconStyleImage src={IconImg} />
                  </Col>
                  <Col>
                    <Title1>NTHU</Title1>
                    <Title2>ELSA</Title2>
                  </Col>
                  <Col xs={3} md={0} offset={15}>
                    {this.renderOtherBlock()}
                  </Col>
                </Row>
              </LogoContent>
              <SmallContent xs={0} md={24} color="#a9a9a9">
                <Row type="flex" justify="start" align="middle">
                  <Hr color={backgroundColorInvertMap[current]} />
                  Professor : Chun-Yi Lee
                </Row>
              </SmallContent>
              <MedContent xs={0} md={14} color="#a9a9a9">
                {medContentMap[current]}
              </MedContent>
              <OtherLink xs={0} md={4} offset={1}>
                {this.renderOtherBlock(current)}
              </OtherLink>
            </MainRow>
          </BackgroundStyleColor>
          <BigTitle xs={20} md={18}>
            <TitleStyleText>
              {current !== 0 ? <br /> : ''}
              {bigTitleMap[current]}
            </TitleStyleText>
          </BigTitle>
        </Col>
        <Col xs={0} md={15}>
          <BackgroundImage image={backgroundImageMap[current]} />
        </Col>
      </Row>
    );
  }
}

FullPage.propTypes = {
  current: PropTypes.number.isRequired,
};

export default FullPage;
