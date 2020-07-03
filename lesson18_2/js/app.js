'use strict';

const body = document.querySelector('body'),
  greeting = document.createElement('p'),
  presentDay = document.createElement('p'),
  currentTime = document.createElement('p'),
  newYearYearsLeft = document.createElement('p');

body.appendChild(greeting);
body.appendChild(presentDay);
body.appendChild(currentTime);
body.appendChild(newYearYearsLeft);

function calcTime() {
  const date = new Date(),
    newYearDate = new Date(`1 jan ${date.getFullYear() + 1}`).getTime(),
    dateHours = date.getHours() >= 0 && date.getHours() < 4 ? 'ночь' : date.getHours() >= 4 && date.getHours() < 12 ? 'утро' : date.getHours() >= 12 && date.getHours() < 17 ? 'день' : 'вечер',
    dateDay = date.toLocaleString('ru', {weekday: 'long'}),
    dateTime = date.toLocaleTimeString('en'),
    currentDate = date.getTime(),
    timeBeforeNewYear = Math.floor((newYearDate - currentDate) / 1000 / 60 / 60 / 24);

  greeting.textContent = `Добрый ${dateHours}`;
  presentDay.textContent = `Сегодня: ${dateDay}`;
  currentTime.textContent = `Текущее время: ${dateTime}`;
  newYearYearsLeft.textContent = `До нового года осталось ${timeBeforeNewYear} дней`;
}
setInterval(calcTime, 1000);