import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Col, Icon, Row } from 'antd';
import FlippingPages from 'flipping-pages';
import 'flipping-pages/FlippingPages.css';
import arrow from '../../../static/right-arrow.svg';
import left from '../../../static/left-arrow.svg'
import testPic from '../../../static/award_1.png';
import '../../App.css'
import Drawer from '../../../Share/Drawer';
import Header from '../../../Share/Header';
import IconImg from '../../../static/icon.png';
import settings from '../../../../settings';
import {
  BackgroundColor,
  Hr,
  IconImage,
  LogoContent,
  MainRow,
  PageLink,
  SmallContent,
  Text,
  TextCol,
  Title1,
  Title2,
} from '../../../Share';
import { media, notebook } from '../../../size';

import Comment from './Comment';

const Blocks = styled.div`
  padding-top: 8vh;

  ${media.lessThan('notebook')`
    padding-top: 2vh;
  `};
`;

const IconStyleImage = styled(IconImage)`
  ${media.lessThan('notebook')`
    width: 8vw;
  `};
`;

const BackgroundStyleColor = styled(BackgroundColor)`
  ${media.lessThan('notebook')`
    height: 70vh;
  `};
`;

const BackgroundStyleColor2 = styled(BackgroundColor)`
  ${media.lessThan('notebook')`
    height: 100%;
  `};
`;

const EachPage = styled.img`
  width: 11vw;
  margin: 0.5vw;

  :hover {
    cursor: pointer;
  }

  ${media.lessThan('notebook')`
    width: auto;
    height: 80%;
  `};
`;

const PagesBlock = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  margin-top: 5vh;
  height: 60vh;
  overflow-y: scroll;

  ${media.lessThan('notebook')`
    height:10vh;
    overflow-y: hidden;
    overflow-x: scroll;
  `};
`;

const ImageShow = styled.img`
  width: 100%;
  display: block;
  margin: auto;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  ${media.lessThan('notebook')`
    margin-top: 2vh;
    width: 80%;
  `};
`;

const ArrowIcon = styled(Icon)`
  margin-left: 40%;
  cursor: pointer;
`;

const CountPages = styled.div`
  text-align: center;
  margin-top: 2vh;
  margin-bottom: 1vh;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const PagesBlockMobileWrapper = styled.div`
  margin-top: 3vh;
  width: 100%;
  height: 12vh;
  background-color: rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  overflow: hidden;
  overflow-x: scroll;
  text-align: justify;
`;

const PagesBlockMobile = styled.div`
  width: 16%;
  height: 100%;
  margin: 1.5vw;
  display: inline-block;
`;

class PdfPage extends Component {
  state = {
    title: '',
    imageRootUrl: '',
    page_size: '',
    allSlides: [],
    selected: 0,
    current: 0,
    courses: '',
    numPages: null,
    pageNumber: 10,
  };


