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
            Frame Region Based Execution:
            <br />
            The curves represent the values of the confidence score versus time
            for different frame regions.
            <br />
            For most of the time, the confidence scores of different frame
            regions vary significantly.
            <br />
            For those scenarios, it is not necessary to feed the entire frame to
            the segmentation network.
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
