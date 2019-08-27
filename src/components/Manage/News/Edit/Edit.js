import PropTypes from 'prop-types';
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Input } from 'antd';
import { Value } from 'slate';

import settings from '../../../../settings';
import '../../../../../node_modules/sweetalert2/dist/sweetalert2.css';
import MarkdownEditor from '../../../Share/MarkdownEditor';

const EditNewsArea = styled.div`
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

class NewsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      content: '',
      image_url: '',
    };
  }

  componentWillMount() {
    const {
      params: { news_id },
    } = this.props;
    // const { token } = localStorage;
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 1000,
    });

    ins
      .get(`news/${news_id}`)
      .then(res => {
        //console.log(res);
        this.setState({
          ...res.data,
          content: Value.fromJSON(JSON.parse(res.data.content)),
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChangeFromParent = value => {
    this.setState({ content: value });
  };

  handleChange = (id, event) => {
    if (id === 'title') {
      this.setState({ title: event.target.value });
    } else if (id === 'description') {
      this.setState({ description: event.target.value });
    } else if (id === 'image_url') {
      this.setState({ image_url: event.target.value });
    }
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

  handleSubmit = event => {
    this.checkForm(event);
    const { token } = localStorage;
    const {
      params: { news_id },
    } = this.props;
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 1000,
      headers: {
        Authorization: `JWT ${token}`,
      },
    });

    ins
      .put(`news/${news_id}`, {
        ...this.state,
        content: JSON.stringify(this.state.content.toJSON()),
      })
      .then(res => {
        //console.log(res);
        window.location.href = '/management/news';
      })
      .catch(error => {
        alert('請確認資料格式正確!');
        console.log(error);
      });
  };

  render() {
    return (
      <EditNewsArea>
        <Header>
          <Title>Edit a News</Title>
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

            <InputText>Image Url</InputText>
            <Input
              size="large"
              type="text"
              value={this.state.image_url}
              onChange={e => this.handleChange('image_url', e)}
            />
          </InputArea>
          <DescriptionArea>
            <InputText>Description</InputText>
            <textarea
              style={{ width: '100%', height: '100%' }}
              value={this.state.description}
              onChange={e => this.handleChange('description', e)}
            />
          </DescriptionArea>
        </InputAndDescriptionArea>

        <InputText>Content</InputText>
        <MarkdownEditor
          handleChangeFromParent={this.handleChangeFromParent}
          content={this.state.content}
        />
      </EditNewsArea>
    );
  }
}

NewsEdit.propTypes = {
  params: PropTypes.shape({
    news_id: PropTypes.string.isRequired,
  }).isRequired,
};

export default NewsEdit;
