import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';

import BackgroundImage from '../static/background_image.jpg';
import BackgroundImageGreen from '../static/background_image_green.jpg';
import BackgroundImagePurple from '../static/background_image_purple.jpg';
import Header from '../Header';
import {
  blueColorDark,
  blueColorLight,
  greenColorDark,
  greenColorLight,
  pinkColorDark,
  pinkColorLight,
} from '../color';
import { media } from '../size';

const Background = styled.div`
  background: url(${props => props.background});
  background-size: cover;
  width: 100%;
  height: 100%;
  z-index: -100;
`;

const Card = styled.div`
  width: 100%;
  height: 60vmin;
  border: 2vmin solid white;
  border-bottom-width: 20vmin;
  margin-top: 16vmin;

  ${media.lessThan('notebook')`
    margin-top: 30vmin;
    height: 70vmin;
  `};
`;

const Block = styled.div`
  width: 100%;
  height: 38vmin;
  background: rgba(0, 0, 0, 0.6);
  color: ${props => props.color};
  padding: 2vmin 4vmin 2vmin;
  font-size: 5vmin;

  ${media.lessThan('notebook')`
    font-size: 6vmin;
    height: 48vmin;
  `};
`;

const Year = styled.div`
  margin-bottom: -1.5vmin;
`;

const Title = styled.div`
  font-size: 6vmin;
  font-weight: bold;
  color: white;

  ${media.lessThan('notebook')`
    font-size: 8vmin;
  `};
`;

const Square = styled.div`
  width: 5vmin;
  height: 5vmin;
  position: absolute;
  top: 20vmin;
  right: 4vmin;
  background-color: ${props => props.color};
`;

const imageMap = {
  'Virtual-to-Real': BackgroundImage,
  'Dynamic-Video-Segmentation-Network': BackgroundImageGreen,
  'A-Deep-Policy-Inference-Q-Network': BackgroundImagePurple,
};

const colorMap = {
  'Virtual-to-Real': pinkColorDark,
  'Dynamic-Video-Segmentation-Network': greenColorDark,
  'A-Deep-Policy-Inference-Q-Network': blueColorDark,
};

const colorTextMap = {
  'Virtual-to-Real': pinkColorLight,
  'Dynamic-Video-Segmentation-Network': greenColorLight,
  'A-Deep-Policy-Inference-Q-Network': blueColorLight,
};

const Topic = ({ projectName, content }) => (
  <div className="section">
    <Background background={imageMap[projectName]}>
      <Header color={colorMap[projectName]} />
      <Row>
        <Col xs={{ span: 24 }} xl={{ span: 11, offset: 11 }}>
          <Card>
            <Block color={colorTextMap[projectName]}>
              <Square color={colorTextMap[projectName]} />
              <Year>{content[0]}</Year>
              <Title>{content[1]}</Title>
              <p>{content[2]}</p>
            </Block>
          </Card>
        </Col>
      </Row>
    </Background>
  </div>
);

Topic.propTypes = {
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
  projectName: PropTypes.string.isRequired,
};

export default Topic;
