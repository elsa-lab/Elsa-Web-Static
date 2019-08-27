import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';

import AwardingImage1 from '../static/award_1.png';
import AwardingImage2 from '../static/award_2.png';
import BackgroundInvertImage from '../static/background_image_invert.jpg';
import { media } from '../size';
import { pinkColorDark, pinkColorLight } from '../color';

const Background = styled.div`
  background-color: ${pinkColorLight};
  background-size: cover;
  width: 100%;
  height: 100%;
  z-index: -100;
`;

const AwardingTitleBlock = styled.div`
  background: url(${BackgroundInvertImage});
  background-position: right center;
  background-size: 180vmin 100vmin;
  height: 100vmin;
  width: 40vmin;
  z-index: -50;

  ${media.lessThan('notebook')`
    height: 22vmin;
    width:100%;
    margin-top:18vmin;
  `};
`;

const Title = styled.div`
  color: ${pinkColorDark};
  font-style: italic;
  font-size: 6vmin;
  padding: 20vmin 5vmin 5vmin;

  ${media.lessThan('notebook')`
    padding-top:6vmin;
  `};
`;

const Media = styled.img`
  width: 70vmin;
  margin: 8vmin 0 0 0;
  margin-top: 4vmin;

  ${media.lessThan('notebook')`
    width:100vmin;
    margin:0;
  `};
`;

const Square = styled.div`
  width: 5vmin;
  height: 5vmin;
  background-color: ${pinkColorDark};
  margin-left: 4vmin;
  margin-top: 52vmin;

  ${media.lessThan('notebook')`
    background-color: ${pinkColorLight};
    float: right;
    margin-right: 4vmin;
    margin-top: -17vmin;
  `};
`;

const visableMap = {
  'Virtual-to-Real': true,
  'Dynamic-Video-Segmentation-Network': false,
  'A-Deep-Policy-Inference-Q-Network': false,
};

const Awarding = ({ projectName }) =>
  !visableMap[projectName] ? (
    <></>
  ) : (
    <div className="section">
      <Background>
        <Row type="flex" justify="center" align="middle">
          <Col xs={{ span: 24 }} xl={{ span: 6, offset: 1 }}>
            <AwardingTitleBlock>
              <Title>Awarding</Title>
              <Square />
            </AwardingTitleBlock>
          </Col>
          <Col xs={{ span: 24 }} xl={{ span: 10 }}>
            <Row type="flex" justify="center">
              <Col>
                <Media data-src={AwardingImage1} />
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col>
                <Media data-src={AwardingImage2} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Background>
    </div>
  );

Awarding.propTypes = {
  projectName: PropTypes.string.isRequired,
};

export default Awarding;
