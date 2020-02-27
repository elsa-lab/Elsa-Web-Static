import PropTypes from 'prop-types';
import React from 'react';
import jdenticon from 'jdenticon';

import settings from '../../../settings';

jdenticon.config = {
  replaceMode: 'observe',
};

const Portfolio = ({ content }) => (
  <section className="site-section block__62272" id="portfolio-section">
    <div className="container">
      <div className="row">
        <div className="col-12 text-center" data-aos="fade">
          <h3 className="section-title-sub text-primary">Awesome Works</h3>
          <h2 className="section-title">Lab Member</h2>
        </div>
      </div>
      <hr />
      <div id="posts" className="row no-gutter">
        {content &&
          content.map(({ id, profile }, index) => (
            <div
              key={id}
              name={index}
              className="item col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-4"
            >
              <a
                id="#inline"
                data-fancybox
                href={`#data-${id}`}
                className="item-wrap"
              >
                <span className="icon-add" />
                {profile.picture.file && (
                  <img
                    src={settings.backend_url + profile.picture.file}
                    alt=""
                  />
                )}
                {!profile.picture.file && (
                  <svg data-jdenticon-value={profile.name} />
                )}
              </a>
            </div>
          ))}
      </div>
    </div>
  </section>
);

Portfolio.propTypes = {
  content: PropTypes.array.isRequired,
};

export default Portfolio;
