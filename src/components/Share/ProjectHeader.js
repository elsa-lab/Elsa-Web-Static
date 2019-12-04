import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import { Link } from 'react-router';

import './style/nav.scss';
import logo from '../static/icon.png';

const EachLink = styled(Link)`
  color: ${props => props.color};
  text-decoration: none !important;
`;

const LinkCol = styled(Col)`
  font-size: 1vw;
  text-align: center;
  padding-top: 3vh;
  padding-bottom: 1vh;

  ${EachLink}:hover & {
    cursor: pointer;
    color: white;
    background-color: black;
    opacity: 0.5;
  }
`;

class ProjectHeader extends Component {
  renderLogin = () => {
    const { token } = localStorage;
    if (token) {
      return (
        <a className="nav-link" href="/logout">
          Sign out
        </a>
      );
    }
    return (
      <a className="nav-link" href="/login">
        Sign in
      </a>
    );
  };

  render() {
    return (
      <nav className="navbar" id="project-nav">
        <a className="navbar-brand" href="/">
          <img
            src={logo}
            width="45"
            height="45"
            className="d-inline-block"
            alt=""
          />
          <div className="logo-content">
            <div>NTHU</div>
            <div>Elsa</div>
          </div>
        </a>
        <ul className="d-flex">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/courses">
              Courses
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/publications">
              Publications
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/projects">
              Projects
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/news">
              News
            </a>
          </li>{' '}
          <li className="nav-item">{this.renderLogin()}</li>
        </ul>
      </nav>
    );
  }
}

ProjectHeader.propTypes = {
  fontColor: PropTypes.string.isRequired,
};

export default ProjectHeader;
