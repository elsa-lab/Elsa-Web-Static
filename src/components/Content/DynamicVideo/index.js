const topic = ['2017', 'Dynamic Video Segmentation Network', ''];

const abstract = [
  `In this paper, we present a detailed design of the dynamic video segmentation network (DVSNet) for fast and efficient semantic video segmentation. DVSNet consists of two convolutional neural networks: a segmentation network and a flow network. The former generates highly accurate semantic segmentations, but is deeper and slower.  The latter is much faster than the former, but its output requires further processing to generate less accurate semantic segmentations.  We explore the use of a decision network (DN) to adaptively assign different frame regions to different networks based on a metric called “expected confidence score”.  Frame regions with a higher expected confidence score traverse the flow network. Frame regions with a lower expected confidence score have to pass through the segmentation network.  The experimental results show that our DVSNet is able to achieve up to 70.4% mIoU at 19.8 fps on the Cityscape dataset.  A high speed version of DVSNet is able to deliver an fps of 30.4 with 63.2% mIoU on the same dataset.  DVSNet is also able to reduce up to 95% of the computational workloads.
  `,
];

const proposedMethodology = [
  {
    id: 1,
    title: 'Adaptive Key Frame Scheduling Policy',
  },
  {
    id: 2,
    title: 'Decision Network & Training Methodology',
  },
  {
    id: 3,
    title: 'Frame Region Based Execution',
  },
];

const experimentalResults = [
  {
    id: 4,
    title: 'Dataset & Experiment Settings',
  },
  {
    id: 5,
    title: 'Validation of DVSNet',
  },
  {
    id: 6,
    title: 'Various DVSNet Configurations',
  },
  {
    id: 7,
    title: 'Frame Division',
  },
];

const conclusion = [
  `We present a DVSNet framework to strike a balance between quality and efficiency for semantic video
segmentation. The DVSNet framework consists of two major parts: a segmentation path and a spatial
warping path. The former is deeper and slower but highly accurate, while the latter is faster but less
accurate.  We propose to divide video frames into frame regions, and perform semantic segmentation for
different frame regions by different DVSNet paths. We explore the use of DN to determine which frame
regions should be forwarded to which DVSNet paths based on a metric called expected confidence score.
We further propose an adaptive key frame scheduling policy to adaptively adjust the update period of key
frames at runtime. We have performed extensive experiments for various configurations of DVSNet, and
showed that DVSNet outperforms contemporary state-of-the-art semantic segmentation models in terms of
efficiency and flexibility.`,
];

const DynamicVideo = {
  topic,
  abstract,
  proposedMethodology,
  experimentalResults,
  conclusion,
};

export default DynamicVideo;
