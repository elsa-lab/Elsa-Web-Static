import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Comment as AntComment, List } from 'antd';

import settings from '../../../../../settings';

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
          // eslint-disable-next-line react/prop-types
          author: {
            username,
            profile: { nick_name, picture },
          },
          content,
          created_at: createdAt,
        } = props;
        if (picture) {
          // console.log(picture.file);
          return (
            <AntComment
              avatar={settings.backend_url + picture.file}
              author={nick_name}
              content={content}
              datetime={timeFormat(createdAt)}
            />
          );
        } else {
          return (
            <AntComment
              avatar={
                <svg width="32" height="32" data-jdenticon-value={username} />
              }
              author={nick_name}
              content={content}
              datetime={timeFormat(createdAt)}
            />
          );
        }
      }}
    />
  </ListBlock>
);

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default CommentList;
