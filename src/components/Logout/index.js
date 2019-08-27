import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Logout extends Component {
  componentDidMount() {
    delete localStorage.token;
    delete localStorage.user_id;
    this.props.router.push('/');
  }

  render() {
    return <div>{console.log('Logging out...')}</div>;
  }
}

Logout.propTypes = {
  router: PropTypes.object.isRequired,
};

export default Logout;
