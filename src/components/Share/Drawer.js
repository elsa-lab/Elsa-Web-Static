import React, { Component } from 'react';
import styled from 'styled-components';
import { Drawer as DrawerAntd } from 'antd';
import { Link } from 'react-router';

const MenuIcon = styled.i`
  font-size: 8vw;
  color: white;
  margin-left: 2vw;
`;

const EachLink = styled(Link)`
  /* color: ${props => props.color}; */
  text-decoration: none !important;
`;

const LinkBlock = styled.div`
  height: 10vh;
  color: black;
`;

class Drawer extends Component {
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
      <div>
        <MenuIcon className="fas fa-bars" onClick={this.showDrawer} />
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
    );
  }
}

export default Drawer;
