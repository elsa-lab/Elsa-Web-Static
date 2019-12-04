import MediaQuery from 'react-responsive';
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import jdenticon from 'jdenticon';

import settings from '../../settings';
import Drawer from '../Share/Drawer';
import Header from '../Share/Header';
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
import { media, notebook } from '../size';

jdenticon.config = {
  replaceMode: 'observe',
};

const BackgroundStyleColor = styled(BackgroundColor)`
  ${media.lessThan('notebook')`
    height: 70vh;
  `};
`;

const IconStyleImage = styled(IconImage)`
  ${media.lessThan('notebook')`
    width: 8vw;
  `};
`;

const TitleStyleText = styled(TitleText)`
  ${media.lessThan('notebook')`
    font-size: 10vw;
  `};
`;

const MedContentBlock = styled.div`
  margin-bottom: 3vh;
`;

class About extends Component {
  state = {
    lab_member: '',
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
    const titleBlock = document.createElement('div');
    const name = document.createElement('h1');
    const email = document.createElement('h2');
    const cardLeft = document.createElement('div');
    const cardRight = document.createElement('div');
    const leftContent = document.createElement('div');
    const rightContent = document.createElement('div');
    row.classList.add('row', 'square-content');
    titleBlock.classList.add('square-content-title', 'col-md-12');
    cardLeft.classList.add('square-card', 'col-md-5');
    cardRight.classList.add('square-card', 'col-md-7');

    row.appendChild(titleBlock, cardLeft, cardRight);
    titleBlock.appendChild(name, email);
    cardLeft.appendChild(leftContent);
    cardRight.appendChild(rightContent);
    name.innerHTML = this.state.lab_member[num].profile.name;

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
        {/* left side */}
        <Col xs={{ span: 24 }} xl={{ span: 9 }}>
          <BackgroundStyleColor color="#ffbb87">
            <MainRow type="flex" justify="center">
              <LogoContent xs={{ span: 22 }} xl={{ span: 18 }}>
                <Row type="flex" justify="start" align="middle" gutter={8}>
                  <Col>
                    <IconStyleImage src={IconImg} />
                  </Col>
                  <Col>
                    <Title1>NTHU</Title1>
                    <Title2>ELSA</Title2>
                  </Col>
                  <Col xs={{ span: 4 }} xl={{ span: 0 }} offset={14}>
                    <Drawer />
                  </Col>
                </Row>
              </LogoContent>
              <SmallContent xs={{ span: 22 }} xl={{ span: 18 }} color="#8c8c8c">
                <Row type="flex" justify="start" align="bottom">
                  <Col span={6}>
                    <Hr color="#8c8c8c" />
                  </Col>
                  <Col span={12} offset={1}>
                    Home
                  </Col>
                </Row>
              </SmallContent>
              <BigTitle xs={{ span: 22 }} xl={{ span: 18 }}>
                <TitleStyleText>
                  About
                  <br />
                  ELSA Lab
                </TitleStyleText>
              </BigTitle>
              <MedContent xs={{ span: 22 }} xl={{ span: 12 }} color="#8c8c8c">
                <Row type="flex" justify="start" align="top">
                  <Col xs={{ span: 11 }} xl={{ span: 24 }}>
                    <MedContentBlock>
                      <b>Address</b>
                      <br />
                      Department of Computer Science, National Tsing Hua
                      University, No.101, Sec .2, Kuang-Fu Road, Hsinchu, 30013,
                      Taiwan
                    </MedContentBlock>
                  </Col>
                  <Col xs={{ span: 11 }} xl={{ span: 24 }}>
                    <MedContentBlock>
                      <b>Office</b>
                      <br />
                      Phone: +886-3-5731308 Email: cylee@cs.nthu.edu.tw Address:
                      Delta Building 606
                    </MedContentBlock>
                  </Col>
                </Row>
              </MedContent>
              <Col span={6} />
            </MainRow>
          </BackgroundStyleColor>
        </Col>
        {/* right side */}
        <Col className="right" xs={{ span: 24 }} xl={{ span: 15 }}>
          {/* navbar   */}
          <MediaQuery query={`(max-width: ${notebook})`}>
            {matches => (!matches ? <Header fontColor="white" /> : <></>)}
          </MediaQuery>
          <div className="d-flex square-container">
            {this.renderMember()}
            {/* <div className="square-row">
              <div className="square" onClick={() => this.expenContent(0)}>
                <img src={picture} alt="" />
              </div>
              <div className="square" onClick={() => this.expenContent(0)}>
                <img src={picture2} alt="" />
              </div>
              <div className="square" onClick={() => this.expenContent(0)}>
                <img src={picture3} alt="" />
              </div>
              <div className="square-content row">
                <div className="square-content-title col-md-12">
                  <h1 className="name">Professor - Chun-Yi Lee, Ph.D.</h1>
                  <h2 className="email">cylee@cs.nthu.edu.tw</h2>
                </div>
                <div className="square-card col-md-5">
                  <div className="title">Work Experience</div>
                  <div className="content">
                    <div className="content-block">
                      <div className="year">2015~</div>
                      <p>Assistant Professor</p>
                      <p>Department of Computer Science</p>
                      <p>National Tsing Hua University</p>
                    </div>
                    <div className="content-block">
                      <div className="year">2012 ~ 2015</div>
                      <p>Senior Hardware Engineer, </p>
                      <p>Oracle America, Inc.</p>
                    </div>
                  </div>
                </div>
                <div className="square-card col-md-7">
                  <div className="title">Education</div>
                  <div className="content-block">
                    <div className="year">2007 ~ 2012</div>
                    <p>Ph.D., Department of Electrical Engineering,</p>
                    <p>Princeton University</p>
                  </div>
                  <div className="content-block">
                    <div className="year">2003 ~ 2005</div>
                    <p>M.S., Department of Electrical Engineering,</p>
                    <p>National Taiwan University</p>
                  </div>
                  <div className="content-block">
                    <div className="year">1999 ~ 2003</div>
                    <p>B.S., Department of Electrical Engineering,</p>
                    <p>National Taiwan University </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="square-row">
              <div className="square" onClick={() => this.expenContent(1)}>
                <img src={picture3} alt="" />
              </div>
              <div className="square" onClick={() => this.expenContent(1)}>
                <img src={picture} alt="" />
              </div>
              <div className="square" onClick={() => this.expenContent(1)}>
                <img src={picture2} alt="" />
              </div>
              <div className="square-content row">
                <div className="square-content-title col-md-12">
                  <h1 className="name">Professor - Chun-Yi Lee, Ph.D.</h1>
                  <h2 className="email">cylee@cs.nthu.edu.tw</h2>
                </div>
                <div className="square-card col-md-5">
                  <div className="title">Work Experience</div>
                  <div className="content">
                    <div className="content-block">
                      <div className="year">2015~</div>
                      <p>Assistant Professor</p>
                      <p>Department of Computer Science</p>
                      <p>National Tsing Hua University</p>
                    </div>
                    <div className="content-block">
                      <div className="year">2012 ~ 2015</div>
                      <p>Senior Hardware Engineer, </p>
                      <p>Oracle America, Inc.</p>
                    </div>
                  </div>
                </div>
                <div className="square-card col-md-7">
                  <div className="title">Education</div>
                  <div className="content-block">
                    <div className="year">2007 ~ 2012</div>
                    <p>Ph.D., Department of Electrical Engineering,</p>
                    <p>Princeton University</p>
                  </div>
                  <div className="content-block">
                    <div className="year">2003 ~ 2005</div>
                    <p>M.S., Department of Electrical Engineering,</p>
                    <p>National Taiwan University</p>
                  </div>
                  <div className="content-block">
                    <div className="year">1999 ~ 2003</div>
                    <p>B.S., Department of Electrical Engineering,</p>
                    <p>National Taiwan University </p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </Col>
      </Row>
    );
  }
}

export default About;
