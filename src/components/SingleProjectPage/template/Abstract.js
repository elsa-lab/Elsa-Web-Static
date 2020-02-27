import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const Abstract = ({ content }) => (
  <div id="abstract">
    <div className="main-content">
      <h1>
        <FormattedMessage id="single_project_abstract" />
      </h1>
      <p>{content}</p>
    </div>
    <div className="deco-square" />
  </div>
);

Abstract.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Abstract;
