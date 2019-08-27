import PropTypes from 'prop-types';
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import swal from 'sweetalert2';
import { Link } from 'react-router';
import { Col, Row } from 'antd';

import { media } from '../../../../size';
import settings from '../../../../../settings';
import '../../../../../../node_modules/sweetalert2/dist/sweetalert2.css';

const ShowContentArea = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 15vh;
`;

const Blocks = styled.div`
  width: 100%;
  height: 85vh;
  overflow-y: scroll;

  ${media.lessThan('notebook')`
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

const EachBlock = styled.div`
  width: 100%;
  height: 20vh;
  background-color: rgba(0, 0, 0, 0.3);
  margin-bottom: 3vh;
  color: white;
  font-size: 1.2vw;

  ${media.lessThan('notebook')`
    margin-bottom: 0;
    margin-top: 2vh;
  `};
`;

const TextArea = styled.div`
  padding-left: 2.5vw;
  padding-right: 4vw;
  padding-top: 4.5vh;

  ${media.lessThan('notebook')`
    padding-top: 3.5vh;
    padding-left: 4vw;
    font-size:4vw;
  `};
`;

class contentShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: '',
      season: '',
      course_no: '',
      location: '',
      lectures: [],
    };
  }

  componentWillMount() {
    const {
      params: { course_id, content_id },
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
      .get(`courses/${course_id}/contents/${content_id}`)
      .then(res => {
        //console.log(res);
        this.setState(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteContent() {
    const {
      params: { course_id, content_id },
    } = this.props;
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
        .delete(`courses/${course_id}/contents/${content_id}`)
        .then(res => {
          //console.log(res);
          swal({
            title: 'Deleted!',
            text: 'Your content has been deleted.',
            type: 'success',
          }).then(() => {
            window.location.href = `/management/courses/${course_id}`;
          });
        })
        .catch(error => {
          console.log(error);
          swal('Deleted Fail', 'Your content has not been deleted.', 'error');
        });
    });
  }

  renderLectures() {
    const {
      params: { course_id, content_id },
    } = this.props;
    return this.state.lectures.map(item => (
      <Link
        to={`/management/courses/${course_id}/contents/${content_id}/lectures/${
          item.id
        }`}
        key={item.id}
      >
        <EachBlock>
          <Row type="flex">
            <Col span={24}>
              <TextArea>
                <div>Lecture {item.lecture_number}</div>
                <div>title: {item.title}</div>
                <div>description: {item.description}</div>
              </TextArea>
            </Col>
          </Row>
        </EachBlock>
      </Link>
    ));
  }

  render() {
    const {
      params: { course_id, content_id },
    } = this.props;
    return (
      <ShowContentArea>
        <Blocks>
          <Header>
            <Title>
              {this.state.year} - {this.state.season}
            </Title>
            <ButtonGroup>
              <Link
                to={`/management/courses/${course_id}/contents/${content_id}/edit`}
              >
                <SubmitButton>
                  <ButtonText>Edit</ButtonText>
                </SubmitButton>
              </Link>
              <SubmitButton onClick={e => this.deleteContent(e)}>
                <ButtonText>Delete</ButtonText>
              </SubmitButton>
            </ButtonGroup>
          </Header>
          <Content>
            <div>course number: {this.state.course_no}</div>
            <div>time: {this.state.time}</div>
            <div>location: {this.state.location}</div>
            <Link
              to={`/management/courses/${course_id}/contents/${content_id}/lectures/new`}
            >
              <SubmitButton>
                <ButtonText>Add Lecture</ButtonText>
              </SubmitButton>
            </Link>
            {this.renderLectures()}
          </Content>
        </Blocks>
      </ShowContentArea>
    );
  }
}

contentShow.propTypes = {
  params: PropTypes.shape({
    course_id: PropTypes.string.isRequired,
    content_id: PropTypes.string.isRequired,
  }).isRequired,
};

export default contentShow;
