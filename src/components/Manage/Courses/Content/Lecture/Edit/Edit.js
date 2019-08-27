import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Input, Icon } from 'antd';

import settings from '../../../../../../settings';

const EditLectureArea = styled.div`
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
  margin-bottom: 10vh;
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

class lectureEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      files: [],
    };
  }

  componentWillMount() {
    const {
      params: { course_id, content_id, lecture_id },
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
      .get(`courses/${course_id}/contents/${content_id}/lectures/${lecture_id}`)
      .then(res => {
        //console.log(res);
        this.setState(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  onDrop(file) {
    const { files } = this.state;
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

  handleSubmit = () => {
    const {
      params: { course_id, content_id, lecture_id },
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
      .put(
        `courses/${course_id}/contents/${content_id}/lectures/${lecture_id}`,
        this.state
      )
      .then(res => {
        //console.log(res);
        window.location.href = `/management/courses/${course_id}/contents/${content_id}`;
      })
      .catch(error => {
        alert('請確認資料格式正確!');
        console.log(error);
      });
  };

  handleChange = (id, event) => {
    if (id === 'title') {
      this.setState({ title: event.target.value });
    } else if (id === 'description') {
      this.setState({ description: event.target.value });
    }
  };

  delFile(index) {
    let file_id;
    const { files } = this.state;
    // delete file from backend
    if (files[index].id) {
      file_id = files[index].id;
      const { token } = localStorage;
      const ins = axios.create({
        baseURL: settings.backend_url,
        timeout: 1000,
        headers: {
          Authorization: `JWT ${token}`,
        },
      });

      ins
        .delete(`files/${file_id}`)
        .then(res => {
          //console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    }
    // delete file from react state
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
      <EditLectureArea>
        <Header>
          <Title>Edit a Lecture</Title>
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
              value={this.state.description}
              style={{ width: '100%', height: '100%' }}
              onChange={e => this.handleChange('description', e)}
            />
          </DescriptionArea>
        </InputAndDescriptionArea>

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
      </EditLectureArea>
    );
  }
}

lectureEdit.propTypes = {
  params: PropTypes.shape({
    course_id: PropTypes.string.isRequired,
    content_id: PropTypes.string.isRequired,
    lecture_id: PropTypes.string.isRequired,
  }).isRequired,
};

export default lectureEdit;
