import PropTypes from 'prop-types';
import React, { Component } from 'react';
import axios from 'axios';

import Manage from '../components/Manage';
import settings from '../settings';

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { user_id } = localStorage;
    const { token } = localStorage;
    const {
      location: { pathname: path },
    } = this.props;

    if (token) {
      const ins = axios.create({
        baseURL: settings.backend_url,
        timeout: 1000,
        headers: {
          Authorization: `JWT ${token}`,
        },
      });

      ins
        .get(`user/${user_id}`)
        .then(res => {
          // console.log(res);
          // this.setState({ user: res.data, logIn: true });
          // if user not in root_user_types redirect to '/'
          if (
            path.includes('management') &&
            !settings.root_user_types.includes(res.data.profile.studentType)
          ) {
            window.location = '/';
          }
        })
        .catch(error => {
          console.log(error);
          delete localStorage.token;
          delete localStorage.user_id;
          alert('已登出 ( 原因: 此帳號可能有重複登入 )');
          window.location = '/';
          // this.setState({ logIn: false });
        });
    } else if (path.includes('management')) {
      // if user not in root_user_types redirect to '/'
      window.location = '/';
    }
  }

  render() {
    const {
      location: { pathname: path },
    } = this.props;

    return (
      <div>
        {path.includes('management') ? (
          <Manage>{this.props.children}</Manage>
        ) : (
          this.props.children
        )}
      </div>
    );
  }
}

Template.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Template;
