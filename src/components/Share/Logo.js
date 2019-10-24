import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Drawer as DrawerAntd } from 'antd';
import { Link } from 'react-router';

import IconImg from '../static/icon.png';
import './style/logo.scss';

const EachLink = styled(Link)`
  text-decoration: none !important;
`;

const LinkBlock = styled.div`
  height: 10vh;
  color: black;
`;

class Logo extends Component {
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

  render() {
    return (
      <div id="logo">
        <div className="mainRow d-none d-sm-none d-md-none d-lg-none d-xl-block">
          <a style={{ textDecoration: 'none' }} className="col-md-10" href="/">
            <div className="iconBox">
              <div className="iconImg">
                <img src={IconImg} alt="" />
              </div>
              <div className="iconText">
                <h3>NTHU</h3>
                <h3>ELSA</h3>
              </div>
            </div>
          </a>
          <div className="smallContent col-md-10">
            <hr /> Professor : Chun-Yi Lee
          </div>
          <h3 className="col-md-10">{this.props.time}</h3>
          <h1 className="col-md-10">{this.props.content}</h1>
          <p className="col-md-10 ml-1 mt-4">{this.props.describe}</p>
        </div>
        <div className="mainRow-mobile d-xl-none">
          <h3 className="d-xl-none" style={{ color: 'white' }}>
            {this.props.content}
          </h3>
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
      </div>
    );
  }
}

Logo.propTypes = {
  content: PropTypes.string.isRequired,
  describe: PropTypes.string,
  time: PropTypes.string,
};

Logo.defaultProps = {
  describe: ' ',
  time: ' ',
};

export default Logo;