  componentDidMount() {
    const {
      params: { course_id, content_id, file_id },
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
          title: res.data.title,
        });
      })
      .catch(error => {
        console.log(error);
      });

    ins
      .get(`courses/${course_id}/contents/${content_id}`)
      .then(res => {
        // console.log(res.data);
        this.setState(res.data);
      })
      .catch(error => {
        console.log(error);
      });

    ins
      .get(`files/${file_id}`)
      .then(res => {
        // console.log(res.data);
        this.setState({
          imageRootUrl: res.data.image_root_url,
          page_size: res.data.page_size,
        });
        this.displaySlides();
      })
      .catch(error => {
        console.log(error);
      });
  }

  displaySlides = () => {
        const slides = [];
    for (let i = 0; i < this.state.page_size; i++) {
      slides.push(
        <EachPage
          alt="/page"
          src={`${this.state.imageRootUrl}/page-${i}.jpeg`}
          key={i}
          onClick={() => this.setState({ current: i })}
        />
      );
    }

    this.setState({ allSlides: slides });
    this.setState({ pageNumber: slides.length })

  console.log(this.state)
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };
  constructor(props) {
      super(props)
      this.handleSelectedChange = this.handleSelectedChange.bind(this)
      this.previous = this.previous.bind(this)
      this.next = this.next.bind(this)
  }

  handleSelectedChange(selected) {
      this.setState({selected})
  }

  previous() {
      this.setState(state => ({
          current: state.current - 1
      }))
  }

  next() {
      this.setState(state => ({
          current: state.current + 1
      }))
  }

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
      params: { file_id },
    } = this.props;

    const {
      title,
      year,
      season,
      imageRootUrl,
      current,
      allSlides,
    } = this.state;

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
                    Home / Courses / {year} {season} - {title}
                  </Col>

                  <MediaQuery query={`(max-width: ${notebook})`}>
                    {matches =>
                      matches ? (
                        <Col span={24}>
                          <PagesBlockMobileWrapper>
                            <PagesBlockMobile id ={file_id}>{allSlides}</PagesBlockMobile>
                          </PagesBlockMobileWrapper>
                        </Col>
                      ) : (
                        <Col span={24}>
                          <PagesBlock>{allSlides}</PagesBlock>
                        </Col>
                      )
                    }
                  </MediaQuery>

                  <MediaQuery query={`(max-width: ${notebook})`}>
                    {matches =>
                      matches ? (
                        <Col span={24}>
                          <ImageShow
                            src={`${imageRootUrl}/page-${current}.jpeg`}
                          />
                        </Col>
                      ) : (
                        <></>
                      )
                    }
                  </MediaQuery>
                </Row>
              </SmallContent>
            </MainRow>
          </BackgroundStyleColor>
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 15 }}>
          <BackgroundStyleColor2 color="white">
            <MediaQuery query={`(max-width: ${notebook})`}>
              {matches => (!matches ? <Header fontColor="#9b9b9b" /> : <></>)}
            </MediaQuery>

            <Blocks>
              {/*<Row type="flex" justify="center" align="middle">
                <MediaQuery query={`(max-width: ${notebook})`}>
                  {matches =>
                    !matches ? (
                      <>
                      <Col span={3}>
                          <ArrowIcon
                            type="left"
                            style={{ fontSize: '2vw' }}
                            onClick={() =>
                              current > 0 &&
                              this.setState({ current: current - 1 })
                            }
                          />
                        </Col>
                        <Col span={14}>
                          <ImageShow
                            src={`${imageRootUrl}/page-${current}.jpeg`}
                          />
                        </Col>

                        <Col span={3}>
                          <ArrowIcon
                            type="right"
                            style={{ fontSize: '2vw' }}
                            onClick={() =>
                              current + 1 < allSlides.length &&
                              this.setState({ current: current + 1 })
                            }
                          />
                        </Col>
                      </>
                    ) : (
                      <></>
                    )
                  }
                </MediaQuery>
              </Row>*/}
              <div className="App">
                  <FlippingPages
                      className="App-pages"
                      direction="horizontal"
                      selected={this.state.current}
                      onSelectedChange={this.handleSelectedChange}
                      touch-action="none"
                      >
                      {allSlides}
                  </FlippingPages>

                  <button
                      onClick={this.previous}
                      className="PreButton"
                      disabled={!this.state.current}
                      ><img className="rightArrow" src={left} alt=""/></button>
                  <button
                      onClick={this.next}
                      className="NextButton"
                      disabled={this.state.current + 1 === this.state.pageNumber}
                      ><img className="rightArrow" src={arrow} alt=""/></button>
              </div>
            </Blocks>

            {/*<MediaQuery query={`(max-width: ${notebook})`}>
              {matches =>
                !matches ? (
                  <Row type="flex" justify="center" align="middle">
                    <Col span={8}>
                      <CountPages>
                        Pages {current + 1}/{allSlides.length}
                      </CountPages>
                    </Col>
                  </Row>
                ) : (
                  <></>
                )
              }
            </MediaQuery>*/}
            {/*<Comment id={file_id} fileId={file_id} nowPage={current} />*/}
          </BackgroundStyleColor2>
        </Col>
      </Row>
    );
  }
}

PdfPage.propTypes = {
  params: PropTypes.shape({
    course_id: PropTypes.string.isRequired,
    content_id: PropTypes.string.isRequired,
    file_id: PropTypes.string.isRequired,
  }).isRequired,
};

export default PdfPage;
