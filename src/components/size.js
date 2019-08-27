import { generateMedia } from 'styled-media-query';

const desktop = '1600px';
const notebook = '1200px';

const media = generateMedia({
  desktop,
  notebook,
});

export { media, desktop, notebook };
