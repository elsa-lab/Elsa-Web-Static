import MediaQuery from 'react-responsive';
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Col, Row } from 'antd';

import Drawer from '../Share/Drawer';
import Header from '../Share/Header';
import MobileContent from '../Share/MobileContent';
import settings from '../../settings';
import { BackgroundColor, PageLink, Text, TextCol } from '../Share';
import Logo from '../Share/Logo';
import { media, xl, lg, md, sm } from '../size';

const Blocks = styled.div`
  padding-top: 15vh;
  width: 100%;
  height: 92vh;
  overflow-y: scroll;
  overflow-x: hidden;

  ${media.lessThan('md')`
    padding-top: 0;
    height: 100%;
  `};
`;

const BackgroundStyleColor = styled(BackgroundColor)`
  ${media.lessThan('md')`
    height: 13vh;
    position: fixed;
    z-index: 11;
  `};
`;

const EachBlock = styled.div`
  width: 100%;
  height: 20vh;
  background-color: rgba(0, 0, 0, 0.3);
  margin-bottom: 5vh;
  color: white;
  font-size: 1.2vw;

  ${media.lessThan('md')`
    margin-bottom: 0;
    margin-top: 2vh;
  `};
`;

const Title = styled.div`
  font-size: 2vw;
  padding-top: 1vh;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  ${media.lessThan('md')`
    font-size:5vw;
  `};
`;

const TextArea = styled.div`
  padding-left: 2.5vw;
  padding-right: 4vw;
  padding-top: 4.5vh;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;

  ${media.lessThan('md')`
    padding-top: 3.5vh;
    padding-left: 4vw;
    font-size:4vw;
  `};
`;

const ImageArea = styled.div`
  width: 100%;
  height: 20vh;
  background: url(${props => props.image});
  background-size: cover;
  background-position: center center;
`;

class News extends Component {
  state = {
    news: [],
  };

  componentWillMount() {
    // const { token } = localStorage;
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 1000,
    });

    ins
      .get('news')
      .then(res => {
        // console.log(res);
        this.setState({ news: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderNews = () => {
    if (this.state.news) {
      return this.state.news.map(
        ({ id: newsId, title, description, image_url: imageUrl }) => (
          <a key={newsId} href={`/news/${newsId}`}>
            <EachBlock>
              <Row type="flex">
                <Col span={12} xs={{ order: 2 }} xl={{ order: 1 }}>
                  <TextArea>
                    <Title>{title}</Title>
                    {description}
                  </TextArea>
                </Col>
                <Col span={12} xs={{ order: 1 }} xl={{ order: 2 }}>
                  <ImageArea image={imageUrl} />
                </Col>
              </Row>
            </EachBlock>
          </a>
        )
      );
    }
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
        <Col xs={24} md={9}>
          <BackgroundStyleColor color="#b3a1ba">
            <Logo content="News" />
          </BackgroundStyleColor>
        </Col>
        <Col xs={24} md={15}>
          <MediaQuery query={`(max-width: ${md})`}>
            {matches => (!matches ? <Header fontColor="#9b9b9b" /> : <></>)}
          </MediaQuery>
          <Blocks>
            <MobileContent color="#b3a1ba" content="News" />
            {this.renderNews()}
          </Blocks>
        </Col>
      </Row>
    );
  }
}

export default News;
