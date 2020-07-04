window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // Timer
  // const countTimer = (deadline) => {
  //   const timerHours = document.querySelector("#timer-hours"),
  //     timerMinutes = document.querySelector("#timer-minutes"),
  //     timerSeconds = document.querySelector("#timer-seconds");

  //   const getTimeRemaining = () => {
  //     const dateStop = new Date(deadline).getTime(),
  //       dateNow = new Date().getTime(),
  //       timeRemaining = (dateStop - dateNow) / 1000,
  //       seconds = Math.floor(timeRemaining % 60),
  //       minutes = Math.floor((timeRemaining / 60) % 60),
  //       hours = Math.floor(timeRemaining / 60 / 60);

  //     return { timeRemaining, hours, minutes, seconds };
  //   };

  //   const updateClock = () => {
  //     const timer = getTimeRemaining();

  //     const addZero = (time) => {
  //       if (time >= 0 && time <= 9) {
  //         return "0" + time;
  //       } else {
  //         return time;
  //       }
  //     };

  //     if (timer.seconds >= 0) {
  //       timerHours.textContent = addZero(timer.hours);
  //       timerMinutes.textContent = addZero(timer.minutes);
  //       timerSeconds.textContent = addZero(timer.seconds);
  //     } else {
  //       timerHours.textContent = "00";
  //       timerMinutes.textContent = "00";
  //       timerSeconds.textContent = "00";
  //     }

  //     timer.timeRemaining > 0
  //       ? setInterval(updateClock, 1000)
  //       : clearInterval(updateClock, 1000);
  //   };

  //   updateClock();
  // };
  // countTimer("5 july 2020");

  // Menu
  const toggleMenu = () => {
    const btnMenu = document.querySelector(".menu"),
      menu = document.querySelector("menu");

    const handlerMenu = () => {
      menu.classList.toggle("active-menu");
    };

    btnMenu.addEventListener("click", handlerMenu);

    menu.addEventListener('click', () => {
      let target = event.target.getAttribute('href');
      target = event.target.closest('.close-btn');
      if (event.target.tagName === 'A' || target) {
        handlerMenu();
      }
    });
  };
  toggleMenu();

  // Popup

  let top = -100;
  let popupInterval;
  const popup = document.querySelector(".popup"),
    popupBtn = document.querySelectorAll(".popup-btn");
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
    popup.addEventListener('click', e => {
      let target = e.target;

      if (target.classList.contains('popup-close')) {
        popup.style.display = "none";
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          popup.style.display = "none";
        }
      }

    });
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
  };
  togglePopup();

  // Tabs
  const tabs = () => {
    const tabHeader = document.querySelector(".service-header"),
      tab = tabHeader.querySelectorAll(".service-header-tab"),
      tabContent = document.querySelectorAll(".service-tab");

    const toggleTabContent = index => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };
    tabHeader.addEventListener("click", event => {
      let target = event.target;
      target = target.closest('.service-header-tab');
      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };
  tabs();
});
