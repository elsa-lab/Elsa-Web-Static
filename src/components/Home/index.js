import React, { Component } from 'react';
import axios from 'axios';
import jdenticon from 'jdenticon';

import settings from '../../settings';

import Portfolio from './content/portfolio';
import Land from './content/land';
import About from './content/about';
import Post from './content/post';
import Nav from './content/nav';

import './css/custom-bs.css';
import './css/jquery.fancybox.min.css';
import './css/style.scss';
import './fonts/icomoon/style.css';
import './fonts/line-icons/style.css';

jdenticon.config = {
  replaceMode: 'observe',
};

class Home extends Component {
  state: {
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
        this.setState({ lab_member: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderFancyBox = () => {
    if (this.state) {
      console.log(this.state.lab_member[0].profile)
      return this.state.lab_member.map(({ id, profile }, index) => (
        <div id={`data-${id}`} className="fancy-content" key={index}>
          <div className="d-flex" style={{ width: '100%' }}>
            <div className="lab_member_title col-md-12">
              <h1>{profile.name}</h1>
              <h5>{profile.selfIntro}</h5>
            </div>
            <div className="lab_member_card col-md-4">
              <h2>Self Introduction</h2>
              <h5>{profile.selfIntro}</h5>
              <h2>Reserch Area</h2>
              <h5>{profile.reserchArea}</h5>
            </div>
            <div className="lab_member_card col-md-6">
              <h2>Education</h2>
              <h5>{profile.education}</h5>
            </div>
          </div>
        </div>
      ));
    }
  };

  render() {
    return (
      <div className="site-wrap">
        <div className="site-mobile-menu site-navbar-target">
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close mt-3">
              <span className="icon-close2 js-menu-toggle" />
            </div>
          </div>
          <div className="site-mobile-menu-body" />
        </div>

        {/* NAVBAR */}
        <Nav />

        {/* HOME */}
        <Land />

        {/* ABOUT US */}
        <About />

        {/* PORTFOLIO */}
        {this.state && <Portfolio content={this.state.lab_member} />}

        {/* POST */}
        <Post />

        <footer className="site-footer slanted-footer">
          <a href="#top" className="smoothscroll scroll-top">
            <span className="icon-keyboard_arrow_up" />
          </a>

          <div className="container">
            <div className="row mb-5">
              <div className="col-6 col-md-3 mb-4 mb-md-0">
                <h3>Scenic Products</h3>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">Web Design</a>
                  </li>
                  <li>
                    <a href="#">Graphic Design</a>
                  </li>
                  <li>
                    <a href="#">Web Developers</a>
                  </li>
                  <li>
                    <a href="#">Resources</a>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-md-3 mb-4 mb-md-0">
                <h3>Company</h3>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Career</a>
                  </li>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                  <li>
                    <a href="#">Resources</a>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-md-3 mb-4 mb-md-0">
                <h3>Support</h3>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">Support</a>
                  </li>
                  <li>
                    <a href="#">Privacy</a>
                  </li>
                  <li>
                    <a href="#">Terms of Service</a>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-md-3 mb-4 mb-md-0">
                <h3>Contact Us</h3>
                <div className="footer-social">
                  <a href="#">
                    <span className="icon-facebook" />
                  </a>
                  <a href="#">
                    <span className="icon-twitter" />
                  </a>
                  <a href="#">
                    <span className="icon-instagram" />
                  </a>
                  <a href="#">
                    <span className="icon-linkedin" />
                  </a>
                </div>
              </div>
            </div>

            <div className="row text-center">
              <div className="col-12">
                <p className="copyright">
                  <small className="block">
                    {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                    Copyright &copy;
                    <script>
                      document.write(new Date().getFullYear());
                    </script>{' '}
                    All rights reserved | This template is made with{' '}
                    <i className="icon-heart text-danger" aria-hidden="true" />{' '}
                    by{' '}
                    <a
                      href="https://colorlib.com"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Colorlib
                    </a>
                    {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                  </small>
                </p>
              </div>
            </div>
          </div>
        </footer>
        {this.renderFancyBox()}
      </div>
    );
  }
}

export default Home;
