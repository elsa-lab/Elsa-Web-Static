import MediaQuery from 'react-responsive';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import axios from 'axios';

import Drawer from '../Share/Drawer';
import Header from '../Share/Header';
import Logo from '../Share/Logo';
import MobileContent from '../Share/MobileContent';
import settings from '../../settings';
import { BackgroundColor, PageLink, Text, TextCol } from '../Share';
import { media, xl, lg, md, sm } from '../size';

const Blocks = styled.div`
  padding-top: 15vh;
  width: 100%;
  height: 92vh;
  overflow-y: auto;

  ${media.lessThan('md')`
    padding-top: 0;
    height: 100%;
  `};
`;

const BackgroundStyleColor = styled(BackgroundColor)`
  ${media.lessThan('md')`
    height: 13vh;
    z-index: 11;
    position: fixed;
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
  `};
`;
const Year = styled.div`
  margin-bottom: -1vh;
  font-weight: bold;
`;
const Title = styled.div`
  font-size: 1.6vw;
  padding-top: 1vh;

  ${media.lessThan('md')`
    padding-top: 1vh;
    font-size:4vw;
  `};
`;
const TextArea = styled.div`
  padding-left: 2.5vw;
  padding-right: 4vw;
  padding-top: 2vh;

  ${media.lessThan('md')`
    padding-top: 3.5vh;
    padding-left: 4vw;
    font-size:2vw;
  `};
`;
const ImageArea = styled.div`
  width: 100%;
  height: 20vh;
  background: url(${props => props.image});
  background-size: cover;
  background-position: center center;
`;

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
  }

  componentWillMount() {
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 1000,
    });

    ins
      .get('/projects')
      .then(res => {
        console.log(res.data);
        this.setState({
          projects: res.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderProject = () => {
    if (this.state.projects) {
      let isChangeOrder = false;
      return this.state.projects.map(
        ({ id, year, title, subtitle, image_url }) => {
          isChangeOrder = !isChangeOrder;
          return (
            <Link key={title} to={`/project/${id}`}>
              <EachBlock key={title}>
                <Row type="flex">
                  <Col
                    span={12}
                    xs={{ order: isChangeOrder ? 2 : 1 }}
                    xl={{ order: 1 }}
                  >
                    <TextArea>
                      <Year>{year}</Year>
                      <Title>{title}</Title>
                      <p>{subtitle}</p>
                    </TextArea>
                  </Col>
                  <Col
                    span={12}
                    xs={{ order: isChangeOrder ? 1 : 2 }}
                    xl={{ order: 2 }}
                  >
                    <ImageArea image={image_url} />
                  </Col>
                </Row>
              </EachBlock>
            </Link>
          );
        }
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
          <BackgroundStyleColor color="#a1afd8">
            <Logo content="Projects" />
          </BackgroundStyleColor>
        </Col>
        <Col xs={24} md={15}>
          <MediaQuery query={`(max-width: ${md})`}>
            {matches => (!matches ? <Header fontColor="#9b9b9b" /> : <></>)}
          </MediaQuery>
          <Blocks>
            <MobileContent color="#a1afd8" content="Project" />
            {this.renderProject()}
          </Blocks>
        </Col>
      </Row>
    );
  }
}

export default Projects;
