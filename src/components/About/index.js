import MediaQuery from 'react-responsive';
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Col, Row, Drawer as DrawerAntd } from 'antd';
import jdenticon from 'jdenticon';
import { Link } from 'react-router-dom';

import Header from '../Share/Header';
import settings from '../../settings';
import Logo from '../Share/Logo';
import MobileContent from '../Share/MobileContent';
import IconImg from '../static/icon.png';
import {
  BackgroundColor,
  BigTitle,
  Hr,
  IconImage,
  LogoContent,
  MainRow,
  MedContent,
  PageLink,
  SmallContent,
  Text,
  Title1,
  Title2,
  TitleText,
} from '../Share';
import { media, xl, lg, md, sm } from '../size';

const EachLink = styled(Link)`
  text-decoration: none !important;
`;

const LinkBlock = styled.div`
  height: 10vh;
  color: black;
`;

jdenticon.config = {
  replaceMode: 'observe',
};

const BackgroundStyleColor = styled(BackgroundColor)`
  ${media.lessThan('md')`
    height: 13vh;
    z-index: 11;
    position: fixed;
  `};
`;

const IconStyleImage = styled(IconImage)`
  width: 35px;
  ${media.lessThan('md')`
    width: 35px;
  `};
`;

const TitleStyleText = styled(TitleText)`
  ${media.lessThan('md')`
    font-size: 10vw;
  `};
`;

const MedContentBlock = styled.div`
  margin-bottom: 3vh;
`;

class About extends Component {
  state = {
    lab_member: '',
    visible: false,
  };

