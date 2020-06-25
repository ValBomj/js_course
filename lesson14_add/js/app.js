'use strict';
const body = document.querySelector('body');

const DomElement = function(s, h, w, b, f) {
  this.selector = s;
  this.height = h;
  this.width = w;
  this.bg = b;
  this.fontSize = f;
  this.createElement = function() {
    if (this.selector[0] === '.') {
      const div = document.createElement('div');
      div.className = this.selector.slice(1, this.selector.length);
      div.style.cssText = 'height: ' + this.height + 'px' + ';' + 
                    'width: ' + this.width + 'px' + ';' +
                    'background: ' + this.bg + ';' +
                    'font-size: ' + this.fontSize + 'px' + ';';
      div.textContent = this.selector.slice(1, this.selector.length);
      body.appendChild(div);
    } else if (this.selector[0] === '#') {
      const p = document.createElement('p');
      p.id = this.selector.slice(1, this.selector.length);
      p.style.cssText = 'height: ' + this.height + 'px' + ';' + 
                  'width: ' + this.width + 'px' + ';' +
                  'background: ' + this.bg + ';' +
                  'font-size: ' + this.fontSize + 'px' + ';';
      p.textContent = this.selector.slice(1, this.selector.length);
      body.appendChild(p);
    }
  }
  if (this.selector) {
    this.createElement();
  }
}

const domElement = new DomElement('.block', 100, 400, 'blue', 32);