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
              Visual Guidance Module for Target Decision: // The modular
              architecture can be augmented with a visual guidance module. // It
              does not require any re-training, fine-tuning, and extra data in
              the above scenarios.
            </Content>
          </Col>
          <Col span={6} offset={2}>
            <Content>
              Switching the Following Target: // It is easy to alter the target
              following robot’s objective by modifying the label to its new
              target. // Our agent is able to successfully follow or catch the
              randomly specified targets in either the simulated environments or
              the real world.
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
