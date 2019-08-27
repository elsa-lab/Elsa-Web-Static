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
            Three Simulated Environments Rendered by 3D Unity: // Simple
            corridor: features straight passages, sharp turns, static obstacles
            (e.g, chairs), and moving obstacles (e.g, human). // Cluttered
            hallway:features a narrow hallway crammed with static obstacles, and
            moving obstacles. // Outdoor: features an outdoor roadway with
            sidewalks, buildings, terrain, as well as moving cars and
            pedestrians. Two Evaluation Tasks: // Obstacle avoidance: the
            agent’s goal is to navigate in a diverse set of scenes,and avoid
            colliding with obstacles. // Target following: the objective of the
            agent is to follow the moving target (person)while avoiding
            collisions.
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
