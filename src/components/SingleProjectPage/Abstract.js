import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';

import BackgroundImageGreen from '../static/background_image_green.jpg';
import BackgroundImagePurple from '../static/background_image_purple.jpg';
import BackgroundInvertVerticalImage from '../static/background_image_invert_vertical.jpg';
import { blueColorLight, greenColorLight, pinkColorLight } from '../color';
import { media } from '../size';

const Background = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${props => props.background});
  background-size: cover;
  width: 100%;
  height: 100%;
  z-index: -100;
`;

const Content = styled.p`
  color: white;
  font-size: 2.5vmin;
`;

const Title = styled.div`
  color: ${props => props.color};
  font-size: 7vmin;
  margin-top: 18vmin;
  margin-bottom: 2vmin;

  ${media.lessThan('notebook')`
    margin-top: 2vmin;
  `};
`;

const Square = styled.div`
  width: 5vmin;
  height: 5vmin;
  float: right;
  margin-top: 2vmin;
  margin-right: 2vmin;
  background-color: ${props => props.color};
`;

const Bar = styled.div`
  width: 1.5vmin;
  height: 72vmin;
  background-color: ${props => props.color};
  position: absolute;
  margin-left: 28vmin;
  margin-top: 28vmin;

  ${media.lessThan('notebook')`
    position: relative;
    float:left;
    margin-left: 0;
    margin-top:20vmin;
    width: 40vmin;
    height: 1.5vmin;
  `};
`;

const colorBackgroundMap = {
  'Virtual-to-Real': BackgroundInvertVerticalImage,
  'Dynamic-Video-Segmentation-Network': BackgroundImageGreen,
  'A-Deep-Policy-Inference-Q-Network': BackgroundImagePurple,
};

const colorMap = {
  'Virtual-to-Real': pinkColorLight,
  'Dynamic-Video-Segmentation-Network': greenColorLight,
  'A-Deep-Policy-Inference-Q-Network': blueColorLight,
};

const Abstract = ({ projectName, content }) => (
  <div className="section">
    <Background background={colorBackgroundMap[projectName]}>
      <Bar color={colorMap[projectName]} />
      <Row>
        <Col xs={{ span: 16, offset: 4 }} xl={{ span: 12, offset: 4 }}>
          <Row>
            <Title color={colorMap[projectName]}>
              <Col span={12}>Abstract</Col>
              <Col span={12}>
                <Square color={colorMap[projectName]} />
              </Col>
            </Title>
            <Col span={24}>
              <Content>{content[0]}</Content>
            </Col>
          </Row>
        </Col>
      </Row>
    </Background>
  </div>
);

Abstract.propTypes = {
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
  projectName: PropTypes.string.isRequired,
};

export default Abstract;
