import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';

import Header from '../../../Share/Header';
import settings from '../../../../settings';
import { notebook } from '../../../size';
import Drawer from '../../../Share/Drawer';

import './main.scss';

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
    } = this.props;
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
        <MediaQuery query={`(max-width: ${notebook})`}>
          {matches => (!matches ? <Header fontColor="#9b9b9b" /> : <></>)}
        </MediaQuery>
        <div
          className="d-md-none offset-10 mt-3"
          style={{ position: 'fixed', zIndex: 11 }}
        >
          <Drawer />
        </div>
        <div id="pdfpage" className="pt-3 pt-md-5">
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
            lectureId={this.props.params.lecture_id}
            nowPage={this.state.current + 1}
          />
        </div>
      </div>
    );
  }
}

PdfPage.propTypes = {
  params: PropTypes.shape({
    lecture_id: PropTypes.string.isRequired,
  }).isRequired,
};

export default PdfPage;
