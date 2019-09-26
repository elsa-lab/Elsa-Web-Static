import MediaQuery from 'react-responsive';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import { Link } from 'react-router';

import BackgroundImage from '../static/background_image_invert_vertical.jpg';
import BackgroundImageGreen from '../static/background_image_green.jpg';
import BackgroundImagePurple from '../static/background_image_purple.jpg';
import Drawer from '../Share/Drawer';
import Header from '../Share/Header';
import project1 from '../Content/VirtualToReal';
import project2 from '../Content/DynamicVideo';
import project3 from '../Content/DeepPolicy';
import Logo from '../Share/Logo'
import axios from 'axios';
import settings from '../../settings';

import {
  BackgroundColor,
  PageLink,
  SmallContent,
  Text,
  TextCol,
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
const BackgroundStyleColor2 = styled(BackgroundColor)`
  ${media.lessThan('notebook')`
    height: 100%;
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
  font-size: 1.6vw;
  padding-top: 1vh;

  ${media.lessThan('notebook')`
    padding-top: 1vh;
    font-size:4vw;
  `};
`;
const TextArea = styled.div`
  padding-left: 2.5vw;
  padding-right: 4vw;
  padding-top: 2vh;

  ${media.lessThan('notebook')`
    padding-top: 3.5vh;
    padding-left: 4vw;
    font-size:2vw;
  `};
`;
const ImageArea = styled.div`
  width: 100%;
  height: 20vh;
  background: url(${props => props.image});
  background-size: cover;
  background-position: center center;
`;

const ProjectsContent = [
  {
    content: project1.topic,
    image: BackgroundImage,
    link: '/project/Virtual-to-Real',
  },
  {
    content: project2.topic,
    image: BackgroundImageGreen,
    link: '/project/Dynamic-Video-Segmentation-Network',
  },
  {
    content: project3.topic,
    image: BackgroundImagePurple,
    link: '/project/A-Deep-Policy-Inference-Q-Network',
  },
];
class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        }
    }
    componentWillMount() {
        const ins = axios.create({
            baseURL: settings.backend_url,
            timeout: 1000,
        });

        ins
            .get('/projects')
            .then(res => {
                console.log(res.data);
                this.setState({
                    projects: res.data,
                });
            })
            .catch(error => {
                console.log(error);
            });


    }

    renderProject = () => {
        if( this.state.projects ) {
            let isChangeOrder = false;
            return this.state.projects.map(({ id, year, title, subtitle, image_url }) => {
                console.log(id, year, title, subtitle, image_url)
                isChangeOrder = !isChangeOrder;
                return (
                    <Link key={title} to={'/project/'+id}>
                        <EachBlock key={title}>
                            <Row type="flex">
                                <Col
                                    span={12}
                                    xs={{ order: isChangeOrder ? 2 : 1 }}
                                    xl={{ order: 1 }}
                                    >
                                    <TextArea>
                                        <Year>{year}</Year>
                                        <Title>{title}</Title>
                                        <p>{subtitle}</p>
                                    </TextArea>
                                </Col>
                                <Col
                                    span={12}
                                    xs={{ order: isChangeOrder ? 1 : 2 }}
                                    xl={{ order: 2 }}
                                    >
                                    <ImageArea image={image_url} />
                                </Col>
                            </Row>
                        </EachBlock>
                    </Link>
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
    return (
      <Row>
          <MediaQuery query={`(max-width: ${notebook})`}>
            {matches => (!matches ? <Header fontColor="#9b9b9b" /> : <></>)}
          </MediaQuery>
        <Col xs={{ span: 24 }} xl={{ span: 9 }}>
          <BackgroundStyleColor color="#a1afd8">
              <Logo content="Projects"></Logo>
          </BackgroundStyleColor>
        </Col>
        <Col xs={{ span: 24 }} xl={{ span: 15 }}>
          <BackgroundStyleColor2 color="white">
            <Blocks>{this.renderProject()}</Blocks>
          </BackgroundStyleColor2>
        </Col>
      </Row>
    );
  }
}

export default Projects;
