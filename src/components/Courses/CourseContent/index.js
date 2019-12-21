import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Col, Row } from 'antd';

import BackgroundImage from '../../static/background_image_invert_vertical.jpg';
import Header from '../../Share/Header';
import settings from '../../../settings';
import Logo from '../../Share/Logo';
import MobileContent from '../../Share/MobileContent';
import { BackgroundColor, PageLink, Text } from '../../Share';
import { media, xl, lg, md, sm } from '../../size';

const BackgroundStyleColor = styled(BackgroundColor)`
  ${media.lessThan('md')`
    height: 13vh;
    z-index: 11;
    position: fixed;
  `};
`;

class CourseContent extends Component {
  state = {
    title: '',
    description: '',
    year: '',
    season: '',
    lectures: [],
  };

  componentWillMount() {
    const {
      params: { course_id },
    } = this.props;
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 1000,
    });

    ins
      .get(`courses/${course_id}`)
      .then(res => {
        // console.log(res.data);
        this.setState({
          id: res.data.id,
          title: res.data.title,
          description: res.data.description,
          season: res.data.season,
          year: res.data.year,
          lectures: res.data.lectures,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderClassContent = () => {
    if (this.state.lectures) {
      let changeOrder = false;
      return this.state.lectures.map(
        ({ id, title, lecture_number, loading_image }) => {
          changeOrder = !changeOrder;
          return (
            <a key={id} href={`${this.state.id}/lectures/${id}`}>
              <div className="media mt-3 course-block justify-content-center align-items-center">
                <div
                  className={`media-content col-6 col-md-7 order-sm-1 ${
                    changeOrder ? 'order-1' : 'order-2'
                  }`}
                >
                  <h6>
                    <div>第 {lecture_number} 章</div>
                  </h6>
                  <h5>{title}</h5>
                </div>
                <div
                  className={`img-area col-6 col-md-5 order-sm-2 ${
                    changeOrder ? 'order-2' : 'order-1'
                  }`}
                >
                  <img
                    src={loading_image || BackgroundImage}
                    className="course-img"
                    alt=""
                  />
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
    const {
      params: { content_id },
    } = this.props;
    let seasonText;
    if (this.state.season === 0) {
      seasonText = '下學期';
    } else {
      seasonText = '上學期';
    }

    return (
      <Row id="courseContent">
        <Col xs={24} md={9}>
          <BackgroundStyleColor color="#f8d188">
            <Logo
              xs={{ span: 0 }}
              xl={{ span: 0 }}
              time={this.state.year + seasonText}
              content={this.state.title}
              describe={this.state.description}
            />
          </BackgroundStyleColor>
        </Col>
        <Col xs={24} md={15} className="right">
          <MediaQuery query={`(max-width: ${md})`}>
            {matches => (!matches ? <Header fontColor="#9b9b9b" /> : <></>)}
          </MediaQuery>
          <div className="classBlock">
            <MobileContent color="#f8d188" content="Course" />
            {this.renderClassContent(content_id)}
          </div>
        </Col>
      </Row>
    );
  }
}

CourseContent.propTypes = {
  params: PropTypes.shape({
    course_id: PropTypes.string.isRequired,
  }).isRequired,
};
export default CourseContent;
