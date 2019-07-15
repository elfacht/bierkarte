import getelementYPos   from './getelementYPos.js';

/**
 * Scroll to element with transition
 *
 * @param  {Object}  element  [clicked element]
 * @param  {Number}  duration [scrolling duration]
 * @param  {Boolean} isOption [checks if element is <option>]
 * @return {Function} Scroll!
 */
export default function(element, duration = 300, isOption) {
  // check if <option> or <a>
  const target = isOption ? element.value : element.getAttribute('href');

  const startingY = window.pageYOffset;
  const dataOffset = element.dataset.scrollOffset;
  const offset = dataOffset ? dataOffset : 0;
  const elementY = getelementYPos(target) - offset;

  // If element is close to page's bottom then window will scroll only to some position above the element.
  let targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY;
  let diff = targetY - startingY;

  // Easing function: easeInOutCubic
  // From: https://gist.github.com/gre/1650294
  const easing = function (t) { return t<0.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1; };
  let start;

  if (!diff) { return; }

  // Bootstrap our animation - it will get called right before next frame shall be rendered.
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) { start = timestamp; }
    // Elapsed miliseconds since start of scrolling.
    const time = timestamp - start;
    // Get percent of completion in range [0, 1].
    let percent = Math.min(time / duration, 1);

    // Apply the easing.
    // It can cause bad-looking slow frames in browser performance tool, so be careful.
    percent = easing(percent);

    window.scrollTo(0, startingY + diff * percent);

    // Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
}
