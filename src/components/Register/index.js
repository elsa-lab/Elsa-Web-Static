/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import axios from 'axios';
import { Col, Row } from 'antd';

import 'bootstrap/scss/bootstrap.scss';
import Drawer from '../Share/Drawer';
import settings from '../../settings';
import './style.scss';
import { PageLink, Text, TextCol } from '../Share';

class Register extends Component {
  state = {
    email: '',
    name: '',
    studentType: '',
    researchArea: '',
    selfIntro: '',
    password: '',
    confirm_password: '',
    message: '',
    nick_name: '',
    student_id: '',
    picture: null,
  };

  renderMessage = () => {
    if (this.state.message) {
      return <div className="message">{this.state.message}</div>;
    }
  };

  handleChange = (id, event) => {
    if (id === 'email') {
      this.setState({ email: event.target.value });
    } else if (id === 'password') {
      this.setState({ password: event.target.value });
    }

    switch (id) {
      case 'email':
        this.setState({ email: event.target.value });
        break;
      case 'password':
        this.setState({ password: event.target.value });
        break;
      case 'confirm_password':
        this.setState({ confirm_password: event.target.value });
        break;
      case 'name':
        this.setState({ name: event.target.value });
        break;
      case 'nick_name':
        this.setState({ nick_name: event.target.value });
        break;
      case 'selfIntro':
        this.setState({ selfIntro: event.target.value });
        break;
      case 'student_id':
        this.setState({ student_id: event.target.value });
        break;
      case 'researchArea':
        this.setState({ researchArea: event.target.value });
        break;
      case 'studentType':
        this.setState({ studentType: event.target.value });
        break;
      case 'picture':
        this.setState({ picture: event.target.files[0] });
        break;
      default:
    }
  };

  validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // console.log(re)
    return re.test(this.state.email);
  };

  validatePassword = () => this.state.password === this.state.confirm_password;

  validateForm = () => {
    const {
      email,
      password,
      student_id,
      nick_name,
      picture,
      name,
      studentType,
    } = this.state;
    // if (
    //   !(
    //     email &&
    //     password &&
    //     student_id &&
    //     nick_name &&
    //     picture &&
    //     name &&
    //     studentType
    //   )
    // ) {
    //   this.setState({ message: '有資料未填' });
    //   return false;
    // } else if (!this.validateEmail()) {
    //   this.setState({ message: '不正確的 Email 格式' });
    //   return false;
    // }
    if (!this.validatePassword()) {
      this.setState({ message: '密碼不一致' });
      return false;
    }
    return true;
  };

  handleSubmit = event => {
    if (!this.validateForm()) return;
    const data = new FormData();
    data.append('email', this.state.email);
    data.append('username', this.state.email);
    data.append('password', this.state.password);
    data.append('name', this.state.name);
    data.append('nick_name', this.state.nick_name);
    data.append('selfIntro', this.state.selfIntro);
    data.append('student_id', this.state.student_id);
    data.append('researchArea', this.state.researchArea);
    data.append('studentType', this.state.studentType);
    data.append('picture', this.state.picture);
    const react_ins = this;
    axios
      .post(`${settings.backend_url}/users`, data)
      // {
      //   email: this.state.email,
      //   username: this.state.email,
      //   password: this.state.password,
      //   name: this.state.name,
      //   nick_name: this.state.nick_name,
      //   selfIntro: this.state.selfIntro,
      //   student_id: this.state.student_id,
      //   researchArea: this.state.researchArea,
      //   studentType: this.state.studentType,
      //   picture: this.state.picture,
      // }
      .then(response => {
        // console.log(response);
        // redirect to user page
        if (response.data.type === 'error') {
          react_ins.setState({ message: response.data.message }, () =>
            setTimeout(() => react_ins.setState({ message: '' }), 2000)
          );
        } else {
          // window.location = `${settings.root_url}/login`;
        }
      })
      .catch(error => {
        console.log(error);
        react_ins.setState({ message: 'Unknown error.' }, () =>
          setTimeout(() => react_ins.setState({ message: '' }), 2000)
        );
      });
    event.preventDefault();
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

  renderOtherBlock = () => (
    <Row type="flex" justify="end">
      <Col span={14}>
        <TextCol>
          <PageLink to="/about">
            <Text color="rgba(0, 0, 0, 0.4)">About Elsa Lab</Text>
          </PageLink>
        </TextCol>
        <TextCol>{this.renderLogin()}</TextCol>
      </Col>
      <Col span={5}>
        <Drawer />
      </Col>
    </Row>
  );

  render() {
    return (
      <div id="signUp">
        <div className="d-flex flex-column fixed-top flex-md-row align-items-center p-3 px-md-4 mb-3">
          <h5 className="mr-md-auto font-weight-normal">Elsa lab</h5>
          <nav className="my-2 my-md-0 mr-md-3">
            <a className="p-2 text-dark" href="/">
              Home
            </a>
          </nav>
          <a className="btn btn-outline-primary" href="/login">
            Sign in
          </a>
        </div>
        <div className="container my-4">
          {this.renderMessage()}
          <form onSubmit={e => this.handleSubmit(e)}>
            {/* Email */}
            <div className="form-group">
              <label>* Email</label>
              <input
                id="email"
                name="email"
                size="large"
                type="email"
                value={this.state.email}
                onChange={e => this.handleChange('email', e)}
              />
            </div>
            {/* Password */}
            <div className="row form-group">
              <div className="col-md-6">
                <label>* Password</label>
                <input
                  size="large"
                  type="password"
                  name="password"
                  required
                  value={this.state.password}
                  onChange={e => this.handleChange('password', e)}
                />
              </div>
              <div className="col-md-6">
                <label>* Confirm Password</label>
                <input
                  size="large"
                  type="password"
                  required
                  value={this.state.confirm_password}
                  onChange={e => this.handleChange('confirm_password', e)}
                />
              </div>
            </div>
            {/* Name */}
            <div className="row form-group">
              <div className="col-md-4">
                <label>* Name</label>
                <input
                  size="large"
                  type="text"
                  name="name"
                  required
                  value={this.state.name}
                  onChange={e => this.handleChange('name', e)}
                />
              </div>
              <div className="col-md-4">
                <label>* Nick name</label>
                <input
                  size="large"
                  type="text"
                  name="nickname"
                  required
                  value={this.state.nick_name}
                  onChange={e => this.handleChange('nick_name', e)}
                />
              </div>
            </div>
            {/* Intro */}
            <div className="form-group">
              <label>Self introduction</label>
              <input
                id="selfIntro"
                name="selfIntro"
                size="large"
                type="text"
                value={this.state.selfIntro}
                onChange={e => this.handleChange('selfIntro', e)}
              />
            </div>
            {/* Information */}
            <div className="row form-group">
              <div className="col-md-4">
                <label>* Student ID</label>
                <input
                  size="large"
                  type="text"
                  name="student_id"
                  required
                  value={this.state.student_id}
                  onChange={e => this.handleChange('student_id', e)}
                />
              </div>
              <div className="col-md-4">
                <label>Reasearch area</label>
                <input
                  size="large"
                  name="researchArea"
                  type="text"
                  value={this.state.researchArea}
                  onChange={e => this.handleChange('researchArea', e)}
                />
              </div>
              <div className="col-md-4">
                <label>* Student type</label>
                <select
                  name="studentType"
                  value={this.state.studentType}
                  required
                  onChange={e => this.handleChange('studentType', e)}
                >
                  <option value="">---</option>
                  <option value="0">Course student</option>
                  <option value="1">Collage</option>
                  <option value="2">Master</option>
                  <option value="3">PHD</option>
                </select>
              </div>
            </div>
            {/* Picture */}
            <div className="form-group">
              <label>Profile picture</label>
              <input
                className="form-group-profile"
                type="file"
                name="picture"
                aria-label="File browser example"
                accept="image/*"
                onChange={e => this.handleChange('picture', e)}
              />
            </div>
            <input type="submit" className="summitBtn" value="Sign up" />
            {/* <div className="summitBtn" onClick={e => this.handleSubmit(e)}>
              Sign up
            </div> */}
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
