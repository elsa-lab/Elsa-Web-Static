import Dropzone from 'react-dropzone';
import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import styled from 'styled-components';
import { Input, Icon } from 'antd';

import settings from '../../../../settings';
import '../../../../../node_modules/sweetalert2/dist/sweetalert2.css';

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

class publicationNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      code_url: 'empty',
      arXiv_url: '',
      files: [],
    };
  }

  onDrop(file) {
    const { files } = this.state;
    if (files.length === 1) {
      swal('One file only', '', 'error');
      return;
    }
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

  checkForm = () => {
    let reqCol = '';
    if (!this.state.title) {
      reqCol += 'title ';
    }
    if (reqCol) {
      reqCol += 'is required.';
      window.alert(reqCol);
    }
  };

  handleSubmit = event => {
    this.checkForm(event);
    const { token } = localStorage;
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 10000,
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    ins
      .post('publications', this.state)
      .then(res => {
        //console.log(res);
        window.location.href = '/management/publications';
      })
      .catch(error => {
        alert('請確認資料格式正確!');
        console.log(error);
      });
  };

  delFile(index) {
    const { files } = this.state;
    files.splice(index, 1);
    this.setState({
      files,
    });
  }

  renderFileInfo() {
    return this.state.files.map((f, index) => (
      <FileBlock key={index}>
        {f.title}
        <DeleteIcon
          type="delete"
          style={{ marginLeft: '1vw' }}
          onClick={e => this.delFile(index, e)}
        />
      </FileBlock>
    ));
  }

  render() {
    const { files } = this.state;

    return (
      <NewPublicationArea>
        <Header>
          <Title>Create a Publication</Title>
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

export default publicationNew;
