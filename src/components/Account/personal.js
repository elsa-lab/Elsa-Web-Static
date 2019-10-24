import React, { Component } from 'react';
import axios from 'axios';

import settings from '../../settings';

import 'bootstrap/scss/bootstrap.scss';

import './style.scss';

class Person extends Component {
  state = {
    userId: '',
    studentType: '',
    researchArea: '',
    selfIntro: '',
    password: '',
    nick_name: '',
    picture: null,
  };

  componentWillMount() {
    const { user_id: userId, token } = localStorage;
    if (token) {
      const ins = axios.create({
        baseURL: settings.backend_url,
        timeout: 1000,
        headers: {
          Authorization: `JWT${token}`,
        },
      });

      ins
        .get(`user/${userId}`)
        .then(res => {
          this.setState({
            userId: res.data.id,
            studentType: res.data.profile.studentType,
            researchArea: res.data.profile.researchArea,
            selfIntro: res.data.profile.selfIntro,
            nick_name: res.data.profile.nick_name,
            picture: res.data.profile.picture.file,
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  handleChange = (id, event) => {
    switch (id) {
      case 'nick_name':
        this.setState({ nick_name: event.target.value });
        break;
      case 'selfIntro':
        this.setState({ selfIntro: event.target.value });
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

  handleSubmit = event => {
    // if (!this.validateForm()) return;
    const { token } = localStorage;
    const data = new FormData();
    data.append('nick_name', this.state.nick_name);
    data.append('selfIntro', this.state.selfIntro);
    data.append('researchArea', this.state.researchArea);
    data.append('studentType', this.state.studentType);
    data.append('picture', this.state.picture);
    const react_ins = this;
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 1000,
      headers: {
        Authorization: `JWT ${token}`,
      },
    });

    ins
      .put(`user/${this.state.userId}`, data)
      .then(response => {
        // redirect to user page
        if (response.data.type === 'error') {
          // react_ins.setState({ message: response.data.message }, () =>
          //   setTimeout(() => react_ins.setState({ message: '' }), 2000)
          // );
          alert('error');
        } else {
          // document.querySelector('.fancybox').style.transfrom = 'scale(1)';
          // console.log(document.querySelector('.fancybox').style);
          // document.querySelector('.fancybox').style.transform =
          //   'translate(-50%, -50%) scale(1)';
          setTimeout(() => {
            window.location = `${settings.root_url}/account`;
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

  renderSetting() {
    return (
      <div>
        <div className="card-container">
          <h3>大頭貼</h3>
          <div className="card w-75">
            <div className="card-body row align-items-center">
              <img
                src={settings.backend_url + this.state.picture}
                alt=""
                className="avatar col-md-4"
              />
              <div className="col-md-8">
                <label htmlFor="picture" className="btn btn-outline-secondary">
                  更新大頭貼
                </label>
                <input
                  type="file"
                  id="picture"
                  className="button"
                  onChange={e => this.handleChange('picture', e)}
                />
                <p className="card-text">必須是 JPEG、PNG 或 GIF 檔。</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card-container">
          <h3>個人檔案</h3>
          <div className="card w-75">
            <div className="card-body">
              <div className="form-group row">
                <h5 className="col-md-4">Nick name</h5>
                <div className="form-input  col-md-8">
                  <input
                    type="text"
                    id="nick_name"
                    value={this.state.nick_name}
                    onChange={e => this.handleChange('nick_name', e)}
                  />
                  {/* <p>長度不得超過 25 字</p> */}
                </div>
              </div>
              <hr />
              <div className="form-group row">
                <h5 className="col-md-4">Student type</h5>
                <div className="form-input  col-md-8">
                  <select
                    id="studentType"
                    className="form-control"
                    onChange={e => this.handleChange('studentType', e)}
                  >
                    <option value={this.state.studentType}>...</option>
                    <option value="0">Course student</option>
                    <option value="1">Undergraduate </option>
                    <option value="2">Master</option>
                    <option value="3">PHD</option>
                  </select>
                </div>
              </div>
              <hr />
              <div className="form-group row">
                <h5 className="col-md-4">Research area</h5>
                <div className="form-input  col-md-8">
                  <input
                    type="text"
                    id="researchArea"
                    value={this.state.researchArea}
                    onChange={e => this.handleChange('researchArea', e)}
                  />
                </div>
              </div>
              <hr />
              <div className="form-group row">
                <h5 className="col-md-4">Self introduction</h5>
                <div className="form-input col-md-8">
                  <textarea
                    id="selfIntro"
                    value={this.state.selfIntro}
                    onChange={e => this.handleChange('selfIntro', e)}
                  />
                  {/* <p>字數不能超過 1200 字</p> */}
                </div>
              </div>
              <hr />
              <div className="submmit justify-content-end">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={e => this.handleSubmit(e)}
                >
                  更新內容
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div id="person" className="container">
        <h1 className="title">設定(功能開發中)</h1>
        <hr />
        {this.renderSetting()}
      </div>
    );
  }
}

export default Person;
