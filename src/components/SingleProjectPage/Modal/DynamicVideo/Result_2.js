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
            The balanced mode requires the accuracy of a network to be above 70%
            mIoU, while the high-speed mode requires the frame rate to be higher
            than 30 fps.
            <br />
            The DVSNet framework is able to significantly improve the
            performance of the three baseline models.
            <br />
            Decreasing the threshold leads to a drop in mIoU, but increases
            frame rate significantly.
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
