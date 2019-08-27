import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';

import {
  blueColorDark,
  blueColorLightMore,
  blueColorMid,
  greenColorBackGround,
  greenColorDark,
  greenColorMid,
  pinkColorDark,
  pinkColorLight,
} from '../color';
import { media } from '../size';

const Background = styled.div`
  background-color: ${props => props.background};
  background-size: cover;
  width: 100%;
  height: 100%;
  z-index: -100;
`;

const Content = styled.p`
  color: gray;
  font-size: 2.5vmin;
`;

const Title = styled.div`
  color: ${props => props.color};
  font-size: 6vmin;
  margin-top: 22vmin;

  ${media.lessThan('notebook')`
    margin-top: 4vmin;
  `};
`;

const Square = styled.div`
  visibility: hidden;
  width: 5vmin;
  height: 5vmin;
  float: right;
  margin-top: 2vmin;
  margin-right: -12vmin;
  background-color: ${props => props.color};

  ${media.lessThan('notebook')`
    visibility: visible;
  `};
`;

const Bar = styled.div`
  width: 1.5vmin;
  height: 77vmin;
  background-color: ${props => props.color};
  position: absolute;
  margin-left: 28vmin;
  margin-top: 28vmin;

  ${media.lessThan('notebook')`
    position: relative;
    float:left;
    margin-left: 0;
    margin-top:30vmin;
    width: 45vmin;
    height: 1.5vmin;
  `};
`;

const backgroundMap = {
  'Virtual-to-Real': pinkColorLight,
  'Dynamic-Video-Segmentation-Network': greenColorBackGround,
  'A-Deep-Policy-Inference-Q-Network': blueColorLightMore,
};

const colorMap = {
  'Virtual-to-Real': pinkColorDark,
  'Dynamic-Video-Segmentation-Network': greenColorDark,
  'A-Deep-Policy-Inference-Q-Network': blueColorDark,
};

const colorMapLight = {
  'Virtual-to-Real': pinkColorDark,
  'Dynamic-Video-Segmentation-Network': greenColorMid,
  'A-Deep-Policy-Inference-Q-Network': blueColorMid,
};

const Conclusion = ({ projectName, content }) => (
  <div className="section">
    <Background background={backgroundMap[projectName]}>
      <Bar color={colorMap[projectName]} />
      <Row>
        <Col span={12} offset={4}>
          <Title color={colorMapLight[projectName]}>
            <Col span={12}>Conclusion</Col>
            <Col span={12}>
              <Square color={colorMapLight[projectName]} />
            </Col>
          </Title>
        </Col>
      </Row>
      <Row>
        <Col span={16} offset={4}>
          <Content>{content[0]}</Content>
        </Col>
      </Row>
    </Background>
  </div>
);

Conclusion.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
  projectName: PropTypes.string.isRequired,
};

export default Conclusion;
