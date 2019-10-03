import React, { Component } from 'react';
import axios from 'axios';

import settings from '../../settings';

import 'bootstrap/scss/bootstrap.scss';

import './style.scss';

class Person extends Component {
  state = {};

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
          this.setState({ user: res.data });
          console.log(this.state);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  renderSetting() {
    const { user } = this.state;
    if (user) {
      return (
        <div>
          <div className="card-container">
            <h3>大頭貼</h3>
            <div className="card w-75">
              <div className="card-body row align-items-center">
                <img
                  src={
                    settings.backend_url + this.state.user.profile.picture.file
                  }
                  alt=""
                  className="avatar col-md-4"
                />
                <div className="col-md-8">
                  <button type="button" className="btn btn-outline-secondary">
                    更新大頭貼
                  </button>
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
                    <input type="text" />
                    <p>長度不得超過 25 字</p>
                  </div>
                </div>
                <hr />
                <div className="form-group row">
                  <h5 className="col-md-4">Student type</h5>
                  <div className="form-input  col-md-8">
                    <select id="inputState" className="form-control">
                      <option selected>...</option>
                      <option>Course Student</option>
                    </select>
                  </div>
                </div>
                <hr />
                <div className="form-group row">
                  <h5 className="col-md-4">Research area</h5>
                  <div className="form-input  col-md-8">
                    <input type="text" />
                  </div>
                </div>
                <hr />
                <div className="form-group row">
                  <h5 className="col-md-4">Self introduction</h5>
                  <div className="form-input col-md-8">
                    <input type="text" />
                    <p>字數不能超過 1200 字</p>
                  </div>
                </div>
                <hr />
                <div className="submmit justify-content-end">
                  <button type="button" className="btn btn-outline-secondary">
                    更新內容
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <h1>loading</h1>;
    }
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
