import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';

const Media = styled.img`
  width: 60%;
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
      <>
        <Row type="flex" justify="center" align="middle">
          <Col span={10} offset={4}>
            <Media src={image[0]} />
          </Col>
          <Col span={10}>
            <Media src={image[1]} />
          </Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col span={8}>
            <Content>
              A higher ratio indicates that more frame regions are forwarded to
              the spatial warping path.
            </Content>
          </Col>
          <Col span={6} offset={2}>
            <Content>
              The depth of overlapped pixels between adjacent frame regions
              affects mIoU significantly. A empirical value of 64 pixel seems to
              be optimal.
            </Content>
          </Col>
        </Row>
      </>
    );
  }
}

ModalContent.propTypes = {
  image: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ModalContent;
