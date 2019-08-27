import React from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';

import BackgroundImageFooter from '../static/background_image_footer.jpg';
import { media } from '../size';

const Background = styled.div`
  background: url(${BackgroundImageFooter});
  background-position: center bottom;
  background-size: cover;
  width: 100%;
  height: 100%;
  z-index: -100;
`;

const Card = styled.div`
  width: 100%;
  height: 35vmin;
  border: 2vmin solid white;
  margin: 12vmin 0 10vmin 0;

  ${media.lessThan('notebook')`
    height: 20vmin;
  `};
`;

const Block = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  padding: 2vmin 4vmin 2vmin;
  font-size: 5vmin;
`;

const Arrow = styled.div`
  font-size: 4vmin;
  color: rgb(121, 153, 255);
  margin-bottom: -1vmin;
`;

const Title = styled.div`
  font-size: 7vmin;
  font-weight: bold;
  color: white;

  ${media.lessThan('notebook')`
    font-size: 5vmin;
  `};
`;

const Topic = () => (
  <div className="section fp-auto-height">
    <Background>
      <Row type="flex" justify="end">
        <Col xs={{ span: 20 }} xl={{ span: 12 }}>
          <Card>
            <Block>
              <Arrow>Next Project &#8811;</Arrow>
              <Title>Semantic Highlight Restrieval</Title>
            </Block>
          </Card>
        </Col>
      </Row>
    </Background>
  </div>
);

export default Topic;
