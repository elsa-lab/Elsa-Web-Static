import React, { Component } from 'react';
import axios from 'axios';

import ProjectHeader from '../Share/ProjectHeader';
import settings from '../../settings';

import Topic from './template/Topic';
import Abstract from './template/Abstract';
import Video from './template/Video';
import Proposed from './template/Proposed';
import Result from './template/Result';
import Conclusion from './template/Conclusion';
import Footer from './template/Footer';
import './main.scss';
import anime from './Ellipsis-2.2s-200px.svg';

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      topic: {
        title: '',
        subtitle: '',
        year: '',
        description: '',
      },
      video_url: '',
      abstract: '',
      sections: '',
      conclusion: '',
      loading: true,
    };
  }

  componentWillMount() {
    const ins = axios.create({
      baseURL: settings.backend_url,
      timeout: 1000,
    });

    ins
      .get(`/projects/${this.props.params.project_id}`)
      .then(res => {
        this.setState({
          id: res.data.id,
          topic: {
            title: res.data.title,
            year: res.data.year,
            subtitle: res.data.subtitle,
            description: res.data.description,
          },
          video_url: res.data.video_url,
          abstract: res.data.content,
          conclusion: res.data.conclusion,
          sections: res.data.sections,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  renderSection = () => {
    if (this.state.sections.length === 1) {
      return (
        <div className="section-block">{this.state.sections[0].title}</div>
      );
    }
  };

  render() {
    let style;
    if (this.state.loading === true) {
      style = { opacity: 1 };
    } else {
      style = { opacity: 0, zIndex: 0 };
    }

    return (
      <div id="singleProject">
        <ProjectHeader fontColor="#364b8b" />
        <div id="loading" style={style}>
          <img src={anime} alt="" />
        </div>

        <Topic
          projectName={this.state.topic.title}
          content={this.state.topic}
        />
        <Abstract content={this.state.abstract} />
        <Video videoUrl={this.state.video_url} />
        <Proposed content={this.state.sections} />
        <Result content={this.state} />
        <Conclusion content={this.state.conclusion} />
        <Footer />
      </div>
    );
  }
}

export default NewProject;
