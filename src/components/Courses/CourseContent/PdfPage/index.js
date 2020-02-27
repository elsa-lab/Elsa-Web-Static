import PropTypes from 'prop-types';
import React, { Component } from 'react';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';

import ProjectHeader from '../../../Share/ProjectHeader';
import settings from '../../../../settings';

import '../../../style/course.scss';

import Comment from './Comment';

class PdfPage extends Component {
  state = {
    title: '',
    page: [],
    attach_files: [],
    course: {},
    current: 0,
  };

  componentDidMount() {
    const {
      params: { lecture_id },
    } = this.props.match;
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 1000,
    });

    ins
      .get(`lectures/${lecture_id}`)
      .then(res => {
        // console.log(res.data);
        this.setState({
          title: res.data.title,
          page: res.data.pages,
          attach_files: res.data.attach_files,
          course: res.data.course,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setCurrent = e => {
    this.setState({ current: e });
  };

  render() {
    const images = [];
    let seasonText;
    if (this.state.course.season === 0) {
      seasonText = 'Spring';
    } else {
      seasonText = 'Fall';
    }
    for (let i = 0; i < this.state.page.length; i++) {
      images.push({
        original: `${settings.backend_url}/${this.state.page[i]}`,
        thumbnail: `${settings.backend_url}/${this.state.page[i]}`,
      });
    }
    return (
      <div>
        <div id="pdfpage">
          <ProjectHeader fontColor="#364b8b" />
          <div className="title-content">
            <h1>{this.state.title}</h1>
            <h3>
              {this.state.course.year} | {seasonText}
            </h3>
          </div>
          <ImageGallery
            onSlide={this.setCurrent}
            slideDuration={80}
            disableThumbnailScroll={false}
            startIndex={this.state.current}
            showIndex
            thumbnailPosition="left"
            slideOnThumbnailOver={false}
            showPlayButton={false}
            showNav
            infinite={false}
            items={images}
          />
          {this.state.attach_files.length !== 0 ? (
            <a href={this.state.attach_files}>Attach file</a>
          ) : null}
          <Comment
            lectureId={this.props.match.params.lecture_id}
            nowPage={this.state.current + 1}
          />
        </div>
      </div>
    );
  }
}

PdfPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      course_id: PropTypes.string.isRequired,
      lecture_id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PdfPage;
