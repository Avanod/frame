class ScreenMask {
  init = (initial) => {
    if (!initial) return;
    this.mouseEvents();
  }
  mouseEvents = () => {
    let moved, clicked, startPosition, element;
    let mousedownListener = (event) => {
      const x = event.pageX;
      const y = event.pageY;
      startPosition = {x, y};
      clicked = true;
    };

    let mousemoveListener = (event) => {
      const x = event.pageX;
      const y = event.pageY;
      const innerWidth = window.innerWidth;
      const innerHeight = window.innerHeight;
      if (clicked) {
        event.preventDefault();
        if (!moved) element = this.createElement();
        if (!element) return;
        // Style
        //// Background color of element
        element.style.backgroundColor = 'black';
        //// CSS position of element
        element.style.position = 'absolute';
        //// Position of element
        element.style.top = `${startPosition.y < y ? startPosition.y : (y < 5 ? 5 : y)}px`;
        element.style.right = `${startPosition.x < x ? startPosition.x : (x > innerWidth ? innerWidth - 5 : x)}px`;
        element.style.bottom = `${y < startPosition.y ? startPosition.y : (y > innerHeight ? innerHeight - 5 : y)}px`;
        element.style.left = `${x < 5 ? 5 : (x < startPosition.x ? x : startPosition.x)}px`;
        //// Width and height of element
        element.style.width = `${startPosition.x > x ? (x < 0 ? startPosition.x - 5 : startPosition.x - x) : (x > innerWidth ? innerWidth - startPosition.x - 5 : x - startPosition.x)}px`;
        element.style.height = `${startPosition.y > y ? (y < 0 ? startPosition.y - 5 : startPosition.y - y) : (y > innerHeight ? innerHeight - startPosition.y - 5 :  y - startPosition.y)}px`;
        moved = true;
      }
    };

    let mouseupListener = () => {
      moved = false;
      clicked = false;
    };

    document.addEventListener('mousedown', mousedownListener);
    document.addEventListener('mousemove', mousemoveListener);
    document.addEventListener('mouseup', mouseupListener);

    // document.addEventListener('mouseup', upListener)

    // release memory
    // document.removeEventListener('mousedown', downListener)
    // document.removeEventListener('mousemove', moveListener)
    // document.removeEventListener('mouseup', upListener)
  };
  createElement = () => {
    // Create elements
    const element = document.createElement('div');
    const close = document.createElement('div');
    close.innerText = '✖';
    // Set attributes
    close.setAttribute('class', 'close');
    element.setAttribute('id', `mask-element-${Math.random().toString(16).slice(2)}`);
    // Add event listener to close
    close.addEventListener('click', () => this.removeElement(element));
    // Append close to element
    element.appendChild(close);
    // Append element to body
    document.body.appendChild(element);
    return element;
  };
  removeElement = (element) => element.remove();
}

export default ScreenMask;