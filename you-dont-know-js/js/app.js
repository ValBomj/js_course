'use strict';

const booksInner = document.querySelector('.books');
const books = document.querySelectorAll('.book');

const titleLinks = document.querySelectorAll('a');

const li = document.querySelectorAll('li');

const body = document.querySelector('body');

const adv = document.querySelector('.adv');

booksInner.prepend(books[1]);
books[4].after(books[3]);
booksInner.append(books[2]);

titleLinks[4].textContent = 'Книга 3. this и Прототипы Объектов';

const book2 = books[0].querySelectorAll('li');
const book5 = books[5].querySelectorAll('li');
const book6 = books[2].querySelectorAll('li');

book2[3].after(book2[6]);
book2[6].after(book2[8])
book2[10].before(book2[2]);

book5[4].after(book5[2]);
book5[3].before(book5[9]);
book5[8].before(book5[5]);

body.style.backgroundImage = 'url(image/you-dont-know-js.jpg)';

adv.remove();

const newElem = document.createElement('li');
newElem.textContent = 'Глава 8: За пределами ES6';
book6[8].after(newElem);
