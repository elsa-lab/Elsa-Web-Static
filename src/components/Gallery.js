import React, { Component } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import { Link } from 'react-router';
import { Spring } from 'react-spring';

import GalleryBackgroundImage from './static/gallery_background_image.jpg';
import Header from './Header';
import ProjectCard from './ProjectCard';
import { greenColorMid, pinkColorMid, transparentBlack } from './color';
import { media } from './size';

const Background = styled.div`
  background: url(${GalleryBackgroundImage});
  background-size: cover;
  width: 100%;
  height: 100%;
  z-index: -100;
`;

const Title = styled.div`
  font-size: 5vmin;
  font-weight: bold;
  font-style: italic;
  margin-top: 6vmin;
  margin-bottom: 2vmin;

  ${media.lessThan('notebook')`
    font-size: 7vmin;
    margin-bottom: 4vmin;
  `};
`;

const Layer = styled.div`
  background-color: ${props => props.color};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${props => props.opactiy};
`;

const backgroundColorMap = {
  'Virtual-to-Real': pinkColorMid,
  'Dynamic-Video-Segmentation-Network': greenColorMid,
};

class Gallery extends Component {
  state = { color: '' };

  changeMainBackground = projectName => {
    this.setState({
      color: backgroundColorMap[projectName],
    });
  };

  render() {
    const { color } = this.state;

    return (
      <div className="section">
        <Spring
          from={{ opacity: 0 }}
          to={{ opacity: 0.4 }}
          config={{ tension: 120, friction: 14 }}
          reset
        >
          {props => {
            console.log({ props });
            return <Layer color={color} opactiy={props.opacity} />;
          }}
        </Spring>
        <Background>
          <Header color={transparentBlack} />
          <Row type="flex" justify="start">
            <Col xs={{ span: 24, offset: 1 }} xl={{ span: 12, offset: 3 }}>
              <Title>Recent Project</Title>
            </Col>
          </Row>
          <Row type="flex" justify="center" gutter={32}>
            <Col xs={{ span: 24 }} xl={{ span: 6 }}>
              <Link to="/project/Virtual-to-Real">
                <ProjectCard
                  projectName="Virtual-to-Real"
                  changeMainBackground={this.changeMainBackground}
                />
              </Link>
            </Col>
            <Col xs={{ span: 24 }} xl={{ span: 6 }}>
              <Link to="/project/Dynamic-Video-Segmentation-Network">
                <ProjectCard
                  projectName="Dynamic-Video-Segmentation-Network"
                  changeMainBackground={this.changeMainBackground}
                />
              </Link>
            </Col>
            <Col xs={{ span: 24 }} xl={{ span: 6 }}>
              <ProjectCard
                projectName=""
                changeMainBackground={this.changeMainBackground}
              />
            </Col>
          </Row>
        </Background>
      </div>
    );
  }
}

export default Gallery;
