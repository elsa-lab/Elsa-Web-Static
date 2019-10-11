/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import axios from 'axios';

import 'bootstrap/scss/bootstrap.scss';

import settings from '../../settings';
import './style.scss';
import successIcon from '../static/success.svg';

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

  validatePassword = () => this.state.password === this.state.confirm_password;

  validateForm = () => {
    if (!this.validatePassword()) {
      this.setState({ message: '密碼不一致' });
      return false;
    }
    return true;
  };

  renderSuccess = () => {
    const { name } = this.state.name;
    return (
      <div className="fancybox card align-items-center justify-content-center">
        <img src={successIcon} alt="" />
        <h3 className="card-title">{name}註冊成功</h3>
        <p className="card-text">請在登入頁面登入</p>
      </div>
    );
  };

  renderMessage = () => {
    if (this.state.message) {
      return <h3 className="message">{this.state.message}</h3>;
    }
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
      .then(response => {
        // redirect to user page
        if (response.data.type === 'error') {
          react_ins.setState({ message: response.data.message }, () =>
            setTimeout(() => react_ins.setState({ message: '' }), 2000)
          );
        } else {
          document.querySelector('.fancybox').style.transfrom = 'scale(1)';
          console.log(document.querySelector('.fancybox').style);
          document.querySelector('.fancybox').style.transform =
            'translate(-50%, -50%) scale(1)';
          setTimeout(() => {
            window.location = `${settings.root_url}/login`;
          }, 1500);
        }
      })
      .catch(error => {
        // console.log(error.response);
        // alert("Erro");
        // if(error.status)
        window.scrollTo(0, 0);
        react_ins.setState({ message: error.response.data.message });
      });
    event.preventDefault();
  };

  render() {
    return (
      <div id="signUp">
        <div className="navbar d-flex fixed-top flex-md-row align-items-center p-3 px-md-4 mb-3 color">
          <h5 className="mr-md-auto d-none d-sm-block font-weight-normal">
            Elsa lab
          </h5>
          <nav className="my-md-0 my-3 mr-md-3">
            <a className="p-2 text-dark" href="/">
              Home
            </a>
          </nav>
          <a className="btn btn-outline-primary" href="/login">
            Sign in
          </a>
        </div>
        {this.renderSuccess()}
        <div className="container my-4">
          {this.renderMessage()}
          <form onSubmit={e => this.handleSubmit(e)}>
            {/* Email */}
            <div className="form-group">
              <label>
                <b className="red">*</b> Email (Username)
              </label>
              <input
                id="email"
                name="email"
                size="large"
                type="email"
                autoComplete="username"
                value={this.state.email}
                onChange={e => this.handleChange('email', e)}
              />
            </div>
            {/* Password */}
            <div className="row form-group">
              <div className="col-md-6">
                <label>
                  <b className="red">*</b> Password
                </label>
                <input
                  size="large"
                  type="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={e => this.handleChange('password', e)}
                />
              </div>
              <div className="col-md-6">
                <label>
                  <b className="red">*</b> Confirm password
                </label>
                <input
                  size="large"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={this.state.confirm_password}
                  onChange={e => this.handleChange('confirm_password', e)}
                />
              </div>
            </div>
            {/* Name */}
            <div className="row form-group">
              <div className="col-md-4">
                <label>
                  <b className="red">*</b> Name
                </label>
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
                <label>
                  <b className="red">*</b> Nick name
                </label>
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
                <label>
                  <b className="red">*</b> Student ID
                </label>
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
                <label>
                  <b className="red">*</b> Student type
                </label>
                <select
                  name="studentType"
                  value={this.state.studentType}
                  required
                  onChange={e => this.handleChange('studentType', e)}
                >
                  <option value="">---</option>
                  <option value="0">Course student</option>
                  <option value="1">Undergraduate </option>
                  <option value="2">Master</option>
                  <option value="3">PHD</option>
                </select>
              </div>
            </div>
            {/* Picture */}
            <div className="form-group">
              <label>
                <b className="red">*</b> Profile picture
              </label>
              <input
                className="form-group-profile"
                type="file"
                name="picture"
                aria-label="File browser example"
                accept="image/*"
                required
                onChange={e => this.handleChange('picture', e)}
              />
            </div>
            <input type="submit" className="summitBtn" value="Sign up" />
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
