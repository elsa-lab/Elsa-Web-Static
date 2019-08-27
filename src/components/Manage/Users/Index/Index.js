import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import settings from '../../../../settings';

const UsersBlocks = styled.div`
  padding-top: 6vh;
  width: 100%;
  height: 92vh;
  padding: 4vw 8vw 0;
  overflow-y: scroll;
`;

const EachUser = styled.div`
  font-size: 1vw;
  color: white;
`;

const UserContentHeader = styled.div`
  font-weight: bold;
  font-size: 1.2vw;
`;

class userIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentWillMount() {
    const { token } = localStorage;
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 1000,
      headers: {
        Authorization: `JWT ${token}`,
      },
    });

    ins
      .get('users')
      .then(res => {
        //console.log(res);
        this.setState({ users: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <UsersBlocks>
        {this.state.users.map(item => (
          <EachUser key={item.id}>
            <UserContentHeader>{item.username}</UserContentHeader>
            <div>{item.profile.studentType}</div>
            <hr />
          </EachUser>
        ))}
      </UsersBlocks>
    );
  }
}

export default userIndex;
