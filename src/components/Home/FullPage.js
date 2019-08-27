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
  medColorMap,
  medContentMap,
  otherColorMap,
  smallContentMap,
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
  ${media.lessThan('notebook')`
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    height: 70vh;
  `};
`;

const OtherLink = styled(Col)`
  margin-top: 5vh;
`;

const TitleStyleText = styled(TitleText)`
  ${media.lessThan('notebook')`
    font-size: 10vw;
  `};
`;

const IconStyleImage = styled(IconImage)`
  ${media.lessThan('notebook')`
    width: 8vw;
  `};
`;

class FullPage extends Component {
  renderLogin = current => {
    const { token } = localStorage;
    if (token) {
      return (
        <PageLink to="/account">
          <Text color={otherColorMap[current]}>Account</Text>
        </PageLink>
      );
    }
    return (
      <PageLink to="/login">
        <Text color={otherColorMap[current]}>Sign in</Text>
      </PageLink>
    );
  };

  renderOtherBlock = current => (
    <Row>
      <TextCol span={24}>
        <PageLink to="/about">
          <Text color={otherColorMap[current]}>About Elsa Lab</Text>
        </PageLink>
      </TextCol>
      <TextCol span={24}>{this.renderLogin(current)}</TextCol>
    </Row>
  );

  render() {
    const { current } = this.props;

    return (
      <Row>
        <Col xs={{ span: 24 }} xl={{ span: 9 }}>
          <BackgroundStyleColor>
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
                  <Col xs={{ span: 10 }} xl={{ span: 0 }} offset={8}>
                    {this.renderOtherBlock()}
                  </Col>
                </Row>
              </LogoContent>
              <SmallContent
                xs={{ span: 22 }}
                xl={{ span: 18 }}
                color={backgroundColorInvertMap[current]}
              >
                <Row type="flex" justify="start" align="bottom">
                  <Col span={6}>
                    <Hr color={backgroundColorInvertMap[current]} />
                  </Col>
                  <Col span={12} offset={1}>
                    {smallContentMap[current]}
                  </Col>
                </Row>
              </SmallContent>
              <BigTitle xs={{ span: 20 }} xl={{ span: 18 }}>
                <TitleStyleText>
                  {current !== 0 ? <br /> : ''}
                  {bigTitleMap[current]}
                </TitleStyleText>
              </BigTitle>
              <Col xs={{ span: 2 }} xl={{ span: 0 }} />
              <MedContent span={12} color={medColorMap[current]}>
                {medContentMap[current]}
              </MedContent>
              <Col xs={{ span: 10 }} xl={{ span: 0 }} />
              <OtherLink xs={{ span: 0 }} xl={{ span: 6 }}>
                {this.renderOtherBlock(current)}
              </OtherLink>
            </MainRow>
          </BackgroundStyleColor>
        </Col>
        <Col xs={{ span: 0 }} xl={{ span: 15 }}>
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
