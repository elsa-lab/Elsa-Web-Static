import { generateMedia } from 'styled-media-query';

const xl = '1140px';
const lg = '960px';
const md = '720px';
const sm = '480px';

const media = generateMedia({
  xl,
  lg,
  md,
  sm,
});

export { media, xl, lg, md, sm };
