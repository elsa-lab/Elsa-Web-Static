import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';

const Media = styled.img`
  width: 80%;
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
        <Col span={8}>
          <Content>
            Our training method stems from that of DQN, with a modification of
            the definition of the loss function. We adopt two loss function
            terms LQ and LPI. The former is the standard DQN loss function. The
            latter is called the policy inference loss, and is obtained by
            computing the cross entropy loss between the inferred policy and the
            ground-truth one-hot action vector. The aggregated loss function can
            be expressed as: where λ is the adaptive scale factor used to
            adaptively scale LQ at different phases of the training process.
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
