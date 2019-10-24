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
import { BackgroundColor, PageLink, Text } from '../../Share';
import { media, notebook } from '../../size';

const BackgroundStyleColor = styled(BackgroundColor)`
  ${media.lessThan('notebook')`
    height: 35vh;
  `};
`;

const EachBlock = styled.div`
  width: 80%;
  height: 20vh;
  background-color: rgba(0, 0, 0, 0.3);
  margin-left: auto;
  margin-right: auto;
  margin-top: 5vh;
  margin-bottom: 5vh;
  color: white;
  font-size: 1.5vw;

  ${media.lessThan('notebook')`
    width: 100%;
    background-color: ${props => props.color};
    margin-bottom: 0;
  `};
`;

const Title = styled.div`
  font-size: 2vw;
  line-height: 120%;

  ${media.lessThan('notebook')`
    font-size:5vw;
  `};
`;

const TextArea = styled.div`
  padding-left: 2.5vw;
  padding-right: 4vw;
  padding-top: 3vh;

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
        console.log(res.data);
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
      let isChangeOrder = false;
      return this.state.lectures.map(
        ({ id, title, lecture_number, loading_image }) => {
          isChangeOrder = !isChangeOrder;
          return (
            <a key={id} href={`${this.state.id}/lectures/${id}`}>
              <EachBlock
                color={
                  isChangeOrder ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.4)'
                }
                className="my-3"
              >
                <Row>
                  <Col xs={{ span: 12 }} xl={{ span: 8 }}>
                    <ImageArea image={loading_image || BackgroundImage} />
                  </Col>
                  <Col xs={{ span: 12 }} xl={{ span: 16 }}>
                    <TextArea>
                      <div>第 {lecture_number} 章</div>
                      <Title>{title}</Title>
                    </TextArea>
                  </Col>
                </Row>
              </EachBlock>
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
        <Col xs={{ span: 24 }} xl={{ span: 9 }}>
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
        <Col xs={{ span: 24 }} xl={{ span: 15 }} className="right">
          <MediaQuery query={`(max-width: ${notebook})`}>
            {matches => (!matches ? <Header fontColor="#9b9b9b" /> : <></>)}
          </MediaQuery>
          <div className="classBlock">
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
