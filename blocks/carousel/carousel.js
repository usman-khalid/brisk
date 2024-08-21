import { render } from 'micromustache';
import { readBlockConfig } from '../../scripts/aem.js';
import carouselStyles from './carousel.module.css';
import template from './carousel.mst?raw'; // eslint-disable-line import/no-unresolved

export default function decorate(block) {
  const config = readBlockConfig(block);
  block.innerHTML = render(template, {
    carouselStyles,
    config,
  });
}
