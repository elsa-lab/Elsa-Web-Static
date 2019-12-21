import MediaQuery from 'react-responsive';
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Col, Row } from 'antd';

import Header from '../Share/Header';
import settings from '../../settings';
import Logo from '../Share/Logo';
import MobileContent from '../Share/MobileContent';
import { BackgroundColor, PageLink, Text } from '../Share';
import '../style/publication.scss';
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

const EachBlock = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  margin-bottom: 5vh;
  color: white;
  font-size: 1.2vw;

  ${media.lessThan('md')`
    margin-bottom: 0;
    margin-top: 2vh;
  `};
`;

const LinkArea = styled.div`
  width: 100%;
  height: 100%;
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
            <Col xs={18} md={20} color="#0B322B">
              <div className="textarea">
                <text>{year}</text>
                <h1>{title}</h1>
                <hr />
                <h3>
                  {author}, {published_in}
                </h3>
              </div>
            </Col>
            <Col xs={6} md={4}>
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

  render() {
    return (
      <Row>
        <Col sm={24} md={9}>
          <BackgroundColor color="#aec3c2">
            <Logo content="Publications" describe={this.state.description} />
          </BackgroundColor>
        </Col>
        <Col sm={24} md={15} className="right">
          <MediaQuery query={`(max-width: ${md})`}>
            {matches => (!matches ? <Header fontColor="#9b9b9b" /> : <></>)}
          </MediaQuery>
          <Blocks>
            <MobileContent color="#aec3c2" content="Publication" />
            {/* <h1 id="conference">Conference</h1> */}
            {this.renderPublications()}
          </Blocks>
        </Col>
      </Row>
    );
  }
}

export default Publications;
