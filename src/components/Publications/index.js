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
import './style.scss';
import { media, notebook } from '../size';

const Blocks = styled.div`
  padding-top: 15vh;
  width: 100%;
  height: 92vh;
  overflow-y: auto;

  ${media.lessThan('notebook')`
    padding-top: 0;
    height: 100%;
  `};
`;

const BackgroundStyleColor = styled(BackgroundColor)`
  ${media.lessThan('notebook')`
    height: 13vh;
  `};
`;

const BackgroundStyleColor2 = styled(BackgroundColor)`
  ${media.lessThan('notebook')`
    height: 100%;
  `};
`;

const EachBlock = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  margin-bottom: 5vh;
  color: white;
  font-size: 1.2vw;

  ${media.lessThan('notebook')`
    margin-bottom: 0;
    margin-top: 2vh;
  `};
`;

const LinkArea = styled.div`
  width: 100%;
  height: 20vh;
`;

const LinkBlock = styled.div`
  width: 100%;
  height: 50%;
  background-color: ${props => props.color};
  display: flex;
`;

const LinkText = styled.a`
  margin: auto;
  color: white;

  :hover {
    color: white;
  }
`;

class Publications extends Component {
  state = {
    publications: [],
  };

  componentWillMount() {
    // const { token } = localStorage;
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 1000,
    });

    ins
      .get('publications')
      .then(res => {
        // console.log(res);
        this.setState({ publications: res.data });

        console.log(this.state.publications);
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderPublications = () =>
    this.state.publications.map(
      ({
        id: publicationId,
        title,
        arXiv_url: arXivUrl,
        author,
        year,
        published_in,
      }) => (
        <EachBlock key={publicationId}>
          <Row type="flex">
            <Col span={20} color="#0B322B">
              <div className="textarea">
                <label>{year}</label>
                <h1>{title}</h1>
                <hr />
                <h3>
                  {author}, {published_in}
                </h3>
              </div>
            </Col>
            <Col span={4}>
              <LinkArea>
                <LinkBlock color="rgba(0, 0, 0, 0.3)">
                  <LinkText href={arXivUrl}>arXiv</LinkText>
                </LinkBlock>
                <LinkBlock color="rgba(0, 0, 0, 0.4)">
                  <LinkText>PDF</LinkText>
                </LinkBlock>
              </LinkArea>
            </Col>
          </Row>
        </EachBlock>
      )
    );

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
          <BackgroundStyleColor color="#aec3c2">
            <Logo xs={{ span: 0 }} xl={{ span: 0 }} content="Publications" />
            <Row
              xs={{ span: 24 }}
              xl={{ span: 0 }}
              style={{ padding: `${24}px` }}
              type="flex"
              justify="start"
              align="middle"
              gutter={8}
            >
              <Col xs={{ span: 6 }} xl={{ span: 0 }}>
                <h3 style={{ color: 'white' }}>Publications</h3>
              </Col>
              <Col xs={{ span: 4 }} xl={{ span: 0 }} offset={14}>
                <Drawer />
              </Col>
            </Row>
          </BackgroundStyleColor>
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 15 }} className="right">
          <MediaQuery query={`(max-width: ${notebook})`}>
            {matches => (!matches ? <Header fontColor="#9b9b9b" /> : <></>)}
          </MediaQuery>
          <Blocks>{this.renderPublications()}</Blocks>
        </Col>
      </Row>
    );
  }
}

export default Publications;
