import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';

import DeepPolicyInferenceQNetwork from '../Content/DeepPolicy';
import DynamicVideoSegmentationNetwork from '../Content/DynamicVideo';
import VirtualToReal from '../Content/VirtualToReal';

import Abstract from './Abstract';
import Awarding from './Awarding';
import Conclusion from './Conclusion';
import ExperimentalResults from './ExperimentalResults';
import NextProject from './NextProject';
import ProposedMethodology from './ProposedMethodology';
import SystemStructure from './SystemStructure';
import Topic from './Topic';
import VideoOverview from './VideoOverview';

const eachBlockTag = [
  'topic',
  'systemStructure',
  'abstract',
  'proposedMethodology',
  'experimentalResults',
  'awarding',
  'videoOverview',
  'conclusion',
  'nextProject',
];

const projectNameMap = {
  'Virtual-to-Real': VirtualToReal,
  'Dynamic-Video-Segmentation-Network': DynamicVideoSegmentationNetwork,
  'A-Deep-Policy-Inference-Q-Network': DeepPolicyInferenceQNetwork,
};

class SingleProjectPage extends Component {
  render() {
    const {
      params: { name },
    } = this.props;
    console.log(this.props)
    const content = projectNameMap[name];

    return (
      <ReactFullpage
        licenseKey="OPEN-SOURCE-GPLV3-LICENSE"
        anchors={eachBlockTag}
        render={({ state, fullpageApi }) => {
          // console.log('render prop change', state);
          console.log({ fullpageApi });

          return (
            <ReactFullpage.Wrapper>
              <Topic projectName={name} content={content.topic} />
              <SystemStructure projectName={name} />
              <Abstract projectName={name} content={content.abstract} />
              <ProposedMethodology
                projectName={name}
                content={content.proposedMethodology}
              />
              <ExperimentalResults
                projectName={name}
                content={content.experimentalResults}
              />
              <Awarding projectName={name} />
              <VideoOverview projectName={name} />
              <Conclusion projectName={name} content={content.conclusion} />
              <NextProject />
            </ReactFullpage.Wrapper>
          );
        }}
      />
    );
  }
}

SingleProjectPage.propTypes = {
  params: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default SingleProjectPage;
