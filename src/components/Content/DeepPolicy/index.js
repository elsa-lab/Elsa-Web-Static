const topic = [
  '2018',
  'A Deep Policy Inference Q-Network for Multi-Agent Systems',
  '',
];

const abstract = [
  `We present DPIQN, a deep policy inference Q-network that targets multi-agent systems composed of controllable agents, collaborators, and opponents that interact with each other. We focus on modeling agents with varying strategies and propose to employ “policy features” learned from raw observations of collaborators and opponents by inferring their policies. DPIQN incorporates the learned policy features as a hidden vector into its own deep Q-network (DQN), such that it is able to predict better Q values for the controllable agents than the state-of-the-art deep reinforcement learning models. We further propose an enhanced version of DPIQN, called deep recurrent policy inference Q-network (DRPIQN), for handling partial observability. Both DPIQN and DRPIQN are trained by an adaptive training procedure, which adjusts the network’s attention to learn the policy features and its own Qvalues at different phases of the training process. Our models are evaluated in a classic soccer game involving both competitive and collaborative scenarios. Experimental results show that DPIQN and DRPIQN do lead to better overall performance in terms of stability and mean scores than the baseline DQN and deep recurrent Q-network (DRQN) models.`,
];

const proposedMethodology = [
  {
    id: 1,
    title: 'DPIQN &amp; DRPIQN',
  },
  {
    id: 2,
    title: 'Training Methodology',
  },
];

const experimentalResults = [
  {
    id: 4,
    title: 'Environment and Model Settings',
  },
  {
    id: 5,
    title: 'Learning Curves and Evaluation Results',
  },
  {
    id: 6,
    title: 'Generalizability to Unfamiliar Agent',
  },
];

const conclusion = [
  `We extended the architectures of DPIQN and DRPIQN to model multiple agents, such that it is able to capture the behaviors of the other agents in the environment. We trained our models with an adaptive loss function, which guides our models to learn policy features before learning Q values. We performed experiments for two soccer game scenarios, and demonstrated that DPIQN and DRPIQN outperform DQN and DRQN in various settings. We verified that DPIQN is capable of dealing with non-stationarity by conducting experiments where the controllable agent has to cooperate with a learning agent, and showed that DPIQN is superior in collaboration to a recent multi-agent RL approach. We further validated the generalizability of our models in handling unfamiliar collaborators and opponents. Finally, we analyzed the loss function terms, and demonstrated that our adaptive loss function does improve the stability and learning speed of our models.`,
];

const DynamicVideo = {
  topic,
  abstract,
  proposedMethodology,
  experimentalResults,
  conclusion,
};

export default DynamicVideo;
