'use strict';

const body = document.querySelector('body');
const btn = document.getElementById('btn');
const colorTitle = document.querySelector('.colorPicker-title');

const possibleValues = 'absdef0123456789';

const colorPicker = function() {
  let color = '#';

  for (let i = 0; i < 6; i++) {
    const rand = Math.floor(Math.random() * possibleValues.length);
    color += possibleValues[rand];
  }
  colorTitle.textContent = color;
  btn.style.color = color;
  document.body.style.backgroundColor = color;
}
btn.addEventListener('click', colorPicker);