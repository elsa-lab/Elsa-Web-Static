import React, { Component } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';

const Content = styled.p`
  font-size: 2vmin;
  margin-top: 4vmin;
`;

class ModalContent extends Component {
  render() {
    return (
      <Row type="flex" justify="center" align="middle">
        <Col span={8}>
          <Content>
            DPIQN consists of three major parts: a feature extraction module, a
            Q-value learning module, and an auxiliary policy feature learning
            module. > The feature extraction module is a convolutional neural
            network (CNN) shared between the latter two modules, and is
            responsible for extracting the spatial-temporal features from the
            latest k observations. > The Q-value learning module is trained to
            approximate the optimal Q-function. > The auxiliary feature learning
            module focuses on learning “policy features” from the other agents’
            policies. The learned policy features are incorporated into the
            Q-value learning module to derive better Q-values. DRPIQN is an
            enhanced version of DPIQN, which incorporates additional recurrent
            units for handling partial observability, with an emphasis on
            decreasing the hidden state representation noise from strategy
            changing of the other agents in the environment.
          </Content>
        </Col>
      </Row>
    );
  }
}

export default ModalContent;
