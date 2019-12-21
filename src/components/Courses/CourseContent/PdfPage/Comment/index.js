import PropTypes from 'prop-types';
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import jdenticon from 'jdenticon';
import { Comment as AntComment } from 'antd';

import settings from '../../../../../settings';
import { media } from '../../../../size';

import CommentList from './CommentList';
import Editor from './Editor';

const AllCommentBlock = styled.div`
  width: 100%;
  padding-left: 2vw;
  padding-right: 2vw;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  ${media.lessThan('md')`
    padding: 0 0;
  `};
`;

const NeedLogin = styled.div`
  height: 5vh;
  margin-top: 1vh;
  margin-bottom: 1vh;
`;
window.jdenticon_config = {
  replaceMode: 'observe',
};
jdenticon.config = {
  replaceMode: 'observe',
};
class Comment extends Component {
  state = {
    username: '',
    comments: [],
    submitting: false,
    value: '',
    lectureId: this.props.lectureId,
    nowPage: this.props.nowPage,
    pictureUrl: '',
  };

  componentWillMount() {
    const { nowPage } = this.state;
    // reset state
    this.setState({ nowPage });
    // if login load all comments under this page
    this.loadComment();
    // else render login only message

    const { token, user_id: userId } = localStorage;
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 1000,
      headers: {
        Authorization: `JWT ${token}`,
      },
    });

    ins
      .get(`user/${userId}`)
      .then(res => {
        this.setState({
          pictureUrl: res.data.profile.picture.file,
          username: res.data.profile.username,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.nowPage !== prevProps.nowPage) {
      this.loadComment();
    }
  }

  renderCommentForm = () => {
    const { token } = localStorage;
    const { submitting, value, pictureUrl } = this.state;
    // check login or not
    if (token) {
      if (pictureUrl) {
        return (
          <AntComment
            avatar={settings.backend_url + pictureUrl}
            content={
              <Editor
                onChange={e => this.handleChange('q_content', e)}
                onSubmit={this.handleSubmit}
                submitting={submitting}
                value={value}
              />
            }
          />
        );
      } else {
        return (
          <AntComment
            avatar={
              <svg
                width="80"
                height="80"
                data-jdenticon-value={this.state.username}
              />
            }
            content={
              <Editor
                onChange={e => this.handleChange('q_content', e)}
                onSubmit={this.handleSubmit}
                submitting={submitting}
                value={value}
              />
            }
          />
        );
      }
    }

    return (
      <NeedLogin>
        <div>
          <a href={`/login?redirect_url=${window.location.pathname}`}>登入</a>
          後才能留言喔！
        </div>
      </NeedLogin>
    );
  };

  // parse @ 被 tag 的人
  parseMetionTagInComment = content => {
    const pattern = /\B@[a-z0-9_-]+/gi;
    return content.match(pattern);
  };

  loadComment = () => {
    // if login load all comments under this page
    this.setState({ nowPage: this.props.nowPage });
    const { lectureId } = this.state;
    const { nowPage } = this.props;
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 1000,
    });
    ins
      .get(`lectures/${lectureId}/comments/${nowPage}`)
      .then(res => {
        // console.log(res.data);
        this.setState({ comments: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }
    this.setState({
      submitting: true,
    });

    const { lectureId, nowPage, value } = this.state;
    const { token, user_id: userId } = localStorage;
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 1000,
      headers: {
        Authorization: `JWT ${token}`,
      },
    });

    // write comment
    ins
      .post(`lectures/${lectureId}/comments/${nowPage}`, {
        user: userId,
        content: value,
        lecture: lectureId,
        file_page: nowPage,
      })
      .then(() => {
        this.setState({ submitting: false, value: '' });
        this.loadComment();
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleChange = (id, event) => {
    if (id === 'q_content') {
      this.setState({
        value: event.target.value,
        email_notify: {
          link: window.location.href,
          message_type: 'course_file_comment_reply',
          mentions: this.parseMetionTagInComment(event.target.value),
        },
      });
    }
  };

  render() {
    const { comments } = this.state;
    // console.log(comments);
    return (
      <div>
        <AllCommentBlock className="comment px-5">
          {comments && <CommentList comments={comments} />}
          {this.renderCommentForm()}
        </AllCommentBlock>
      </div>
    );
  }
}

Comment.propTypes = {
  lectureId: PropTypes.string.isRequired,
  nowPage: PropTypes.number.isRequired,
};

export default Comment;
