import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';

import BackgroundImageGreen from '../static/background_image_green.jpg';
import BackgroundImagePurple from '../static/background_image_purple.jpg';
import BackgroundInvertImage from '../static/background_image_invert.jpg';
import DeepPolicyImage from '../static/System_structure_img_purple.png';
import DynamicVideoImage from '../static/System_structure_img_green.png';
import VirtualToRealImage from '../static/System_structure_img.jpg';
import {
  blueColorDark,
  blueColorLightMore,
  greenColorBackGround,
  greenColorDark,
  pinkColorDark,
  pinkColorLight,
} from '../color';
import { media } from '../size';

const Background = styled.div`
  background-color: ${props => props.color};
  background-size: cover;
  width: 100%;
  height: 100%;
  z-index: -100;
`;

const SystemCol = styled(Col)`
  height: 65vmin;
  margin-top: 18vmin;
  margin-right: 2vmin;

  ${media.lessThan('notebook')`
    margin-top: -2vmin;
  `};
`;

const MediaTitleBlock = styled.div`
  background: url(${props => props.image});
  background-position: left center;
  background-size: 170vmin 100vmin;
  height: 100%;
  width: 100%;

  ${media.lessThan('notebook')`
    height: 27vmin;
    margin-top: 40vmin;
  `};
`;

const Title = styled.div`
  color: ${props => props.color};
  font-style: italic;
  font-size: 5vmin;
  padding: 3vmin;

  ${media.lessThan('notebook')`
    padding: 5vmin;
  `};
`;

const Media = styled.img`
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const Square = styled.div`
  width: 5vmin;
  height: 5vmin;
  background-color: ${props => props.color};
  float: right;
  margin-top: 37vmin;
  margin-right: 2vmin;

  ${media.lessThan('notebook')`
    margin-top: -22vmin;
    margin-right: 5vmin;
  `};
`;

const imageMap = {
  'Virtual-to-Real': VirtualToRealImage,
  'Dynamic-Video-Segmentation-Network': DynamicVideoImage,
  'A-Deep-Policy-Inference-Q-Network': DeepPolicyImage,
};

const colorBackgroundMap = {
  'Virtual-to-Real': pinkColorLight,
  'Dynamic-Video-Segmentation-Network': greenColorBackGround,
  'A-Deep-Policy-Inference-Q-Network': blueColorLightMore,
};

const colorMap = {
  'Virtual-to-Real': pinkColorDark,
  'Dynamic-Video-Segmentation-Network': greenColorDark,
  'A-Deep-Policy-Inference-Q-Network': blueColorDark,
};

const colorImageMap = {
  'Virtual-to-Real': BackgroundInvertImage,
  'Dynamic-Video-Segmentation-Network': BackgroundImageGreen,
  'A-Deep-Policy-Inference-Q-Network': BackgroundImagePurple,
};

const colorSquareMap = {
  'Virtual-to-Real': 'white',
  'Dynamic-Video-Segmentation-Network': greenColorDark,
  'A-Deep-Policy-Inference-Q-Network': blueColorDark,
};

const SystemStructure = ({ projectName }) => (
  <div className="section">
    <Background color={colorBackgroundMap[projectName]}>
      <Row type="flex" justify="center">
        <SystemCol xs={{ span: 24 }} xl={{ span: 3 }}>
          <MediaTitleBlock image={colorImageMap[projectName]}>
            <Title color={colorMap[projectName]}>
              System
              <br />
              Structure
            </Title>
            <Square color={colorSquareMap[projectName]} />
          </MediaTitleBlock>
        </SystemCol>
        <SystemCol xs={{ span: 24 }} xl={{ span: 12 }}>
          <Media data-src={imageMap[projectName]} />
        </SystemCol>
      </Row>
    </Background>
  </div>
);

SystemStructure.propTypes = {
  projectName: PropTypes.string.isRequired,
};

export default SystemStructure;
