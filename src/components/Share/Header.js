import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import { Link } from 'react-router';
import './style/nav.scss';

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

class Header extends Component {
  componentDidUpdate = () => {
    const Nav = document.querySelector('#nav');
    window.addEventListener('scroll', e => {
      if (window.pageYOffset !== 0) {
        Nav.style.backgroundColor = '#333';
        Nav.style.color = 'red';
      } else {
        Nav.style.backgroundColor = 'transparent';
      }
    });
  };

  renderLogin = () => {
    const { token } = localStorage;
    if (token) {
      return (
        <EachLink color={this.props.fontColor} to="/logout">
          <LinkCol>Sign out</LinkCol>
        </EachLink>
      );
    }
    return (
      <EachLink color={this.props.fontColor} to="/login">
        <LinkCol>Sign in</LinkCol>
      </EachLink>
    );
  };

  render() {
    return (
      <div id="nav" className="sticky-top">
        <Row type="flex" justify="end" align="middle">
          <Col span={2}>
            <EachLink color={this.props.fontColor} to="/">
              <LinkCol>Home</LinkCol>
            </EachLink>
          </Col>
          <Col span={2}>
            <EachLink color={this.props.fontColor} to="/courses">
              <LinkCol>Course</LinkCol>
            </EachLink>
          </Col>
          <Col span={3}>
            <EachLink color={this.props.fontColor} to="/publications">
              <LinkCol>Publications</LinkCol>
            </EachLink>
          </Col>
          <Col span={2}>
            <EachLink color={this.props.fontColor} to="/projects">
              <LinkCol>Projects</LinkCol>
            </EachLink>
          </Col>
          <Col span={2}>
            <EachLink color={this.props.fontColor} to="/news">
              <LinkCol>News</LinkCol>
            </EachLink>
          </Col>
          <Col span={2}>{this.renderLogin()}</Col>
        </Row>
      </div>
    );
  }
}

Header.propTypes = {
  fontColor: PropTypes.string.isRequired,
};

export default Header;
