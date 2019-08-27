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
            The model consists of a perception and a control module: <br />

            cameras into scene semantic segmentation. // The control module
            takes image segmentation as inputs.
            <br /> <br /> Training Methodology: // During training, the control
            module only receives the image segmentations rendered by simulators.
            <br /> 
            segmentations from the perception module. // The perception module
            is only used during execution.
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
