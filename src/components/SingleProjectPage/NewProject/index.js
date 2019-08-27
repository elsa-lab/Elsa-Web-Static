import React, { Component } from 'react';

import Topic from './template/Topic';
import Award from './template/Awarding';
import Abstract from './template/Abstract';
import Video from './template/Video';
import './main.scss';

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

const ParticlesParm = {
    color: "black"
};

class NewProject extends Component {
    state = {
        porjects: '',
        title: '',
        year: '',
        subtitle: '',
        conclusion: '',
        abstract: '',

    };

    componentWillMount() {
        const ins = axios.create({
            baseURL: settings.backend_url,
            timeout: 1000,
        });

        ins
            .get('/projects')
            .then(res => {
                // console.log(res.data);
                this.setState({ courses: res.data });
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        const {
          params: { name },
        } = this.props;
        const content = projectNameMap[name];
        // console.log(content)
      return (
        <div>
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
            <Topic projectName={name} content={content.topic} />
            <Award projectName={name}></Award>
            <Abstract projectName={name} content={content.abstract}></Abstract>
            <Video projectName={name}></Video>
            <div id="post"></div>
            <div id="conclusion"></div>
        </div>
      );
    }
}


export default NewProject;
