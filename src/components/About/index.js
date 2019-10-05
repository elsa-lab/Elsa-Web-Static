import MediaQuery from 'react-responsive';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';

import Drawer from '../Share/Drawer';
import Header from '../Share/Header';
import IconImg from '../static/icon.png';
import TeacherImageSrc from '../static/home/teacher.png';
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

const TeachBlock = styled.div`
  width: 100%;
  float: right;
  margin-top: 10vh;
`;

const MemberBlock = styled.div`
  width: 100%;
  height: 20vh;
  text-align: center;
  margin-top: 10vh;
`;

const MemberImageArea = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3vh;
`;

const MemberImage = styled.img`
  display: inline-block;
  height: auto;
  width: 18%;
  margin: 2%;

  ${media.lessThan('notebook')`
  `};
`;

const MemberYear = styled.div`
  margin-top: 3vh;
`;

const BackgroundStyleColor = styled(BackgroundColor)`
  ${media.lessThan('notebook')`
    height: 70vh;
  `};
`;

const BackgroundStyleColor2 = styled(BackgroundColor)`
  overflow: auto;
  height: 100vh;
`;

const IconStyleImage = styled(IconImage)`
  ${media.lessThan('notebook')`
    width: 8vw;
  `};
`;

const TeacherImage = styled.img`
  width: 13vw;
  border-radius: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;

  ${media.lessThan('notebook')`
    width: 35vw;
    margin-top: -3vh;
  `};
`;

const Profile = styled.div`
  font-size: 1vw;
  color: white;
  text-align: center;
  margin-top: 2vh;

  ${media.lessThan('notebook')`
    text-align: left;
  `};
`;

const ExperienceAndEducation = styled.div`
  font-size: 0.9vw;
  line-height: 140%;
  color: white;
  margin-top: -2vh;

  ${media.lessThan('notebook')`
    margin-top: 3vh;
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

  render() {
    return (
      <Row>
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
        <Col xs={{ span: 24 }} xl={{ span: 15 }}>
          <BackgroundStyleColor2 color="#9c8370">
            <MediaQuery query={`(max-width: ${notebook})`}>
              {matches => (!matches ? <Header fontColor="white" /> : <></>)}
            </MediaQuery>
            <TeachBlock>
              <Row type="flex" justify="center" align="top">
                <Col xs={{ span: 24 }} xl={{ span: 10 }}>
                  <Row type="flex" justify="start">
                    <Col xs={{ span: 12 }} xl={{ span: 24 }}>
                      <TeacherImage src={TeacherImageSrc} />
                    </Col>
                    <Col xs={{ span: 12 }} xl={{ span: 24 }}>
                      <Profile>
                        <b>
                          Professor - <br />
                          Chun-Yi Lee ( 李濬屹 ) <br />
                          Ph.D. <br />
                          cylee@cs.nthu.edu.tw
                        </b>
                      </Profile>
                    </Col>
                  </Row>
                </Col>
                <Col xs={{ span: 18 }} xl={{ span: 6 }}>
                  <ExperienceAndEducation>
                    <div>
                      <b>Work Experience</b>
                    </div>
                    <br />
                    <div>
                      <b>2015 ~ </b>
                    </div>
                    <div>Assistant Professor</div>
                    <div>Department of Computer Science</div>
                    <div>National Tsing Hua University</div>
                    <br />
                    <div>
                      <b>2012 ~ 2015</b>
                    </div>
                    <div>Senior Hardware Engineer,</div>
                    <div> Oracle America, Inc. </div>
                    <br />
                    <div> _ </div>
                    <br />
                    <div>
                      <b>Education</b>
                    </div>
                    <br />
                    <div>
                      <b>2007 ~ 2012</b>
                    </div>
                    <div>Ph.D., Department of Electrical Engineering,</div>
                    <div>Princeton University</div>
                    <br />
                    <div>
                      <b>2003 ~ 2005</b>
                    </div>
                    <div>M.S., Department of Electrical Engineering,</div>
                    <div>National Taiwan University</div>
                    <br />
                    <div>
                      <b>1999 ~ 2003</b>
                    </div>
                    <div>B.S., Department of Electrical Engineering,</div>
                    <div>National Taiwan University</div>
                    <br />
                  </ExperienceAndEducation>
                </Col>
              </Row>
              <MemberBlock>
                <MemberYear>
                  ———————————————————————— 2018 ————————————————————————
                </MemberYear>
                <MemberImageArea>
                  <MemberImage src={TeacherImageSrc} />
                  <MemberImage src={TeacherImageSrc} />
                  <MemberImage src={TeacherImageSrc} />
                </MemberImageArea>
                <MemberYear>
                  ———————————————————————— 2017 ————————————————————————
                </MemberYear>
                <MemberImageArea>
                  <MemberImage src={TeacherImageSrc} />
                  <MemberImage src={TeacherImageSrc} />
                  <MemberImage src={TeacherImageSrc} />
                </MemberImageArea>
                <MemberYear>
                  ———————————————————————— 2016 ————————————————————————
                </MemberYear>
                <MemberImageArea>
                  <MemberImage src={TeacherImageSrc} />
                  <MemberImage src={TeacherImageSrc} />
                  <MemberImage src={TeacherImageSrc} />
                </MemberImageArea>
              </MemberBlock>
            </TeachBlock>
          </BackgroundStyleColor2>
        </Col>
      </Row>
    );
  }
}

export default About;
