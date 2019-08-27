import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';

const Media = styled.img`
  width: 100%;
  margin-top: 12vmin;
`;

const Content = styled.p`
  font-size: 2vmin;
  margin-top: 4vmin;
`;

class ModalContent extends Component {
  render() {
    const { image } = this.props;

    return (
      <Row type="flex" justify="center" align="middle">
        <Col span={10}>
          <Media src={image} />
        </Col>
        <Col span={8} offset={2}>
          <Content>
            DTraining Methodology:
            <br />
            DN takes as input the feature maps from one of the intermediate
            layers of the flow network, trained to perform regression.
            <br />
            The goal of DN is to learn to predict an expected confidence score
            for a frame region.
            <br />
            The confidence score is defined as the pixel-wise similarity between
            the resultant segmentations of the spatial warping path and the
            segmentation path.
          </Content>
        </Col>
      </Row>
    );
  }
}

ModalContent.propTypes = {
  image: PropTypes.string.isRequired,
};

export default ModalContent;
