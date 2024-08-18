import alertStyles from './alert.module.css';

export default function decorate(block) {
  block.classList.add(alertStyles.alert);
}
