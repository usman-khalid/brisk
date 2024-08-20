/**
 * create an element.
 * @param {string} tagName the tag for the element
 * @param {object} props properties to apply
 * @param {string|Element} html content to add
 * @returns the element
 */
function createElement(tagName, props, html) {
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
}

/**
 * filter the link siblings to get only the siblings that are not empty text nodes
 * @param {Element} link the link
 * @returns a list of sibling nodes that aren't empty text nodes or the current link
 */
function getLinkSiblings(link) {
  const parent = link.parentElement;
  const linkSiblings = [...parent.childNodes].filter((node) => {
    if (link === node) return false; // The link itself is not a sibling
    if (node.nodeType === Node.TEXT_NODE) {
      // If a sibling is a text that is more than whitespace
      // then this link is inside other text.
      return node.textContent.trim().length > 0;
    }
    return true;
  });

  return linkSiblings;
}

export {
  createElement,
  getLinkSiblings,
};
