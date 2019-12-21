import PropTypes from 'prop-types';
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import swal from 'sweetalert2';
import { Link } from 'react-router';

import { media } from '../../../../../size';
import '../../../../../../../node_modules/sweetalert2/dist/sweetalert2.css';
import settings from '../../../../../../settings';

const ShowLectureArea = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 15vh;
`;

const Blocks = styled.div`
  width: 100%;
  height: 85vh;
  overflow-y: scroll;

  ${media.lessThan('md')`
    padding-top: 0;
    height: 100%;
  `};
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1vw;
`;

const Title = styled.div`
  width: 60%;
  font-weight: bold;
  font-size: 1.5vw;
  color: white;
`;

const ButtonGroup = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-evenly;
`;

const SubmitButton = styled.div`
  width: 8vw;
  height: 5vh;
  line-height: 5vh;
  font-size: 1.1vw;
  background-color: #535353;
  cursor: pointer;
  margin-top: 2vh;
  margin-bottom: 3vh;
`;

const ButtonText = styled.div`
  margin: auto;
  color: white;
  text-align: center;

  :hover {
    color: white;
  }
`;

const Content = styled.div`
  color: white;
  font-size: 1.1vw;
  padding: 1vw;
`;

class lectureShow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  deleteLecture() {
    const {
      params: { course_id, content_id, lecture_id },
    } = this.props;
    // sweet alert
    swal({
      title: 'Are you sure?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(() => {
      const { token } = localStorage;
      const ins = axios.create({
        baseURL: settings.backend_url,
        timeout: 1000,
        headers: {
          Authorization: `JWT ${token}`,
        },
      });

      ins
        .delete(
          `courses/${course_id}/contents/${content_id}/lectures/${lecture_id}`
        )
        .then(res => {
          //console.log(res);
          swal({
            title: 'Deleted!',
            text: 'Your lecture has been deleted.',
            type: 'success',
          }).then(() => {
            window.location.href = `/management/courses/${course_id}/contents/${content_id}`;
          });
        })
        .catch(error => {
          console.log(error);
          swal('Deleted Fail', 'Your lecture has not been deleted.', 'error');
        });
    });
  }

  renderFile() {
    if (this.state.files) {
      return this.state.files.map(item => (
        <li key={item.id}>
          <a href={item.url}>{item.title}</a>
        </li>
      ));
    }
  }

  render() {
    const {
      params: { course_id, content_id, lecture_id },
    } = this.props;
    return (
      <ShowLectureArea>
        <Blocks>
          <Header>
            <Title>
              Lecture {this.state.lecture_number} - {this.state.title}
            </Title>
            <ButtonGroup>
              <Link
                to={`/management/courses/${course_id}/contents/${content_id}/lectures/${lecture_id}/edit`}
              >
                <SubmitButton>
                  <ButtonText>Edit</ButtonText>
                </SubmitButton>
              </Link>
              <SubmitButton onClick={e => this.deleteLecture(e)}>
                <ButtonText>Delete</ButtonText>
              </SubmitButton>
            </ButtonGroup>
          </Header>
          <Content>
            <div>description: {this.state.description}</div>
            {this.renderFile()}
          </Content>
        </Blocks>
      </ShowLectureArea>
    );
  }
}

lectureShow.propTypes = {
  params: PropTypes.shape({
    course_id: PropTypes.string.isRequired,
    content_id: PropTypes.string.isRequired,
    lecture_id: PropTypes.string.isRequired,
  }).isRequired,
};

export default lectureShow;
