import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';

import settings from '../../../../settings';
import { media } from '../../../size';

const Blocks = styled.div`
  padding-top: 6vh;
  width: 100%;
  height: 92vh;
  overflow-y: scroll;

  ${media.lessThan('md')`
    padding-top: 0;
    height: 100%;
  `};
`;

const EachBlock = styled.div`
  width: 100%;
  height: 20vh;
  background-color: rgba(0, 0, 0, 0.3);
  margin-bottom: 3vh;
  color: white;
  font-size: 1.2vw;

  ${media.lessThan('md')`
    margin-bottom: 0;
    margin-top: 2vh;
  `};
`;

const TextArea = styled.div`
  padding-left: 2.5vw;
  padding-right: 4vw;
  padding-top: 4.5vh;

  ${media.lessThan('md')`
    padding-top: 3.5vh;
    padding-left: 4vw;
    font-size:4vw;
  `};
`;

const Title = styled.div`
  font-size: 2vw;
  padding-top: 1vh;

  ${media.lessThan('md')`
    font-size:5vw;
  `};
`;

const LinkArea = styled.div`
  width: 100%;
  height: 20vh;
`;

const LinkBlock = styled.div`
  width: 100%;
  height: 50%;
  background-color: ${props => props.color};
  display: flex;
`;

const LinkText = styled.a`
  margin: auto;
  color: white;

  :hover {
    color: white;
  }
`;

const AddButton = styled.div`
  width: 15vw;
  height: 5vh;
  line-height: 5vh;
  font-size: 1.2vw;
  background-color: #535353;
`;

const ButtonText = styled.div`
  margin: auto;
  color: white;
  text-align: center;

  :hover {
    color: white;
  }
`;

const AddButtonBlock = styled.div`
  margin-left: 3vw;
  margin-bottom: 5vh;
`;

class publicationsIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publications: [],
    };
  }

  componentWillMount() {
    const { token } = localStorage;
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 1000,
      headers: {
        Authorization: `JWT ${token}`,
      },
    });

    ins
      .get('publications')
      .then(res => {
        //console.log(res);
        this.setState({ publications: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderPublications = () =>
    this.state.publications.map(
      ({
        id: publicationId,
        title,
        // code_url: codeUrl,
        arXiv_url: arXivUrl,
        files,
      }) => (
        <Link to={`/management/publications/${publicationId}`}>
          <EachBlock key={publicationId}>
            <Row type="flex">
              <Col span={20}>
                <TextArea>
                  <Title>{title}</Title>
                </TextArea>
              </Col>
              <Col span={4}>
                <LinkArea>
                  <LinkBlock color="rgba(0, 0, 0, 0.3)">
                    <LinkText href={arXivUrl}>arXiv</LinkText>
                  </LinkBlock>
                  <LinkBlock color="rgba(0, 0, 0, 0.4)">
                    <LinkText href={files.url}>PDF</LinkText>
                  </LinkBlock>
                </LinkArea>
              </Col>
            </Row>
          </EachBlock>
        </Link>
      )
    );

  render() {
    return (
      <Blocks>
        <AddButtonBlock>
          <Link to="/management/publications/new">
            <AddButton>
              <ButtonText>Create a Publication</ButtonText>
            </AddButton>
          </Link>
        </AddButtonBlock>
        {this.renderPublications()}
      </Blocks>
    );
  }
}

export default publicationsIndex;
