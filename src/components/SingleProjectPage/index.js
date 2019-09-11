import React, { Component } from 'react';

import Topic from './template/Topic';
import Award from './template/Awarding';
import Abstract from './template/Abstract';
import Video from './template/Video';
import Proposed from './template/Proposed';
import Conclusion from './template/Conclusion';
import './main.scss';
import anime from './Ellipsis-2.2s-200px.svg';

import Header from '../Share/Header';

import axios from 'axios';
import settings from '../../settings';
import Particles from 'react-particles-js';


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
        cover_image_url: '',
        video_url: '',
        abstract: '',
        conclusion: '',
        created_at: '',
        loading: true
      }
    }
    componentWillMount() {
        const ins = axios.create({
            baseURL: settings.backend_url,
            timeout: 1000,
        });

        ins
            .get('/projects/1')
            .then(res => {
                this.setState({
                    id: res.data.id,
                    topic: {
                        title: res.data.title,
                        year: res.data.year,
                        subtitle: res.data.subtitle,
                        description: res.data.description
                    },
                    cover_image_url: res.data.image_url,
                    video_url: res.data.video_url,
                    abstract: res.data.content,
                    conclusion: res.data.conclusion,
                    created_at: res.data.created_at
                });
            })
            .catch(error => {
                console.log(error);
            });


    }

    componentDidMount(){
        setTimeout(
            function() {
                this.setState({loading: false});
            }
            .bind(this),
            1000
        );
    }

    render() {
        let style;
        console.log(this.state.cover_image_url)
        if(this.state.loading === true) {
            style = {opacity: 1};
        } else {
            style = {opacity: 0};
        }
      return (
        <div>
            <Header fontColor="#9b9b9b" />
            <div id="loading" style={style}><img src={anime} alt=""/></div>;
            <Particles
                params={{
                    "particles": {
                        "number": {
                            "value": 200
                        },
                        "line_linked": {
                            "enable": true,
                            "distance": 70,
                            "opacity": 0.4,
                            "color": "#636363"
                        },
                        "move": {
                            "speed": 1
                        },
                        "opacity": {
                            "anim": {
                                "enable": true,
                                "opacity_min": 0.05,
                                "speed": 2,
                                "sync": false
                            },
                            "value": 0.1
                        },
                        color: {"value":"#000000"}
                    }
                }}
                className="particles"
            />
            <Topic projectName={this.state.topic.title} content={this.state.topic} />
            <Award projectName={this.state.topic.title} imageUrl={this.state.cover_image_url}></Award>
            <Abstract projectName={this.state.topic.title} content={this.state.abstract}></Abstract>
            <Video projectName={this.state.topic.title} videoUrl={this.state.video_url}></Video>
            {/*<Proposed projectName={this.state.topic.title} content={content.proposedMethodology}></Proposed>
        <Conclusion projectName={this.state.topic.title} content={content.experimentalResults}></Conclusion>*/}
        </div>
      );
    }
}


export default NewProject;
