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

  // Scroll animation
  let menuInter;
  const scrollAnimation = divTop => {
    const top = 50;
    if (document.documentElement.scrollTop < divTop) {
      document.documentElement.scrollTop += top;
      if (
        document.documentElement.scrollTop <
        document.body.scrollHeight - window.innerHeight
      ) {
        menuInter = requestAnimationFrame(() => {
          scrollAnimation(divTop);
        });
      }
    } else {
      cancelAnimationFrame(menuInter);
    }
  };

  const a = document.querySelectorAll("a");
  a.forEach(item => {
    if (
      item.getAttribute("href").slice(0, 1) === "#" &&
      item.getAttribute("href").slice(1).length > 0 &&
      item.getAttribute("href").slice(1) !== "close"
    ) {
      const div = document.querySelector(`${item.getAttribute("href")}`)
        .offsetTop;
      item.addEventListener("click", e => {
        e.preventDefault();
        scrollAnimation(div);
      });
    }
  });

  // Menu
  const toggleMenu = () => {
    const menu = document.querySelector("menu"),
      body = document.querySelector("body");

    const handlerMenu = () => {
      menu.classList.toggle("active-menu");
    };

    body.addEventListener("click", e => {
      const target = e.target;
      if (target.closest(".menu")) {
        handlerMenu();
      } else if (target.closest(".close-btn")) {
        handlerMenu();
      } else if (
        menu.classList.contains("active-menu") &&
        target.tagName === "A"
      ) {
        handlerMenu();
      } else if (
        menu.classList.contains("active-menu") &&
        !target.closest("menu")
      ) {
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
    popup.addEventListener("click", e => {
      let target = e.target;

      if (target.classList.contains("popup-close")) {
        popup.style.display = "none";
      } else {
        target = target.closest(".popup-content");
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
          tab[i].classList.add("active");
          tabContent[i].classList.remove("d-none");
        } else {
          tab[i].classList.remove("active");
          tabContent[i].classList.add("d-none");
        }
      }
    };
    tabHeader.addEventListener("click", event => {
      let target = event.target;
      target = target.closest(".service-header-tab");
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

  // Slider

  const slider = () => {
    const portfolioDots = document.querySelector(".portfolio-dots"),
      slide = document.querySelectorAll(".portfolio-item");
    for (let i = 0; i < slide.length; i++) {
      portfolioDots
        .appendChild(document.createElement("li"))
        .classList.add("dot");
    }
    const dot = document.querySelectorAll(".dot"),
      slider = document.querySelector(".portfolio-content");

    let currentSlide = 0,
      interval;

    dot[currentSlide].classList.add("dot-active");

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoplaySlide = () => {
      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    };
    const startSlide = (time = 3000) => {
      interval = setInterval(autoplaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };
    slider.addEventListener("click", event => {
      event.preventDefault();
      const target = event.target;

      if (!target.matches(".portfolio-btn, .dot")) return;

      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");

      if (target.matches("#arrow-right")) {
        currentSlide++;
      } else if (target.matches("#arrow-left")) {
        currentSlide--;
      } else if (target.matches(".dot")) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    });
    slider.addEventListener("mouseover", event => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        stopSlide();
      }
    });
    slider.addEventListener("mouseout", event => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        startSlide(1000);
      }
    });
    startSlide(1000);
  };
  slider();

  // Team
  const ourTeam = () => {
    const command = document.getElementById("command");
    const addImgSrc = e => {
      const target = e.target;
      const src = target.src;
      if (target.closest("img.command__photo")) {
        target.src = target.dataset.img;
        const removeSrc = () => {
          target.src = src;
          command.removeEventListener("mouseout", removeSrc);
        };
        command.addEventListener("mouseout", removeSrc);
      }
    };
    command.addEventListener("mouseover", addImgSrc);
  };
  ourTeam();

  // Calculator
  const calculator = (price = 100) => {
    const calcBlock = document.querySelector(".calc-block"),
      calcType = document.querySelector(".calc-type"),
      calcSquare = document.querySelector(".calc-square"),
      calcDay = document.querySelector(".calc-day"),
      calcCount = document.querySelector(".calc-count"),
      totalValue = document.getElementById("total");


    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1,
        timeout,
        counter = 0;
      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }

      const animation = total => {
        counter += 10;
        totalValue.textContent = counter;
        if (counter < total) {
          timeout = requestAnimationFrame(() => {
            animation(total);
          });
        } else {
          cancelAnimationFrame(timeout);
        }
      };
      animation(total);
    };

    calcBlock.addEventListener('input', e => {
      const target = e.target;
      if (target.closest("input")) {
        const value = target.value;
        target.value = value.replace(/\D/g, "");
      }
    });

    calcBlock.addEventListener("change", e => {
      const target = e.target;
      if (target.matches("input") || target.matches("select")) {
        countSum();
      }
    });
  };
  calculator(100);
});
