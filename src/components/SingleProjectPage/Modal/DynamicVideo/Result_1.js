import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';

const Media = styled.img`
  width: 100%;
  margin-top: 10vmin;
  margin-bottom: -6vmin;
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
          <Media src={image[0]} />
          <Media src={image[1]} />
        </Col>
        <Col span={8} offset={2}>
          <Content>
            We perform experiments on the Cityscapes dataset.
            <br />
            We pre-trained three models, DeepLab-v2, DeepLab-Fast, and PSPNet,
            as our baseline models for the segmentation network in DVSNet.
            <br /> We perform all of our experiments with two Intel Xeon E5-2620
            CPUs and an NVIDIA GTX 1080 Ti GPU.
          </Content>
        </Col>
      </Row>
    );
  }
}

ModalContent.propTypes = {
  image: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ModalContent;
