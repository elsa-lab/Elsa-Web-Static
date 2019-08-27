import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';

const Media = styled.img`
  width: 100%;
  margin-top: 5vmin;
`;

const Content = styled.p`
  font-size: 2vmin;
  margin-top: 2vmin;
`;

class ModalContent extends Component {
  render() {
    const { image } = this.props;

    return (
      <Row type="flex" justify="center" align="middle">
        <Col span={16}>
          <Media src={image} />
        </Col>
        <Col span={18}>
          <Content>
            DVSNet consists of three major steps:
            <br />
            DVSNet divides input frames into frame regions.
            <br />A Decision network (DN) analyzes the frame region pairs
            between the key and current frames, and evaluates a metric called
            the expected confidence score. According to the results, DVSNet
            selects a spatial warping path if the expected confidence score is
            larger than a pre-defined threshold, or a segmentation path
            otherwise.
            <br />
            Frame regions are forwarded to different paths to generate their
            regional semantic segmentations based on the decisions of DN. For
            the spatial warping path, a special warping function W is employed
            to process the the output of the flow network with the segmentation
            from the same region of the key frame.
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
