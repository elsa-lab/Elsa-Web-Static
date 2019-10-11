import MediaQuery from 'react-responsive';
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Col, Row } from 'antd';

import BackgroundImage from '../static/background_image_invert_vertical.jpg';
import Header from '../Share/Header';
import settings from '../../settings';
import Logo from '../Share/Logo';
import Drawer from '../Share/Drawer';
import { BackgroundColor, PageLink, Text } from '../Share';
import { media, notebook } from '../size';

import './style.scss';

const BackgroundStyleColor = styled(BackgroundColor)`
  ${media.lessThan('notebook')`
    height: 13vh;
    z-index: 11;
    box-shadow: 0px 1px 10px #0000004a;
  `};
`;

class Courses extends Component {
  state = {
    courses: '',
  };

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
      return this.state.courses.map(
        ({ id, title, year, season, course_no, loading_image }) => {
          let seasonText;
          if (season === 0) {
            seasonText = '下學期';
          } else {
            seasonText = '上學期';
          }
          return (
            <a key={id} href={`/courses/${id}`}>
              <div className="media mt-3 py-md-3 course-block align-items-center">
                <div className="img-area ml-md-3 mr-3">
                  <img
                    src={loading_image || BackgroundImage}
                    className="course-img"
                    alt=""
                  />
                </div>
                <div className="media-body my-1">
                  <h6>
                    {year} {seasonText}
                  </h6>
                  <h5>{title}</h5>
                  <h6 className="course-id">課程代號: {course_no}</h6>
                </div>
              </div>
            </a>
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

  render() {
    return (
      <Row>
        <Col xs={{ span: 24 }} xl={{ span: 9 }}>
          <BackgroundStyleColor color="#f8d188">
            <Logo xs={{ span: 0 }} xl={{ span: 0 }} content="Course" />
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
                <h3 style={{ color: 'white' }}>Course</h3>
              </Col>
              <Col xs={{ span: 4 }} xl={{ span: 0 }} offset={14}>
                <Drawer />
              </Col>
            </Row>
          </BackgroundStyleColor>
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 15 }}>
          <MediaQuery query={`(max-width: ${notebook})`}>
            {matches => (!matches ? <Header fontColor="#9b9b9b" /> : <></>)}
          </MediaQuery>
          {this.renderClass()}
        </Col>
      </Row>
    );
  }
}

export default Courses;
