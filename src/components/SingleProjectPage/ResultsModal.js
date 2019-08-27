import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';

import BackgroundImage from '../static/background_image_invert_vertical_2.jpg';
import BackgroundImageGreen from '../static/background_image_green.jpg';
import BackgroundImagePurple from '../static/background_image_purple.jpg';
import DeepMethodImage2 from '../static/Deep/Method2.png';
import DeepResultImage1 from '../static/Deep/Result1.png';
import DeepResultImage2 from '../static/Deep/Result2.png';
import DeepResultImage3 from '../static/Deep/Result3.png';
import DynamicMethodImage1 from '../static/Dynamic/Method1.jpg';
import DynamicMethodImage2 from '../static/Dynamic/Method2.jpg';
import DynamicMethodImage3 from '../static/Dynamic/Method3.jpg';
import DynamicResultImage11 from '../static/Dynamic/Result11.jpg';
import DynamicResultImage12 from '../static/Dynamic/Result12.jpg';
import DynamicResultImage2 from '../static/Dynamic/Result2.jpg';
import DynamicResultImage31 from '../static/Dynamic/Result31.jpg';
import DynamicResultImage32 from '../static/Dynamic/Result32.jpg';
import DynamicResultImage41 from '../static/Dynamic/Result41.jpg';
import DynamicResultImage42 from '../static/Dynamic/Result42.jpg';
import VirtualMethodImage1 from '../static/Virtual/Method1.png';
import VirtualMethodImage2 from '../static/Virtual/Method2.png';
import VirtualMethodImage31 from '../static/Virtual/Method31.png';
import VirtualMethodImage32 from '../static/Virtual/Method32.png';
import { media } from '../size';

import {
  DeepMethod1,
  DeepMethod2,
  DeepResult1,
  DeepResult2,
  DeepResult3,
} from './Modal/DeepPolicy';
import {
  DynamicMethod1,
  DynamicMethod2,
  DynamicMethod3,
  DynamicResult1,
  DynamicResult2,
  DynamicResult3,
  DynamicResult4,
} from './Modal/DynamicVideo';
import {
  VirtualMethod1,
  VirtualMethod2,
  VirtualMethod3,
} from './Modal/VirtualToReal';

const BodyCSS = {
  height: '80vmin',
  padding: '0',
};

const width = '180vmin';

const Background = styled.div`
  background: url(${props => props.background});
  background-size: cover;
  width: 100%;
  height: 100%;
  z-index: -100;
`;

const Title = styled.div`
  color: white;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 10vmin;
  font-size: 4vmin;
  padding: 2vmin 2vmin 2vmin 3vmin;

  ${media.lessThan('notebook')`
    width: 90vmin;
  `};
`;

const backgroundMap = {
  'Virtual-to-Real': BackgroundImage,
  'Dynamic-Video-Segmentation-Network': BackgroundImageGreen,
  'A-Deep-Policy-Inference-Q-Network': BackgroundImagePurple,
};

class ResultsModal extends Component {
  renderModalContentVirtual = modalId => {
    switch (modalId) {
      case 1:
        return <VirtualMethod1 image={VirtualMethodImage1} />;
      case 2:
        return <VirtualMethod2 image={VirtualMethodImage2} />;
      case 3:
        return (
          <VirtualMethod3
            image={[VirtualMethodImage31, VirtualMethodImage32]}
          />
        );
      default:
        return <></>;
    }
  };

  renderModalContentDynamic = modalId => {
    switch (modalId) {
      case 1:
        return <DynamicMethod1 image={DynamicMethodImage1} />;
      case 2:
        return <DynamicMethod2 image={DynamicMethodImage2} />;
      case 3:
        return <DynamicMethod3 image={DynamicMethodImage3} />;
      case 4:
        return (
          <DynamicResult1
            image={[DynamicResultImage11, DynamicResultImage12]}
          />
        );
      case 5:
        return <DynamicResult2 image={DynamicResultImage2} />;
      case 6:
        return (
          <DynamicResult3
            image={[DynamicResultImage31, DynamicResultImage32]}
          />
        );
      case 7:
        return (
          <DynamicResult4
            image={[DynamicResultImage41, DynamicResultImage42]}
          />
        );
      default:
        return <></>;
    }
  };

  renderModalContentDeep = modalId => {
    switch (modalId) {
      case 1:
        return <DeepMethod1 />;
      case 2:
        return <DeepMethod2 image={DeepMethodImage2} />;
      case 4:
        return <DeepResult1 image={DeepResultImage1} />;
      case 5:
        return <DeepResult2 image={DeepResultImage2} />;
      case 6:
        return <DeepResult3 image={DeepResultImage3} />;
      default:
        return <></>;
    }
  };

  renderWhichProjectContent = (projectName, modalId) => {
    switch (projectName) {
      case 'Virtual-to-Real':
        return <>{this.renderModalContentVirtual(modalId)}</>;
      case 'Dynamic-Video-Segmentation-Network':
        return <>{this.renderModalContentDynamic(modalId)}</>;
      case 'A-Deep-Policy-Inference-Q-Network':
        return <>{this.renderModalContentDeep(modalId)}</>;
      default:
        return <></>;
    }
  };

  render() {
    const { visible, title, modalId, closeModal, projectName } = this.props;

    return (
      <Modal
        visible={visible}
        centered
        bodyStyle={BodyCSS}
        width={width}
        onCancel={closeModal}
        footer={null}
        wrapClassName="block"
      >
        <Background background={backgroundMap[projectName]}>
          <Title>{title}</Title>
          {this.renderWhichProjectContent(projectName, modalId)}
        </Background>
      </Modal>
    );
  }
}

ResultsModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalId: PropTypes.number.isRequired,
  projectName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default ResultsModal;
