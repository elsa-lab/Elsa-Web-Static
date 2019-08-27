const topic = [
  '2017',
  'Virtual-to-Real:',
  'Learning to Control in Visual Semantic Segmentation',
];

const abstract = [
  `Collecting training data from the physical world is usually
time-consuming and even dangerous for fragile robots, and
therefore, recent advances in robot learning propose to use
simulators as the training platform. Unfortunately, the reality
gap between synthetic and real visual data prohibits directly
migrating the models trained in virtual worlds to the real
world. This paper proposes a modular architecture for tackling
simulation- to-reality problem. The architecture separates the
learning model into a perception module and a control policy
module, and uses semantic image segmentation as the meta
representation for relating these two modules. The perception
module translates RGB images to semantic image segmentations.
The control policy module employs deep reinforcement learning
(RL) methods and takes image segmentations as its inputs.
Experimental results show that our architecture outperforms all
baseline methods in the virtual and real environments, and
learns faster than them.`,
];

const proposedMethodology = [
  {
    id: 1,
    title: 'Bridge the Gap between Simulation and Reality',
  },
  {
    id: 2,
    title: 'Training in Simulated Enviorments',
  },
  {
    id: 3,
    title: 'Visual Guidance Module and Target Switching',
  },
];

const experimentalResults = [
  {
    id: 4,
    title: 'Model Settings and Robotic Platform',
  },
  {
    id: 5,
    title: 'Learning Curves of the Two Tasks',
  },
  {
    id: 6,
    title: 'Comparison in the Simulated and Real Worlds',
  },
];

const conclusion = [
  `We presented a new modular architecture for transferring policies
learned in simulation to the real world for vision-based
roboticcontrol. We proposed to separate the model in to a perception
module and a control policy module, and introduce the concept of
using semantic image segmentation as the meta state for relating
these two modules. We trained our model with a standard RL
algorithm, and did not apply any domain randomization technique. We
performed experiments in two benchmark tasks: an obstacle avoidance
task and a target following task, and demonstrated that our proposed
method outperforms the baseline models in both virtual and real
environments. We analyzed the use of scene semantics as the meta
state, and show that this structured form of representations does
improve the learning speed of our model`,
];

const VirtualToReal = {
  topic,
  abstract,
  proposedMethodology,
  experimentalResults,
  conclusion,
};

export default VirtualToReal;
