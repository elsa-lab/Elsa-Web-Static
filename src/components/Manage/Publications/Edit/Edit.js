import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import axios from 'axios';
import { Input, Icon } from 'antd';
import styled from 'styled-components';

import settings from '../../../../settings';

const NewPublicationArea = styled.div`
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

const InputArea = styled.div`
  width: 40%;
  margin-bottom: 10vh;
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

const UploadArea = styled.div`
  height: 20vh;
  width: 100%;
  background-color: #cfcfcf;
  position: relative;
`;

const FileBlock = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const DeleteIcon = styled(Icon)`
  margin-left: 0.5vw;
  cursor: pointer;
`;

class publicationEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      code_url: 'empty',
      arXiv_url: '',
      files: '',
    };
  }

  componentWillMount() {
    const {
      params: { publication_id },
    } = this.props;
    const { token } = localStorage;
    const ins = axios.create({
      baseURL: settings.backend_url,
      headers: {
        Authorization: `JWT ${token}`,
      },
    });

    ins
      .get(`publications/${publication_id}`)
      .then(res => {
        //console.log(res);
        this.setState(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  onDrop(file) {
    if (this.state.files) {
      alert('最多上傳一個檔案');
      return;
    }
    const files = [];
    const reader = new FileReader();
    const rea = this;
    reader.onload = () => {
      files.push({
        title: file[0].name,
        preview: file[0].preview,
        size: file[0].size,
        type: file[0].type,
        data: reader.result,
      });
      rea.setState({
        files,
      });
    };
    reader.readAsDataURL(file[0]);
  }

  handleChange = (id, event) => {
    if (id === 'title') {
      this.setState({ title: event.target.value });
    } else if (id === 'code_url') {
      this.setState({ code_url: event.target.value });
    } else if (id === 'arXiv_url') {
      this.setState({ arXiv_url: event.target.value });
    }
  };

  handleSubmit = () => {
    const {
      params: { publication_id },
    } = this.props;
    const { token } = localStorage;
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 10000,
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    ins
      .put(`publications/${publication_id}`, this.state)
      .then(res => {
        //console.log(res);
        window.location.href = `/management/publications`;
      })
      .catch(error => {
        alert('請確認資料格式正確!');
        console.log(error);
      });
  };

  delFile() {
    const {
      params: { publication_id },
    } = this.props;
    // delete file from backend
    const { token } = localStorage;
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 1000,
      headers: {
        Authorization: `JWT ${token}`,
      },
    });

    ins
      .delete(`publications/${publication_id}/file`)
      .then(res => {
        //console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
    // delete file from react state
    this.setState({
      files: '',
    });
  }

  renderFileInfo() {
    if (this.state.files) {
      return (
        <FileBlock>
          {this.state.title}
          <DeleteIcon
            type="delete"
            style={{ marginLeft: '1vw' }}
            onClick={e => this.delFile(e)}
          />
        </FileBlock>
      );
    }
  }

  render() {
    const { files } = this.state;

    return (
      <NewPublicationArea>
        <Header>
          <Title>Edit a Publication</Title>
          <SubmitButton onClick={this.handleSubmit}>
            <ButtonText>Submit</ButtonText>
          </SubmitButton>
        </Header>
        <InputArea>
          <InputText>Title</InputText>
          <Input
            size="large"
            type="text"
            value={this.state.title}
            onChange={e => this.handleChange('title', e)}
          />

          <InputText>Arxiv Url</InputText>
          <Input
            size="large"
            type="text"
            value={this.state.arXiv_url}
            onChange={e => this.handleChange('arXiv_url', e)}
          />
        </InputArea>
        <InputText>
          Upload PDF{' '}
          <span style={{ color: 'red', fontWeight: 'bold' }}>( 4 : 3 )</span> :
          by dropping file into the block or clicking button
        </InputText>
        <UploadArea>
          <Dropzone
            style={{ width: '100%', height: '100%' }}
            disabled={files.length > 0}
            onDrop={this.onDrop.bind(this)}
          />
          {this.renderFileInfo()}
        </UploadArea>
      </NewPublicationArea>
    );
  }
}

publicationEdit.propTypes = {
  params: PropTypes.shape({
    publication_id: PropTypes.string.isRequired,
  }).isRequired,
};

export default publicationEdit;
