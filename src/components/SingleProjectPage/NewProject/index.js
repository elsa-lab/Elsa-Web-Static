import React, { Component } from 'react';

import Topic from './template/Topic';
import Award from './template/Awarding';
import Abstract from './template/Abstract';
import Video from './template/Video';
import Proposed from './template/Proposed';
import Conclusion from './template/Conclusion';
import './main.scss';
import anime from './Ellipsis-2.2s-200px.svg';

import DeepPolicyInferenceQNetwork from '../../Content/DeepPolicy';
import DynamicVideoSegmentationNetwork from '../../Content/DynamicVideo';
import VirtualToReal from '../../Content/VirtualToReal';

import axios from 'axios';
import settings from '../../../settings';
import Particles from 'react-particles-js';

const projectNameMap = {
  'Virtual-to-Real': VirtualToReal,
  'Dynamic-Video-Segmentation-Network': DynamicVideoSegmentationNetwork,
  'A-Deep-Policy-Inference-Q-Network': DeepPolicyInferenceQNetwork,
};

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
                    cover_image_url: res.data.cover_image_url,
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
        const {
          params: { name },
        } = this.props;
        const content = projectNameMap[name];
        console.log(this.state)
        if(this.state.loading === true) {
            style = {opacity: 1};
        } else {
            style = {opacity: 0};
        }
      return (
        <div>
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
        <Topic projectName={name} content={this.state.topic} />
            <Award projectName={name}></Award>
            <Abstract projectName={name} content={this.state.abstract}></Abstract>
            <Video projectName={name} videoUrl={this.state.video_url}></Video>
            <Proposed projectName={name} content={content.proposedMethodology}></Proposed>
            <Conclusion projectName={name} content={content.experimentalResults}></Conclusion>
        </div>
      );
    }
}


export default NewProject;
