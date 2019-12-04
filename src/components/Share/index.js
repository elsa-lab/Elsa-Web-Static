import styled from 'styled-components';
import { Col, Row } from 'antd';
import { Link } from 'react-router';

export const BackgroundColor = styled.div`
  background-color: ${props => props.color};
  height: 100vh;
  width: 100%;
`;

export const MainRow = styled(Row)`
  padding-left: 6vw;
  padding-top: 5vw;
  z-index: 11;
`;

export const IconImage = styled.img`
  width: 35px;
`;

export const Title1 = styled.p`
  font-size: 13px;
  line-height: 1.2em;
  margin: 0;
`;

export const Title2 = styled.p`
  font-size: 18px;
  line-height: 1.2em;
  margin: 0;
`;

export const LogoContent = styled(Col)`
  color: white;
  padding: 0 15px;
`;

export const Hr = styled.hr`
  width: 105px;
  height: 2px;
  vertical-align: middle;
  border: 0;
  background-color: #a9a9a9;
  margin: 0 0.6em 0 0;
  display: inline-block;
`;

export const SmallContent = styled(Col)`
  color: ${props => props.color};
  font-size: 1vw;
  margin-top: 5vh;
  padding: 0 15px;
`;

export const BigTitle = styled(Col)`
  font-size: 4vw;
  color: white;
  margin-top: 6vh;
  font-weight: bold;
  padding-left: 15px;
`;

export const TitleText = styled.div`
  line-height: 1.2;
`;

export const MedContent = styled(Col)`
  color: ${props => props.color};
  font-size: 1vw;
  margin-top: 5vh;
  padding-left: 15px;
`;

export const TextCol = styled.div`
  float: right;
  font-size: 1vw;
  color: white;
`;

export const Text = styled.div`
  background-color: ${props => props.color};
  margin: 3px;
  padding-left: 3px;
  padding-right: 3px;

  :hover {
    background-color: white;
  }
`;

export const PageLink = styled(Link)`
  color: white;

  :hover {
    color: black;
  }
`;
