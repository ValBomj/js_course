'use strict';
const body = document.querySelector('body');

function DomElement(s = '.block', h = 100, w = 100, b = 'blue', f = 24) {
  this.selector = s;
  this.height = h;
  this.width = w;
  this.bg = b;
  this.fontSize = f;
}
// .className = this.selector.slice(1, this.selector.length)
DomElement.prototype.createElement = function() {
  const block = this.selector[0] === '.' ? document.createElement('div') : this.selector[0] === '#' ? document.createElement('p') : console.log('Элемент не создан');
  const blockSelector = this.selector.slice(1, this.selector.length);
  this.selector[0] === '.' ? block.className = blockSelector : this.selector[0] === '#' ? block.id = blockSelector : console.log('Элемент не создан');
  block.style.cssText = 'height: ' + this.height + 'px' + ';' + 
                        'width: ' + this.width + 'px' + ';' +
                        'background: ' + this.bg + ';' +
                        'font-size: ' + this.fontSize + 'px' + ';';
  block.textContent = blockSelector;
  body.appendChild(block);
};

const domElement = new DomElement();
domElement.createElement();