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
            In the training phase, DPIQN and DRPIQN agents are trained against
            rule-based agents with fixed policies in an episode. ● In the
            testing phase, the policies of the collaborator or opponents are no
            longer fixed. Each of them may randomly updates its policy mode. ●
            DPIQN and DRPIQN perform better when facing with unfamiliar
            collaborators than unfamiliar opponents. ● When collaborating with
            an unfamiliar agent, DPIQN and DRPIQN agents tend to score a goal by
            itself, due to its lack of knowledge about the collaborator’s
            intentions.
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
