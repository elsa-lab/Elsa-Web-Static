import PropTypes from 'prop-types';
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Input, Select } from 'antd';

import settings from '../../../../../settings';

const { Option } = Select;

const NewContentArea = styled.div`
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

class contentNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      course_no: '',
      year: '',
      season: '',
      time: '',
      ta_ids: [],
      ta_names: [],
      users: '',
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
      .get('users')
      .then(res => {
        //console.log(res);
        this.setState({ users: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange = (id, event) => {
    if (id === 'location') {
      this.setState({ location: event.target.value });
    } else if (id === 'year') {
      this.setState({ year: event.target.value });
    } else if (id === 'course_no') {
      this.setState({ course_no: event.target.value });
    } else if (id === 'season') {
      this.setState({ season: event.target.value });
    } else if (id === 'time') {
      this.setState({ time: event.target.value });
    }
  };

  handleSubmit = () => {
    const {
      params: { course_id },
    } = this.props;
    const { token } = localStorage;
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 1000,
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    ins
      .post(`courses/${course_id}/contents`, this.state)
      .then(res => {
        //console.log(res);
        window.location.href = `/management/courses/${course_id}`;
      })
      .catch(error => {
        alert('請確認資料格式正確!');
        console.log(error);
      });
  };

  render() {
    return (
      <NewContentArea>
        <Header>
          <Title>Create a Content</Title>
          <SubmitButton onClick={this.handleSubmit}>
            <ButtonText>Submit</ButtonText>
          </SubmitButton>
        </Header>
        <InputAndDescriptionArea>
          <InputArea>
            <InputText>Year</InputText>
            <Input
              size="large"
              type="text"
              value={this.state.year}
              onChange={e => this.handleChange('year', e)}
            />
            <InputText>Season</InputText>
            <Select
              defaultValue=""
              value={this.state.season}
              style={{ width: '100%' }}
              onChange={value => this.setState({ season: value })}
            >
              <Option value="">Choose Type</Option>
              <Option value="Spring">Spring</Option>
              <Option value="Fall">Fall</Option>
            </Select>
            <InputText>Course No</InputText>
            <Input
              size="large"
              type="text"
              value={this.state.course_no}
              onChange={e => this.handleChange('course_no', e)}
            />
            <InputText>Time</InputText>
            <Input
              size="large"
              type="text"
              value={this.state.time}
              onChange={e => this.handleChange('time', e)}
            />
            <InputText>Location</InputText>
            <Input
              size="large"
              type="text"
              value={this.state.location}
              onChange={e => this.handleChange('location', e)}
            />
          </InputArea>
        </InputAndDescriptionArea>
      </NewContentArea>
    );
  }
}

contentNew.propTypes = {
  params: PropTypes.shape({
    course_id: PropTypes.string.isRequired,
  }).isRequired,
};

export default contentNew;
