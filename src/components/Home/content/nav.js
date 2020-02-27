import React from 'react';

const { token } = localStorage;

const Land = () => (
  <header className="site-navbar mt-3" id="top">
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="site-logo col-3">
          <a href="/">Elsa Lab</a>
        </div>

        <nav className="site-navigation">
          <ul className="site-menu js-clone-nav d-none d-lg-block">
            <li>
              <a href="/" className="nav-link active">
                Home
              </a>
            </li>
            <li>
              <a href="/courses">Courses</a>
            </li>
            <li>
              <a href="/publications">Publications</a>
            </li>
            <li>
              <a href="/projects">Projects</a>
            </li>
            <li>
              <a href="/news">News</a>
            </li>
            <li>
              {(token && (
                <a href="/logout">
                  <p>Sign out</p>
                </a>
              )) || (
                <a href="/login">
                  <p>Sign in</p>
                </a>
              )}
            </li>
          </ul>
        </nav>

        <div className="col-6 site-burger-menu d-block d-lg-none text-right">
          <a href="#" className="site-menu-toggle js-menu-toggle">
            <span className="icon-menu h3" />
          </a>
        </div>
      </div>
    </div>
  </header>
);

export default Land;
