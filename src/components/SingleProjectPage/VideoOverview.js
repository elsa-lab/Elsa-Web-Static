import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { Col, Row } from 'antd';

import BackgroundImageGreen from '../static/background_image_green.jpg';
import BackgroundInvertVerticalVerticalImage from '../static/background_image_invert_vertical_2.jpg';
import { greenColorBackGround, pinkColorMid } from '../color';
import { media } from '../size';

const videoConfig = {
  youtube: {
    frameBorder: '0',
    allowFullScreen: true,
    playerVars: {
      rel: 0,
      controls: 0,
    },
  },
};

const Background = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${props => props.background});
  background-size: cover;
  width: 100%;
  height: 100%;
  z-index: -100;
`;

const SystemColMedia = styled(Col)`
  height: 65vmin;
  margin-top: 18vmin;

  ${media.lessThan('notebook')`
    height: 27vmin;
    margin-top: 30vmin;
  `};
`;

const SystemCol = styled(Col)`
  height: 65vmin;
  margin-top: 18vmin;

  ${media.lessThan('notebook')`
    margin-top: 0;
  `};
`;

const MediaTitleBlock = styled.div`
  background-color: ${props => props.color};
  height: 100%;
  width: 27vmin;

  ${media.lessThan('notebook')`
    background-color: rgba(255, 255, 255, 0);
    margin-top:6vmin;
    height: 20vmin;
    width: 100%;
  `};
`;

const Title = styled.div`
  color: white;
  font-style: italic;
  font-size: 5vmin;
  padding: 3vmin;

  ${media.lessThan('notebook')`
    font-size: 8vmin;
    color:${props => props.color};
  `};
`;

const Square = styled.div`
  width: 5vmin;
  height: 5vmin;
  background-color: white;
  margin-top: 37vmin;
  margin-left: 2vmin;

  ${media.lessThan('notebook')`
    float:right;
    margin-top:-10vmin;
    margin-right:3vmin;
    background-color:${props => props.color};
  `};
`;

const videoSize = {
  width: '100%',
  height: '100%',
};

const Wrapper = styled.div`
  position: relative;
  ${videoSize};
`;

const TransparentLayer = styled.div`
  background-color: rgba(255, 255, 255, 0);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
`;

const backgroundMap = {
  'Virtual-to-Real': BackgroundInvertVerticalVerticalImage,
  'Dynamic-Video-Segmentation-Network': BackgroundImageGreen,
};

// 'A-Deep-Policy-Inference-Q-Network': BackgroundImagePurple,

const colorMap = {
  'Virtual-to-Real': pinkColorMid,
  'Dynamic-Video-Segmentation-Network': greenColorBackGround,
};

const videoMap = {
  'Virtual-to-Real': 'https://www.youtube.com/embed/_OqdnG4AII8',
  'Dynamic-Video-Segmentation-Network':
    'https://www.youtube.com/embed/vadYHOyUVXs',
};

class VideoOverview extends Component {
  state = {
    isPlaying: false,
  };

  playVideo = () => {
    this.setState({
      isPlaying: true,
    });
  };

  onPause = () => {
    this.setState({ isPlaying: false });
  };

  render() {
    const { isPlaying } = this.state;
    const { projectName } = this.props;

    return (
      <Fragment>
        {projectName !== 'A-Deep-Policy-Inference-Q-Network' && (
          <div className="section">
            <Background background={backgroundMap[projectName]}>
              <Row type="flex" justify="center" gutter={24}>
                <SystemColMedia xs={{ span: 24 }} xl={{ span: 2, offset: 1 }}>
                  <MediaTitleBlock color={colorMap[projectName]}>
                    <Title color={colorMap[projectName]}>Video Overview</Title>
                    <Square color={colorMap[projectName]} />
                  </MediaTitleBlock>
                </SystemColMedia>
                <SystemCol xs={{ span: 24 }} xl={{ span: 15, offset: 1 }}>
                  <Wrapper>
                    <ReactPlayer
                      url={videoMap[projectName]}
                      playing={isPlaying}
                      width={videoSize.width}
                      height={videoSize.height}
                      config={videoConfig}
                      onPause={this.onPause}
                    />
                    {!isPlaying ? (
                      <TransparentLayer onClick={this.playVideo} />
                    ) : null}
                  </Wrapper>
                </SystemCol>
              </Row>
            </Background>
          </div>
        )}
      </Fragment>
    );
  }
}

VideoOverview.propTypes = {
  projectName: PropTypes.string.isRequired,
};

export default VideoOverview;
