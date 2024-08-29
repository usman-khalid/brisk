/**
 * create an element.
 * @param {string} tagName the tag for the element
 * @param {object} props properties to apply
 * @param {string|Element} html content to add
 * @returns the element
 */
const createElement = (tagName, props, html) => {
  const elem = document.createElement(tagName);
  if (props) {
    Object.keys(props).forEach((propName) => {
      const val = props[propName];
      if (propName === 'class') {
        const classesArr = (typeof val === 'string') ? [val] : val;
        elem.classList.add(...classesArr);
      } else {
        elem.setAttribute(propName, val);
      }
    });
  }

  if (html) {
    const appendEl = (el) => {
      if (el instanceof HTMLElement || el instanceof SVGElement) {
        elem.append(el);
      } else {
        elem.insertAdjacentHTML('beforeend', el);
      }
    };

    if (Array.isArray(html)) {
      html.forEach(appendEl);
    } else {
      appendEl(html);
    }
  }

  return elem;
};

/**
 * Wraps images followed by links within a matching <a> tag.
 * @param {Element} container The container element
 */
const wrapImgsInLinks = (container) => {
  const ignorePatterns = ['/fragments/', '/forms/'];
  const pictures = container.querySelectorAll('picture');

  pictures.forEach((pic) => {
    // Case 1: <picture><br/><a>
    if (
      pic.nextElementSibling?.tagName === 'BR'
      && pic.nextElementSibling.nextElementSibling?.tagName === 'A'
    ) {
      const link = pic.nextElementSibling.nextElementSibling;
      if (link.textContent.includes(link.getAttribute('href'))) {
        if (ignorePatterns.some((pattern) => link.getAttribute('href').includes(pattern))) {
          return;
        }
        pic.nextElementSibling.remove(); // Remove <br/>
        link.innerHTML = pic.outerHTML;
        pic.replaceWith(link);
      }
      return;
    }

    // Case 2: <p><picture></p><p><a></p>
    const parent = pic.parentElement;
    const nextSibling = parent.nextElementSibling;

    if (
      parent.tagName === 'P'
      && nextSibling?.tagName === 'P'
      && nextSibling.children.length === 1
    ) {
      const link = nextSibling.querySelector('a');
      if (link && link.textContent.includes(link.getAttribute('href'))) {
        if (ignorePatterns.some((pattern) => link.getAttribute('href').includes(pattern))) {
          return;
        }
        link.parentElement.remove();
        link.innerHTML = pic.outerHTML;
        pic.replaceWith(link);
      }
    }
  });
};

export {
  createElement,
  wrapImgsInLinks,
};
