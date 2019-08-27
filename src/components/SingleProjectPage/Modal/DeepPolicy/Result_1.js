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
            Environment: the soccer field is a grid world composed of multiple
            grids of RGB pixels. A team’s goal is to deliver the ball to the
            opposing team’s goal area. ● 1 vs. 1 Scenario: Controllable agent
            competes with a rule-based agent in 6x9 grid world. ● 2 vs. 2
            Scenario: Controllable agent collaborates with: ○ A rule-based
            collaborator: 13x10 grid world ○ A learning agent: 21x14 grid world
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
