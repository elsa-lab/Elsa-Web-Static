import React from 'react';

const Land = () => (
  <section
    className="home-section section-hero overlay slanted"
    id="home-section"
  >
    <div className="container">
      <div className="row align-items-center justify-content-center">
        <div className="col-md-8 text-center">
          <h1>
            We Are
            <br />
            Elsa Lab
          </h1>
          <div className="mx-auto w-75">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto quibusdam possimus quasi porro! Itaque?
            </p>
          </div>
          <p className="mt-5">
            <a href="/about" className="btn btn-outline-white btn-md ">
              Get in touch
            </a>
          </p>
        </div>
      </div>
    </div>

    <div className="video-container">
      <video autoPlay loop>
        <track kind="captions" />
        <source type="video/mp4" src={require('../videos/video.mp4')} />
      </video>
    </div>

    <a href="#about-us-section" className="scroll-button smoothscroll">
      <span className=" icon-keyboard_arrow_down" />
    </a>
  </section>
);

export default Land;
