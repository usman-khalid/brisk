import alertClasses from './alert.module.css';

export default function decorate(block) {
  block.classList.add(alertClasses.alert);
}
