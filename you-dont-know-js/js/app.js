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

body.style.backgroundImage = 'url(image/you-dont-know-js.jpg)';

adv.remove();

li[3].after(li[6]);
li[6].after(li[8]);
li[47].after(li[55]);
li[55].after(li[49]);
li[49].after(li[50]);

const newElem = document.createElement('li');
newElem.textContent = 'Глава 8: За пределами ES6';

li[25].after(newElem);
