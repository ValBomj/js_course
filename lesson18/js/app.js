window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // Timer
  function countTimer(deadline) {
    const timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds");

    function getTimeRemaining() {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);

      return { timeRemaining, hours, minutes, seconds };
    }

    function updateClock() {
      const timer = getTimeRemaining();

      function addZero(time) {
        if (time >= 0 && time <= 9) {
          return "0" + time;
        } else {
          return time;
        }
      }

      if (timer.seconds >= 0) {
        timerHours.textContent = addZero(timer.hours);
        timerMinutes.textContent = addZero(timer.minutes);
        timerSeconds.textContent = addZero(timer.seconds);
      } else {
        timerHours.textContent = "00";
        timerMinutes.textContent = "00";
        timerSeconds.textContent = "00";
      }

      timer.timeRemaining > 0 ? setInterval(updateClock, 1000) : clearInterval(updateClock, 1000);
    }

    updateClock();
  }

  countTimer("5 july 2020");
});
