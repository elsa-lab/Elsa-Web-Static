import MediaQuery from 'react-responsive';
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Col, Row } from 'antd';

import BackgroundImage from '../static/background_image_invert_vertical.jpg';
import Header from '../Share/Header';
import settings from '../../settings';
import Logo from '../Share/Logo';
import {
  BackgroundColor,
  PageLink,
  Text,
} from '../Share';
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
    height: 60vh;
  `};
`;

const EachBlock = styled.div`
  width: 100%;
  height: 20vh;
  background-color: rgba(0, 0, 0, 0.3);
  margin-bottom: 5vh;
  color: white;
  font-size: 1.2vw;

  ${media.lessThan('notebook')`
    margin-bottom: 0;
  `};
`;

const Year = styled.div`
  margin-bottom: -1vh;
  font-weight: bold;
`;

const Title = styled.div`
  font-size: 2vw;
  padding-top: 1vh;

  ${media.lessThan('notebook')`
    font-size:5vw;
  `};
`;

const TextArea = styled.div`
  padding-left: 2.5vw;
  padding-right: 4vw;
  padding-top: 4.5vh;

  ${media.lessThan('notebook')`
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

class Courses extends Component {
  state = {
    courses: '',
  };

goHome = () => {
    console.log("home")
}

componentWillMount() {
    const ins = axios.create({
        baseURL: settings.backend_url,
        timeout: 1000,
    });

    ins
      .get('/courses')
      .then(res => {
        // console.log(res.data);
        this.setState({ courses: res.data });
      })
      .catch(error => {
        console.log(error);
      });
}

renderClass = () => {
    if (this.state.courses) {
        return this.state.courses.map(({ id, title, description, year, season, location, course_no, time, lectures}) => {
          let isChangeOrder = false;
          let seasonText;
          isChangeOrder = !isChangeOrder;
          if(season === 0){
              seasonText = "下學期";
          } else {
              seasonText = "上學期";
          }
          return (
              <a key={id} href={`/courses/${id}`}>
                  <EachBlock>
                      <Row type="flex">
                          <Col
                              span={12}
                              xs={{ order: isChangeOrder ? 2 : 1 }}
                              xl={{ order: 1 }}
                              >
                              <TextArea>
                                  <Year>
                                      {year} {seasonText}
                                  </Year>
                                  <Title>{title}</Title>
                                  課程代號 : {course_no}
                              </TextArea>
                          </Col>
                          <Col
                              span={12}
                              xs={{ order: isChangeOrder ? 1 : 2 }}
                              xl={{ order: 2 }}
                              >
                              <ImageArea image={BackgroundImage} />
                          </Col>
                      </Row>
                  </EachBlock>
              </a>)
        });
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

render() {
    return (
        <Row>
            <MediaQuery query={`(max-width: ${notebook})`}>
                {matches => (!matches ? <Header fontColor="#9b9b9b" /> : <></>)}
            </MediaQuery>
            <Col xs={{ span: 24 }} xl={{ span: 9 }}>
                <BackgroundStyleColor color="#f8d188">
                    <Logo content="Courses"></Logo>
                </BackgroundStyleColor>
            </Col>
            <Col xs={{ span: 24 }} xl={{ span: 15 }}>
                <Blocks>{this.renderClass()}</Blocks>
            </Col>
        </Row>
    );
}
}

export default Courses;
