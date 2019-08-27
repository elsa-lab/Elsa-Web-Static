import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import Drawer from '../Share/Drawer';
import IconImg from '../static/icon.png';
import settings from '../../settings';
import FlippingPages from 'flipping-pages';
import './App.css';
import testPic from '../static/award_1.png';
import arrow from '../static/right-arrow.svg';
import left from '../static/left-arrow.svg'
import 'flipping-pages/FlippingPages.css';
import { Document, Page } from 'react-pdf';
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
} from '../Share';
import { media } from '../size';


const BackgroundStyleColor = styled(BackgroundColor)`
${media.lessThan('notebook')`
height: 60vh;
`};
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

class Courses extends Component {
    state = {
        courses: '',
        numPages: null,
        pageNumber: 1,
    };

    onDocumentLoadSuccess = ({ numPages }) => {
      this.setState({ numPages });
    };

    constructor(props) {
            super(props)
            this.totalPages = 5
            this.state = {
                selected: 0,
            }
            this.handleSelectedChange = this.handleSelectedChange.bind(this)
            this.previous = this.previous.bind(this)
            this.next = this.next.bind(this)
        }

        handleSelectedChange(selected) {
            this.setState({selected})
        }

        previous() {
            this.setState(state => ({
                selected: state.selected - 1
            }))
        }

        next() {
            this.setState(state => ({
                selected: state.selected + 1
            }))
        }

    componentWillMount() {
        const ins = axios.create({
            baseURL: settings.backend_url,
            timeout: 6000,
        });

        ins
        .get('/courses')
        .then(res => {
            console.log(res.data);
            this.setState({ courses: res.data });
        })
        .catch(error => {
            console.log(error);
        });
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
        const { pageNumber, numPages } = this.state;
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
                                        Home
                                    </Col>
                                </Row>
                            </SmallContent>
                            <BigTitle xs={{ span: 22 }} xl={{ span: 18 }}>
                                <TitleStyleText>Courses</TitleStyleText>
                            </BigTitle>
                            <MedContent span={12} color="#8c8c8c" />
                            <Col span={6} />
                        </MainRow>
                    </BackgroundStyleColor>
                </Col>
                <Col xs={{ span: 24 }} xl={{ span: 15 }}>
                    
                    <div className="App">
                        <FlippingPages
                            className="App-pages"
                            direction="horizontal"
                            selected={this.state.selected}
                            onSelectedChange={this.handleSelectedChange}
                            /* touch-action attribute is required by pointer events
                            polyfill */
                            touch-action="none"
                            >
                            <img src={testPic} alt=""/>
                            <img src={testPic} alt=""/>
                            <img src={testPic} alt=""/>
                            <img src={testPic} alt=""/>
                            <img src={testPic} alt=""/>
                        </FlippingPages>

                        <button
                            onClick={this.previous}
                            className="PreButton"
                            disabled={!this.state.selected}
                            ><img className="rightArrow" src={left} alt=""/></button>
                        <button
                            onClick={this.next}
                            className="NextButton"
                            disabled={this.state.selected + 1 === this.totalPages}
                            ><img className="rightArrow" src={arrow} alt=""/></button>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default Courses;
// <div>
//     <PDF file="../static/Week5-T.pdf" scale={1.5} rotate={90}/>
// </div>

// <div>
//     <button id="prev">Previous</button>
//     <button id="next">Next</button>
//     &nbsp; &nbsp;
//     <span>Page: <span id="page_num"></span> / <span id="page_count"></span></span>
// </div>
// <canvas id="the-canvas"></canvas>
