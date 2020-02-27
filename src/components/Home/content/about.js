import React from 'react';

const About = () => (
  <section className="site-section about-us-section" id="about-us-section">
    <div className="container">
      <div className="row mb-5 pt-0 site-section">
        <div className="col-md-6 align-self-center">
          <h3 className="section-title-sub text-primary">About Us</h3>
          <h2 className="section-title mb-4">Who Are You Guys</h2>

          <p>
            Soluta quasi cum delectus eum facilis recusandae nesciunt
            accusantium libero dolores repellat id in dolorem laborum ad modi
            qui at quas dolorum voluptatem voluptatum repudiandae.
          </p>
          <p>
            Soluta quasi cum delectus eum facilis recusandae nesciunt
            accusantium libero dolores repellat id in dolorem laborum ad modi
            qui at quas dolorum voluptatem voluptatum repudiandae.
          </p>
          <p className="mt-4">
            <a href="#" className="spepcial_link">
              Read more about us
            </a>
          </p>
        </div>
        <div className="col-md-5 ml-auto img-overlap">
          <div className="img-1">
            <img
              src={require('../images/sq_img_9.jpg')}
              alt="first"
              className="img-fluid img-shadow"
            />
          </div>
          <div className="img-2">
            <img
              src={require('../images/sq_img_10.jpg')}
              alt="ten"
              className="img-fluid img-shadow"
            />
          </div>
        </div>
      </div>

      <div className="row pb-0 border-top pt-5 block__19738 section-counter">
        <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
          <div className="d-flex align-items-center justify-content-center mb-2">
            <span className="icon-line-mobile mr-3" />
            <strong className="number" data-number="2393">
              0
            </strong>
          </div>
          <span className="caption">Completed Projects</span>
        </div>

        <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
          <div className="d-flex align-items-center justify-content-center mb-2">
            <span className="icon-line-lightbulb mr-3" />
            <strong className="number" data-number="54">
              0
            </strong>
          </div>
          <span className="caption">Winners &amp; Awards</span>
        </div>

        <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
          <div className="d-flex align-items-center justify-content-center mb-2">
            <span className="icon-line-trophy mr-3" />
            <strong className="number" data-number="120">
              0
            </strong>
          </div>
          <span className="caption">Number of Team</span>
        </div>

        <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
          <div className="d-flex align-items-center justify-content-center mb-2">
            <span className="icon-line-puzzle mr-3" />
            <strong className="number" data-number="550">
              0
            </strong>
          </div>
          <span className="caption">Line of Codes</span>
        </div>
      </div>
    </div>
  </section>
);

export default About;