  componentWillMount() {
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 1000,
    });

    ins
      .get('/lab_member')
      .then(res => {
        console.log(res.data);
        this.setState({ lab_member: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

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

  renderLogin = () => {
    const { token } = localStorage;
    if (token) {
      return (
        <PageLink to="/logout">
          <Text color="rgba(0, 0, 0, 0.4)">Sign out</Text>
        </PageLink>
      );
    }
    return (
      <PageLink to="/login">
        <Text color="rgba(0, 0, 0, 0.4)">Sign in</Text>
      </PageLink>
    );
  };

  renderMember = () => {
    if (this.state.lab_member) {
      // eslint-disable-next-line no-return-assign
      return this.state.lab_member.map(({ id, profile }, index) => (
        <div
          key={id}
          name={index}
          className="square"
          onClick={() => this.expenContent(index)}
        >
          <h1>{profile.name}</h1>
          {profile.picture.file && (
            <img src={settings.backend_url + profile.picture.file} alt="" />
          )}
          {!profile.picture.file && <svg data-jdenticon-value={profile.name} />}
        </div>
      ));
    }
  };

  expenContent = num => {
    const tmp = document.querySelector('.square-content');
    const square = document.querySelectorAll('.square');
    const row = document.createElement('div');
    const contentBlock = document.createElement('div');
    const titleBlock = document.createElement('div');
    const name = document.createElement('h1');
    const email = document.createElement('h2');
    const selfIntroTitle = document.createElement('h3');
    const researchAreaTitle = document.createElement('h3');
    const educationTitle = document.createElement('h3');
    const selfIntro = document.createElement('p');
    const reserachArea = document.createElement('p');
    const education = document.createElement('p');
    const cardLeft = document.createElement('div');
    const cardRight = document.createElement('div');
    const leftContent = document.createElement('div');
    const rightContent = document.createElement('div');
    row.classList.add('square-content');
    contentBlock.classList.add('content-block', 'row', 'col-md-12');
    titleBlock.classList.add('square-content-title', 'col-md-12');
    cardLeft.classList.add('square-card', 'col-md-5');
    cardRight.classList.add('square-card', 'col-md-7');

    row.appendChild(titleBlock);
    row.appendChild(contentBlock);
    contentBlock.appendChild(cardLeft);
    contentBlock.appendChild(cardRight);
    titleBlock.appendChild(name);
    titleBlock.appendChild(email);
    cardLeft.appendChild(leftContent);
    cardRight.appendChild(rightContent);
    leftContent.appendChild(selfIntroTitle);
    leftContent.appendChild(selfIntro);
    leftContent.appendChild(researchAreaTitle);
    leftContent.appendChild(reserachArea);
    rightContent.appendChild(educationTitle);
    rightContent.appendChild(education);
    selfIntroTitle.innerHTML = 'Self Introduction';
    educationTitle.innerHTML = 'Education';
    researchAreaTitle.innerHTML = 'Reserch Area';
    selfIntro.innerHTML = this.state.lab_member[num].profile.selfIntro;
    education.innerHTML = this.state.lab_member[num].profile.education;
    reserachArea.innerHTML = this.state.lab_member[num].profile.researchArea;
    name.innerHTML = this.state.lab_member[num].profile.name;
    email.innerHTML = this.state.lab_member[num].username;

    if (document.querySelectorAll('.square-content').length !== 0) {
      tmp.classList.remove('expended');
      tmp.style.opacity = '0';
      setTimeout(() => {
        tmp.parentNode.removeChild(tmp);
      }, 800);
      if (num % 3 === 2) {
        square[num].insertAdjacentElement('afterend', row);
      } else if (num % 3 === 1 && square.length >= num + 1) {
        square[num + 1].insertAdjacentElement('afterend', row);
      } else if (num % 3 === 0 && num + 2 < square.length) {
        square[num + 2].insertAdjacentElement('afterend', row);
      } else if (num + 1 === square.length) {
        square[num].insertAdjacentElement('afterend', row);
      } else if (num + 2 === square.length) {
        square[num + 1].insertAdjacentElement('afterend', row);
      } else {
        square[num].insertAdjacentElement('afterend', row);
      }
      setTimeout(() => {
        row.classList.add('expended');
      }, 800);
      setTimeout(() => {
        row.style.opacity = '1';
      }, 1600);
    } else {
      if (num % 3 === 2) {
        square[num].insertAdjacentElement('afterend', row);
      } else if (num % 3 === 1 && square.length >= num + 1) {
        square[num + 1].insertAdjacentElement('afterend', row);
      } else if (num % 3 === 0 && num + 2 < square.length) {
        square[num + 2].insertAdjacentElement('afterend', row);
      } else if (num + 1 === square.length) {
        square[num].insertAdjacentElement('afterend', row);
      } else if (num + 2 === square.length) {
        square[num + 1].insertAdjacentElement('afterend', row);
      } else {
        square[num].insertAdjacentElement('afterend', row);
      }
      setTimeout(() => {
        row.classList.add('expended');
      }, 100);
      setTimeout(() => {
        row.style.opacity = '1';
      }, 900);
    }
  };

  render() {
    return (
      <Row id="about">
        <Col xs={24} md={9} xl={9}>
          <BackgroundStyleColor color="#ffbb87">
            <Logo xs={{ span: 0 }} xl={{ span: 0 }} content="About ELSA Lab" />
          </BackgroundStyleColor>
        </Col>
        <Col xs={24} md={15} className="right">
          <MediaQuery query={`(max-width: ${md})`}>
            {matches => (!matches ? <Header fontColor="#9b9b9b" /> : <></>)}
          </MediaQuery>
          <div className="block">
            <MobileContent color="#ffbb87" content="About ELSA Lab" />
            <div className="d-flex square-container">{this.renderMember()}</div>
          </div>
        </Col>
        {/* <Col xs={24} md={9}>
          <BackgroundStyleColor color="#ffbb87">
            <MainRow type="flex" justify="start">
              <LogoContent xs={24} md={18}>
                <Row type="flex" justify="start" align="middle" gutter={5}>
                  <Col>
                    <IconStyleImage src={IconImg} />
                  </Col>
                  <Col>
                    <Title1>NTHU</Title1>
                    <Title2>ELSA</Title2>
                  </Col>
                  <Col xs={3} md={0} offset={15}>
                    <Drawer />
                  </Col>
                </Row>
              </LogoContent>
              <SmallContent xs={0} md={24} color="#8c8c8c">
                <Row type="flex" justify="start" align="middle">
                  <Col span={6}>
                    <Hr color="#8c8c8c" />
                  </Col>
                  <Col span={12} offset={2}>
                    Home
                  </Col>
                </Row>
              </SmallContent>
              <BigTitle xs={0} md={14}>
                <TitleStyleText>
                  About
                  <br />
                  ELSA Lab
                </TitleStyleText>
              </BigTitle>
              <MedContent xs={0} md={22} color="#8c8c8c">
                <Row type="flex" justify="start" align="top">
                  <Col xs={11} md={18}>
                    <MedContentBlock>
                      <b>Address</b>
                      <br />
                      Department of Computer Science, National Tsing Hua
                      University, No.101, Sec .2, Kuang-Fu Road, Hsinchu, 30013,
                      Taiwan
                    </MedContentBlock>
                  </Col>
                  <Col xs={11} md={18}>
                    <MedContentBlock>
                      <b>Office</b>
                      <br />
                      Phone: +886-3-5731308
                      <br />
                      Email: cylee@cs.nthu.edu.tw
                      <br />
                      Address: Delta Building 606
                    </MedContentBlock>
                  </Col>
                </Row>
              </MedContent>
              <Col span={6} />
            </MainRow>
          </BackgroundStyleColor>
          <BigTitle xs={20} md={0}>
            <TitleStyleText>
              About
              <br />
              ELSA Lab
            </TitleStyleText>
          </BigTitle>
        </Col> */}
        {/* <Col className="right" xs={24} md={15}>
          navbar
          <MediaQuery query={`(max-width: ${md})`}>
            {matches => (!matches ? <Header fontColor="white" /> : <></>)}
          </MediaQuery>
          <div className="d-flex square-container">{this.renderMember()}</div>
        </Col> */}
      </Row>
    );
  }
}

export default About;
