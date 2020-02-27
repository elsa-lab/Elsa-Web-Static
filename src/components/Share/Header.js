import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import './style/nav.scss';
import { FormattedMessage } from 'react-intl';

const EachLink = styled(Link)`
  color: ${props => props.color};
  text-decoration: none !important;
  height: 100%;
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
  renderLogin = () => {
    const { token } = localStorage;
    if (token) {
      return (
        <EachLink color={this.props.fontColor} to="/logout">
          <LinkCol>
            <FormattedMessage id="header_signout" />
          </LinkCol>
        </EachLink>
      );
    }
    return (
      <EachLink color={this.props.fontColor} to="/login">
        <LinkCol>
          <FormattedMessage id="header_signin" />
        </LinkCol>
      </EachLink>
    );
  };

  render() {
    return (
      <div id="nav" className="sticky-top">
        <Row type="flex" justify="space-around" align="middle">
          <Col span={2}>
            <EachLink color={this.props.fontColor} to="/">
              <LinkCol>
                <FormattedMessage id="header_home" />
              </LinkCol>
            </EachLink>
          </Col>
          <Col span={2}>
            <EachLink color={this.props.fontColor} to="/courses">
              <LinkCol>
                <FormattedMessage id="header_course" />
              </LinkCol>
            </EachLink>
          </Col>
          <Col span={3}>
            <EachLink color={this.props.fontColor} to="/publications">
              <LinkCol>
                <FormattedMessage id="header_publications" />
              </LinkCol>
            </EachLink>
          </Col>
          <Col span={2}>
            <EachLink color={this.props.fontColor} to="/projects">
              <LinkCol>
                <FormattedMessage id="header_projects" />
              </LinkCol>
            </EachLink>
          </Col>
          <Col span={2}>
            <EachLink color={this.props.fontColor} to="/news">
              <LinkCol>
                <FormattedMessage id="header_news" />
              </LinkCol>
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
