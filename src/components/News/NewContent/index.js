import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Col, Row } from 'antd';

import MarkdownEditor from '../../Share/MarkdownEditor';
import Drawer from '../../Share/Drawer';
import Header from '../../Share/Header';
import IconImg from '../../static/icon.png';
import settings from '../../../settings';
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
} from '../../Share';
import { media, notebook } from '../../size';

const Blocks = styled.div`
  padding-top: 15vh;
  width: 100%;
  height: 92vh;
  overflow-y: scroll;

  ${media.lessThan('notebook')`
    padding-top: 0;
    height: 100%;
  `};
`;

const BackgroundStyleColor = styled(BackgroundColor)`
  ${media.lessThan('notebook')`
    height: 60vh;
  `};
`;

const BackgroundStyleColor2 = styled(BackgroundColor)`
  ${media.lessThan('notebook')`
    height: 100%;
  `};
`;

const ImageArea = styled.div`
  width: 100%;
  height: 20vh;
  background: url(${props => props.image});
  background-size: cover;
  background-position: center center;
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

class NewContent extends Component {
  state = {
    news: '',
  };

  componentWillMount() {
    const {
      params: { news_id },
    } = this.props;
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 1000,
    });

    ins
      .get(`news/${news_id}`)
      .then(res => {
        //console.log(res);
        this.setState({ news: res.data });
      })
      .catch(error => {
        console.log(error);
      });
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

  render() {
    return (
      <Row>
        <Col xs={{ span: 24 }} xl={{ span: 9 }}>
          <BackgroundStyleColor color="#b3a1ba">
            <MainRow type="flex" justify="center">
              <LogoContent xs={{ span: 22 }} xl={{ span: 18 }}>
                <Row type="flex" justify="start" align="middle" gutter={8}>
                  <Col span={2.5}>
                    <IconStyleImage src={IconImg} />
                  </Col>
                  <Col span={3}>
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
                <TitleStyleText>{this.state.news.title}</TitleStyleText>
              </BigTitle>
              <MedContent span={12} color="#8c8c8c" />
              <Col span={6} />
            </MainRow>
          </BackgroundStyleColor>
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 15 }}>
          <BackgroundStyleColor2 color="white">
            <MediaQuery query={`(max-width: ${notebook})`}>
              {matches => (!matches ? <Header fontColor="#9b9b9b" /> : <></>)}
            </MediaQuery>
            <Blocks>
              <ImageArea image={this.state.news.image_url} />
              <MarkdownEditor content={this.state.news.content} readOnly />
            </Blocks>
          </BackgroundStyleColor2>
        </Col>
      </Row>
    );
  }
}

NewContent.propTypes = {
  params: PropTypes.shape({
    news_id: PropTypes.string.isRequired,
  }).isRequired,
};

export default NewContent;
