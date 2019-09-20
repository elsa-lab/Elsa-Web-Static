import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Comment, List } from 'antd';

const ListBlock = styled.div`
  margin-top: -3vh;
`;

const timeFormat = timeStr => {
  const t = moment(timeStr);
  const formatted = t.format('YYYY-MM-DD hh:mm');
  return formatted;
};
const CommentList = ({ comments }) => (
  <ListBlock>
    <List
      dataSource={comments}
      itemLayout="horizontal"
      renderItem={props => {
        const {
          author: {
            username,
            profile: { pictureUrl },
          },
          content,
          created_at: createdAt,
        } = props;

        return (
          <Comment
            author={username}
            avatar={pictureUrl}
            content={content}
            datetime={timeFormat(createdAt)}
          />
        );
      }}
    />
  </ListBlock>
);

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default CommentList;
