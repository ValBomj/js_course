const countTimer = deadline => {
  const timerHours = document.querySelector("#timer-hours"),
    timerMinutes = document.querySelector("#timer-minutes"),
    timerSeconds = document.querySelector("#timer-seconds");

  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime(),
      dateNow = new Date().getTime(),
      timeRemaining = (dateStop - dateNow) / 1000,
      seconds = Math.floor(timeRemaining % 60),
      minutes = Math.floor((timeRemaining / 60) % 60),
      hours = Math.floor(timeRemaining / 60 / 60);

    return { timeRemaining, hours, minutes, seconds };
  };

  const updateClock = () => {
    const timer = getTimeRemaining();

    const addZero = time => {
      if (time >= 0 && time <= 9) {
        return "0" + time;
      } else {
        return time;
      }
    };

    if (timer.timeRemaining > 0) {
      timerHours.textContent = addZero(timer.hours);
      timerMinutes.textContent = addZero(timer.minutes);
      timerSeconds.textContent = addZero(timer.seconds);
    } else {
      timerHours.textContent = "00";
      timerMinutes.textContent = "00";
      timerSeconds.textContent = "00";
      clearInterval(timerInterval);
    }
  };

  const timerInterval = setInterval(updateClock, 1000);
};

export default countTimer;
