window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // Timer
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

      if (timer.seconds >= 0) {
        timerHours.textContent = addZero(timer.hours);
        timerMinutes.textContent = addZero(timer.minutes);
        timerSeconds.textContent = addZero(timer.seconds);
      } else {
        timerHours.textContent = "00";
        timerMinutes.textContent = "00";
        timerSeconds.textContent = "00";
      }

      if (timer.timeRemaining <= 0) clearInterval(updateClock, 1000);
    };

    setInterval(updateClock, 1000);
  };
  countTimer("5 july 2020");

  // Menu
  const toggleMenu = () => {
    const btnMenu = document.querySelector(".menu"),
      menu = document.querySelector("menu"),
      closeBtn = document.querySelector(".close-btn"),
      menuItems = menu.querySelectorAll("ul>li");

    const handlerMenu = () => {
      menu.classList.toggle("active-menu");
    };

    btnMenu.addEventListener("click", handlerMenu);
    closeBtn.addEventListener("click", handlerMenu);
    menuItems.forEach(elem => elem.addEventListener("click", handlerMenu));
  };
  toggleMenu();

  // Popup

  let top = -100;
  let popupInterval;
  const popup = document.querySelector(".popup"),
    popupBtn = document.querySelectorAll(".popup-btn"),
    popupClose = document.querySelector(".popup-close");
  const popupAnimation = () => {
    popup.style.display = "block";
    const popupContent = document.querySelector(".popup-content");
    popupContent.style.top = `${top}%`;

    top += 5;
    if (top <= 10) {
      popupInterval = requestAnimationFrame(popupAnimation);
    } else {
      cancelAnimationFrame(popupInterval);
    }
  };
  const togglePopup = () => {
    popupBtn.forEach(elem => {
      elem.addEventListener("click", () => {
        if (document.documentElement.clientWidth >= 768) {
          top = -100;
          popupAnimation();
        } else {
          popup.style.display = "block";
        }
      });
    });
    popupClose.addEventListener("click", () => {
      popup.style.display = "none";
    });
  };
  togglePopup();
});
