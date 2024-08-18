import heroClasses from './hero.module.css';

export default async function decorate(block) {
  block.classList.add(heroClasses.hero);
  const section = block.closest('.section.hero-container');

  if (section) {
    section.classList.add(heroClasses.heroContainer);
  }
}
