import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Input } from 'antd';

import settings from '../../../../settings';

const NewCourseArea = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 15vh;
`;

const InputText = styled.div`
  color: white;
  margin-top: 2vh;
  margin-bottom: 1vh;
`;

const InputAndDescriptionArea = styled.div`
  width: 100%;
  margin-bottom: 10vh;
  display: flex;
  justify-content: space-between;
`;
const InputArea = styled.div`
  width: 40%;
`;

const DescriptionArea = styled.div`
  width: 50%;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 1.5vw;
  color: white;
`;

const SubmitButton = styled.div`
  width: 12vw;
  height: 4vh;
  line-height: 4vh;
  font-size: 1.1vw;
  background-color: #535353;
  cursor: pointer;
`;

const ButtonText = styled.div`
  margin: auto;
  color: white;
  text-align: center;

  :hover {
    color: white;
  }
`;

class courseNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };
  }

  handleChange = (id, event) => {
    if (id === 'title') {
      this.setState({ title: event.target.value });
    } else if (id === 'description') {
      this.setState({ description: event.target.value });
    }
  };

  handleSubmit = event => {
    this.checkForm(event);
    const { token } = localStorage;
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 1000,
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    ins
      .post('courses', this.state)
      .then(res => {
        //console.log(res);
        window.location.href = '/management/courses';
      })
      .catch(error => {
        alert('請確認資料格式正確!');
        console.log(error);
      });
  };

  checkForm = () => {
    let reqCol = '';
    if (!this.state.title) {
      reqCol += 'title ';
    }
    if (!this.state.description) {
      reqCol += 'description ';
    }
    if (reqCol) {
      reqCol += 'is required.';
      window.alert(reqCol);
    }
  };

  render() {
    return (
      <NewCourseArea>
        <Header>
          <Title>Create a Course</Title>
          <SubmitButton onClick={this.handleSubmit}>
            <ButtonText>Submit</ButtonText>
          </SubmitButton>
        </Header>
        <InputAndDescriptionArea>
          <InputArea>
            <InputText>Title</InputText>
            <Input
              size="large"
              type="text"
              value={this.state.title}
              onChange={e => this.handleChange('title', e)}
            />
          </InputArea>
          <DescriptionArea>
            <InputText>Description</InputText>
            <textarea
              style={{ width: '100%', height: '100%' }}
              onChange={e => this.handleChange('description', e)}
            />
          </DescriptionArea>
        </InputAndDescriptionArea>
      </NewCourseArea>
    );
  }
}

export default courseNew;
