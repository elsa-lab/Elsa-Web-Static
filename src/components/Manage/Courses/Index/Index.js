import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
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

class courseIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
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
      .get('courses')
      .then(res => {
        //console.log(res);
        this.setState({ courses: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderCourses = () =>
    this.state.courses.map(({ id: courseId, title }) => (
      <Link to={`/management/courses/${courseId}`} key={courseId}>
        <EachBlock>
          <TextArea>
            <Title>{title}</Title>
          </TextArea>
        </EachBlock>
      </Link>
    ));

  render() {
    return (
      <Blocks>
        <AddButtonBlock>
          <Link to="/management/course/new">
            <AddButton>
              <ButtonText>Create a Course</ButtonText>
            </AddButton>
          </Link>
        </AddButtonBlock>
        {this.renderCourses()}
      </Blocks>
    );
  }
}

export default courseIndex;
