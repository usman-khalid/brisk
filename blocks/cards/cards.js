import { add } from 'ramda';
import { createOptimizedPicture } from '../../scripts/aem.js';
import cardStyles from './cards.module.css';

export default function decorate(block) {
  block.classList.add(cardStyles.cards);
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = cardStyles.cardImage;
      } else div.className = cardStyles.cardBody;
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img
    .closest('picture')
    .replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]),
    ));
  block.textContent = '';
  block.append(ul);

  // Ramda add
  const addOneAndTwo = add(1, 2); // => 3
  console.log(addOneAndTwo); // eslint-disable-line no-console
}
