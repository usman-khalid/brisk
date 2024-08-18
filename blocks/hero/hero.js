import heroStyles from './hero.module.css';

export default async function decorate(block) {
  block.classList.add(heroStyles.hero);
  const section = block.closest('.section.hero-container');

  if (section) {
    section.classList.add(heroStyles.heroContainer);
  }
}
