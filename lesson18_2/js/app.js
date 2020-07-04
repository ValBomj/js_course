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



const calcTime = () => {
  const date = new Date(),
    newYearDate = new Date(`1 jan ${date.getFullYear() + 1}`).getTime(),
    dateHours = date.getHours() >= 0 && date.getHours() < 4 ? 'ночи' : date.getHours() >= 4 && date.getHours() < 12 ? 'утро' : date.getHours() >= 12 && date.getHours() < 17 ? 'день' : 'вечер',
    dateDay = date.toLocaleString('ru', {weekday: 'long'}),
    dateTime = date.toLocaleTimeString('en'),
    currentDate = date.getTime(),
    timeBeforeNewYear = Math.floor((newYearDate - currentDate) / 1000 / 60 / 60 / 24);

  const dayDeclination = (day, arr) => {  
    const options = [2, 0, 1, 1, 1, 2];  
    if (day % 100 >= 5 && day % 100 <= 19) {
      return day + ' ' + arr[2] + ' ';
    } else if (day % 10 <= 4) {
      return day + ' ' + arr[options[day % 10]] + ' ';
    } else {
      return day + ' ' + arr[options[0]] + ' ';
    }
  }

  const day = ['день', 'дня', 'дней'];  

  greeting.textContent = `Добрый ${dateHours}`;
  presentDay.textContent = `Сегодня: ${dateDay}`;
  currentTime.textContent = `Текущее время: ${dateTime}`;
  newYearYearsLeft.textContent = `До нового года осталось ${dayDeclination(timeBeforeNewYear, day)}`;
}
setInterval(calcTime, 1000);