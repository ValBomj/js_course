'use strict';
const a = document.querySelector('#a');
const b = document.querySelector('#b');

const res = document.querySelector('#res');

const sum = document.querySelector('#sum');
const mult = document.querySelector('#mult');




const calculator = {
  init(){
    this.a = +a.value;
    this.b = +b.value;
  },
  sum(){
    this.init();
    this.show(this.a + this.b);
  },
  mult(){
    this.init();
    this.show(this.a * this.b);
  },
  show(result){
    this.a && this.b ? res.value = result : false;
  },
  eventListeners(){
    sum.addEventListener('click', this.sum.bind(this));
    mult.addEventListener('click', this.mult.bind(this));
  }
}

calculator.eventListeners();
calculator.init();
