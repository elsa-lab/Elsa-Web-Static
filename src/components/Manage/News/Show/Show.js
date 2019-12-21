import PropTypes from 'prop-types';
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import swal from 'sweetalert2';
import { Link } from 'react-router';

import { media } from '../../../size';
import MarkdownEditor from '../../../Share/MarkdownEditor';
import settings from '../../../../settings';
import '../../../../../node_modules/sweetalert2/dist/sweetalert2.css';

const ShowNewsArea = styled.div`
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

const ImageArea = styled.div`
  width: 100%;
  height: 20vh;
  background: url(${props => props.image});
  background-size: cover;
  background-position: center center;
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
`;

const ButtonText = styled.div`
  margin: auto;
  color: white;
  text-align: center;

  :hover {
    color: white;
  }
`;

class newsShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  componentWillMount() {
    const {
      params: { news_id },
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
      .get(`news/${news_id}`)
      .then(res => {
        //console.log(res);
        this.setState(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteNews = () => {
    const {
      params: { news_id },
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
        .delete(`news/${news_id}`)
        .then(res => {
          //console.log(res);
          swal({
            title: 'Deleted!',
            text: 'Your content has been deleted.',
            type: 'success',
          }).then(() => {
            window.location.href = '/management/news';
          });
        })
        .catch(error => {
          console.log(error);
          swal(
            'Deleted Fail',
            'Your publication has not been deleted.',
            'error'
          );
        });
    });
  };

  render() {
    const {
      params: { news_id },
    } = this.props;

    return (
      <ShowNewsArea>
        <Blocks>
          <Header>
            <Title>{this.state.title}</Title>
            <ButtonGroup>
              <Link to={`/management/news/${news_id}/edit`}>
                <SubmitButton>
                  <ButtonText>Edit</ButtonText>
                </SubmitButton>
              </Link>
              <SubmitButton onClick={e => this.deleteNews(e)}>
                <ButtonText>Delete</ButtonText>
              </SubmitButton>
            </ButtonGroup>
          </Header>
          <ImageArea image={this.state.image_url} />
          <MarkdownEditor content={this.state.content} readOnly />
        </Blocks>
      </ShowNewsArea>
    );
  }
}

newsShow.propTypes = {
  params: PropTypes.shape({
    news_id: PropTypes.string.isRequired,
  }).isRequired,
};

export default newsShow;
