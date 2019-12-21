import MediaQuery from 'react-responsive';
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import { Link } from 'react-router';

import BackgroundCourses from '../static/home/Courses.jpg';
import BackgroundNews from '../static/home/News.jpg';
import BackgroundProjects from '../static/home/Projects.jpg';
import BackgroundPublications from '../static/home/Publications.jpg';
import { media, xl, lg, md, sm } from '../size';

import FullPage from './FullPage';

const EntryLink = styled.div`
  position: absolute;
  padding-left: 3.5vw;
  padding-right: 3.5vw;
  width: 100%;
  top: 70%;

  ${media.lessThan('md')`
    padding: 0;
    top: 40%;
  `};
`;

const ImageEntry = styled.img`
  width: 100%;
  border: 5px white solid;

  ${media.lessThan('md')`
    border: 0;
  `};
`;

const LittleTitle = styled.div`
  font-size: 6vw;
  color: white;
`;

const EachTitleEntry = styled.div`
  background-color: ${props => props.color};
  width: 100%;
  height: 100%;
  color: #8c8c8c;
  padding-top: 8vh;
  padding-left: 5vw;
`;

const BlackLayer = styled.div`
  background-color: rgba(0, 0, 0, 0);
  color: rgba(0, 0, 0, 0);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.3s;

  :hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const Text = styled.div`
  font-size: 1.5vw;
  text-align: center;
  line-height: 20vh;
  margin: auto;
  width: 100%;
  height: 100%;
  transition: 0.3s;

  :hover {
    color: rgba(255, 255, 255, 1);
  }
`;

const EachLink = styled(Link)`
  color: rgba(0, 0, 0, 0);
  text-decoration: none !important;
  pointer-events: auto;
  cursor: pointer;

  :hover {
    color: rgba(0, 0, 0, 0);
  }
`;

const EachLinkMob = styled(EachLink)`
  pointer-events: none;
  cursor: default;

  ${media.lessThan('md')`
    pointer-events: auto;
    cursor: pointer;
  `};
`;

class Home extends Component {
  state = {
    current: 0,
  };

  changeBackground = index => {
    this.setState({
      current: index,
    });
  };

  render() {
    const { current } = this.state;

    return (
      <Fragment>
        <FullPage current={current} />
        <EntryLink>
          <Row type="flex" justify="space-around">
            <Col xs={12} md={0}>
              <EachLinkMob to="/projects">
                <EachTitleEntry color="rgba(137, 155, 206, 0.8)">
                  <LittleTitle>Projects</LittleTitle>
                </EachTitleEntry>
              </EachLinkMob>
            </Col>
            <Col xs={12} md={4}>
              <ImageEntry src={BackgroundCourses} />
              <MediaQuery query={`(max-width: ${md})`}>
                {matches =>
                  !matches ? (
                    <BlackLayer
                      onMouseEnter={() => this.changeBackground(1)}
                      onMouseLeave={() => this.changeBackground(0)}
                    >
                      <EachLink to="/courses">
                        <Text>Courses</Text>
                      </EachLink>
                    </BlackLayer>
                  ) : (
                    <></>
                  )
                }
              </MediaQuery>
            </Col>
            <Col xs={12} md={4}>
              <ImageEntry src={BackgroundPublications} />
              <MediaQuery query={`(max-width: ${md})`}>
                {matches =>
                  !matches ? (
                    <BlackLayer
                      onMouseEnter={() => this.changeBackground(2)}
                      onMouseLeave={() => this.changeBackground(0)}
                    >
                      <EachLink to="/publications">
                        <Text>Publications</Text>
                      </EachLink>
                    </BlackLayer>
                  ) : (
                    <></>
                  )
                }
              </MediaQuery>
            </Col>
            <Col xs={12} md={0}>
              <EachTitleEntry color="rgba(160, 137, 169, 0.8)">
                <LittleTitle>News</LittleTitle>
              </EachTitleEntry>
            </Col>
            <Col xs={12} md={0}>
              <EachLinkMob to="/courses">
                <EachTitleEntry color="#e9ce9b">
                  <LittleTitle>Courses</LittleTitle>
                </EachTitleEntry>
              </EachLinkMob>
            </Col>
            <Col xs={12} md={4}>
              <ImageEntry src={BackgroundProjects} />
              <MediaQuery query={`(max-width: ${md})`}>
                {matches =>
                  !matches ? (
                    <BlackLayer
                      onMouseEnter={() => this.changeBackground(3)}
                      onMouseLeave={() => this.changeBackground(0)}
                    >
                      <EachLink to="/projects">
                        <Text>Projects</Text>
                      </EachLink>
                    </BlackLayer>
                  ) : (
                    <></>
                  )
                }
              </MediaQuery>
            </Col>
            <Col xs={12} md={4}>
              <ImageEntry src={BackgroundNews} />
              <MediaQuery query={`(max-width: ${md})`}>
                {matches =>
                  !matches ? (
                    <BlackLayer
                      onMouseEnter={() => this.changeBackground(4)}
                      onMouseLeave={() => this.changeBackground(0)}
                    >
                      <EachLink to="/news">
                        <Text>News</Text>
                      </EachLink>
                    </BlackLayer>
                  ) : (
                    <></>
                  )
                }
              </MediaQuery>
            </Col>
            <Col xs={12} md={0}>
              <EachTitleEntry color="rgba(154, 180, 179, 0.8)">
                <LittleTitle>Publications</LittleTitle>
              </EachTitleEntry>
            </Col>
          </Row>
        </EntryLink>
      </Fragment>
    );
  }
}

export default Home;
