import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import BackgroundImage from './static/background_image.jpg';
import BackgroundImageGreen from './static/background_image_green.jpg';
import { greenColorDark, pinkColorDark } from './color';
import { media } from './size';

const Card = styled.div`
  filter: grayscale(${props => props.filter});
  width: 100%;
  height: 30vmin;
  background: linear-gradient(${props => props.rgba}, ${props => props.rgba}),
    url(${props => props.background});
  background-size: cover;
  width: 100%;
  height: 100%;
  margin-top: 2vmin;
  color: white;
  padding: 4vmin 4vmin 2vmin;
  font-size: 3vmin;

  ${media.lessThan('notebook')`
    margin-bottom: 4vmin;
    height: 35vmin;
  `};
`;

const Year = styled.div`
  font-size: 3vmin;
  margin-bottom: -1vmin;
  color: ${props => props.color};
`;

const ContentTitle = styled.div`
  font-size: 4vmin;
  font-weight: bold;
  color: ${props => props.color};
`;

const Content = styled.p`
  color: ${props => props.color};
`;

const urlMap = {
  'Virtual-to-Real': BackgroundImage,
  'Dynamic-Video-Segmentation-Network': BackgroundImageGreen,
};

const colorMap = {
  'Virtual-to-Real': pinkColorDark,
  'Dynamic-Video-Segmentation-Network': greenColorDark,
};

const initSetting = {
  filter: '100%',
  rgba: 'rgba(0, 0, 0, 0.4)',
  fontColor: 'white',
};

class ProjectCard extends Component {
  state = initSetting;

  changeBackground = (projectName, changeMainBackground) => {
    this.setState({
      filter: '0%',
      rgba: 'rgb(255,255,255,0.6)',
      fontColor: colorMap[projectName],
    });
    changeMainBackground(projectName);
  };

  backToOrigin = changeMainBackground => {
    this.setState(initSetting);
    changeMainBackground('');
  };

  renderCard = (projectName, color) => {
    switch (projectName) {
      case 'Virtual-to-Real':
        return (
          <Fragment>
            <Year color={color}>2017</Year>
            <ContentTitle color={color}>Virtual-to-Real:</ContentTitle>
            <Content color={color}>
              Learning to Control in Visual Semantic Segmentation
            </Content>
          </Fragment>
        );
      case 'Dynamic-Video-Segmentation-Network':
        return (
          <Fragment>
            <Year color={color}>2017</Year>
            <ContentTitle color={color}>
              Dynamic Video Segmentation Network
            </ContentTitle>
          </Fragment>
        );
      default:
        return <></>;
    }
  };

  render() {
    const { projectName, changeMainBackground } = this.props;
    const { filter, rgba, fontColor } = this.state;

    return (
      <Card
        onMouseEnter={() =>
          this.changeBackground(projectName, changeMainBackground)
        }
        onMouseLeave={() => this.backToOrigin(changeMainBackground)}
        background={urlMap[projectName]}
        filter={filter}
        rgba={rgba}
      >
        {this.renderCard(projectName, fontColor)}
      </Card>
    );
  }
}

ProjectCard.propTypes = {
  changeMainBackground: PropTypes.func.isRequired,
  projectName: PropTypes.string.isRequired,
};

export default ProjectCard;
