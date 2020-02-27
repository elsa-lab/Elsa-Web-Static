import React, { Component } from 'react';
import './style/nav.scss';
import styled from 'styled-components';
import { Drawer as DrawerAntd } from 'antd';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import IconImg from '../static/icon.png';

const EachLink = styled(Link)`
  text-decoration: none !important;
`;

const LinkBlock = styled.div`
  height: 10vh;
  color: black;
`;

class ProjectHeader extends Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  componentDidMount = () => {
    document.addEventListener('scroll', () => {
      const offset = document.documentElement.scrollTop;
      if (offset >= 80) {
        document.querySelector('#project-nav').style.backgroundColor = 'white';
        document.querySelector('#project-nav').style.boxShadow =
          '#0000003d 0 3px 10px';
      } else {
        document.querySelector('#project-nav').style.backgroundColor =
          'transparent';
        document.querySelector('#project-nav').style.boxShadow = 'none';
      }
    });
  };

  renderLogin = () => {
    const { token } = localStorage;
    if (token) {
      return (
        <a className="nav-link" href="/logout">
          <FormattedMessage id="header_signout" />
        </a>
      );
    }
    return (
      <a className="nav-link" href="/login">
        <FormattedMessage id="header_signin" />
      </a>
    );
  };

  render() {
    return (
      <nav className="navbar sticky-top" id="project-nav">
        <a className="navbar-brand" href="/">
          <img src={IconImg} className="d-inline-block" alt="" />
          <div className="logo-content">
            <div>NTHU</div>
            <div>Elsa</div>
          </div>
        </a>
        <div className="d-md-none d-lg-none d-xl-none">
          <i className="fas fa-bars d-xl-none" onClick={this.showDrawer} />
          <DrawerAntd
            title="Elsa Lab"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <EachLink to="/">
              <LinkBlock>Home</LinkBlock>
            </EachLink>
            <EachLink to="/courses">
              <LinkBlock color="dark">Course</LinkBlock>
            </EachLink>
            <EachLink to="/publications">
              <LinkBlock>Publications</LinkBlock>
            </EachLink>
            <EachLink to="/projects">
              <LinkBlock color="dark">Projects</LinkBlock>
            </EachLink>
            <EachLink to="/news">
              <LinkBlock>News</LinkBlock>
            </EachLink>
          </DrawerAntd>
        </div>
        <ul className="d-md-flex d-none">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              <FormattedMessage id="header_home" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/courses">
              <FormattedMessage id="header_course" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/publications">
              <FormattedMessage id="header_publications" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/projects">
              <FormattedMessage id="header_projects" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/news">
              <FormattedMessage id="header_news" />
            </a>
          </li>{' '}
          <li className="nav-item">{this.renderLogin()}</li>
        </ul>
      </nav>
    );
  }
}

export default ProjectHeader;
