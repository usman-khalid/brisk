import Mustache from 'mustache';
import { readBlockConfig } from '../../scripts/aem.js';
import carouselStyles from './carousel.module.css';
import template from './carousel.mst?raw'; // eslint-disable-line import/no-unresolved

export default function decorate(block) {
  const config = readBlockConfig(block);
  block.innerHTML = Mustache.render(template, {
    carouselStyles,
    config,
  });
}
