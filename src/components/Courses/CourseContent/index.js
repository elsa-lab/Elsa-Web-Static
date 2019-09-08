import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Col, Row } from 'antd';

import BackgroundImage from '../../static/background_image_invert_vertical.jpg';
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

const EachBlock = styled.div`
  width: 80%;
  height: 20vh;
  background-color: rgba(0, 0, 0, 0.3);
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5vh;
  color: white;
  font-size: 1.5vw;

  ${media.lessThan('notebook')`
    width: 100%;
    background-color: ${props => props.color};
    margin-bottom: 0;
  `};
`;

const Date = styled.span`
  font-size: 0.8vw;
  padding-left: 0.25vw;
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

const MidText = styled.div`
  font-size: 80%;
  font-style: italic;
  margin-top: 3vh;
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
            this.setState({
                id: res.data.id,
                title: res.data.title,
                description: res.data.description,
                course_no: res.data.course_no,
                season: res.data.season,
                year: res.data.year,
                lectures: res.data.lectures,
                time: res.data.time
            });
        })
        .catch(error => {
            console.log(error);
        });
  }
renderClassContent = course_id => {
    if (this.state.lectures) {
        let isChangeOrder = false;
        return this.state.lectures.map(({ id, title, lecture_number }) => {
            isChangeOrder = !isChangeOrder;
            return (
                <a key={id} href={`${this.state.id}/lectures/${id}`}>
                    <EachBlock color = {isChangeOrder ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.4)'}>
                        <Row>
                            <Col xs={{ span: 12 }} xl={{ span: 8 }}>
                                <ImageArea image={BackgroundImage} />
                            </Col>
                            <Col xs={{ span: 12 }} xl={{ span: 16 }}>
                                <TextArea>
                                    <div>
                                        material #{lecture_number} <Date>{this.state.time}</Date>
                                    </div>
                                    <Title>{title}</Title>
                                </TextArea>
                            </Col>
                        </Row>
                    </EachBlock>
                </a>
            );
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
      const {
          params: { content_id },
      } = this.props;

      return (
          <Row>
              <Col xs={{ span: 24 }} xl={{ span: 9 }}>
                  <BackgroundStyleColor color="#f8d188">
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
                  Home / Courses
                  </Col>
                  </Row>
                  </SmallContent>
                  <BigTitle xs={{ span: 22 }} xl={{ span: 18 }}>
                  <TitleStyleText>
                  {this.state.year} {this.state.season}
                  </TitleStyleText>
                  <MidText>{this.state.title}</MidText>
                  </BigTitle>
                  <MedContent xs={{ span: 22 }} xl={{ span: 12 }} color="#8c8c8c">
                  {this.state.description}
                  </MedContent>
                  <Col span={6} />
                  </MainRow>
                  </BackgroundStyleColor>
              </Col>
              <Col xs={{ span: 24 }} xl={{ span: 15 }}>
                  <BackgroundStyleColor2 color="white">
                      <MediaQuery query={`(max-width: ${notebook})`}>
                          {matches => (!matches ? <Header fontColor="#9b9b9b" /> : <></>)}
                      </MediaQuery>
                      <Blocks>{this.renderClassContent(content_id)}</Blocks>
                  </BackgroundStyleColor2>
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
